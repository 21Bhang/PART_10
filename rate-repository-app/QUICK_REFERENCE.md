# EAS Update Quick Reference Card

## 🚀 Three Commands to Publish

```bash
# 1. Login (do once)
npx eas-cli@latest login

# 2. Create env var (do once)
npx eas-cli@latest env:create --name EXPO_PUBLIC_APOLLO_URI --value https://rate-repository-api-2.ext.ocp-prod-0.k8s.it.helsinki.fi/ --environment preview --visibility plaintext

# 3. Publish (do every time you want to update)
npx eas-cli@latest update --branch main --environment preview --message "Your message here"
```

## 📱 Get QR Code

After publishing, click the URL in terminal → Click "Preview" button → Screenshot the QR code

## 💾 Save Screenshot

Save as: `assets/qr-code-screenshot.png`

## ✅ Test

1. Open Expo Go app
2. Scan QR code
3. Verify app works

## 🔄 Update Again

Just run step 3 again with a new message. Each update gets a new QR code.

## 🆘 Help Commands

```bash
# Check if logged in
npx eas-cli@latest whoami

# List environment variables
npx eas-cli@latest env:list

# View update history
npx eas-cli@latest update:list --branch main

# Project info
npx eas-cli@latest project:info
```

## 🎯 For Exercise 28

1. ✅ Publish app → Get QR code
2. ✅ Screenshot → Save to `assets/qr-code-screenshot.png`
3. ✅ Test with Expo Go
4. ✅ Commit and push
5. ✅ Add `mattiluukkainen` as collaborator (if private repo)

**WARNING**: QR code MUST be in README or you will fail the course!
