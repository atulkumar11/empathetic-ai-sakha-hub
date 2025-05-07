from app import db
from datetime import datetime
from app.models.flashcard import Flashcard  # Import Flashcard here

class ConceptCard(db.Model):
    __tablename__ = 'concept_cards'

    id = db.Column(db.Integer, primary_key=True)
    subject_id = db.Column(db.Integer, db.ForeignKey('subjects.id'), nullable=False) 
    title = db.Column(db.String(200), nullable=False)
    content = db.Column(db.Text, nullable=False)
    difficulty_level = db.Column(db.String(20), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)

    subject = db.relationship('Subject', back_populates='concept_cards') 
    flashcards = db.relationship('Flashcard', back_populates='concept_card') 
