import uuid
from datetime import datetime
from flask import abort
from app import db
from app.models.students import StudentProfile
from app.models.user import User
from app.models.onboarding import OnboardingData


def set_attrs_from_data(instance, data, allowed_fields):
    for field in allowed_fields:
        if field in data:
            setattr(instance, field, data[field])


def fetch_all_students():
    students = StudentProfile.query.all()
    return [
        {
            'id': student.id,
            'user_id': student.user_id,
            'name': student.name,
            'age': student.age,
            'grade': student.grade,
            'school': student.school,
            'location': student.location,
            'target_exam': student.target_exam,
            'parent_name': student.parent_name,
            'parent_contact': student.parent_contact,
            'profile_image': student.profile_image,
            'personality_type': student.personality_type,
            'created_at': student.created_at.isoformat(),
            'updated_at': student.updated_at.isoformat()
        }
        for student in students
    ]



def create_student(data):
    try:
        if not User.query.filter_by(id=data['user_id']).first():
            return {'error': f'User with ID {data["user_id"]} does not exist'}, 400

        new_student = StudentProfile(
            id=str(uuid.uuid4()),
            user_id=data['user_id'],
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow()
        )

        allowed_fields = [
            'name', 'age', 'grade', 'school', 'location',
            'target_exam', 'parent_name', 'parent_contact',
            'profile_image', 'personality_type'
        ]

        set_attrs_from_data(new_student, data, allowed_fields)

        db.session.add(new_student)
        db.session.commit()

        # inline return as dict (no separate serialize_student call)
        student_data = {
            'id': new_student.id,
            'user_id': new_student.user_id,
            'name': new_student.name,
            'age': new_student.age,
            'grade': new_student.grade,
            'school': new_student.school,
            'location': new_student.location,
            'target_exam': new_student.target_exam,
            'parent_name': new_student.parent_name,
            'parent_contact': new_student.parent_contact,
            'profile_image': new_student.profile_image,
            'personality_type': new_student.personality_type,
            'created_at': new_student.created_at.isoformat(),
            'updated_at': new_student.updated_at.isoformat()
        }

        return student_data, 201
    except Exception as e:
        return {'error': f'Error creating student: {str(e)}'}, 400



def fetch_student_by_id(student_id):
    student = StudentProfile.query.get_or_404(student_id)
    return {
        'id': student.id,
        'user_id': student.user_id,
        'name': student.name,
        'age': student.age,
        'grade': student.grade,
        'school': student.school,
        'location': student.location,
        'target_exam': student.target_exam,
        'parent_name': student.parent_name,
        'parent_contact': student.parent_contact,
        'profile_image': student.profile_image,
        'personality_type': student.personality_type,
        'created_at': student.created_at.isoformat(),
        'updated_at': student.updated_at.isoformat()
    }

def update_student_record(student_id, data):
    student = StudentProfile.query.get_or_404(student_id)
    try:
        allowed_fields = [
            'name', 'age', 'grade', 'school', 'location',
            'target_exam', 'parent_name', 'parent_contact',
            'profile_image', 'personality_type'
        ]

        set_attrs_from_data(student, data, allowed_fields)

        if 'exam_date' in data:
            student.exam_date = datetime.strptime(data['exam_date'], '%Y-%m-%d')

        student.updated_at = datetime.utcnow()

        db.session.commit()

        # Returning dict directly
        return {
            'id': student.id,
            'user_id': student.user_id,
            'name': student.name,
            'age': student.age,
            'grade': student.grade,
            'school': student.school,
            'location': student.location,
            'target_exam': student.target_exam,
            'parent_name': student.parent_name,
            'parent_contact': student.parent_contact,
            'profile_image': student.profile_image,
            'personality_type': student.personality_type,
            'created_at': student.created_at.isoformat(),
            'updated_at': student.updated_at.isoformat()
        }, 200
    except Exception as e:
        db.session.rollback()
        return {'error': f'Error updating student: {str(e)}'}, 400




def create_onboarding_data(data):
    try:
        user = User.query.filter_by(id=data['user_id']).first()
        if not user:
            return {'error': 'User not found'}, 400

        onboarding = OnboardingData(
            id=str(uuid.uuid4()),
            user_id=data['user_id'],
            goal=data.get('goal'),
            sleep_schedule=data.get('sleep_schedule'),
            focus_hours=data.get('focus_hours'),
            stress_management=data.get('stress_management'),
            break_routine=data.get('break_routine'),
            interests=data.get('interests'),
            completed=data.get('completed', False),
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow()
        )

        db.session.add(onboarding)
        db.session.commit()

        # Inline serialization
        onboarding_data = {
            'id': onboarding.id,
            'user_id': onboarding.user_id,
            'goal': onboarding.goal,
            'sleep_schedule': onboarding.sleep_schedule,
            'focus_hours': onboarding.focus_hours,
            'stress_management': onboarding.stress_management,
            'break_routine': onboarding.break_routine,
            'interests': onboarding.interests,
            'completed': onboarding.completed,
            'created_at': onboarding.created_at.isoformat(),
            'updated_at': onboarding.updated_at.isoformat()
        }

        return onboarding_data, 201

    except Exception as e:
        return {'error': f'Failed to create onboarding data: {str(e)}'}, 500
