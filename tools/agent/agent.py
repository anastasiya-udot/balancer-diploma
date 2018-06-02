import argparse
import sys
import json
import os.path
from tools.agent_socket_service import AgentSocketService
from tools.system_monitor import SystemMonitor
from tools.server_runner import ServerRunner

server_runner = None

def parseJSON(path):
	if os.path.isfile(path) and path.endswith('.json'):
		with open(path) as f:
			return json.load(f)

def main():
	parser = argparse.ArgumentParser()
	parser.add_argument("--config", type=str, default='agent.conf', help="Set configuration file path")
	parser.add_argument("--test", type=str, default=None, help="Test functionality")
	args = parser.parse_args()
	data = parseJSON(args.config)

	system_monitor = SystemMonitor()
	connect_to_server = True

	if args.test == 'local':
		connect_to_server = False

	try:
		server_runner = ServerRunner(data)
		socket_service = AgentSocketService(data, system_monitor, connect_to_server)
		socket_service.start_activity()
	except KeyboardInterrupt:
		server_runner.kill_process()


if __name__ == "__main__":
    sys.exit(main())
