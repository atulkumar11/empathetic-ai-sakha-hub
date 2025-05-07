from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager

db = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()

def create_app():
    app = Flask(__name__)
    app.config.from_object('config.Config')

    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    CORS(app, resources={r"/api/*": {"origins": "*"}})

    # Import models (after db init)
    from app.models import user, studyplan, studyplan_subject, subject, students, concept_card


    # Register blueprints
    from app.controller .auth.routes import auth_bp
    from app.controller.students.routes import students_bp
    from app.controller.study_plans.routes import plans_bp

    app.register_blueprint(auth_bp, url_prefix='/api/v1/auth')
    app.register_blueprint(students_bp, url_prefix='/api/v1/students')
    app.register_blueprint(plans_bp, url_prefix='/api/v1/study_plans')

    return app
