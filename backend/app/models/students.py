from app import db
from datetime import datetime

class StudentProfile(db.Model):
    __tablename__ = 'students'

    id = db.Column(db.String(36), primary_key=True)
    user_id = db.Column(db.String(36), db.ForeignKey('users.id'), nullable=False)
    name = db.Column(db.String(255), nullable=False)
    age = db.Column(db.Integer)
    grade = db.Column(db.String(50))
    school = db.Column(db.String(255))
    location = db.Column(db.String(255))
    target_exam = db.Column(db.String(100))
    parent_name = db.Column(db.String(255))
    parent_contact = db.Column(db.String(15))
    profile_image = db.Column(db.String(255))
    personality_type = db.Column(db.String(50))
    created_at = db.Column(db.DateTime, nullable=False)
    updated_at = db.Column(db.DateTime, nullable=False)


    user = db.relationship('User', back_populates='profile')
