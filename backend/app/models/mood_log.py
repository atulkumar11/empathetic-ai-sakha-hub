from app import db
from datetime import datetime

class MoodLog(db.Model):
    __tablename__ = 'mood_logs'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    mood_type = db.Column(db.String(50), nullable=False)
    intensity = db.Column(db.Integer, nullable=False)
    notes = db.Column(db.Text)
    logged_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    user = db.relationship('User', back_populates='mood_logs')