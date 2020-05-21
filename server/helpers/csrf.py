import os
import binascii


def generate_csrf() -> str:
	return (binascii.b2a_hex(os.urandom(16))).decode()
