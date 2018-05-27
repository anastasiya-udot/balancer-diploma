import time
import json
from utils.base_socket_service import BaseSocketService

class AgentSocketService(BaseSocketService):
	def __init__(self, data, system_monitor, connect_to_server=True):
		super().__init__(data)
		self.system_monitor = system_monitor
		self.connect_to_server = connect_to_server

	def start_activity(self):
		self.connect()
		self.receive('confirm connection')
		self._start_sending_data()

	def _start_sending_data(self):
		static_info = self._get_stat_info()
		self.send(json.dumps(static_info))

		while True:
			load_data = self._get_load_data()
			self.send(json.dumps(load_data))
			time.sleep(10)

	def _get_stat_info(self):
		system_info = self.system_monitor.get_system_info()
		static_info_message = dict(
			system_info = system_info,
			agent_data = self.agent_data
		)
		return static_info_message

	def _get_load_data(self):
		load_data = self.system_monitor.readout_load()
		return load_data
		