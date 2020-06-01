from datetime import datetime, date
from functools import wraps
import asyncio
from aiohttp import web
import json
from database.models.models import Log

async def log_add(
		status:int,
		req_data:str,
		method:str,
		url:str,
		res_data:str=None,
		error:str=None
		):
	log = Log(status=status,date = datetime.now(),method=method,url=url,req_data=req_data,res_data=res_data, error=error)
	log.save()

def _generate_response(status: int, body: str):
	return web.Response(
		body = json.dumps({'body':body}),
		status = status
	), status, body

def logged(controller):
	@wraps(controller)
	async def inner(req: web.Request):
		reqBody = await req.text()
		method = req.method
		url = req.url
		try:
			res, status, body = await controller(req)
			await log_add( 
				status = status,
				req_data = reqBody,
				method = method,
				url = url,
				res_data = body,
			)
			return res
		except Exception as e:
			await log_add(
				status = 500,
				method = method,
				url = url,
				req_data = reqBody,
				error = e
			)
			return web.Response(
				body = json.dumps({'error': 'Неожиданная ошибка сервера'}),
				status = 500,
			)

	return inner

#@logged
async def index(req: web.Request):
	return _generate_response(200, "qwert")
