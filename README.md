<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>



## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Environment variables

Create a local environment file by copying `.env.local.example` to `.env.local` and filling the values. Do NOT commit `.env.local` — it is ignored by `.gitignore`.

The project expects Vite-prefixed variables (these are used in the client build):

- `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_PROJECT_ID`, etc. (see `.env.local.example`)
- `VITE_GEMINI_API_KEY` for Google GenAI / Gemini usage

Security note: Firebase client config is used in the browser and is not a secret for Firebase SDK purposes, but any server-side keys or service-account credentials must never be committed. If you received an alert about exposed credentials, rotate the keys in Google Cloud Console and remove secrets from the repository history.
