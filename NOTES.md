# Frontend Notes
Component Folder: Reusable pieces
- AuthContext.jsx: Stores and share authentication state 
    Global variable
    isAuthenticated (true/false), login(), logout()

- ProtectedRoute.jsx: Block unauthorized users from certain pages
    Wraps around all pages
    EX: User wants to visit /gallery
    Yes = show, No = Back to login

- package.json
    Removed "main": "index.js" under "description"
    Removed "type": "commonjs" under "license": "ISC"

# Backend Notes
Look into AWS


Create endpoint
- Specify app.get 

# CSS Notes


# Git Notes
git status: checks untracked files

# Installing Express
npm init -y
npm install express cors dotenv

# Installing SQL
npm install mysql2


# Verifying MySQL Server
mysql --version
mysql -u root -p


# SQL Server Pass
SFup8NitUt,z