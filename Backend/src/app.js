const express = require('express');
const postModel = require('./models/post.model');
const multer = require('multer');
const uploadImage = require('./services/storage.service');
const cors = require('cors');

const app = express();
const allowedOrigins = (process.env.CLIENT_URL || "http://localhost:5173")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

app.use(express.json({ limit: "1mb" }));
app.use(cors({
    origin(origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true);
        }

        return callback(new Error("Origin is not allowed by CORS"));
    }
}));

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter(req, file, callback) {
        const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

        if (!allowedTypes.includes(file.mimetype)) {
            return callback(new multer.MulterError("LIMIT_UNEXPECTED_FILE", file.fieldname));
        }

        return callback(null, true);
    }
});

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Frame.io API is running.",
        health: "/health",
        posts: "/posts"
    });
});

app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok" });
});

app.post("/create-post", upload.single("image"), async (req,res)=>{
    if (!req.file) {
        return res.status(400).json({ message: "An image is required." });
    }

    const caption = req.body.caption?.trim();

    if (!caption) {
        return res.status(400).json({ message: "A caption is required." });
    }

    const result = await uploadImage(req.file.buffer, req.file.mimetype);
    const post = await postModel.create({
        image: result.url,
        caption
    });

    res.status(201).json({
        message: "Post created successfully.",
        post
    });
});

app.get("/posts",async (req,res)=>{
    const requestedLimit = Number.parseInt(req.query.limit, 10);
    const limit = Number.isNaN(requestedLimit)
        ? 30
        : Math.min(Math.max(requestedLimit, 1), 50);
    const posts = await postModel.find().sort({ createdAt: -1 }).limit(limit);

    return res.status(200).json({
        message: "Posts fetched successfully.",
        posts
    });
});

app.use((req, res) => {
    res.status(404).json({ message: "Route not found." });
});

app.use((error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        const message = error.code === "LIMIT_FILE_SIZE"
            ? "Image must be 5 MB or smaller."
            : "Only JPEG, PNG, and WebP images are allowed.";

        return res.status(400).json({ message });
    }

    if (error.name === "ValidationError") {
        return res.status(400).json({ message: error.message });
    }

    if (error.message === "Origin is not allowed by CORS") {
        return res.status(403).json({ message: error.message });
    }

    console.error(error);
    return res.status(500).json({ message: "Internal server error." });
});

module.exports = app;
