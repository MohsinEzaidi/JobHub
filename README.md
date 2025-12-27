# JobHub

A full-stack job portal application with Django backend and React frontend.

## Project Structure

```
JobHub/
├── backend/          # Django REST API
│   ├── jobs/        # Jobs app
│   ├── users/       # Users app
│   ├── favorites/   # Favorites app
│   └── pfe6/        # Main Django project settings
└── frontend/        # React + Vite + TypeScript
    └── src/         # Source files
```

## Prerequisites

- Python 3.8 or higher
- Node.js 18 or higher
- npm or yarn

## Setup Instructions

### Backend Setup (Django)

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Run migrations:
   ```bash
   python manage.py migrate
   ```

4. Start the development server:
   ```bash
   python manage.py runserver
   ```

The backend API will be available at `http://localhost:8000`

### Frontend Setup (React)

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install Node.js dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will be available at `http://localhost:5173`

### Building for Production

#### Backend
```bash
cd backend
gunicorn pfe6.wsgi:application
```

#### Frontend
```bash
cd frontend
npm run build
```

The production build will be in the `frontend/dist` directory.

## Common Issues

### "Module not found" errors
**Solution:** Make sure you've installed all dependencies:
- For backend: `pip install -r requirements.txt`
- For frontend: `npm install`

### "Django not found" error
**Solution:** Install Django and other Python dependencies:
```bash
cd backend
pip install -r requirements.txt
```

### "vite: not found" error
**Solution:** Install Node.js dependencies:
```bash
cd frontend
npm install
```

## Technologies Used

### Backend
- Django 5.2
- Django REST Framework
- Django CORS Headers
- JWT Authentication
- Scrapy (for job scraping)
- Selenium (for web automation)

### Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS
- shadcn-ui components
- React Router
- Axios
- React Query

## API Endpoints

The backend provides REST API endpoints for:
- User authentication and registration
- Job listings and search
- Job details
- Favorite jobs
- User profiles

## Development

### Backend
- Run tests: `python manage.py test`
- Check for issues: `python manage.py check`
- Create superuser: `python manage.py createsuperuser`

### Frontend
- Run linter: `npm run lint`
- Build for production: `npm run build`
- Preview production build: `npm run preview`

## License

This project is part of a university project (PFE6).
