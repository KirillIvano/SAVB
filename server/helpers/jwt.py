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


def match(token: str, body: dict, *keys: str) -> bool:
	payload = verify(token)
	matched = True

	for key in keys:
		assert key in body.keys(), f'{key} not in request body'
		assert key in payload.keys(), f'{key} not in jwt'

		if body[key] != payload[key]:
			matched = False
			break

	return matched


def verify_refresh_request(
		cookies: [str, str],
		body: dict
) -> bool:
	assert 'refreshJwt' in cookies.keys(), "cookies don't have refreshJwt"
	refresh_jwt = cookies['refreshJwt']

	return match(refresh_jwt, body, 'csrf', 'userId')
