# JobHub - Troubleshooting Guide

This document lists common issues found in the JobHub project and their solutions.

## Critical Issues Found

### 1. Duplicate AUTH_USER_MODEL Declaration
**Location:** `backend/pfe6/settings.py`  
**Problem:** `AUTH_USER_MODEL` was declared twice (lines 67 and 128)  
**Status:** ✅ FIXED  
**Solution:** Removed the duplicate declaration on line 128.

### 2. Exposed SECRET_KEY (Security Vulnerability)
**Location:** `backend/pfe6/settings.py` line 26  
**Problem:** Django SECRET_KEY is hardcoded in the settings file  
**Severity:** 🔴 HIGH  
**Status:** ⚠️ DOCUMENTED (requires environment variable configuration)  

**Recommended Solution:**
```python
import os
SECRET_KEY = os.environ.get('DJANGO_SECRET_KEY', 'fallback-key-for-dev-only')
```

**Best Practice:** 
- Generate a new SECRET_KEY for production
- Store it in environment variables or a `.env` file
- Never commit the actual SECRET_KEY to version control

### 3. Exposed Email Credentials (Security Vulnerability)
**Location:** `backend/pfe6/settings.py` lines 35-36  
**Problem:** Email username and password are hardcoded in settings  
**Severity:** 🔴 HIGH  
**Status:** ⚠️ DOCUMENTED (requires environment variable configuration)  

**Recommended Solution:**
```python
import os
EMAIL_HOST_USER = os.environ.get('EMAIL_HOST_USER', '')
EMAIL_HOST_PASSWORD = os.environ.get('EMAIL_HOST_PASSWORD', '')
```

### 4. Missing Dependencies
**Problem:** Python and Node.js dependencies are not installed  
**Status:** 📝 DOCUMENTED  

See the Installation Guide below.

## Installation Guide

### Backend Setup (Django)

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Create a Python virtual environment:**
   ```bash
   python3 -m venv venv
   ```

3. **Activate the virtual environment:**
   - On Linux/Mac:
     ```bash
     source venv/bin/activate
     ```
   - On Windows:
     ```bash
     venv\Scripts\activate
     ```

4. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

5. **Set up environment variables (recommended):**
   Create a `.env` file in the backend directory:
   ```env
   DJANGO_SECRET_KEY=your-secret-key-here
   EMAIL_HOST_USER=your-email@gmail.com
   EMAIL_HOST_PASSWORD=your-app-password
   DEBUG=True
   ```

6. **Run database migrations:**
   ```bash
   python manage.py migrate
   ```

7. **Create a superuser (optional):**
   ```bash
   python manage.py createsuperuser
   ```

8. **Start the development server:**
   ```bash
   python manage.py runserver
   ```

### Frontend Setup (React/Vite)

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install Node.js dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   The frontend will be available at `http://localhost:8080`

4. **Build for production:**
   ```bash
   npm run build
   ```

## Configuration Issues

### CORS Configuration
The backend is configured to accept requests from:
- `https://mohsin123.pythonanywhere.com`
- `http://localhost:8080`
- `http://127.0.0.1:8080`
- `http://localhost:3000`
- `http://127.0.0.1:3000`

If you're running the frontend on a different port, update `CORS_ALLOWED_ORIGINS` in `backend/pfe6/settings.py`.

### Debug Mode
The backend has `DEBUG = False` in settings. For local development, you may want to set it to `True` to see detailed error messages.

## Common Error Messages

### "Couldn't import Django"
**Cause:** Django is not installed  
**Solution:** Follow the Backend Setup guide above to install dependencies

### "ModuleNotFoundError: No module named 'X'"
**Cause:** Python dependency is missing  
**Solution:** Activate virtual environment and run `pip install -r requirements.txt`

### "eslint: not found"
**Cause:** Node modules are not installed  
**Solution:** Run `npm install` in the frontend directory

### API Connection Errors
**Cause:** The frontend is trying to connect to `https://mohsin123.pythonanywhere.com/api/`  
**Solution:** 
- For local development, update the `baseURL` in `frontend/src/api/axios.ts` to `http://localhost:8000/api/`
- Make sure the backend server is running

## Security Recommendations

1. ✅ **Remove duplicate AUTH_USER_MODEL** - FIXED
2. ⚠️ **Move SECRET_KEY to environment variables** - DOCUMENTED
3. ⚠️ **Move email credentials to environment variables** - DOCUMENTED
4. 🔒 **Use HTTPS in production**
5. 🔒 **Enable CSRF protection properly**
6. 🔒 **Review ALLOWED_HOSTS** - Currently set to `['*']` which allows all hosts (not recommended for production)
7. 🔒 **Generate a new SECRET_KEY** - The current one is exposed in the repository

## Additional Notes

- The project uses Django REST Framework with JWT authentication
- Frontend is built with React, TypeScript, Vite, and Tailwind CSS
- Backend uses SQLite database by default
- The project includes a Capacitor Android app configuration

## Need Help?

If you encounter issues not listed here, please:
1. Check the Django logs for backend issues
2. Check the browser console for frontend issues
3. Verify all dependencies are installed
4. Ensure environment variables are set correctly
