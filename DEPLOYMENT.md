# How to Deploy Your Daily Manager App

## Option 1: Netlify (Easiest - 2 minutes)

1. Go to https://app.netlify.com/drop
2. Drag and drop ALL these files into the box:
   - index.html
   - script.js
   - styles.css
   - netlify.toml
3. Wait 10 seconds for deployment
4. You'll get a URL like: `https://random-name-123.netlify.app`
5. Open that URL on your phone and bookmark it!

**To customize the URL:**
- Click "Site settings" → "Change site name"
- Choose something like: `yourname-daily-manager`

---

## Option 2: GitHub Pages (Free forever)

1. Create a GitHub account at https://github.com
2. Create a new repository (name it "daily-manager")
3. Upload all files to the repository
4. Go to Settings → Pages
5. Select "main" branch and save
6. Your site will be at: `https://yourusername.github.io/daily-manager`

---

## Option 3: Vercel (Fast & Free)

1. Go to https://vercel.com
2. Sign up with GitHub
3. Click "New Project"
4. Import your files
5. Deploy!
6. Get URL like: `https://daily-manager.vercel.app`

---

## Option 4: Test Locally First

### On Windows:
```
npx serve .
```
Then open: http://localhost:3000

### Or use Python:
```
python -m http.server 8000
```
Then open: http://localhost:8000

---

## After Deployment

1. Open the URL on your phone
2. Tap the browser menu (⋮)
3. Select "Add to Home Screen"
4. Now it works like a real app!

## Enable Notifications

When you first open the app, allow notifications so reminders work properly.