# EAS Update Setup Guide

This guide will help you complete the EAS Update publishing process for Exercise 28.

## Prerequisites
✅ EAS Update has been configured in your project
✅ app.json has been updated with updates configuration

## Steps to Complete

### 1. Login to EAS CLI

Open your terminal in the `rate-repository-app` directory and run:

```bash
npx eas-cli@latest login
```

Follow the prompts to log in with your Expo account credentials.

### 2. Create Environment Variable

Set the production API URL as an environment variable for the preview environment:

```bash
npx eas-cli@latest env:create --name EXPO_PUBLIC_APOLLO_URI --value https://rate-repository-api-2.ext.ocp-prod-0.k8s.it.helsinki.fi/ --environment preview --visibility plaintext
```

This command:
- Creates an environment variable named `EXPO_PUBLIC_APOLLO_URI`
- Sets it to the production Rate Repository API URL
- Associates it with the `preview` environment
- Makes it visible as plaintext (not secret)

### 3. Publish Your First Update

Deploy your application to Expo's servers:

```bash
npx eas-cli@latest update --branch main --environment preview --message "The first deploy"
```

This command:
- Publishes to the `main` branch
- Uses the `preview` environment (with the EXPO_PUBLIC_APOLLO_URI variable)
- Adds a message to identify this update

### 4. Get Your QR Code

After the update is published:
1. The command will output a link to the EAS Dashboard
2. Open that link in your browser
3. Click the **Preview** button
4. A QR code will be displayed

### 5. Take a Screenshot

Take a screenshot of the QR code that appears in the EAS Dashboard.

### 6. Test the Application

1. Open the Expo Go app on your phone (or in an emulator)
2. Scan the QR code
3. Verify that the application:
   - Opens successfully
   - Loads the repository list from the production API
   - Allows signing in (you can create a new user or use existing credentials)
   - Allows viewing repository details
   - Allows creating reviews

### 7. Update README.md

Add the QR code screenshot to the main project README.md file.

## Troubleshooting

### Login Issues
If you encounter issues with `eas login`, try:
```bash
npx eas-cli@latest whoami
```
to check if you're already logged in.

### Physical Device Issues
Some students report issues opening the app via QR code on physical phones. If this happens:
- Try opening the QR code within an emulator instead
- The emulator approach seems to work more reliably

### Making Updates
If you need to make changes after the first deployment:
1. Make your code changes
2. Run the update command again:
```bash
npx eas-cli@latest update --branch main --environment preview --message "Description of changes"
```

Each update gets its own unique QR code.

## Environment Variables Reference

Your project now has two environment configurations:

**Local Development (.env file):**
- `EXPO_PUBLIC_APOLLO_URI=http://192.168.0.111:4000/graphql`
- Used when running `npm start` locally

**Preview Environment (EAS):**
- `EXPO_PUBLIC_APOLLO_URI=https://rate-repository-api-2.ext.ocp-prod-0.k8s.it.helsinki.fi/`
- Used when publishing updates with `--environment preview`

## Additional Commands

View all environment variables:
```bash
npx eas-cli@latest env:list
```

View update history:
```bash
npx eas-cli@latest update:list --branch main
```

View project info:
```bash
npx eas-cli@latest project:info
```
