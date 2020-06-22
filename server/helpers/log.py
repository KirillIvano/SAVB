from datetime import datetime, date
from functools import wraps
import asyncio
from aiohttp import web
import json
import traceback
import sys
from database.models import Log, objects

async def log_add(
		status: int,
		req_data: str,
		method: str,
		url: str,
		res_data: str=None,
		error: str=None,
		file_name: str=None,
		line: int=None
		):
	await objects.create(Log,
		status=status,
		date = datetime.now(),
		method=method,
		url=url,
		req_data=req_data,
		res_data=res_data,
		error=error,
		file_name=file_name,
		line=line
	)

def logged(log_enabled: bool=True):
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
				exc_type, exc_value, exc_traceback = sys.exc_info()
				asyncio.ensure_future(
					log_add(
						status = 500,
						method = method,
						url = url,
						req_data = reqBody,
						error = str(e),
						line = traceback.extract_stack()[0][1],
						file_name = traceback.extract_stack()[0][0]
					)
				)
				return web.Response(
					body = json.dumps({'error': 'Неожиданная ошибка сервера'}, ensure_ascii=False),
					status = 500,
				)
		return inner
	return actual_inner

async def get_last_logs():
    logs = []
    query = await objects.execute(Log.select().order_by(Log.date.desc()).limit(100).dicts())
    for log in query:
        logs.append(log)
        logs[-1]['date'] = str(logs[-1]['date'])
    return logs
