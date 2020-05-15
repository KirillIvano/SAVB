from aiohttp import web
app = web.Application()

from views.auth import routes as auth_routes
from views.group import routes as group_routes

app.add_routes(auth_routes)
app.add_routes(group_routes)
