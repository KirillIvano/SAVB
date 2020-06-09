from datetime import datetime, date
from functools import wraps
import asyncio
from aiohttp import web
import json
from database.models import Log, objects


async def log_add(
        status: int,
        req_data: str,
        method: str,
        url: str,
        res_data: str = None,
        error: str = None
):
    await objects.create(
        Log,
        status=status,
        date=datetime.now(),
        method=method,
        url=url,
        req_data=req_data,
        res_data=res_data,
        error=error
    )


def logged(log_enabled: bool = True):
    def actual_inner(controller):
        @wraps(controller)
        async def inner(req: web.Request):
            req_body: str = await req.text()
            method: str = req.method
            url: str = str(req.url)
            if log_enabled is False:
                res, status, body = await controller(req)
                return res
            try:
                res, status, body = await controller(req)
                asyncio.ensure_future(
                    log_add(
                        status=status,
                        req_data=req_body,
                        method=method,
                        url=url,
                        res_data=body,
                    )
                )
                return res
            except Exception as e:
                asyncio.ensure_future(
                    log_add(
                        status=500,
                        method=method,
                        url=url,
                        req_data=req_body,
                        error=str(e)
                    )
                )
                return web.Response(
                    body=json.dumps({'error': 'Неожиданная ошибка сервера'},
                                    ensure_ascii=False),
                    status=500,
                )

        return inner

    return actual_inner


async def get_last_logs():
    logs = []
    query = await objects.execute(
        Log.select().order_by(Log.date.desc()).limit(100).dicts())
    for log in query:
        logs.append(log)
        logs[-1]['date'] = str(logs[-1]['date'])
    return logs
