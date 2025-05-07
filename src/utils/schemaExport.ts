/**
 * Schema Export Utility
 * Provides utility functions for generating database schema representations
 */

export interface SchemaField {
  name: string;
  type: string;
  isRequired: boolean;
  isPrimaryKey: boolean;
  isForeignKey: boolean;
  references?: string;
  description?: string;
}

export interface SchemaTable {
  tableName: string;
  description?: string;
  fields: SchemaField[];
}

/**
 * Generate a representation of the database schema
 */
export const generateDatabaseSchema = (): SchemaTable[] => {
  // For demonstration purposes, we're hardcoding the schema
  // In a real application, this would be fetched from the backend
  return [
    {
      tableName: "users",
      description: "Core user account information and authentication details",
      fields: [
        { name: "id", type: "UUID", isRequired: true, isPrimaryKey: true, isForeignKey: false, description: "Unique user identifier" },
        { name: "email", type: "VARCHAR(255)", isRequired: true, isPrimaryKey: false, isForeignKey: false, description: "User email address, used for login" },
        { name: "password_hash", type: "VARCHAR(255)", isRequired: true, isPrimaryKey: false, isForeignKey: false, description: "Hashed user password" },
        { name: "name", type: "VARCHAR(100)", isRequired: true, isPrimaryKey: false, isForeignKey: false, description: "User's full name" },
        { name: "role", type: "VARCHAR(50)", isRequired: true, isPrimaryKey: false, isForeignKey: false, description: "User role (student, admin, etc.)" },
        { name: "mobile_number", type: "VARCHAR(20)", isRequired: false, isPrimaryKey: false, isForeignKey: false, description: "User mobile number for authentication" },
        { name: "created_at", type: "TIMESTAMP", isRequired: true, isPrimaryKey: false, isForeignKey: false, description: "Account creation timestamp" },
        { name: "updated_at", type: "TIMESTAMP", isRequired: true, isPrimaryKey: false, isForeignKey: false, description: "Last account update timestamp" }
      ]
    },
    {
      tableName: "students",
      description: "Student-specific profile information",
      fields: [
        { name: "id", type: "UUID", isRequired: true, isPrimaryKey: true, isForeignKey: false, description: "Unique student identifier" },
        { name: "user_id", type: "UUID", isRequired: true, isPrimaryKey: false, isForeignKey: true, references: "users(id)", description: "Reference to user account" },
        { name: "grade", type: "VARCHAR(20)", isRequired: false, isPrimaryKey: false, isForeignKey: false, description: "Student's academic grade/level" },
        { name: "exam_type", type: "VARCHAR(50)", isRequired: true, isPrimaryKey: false, isForeignKey: false, description: "Type of exam the student is preparing for" },
        { name: "target_score", type: "INTEGER", isRequired: false, isPrimaryKey: false, isForeignKey: false, description: "Target score for exam" },
        { name: "phone_number", type: "VARCHAR(20)", isRequired: false, isPrimaryKey: false, isForeignKey: false, description: "Student contact number" },
        { name: "onboarding_completed", type: "BOOLEAN", isRequired: true, isPrimaryKey: false, isForeignKey: false, description: "Whether student completed onboarding" },
        { name: "last_active", type: "TIMESTAMP", isRequired: false, isPrimaryKey: false, isForeignKey: false, description: "Last platform activity timestamp" },
        { name: "age", type: "INTEGER", isRequired: false, isPrimaryKey: false, isForeignKey: false, description: "Student's age" },
        { name: "education_level", type: "VARCHAR(50)", isRequired: false, isPrimaryKey: false, isForeignKey: false, description: "Education level (highSchool, higherSecondary, etc)" },
        { name: "city", type: "VARCHAR(100)", isRequired: false, isPrimaryKey: false, isForeignKey: false, description: "Student's city" },
        { name: "exam_date", type: "DATE", isRequired: false, isPrimaryKey: false, isForeignKey: false, description: "Target exam appearing date" },
        { name: "personality_type", type: "VARCHAR(50)", isRequired: false, isPrimaryKey: false, isForeignKey: false, description: "Learning personality type" },
        { name: "daily_study_hours", type: "FLOAT", isRequired: false, isPrimaryKey: false, isForeignKey: false, description: "Preferred daily study hours" },
        { name: "break_frequency", type: "VARCHAR(20)", isRequired: false, isPrimaryKey: false, isForeignKey: false, description: "Study break frequency preference" },
        { name: "stress_management", type: "VARCHAR(100)", isRequired: false, isPrimaryKey: false, isForeignKey: false, description: "Preferred stress management technique" },
        { name: "study_environment", type: "VARCHAR(100)", isRequired: false, isPrimaryKey: false, isForeignKey: false, description: "Preferred study environment" },
        { name: "study_pace", type: "VARCHAR(20)", isRequired: false, isPrimaryKey: false, isForeignKey: false, description: "Preferred study pace" },
        { name: "preferred_study_time", type: "VARCHAR(20)", isRequired: false, isPrimaryKey: false, isForeignKey: false, description: "Preferred time of day to study" }
      ]
    },
    {
      tableName: "student_subjects",
      description: "Subjects that students are studying",
      fields: [
        { name: "id", type: "UUID", isRequired: true, isPrimaryKey: true, isForeignKey: false, description: "Unique record identifier" },
        { name: "student_id", type: "UUID", isRequired: true, isPrimaryKey: false, isForeignKey: true, references: "students(id)", description: "Reference to student" },
        { name: "subject_name", type: "VARCHAR(100)", isRequired: true, isPrimaryKey: false, isForeignKey: false, description: "Subject name" },
        { name: "proficiency_level", type: "INTEGER", isRequired: true, isPrimaryKey: false, isForeignKey: false, description: "Self-rated proficiency (1-10)" },
        { name: "is_priority", type: "BOOLEAN", isRequired: true, isPrimaryKey: false, isForeignKey: false, description: "Whether this is a priority subject" },
        { name: "is_weak_subject", type: "BOOLEAN", isRequired: true, isPrimaryKey: false, isForeignKey: false, description: "Whether this is a weak subject for the student" },
        { name: "created_at", type: "TIMESTAMP", isRequired: true, isPrimaryKey: false, isForeignKey: false, description: "Record creation timestamp" },
        { name: "hours_per_week", type: "INTEGER", isRequired: false, isPrimaryKey: false, isForeignKey: false, description: "Hours allocated per week" }
      ]
    },
    {
      tableName: "mood_logs",
      description: "User mood tracking records",
      fields: [
        { name: "id", type: "UUID", isRequired: true, isPrimaryKey: true, isForeignKey: false, description: "Unique log identifier" },
        { name: "student_id", type: "UUID", isRequired: true, isPrimaryKey: false, isForeignKey: true, references: "students(id)", description: "Reference to student" },
        { name: "mood_type", type: "VARCHAR(50)", isRequired: true, isPrimaryKey: false, isForeignKey: false, description: "Type of mood (happy, stressed, etc.)" },
        { name: "mood_score", type: "INTEGER", isRequired: true, isPrimaryKey: false, isForeignKey: false, description: "Numerical mood score (1-10)" },
        { name: "note", type: "TEXT", isRequired: false, isPrimaryKey: false, isForeignKey: false, description: "Optional notes about mood" },
        { name: "logged_at", type: "TIMESTAMP", isRequired: true, isPrimaryKey: false, isForeignKey: false, description: "When mood was logged" }
      ]
    },
    {
      tableName: "study_sessions",
      description: "Student study session records",
      fields: [
        { name: "id", type: "UUID", isRequired: true, isPrimaryKey: true, isForeignKey: false, description: "Unique session identifier" },
        { name: "student_id", type: "UUID", isRequired: true, isPrimaryKey: false, isForeignKey: true, references: "students(id)", description: "Reference to student" },
        { name: "subject_id", type: "UUID", isRequired: true, isPrimaryKey: false, isForeignKey: true, references: "student_subjects(id)", description: "Subject studied" },
        { name: "start_time", type: "TIMESTAMP", isRequired: true, isPrimaryKey: false, isForeignKey: false, description: "Session start time" },
        { name: "end_time", type: "TIMESTAMP", isRequired: false, isPrimaryKey: false, isForeignKey: false, description: "Session end time" },
        { name: "duration_minutes", type: "INTEGER", isRequired: false, isPrimaryKey: false, isForeignKey: false, description: "Session duration in minutes" },
        { name: "mood_before_id", type: "UUID", isRequired: false, isPrimaryKey: false, isForeignKey: true, references: "mood_logs(id)", description: "Mood before session" },
        { name: "mood_after_id", type: "UUID", isRequired: false, isPrimaryKey: false, isForeignKey: true, references: "mood_logs(id)", description: "Mood after session" },
        { name: "productivity_rating", type: "INTEGER", isRequired: false, isPrimaryKey: false, isForeignKey: false, description: "Self-rated productivity (1-10)" }
      ]
    },
    {
      tableName: "study_plans",
      description: "Structured learning plans for students",
      fields: [
        { name: "id", type: "UUID", isRequired: true, isPrimaryKey: true, isForeignKey: false, description: "Unique plan identifier" },
        { name: "student_id", type: "UUID", isRequired: true, isPrimaryKey: false, isForeignKey: true, references: "students(id)", description: "Reference to student" },
        { name: "title", type: "VARCHAR(100)", isRequired: true, isPrimaryKey: false, isForeignKey: false, description: "Plan title" },
        { name: "description", type: "TEXT", isRequired: false, isPrimaryKey: false, isForeignKey: false, description: "Plan description" },
        { name: "start_date", type: "DATE", isRequired: true, isPrimaryKey: false, isForeignKey: false, description: "Plan start date" },
        { name: "end_date", type: "DATE", isRequired: true, isPrimaryKey: false, isForeignKey: false, description: "Plan end date" },
        { name: "exam_date", type: "DATE", isRequired: true, isPrimaryKey: false, isForeignKey: false, description: "Target exam date" },
        { name: "is_active", type: "BOOLEAN", isRequired: true, isPrimaryKey: false, isForeignKey: false, description: "Whether plan is active" },
        { name: "created_at", type: "TIMESTAMP", isRequired: true, isPrimaryKey: false, isForeignKey: false, description: "Plan creation timestamp" },
        { name: "updated_at", type: "TIMESTAMP", isRequired: true, isPrimaryKey: false, isForeignKey: false, description: "Plan update timestamp" },
        { name: "weekly_hours", type: "INTEGER", isRequired: false, isPrimaryKey: false, isForeignKey: false, description: "Weekly study hours goal" },
        { name: "learning_pace", type: "VARCHAR(20)", isRequired: false, isPrimaryKey: false, isForeignKey: false, description: "Learning pace preference" },
        { name: "progress", type: "FLOAT", isRequired: false, isPrimaryKey: false, isForeignKey: false, description: "Overall progress percentage" },
        { name: "status", type: "VARCHAR(20)", isRequired: true, isPrimaryKey: false, isForeignKey: false, description: "Plan status (active, completed, archived)" }
      ]
    },
    {
      tableName: "concept_cards",
      description: "Educational concept cards for various subjects",
      fields: [
        { name: "id", type: "UUID", isRequired: true, isPrimaryKey: true, isForeignKey: false, description: "Unique card identifier" },
        { name: "subject", type: "VARCHAR(100)", isRequired: true, isPrimaryKey: false, isForeignKey: false, description: "Subject area" },
        { name: "topic", type: "VARCHAR(100)", isRequired: true, isPrimaryKey: false, isForeignKey: false, description: "Specific topic" },
        { name: "title", type: "VARCHAR(255)", isRequired: true, isPrimaryKey: false, isForeignKey: false, description: "Concept title" },
        { name: "content", type: "TEXT", isRequired: true, isPrimaryKey: false, isForeignKey: false, description: "Card content" },
        { name: "difficulty_level", type: "INTEGER", isRequired: true, isPrimaryKey: false, isForeignKey: false, description: "Difficulty level (1-5)" },
        { name: "created_by", type: "UUID", isRequired: true, isPrimaryKey: false, isForeignKey: true, references: "users(id)", description: "Creator reference" },
        { name: "created_at", type: "TIMESTAMP", isRequired: true, isPrimaryKey: false, isForeignKey: false, description: "Creation timestamp" },
        { name: "updated_at", type: "TIMESTAMP", isRequired: true, isPrimaryKey: false, isForeignKey: false, description: "Update timestamp" }
      ]
    },
    {
      tableName: "system_logs",
      description: "Application and system event logging",
      fields: [
        { name: "id", type: "UUID", isRequired: true, isPrimaryKey: true, isForeignKey: false, description: "Unique log identifier" },
        { name: "event_type", type: "VARCHAR(50)", isRequired: true, isPrimaryKey: false, isForeignKey: false, description: "Type of system event" },
        { name: "severity", type: "VARCHAR(20)", isRequired: true, isPrimaryKey: false, isForeignKey: false, description: "Log severity (info, warning, error)" },
        { name: "message", type: "TEXT", isRequired: true, isPrimaryKey: false, isForeignKey: false, description: "Log message" },
        { name: "source", type: "VARCHAR(100)", isRequired: false, isPrimaryKey: false, isForeignKey: false, description: "Source of event" },
        { name: "user_id", type: "UUID", isRequired: false, isPrimaryKey: false, isForeignKey: true, references: "users(id)", description: "Associated user if applicable" },
        { name: "metadata", type: "JSONB", isRequired: false, isPrimaryKey: false, isForeignKey: false, description: "Additional metadata for event" },
        { name: "created_at", type: "TIMESTAMP", isRequired: true, isPrimaryKey: false, isForeignKey: false, description: "Log timestamp" }
      ]
    },
    {
      tableName: "admin_users",
      description: "Administrative user accounts with special privileges",
      fields: [
        { name: "id", type: "UUID", isRequired: true, isPrimaryKey: true, isForeignKey: false, description: "Unique admin identifier" },
        { name: "user_id", type: "UUID", isRequired: true, isPrimaryKey: false, isForeignKey: true, references: "users(id)", description: "Reference to user account" },
        { name: "admin_level", type: "INTEGER", isRequired: true, isPrimaryKey: false, isForeignKey: false, description: "Admin privilege level (1-3)" },
        { name: "department", type: "VARCHAR(100)", isRequired: false, isPrimaryKey: false, isForeignKey: false, description: "Admin department" },
        { name: "created_at", type: "TIMESTAMP", isRequired: true, isPrimaryKey: false, isForeignKey: false, description: "Record creation timestamp" }
      ]
    },
    {
      tableName: "subscriptions",
      description: "User subscription records",
      fields: [
        { name: "id", type: "UUID", isRequired: true, isPrimaryKey: true, isForeignKey: false, description: "Unique subscription identifier" },
        { name: "user_id", type: "UUID", isRequired: true, isPrimaryKey: false, isForeignKey: true, references: "users(id)", description: "Reference to user account" },
        { name: "plan_id", type: "UUID", isRequired: true, isPrimaryKey: false, isForeignKey: true, references: "subscription_plans(id)", description: "Reference to plan" },
        { name: "start_date", type: "DATE", isRequired: true, isPrimaryKey: false, isForeignKey: false, description: "Subscription start date" },
        { name: "end_date", type: "DATE", isRequired: true, isPrimaryKey: false, isForeignKey: false, description: "Subscription end date" },
        { name: "status", type: "VARCHAR(50)", isRequired: true, isPrimaryKey: false, isForeignKey: false, description: "Status (active, expired, canceled)" },
        { name: "auto_renew", type: "BOOLEAN", isRequired: true, isPrimaryKey: false, isForeignKey: false, description: "Whether subscription auto-renews" },
        { name: "created_at", type: "TIMESTAMP", isRequired: true, isPrimaryKey: false, isForeignKey: false, description: "Record creation timestamp" },
        { name: "updated_at", type: "TIMESTAMP", isRequired: true, isPrimaryKey: false, isForeignKey: false, description: "Record update timestamp" }
      ]
    },
    {
      tableName: "subscription_plans",
      description: "Available subscription plan definitions",
      fields: [
        { name: "id", type: "UUID", isRequired: true, isPrimaryKey: true, isForeignKey: false, description: "Unique plan identifier" },
        { name: "name", type: "VARCHAR(100)", isRequired: true, isPrimaryKey: false, isForeignKey: false, description: "Plan name" },
        { name: "description", type: "TEXT", isRequired: false, isPrimaryKey: false, isForeignKey: false, description: "Plan description" },
        { name: "price", type: "DECIMAL(10,2)", isRequired: true, isPrimaryKey: false, isForeignKey: false, description: "Plan price" },
        { name: "currency", type: "VARCHAR(3)", isRequired: true, isPrimaryKey: false, isForeignKey: false, description: "Currency code" },
        { name: "duration_days", type: "INTEGER", isRequired: true, isPrimaryKey: false, isForeignKey: false, description: "Plan duration in days" },
        { name: "features", type: "JSONB", isRequired: false, isPrimaryKey: false, isForeignKey: false, description: "Plan features as JSON" },
        { name: "is_active", type: "BOOLEAN", isRequired: true, isPrimaryKey: false, isForeignKey: false, description: "Whether plan is active" },
        { name: "created_at", type: "TIMESTAMP", isRequired: true, isPrimaryKey: false, isForeignKey: false, description: "Record creation timestamp" },
        { name: "updated_at", type: "TIMESTAMP", isRequired: true, isPrimaryKey: false, isForeignKey: false, description: "Record update timestamp" }
      ]
    },
    {
      tableName: "ai_model_settings",
      description: "Configuration for AI models used in the system",
      fields: [
        { name: "id", type: "UUID", isRequired: true, isPrimaryKey: true, isForeignKey: false, description: "Unique setting identifier" },
        { name: "model_name", type: "VARCHAR(100)", isRequired: true, isPrimaryKey: false, isForeignKey: false, description: "AI model name" },
        { name: "feature", type: "VARCHAR(100)", isRequired: true, isPrimaryKey: false, isForeignKey: false, description: "Feature using this model" },
        { name: "parameters", type: "JSONB", isRequired: true, isPrimaryKey: false, isForeignKey: false, description: "Model parameters as JSON" },
        { name: "is_active", type: "BOOLEAN", isRequired: true, isPrimaryKey: false, isForeignKey: false, description: "Whether setting is active" },
        { name: "created_by", type: "UUID", isRequired: true, isPrimaryKey: false, isForeignKey: true, references: "admin_users(id)", description: "Creator reference" },
        { name: "created_at", type: "TIMESTAMP", isRequired: true, isPrimaryKey: false, isForeignKey: false, description: "Record creation timestamp" },
        { name: "updated_at", type: "TIMESTAMP", isRequired: true, isPrimaryKey: false, isForeignKey: false, description: "Record update timestamp" }
      ]
    }
  ];
};

/**
 * Mock function to check if a table exists in the database
 */
export const tableExists = (tableName: string): boolean => {
  const schema = generateDatabaseSchema();
  return schema.some(table => table.tableName === tableName);
};
