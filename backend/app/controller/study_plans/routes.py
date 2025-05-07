
from flask import Blueprint, request, jsonify
from app.models.studyplan_subject import StudyPlanSubject
from app.models.subject import Subject
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models.studyplan import StudyPlan, db
plans_bp = Blueprint('study_plans', __name__)

@plans_bp.route('/', methods=['GET'])
@jwt_required()
def get_study_plans():
    user_id = get_jwt_identity()
    query = StudyPlan.query.filter_by(user_id=user_id)
    return paginate_results(query, request)

@plans_bp.route('/<int:plan_id>', methods=['GET'])
@jwt_required()
def get_study_plan(plan_id):
    user_id = get_jwt_identity()
    plan = StudyPlan.query.filter_by(id=plan_id, user_id=user_id).first_or_404()
    plan_data = {'id': plan.id, 'user_id': plan.user_id, 'title': plan.title, 'description': plan.description, 'start_date': plan.start_date, 'end_date': plan.end_date, 'status': plan.status}
    return (jsonify(plan_data), 200)

@plans_bp.route('/create', methods=['POST'])
@jwt_required()
def create_study_plan():
    user_id = get_jwt_identity()
    data = request.get_json()
    plan = StudyPlan(user_id=user_id, title=data['title'], description=data.get('description'), start_date=data['start_date'], end_date=data['end_date'], status='active')
    db.session.add(plan)
    db.session.commit()
    for subject_data in data.get('subjects', []):
        subject = Subject.query.get(subject_data['subject_id'])
        if subject:
            plan_subject = StudyPlanSubject(study_plan_id=plan.id, subject_id=subject.id, proficiency_level=subject_data['proficiency_level'], priority=subject_data['priority'], hours_allocated=subject_data['hours_allocated'])
            db.session.add(plan_subject)
    db.session.commit()
    return (jsonify({'message': f'Study Plan {plan.id} created successfully'}), 201)