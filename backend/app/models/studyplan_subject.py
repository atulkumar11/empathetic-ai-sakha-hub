from app import db
from datetime import datetime

class StudyPlanSubject(db.Model):
    __tablename__ = 'study_plan_subjects'
    id = db.Column(db.Integer, primary_key=True)
    study_plan_id = db.Column(db.Integer, db.ForeignKey('study_plans.id'), nullable=False)
    subject_id = db.Column(db.Integer, db.ForeignKey('subjects.id'), nullable=False)
    proficiency_level = db.Column(db.String(20), nullable=False)
    priority = db.Column(db.Integer, nullable=False)
    hours_allocated = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)

    
    study_plan = db.relationship('StudyPlan', back_populates='study_plan_subjects')
    subject = db.relationship('Subject', back_populates='study_plan_subjects')