from app import db
from datetime import datetime
import uuid
from sqlalchemy.dialects.postgresql import JSON

class OnboardingData(db.Model):
    __tablename__ = 'onboarding_data'

    id = db.Column(db.String(36), primary_key=True, nullable=False, default=lambda: str(uuid.uuid4()))
    user_id = db.Column(db.String(36), db.ForeignKey('users.id'), nullable=False)
    goal = db.Column(db.String(100))
    sleep_schedule = db.Column(db.String(100))
    focus_hours = db.Column(db.Integer)
    stress_management = db.Column(db.String(100))
    break_routine = db.Column(db.String(100))
    interests = db.Column(JSON)
    completed = db.Column(db.Boolean, nullable=False, default=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = db.relationship('User', backref=db.backref('onboarding_data', lazy=True))
