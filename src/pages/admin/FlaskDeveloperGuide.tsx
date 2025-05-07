
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileJson, Database, Code, Server, Play } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const FlaskDeveloperGuide = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  const handleDownloadGuide = () => {
    // Create a blob with Word-compatible HTML content
    const wordContent = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset="utf-8">
        <title>Flask MySQL Integration Guide</title>
        <style>
          body { font-family: Arial, sans-serif; }
          h1 { color: #2563eb; margin-bottom: 16px; }
          h2 { color: #1e40af; margin-top: 24px; margin-bottom: 12px; }
          p { margin-bottom: 16px; line-height: 1.5; }
        </style>
      </head>
      <body>
        <h1>Flask Integration Guide for MySQL</h1>
        <p>Version 1.0.0 | Last Updated: May 1, 2025</p>
        
        <h2>1. Setup & Installation</h2>
        <p>Install required packages using pip:</p>
        <pre>pip install Flask SQLAlchemy Flask-SQLAlchemy mysql-connector-python Flask-Migrate</pre>
        
        <h2>2. Database Configuration</h2>
        <p>Configure your MySQL database connection using SQLAlchemy ORM in your Flask app:</p>
        <pre>
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

app = Flask(__name__)

# MySQL database connection config
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://username:password@localhost/dbname'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize extensions
db = SQLAlchemy(app)
migrate = Migrate(app, db)
        </pre>
        
        <h2>3. API Development</h2>
        <p>Structure your Flask API with blueprints and RESTful endpoints:</p>
        <pre>
# app/routes.py
from flask import Blueprint, jsonify, request

api = Blueprint('api', __name__, url_prefix='/api/v1')

@api.route('/users', methods=['GET'])
def get_users():
    # Query database using SQLAlchemy
    users = User.query.all()
    return jsonify([user.to_dict() for user in users])

@api.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()
    # Create new user in database
    user = User(**data)
    db.session.add(user)
    db.session.commit()
    return jsonify(user.to_dict()), 201

# Register blueprint with app
app.register_blueprint(api)
        </pre>
        
        <h2>4. Models Creation</h2>
        <p>Define SQLAlchemy models that map to your MySQL tables:</p>
        <pre>
# app/models.py
from datetime import datetime
from app import db

class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    posts = db.relationship('Post', backref='author', lazy='dynamic')
    
    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'created_at': self.created_at.isoformat()
        }

class Post(db.Model):
    __tablename__ = 'posts'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), nullable=False)
    content = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
        </pre>
        
        <h2>5. Authentication</h2>
        <p>Implement JWT or session-based authentication with Flask-Login:</p>
        <pre>
# Install Flask-Login and Flask-JWT-Extended
# pip install flask-login flask-jwt-extended

from flask_login import LoginManager, login_user, current_user
from flask_jwt_extended import JWTManager, create_access_token

# Initialize in app
login_manager = LoginManager(app)
jwt = JWTManager(app)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()
    
    if user and user.check_password(data['password']):
        login_user(user)
        access_token = create_access_token(identity=user.id)
        return jsonify(access_token=access_token)
        
    return jsonify({'error': 'Invalid credentials'}), 401
        </pre>
        
        <h2>6. Migrations</h2>
        <p>Use Flask-Migrate to handle database schema changes:</p>
        <pre>
# Initialize migrations
flask db init

# Create a migration
flask db migrate -m "Initial migration"

# Apply migration to database
flask db upgrade
        </pre>
        
        <h2>7. Testing</h2>
        <p>Implement unit and integration tests for your API:</p>
        <pre>
# tests/test_api.py
import unittest
from app import app, db
from app.models import User

