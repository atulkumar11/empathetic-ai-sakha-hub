from app import db
from datetime import datetime

class Subject(db.Model):
    __tablename__ = 'subjects' 
     
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    category = db.Column(db.String(100))
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)

    study_plan_subjects = db.relationship('StudyPlanSubject', back_populates='subject')
    concept_cards = db.relationship('ConceptCard', back_populates='subject')
