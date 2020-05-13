from aiohttp import web
app = web.Application()

from views.auth import routes as auth_routes

app.add_routes(auth_routes)