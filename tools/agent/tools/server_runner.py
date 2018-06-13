import os
import subprocess
from utils.utils import *

SCRIPT_FILE_PATH = './script.sh'

class ServerRunner:
	def __init__(self, data):
		file = open(SCRIPT_FILE_PATH, 'w+')
		file.truncate()
		try:
			file.write(data['script'])
			println('Script file was created', bcolors.OKGREEN)
		except:
			println('Error during script file creating', bcolors.OKGREEN)
		finally:
			file.close()

		self.start_script()
		#self.check_is_alive()

	def kill_process(self):
		subprocess_alive = self.check_is_alive()

		if subprocess_alive:
			self.server_process.terminate()

	def check_is_alive(self):
		if self.server_process is None:
			return False

		returncode = self.server_process.poll()
		return returncode is None

	def start_script(self):
		println('Script was successfully launched', bcolors.OKGREEN)
		return True
		# try:
		# 	FNULL = open(os.devnull, 'w')
		# 	self.server_process = subprocess.Popen([SCRIPT_FILE_PATH], shell=True, stdout=FNULL, )
		# 	println('Script was successfully launched', bcolors.OKGREEN)
		# 	return True
		# except subprocess.CalledProcessError:
		# 	println('Error launching script file', bcolors.FAIL)
		# 	return False