class APITestCase(unittest.TestCase):
    def setUp(self):
        app.config['TESTING'] = True
        app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://test_user:test_pass@localhost/test_db'
        self.client = app.test_client()
        db.create_all()
        
    def tearDown(self):
        db.session.remove()
        db.drop_all()
        
    def test_create_user(self):
        response = self.client.post('/api/v1/users', 
                                   json={'username': 'testuser', 'email': 'test@example.com'})
        self.assertEqual(response.status_code, 201)
        self.assertEqual(User.query.count(), 1)
        </pre>
        
        <h2>8. Deployment</h2>
        <p>Deploy using Gunicorn/uWSGI with Nginx:</p>
        <pre>
# Install gunicorn
pip install gunicorn

# Create a wsgi.py file
from app import app as application

if __name__ == "__main__":
    application.run()

# Run with Gunicorn
gunicorn -w 4 -b 127.0.0.1:5000 wsgi:application
        </pre>
        
        <p>Nginx configuration:</p>
        <pre>
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://127.0.0.1:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
        </pre>
      </body>
      </html>
    `;
    
    // Create a blob and download it as a Word document
    const blob = new Blob([wordContent], { type: 'application/vnd.ms-word' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'flask-mysql-integration-guide.doc';
    document.body.appendChild(a);
    a.click();
    
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Download Started",
      description: "Flask MySQL integration guide is being downloaded as a Word document",
      variant: "default"
    });
  };

  const handleViewDatabaseSchema = () => {
    navigate('/database/schema');
  };
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold">Flask MySQL Developer Guide</h1>
        
        <div className="flex gap-2">
          <Button onClick={handleViewDatabaseSchema} className="gap-2 bg-blue-600">
            <Database size={16} />
            View Database Schema
          </Button>
          <Button onClick={handleDownloadGuide} className="gap-2">
            <Download size={16} />
            Download Guide
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <Code size={16} />
            Overview
          </TabsTrigger>
          <TabsTrigger value="features" className="flex items-center gap-2">
            <Play size={16} />
            Feature Implementation
          </TabsTrigger>
          <TabsTrigger value="models" className="flex items-center gap-2">
            <Database size={16} />
            Database Models
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code size={20} className="text-blue-500" />
                Flask Integration Overview
              </CardTitle>
              <CardDescription>
                This guide provides comprehensive instructions for integrating a Flask
                application with MySQL database for backend development.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-1">1. Setup & Installation</h3>
                  <p className="text-sm text-muted-foreground">
                    Install required packages: Flask, SQLAlchemy, Flask-SQLAlchemy, mysql-connector-python
                  </p>
                  <pre className="bg-slate-100 p-3 rounded-md text-xs mt-2 overflow-x-auto">
                    pip install Flask SQLAlchemy Flask-SQLAlchemy mysql-connector-python Flask-Migrate
                  </pre>
                </div>
                
                <div>
                  <h3 className="font-medium mb-1">2. Database Configuration</h3>
                  <p className="text-sm text-muted-foreground">
                    Configure MySQL database connection using SQLAlchemy ORM
                  </p>
                  <pre className="bg-slate-100 p-3 rounded-md text-xs mt-2 overflow-x-auto">
{`from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

app = Flask(__name__)

