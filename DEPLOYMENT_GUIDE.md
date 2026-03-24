# Deployment Guide

> Last Updated: 2026-03-24

---

## 1. GitHub Pages Setup

### 1.1 Prerequisites

- GitHub account with repository access
- Repository admin rights

### 1.2 Step-by-Step Instructions

1. **Navigate to Repository Settings**
   - Go to: `https://github.com/badhope/github.io/settings/pages`

2. **Configure GitHub Pages**
   - Under "Build and deployment":
     - Source: **Deploy from a branch**
     - Branch: **main** / **/(root)**
     - Click **Save**

3. **Wait for Deployment**
   - Deployment takes 1-5 minutes
   - Check "Actions" tab for deployment status

4. **Access Your Site**
   - URL: `https://badhope.github.io`

---

## 2. Adding Resume PDF

### 2.1 Create PDF File

1. Create your resume as PDF
2. Name it `resume.pdf`

### 2.2 Add to Repository

**Option A: GitHub Web Interface**
1. Navigate to `https://github.com/badhope/github.io`
2. Click "Add file" → "Upload files"
3. Drag `resume.pdf` to upload
4. Commit to `main` branch

**Option B: Local Command Line**
```bash
# Copy resume.pdf to project root
cp /path/to/your/resume.pdf ./public/resume.pdf

# Commit and push
git add public/resume.pdf
git commit -m "docs: add resume PDF"
git push origin main
```

---

## 3. Deployment Verification

### 3.1 Check Deployment Status

1. Go to `https://github.com/badhope/github.io/actions`
2. Look for "Deploy to GitHub Pages" workflow
3. Green checkmark = success

### 3.2 Verify Functionality

| Feature | URL | Expected |
|---------|-----|----------|
| Home | `/` or `/home` | Loader → Home |
| Resume PDF | `/resume` | Download button works |
| Contact | `/contact` | mailto: link works |
| Tools Filter | `/tools` | Category buttons filter |

---

## 4. Troubleshooting

### 4.1 404 Error After Deployment

**Cause**: GitHub Pages not enabled or wrong branch

**Solution**:
1. Verify Settings → Pages → Source is enabled
2. Wait 5 minutes for first deploy
3. Check Actions tab for errors

### 4.2 PDF Download Not Working

**Cause**: File not in `public/` directory

**Solution**:
```bash
# Ensure file exists
ls -la public/resume.pdf

# If missing, add it
cp /path/to/resume.pdf public/resume.pdf
git add public/resume.pdf
git commit -m "docs: add resume PDF"
git push
```

### 4.3 Build Failures

**Cause**: Code errors or missing dependencies

**Solution**:
1. Check Actions logs for specific error
2. Run `npm run build` locally to reproduce
3. Fix errors and push again

---

## 5. Custom Domain (Optional)

### 5.1 Add Custom Domain

1. Go to `https://github.com/badhope/github.io/settings/pages`
2. Under "Custom domain", enter your domain
3. Add DNS records:
   - A record: `185.199.108.153` etc.
   - CNAME: point to `badhope.github.io`

### 5.2 Enable HTTPS

- Check "Enforce HTTPS" after DNS propagates

---

## 6. CI/CD Pipeline

### 6.1 Current Workflow

The repository has GitHub Actions configured in `.github/workflows/deploy.yml`:

```yaml
on:
  push:
    branches: ['main']
```

Every push to `main` triggers automatic deployment.

### 6.2 Manual Deployment

To trigger manually:
1. Go to Actions tab
2. Select "Deploy to GitHub Pages"
3. Click "Run workflow"

---

## 7. Quick Reference

| Task | Command/Action |
|------|---------------|
| Check deployment | Actions tab |
| View site | https://badhope.github.io |
| Add PDF | Upload to `public/resume.pdf` |
| Trigger redeploy | Push to main |
| Check build | Actions → deploy.yml |

---

*Questions? Check README.md or open an issue.*
