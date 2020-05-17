from aiohttp import web

app = web.Application()


# adding index route.
# any path will get response of STATIC_HTML
STATIC_HTML = './static/index.html'

index_routes = web.RouteTableDef()

app.router.add_static('/assets/', './static', show_index=True)

@index_routes.get(path='/{tail:.*}')
async def index(request: web.Request):
	return web.FileResponse(STATIC_HTML)


# import and add API routes
from views.auth import routes as auth_routes
from views.group import routes as group_routes
app.add_routes(
	[*auth_routes, *group_routes, *index_routes]
)
