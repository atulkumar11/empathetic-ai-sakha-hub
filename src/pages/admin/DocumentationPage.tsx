import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { FileText, BookOpen, Download, ExternalLink, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const DocumentationPage = () => {
  const { toast } = useToast();

  const showToast = () => {
    toast({
      title: "Documentation",
      description: "This feature is currently under development.",
      variant: "default"
    });
  };

  const handleDownloadFlaskGuide = () => {
    // Create HTML content for Word document - updated to match PREPZR React app
    const wordContent = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset="utf-8">
        <title>PREPZR Flask PostgreSQL Implementation Guide</title>
        <style>
          body { font-family: Arial, sans-serif; }
          h1 { color: #2563eb; margin-bottom: 16px; }
          h2 { color: #1e40af; margin-top: 24px; margin-bottom: 12px; }
          p { margin-bottom: 16px; line-height: 1.5; }
          .code { font-family: monospace; background-color: #f5f5f5; padding: 12px; border-radius: 4px; }
        </style>
      </head>
      <body>
        <h1>PREPZR Flask PostgreSQL Implementation Guide</h1>
        <p>Version 1.3.0 | Last Updated: May 1, 2025</p>
        
        <h2>1. Setup & Installation</h2>
        <p>Install required packages for the PREPZR backend:</p>
        <pre class="code">pip install Flask Flask-SQLAlchemy Flask-Migrate Flask-CORS Flask-JWT-Extended psycopg2-binary python-dotenv</pre>
        
        <h2>2. Project Structure</h2>
        <pre class="code">
prepzr_backend/
├── .env                     # Environment variables
├── .gitignore              
├── app/
│   ├── __init__.py          # Flask app initialization
│   ├── config.py            # Configuration settings
│   ├── models/              # Database models
│   │   ├── __init__.py
│   │   ├── user.py          # User model (students, tutors, admin)
│   │   ├── content.py       # Educational content models
│   │   └── study_data.py    # Study plan and progress models
│   ├── routes/              # API routes
│   │   ├── __init__.py
│   │   ├── auth.py          # Authentication routes
│   │   ├── admin.py         # Admin dashboard routes
│   │   ├── students.py      # Student-specific routes
│   │   └── content.py       # Content management routes
│   ├── services/            # Business logic
│   │   ├── __init__.py
│   │   ├── auth_service.py  # Authentication logic
│   │   ├── admin_service.py # Admin services
│   │   └── ai_service.py    # AI personalization services
│   └── utils/               # Utility functions
│       ├── __init__.py
│       └── helpers.py
├── migrations/              # Database migrations
├── run.py                   # Application entry point
└── requirements.txt         # Project dependencies
        </pre>
        
        <h2>3. Database Models</h2>
        <p>Create models matching the React frontend data structures:</p>
        <pre class="code">
# app/models/user.py
from app import db
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash

class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.String(36), primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    phone_number = db.Column(db.String(20))
    password_hash = db.Column(db.String(255))
    role = db.Column(db.String(20), default='student')  # student, tutor, admin, parent
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    last_login = db.Column(db.DateTime)
    avatar_url = db.Column(db.String(255))
    login_count = db.Column(db.Integer, default=0)
    signup_type = db.Column(db.String(20), default='standard')  # standard, google, facebook, apple, batch
    
    # User profile fields
    profile = db.relationship('UserProfile', backref='user', uselist=False)
    
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
        
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
        
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'phoneNumber': self.phone_number,
            'role': self.role,
            'createdAt': self.created_at.isoformat() if self.created_at else None,
            'lastLogin': self.last_login.isoformat() if self.last_login else None,
            'avatarUrl': self.avatar_url,
            'loginCount': self.login_count,
            'signupType': self.signup_type
        }

class UserProfile(db.Model):
    __tablename__ = 'user_profiles'
    
    id = db.Column(db.String(36), primary_key=True)
    user_id = db.Column(db.String(36), db.ForeignKey('users.id'), nullable=False)
    exam_goal = db.Column(db.String(50))  # IIT-JEE, NEET, etc.
    exam_date = db.Column(db.Date)
    study_hours_per_day = db.Column(db.Integer)
    study_pace = db.Column(db.String(20))  # relaxed, moderate, intensive
    study_preference = db.Column(db.String(20))  # visual, auditory, read-write, kinesthetic, mixed
    completed_onboarding = db.Column(db.Boolean, default=False)
    current_mood = db.Column(db.String(20))  # happy, sad, stressed, relaxed, focused, etc.
    
    # Subscription information
    subscription_type = db.Column(db.String(20), default='free')  # free, basic, premium, group, enterprise
    subscription_plan_type = db.Column(db.String(50))  # specific plan identifier
    subscription_expires_at = db.Column(db.DateTime)
    
    # Relationships
    goals = db.relationship('StudyGoal', backref='user_profile')
    subjects = db.relationship('UserSubject', backref='user_profile')

class AdminUser(db.Model):
    __tablename__ = 'admin_users'
    
    id = db.Column(db.String(36), primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password_hash = db.Column(db.String(255))
    role = db.Column(db.String(20), default='admin')  # admin or super_admin
    permissions = db.Column(db.JSON)  # Array of permission strings
    
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
        
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
        
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'role': self.role,
            'permissions': self.permissions
        }

class MoodLog(db.Model):
    __tablename__ = 'mood_logs'
    
    id = db.Column(db.String(36), primary_key=True)
    user_id = db.Column(db.String(36), db.ForeignKey('users.id'), nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    mood_type = db.Column(db.String(20), nullable=False)  # happy, sad, stressed, relaxed, focused, etc.
    notes = db.Column(db.Text)
    
    def to_dict(self):
        return {
            'id': self.id,
            'mood': self.mood_type,
            'timestamp': self.timestamp.isoformat() if self.timestamp else None,
            'notes': self.notes
        }
        </pre>
        
        <h2>4. Authentication API</h2>
        <p>Implement authentication endpoints that match the React auth context:</p>
        <pre class="code">
# app/routes/auth.py
from flask import Blueprint, request, jsonify
from app import db
from app.models.user import User, AdminUser
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
import uuid
from datetime import datetime, timedelta

auth_bp = Blueprint('auth', __name__, url_prefix='/api/auth')

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email', '')
    password = data.get('password', '')
    
    user = User.query.filter_by(email=email).first()
    
    if user and user.check_password(password):
        # Update last login time and increment login count
        user.last_login = datetime.utcnow()
        user.login_count = (user.login_count or 0) + 1
        db.session.commit()
        
        # Generate token with role claim
        token = create_access_token(
            identity=user.id,
            additional_claims={'role': user.role},
            expires_delta=timedelta(days=7)
        )
        
        return jsonify({
            'success': True,
            'data': {
                'id': user.id,
                'name': user.name,
                'email': user.email,
                'phoneNumber': user.phone_number,
                'role': user.role,
                'avatarUrl': user.avatar_url,
                'loginCount': user.login_count,
                'token': token
            },
            'message': 'Login successful'
        })
    
    return jsonify({
        'success': False,
        'data': None,
        'message': 'Invalid email or password'
    }), 401

@auth_bp.route('/admin/login', methods=['POST'])
def admin_login():
    data = request.get_json()
    email = data.get('email', '')
    password = data.get('password', '')
    
    # Check if email contains 'admin' for demo purposes
    # In production, use proper admin authentication
    if 'admin' in email and len(password) > 3:
        # Find or create admin user
        admin = AdminUser.query.filter_by(email=email).first()
        
        if not admin:
            admin = AdminUser(
                id=f"admin_{uuid.uuid4()}",
                name='Admin User',
                email=email,
                role='admin',
                permissions=['all']
            )
            admin.set_password(password)
            db.session.add(admin)
            db.session.commit()
        
        # Generate admin token
        token = create_access_token(
            identity=admin.id,
            additional_claims={'role': 'admin'},
            expires_delta=timedelta(days=1)
        )
        
        return jsonify({
            'success': True,
            'data': admin.to_dict() | {'token': token},
            'message': 'Admin login successful'
        })
    
    return jsonify({
        'success': False,
        'data': None,
        'message': 'Invalid admin credentials'
    }), 401
        </pre>
        
        <h2>5. Admin Dashboard API</h2>
        <p>Create endpoints for the admin dashboard functionality:</p>
        <pre class="code">
# app/routes/admin.py
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt
from app.models.user import User, UserProfile
from app import db
from datetime import datetime, timedelta
from functools import wraps

admin_bp = Blueprint('admin', __name__, url_prefix='/api/admin')

# Admin authorization decorator
def admin_required(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        jwt = get_jwt()
        if jwt.get('role') != 'admin':
            return jsonify({
                'success': False,
                'message': 'Admin access required'
            }), 403
        return fn(*args, **kwargs)
    return wrapper

@admin_bp.route('/stats', methods=['GET'])
@jwt_required()
@admin_required
def get_dashboard_stats():
    # Get counts from database
    total_students = User.query.filter_by(role='student').count()
    active_students = User.query.filter(
        User.role == 'student',
        User.last_login > (datetime.utcnow() - timedelta(days=7))
    ).count()
    
    # Get subscription statistics
    free_users = UserProfile.query.filter_by(subscription_type='free').count()
    basic_users = UserProfile.query.filter_by(subscription_type='basic').count()
    premium_users = UserProfile.query.filter_by(subscription_type='premium').count()
    group_users = UserProfile.query.filter_by(subscription_type='group').count()
    paid_users = basic_users + premium_users + group_users
    
    # In a real app, you would fetch this data from your database
    # For now, returning mock data similar to the React frontend
    return jsonify({
        'totalStudents': total_students,
        'activeStudents': active_students,
        'newSignupsToday': 27,
        'totalQuestions': 5432,
        'totalConcepts': 1289,
        'totalFlashcards': 3456,
        'totalEngagementHours': 4532,
        'averageMoodScore': 7.8,
        'studentsWithConsistentHabits': 876,
        'averageConfidenceScore': 8.2,
        'totalSessions': 12487,
        'moodBasedSessionsCount': 7832,
        'dailyActiveUsers': 347,
        'weeklyActiveUsers': 762,
        'monthlyActiveUsers': 1042,
        'freeUsers': free_users,
        'paidUsers': paid_users,
        'groupUsers': group_users,
        'subscriptionConversionRate': 24.6,
        'churnRate': 3.2,
        'averageStudyTimePerUser': 42,
        'practiceAttemptsPerUser': 18,
        'weakAreaIdentificationRate': 68,
        'userSatisfactionScore': 87,
        'referralRate': 28,
        'totalRevenue': 127840
    })

@admin_bp.route('/students', methods=['GET'])
@jwt_required()
@admin_required
def get_students():
    page = int(request.args.get('page', 1))
    limit = int(request.args.get('limit', 10))
    
    students = User.query.filter_by(role='student').paginate(
        page=page, per_page=limit, error_out=False
    )
    
    student_list = []
    for student in students.items:
        # Format each student based on the React app's expected format
        profile = student.profile
        student_data = student.to_dict()
        
        if profile:
            student_data.update({
                'examType': profile.exam_goal,
                'studyHours': profile.study_hours_per_day,
                'completedOnboarding': profile.completed_onboarding,
                'subscription': {
                    'type': profile.subscription_type,
                    'planType': profile.subscription_plan_type,
                    'expiresAt': profile.subscription_expires_at.isoformat() if profile.subscription_expires_at else None
                },
                'goals': [goal.title for goal in profile.goals] if profile.goals else [],
                'subjectsSelected': [subject.name for subject in profile.subjects] if profile.subjects else []
            })
        
        student_list.append(student_data)
    
    return jsonify({
        'data': student_list,
        'total': students.total
    })
        </pre>
        
        <h2>6. App Configuration</h2>
        <p>Configure your Flask app with JWT, CORS and PostgreSQL connection:</p>
        <pre class="code">
# app/config.py
import os
from datetime import timedelta

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'dev-secret-key'
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or 'postgresql://postgres:password@localhost/prepzr'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY') or 'jwt-secret-key'
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(days=1)

# app/__init__.py
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from app.config import Config

# Initialize extensions
db = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)
    
    # Initialize extensions with app
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    CORS(app)
    
    # Import and register blueprints
    from app.routes.auth import auth_bp
    from app.routes.admin import admin_bp
    from app.routes.students import students_bp
    from app.routes.content import content_bp
    
    app.register_blueprint(auth_bp)
    app.register_blueprint(admin_bp)
    app.register_blueprint(students_bp)
    app.register_blueprint(content_bp)
    
    return app
        </pre>
        
        <h2>7. Mood-Based Features API</h2>
        <p>Create endpoints for the mood tracking and suggestions features:</p>
        <pre class="code">
# app/routes/students.py
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models.user import User, UserProfile, MoodLog
from app import db
from datetime import datetime, timedelta

students_bp = Blueprint('students', __name__, url_prefix='/api/students')

@students_bp.route('/mood', methods=['POST'])
@jwt_required()
def log_mood():
    user_id = get_jwt_identity()
    data = request.get_json()
    
    mood_type = data.get('mood')
    notes = data.get('notes', '')
    
    # Create new mood log
    mood_log = MoodLog(
        id=f"mood_{datetime.utcnow().timestamp()}",
        user_id=user_id,
        mood_type=mood_type,
        notes=notes,
        timestamp=datetime.utcnow()
    )
    
    # Update user's current mood
    user_profile = UserProfile.query.filter_by(user_id=user_id).first()
    if user_profile:
        user_profile.current_mood = mood_type
    
    db.session.add(mood_log)
    db.session.commit()
    
    # Return personalized suggestions based on mood
    suggestions = get_mood_based_suggestions(mood_type)
    
    return jsonify({
        'success': True,
        'data': {
            'moodLog': mood_log.to_dict(),
            'suggestions': suggestions
        },
        'message': 'Mood logged successfully'
    })

@students_bp.route('/mood/history', methods=['GET'])
@jwt_required()
def get_mood_history():
    user_id = get_jwt_identity()
    days = int(request.args.get('days', 7))
    
    # Get mood logs for the specified time period
    logs = MoodLog.query.filter(
        MoodLog.user_id == user_id,
        MoodLog.timestamp >= datetime.utcnow() - timedelta(days=days)
    ).order_by(MoodLog.timestamp.desc()).all()
    
    mood_data = [log.to_dict() for log in logs]
    
    return jsonify({
        'success': True,
        'data': mood_data,
        'message': f'Retrieved {len(mood_data)} mood logs'
    })

def get_mood_based_suggestions(mood_type):
    """Generate personalized study suggestions based on user's mood."""
    suggestions = []
    
    if mood_type == 'happy' or mood_type == 'motivated' or mood_type == 'focused':
        suggestions = [
            'Great time to tackle challenging concepts!',
            'Try working on practice problems that you find difficult.',
            'Consider helping peers on the discussion forum.'
        ]
    elif mood_type == 'stressed' or mood_type == 'overwhelmed' or mood_type == 'anxious':
        suggestions = [
            'Take a 15-minute break with some deep breathing exercises.',
            'Try working on easier topics to build confidence.',
            'Consider reviewing material you already know well.'
        ]
    elif mood_type == 'tired' or mood_type == 'sad':
        suggestions = [
            'Keep your study session short today (30 minutes max).',
            'Watch a video explanation instead of reading text.',
            'Try a different study environment or change your location.'
        ]
    else:  # neutral, okay, relaxed, curious
        suggestions = [
            'Good time to learn new concepts at a moderate pace.',
            'Mix study with practical examples for better engagement.',
            'Consider participating in a group study session.'
        ]
    
    return suggestions
        </pre>
        
        <h2>8. Deployment</h2>
        <p>Deploy your Flask API with PostgreSQL to match the React app deployment:</p>
        <pre class="code">
# Production deployment using Gunicorn and nginx
# Install: pip install gunicorn

# Create a wsgi.py file in the root directory
from app import create_app

app = create_app()

if __name__ == "__main__":
    app.run()

# Start with Gunicorn
# gunicorn -w 4 -b 0.0.0.0:5000 wsgi:app

# Docker setup (recommended for PostgreSQL deployment)
# Dockerfile
FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:5000", "wsgi:app"]

# docker-compose.yml
version: '3'

services:
  web:
    build: .
    ports:
      - "5000:5000"
    environment:
      - DATABASE_URL=postgresql://postgres:password@db:5432/prepzr
      - SECRET_KEY=your-secret-key
      - JWT_SECRET_KEY=your-jwt-secret-key
    depends_on:
      - db
  
  db:
    image: postgres:15
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=prepzr
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

volumes:
  postgres_data:
        </pre>
        
        <h2>9. Integration with React Components</h2>
        <p>Connect your Flask APIs to the React frontend:</p>
        <pre class="code">
// File: src/services/api/apiClient.ts
import axios from 'axios';

const API_URL = import.meta.env.VITE_FLASK_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add authentication token to requests
apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('prepzr_auth_token');
  
  if (token) {
    config.headers.Authorization = \`Bearer \${token}\`;
  }
  
  return config;
}, error => {
  return Promise.reject(error);
});

// Handle authentication errors
apiClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // Clear auth data and redirect to login
      localStorage.removeItem('prepzr_auth_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;
        </pre>

        <h2>10. Database Migration & Setup</h2>
        <p>Initialize and manage your PostgreSQL database with Flask-Migrate:</p>
        <pre class="code">
# Initialize migrations
$ flask db init

# Create initial migration
$ flask db migrate -m "Initial migration"

# Apply migrations to database
$ flask db upgrade

# Seed database with initial data (create a seed.py file)
from app import create_app, db
from app.models.user import User, AdminUser, UserProfile
import uuid
from datetime import datetime, timedelta

app = create_app()

with app.app_context():
    # Create admin user
    admin = AdminUser(
        id=f"admin_{uuid.uuid4()}",
        name="Admin User",
        email="admin@prepzr.com",
        role="admin",
        permissions=["all"]
    )
    admin.set_password("admin123")
    db.session.add(admin)
    
    # Create demo student
    student_id = f"student_{uuid.uuid4()}"
    student = User(
        id=student_id,
        name="Demo Student",
        email="student@prepzr.com",
        role="student",
        avatar_url="/assets/avatars/student.png",
        login_count=0,
        signup_type="standard"
    )
    student.set_password("student123")
    db.session.add(student)
    
    # Create student profile
    profile = UserProfile(
        id=f"profile_{uuid.uuid4()}",
        user_id=student_id,
        exam_goal="IIT-JEE",
        study_hours_per_day=4,
        study_pace="moderate",
        study_preference="visual",
        completed_onboarding=True,
        current_mood="motivated",
        subscription_type="premium",
        subscription_plan_type="premium_monthly",
        subscription_expires_at=datetime.utcnow() + timedelta(days=30)
    )
    db.session.add(profile)
    
    # Commit changes
    db.session.commit()
    print("Database seeded successfully!")
        </pre>
      </body>
      </html>
    `;
    
    // Create a blob and download it as a Word document
    const blob = new Blob([wordContent], { type: 'application/vnd.ms-word' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'prepzr-flask-postgresql-implementation-guide.doc';
    document.body.appendChild(a);
    a.click();
    
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Download Started",
      description: "PREPZR Flask PostgreSQL implementation guide is being downloaded as a Word document",
      variant: "default"
    });
  };

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Documentation</h1>
          <p className="text-gray-500 dark:text-gray-400">
            System documentation and knowledge resources
          </p>
        </div>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input placeholder="Search documentation..." className="pl-10" />
        </div>
      </div>
      
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Featured Documentation</h2>
        <Button 
          variant="outline" 
          className="flex items-center gap-2" 
          onClick={handleDownloadFlaskGuide}
        >
          <Download size={16} />
          Download Flask MySQL Guide (Word)
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card className="hover:shadow-md transition-all">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-500" />
              <span>Getting Started</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Introduction guides for new administrators and setup instructions.
            </p>
            <button 
              className="text-sm text-blue-600 hover:underline flex items-center gap-1"
              onClick={showToast}
            >
              <span>Read documentation</span>
              <ExternalLink size={14} />
            </button>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-all">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-green-500" />
              <span>AI Model Management</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Learn how to manage and optimize AI personalization models.
            </p>
            <button 
              className="text-sm text-blue-600 hover:underline flex items-center gap-1"
              onClick={showToast}
            >
              <span>Read documentation</span>
              <ExternalLink size={14} />
            </button>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-all">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-purple-500" />
              <span>Content Management</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Guidelines for managing educational content and study materials.
            </p>
            <button 
              className="text-sm text-blue-600 hover:underline flex items-center gap-1"
              onClick={showToast}
            >
              <span>Read documentation</span>
              <ExternalLink size={14} />
            </button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Technical Documentation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Version</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium">System Architecture</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">Technical</td>
                  <td className="px-6 py-4 whitespace-nowrap">Apr 10, 2025</td>
                  <td className="px-6 py-4 whitespace-nowrap">v2.1</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button 
                      className="text-blue-600 hover:underline inline-flex items-center gap-1"
                      onClick={showToast}
                    >
                      <Download size={14} />
                      <span>Download</span>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium">API Documentation</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">Technical</td>
                  <td className="px-6 py-4 whitespace-nowrap">Apr 05, 2025</td>
                  <td className="px-6 py-4 whitespace-nowrap">v3.4</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button 
                      className="text-blue-600 hover:underline inline-flex items-center gap-1"
                      onClick={showToast}
                    >
                      <Download size={14} />
                      <span>Download</span>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium">Flask MySQL Integration</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">Technical</td>
                  <td className="px-6 py-4 whitespace-nowrap">May 01, 2025</td>
                  <td className="px-6 py-4 whitespace-nowrap">v1.0</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button 
                      className="text-blue-600 hover:underline inline-flex items-center gap-1"
                      onClick={handleDownloadFlaskGuide}
                    >
                      <Download size={14} />
                      <span>Download (Word)</span>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium">Database Schema</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">Technical</td>
                  <td className="px-6 py-4 whitespace-nowrap">Mar 28, 2025</td>
                  <td className="px-6 py-4 whitespace-nowrap">v2.8</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button 
                      className="text-blue-600 hover:underline inline-flex items-center gap-1"
                      onClick={showToast}
                    >
                      <Download size={14} />
                      <span>Download</span>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium">Security Guidelines</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">Policy</td>
                  <td className="px-6 py-4 whitespace-nowrap">Mar 15, 2025</td>
                  <td className="px-6 py-4 whitespace-nowrap">v1.9</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button 
                      className="text-blue-600 hover:underline inline-flex items-center gap-1"
                      onClick={showToast}
                    >
                      <Download size={14} />
                      <span>Download</span>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default DocumentationPage;
