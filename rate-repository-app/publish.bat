@echo off
REM EAS Update Publishing Script for Windows
REM Run this after logging in with: npx eas-cli@latest login

echo 📦 Publishing Rate Repository App to EAS Update...
echo.

REM Check if logged in
echo Checking EAS CLI authentication...
call npx eas-cli@latest whoami
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Not logged in. Please run: npx eas-cli@latest login
    exit /b 1
)

echo.
echo ✅ Authenticated
echo.

REM Create environment variable (only needs to be done once)
echo Setting up environment variable...
call npx eas-cli@latest env:create --name EXPO_PUBLIC_APOLLO_URI --value https://rate-repository-api-2.ext.ocp-prod-0.k8s.it.helsinki.fi/ --environment preview --visibility plaintext 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Environment variable already exists or created successfully
)

echo.

REM Publish update
echo Publishing update to EAS...
call npx eas-cli@latest update --branch main --environment preview --message "Deploy from Windows"

echo.
echo ✨ Done! Follow the URL above to get your QR code.
echo.
echo Next steps:
echo 1. Open the URL in your browser
echo 2. Click the 'Preview' button
echo 3. Take a screenshot of the QR code
echo 4. Save it as: assets\qr-code-screenshot.png
echo 5. Test the app by scanning the QR code with Expo Go
