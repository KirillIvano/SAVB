from datetime import datetime, date
from functools import wraps
import asyncio
from aiohttp import web
import json
from database.models import Log
from helpers.responses import generate_json_response

async def log_add(
		status: int,
		req_data: str,
		method: str,
		url: str,
		res_data: str=None,
		error: str=None
		):
	log = Log(
		status=status,
		date = datetime.now(),
		method=method,
		url=url,
		req_data=req_data,
		res_data=res_data,
		error=error
	)
	log.save()

def logged(log_enabled):
	def actual_inner(controller):
		@wraps(controller)
		async def inner(req: web.Request):
			reqBody = await req.text()
			method = req.method
			url = req.url
			if log_enabled == False:
				res, status, body = await controller(req)
				return res
			try:
				res, status, body = await controller(req)
				asyncio.ensure_future(
					log_add( 
						status = status,
						req_data = reqBody,
						method = method,
						url = url,
						res_data = body,
					)
				)
				return res
			except Exception as e:
				asyncio.ensure_future(
					log_add(
						status = 500,
						method = method,
						url = url,
						req_data = reqBody,
						error = e
					)
				)
				return web.Response(
					body = json.dumps({'error': 'Неожиданная ошибка сервера'}, ensure_ascii=False),
					status = 500,
				)
		return inner
	return actual_inner

def get_last_logs():
    logs = []
    query = Log.select().order_by(Log.date.desc()).limit(100).dicts()
    for row in query:
        tmp = row['date']
        logs.append(row)
        logs[-1]['date'] = str(tmp)
    return logs

routes = web.RouteTableDef()

@routes.get('/logs')
@logged(False)
async def handle_logs(request: web.Request):
	return generate_json_response(status=200, body=get_last_logs())

