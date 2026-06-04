const assert = require("node:assert/strict");
const http = require("node:http");
const test = require("node:test");
const app = require("../src/app");

async function withServer(run) {
    const server = http.createServer(app);
    await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));

    try {
        const address = server.address();
        await run(`http://127.0.0.1:${address.port}`);
    } finally {
        await new Promise((resolve) => server.close(resolve));
    }
}

test("GET /health reports that the API is available", async () => {
    await withServer(async (baseUrl) => {
        const response = await fetch(`${baseUrl}/health`);
        const body = await response.json();

        assert.equal(response.status, 200);
        assert.deepEqual(body, { status: "ok" });
    });
});

test("POST /create-post rejects requests without an image", async () => {
    await withServer(async (baseUrl) => {
        const response = await fetch(`${baseUrl}/create-post`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ caption: "Missing image" })
        });
        const body = await response.json();

        assert.equal(response.status, 400);
        assert.equal(body.message, "An image is required.");
    });
});
