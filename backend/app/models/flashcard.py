from app import db
from datetime import datetime

class Flashcard(db.Model):
    __tablename__= 'flashcards'
    id = db.Column(db.Integer, primary_key=True)
    concept_card_id = db.Column(db.Integer, db.ForeignKey('concept_cards.id'), nullable=False)
    question = db.Column(db.Text, nullable=False)
    answer = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)


    concept_card = db.relationship('ConceptCard', back_populates='flashcards')