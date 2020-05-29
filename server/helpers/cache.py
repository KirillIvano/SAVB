# user_id: access_token


class VkAccessTokens:
	tokens = {}

	def get(self, user_id: int) -> str:
		return self.tokens[user_id]

	def set(self, user_id: int, access_token: str) -> None:
		self.tokens[user_id] = access_token

BOT_REQUESTS_CACHE = 'bot_requests'
GROUP_CREDS_CACHE = 'group_creds'
USER_CREDS_CACHE = 'user_creds'

# dictionary that contains all caches {[name: string]: Cache}
_cache_storage = {
	BOT_REQUESTS_CACHE: {},
	GROUP_CREDS_CACHE: {},
	USER_CREDS_CACHE: {}
}

class Cache:
	def __init__(self, cache_name: str):
		if not cache_name in _cache_storage:
			_cache_storage[cache_name] = {}

		self.cache = _cache_storage[cache_name]
	
	def includes(self, id) -> bool:
		return id in self.cache
 
	def set(self, id, value):
		self.cache[id] = value
	
	def get(self, id):
		return self.cache[id]

def getCache(name: str):
	return Cache(name)

# some sugar
def getBotRequestsCache():
	return getCache(BOT_REQUESTS_CACHE)
def getGroupCredsCache():
	return getCache(GROUP_CREDS_CACHE)
def getUserCredsCache():
	return getCache(USER_CREDS_CACHE)