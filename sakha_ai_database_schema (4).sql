CREATE TABLE users (
  id CHAR(36) PRIMARY KEY NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone_number VARCHAR(15),
  password_hash VARCHAR(255) NOT NULL,
  role TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL,
  last_login TIMESTAMP,
  status TEXT NOT NULL
);

CREATE TABLE students (
  id CHAR(36) PRIMARY KEY NOT NULL,
  user_id CHAR(36) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id),
  name VARCHAR(255) NOT NULL,
  age INT,
  grade VARCHAR(50),
  school VARCHAR(255),
  location VARCHAR(255),
  target_exam VARCHAR(100),
  parent_name VARCHAR(255),
  parent_contact VARCHAR(15),
  profile_image VARCHAR(255),
  personality_type VARCHAR(50),
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL
);

CREATE TABLE onboarding_data (
  id CHAR(36) PRIMARY KEY NOT NULL,
  user_id CHAR(36) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id),
  goal VARCHAR(100),
  sleep_schedule VARCHAR(100),
  focus_hours INT,
  stress_management VARCHAR(100),
  break_routine VARCHAR(100),
  interests JSON,
  completed BOOLEAN NOT NULL,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL
);

CREATE TABLE student_goals (
  id CHAR(36) PRIMARY KEY NOT NULL,
  student_id CHAR(36) NOT NULL,
  FOREIGN KEY (student_id) REFERENCES students(id),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  target_date DATE,
  progress FLOAT NOT NULL,
  status TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL
);

CREATE TABLE student_subjects (
  id CHAR(36) PRIMARY KEY NOT NULL,
  student_id CHAR(36) NOT NULL,
  FOREIGN KEY (student_id) REFERENCES students(id),
  name VARCHAR(100) NOT NULL,
  progress FLOAT NOT NULL,
  total_topics INT NOT NULL,
  completed_topics INT NOT NULL,
  weak_areas JSON,
  strong_areas JSON,
  last_studied TIMESTAMP,
  average_score FLOAT,
  color VARCHAR(20),
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL
);

CREATE TABLE subject_topics (
  id CHAR(36) PRIMARY KEY NOT NULL,
  subject_id CHAR(36) NOT NULL,
  FOREIGN KEY (subject_id) REFERENCES student_subjects(id),
  name VARCHAR(255) NOT NULL,
  progress FLOAT NOT NULL,
  status TEXT NOT NULL,
  last_practiced TIMESTAMP,
  score FLOAT,
  completed BOOLEAN NOT NULL,
  mastery_level INT,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL
);

CREATE TABLE concept_cards (
  id CHAR(36) PRIMARY KEY NOT NULL,
  subject_id CHAR(36) NOT NULL,
  FOREIGN KEY (subject_id) REFERENCES student_subjects(id),
  topic_id CHAR(36),
  FOREIGN KEY (topic_id) REFERENCES subject_topics(id),
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  complexity TEXT,
  examples JSON,
  images JSON,
  related_concepts JSON,
  practice_questions JSON,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL
);

CREATE TABLE flashcard_decks (
  id CHAR(36) PRIMARY KEY NOT NULL,
  student_id CHAR(36) NOT NULL,
  FOREIGN KEY (student_id) REFERENCES students(id),
  subject_id CHAR(36),
  FOREIGN KEY (subject_id) REFERENCES student_subjects(id),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  card_count INT NOT NULL,
  mastered_count INT NOT NULL,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL
);

CREATE TABLE flashcards (
  id CHAR(36) PRIMARY KEY NOT NULL,
  deck_id CHAR(36) NOT NULL,
  FOREIGN KEY (deck_id) REFERENCES flashcard_decks(id),
  front_content TEXT NOT NULL,
  back_content TEXT NOT NULL,
  front_image VARCHAR(255),
  back_image VARCHAR(255),
  difficulty TEXT,
  tags JSON,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL
);

CREATE TABLE exams (
  id CHAR(36) PRIMARY KEY NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  subject VARCHAR(100),
  total_questions INT NOT NULL,
  total_points INT,
  time_limit INT,
  difficulty TEXT,
  average_score FLOAT,
  top_score FLOAT,
  completion_rate FLOAT,
  tags JSON,
  recommended_for JSON,
  required_score FLOAT,
  status TEXT,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL
);

CREATE TABLE exam_questions (
  id CHAR(36) PRIMARY KEY NOT NULL,
  exam_id CHAR(36) NOT NULL,
  FOREIGN KEY (exam_id) REFERENCES exams(id),
  question TEXT NOT NULL,
  options JSON,
  correct_answer JSON,
  explanation TEXT NOT NULL,
  type TEXT NOT NULL,
  points INT NOT NULL,
  feedback TEXT,
  image_path VARCHAR(255),
  has_image BOOLEAN,
  difficulty TEXT,
  tags JSON,
  subject VARCHAR(100),
  chapter VARCHAR(100),
  time_recommended INT,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL
);

CREATE TABLE exam_attempts (
  id CHAR(36) PRIMARY KEY NOT NULL,
  student_id CHAR(36) NOT NULL,
  exam_id CHAR(36) NOT NULL,
  FOREIGN KEY (student_id) REFERENCES students(id),
  FOREIGN KEY (exam_id) REFERENCES exams(id),
  started_at TIMESTAMP NOT NULL,
  completed_at TIMESTAMP NOT NULL,
  score FLOAT NOT NULL,
  total_points INT NOT NULL,
  time_spent INT NOT NULL,
  percentile FLOAT,
  accuracy FLOAT,
  speed_index FLOAT,
  subjectwise_performance JSON,
  created_at TIMESTAMP NOT NULL
);

