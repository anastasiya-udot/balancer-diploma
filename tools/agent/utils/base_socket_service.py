import socket
from utils.utils import *
import sys
import datetime

BUFSIZ = 1024

class BaseSocketService:

	def __init__(self, data):
		split_balancer_address = data['balancer_address'].split(':')
		self._target = split_balancer_address[0]
		self._port = int(split_balancer_address[1])
		self.connect_to_server = True

		self.agent_data = { key: data[key] for key in ['name', 'token', 'server_port'] }

	def connect(self):
		addr = (self._target, self._port)
		
		try:
			if self.connect_to_server:
				wait(self._connect, event="connect to balancer", addr=addr)

			println('Connected to balancer server {}:{}'.format(self._target, self._port), bcolors.OKGREEN)
		except Exception:
			self.failed_connect_exit()

	def _connect(self, addr=None):
		try:
			self.socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
			self.socket.connect(addr)
			return True
		except Exception:
			self.socket.close()
			return False

	def send(self, msg=''):
		try:
			if self.connect_to_server:
				wait(self._send, event="send message", timeout=10, msg=msg)

			println('Send message "{}"'.format(msg))
		except Exception:
			self.connect()
			self.send(msg)

	def _send(self, msg=''):
		try:
			self.socket.send(bytes(msg, "utf8"))
			return True
		except Exception:
			return False

	def receive(self, msg=''):
		if self.connect_to_server:
			data = self.socket.recv(BUFSIZ).decode('utf-8')
		else:
			data = msg

		if data == msg:
			println('Received message {}'.format(data), bcolors.HEADER)
			return data
		elif msg is not '':
			println('Expected {}, but received {}'.format(msg, data), bcolors.FAIL)

	def failed_connect_exit(self):
		println('Failed to connect to balancer server', bcolors.FAIL)
		sys.exit()