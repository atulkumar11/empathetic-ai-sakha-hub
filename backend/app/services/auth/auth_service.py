from app.models.user import User, db
from flask import jsonify
from flask_jwt_extended import create_access_token
from datetime import datetime
import uuid

def register_user(data):
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'message': 'Email already registered'}), 409

    user = User(
        id=str(uuid.uuid4()),
        email=data['email'],
        phone_number=data.get('phone_number'),
        role=data.get('role', 'student'),
        status=data.get('status', 'active'),
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow(),
        last_login=datetime.utcnow()
    )
    user.set_password(data['password'])

    db.session.add(user)
    db.session.commit()

    return jsonify({'message': 'User registered successfully'}), 201

def login_user(data):
    user = User.query.filter_by(email=data['email']).first()
    if user and user.check_password(data['password']):
        user.last_login = datetime.utcnow()
        db.session.commit()

        # Generate the access token
        token = create_access_token(identity=user.id)

        # Return the access token along with the user ID
        return jsonify({
            'access_token': token,
            'user_id': user.id  # Include user_id in the response
        }), 200

    return jsonify({'message': 'Invalid email or password'}), 401
