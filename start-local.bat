@echo off
echo ========================================
echo   Industrial Strip - Local Development
echo ========================================
echo.

:: Check if node_modules exists
if not exist "node_modules" (
    echo Installing dependencies...
    echo.
    call npm install
    if errorlevel 1 (
        echo.
        echo ERROR: npm install failed. Make sure Node.js is installed.
        pause
        exit /b 1
    )
    echo.
    echo Dependencies installed successfully!
    echo.
)

:: Create .env.local if it doesn't exist
if not exist ".env.local" (
    echo Creating .env.local file...
    (
        echo # NextAuth Configuration
        echo NEXTAUTH_SECRET=local-dev-secret-change-in-production
        echo NEXTAUTH_URL=http://localhost:3000
        echo.
        echo # Admin Credentials
        echo ADMIN_USERNAME=admin
        echo # Default password: changeme123
        echo # Leave ADMIN_PASSWORD_HASH empty to use default password
        echo ADMIN_PASSWORD_HASH=
    ) > .env.local
    echo .env.local created!
    echo.
)

echo ========================================
echo   Starting development server...
echo ========================================
echo.
echo   Website:  http://localhost:3000
echo   Admin:    http://localhost:3000/admin
echo.
echo   Login:    admin / changeme123
echo.
echo   Press Ctrl+C to stop the server
echo ========================================
echo.

:: Start the development server
call npm run dev
