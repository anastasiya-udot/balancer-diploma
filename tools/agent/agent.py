import argparse
import sys
import json
import os.path
from socket_service import SocketService
from system_monitor import SystemMonitor
import utils
import json


def parseJSON(path):
	if os.path.isfile(path) and path.endswith('.json'):
		with open(path) as f:
			return json.load(f)

def start_socket_service(data):
	socket_service = SocketService(data)

	return socket_service

def start_system_monitor(data, socket=None):
	system_monitor = SystemMonitor()
	system_info = system_monitor.get_system_info()

	agent_data = { key: data[key] for key in ['name', 'token', 'server_port'] }
	static_info_message = dict(
		system_info= system_info,
		agent_data=agent_data
	)

	if socket is None:
		print(utils.bcolors.OKGREEN + json.dumps(static_info_message) + utils.bcolors.ENDC)
	else:
		socket.send(json.dumps(static_info_message))
	

	load_data = system_monitor.readout_load()

	if socket is None:
		print(utils.bcolors.HEADER + json.dumps(load_data) + utils.bcolors.ENDC)
	else:
		socket.send(json.dumps(load_data))

	return system_monitor

TEST_CASES = {
	'monitor': start_system_monitor,
	'socket': start_socket_service
}

def main():
	parser = argparse.ArgumentParser()
	parser.add_argument("--config", type=str, default='agent.conf', help="Set configuration file path")
	parser.add_argument("--test", type=str, default=None, help="Test functionality")
	args = parser.parse_args()
	data = parseJSON(args.config)

	if args.test is not None:
		TEST_CASES[args.test](data)
	else:
		socket_service = start_socket_service(data)
		sytem_monitor = start_system_monitor(data, socket_service)

if __name__ == "__main__":
    sys.exit(main())
