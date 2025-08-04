# Vercel Environment Variables Setup

## Firebase Configuration for Vercel Deployment

Add these environment variables in your Vercel dashboard:

### Project Settings → Environment Variables

| Variable Name | Value |
|---------------|-------|
| `VITE_FIREBASE_API_KEY` | `AIzaSyDFMm6CpAYcKECrK_AArNu3scEoPbSRYyc` |
| `VITE_FIREBASE_AUTH_DOMAIN` | `spoirmm.firebaseapp.com` |
| `VITE_FIREBASE_PROJECT_ID` | `spoirmm` |
| `VITE_FIREBASE_STORAGE_BUCKET` | `spoirmm.firebasestorage.app` |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | `622607729589` |
| `VITE_FIREBASE_APP_ID` | `1:622607729589:web:c8ef4216c5aa2bcf8acffc` |

## Setup Instructions

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your SPOiRMM project
3. Go to **Settings** → **Environment Variables**
4. Add each variable above
5. Set **Environment** to **Production** (and optionally **Preview** and **Development**)
6. Click **Save**

## Environment Variable Details

- **Production**: Used for live deployments
- **Preview**: Used for preview deployments (optional)
- **Development**: Used for development deployments (optional)

## Security Notes

- These values are encrypted in Vercel
- They are not visible in the client-side code
- They are only accessible during build time and runtime
- Keep this file secure and do not commit to version control

## Verification

After setting up:
1. Deploy your project to Vercel
2. Check the build logs for any environment variable errors
3. Test Firebase functionality in the deployed app
4. Verify authentication and database access work correctly

## Troubleshooting

If you see "Missing required environment variables" error:
1. Double-check all variable names (case-sensitive)
2. Ensure all variables are set for the correct environment
3. Redeploy after adding variables
4. Check Vercel build logs for specific error messages 