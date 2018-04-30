<template>
	<div>
		<navigation></navigation>
		<div class="wrapper">
			<div id="nano-container" class="main-background nano-container">
				<canvas id="nano-canvas">
				</canvas>
				<p>Message from server: {{socketMessage}}</p>
			</div>
		</div>
	</div>
</template>

<script>
	import BaseContainer from '../BaseContainer.vue';
	import Navigation from './Navigation.vue';
	import NanoPointer from '../../mixin/NanoPointer';

	export default {
		extends: BaseContainer,
		components: { Navigation },
		mixins: [NanoPointer],
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

<style scoped lang="scss">
</style>