from dotenv import load_dotenv
import os

ENV_PATH = '.env'
load_dotenv(ENV_PATH)

JWT_TOKEN = os.getenv('JWT_TOKEN')
CLIENT_SECRET = os.getenv('CLIENT_SECRET')
CLIENT_ID = 7471373

REFRESH_TOKEN_EXP = 2592000  # 30 DAYS
ACCESS_TOKEN_EXP = 3600       # 1 HOUR

VK_API_VERSION = '5.103'
