/**
 * Database Schema Export Utility - CSV Format
 * This file provides a comprehensive database schema in CSV format
 */

// Function to get the database schema as CSV
export const getDatabaseSchemaCSV = (): string => {
  // CSV header
  const csvHeader = "Table,Field,Type,Description,Related Feature\n";
  
  // Raw CSV data
  const csvData = `users,id,UUID,"Primary key, unique identifier",User Management
users,email,VARCHAR,User email for login/authentication,Authentication
users,password_hash,VARCHAR,Hashed user password,Authentication
users,name,VARCHAR,User's full name,Profile Management
users,role,ENUM,Role (student/teacher/admin),User Management
users,created_at,TIMESTAMP,Account creation timestamp,Analytics/Auditing
users,updated_at,TIMESTAMP,Last account update timestamp,Analytics/Auditing
users,last_login,TIMESTAMP,Last login timestamp,Security/Analytics

students,id,UUID,"Primary key, unique identifier",Student Management
students,user_id,UUID,Foreign key to users table,User Management
students,grade,VARCHAR,Student's academic grade,Academic Planning
students,exam_type,VARCHAR,Exam preparing for (JEE/NEET/UPSC),Exam Preparation
students,target_score,INTEGER,Target exam score,Goal Setting
students,phone_number,VARCHAR,Contact number,Communication
students,onboarding_completed,BOOLEAN,Onboarding status flag,User Experience
students,last_active,TIMESTAMP,Last activity timestamp,Engagement Tracking
students,mood,ENUM,Current mood state,Mood Tracking
students,study_streak,INTEGER,Consecutive study days,Gamification
students,gender,ENUM,Student gender,Demographics

student_subjects,id,UUID,"Primary key, unique identifier",Subject Management
student_subjects,student_id,UUID,Foreign key to students table,Student Management
student_subjects,subject_name,VARCHAR,Subject name,Academic Content
student_subjects,proficiency_level,INTEGER,Self-rated proficiency,Learning Assessment
student_subjects,is_priority,BOOLEAN,Priority subject flag,Study Planning
student_subjects,topics_completed,INTEGER,Completed topics count,Progress Tracking
student_subjects,topics_total,INTEGER,Total topics count,Content Management
student_subjects,created_at,TIMESTAMP,Record creation timestamp,Analytics

mood_logs,id,UUID,"Primary key, unique identifier",Mood Tracking
mood_logs,student_id,UUID,Foreign key to students table,Student Management
mood_logs,mood_type,ENUM,Type of mood (happy/stressed/etc),Emotional Intelligence
mood_logs,mood_score,INTEGER,Numerical mood score (1-10),Mood Analytics
mood_logs,note,TEXT,Optional notes about mood,Self-reflection
mood_logs,logged_at,TIMESTAMP,When mood was logged,Temporal Analysis
mood_logs,study_session_id,UUID,Related study session (optional),Correlation Analysis

study_sessions,id,UUID,"Primary key, unique identifier",Study Tracking
study_sessions,student_id,UUID,Foreign key to students table,Student Management
study_sessions,subject_id,UUID,Subject studied,Subject Management
study_sessions,start_time,TIMESTAMP,Session start time,Time Management
study_sessions,end_time,TIMESTAMP,Session end time,Time Management
study_sessions,duration_minutes,INTEGER,Session duration,Study Analytics
study_sessions,mood_before_id,UUID,Mood before session,Mood Correlation
study_sessions,mood_after_id,UUID,Mood after session,Mood Correlation
study_sessions,productivity_rating,INTEGER,Self-rated productivity,Self-assessment
study_sessions,concepts_covered,INTEGER,Number of concepts covered,Learning Progress

study_plans,id,UUID,"Primary key, unique identifier",Academic Planning
study_plans,student_id,UUID,Foreign key to students table,Student Management
study_plans,title,VARCHAR,Plan title,Organization
study_plans,description,TEXT,Plan description,Documentation
study_plans,start_date,DATE,Plan start date,Time Management
study_plans,end_date,DATE,Plan end date,Goal Setting
study_plans,is_active,BOOLEAN,Whether plan is active,Plan Management
study_plans,created_at,TIMESTAMP,Plan creation timestamp,Analytics
study_plans,updated_at,TIMESTAMP,Plan update timestamp,Revision History
study_plans,weeklyHours,INTEGER,Weekly study hours target,Time Management
study_plans,examGoal,VARCHAR,Target exam name,Goal Setting
study_plans,examDate,DATE,Target exam date,Deadline Management

study_plan_subjects,id,UUID,"Primary key, unique identifier",Plan Details
study_plan_subjects,plan_id,UUID,Foreign key to study_plans,Plan Management
study_plan_subjects,subject_id,UUID,Subject reference,Subject Management
study_plan_subjects,hours_per_week,INTEGER,Weekly hours allocation,Time Management
study_plan_subjects,priority,ENUM,Priority level (high/medium/low),Priority Management
study_plan_subjects,proficiency,ENUM,Current proficiency level,Learning Assessment
study_plan_subjects,color,VARCHAR,Color code for UI display,UI Personalization

study_plan_topics,id,UUID,"Primary key, unique identifier",Topic Management
study_plan_topics,plan_subject_id,UUID,Foreign key to study_plan_subjects,Subject Management
study_plan_topics,name,VARCHAR,Topic name,Content Organization
study_plan_topics,difficulty,ENUM,Difficulty level,Challenge Calibration
study_plan_topics,status,ENUM,Completion status,Progress Tracking
study_plan_topics,estimated_hours,FLOAT,Estimated study hours,Time Planning
study_plan_topics,scheduled_date,DATE,Planned study date,Calendar Management

concept_cards,id,UUID,"Primary key, unique identifier",Learning Content
concept_cards,subject,VARCHAR,Subject area,Subject Management
concept_cards,topic,VARCHAR,Specific topic,Topic Management
concept_cards,title,VARCHAR,Concept title,Content Organization
concept_cards,content,TEXT,Card content,Learning Material
concept_cards,difficulty_level,INTEGER,Difficulty level (1-5),Challenge Calibration
concept_cards,created_by,UUID,Creator reference,Content Attribution
concept_cards,created_at,TIMESTAMP,Creation timestamp,Content Management
concept_cards,updated_at,TIMESTAMP,Update timestamp,Revision History
concept_cards,flashcards_count,INTEGER,Related flashcards count,Learning Resources

flashcards,id,UUID,"Primary key, unique identifier",Spaced Repetition
flashcards,concept_id,UUID,Related concept card,Concept Linkage
flashcards,question,TEXT,Flashcard question,Testing Knowledge
flashcards,answer,TEXT,Flashcard answer,Knowledge Reinforcement
flashcards,difficulty,INTEGER,Difficulty rating (1-5),Learning Curve
flashcards,next_review,TIMESTAMP,Next review time,Spaced Repetition
flashcards,review_count,INTEGER,Times reviewed,Learning Analytics
flashcards,mastery_level,FLOAT,Calculated mastery (0-1),Progress Tracking

practice_exams,id,UUID,"Primary key, unique identifier",Exam Preparation
practice_exams,title,VARCHAR,Exam title,Content Organization
practice_exams,description,TEXT,Exam description,Content Context
practice_exams,subject_ids,ARRAY,Related subjects,Subject Management
practice_exams,total_questions,INTEGER,Number of questions,Exam Structure
practice_exams,time_limit_minutes,INTEGER,Time allowed,Test Conditions
practice_exams,difficulty,ENUM,Overall difficulty,Challenge Level
practice_exams,created_at,TIMESTAMP,Creation timestamp,Content Management

exam_attempts,id,UUID,"Primary key, unique identifier",Performance Tracking
exam_attempts,student_id,UUID,Student reference,Student Management
exam_attempts,exam_id,UUID,Exam reference,Exam Management
exam_attempts,start_time,TIMESTAMP,Attempt start time,Time Tracking
exam_attempts,end_time,TIMESTAMP,Attempt end time,Time Tracking
exam_attempts,score,FLOAT,Score achieved,Performance Measurement
exam_attempts,max_score,FLOAT,Maximum possible score,Scoring Reference
exam_attempts,time_taken_minutes,INTEGER,Time taken,Efficiency Metrics
exam_attempts,mood_before,UUID,Mood before attempt,Mood Correlation
exam_attempts,mood_after,UUID,Mood after attempt,Mood Correlation

subscriptions,id,UUID,"Primary key, unique identifier",Subscription Management
subscriptions,user_id,UUID,User reference,User Management
subscriptions,plan_id,UUID,Plan reference,Plan Management
subscriptions,start_date,DATE,Subscription start date,Billing Cycle
subscriptions,end_date,DATE,Subscription end date,Access Control
subscriptions,status,ENUM,Status (active/expired/canceled),Subscription Status
subscriptions,auto_renew,BOOLEAN,Auto-renewal setting,Billing Management
subscriptions,created_at,TIMESTAMP,Creation timestamp,Subscription History
subscriptions,updated_at,TIMESTAMP,Update timestamp,Subscription Changes

subscription_plans,id,UUID,"Primary key, unique identifier",Product Catalog
subscription_plans,name,VARCHAR,Plan name,Marketing
subscription_plans,description,TEXT,Plan description,Feature Explanation
subscription_plans,price,DECIMAL,Plan price,Pricing
subscription_plans,currency,VARCHAR,Currency code,Internationalization
subscription_plans,duration_days,INTEGER,Plan duration,Subscription Terms
subscription_plans,features,JSONB,Plan features as JSON,Feature Management
subscription_plans,is_active,BOOLEAN,Plan availability flag,Catalog Management
subscription_plans,created_at,TIMESTAMP,Creation timestamp,Product History
subscription_plans,updated_at,TIMESTAMP,Update timestamp,Product Updates

payment_history,id,UUID,"Primary key, unique identifier",Billing
payment_history,user_id,UUID,User reference,User Management
payment_history,subscription_id,UUID,Subscription reference,Subscription Management
payment_history,amount,DECIMAL,Payment amount,Financial
payment_history,currency,VARCHAR,Currency code,Internationalization
payment_history,payment_date,TIMESTAMP,Payment timestamp,Transaction Timeline
payment_history,payment_method,VARCHAR,Payment method used,Payment Processing
payment_history,transaction_id,VARCHAR,External transaction ID,Payment Reconciliation
payment_history,status,ENUM,Payment status,Transaction Status

system_logs,id,UUID,"Primary key, unique identifier",System Monitoring
system_logs,event_type,VARCHAR,Type of system event,Event Categorization
system_logs,severity,ENUM,Log severity,Issue Prioritization
system_logs,message,TEXT,Log message,Error Reporting
system_logs,source,VARCHAR,Source of event,System Component Tracking
system_logs,user_id,UUID,Associated user if applicable,User Activity Monitoring
system_logs,metadata,JSONB,Additional metadata,Detailed Diagnostics
system_logs,created_at,TIMESTAMP,Log timestamp,Timeline Analysis

admin_users,id,UUID,"Primary key, unique identifier",Admin Management
admin_users,user_id,UUID,Reference to user account,User Management
admin_users,admin_level,INTEGER,Admin privilege level (1-3),Access Control
admin_users,department,VARCHAR,Admin department,Role Organization
admin_users,created_at,TIMESTAMP,Record creation timestamp,Admin History
admin_users,permissions,JSONB,Detailed permission set,Granular Access Control

ai_model_settings,id,UUID,"Primary key, unique identifier",AI Configuration
ai_model_settings,model_name,VARCHAR,AI model name,Model Management
ai_model_settings,feature,VARCHAR,Feature using this model,Feature Configuration
ai_model_settings,parameters,JSONB,Model parameters as JSON,AI Tuning
ai_model_settings,is_active,BOOLEAN,Whether setting is active,Feature Toggles
ai_model_settings,created_by,UUID,Creator reference,Configuration Management
ai_model_settings,created_at,TIMESTAMP,Creation timestamp,Configuration History
ai_model_settings,updated_at,TIMESTAMP,Update timestamp,Configuration Changes

notifications,id,UUID,"Primary key, unique identifier",Notification System
notifications,user_id,UUID,Target user,User Management
notifications,type,ENUM,Notification type,Message Categorization
notifications,title,VARCHAR,Notification title,Message Content
notifications,message,TEXT,Notification content,Message Content
notifications,is_read,BOOLEAN,Read status,Notification Status
notifications,created_at,TIMESTAMP,Creation timestamp,Notification Timeline
notifications,action_url,VARCHAR,Related action link,User Navigation
notifications,importance,ENUM,Priority level,Priority Management

user_feedback,id,UUID,"Primary key, unique identifier",Feedback Collection
user_feedback,user_id,UUID,User reference,User Management
user_feedback,category,VARCHAR,Feedback category,Feedback Organization
user_feedback,rating,INTEGER,Numerical rating (1-5),Satisfaction Measurement
user_feedback,comments,TEXT,Detailed feedback,Qualitative Feedback
user_feedback,submitted_at,TIMESTAMP,Submission timestamp,Feedback Timeline
user_feedback,feature_id,VARCHAR,Related feature (optional),Feature Feedback
user_feedback,is_resolved,BOOLEAN,Resolution status,Feedback Management
user_feedback,resolution_notes,TEXT,Resolution details,Response Management

surrounding_influences,id,UUID,"Primary key, unique identifier",Environmental Factors
surrounding_influences,student_id,UUID,Student reference,Student Management
surrounding_influences,timestamp,TIMESTAMP,When recorded,Temporal Analysis
surrounding_influences,noise_level,INTEGER,Ambient noise (1-10),Environmental Monitoring
surrounding_influences,location_type,VARCHAR,Study location type,Context Awareness
surrounding_influences,distractions,INTEGER,Distraction level (1-10),Focus Analysis
surrounding_influences,comfort,INTEGER,Physical comfort (1-10),Environment Quality
surrounding_influences,lighting,INTEGER,Lighting quality (1-10),Environment Quality
surrounding_influences,session_id,UUID,Related study session,Session Correlation

student_goals,id,UUID,"Primary key, unique identifier",Goal Management
student_goals,student_id,UUID,Student reference,Student Management
student_goals,title,VARCHAR,Goal title,Motivation
student_goals,description,TEXT,Goal description,Clarity
student_goals,target_date,DATE,Target completion date,Timeline Management
student_goals,status,ENUM,Goal status,Progress Tracking
student_goals,progress,INTEGER,Completion percentage,Progress Measurement
student_goals,priority,ENUM,Priority level,Task Prioritization
student_goals,related_subjects,ARRAY,Related subject IDs,Subject Correlation
student_goals,created_at,TIMESTAMP,Creation timestamp,Goal History

todays_plans,id,UUID,"Primary key, unique identifier",Daily Planning
todays_plans,student_id,UUID,Student reference,Student Management
todays_plans,date,DATE,Plan date,Calendar Management
todays_plans,total_duration,INTEGER,Total minutes planned,Time Management
todays_plans,completed_tasks,INTEGER,Number of completed tasks,Progress Tracking
todays_plans,total_tasks,INTEGER,Total number of tasks,Plan Structure
todays_plans,time_concepts,INTEGER,Minutes for concepts,Time Allocation
todays_plans,time_flashcards,INTEGER,Minutes for flashcards,Time Allocation
todays_plans,time_practice,INTEGER,Minutes for practice,Time Allocation
todays_plans,mood_start,UUID,Mood at start of day,Emotional Intelligence
todays_plans,mood_end,UUID,Mood at end of day,Emotional Intelligence

daily_tasks,id,UUID,"Primary key, unique identifier",Task Management
daily_tasks,plan_id,UUID,Today's plan reference,Plan Management
daily_tasks,title,VARCHAR,Task title,Task Description
daily_tasks,type,ENUM,Task type (concept/flashcard/etc),Task Categorization
daily_tasks,subject_id,UUID,Related subject,Subject Management
daily_tasks,concept_id,UUID,Related concept,Content Management
daily_tasks,duration,INTEGER,Task duration minutes,Time Management
daily_tasks,status,ENUM,Task status,Progress Tracking
daily_tasks,priority,ENUM,Priority level,Task Prioritization
daily_tasks,scheduled_time,VARCHAR,Scheduled time slot,Schedule Management
daily_tasks,completed_at,TIMESTAMP,Completion timestamp,Time Tracking`;
  
  // Return the complete CSV content
  return csvHeader + csvData;
};

// Function to generate and download the CSV file
export const downloadDatabaseSchemaAsCSV = (): void => {
  const csvContent = getDatabaseSchemaCSV();
  
  // Create a Blob with the CSV content
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  
  // Create a link element to trigger the download
  const link = document.createElement('a');
  
  // For IE11 support
  if (navigator.msSaveBlob) {
    navigator.msSaveBlob(blob, 'prepzr_database_schema.csv');
  } else {
    // Other browsers
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.setAttribute('download', 'prepzr_database_schema.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
};

// Default export for easy importing
export default { getDatabaseSchemaCSV, downloadDatabaseSchemaAsCSV };
