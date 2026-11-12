# Exercise 28: Publishing the App via EAS Update

## 🎯 Exercise Goal

Publish your Rate Repository App to Expo's servers using EAS Update so that anyone can test your app by scanning a QR code with the Expo Go app.

## 📝 What You Need to Submit

1. **README.md file** in the repository root with:
   - A screenshot of the QR code
   - Instructions for testing the app

2. **Working application** that:
   - Opens when QR code is scanned
   - Connects to the production backend
   - All features work (sign in, browse repos, create reviews)

## ⚠️ Important Warnings from Course Material

> **If the QR code is missing from the readme, your submissions will be rejected, and you will fail the course.**

> **The course instructor will inspect your application using the QR code before awarding credit.**

> **Note: If you are using a private repository, add the GitHub user `mattiluukkainen` as a collaborator.**

## ✅ Prerequisites Completed

Your project has been prepared with:
- ✅ EAS Update configured
- ✅ `expo-updates` package installed  
- ✅ Update URL and runtime version configured
- ✅ README.md template with QR code section created
- ✅ Helper scripts created (`publish.bat` for Windows, `publish.sh` for bash)

## 🚀 Quick Start Guide

### Step 1: Login to EAS

```bash
cd rate-repository-app
npx eas-cli@latest login
```

Enter your Expo credentials. If you don't have an account, create one at https://expo.dev/signup

### Step 2: Use the Helper Script

**On Windows (Command Prompt/PowerShell):**
```cmd
publish.bat
```

**On Windows (Git Bash) or Mac/Linux:**
```bash
./publish.sh
```

The script will:
1. Check your authentication
2. Create the production environment variable
3. Publish your app to EAS
4. Provide a URL to get your QR code

### Step 3: Get Your QR Code

1. Open the URL provided by the script
2. Click the **Preview** button
3. Screenshot the QR code that appears

### Step 4: Save the Screenshot

Save your screenshot as:
```
rate-repository-app/assets/qr-code-screenshot.png
```

The README.md is already configured to display it.

### Step 5: Test Your App

**Install Expo Go:**
- iOS: https://apps.apple.com/app/expo-go/id982107779
- Android: https://play.google.com/store/apps/details?id=host.exp.exponent

**Scan the QR Code:**
- Open Expo Go
- Tap "Scan QR Code"
- Point camera at your QR code
- App should load and work

**Verify These Work:**
- ✅ Repository list loads
- ✅ Search works
- ✅ Can sign in (username: `kalle`, password: `password`)
- ✅ Can view repository details
- ✅ Can create reviews

### Step 6: Commit and Push

```bash
git add .
git commit -m "Add EAS Update configuration and QR code for Exercise 28"
git push
```

### Step 7: Add Collaborator (if private repo)

If your repository is private:
1. Go to your GitHub repository
2. Settings → Collaborators
3. Add user: `mattiluukkainen`

## 📚 Detailed Documentation

For more details, see:
- **EAS_SETUP_GUIDE.md** - Complete reference for all EAS commands
- **Complete EAS Update Publishing Guide** artifact - Step-by-step walkthrough

## 🔧 Manual Commands (if you prefer not to use the scripts)

### Create Environment Variable
```bash
npx eas-cli@latest env:create \
  --name EXPO_PUBLIC_APOLLO_URI \
  --value https://rate-repository-api-2.ext.ocp-prod-0.k8s.it.helsinki.fi/ \
  --environment preview \
  --visibility plaintext
```

### Publish Update
```bash
npx eas-cli@latest update \
  --branch main \
  --environment preview \
  --message "The first deploy"
```

## 🐛 Troubleshooting

### QR Code Doesn't Work on Physical Phone

**Problem:** App doesn't load when scanning QR code on physical device

**Solution:** Try using an Android emulator instead. Some students report better success with emulators.

### Not Logged In Error

**Check authentication:**
```bash
npx eas-cli@latest whoami
```

**Re-login if needed:**
```bash
npx eas-cli@latest login
```

### Environment Variable Issues

**List all variables:**
```bash
npx eas-cli@latest env:list
```

**Delete and recreate if needed:**
```bash
npx eas-cli@latest env:delete EXPO_PUBLIC_APOLLO_URI --environment preview
npx eas-cli@latest env:create --name EXPO_PUBLIC_APOLLO_URI --value https://rate-repository-api-2.ext.ocp-prod-0.k8s.it.helsinki.fi/ --environment preview --visibility plaintext
```

### App Shows No Repositories

**Verify production API is accessible:**
Open https://rate-repository-api-2.ext.ocp-prod-0.k8s.it.helsinki.fi/ in browser

**Check environment variable was set:**
```bash
npx eas-cli@latest env:list
```

## 📊 Understanding the Setup

### Two Environments

| Environment | API URL | Usage |
|------------|---------|-------|
| **Local** | `http://192.168.0.111:4000/graphql` | Development with `npm start` |
| **Preview** | `https://rate-repository-api-2...` | Published via EAS Update |

### What Happens When You Publish

1. **Bundle Creation**: JavaScript code and assets are bundled
2. **Upload**: Bundle uploaded to Expo's CDN  
3. **QR Generation**: Unique QR code created for this update
4. **Runtime Config**: Environment variables injected at runtime
5. **Distribution**: Anyone with QR code can load the app

### Why This Matters

- **Easy Testing**: Share QR code instead of APK/IPA files
- **Instant Updates**: Push updates without app store approval
- **No Build Required**: Skip the compile/build process
- **Real Device Testing**: Test on actual phones, not just emulators

## 📋 Final Checklist

Before marking exercise as complete:

- [ ] Logged into EAS CLI successfully
- [ ] Created EXPO_PUBLIC_APOLLO_URI environment variable
- [ ] Published update to EAS
- [ ] Got QR code from dashboard
- [ ] Saved screenshot to `assets/qr-code-screenshot.png`
- [ ] Screenshot visible in README.md
- [ ] Tested app loads via QR code
- [ ] Verified all features work (sign in, browse, review)
- [ ] Committed all changes to git
- [ ] Pushed to GitHub
- [ ] Added `mattiluukkainen` as collaborator (if private)

## 🎓 Additional Resources

- [EAS Update Documentation](https://docs.expo.dev/eas-update/introduction/)
- [Expo Go App](https://expo.dev/client)
- [EAS CLI Reference](https://docs.expo.dev/eas-update/eas-cli/)
- [Environment Variables](https://docs.expo.dev/eas-update/environment-variables/)

## 💡 Tips

1. **Keep the dashboard URL**: Bookmark the EAS dashboard URL for future reference
2. **Test before submitting**: Always scan your own QR code first
3. **Check the logs**: If something fails, check the EAS dashboard for logs
4. **Update message**: Use descriptive messages for each update to track changes
5. **Branch strategy**: Use `main` for stable releases, other branches for testing

## ✨ Success Criteria

Your exercise is complete when:
- ✅ README.md contains visible QR code
- ✅ QR code loads working app in Expo Go
- ✅ App connects to production backend
- ✅ All features function correctly
- ✅ Code pushed to GitHub with proper collaborator access

Good luck! 🚀
