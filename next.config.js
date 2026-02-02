/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig
```

Click **"Commit changes"** twice.

---

## **STEP 4: Add .gitignore file**

Click **"Add file"** → **"Create new file"**

Name it: **`.gitignore`**

Paste this content:
```
node_modules
.next
out
.env.local
.env.*.local