# MySQL database connection config
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://username:password@localhost/prepzr_app'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize extensions
db = SQLAlchemy(app)
migrate = Migrate(app, db)`}
                  </pre>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                  <h3 className="font-medium mb-2 flex items-center gap-2">
                    <Server size={18} className="text-blue-600" />
                    Project Structure Recommendation
                  </h3>
                  <p className="text-sm mb-3">
                    Organize your Flask application following this structure for maintainability:
                  </p>
                  <pre className="bg-white p-3 rounded-md text-xs overflow-x-auto">
{`prepzr_api/
├── app/
│   ├── __init__.py           # Application factory
│   ├── auth/                 # Authentication module
│   ├── models/               # Database models
│   ├── api/                  # API endpoints
│   │   ├── __init__.py
│   │   ├── users.py
│   │   ├── study_plans.py
│   │   └── content.py
│   ├── services/             # Business logic
│   └── utils/                # Helper functions
├── migrations/               # Database migrations
├── tests/                    # Test cases
├── config.py                 # Configuration
├── wsgi.py                   # WSGI entry point
└── requirements.txt          # Dependencies`}
                  </pre>
                </div>
              </div>
              
              <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 p-4 rounded-md">
                <h3 className="font-medium mb-2">Getting Started Steps</h3>
                <ol className="list-decimal list-inside space-y-2 text-sm">
                  <li>Install Python 3.9+ and required packages</li>
                  <li>Clone the Flask API template repository</li>
                  <li>Set up your database credentials in config.py</li>
                  <li>Initialize and run database migrations</li>
                  <li>Start the development server</li>
                  <li>Connect your React frontend to the Flask backend</li>
                </ol>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleDownloadGuide} className="w-full gap-2">
                <Download size={16} />
                Download Complete Implementation Guide
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="features">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Play size={20} className="text-green-500" />
                Feature-by-Feature Implementation
              </CardTitle>
              <CardDescription>
                Step-by-step guidance for implementing each major feature in Flask
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="users">
                  <AccordionTrigger className="hover:bg-slate-50 px-4 -mx-4 rounded-md">
                    <div className="flex items-center gap-3">
                      <Badge className="bg-blue-100 text-blue-800 border-blue-200">Core</Badge>
                      User Authentication
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="bg-slate-50 p-4 rounded-md">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium">Database Models</h4>
                        <pre className="bg-white p-3 rounded-md text-xs mt-2 overflow-x-auto">
{`# app/models/user.py
from app import db
from werkzeug.security import generate_password_hash, check_password_hash

class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.String(36), primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password_hash = db.Column(db.String(200))
    role = db.Column(db.String(20), nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
        
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)`}
                        </pre>
                      </div>
                      
                      <div>
                        <h4 className="font-medium">API Endpoints</h4>
                        <pre className="bg-white p-3 rounded-md text-xs mt-2 overflow-x-auto">
{`# app/api/auth.py
from flask import Blueprint, request, jsonify
from app.models.user import User
from app import db
import uuid

auth_bp = Blueprint('auth', __name__, url_prefix='/api/v1/auth')

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    
    # Check if user exists
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'error': 'Email already registered'}), 400
        
    # Create new user
    user = User(
        id=str(uuid.uuid4()),
        name=data['name'],
        email=data['email'],
        role='student'
    )
    user.set_password(data['password'])
    
    db.session.add(user)
    db.session.commit()
    
    return jsonify({'message': 'User registered successfully'}), 201`}
                        </pre>
                      </div>
                      
                      <div>
                        <h4 className="font-medium">Implementation Steps</h4>
                        <ol className="list-decimal list-inside space-y-2 text-sm mt-2">
                          <li>Create the User model with required fields</li>
                          <li>Implement password hashing with Werkzeug</li>
                          <li>Create register, login, and refresh token endpoints</li>
                          <li>Set up JWT authentication with Flask-JWT-Extended</li>
                          <li>Create protected route decorators</li>
                        </ol>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="study-plans">
                  <AccordionTrigger className="hover:bg-slate-50 px-4 -mx-4 rounded-md">
                    <div className="flex items-center gap-3">
                      <Badge className="bg-purple-100 text-purple-800 border-purple-200">Core</Badge>
                      Study Plans
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="bg-slate-50 p-4 rounded-md">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium">Database Models</h4>
                        <pre className="bg-white p-3 rounded-md text-xs mt-2 overflow-x-auto">
{`# app/models/study_plan.py
from app import db

class StudyPlan(db.Model):
    __tablename__ = 'study_plans'
    
    id = db.Column(db.String(36), primary_key=True)
    student_id = db.Column(db.String(36), db.ForeignKey('students.id'), nullable=False)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    start_date = db.Column(db.Date)
    end_date = db.Column(db.Date)
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    weekly_hours = db.Column(db.Integer)
    exam_goal = db.Column(db.String(100))
    exam_date = db.Column(db.Date)
    
    # Relationships
    subjects = db.relationship('StudyPlanSubject', backref='plan', lazy=True)
    student = db.relationship('Student', backref='study_plans')`}
                        </pre>
                      </div>
                      
                      <div>
                        <h4 className="font-medium">API Endpoints</h4>
                        <pre className="bg-white p-3 rounded-md text-xs mt-2 overflow-x-auto">
{`# app/api/study_plans.py
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models.study_plan import StudyPlan, StudyPlanSubject
from app.models.student import Student
from app import db
import uuid

plans_bp = Blueprint('plans', __name__, url_prefix='/api/v1/study-plans')

@plans_bp.route('/', methods=['POST'])
@jwt_required()
def create_study_plan():
    user_id = get_jwt_identity()
    student = Student.query.filter_by(user_id=user_id).first()
    
    if not student:
        return jsonify({'error': 'Student record not found'}), 404
        
    data = request.get_json()
    
    # Create study plan
    plan = StudyPlan(
        id=str(uuid.uuid4()),
        student_id=student.id,
        title=data['title'],
        description=data.get('description'),
        start_date=data.get('start_date'),
        end_date=data.get('end_date'),
        weekly_hours=data.get('weekly_hours'),
        exam_goal=data.get('exam_goal'),
        exam_date=data.get('exam_date')
    )
    
    db.session.add(plan)
    
    # Add subjects
    for subject_data in data.get('subjects', []):
        subject = StudyPlanSubject(
            id=str(uuid.uuid4()),
            plan_id=plan.id,
            subject_id=subject_data['subject_id'],
            hours_per_week=subject_data.get('hours_per_week'),
            priority=subject_data.get('priority', 'medium'),
            color=subject_data.get('color', '#4285F4')
        )
        db.session.add(subject)
    
    db.session.commit()
    
    return jsonify({'id': plan.id, 'message': 'Study plan created successfully'}), 201`}
                        </pre>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="mood-tracking">
                  <AccordionTrigger className="hover:bg-slate-50 px-4 -mx-4 rounded-md">
                    <div className="flex items-center gap-3">
                      <Badge className="bg-amber-100 text-amber-800 border-amber-200">Feature</Badge>
                      Mood Tracking
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="bg-slate-50 p-4 rounded-md">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium">Database Models</h4>
                        <pre className="bg-white p-3 rounded-md text-xs mt-2 overflow-x-auto">
{`# app/models/mood.py
from app import db

class MoodLog(db.Model):
    __tablename__ = 'mood_logs'
    
    id = db.Column(db.String(36), primary_key=True)
    student_id = db.Column(db.String(36), db.ForeignKey('students.id'), nullable=False)
    mood_type = db.Column(db.String(20), nullable=False)  # happy, focused, tired, etc.
    mood_score = db.Column(db.Integer)  # 1-10 numerical representation
    note = db.Column(db.Text)
    logged_at = db.Column(db.DateTime, server_default=db.func.now())
    study_session_id = db.Column(db.String(36), db.ForeignKey('study_sessions.id'), nullable=True)
    
    # Relationships
    student = db.relationship('Student', backref='mood_logs')
    study_session = db.relationship('StudySession', backref='mood_logs')`}
                        </pre>
                      </div>
                      
                      <div>
                        <h4 className="font-medium">Implementation Steps</h4>
                        <ol className="list-decimal list-inside space-y-2 text-sm mt-2">
                          <li>Create the MoodLog model</li>
                          <li>Add endpoints for creating and retrieving mood logs</li>
                          <li>Implement mood analytics for tracking patterns</li>
                          <li>Connect with study sessions to correlate mood with study productivity</li>
                        </ol>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="subscription">
                  <AccordionTrigger className="hover:bg-slate-50 px-4 -mx-4 rounded-md">
                    <div className="flex items-center gap-3">
                      <Badge className="bg-green-100 text-green-800 border-green-200">Feature</Badge>
                      Subscription Management
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="bg-slate-50 p-4 rounded-md">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium">Database Models</h4>
                        <pre className="bg-white p-3 rounded-md text-xs mt-2 overflow-x-auto">
{`# app/models/subscription.py
from app import db

class Subscription(db.Model):
    __tablename__ = 'subscriptions'
    
    id = db.Column(db.String(36), primary_key=True)
    user_id = db.Column(db.String(36), db.ForeignKey('users.id'), nullable=False)
    plan_id = db.Column(db.String(36), db.ForeignKey('subscription_plans.id'), nullable=False)
    start_date = db.Column(db.Date, nullable=False)
    end_date = db.Column(db.Date, nullable=False)
    status = db.Column(db.String(20), default='active')  # active, expired, canceled
    auto_renew = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    
    # Relationships
    user = db.relationship('User', backref='subscriptions')
    plan = db.relationship('SubscriptionPlan')

class SubscriptionPlan(db.Model):
    __tablename__ = 'subscription_plans'
    
    id = db.Column(db.String(36), primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    price = db.Column(db.Numeric(10, 2), nullable=False)
    currency = db.Column(db.String(3), default='USD')
    duration_days = db.Column(db.Integer, nullable=False)
    features = db.Column(db.JSON)
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())`}
                        </pre>
                      </div>
                      
                      <div>
                        <h4 className="font-medium">API Integration with Payment Gateway</h4>
                        <pre className="bg-white p-3 rounded-md text-xs mt-2 overflow-x-auto">
{`# app/api/subscriptions.py
from flask import Blueprint, request, jsonify, current_app
from flask_jwt_extended import jwt_required, get_jwt_identity
import stripe
import uuid
from datetime import datetime, timedelta
from app.models.subscription import Subscription, SubscriptionPlan
from app.models.user import User
from app import db

subs_bp = Blueprint('subscriptions', __name__, url_prefix='/api/v1/subscriptions')

@subs_bp.route('/plans', methods=['GET'])
def get_plans():
    plans = SubscriptionPlan.query.filter_by(is_active=True).all()
    return jsonify([{
        'id': plan.id,
        'name': plan.name,
        'description': plan.description,
        'price': float(plan.price),
        'currency': plan.currency,
        'duration_days': plan.duration_days,
        'features': plan.features
    } for plan in plans])

@subs_bp.route('/subscribe', methods=['POST'])
@jwt_required()
def create_subscription():
    user_id = get_jwt_identity()
    data = request.get_json()
    
    # Get the plan
    plan = SubscriptionPlan.query.get(data['plan_id'])
    if not plan:
        return jsonify({'error': 'Invalid plan selected'}), 400
        
    # Set up payment intent with Stripe
    stripe.api_key = current_app.config['STRIPE_SECRET_KEY']
    
    try:
        # Create payment intent
        intent = stripe.PaymentIntent.create(
            amount=int(float(plan.price) * 100),  # Convert to cents
            currency=plan.currency.lower(),
            metadata={'user_id': user_id, 'plan_id': plan.id}
        )
        
        # Return client secret for frontend to complete payment
        return jsonify({
            'client_secret': intent.client_secret,
            'plan': {
                'name': plan.name,
                'price': float(plan.price),
                'currency': plan.currency
            }
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 400`}
                        </pre>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="batch-management">
                  <AccordionTrigger className="hover:bg-slate-50 px-4 -mx-4 rounded-md">
                    <div className="flex items-center gap-3">
                      <Badge className="bg-indigo-100 text-indigo-800 border-indigo-200">Feature</Badge>
                      Batch Management
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="bg-slate-50 p-4 rounded-md">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium">Database Models</h4>
                        <pre className="bg-white p-3 rounded-md text-xs mt-2 overflow-x-auto">
{`# app/models/batch.py
from app import db
import random
import string

class StudyBatch(db.Model):
    __tablename__ = 'study_batches'
    
    id = db.Column(db.String(36), primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    created_by = db.Column(db.String(36), db.ForeignKey('students.id'), nullable=False)
    invite_code = db.Column(db.String(12), unique=True, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    max_members = db.Column(db.Integer, default=10)
    is_active = db.Column(db.Boolean, default=True)
    
    # Relationships
    creator = db.relationship('Student', foreign_keys=[created_by], backref='created_batches')
    members = db.relationship('BatchMember', backref='batch', lazy=True)
    
    @staticmethod
    def generate_invite_code():
        # Generate a random code like "SAKHA-ABC123"
        prefix = "SAKHA-"
        chars = string.ascii_uppercase + string.digits
        code = prefix + ''.join(random.choice(chars) for _ in range(6))
        return code

class BatchMember(db.Model):
    __tablename__ = 'batch_members'
    
    id = db.Column(db.String(36), primary_key=True)
    batch_id = db.Column(db.String(36), db.ForeignKey('study_batches.id'), nullable=False)
    student_id = db.Column(db.String(36), db.ForeignKey('students.id'), nullable=False)
    joined_at = db.Column(db.DateTime, server_default=db.func.now())
    role = db.Column(db.String(20), default='member')  # member, admin
    
    # Relationships
    student = db.relationship('Student', backref='batch_memberships')`}
                        </pre>
                      </div>
                      
                      <div>
                        <h4 className="font-medium">API Endpoints</h4>
                        <pre className="bg-white p-3 rounded-md text-xs mt-2 overflow-x-auto">
{`# app/api/batches.py
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
import uuid
from app.models.batch import StudyBatch, BatchMember
from app.models.student import Student
from app import db

batches_bp = Blueprint('batches', __name__, url_prefix='/api/v1/batches')

@batches_bp.route('/', methods=['POST'])
@jwt_required()
def create_batch():
    user_id = get_jwt_identity()
    student = Student.query.filter_by(user_id=user_id).first()
    
    if not student:
        return jsonify({'error': 'Student record not found'}), 404
        
    data = request.get_json()
    
    # Generate a unique invite code
    invite_code = StudyBatch.generate_invite_code()
    while StudyBatch.query.filter_by(invite_code=invite_code).first():
        invite_code = StudyBatch.generate_invite_code()
    
    # Create batch
    batch = StudyBatch(
        id=str(uuid.uuid4()),
        name=data['name'],
        description=data.get('description', ''),
        created_by=student.id,
        invite_code=invite_code,
        max_members=data.get('max_members', 10)
    )
    
    db.session.add(batch)
    
    # Add creator as first member and admin
    member = BatchMember(
        id=str(uuid.uuid4()),
        batch_id=batch.id,
        student_id=student.id,
        role='admin'
    )
    
    db.session.add(member)
    db.session.commit()
    
    return jsonify({
        'id': batch.id,
        'name': batch.name,
        'invite_code': batch.invite_code,
        'message': 'Batch created successfully'
    }), 201

@batches_bp.route('/join', methods=['POST'])
@jwt_required()
def join_batch():
    user_id = get_jwt_identity()
    student = Student.query.filter_by(user_id=user_id).first()
    
    if not student:
        return jsonify({'error': 'Student record not found'}), 404
        
    data = request.get_json()
    invite_code = data.get('invite_code')
    
    if not invite_code:
        return jsonify({'error': 'Invite code is required'}), 400
        
    # Find batch by invite code
    batch = StudyBatch.query.filter_by(invite_code=invite_code, is_active=True).first()
    
    if not batch:
        return jsonify({'error': 'Invalid or expired invite code'}), 404
        
    # Check if already a member
    existing_member = BatchMember.query.filter_by(
        batch_id=batch.id,
        student_id=student.id
    ).first()
    
    if existing_member:
        return jsonify({'error': 'Already a member of this batch'}), 400
        
    # Check if batch is full
    current_members = BatchMember.query.filter_by(batch_id=batch.id).count()
    
    if current_members >= batch.max_members:
        return jsonify({'error': 'Batch is full'}), 400
        
    # Add as new member
    member = BatchMember(
        id=str(uuid.uuid4()),
        batch_id=batch.id,
        student_id=student.id,
        role='member'
    )
    
    db.session.add(member)
    db.session.commit()
    
    return jsonify({
        'id': batch.id,
        'name': batch.name,
        'message': 'Successfully joined batch'
    }), 200`}
                        </pre>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="models">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database size={20} className="text-blue-500" />
                Database Models Reference
              </CardTitle>
              <CardDescription>
                Complete SQLAlchemy models for the Prepzr application
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Button onClick={handleViewDatabaseSchema} className="gap-2 text-xs">
                  <Database size={14} />
                  View Interactive Database Schema
                </Button>
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Table Name</TableHead>
                    <TableHead>Purpose</TableHead>
                    <TableHead>Related Tables</TableHead>
                    <TableHead className="text-right">Fields</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">users</TableCell>
                    <TableCell>Core user accounts</TableCell>
                    <TableCell>students, teachers, admins</TableCell>
                    <TableCell className="text-right">8</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">students</TableCell>
                    <TableCell>Student-specific data</TableCell>
                    <TableCell>users, study_sessions, mood_logs</TableCell>
                    <TableCell className="text-right">12</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">study_plans</TableCell>
                    <TableCell>Study planning</TableCell>
                    <TableCell>students, study_plan_subjects</TableCell>
                    <TableCell className="text-right">12</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">mood_logs</TableCell>
                    <TableCell>Mood tracking</TableCell>
                    <TableCell>students, study_sessions</TableCell>
                    <TableCell className="text-right">7</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">study_sessions</TableCell>
                    <TableCell>Study activity</TableCell>
                    <TableCell>students, subjects, mood_logs</TableCell>
                    <TableCell className="text-right">10</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              
              <div className="mt-6 bg-slate-50 p-4 rounded-lg">
                <h3 className="font-medium mb-3">Project Overview</h3>
                <p className="text-sm mb-4">
                  The Prepzr database consists of {29} tables organized into several functional groups:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-3 rounded-lg border border-slate-200">
                    <h4 className="font-medium text-sm mb-2">User Management</h4>
                    <ul className="text-xs space-y-1">
                      <li>users, students, teachers, admin_users</li>
                      <li>Handles authentication and user profiles</li>
                    </ul>
                  </div>
                  
                  <div className="bg-white p-3 rounded-lg border border-slate-200">
                    <h4 className="font-medium text-sm mb-2">Study Planning</h4>
                    <ul className="text-xs space-y-1">
                      <li>study_plans, student_subjects, study_plan_topics</li>
                      <li>Manages academic planning and organization</li>
                    </ul>
                  </div>
                  
                  <div className="bg-white p-3 rounded-lg border border-slate-200">
                    <h4 className="font-medium text-sm mb-2">Content & Learning</h4>
                    <ul className="text-xs space-y-1">
                      <li>concept_cards, flashcards, practice_exams</li>
                      <li>Stores educational content and assessments</li>
                    </ul>
                  </div>
                  
                  <div className="bg-white p-3 rounded-lg border border-slate-200">
                    <h4 className="font-medium text-sm mb-2">Activity Tracking</h4>
                    <ul className="text-xs space-y-1">
                      <li>study_sessions, mood_logs, daily_tasks</li>
                      <li>Records student activities and emotional states</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <Button onClick={handleDownloadGuide} className="w-full gap-2 text-sm">
                  <FileJson size={16} />
                  Download Complete Model Definitions
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <p className="text-sm text-gray-500 mt-4">
        Version: 1.0.0 | Last updated: May 1, 2025
      </p>
    </div>
  );
};

export default FlaskDeveloperGuide;
