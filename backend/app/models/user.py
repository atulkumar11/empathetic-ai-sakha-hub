from app import db
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
from app.models.students import StudentProfile
from app.models.studyplan import StudyPlan
from app.models.mood_log import MoodLog


class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.String(36), primary_key=True, nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    phone_number = db.Column(db.String(15))
    password_hash = db.Column(db.String(255), nullable=False)
    role = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)
    updated_at = db.Column(db.DateTime, nullable=False)
    last_login = db.Column(db.DateTime)
    status = db.Column(db.Text, nullable=True)

    profile = db.relationship('StudentProfile', uselist=False, back_populates='user')
    study_plans = db.relationship('StudyPlan', back_populates='user')
    mood_logs = db.relationship('MoodLog', back_populates='user')

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def to_dict(self):
        return {'id': self.id, 'email': self.email, 'name': self.name, 'role': self.role, 'created_at': self.created_at.isoformat()}