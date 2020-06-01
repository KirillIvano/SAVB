from datetime import datetime, date
from functools import wraps
import asyncio
from aiohttp import web
import json
import peewee
import peewee_async


database = peewee_async.PostgresqlDatabase('savb',
	user='kirill',
	host='194.67.109.99',
	port=5432,
	password='ve;crjqctrc'
	)

class BaseModel(peewee.Model):
    class Meta():
        database = database

class Log(BaseModel):
    log_id = peewee.PrimaryKeyField()
    status = peewee.IntegerField()
    date = peewee.DateField()
    req_data = peewee.CharField()
    method = peewee.CharField()
    url = peewee.CharField()
    res_data = peewee.CharField(null=True)
    error = peewee.CharField(null=True)

async def log_add(status : int, date : date, req_data : str, method : str, url : str, res_data : str, error : str):
	await manager.create(Log, 
		status=status,
		date=date,
		req_data=req_data,
		method = method,
		url = url,
		res_data=res_data,
		error=error
	)

def generate_response(status: int, body: str):
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
		print(reqBody)
		print(method)
		print(url)
		try:
			res, status, body = await controller(req)
			await log_add( 
				status = status,
				date = date.today(),
				req_data = reqBody,
				method = method,
				url = url,
				res_data = body,
				error = None
			)
			return res
		except Exception as e:
			await log_add(
				status = 500,
				date = date.today(),
				method = method,
				url = url,
				res_data = None,
				req_data = reqBody,
				error = e
			)
			return web.Response(
				body = json.dumps({'error': 'Неожиданная ошибка сервера'}),
				status = 500,
			)

	return inner

@logged
async def index(req: web.Request):
	return generate_response(200, "qwert")

if __name__ == "__main__":
	loop = asyncio.get_event_loop()
	app = web.Application()
	manager = peewee_async.Manager(database)

	app.add_routes(
		[web.post('/', index)]
	)

	web.run_app(app, port=3000)
