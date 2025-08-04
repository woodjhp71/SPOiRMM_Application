@echo off
echo Deploying Firebase Functions...
echo.

cd functions
echo Installing dependencies...
call npm install
if errorlevel 1 (
    echo Failed to install dependencies
    pause
    exit /b 1
)

echo Building functions...
call npm run build
if errorlevel 1 (
    echo Failed to build functions
    pause
    exit /b 1
)

cd ..
echo Deploying to Firebase...
call firebase deploy --only functions
if errorlevel 1 (
    echo Failed to deploy functions
    pause
    exit /b 1
)

echo.
echo Functions deployed successfully!
echo.
pause 