# user_id: access_token


class VkAccessTokens:
	tokens = {}

	def get(self, user_id: int) -> str:
		return self.tokens[user_id]

	def set(self, user_id: int, access_token: str) -> None:
		self.tokens[user_id] = access_token
