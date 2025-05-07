from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from app import db
from app.models.students import StudentProfile
from datetime import datetime
from app.services.students.student_service import (create_onboarding_data, fetch_all_students,create_student,fetch_student_by_id, update_student_record)


students_bp = Blueprint('students', __name__)



@students_bp.route('/create', methods=['POST'])
@jwt_required()
def create_student_route():
    data = request.get_json()
    student, status = create_student(data)

    if status == 201:
        return jsonify({
            'message': f'Student profile {student["id"]} created successfully',
            'student_profile': student
        }), status
    else:
        return jsonify(student), status


@students_bp.route('/get_all', methods=['GET'])
@jwt_required()
def get_students():
    students = fetch_all_students()
    return jsonify([student for student in students]), 200


@students_bp.route('/student/<string:id>', methods=['GET'])
@jwt_required()
def get_student_by_id(id):
    student = fetch_student_by_id(id)
    return jsonify(student), 200


@students_bp.route('/student/<string:id>', methods=['PUT'])
@jwt_required()
def update_student(id):
    data = request.get_json()
    student, status = update_student_record(id, data)
    if status == 200:
        return jsonify({
            'message': f'Student profile {id} updated successfully',
            'student_profile': student
        }), status
    else:
        return jsonify(student), status




@students_bp.route('/onboarding/create', methods=['POST'])
@jwt_required()
def create_onboarding_route():
    data = request.get_json()
    onboarding_data, status = create_onboarding_data(data)

    if status == 201:
        return jsonify({
            'message': 'Onboarding data created successfully',
            'onboarding_data': onboarding_data
        }), 201
    else:
        return jsonify(onboarding_data), status
