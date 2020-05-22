from app import app
from aiohttp import web
import settings

if __name__ == '__main__':
	web.run_app(app, port=500)
