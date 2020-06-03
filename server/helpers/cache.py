BOT_REQUESTS_CACHE = 'bot_requests'
GROUP_CREDS_CACHE = 'group_creds'
VK_TOKEN_CACHE = 'user_creds'

# dictionary that contains all caches {[name: string]: Cache}
_cache_storage = {
	BOT_REQUESTS_CACHE: {},
	GROUP_CREDS_CACHE: {},
	VK_TOKEN_CACHE: {},
}


class Cache:
	def __init__(self, cache_name: str):
		if not cache_name in _cache_storage:
			_cache_storage[cache_name] = {}

		self.cache = _cache_storage[cache_name]
	
	def includes(self, id_) -> bool:
		return id_ in self.cache
 
	def set(self, id_, value):
		self.cache[id_] = value
	
	def get(self, id_):
		return self.cache[id_]


def get_cache(name: str) -> Cache:
	return Cache(name)


# some sugar
def get_bot_requests_cache():
	return get_cache(BOT_REQUESTS_CACHE)


def get_group_creds_cache():
	return get_cache(GROUP_CREDS_CACHE)


def get_vk_token_cache():
	return get_cache(VK_TOKEN_CACHE)

