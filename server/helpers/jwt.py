import jwt
import settings
import http.cookies


def encode(payload: dict) -> str:
	return jwt.encode(
		payload=payload,
		key=settings.JWT_TOKEN,
	).decode()


def verify(token: str) -> dict:
	# raises ExpiredSignatureError if token expired
	return jwt.decode(
		jwt=token,
		key=settings.JWT_TOKEN
	)


def verify_refresh_request(
		cookies: [str, str],
		body: dict
) -> bool:
	assert 'refreshJwt' in cookies.keys(), "cookies don't have refreshJwt"
	refresh_jwt = verify(cookies['refreshJwt'])

	keys = ['csrf', 'userId']
	for key in keys:
		assert key in body.keys(), f'{key} not in request body'
		assert key in refresh_jwt.keys(), f'{key} not in jwt'

	return all(
		body[key] == refresh_jwt[key]
		for key in keys
	)
