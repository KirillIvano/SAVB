from aiohttp import web
routes = web.RouteTableDef()

routes.static('/', '../static')