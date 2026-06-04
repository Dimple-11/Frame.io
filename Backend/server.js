require('dotenv').config();
const app = require('./src/app');
const connectDb = require('./src/db/db');

const PORT = process.env.PORT || 3000;

async function startServer() {
    try {
        await connectDb();

        const server = app.listen(PORT, () => {
            console.log(`server is running on port ${PORT}`);
        });

        const shutdown = () => {
            server.close(() => process.exit(0));
        };

        process.on("SIGINT", shutdown);
        process.on("SIGTERM", shutdown);
    } catch (error) {
        console.error("failed to start server:", error.message);
        process.exit(1);
    }
}

startServer();
