import aiohttp

sess = aiohttp.ClientSession(
	connector=aiohttp.TCPConnector(verify_ssl=False)
)