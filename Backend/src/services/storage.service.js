const Imagekit = require("@imagekit/nodejs");
const { randomUUID } = require("crypto");

function getImageKitClient() {
    const privateKey = process.env.IMAGE_KIT_PRIVATE_KEY;

    if (!privateKey) {
        throw new Error("IMAGE_KIT_PRIVATE_KEY is required.");
    }

    return new Imagekit({ privateKey });
}

async function uploadImage(buffer, mimeType = "image/jpeg"){
    const extensions = {
        "image/jpeg": ".jpg",
        "image/png": ".png",
        "image/webp": ".webp"
    };
    const extension = extensions[mimeType] || ".jpg";
    const imagekit = getImageKitClient();
    const result = await imagekit.files.upload({
        file: buffer.toString("base64"),
        fileName: `${randomUUID()}${extension}`,
        folder: "/frame-posts"
    });

    return result;
}

module.exports = uploadImage;
