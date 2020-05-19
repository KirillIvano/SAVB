import os
import binascii


def generate_csrf():
	return (binascii.b2a_hex(os.urandom(16))).decode()
