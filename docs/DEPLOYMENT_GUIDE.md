# Deployment & Operations Guide ☁️

This guide covers deployment procedures for hosting the Kasi-eCo API backend and Angular client in production environments.

---

## 1. Database Setup (MongoDB Atlas)

1. Sign up or log into [MongoDB Atlas](https://www.mongodb.com/atlas).
2. Create a new Shared (M0 Free Tier) cluster.
3. Under **Database Access**, create a database user with read/write privileges.
4. Under **Network Access**, add IP address `0.0.0.0/0` (allow access from anywhere, required for serverless platforms like Vercel).
5. Click **Connect** > **Drivers** > **Node.js** and copy your connection string:
   ```
   mongodb+srv://<username>:<password>@cluster0.abcde.mongodb.net/kasi_eco?retryWrites=true&w=majority
   ```

---

## 2. Backend Deployment (Vercel Serverless)

The backend includes a pre-configured [`vercel.json`](file:///c:/projects/Kasi-eCo/Backend/vercel.json):

```json
{
  "version": 2,
  "name": "KAsi Eco",
  "builds": [
    { "src": "index.js", "use": "@vercel/node" }
  ],
  "routes": [
    { "src": "/(.*)", "dest": "/index.js" }
  ]
}
```

### Steps to Deploy via Vercel CLI:
1. Install Vercel CLI globally:
   ```bash
   npm install -g vercel
   ```
2. Navigate to the `Backend` directory:
   ```bash
   cd Backend
   ```
3. Deploy to production:
   ```bash
   vercel --prod
   ```
4. Configure Environment Variables in the Vercel Dashboard (**Project Settings > Environment Variables**):
   * `MONGODB_URI`: Your MongoDB Atlas URI.
   * `JWT_SECRET`: A secure random cryptographic secret string.
   * `PORT`: `5555`

---

## 3. Frontend Deployment (Production Angular Build)

1. Navigate to the frontend directory:
   ```bash
   cd Frontend/Kasi-eCo
   ```
2. Run the production build command:
   ```bash
   npm run build
   ```
3. The compiled and minified static assets will be output to `Frontend/Kasi-eCo/dist/kasi-e-co/`.
4. Deploy the `dist/kasi-e-co/` folder to your preferred static hosting platform:
   * **Vercel:** Run `vercel --prod` inside `dist/kasi-e-co/`.
   * **Netlify:** Drag and drop the `dist/kasi-e-co/` folder or link GitHub repo with publish directory `Frontend/Kasi-eCo/dist/kasi-e-co/`.
   * **GitHub Pages:** Use `angular-cli-ghpages` to push to the `gh-pages` branch.
