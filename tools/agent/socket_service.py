import socket

class SocketService:
	def __init__(self, data):
		self._data = data

	def start(self):
		s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

