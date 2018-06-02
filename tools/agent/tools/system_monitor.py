import platform
import cpuinfo
import psutil


class SystemMonitor:

	def _get_cpu_load(self):
		return psutil.cpu_percent()
		
	def _get_disk_usage(self):
		disk_usage = psutil.disk_usage('/')
		return round(disk_usage.used / disk_usage.total, 2)	* 100

	def _get_memory_usage(self):
		virtual_memory = psutil.virtual_memory()
		return round(virtual_memory.used / virtual_memory.total, 2)	* 100
	
	def readout_load(self):
		return dict(
			cpu_load = self._get_cpu_load(),
			memory_load = self._get_memory_usage(),
			rom_load = self._get_disk_usage()
		)

	def get_system_info(self):
		cpu_info = cpuinfo.get_cpu_info()
		system_info = {
			'system': platform.system(),
			'version': platform.release(),
			'distributiv': platform.platform(),
			'cores': cpu_info['count'],
			'model': cpu_info['brand'],
			'frequency': cpu_info['hz_advertised'],
			'memory_bytes': psutil.virtual_memory().total
		}

		return system_info
