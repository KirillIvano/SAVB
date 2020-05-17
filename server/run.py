from app import app
from aiohttp import web

if __name__ == '__main__':
	web.run_app(app)