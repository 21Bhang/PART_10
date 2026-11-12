#!/bin/bash

# EAS Update Publishing Script
# Run this after logging in with: npx eas-cli@latest login

echo "📦 Publishing Rate Repository App to EAS Update..."
echo ""

# Check if logged in
echo "Checking EAS CLI authentication..."
npx eas-cli@latest whoami
if [ $? -ne 0 ]; then
    echo "❌ Not logged in. Please run: npx eas-cli@latest login"
    exit 1
fi

echo ""
echo "✅ Authenticated"
echo ""

# Create environment variable (only needs to be done once)
echo "Setting up environment variable..."
npx eas-cli@latest env:create \
    --name EXPO_PUBLIC_APOLLO_URI \
    --value https://rate-repository-api-2.ext.ocp-prod-0.k8s.it.helsinki.fi/ \
    --environment preview \
    --visibility plaintext \
    2>/dev/null || echo "Environment variable already exists (this is fine)"

echo ""

# Publish update
echo "Publishing update to EAS..."
npx eas-cli@latest update \
    --branch main \
    --environment preview \
    --message "Deploy: $(date '+%Y-%m-%d %H:%M:%S')"

echo ""
echo "✨ Done! Follow the URL above to get your QR code."
echo ""
echo "Next steps:"
echo "1. Open the URL in your browser"
echo "2. Click the 'Preview' button"
echo "3. Take a screenshot of the QR code"
echo "4. Save it as: assets/qr-code-screenshot.png"
echo "5. Test the app by scanning the QR code with Expo Go"
