import os
from dotenv import load_dotenv
from sqlalchemy import create_engine, text

# Load environment variables from .env
load_dotenv()

# Get the remote database URL from the environment variable
DATABASE_URL = os.getenv('DATABASE_URL')

# Connect to the remote database using SQLAlchemy
engine = create_engine(DATABASE_URL)

try:
    # Example query to test the connection
    with engine.connect() as conn:
        result = conn.execute(text("SELECT * FROM onboarding_data"))
        rows = result.fetchall()
        if rows:
            print("Data in 'users' table:")
            for row in rows:
                print(dict(row._mapping))  # Access column names
        else:
            print("No data found in 'users' table.")
except Exception as e:
    print(f"Error connecting to the database: {e}")
