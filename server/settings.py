from dotenv import load_dotenv
import os

ENV_PATH = '.env'
load_dotenv(ENV_PATH)

JWT_TOKEN = os.getenv('JWT_TOKEN')
CLIENT_ID = 7471373
CLIENT_SECRET = "9NymTWkqFpAmPeaXacoL"