CREATE TABLE exam_answers (
  id CHAR(36) PRIMARY KEY NOT NULL,
  attempt_id CHAR(36) NOT NULL,
  question_id CHAR(36) NOT NULL,
  FOREIGN KEY (attempt_id) REFERENCES exam_attempts(id),
  FOREIGN KEY (question_id) REFERENCES exam_questions(id),
  user_answer JSON NOT NULL,
  correct BOOLEAN NOT NULL,
  points INT NOT NULL,
  feedback TEXT,
  time_taken INT,
  created_at TIMESTAMP NOT NULL
);

CREATE TABLE mood_logs (
  id CHAR(36) PRIMARY KEY NOT NULL,
  student_id CHAR(36) NOT NULL,
  FOREIGN KEY (student_id) REFERENCES students(id),
  mood TEXT NOT NULL,
  note TEXT,
  recorded_at TIMESTAMP NOT NULL,
  energy_level INT,
  stress_level INT,
  motivation_level INT,
  created_at TIMESTAMP NOT NULL
);

CREATE TABLE study_plans (
  id CHAR(36) PRIMARY KEY NOT NULL,
  student_id CHAR(36) NOT NULL,
  FOREIGN KEY (student_id) REFERENCES students(id),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  target_goal_id CHAR(36),
  FOREIGN KEY (target_goal_id) REFERENCES student_goals(id),
  completion_rate FLOAT,
  status TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL
);

CREATE TABLE study_sessions (
  id CHAR(36) PRIMARY KEY NOT NULL,
  student_id CHAR(36) NOT NULL,
  study_plan_id CHAR(36),
  subject_id CHAR(36),
  mood_before_id CHAR(36),
  mood_after_id CHAR(36),
  FOREIGN KEY (student_id) REFERENCES students(id),
  FOREIGN KEY (study_plan_id) REFERENCES study_plans(id),
  FOREIGN KEY (subject_id) REFERENCES student_subjects(id),
  FOREIGN KEY (mood_before_id) REFERENCES mood_logs(id),
  FOREIGN KEY (mood_after_id) REFERENCES mood_logs(id),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  start_time TIMESTAMP NOT NULL,
  end_time TIMESTAMP,
  duration_minutes INT,
  completed BOOLEAN NOT NULL,
  productivity_score INT,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL
);

CREATE TABLE study_streaks (
  id CHAR(36) PRIMARY KEY NOT NULL,
  student_id CHAR(36) NOT NULL,
  FOREIGN KEY (student_id) REFERENCES students(id),
  current INT NOT NULL,
  longest INT NOT NULL,
  last_study_date DATE NOT NULL,
  weekly_data JSON,
  monthly_data JSON,
  this_week JSON,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL
);

CREATE TABLE subscription_plans (
  id CHAR(36) PRIMARY KEY NOT NULL,
  name VARCHAR(100) NOT NULL,
  type TEXT NOT NULL,
  price DECIMAL NOT NULL,
  interval TEXT NOT NULL,
  features JSON NOT NULL,
  max_users INT,
  description TEXT NOT NULL,
  trial_days INT,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL
);

CREATE TABLE subscriptions (
  id CHAR(36) PRIMARY KEY NOT NULL,
  user_id CHAR(36) NOT NULL,
  plan_id CHAR(36) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (plan_id) REFERENCES subscription_plans(id),
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  status TEXT NOT NULL,
  is_active BOOLEAN NOT NULL,
  auto_renew BOOLEAN NOT NULL,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL
);

CREATE TABLE features (
  id CHAR(36) PRIMARY KEY NOT NULL,
  title VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  path VARCHAR(255) NOT NULL,
  is_premium BOOLEAN NOT NULL,
  icon VARCHAR(100),
  free_access_limit JSON,
  allowed_plans JSON,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL
);

CREATE TABLE user_feature_access (
  id CHAR(36) PRIMARY KEY NOT NULL,
  user_id CHAR(36) NOT NULL,
  feature_id CHAR(36) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (feature_id) REFERENCES features(id),
  has_access BOOLEAN NOT NULL,
  usage_left INT,
  expires_at TIMESTAMP,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL
);

CREATE TABLE feel_good_content (
  id CHAR(36) PRIMARY KEY NOT NULL,
  title VARCHAR(255) NOT NULL,
  content_type TEXT NOT NULL,
  content TEXT NOT NULL,
  mood_tag VARCHAR(100),
  image_url VARCHAR(255),
  video_url VARCHAR(255),
  external_url VARCHAR(255),
  author VARCHAR(100),
  likes INT,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL
);

CREATE TABLE tutor_chats (
  id CHAR(36) PRIMARY KEY NOT NULL,
  student_id CHAR(36) NOT NULL,
  FOREIGN KEY (student_id) REFERENCES students(id),
  session_id VARCHAR(100) NOT NULL,
  subject VARCHAR(100),
  topic VARCHAR(255),
  messages JSON NOT NULL,
  helpful_rating INT,
  start_time TIMESTAMP NOT NULL,
  end_time TIMESTAMP,
  duration_minutes INT,
  mood_context VARCHAR(50),
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL
);
