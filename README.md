# Frame.io

Frame.io is a responsive full-stack image-sharing web app. Users can upload an image with a caption and browse the newest community posts.

## Features

- Responsive feed and navigation for mobile and desktop
- Image uploads with captions
- Full-image display without cropping
- Loading, empty, error, and submitting states
- Upload type and 5 MB size validation
- MongoDB persistence and ImageKit image storage
- Health check, API error handling, CORS controls, and basic API tests

## Tech Stack

- Frontend: React, React Router, Vite
- Backend: Node.js, Express, MongoDB/Mongoose, Multer, ImageKit

## Local Setup

1. Copy `Backend/.env.example` to `Backend/.env` and add real MongoDB and ImageKit credentials.
2. Optionally copy `Frontend/Url-generation/.env.example` to `.env`.
3. Install and run both apps:

```bash
cd Backend
npm install
npm run dev

cd ../Frontend/Url-generation
npm install
npm run dev
```

Frontend: `http://localhost:5173`

Backend health check: `http://localhost:3000/health`

## Deployment

Deploy `Backend` as a Node service with `npm start` and set `MONGO_URI`, `IMAGE_KIT_PRIVATE_KEY`, and `CLIENT_URL`. Deploy `Frontend/Url-generation` as a Vite static app, set `VITE_API_URL` to the deployed backend URL, and publish the `dist` directory.

## Credits

The original application structure and core idea were written by the author. AI assistance was used to identify issues, improve responsiveness, harden validation and error handling, prepare deployment configuration, and document the project.
