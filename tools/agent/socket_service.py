import socket
import utils
import sys

BUFSIZ = 1024

class SocketService:
	def __init__(self, data):
		split_balancer_address = data['balancer_address'].split(':')

		self._target = split_balancer_address[0]
		self._port = int(split_balancer_address[1])
		self._message = ''

	def get_port(self):
		return self._port

	def get_address(self):
		return self._target

	def start(self):
		addr = (self._target, self._port)
		self.socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
		
		try:
			utils.wait(self._start, event="connect to balancer", addr=addr)
			print('{} Connected to balancer server {}:{} {}'.format(
				utils.bcolors.OKGREEN,
				socket_service.get_address(),
				socket_service.get_port(),
				utils.bcolors.ENDC
			))
		except Exception:
			self.failed_connect_exit()

	def _start(self, addr=None):
		try:
			self.socket.connect(addr)
			print('aaaaaa')
			return True
		except Exception:
			return False

	def send(self, msg=''):
		try:
			utils.wait(self._send, event="send message", msg=msg)
		except Exception:
			self.failed_connect_exit()

	def _send(self, msg=''):
		try:
			self.socket.send(bytes(msg, "utf8"))
			return True
		except Exception:
			return False

	def failed_connect_exit(self):
		print('{} Failed to connect to balancer server {}'.format(
			utils.bcolors.FAIL,
			utils.bcolors.ENDC
		))
		sys.exit()
