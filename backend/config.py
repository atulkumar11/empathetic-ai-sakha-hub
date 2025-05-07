import os
from dotenv import load_dotenv
load_dotenv()

class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL')
    #SQLALCHEMY_DATABASE_URI = os.getenv('LOCAL_DATABASE_URL')
      # Using DATABASE_URL from .env LOCAL_DATABASE_URL
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'your_default_secret_key_here')
