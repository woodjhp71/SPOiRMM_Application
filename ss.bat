@echo off
echo Stopping any processes on port 3000...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :3000') do (
    echo Killing process %%a
    taskkill /f /pid %%a 2>nul
)

echo.
echo Starting development server...
npm run dev

pause 