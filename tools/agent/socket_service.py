import socket

class SocketService:
	def __init__(self, data):
		split_balancer_address = data['balancer_address'].split(':')

		self._target = split_balancer_address[0]
		self._port = int(split_balancer_address[1])

	def start(self):
		self.socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
		self.socket.connect((self._target, self._port))

	def send_message(self, msg):
		sent = self.socket.send(msg)
		if sent == 0:
			raise RuntimeError("socket connection broken")

	def receive(self, EOFChar='\036'):
		msg = ''
		MSGLEN = 100
		while len(msg) < MSGLEN:
			chunk = self.socket.recv(MSGLEN-len(msg))
			if chunk.find(EOFChar) != -1:
				msg = msg + chunk
				return msg

			msg = msg + chunk
			return msg
