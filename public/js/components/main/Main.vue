<template>
	<div>
		<p v-if="isConnected">We're connected to the server!</p>
		<p>Message from server: {{socketMessage}}</p>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				isConnected: false,
				socketMessage: null
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
			graphs(data) {
				console.info('Web-socket message: ', data[0]);
				this.socketMessage = data[0];
			}
		},
	}
</script>

<style scoped>

</style>