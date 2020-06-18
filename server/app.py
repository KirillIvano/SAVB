from aiohttp import web
import aiohttp_cors

app = web.Application()

# adding index route.
# any path will get response of STATIC_HTML
STATIC_HTML = './static/index.html'


index_routes = web.RouteTableDef()

app.router.add_static('/assets/', './static', show_index=True)
# app.router.add_static('/loggerAssets/', './logger/dist', show_index=True)


# @index_routes.get(path='/{tail:.*}')
# async def index(request: web.Request):
# 	return web.FileResponse(STATIC_HTML)

# import and add API routes
from views.auth import routes as auth_routes
from views.group import routes as group_routes
from views.user import routes as user_routes
from views.bot import routes as bot_routes
from views.stage import routes as stage_routes
from views.logs import routes as logs_routes

app.add_routes(
	[
		*auth_routes,
		*group_routes,
		*user_routes,
		*bot_routes,
		*stage_routes,

		*logs_routes,
		*index_routes  # must be at the end
	]
)

cors = aiohttp_cors.setup(app, defaults={
	"*": aiohttp_cors.ResourceOptions(
		allow_credentials=True,
		expose_headers="*",
		allow_headers="*",
	)
})

# Configure CORS on all routes.
for route in list(app.router.routes()):
	cors.add(route)
