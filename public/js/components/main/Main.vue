<template>
	<div>
		<p v-if="isConnected">We're connected to the server!</p>
		<p>Message from server: "{{socketMessage}}"</p>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				isConnected: false,
				socketMessage: ''
			}
		},
		sockets: {
			connect() {
				this.isConnected = true;
				console.log('Web-socket connection: connected to server');
				this.$socket.emit('join');
			},

			disconnect() {
				this.isConnected = false;
				console.error('Web-socket connection: disconnected from server');
			},

			messageChannel(data) {
				console.info('Web-socket message: ', data);
				this.socketMessage = data
			}
		},
	}
</script>

<style scoped>

</style>