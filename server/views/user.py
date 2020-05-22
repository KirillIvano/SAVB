# API routes for authorisation
# Should start with /api/group

from aiohttp import web
routes = web.RouteTableDef()


@routes.get(path='/api/user/info')
async def info(request: web.Request):
    return web.Response(text='ok')
