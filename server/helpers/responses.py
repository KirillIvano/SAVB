from aiohttp import web
import json


def generate_error_response(message: str, status: int = 500):
	return web.Response(
		status=status,
		body=json.dumps({
			'error': {
				'message': message
			}
		})
	)
