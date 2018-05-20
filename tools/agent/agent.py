import argparse
import sys
import json
import os.path

from socket_service import SocketService

def parseJSON(path):
	if os.path.isfile(path) and path.endswith('.json'):
		with open(path) as f:
			return json.load(f)


def main():
	parser = argparse.ArgumentParser()
	parser.add_argument("--config", type=str, default='agent.conf', help="Set configuration file path")
	args = parser.parse_args()

	data = parseJSON(args.config)
	


if __name__ == "__main__":
    sys.exit(main())