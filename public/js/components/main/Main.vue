<template>
	<div>
		<navigation class="upper-layout"></navigation>
		<!-- <transition name="v-slide-fade">
			<notifier
				v-if="showNotification"
				class="upper-layout"
				@closeNotifier="closeNotifier"
				:notifyData="notifyData">
			</notifier>
		</transition> -->
		<div class="wrapper">
			<div id="nano-container" class="main-background nano-container">
				<canvas id="nano-canvas">
				</canvas>
				<!--<p>Message from server: {{socketMessage}}</p> -->
			</div>
		</div>
		<router-view class="upper-layout"></router-view>
	</div>
</template>

<script>
	import BaseContainer from '../BaseContainer.vue';
	import Navigation from './Navigation.vue';
	import NanoPointer from '../../mixin/NanoPointer';
	import constants from '../../constants';

	export default {
		extends: BaseContainer,
		components: { Navigation },
		mixins: [NanoPointer],
		// data() {
		// 	return {
		// 		isConnected: false,
		// 		socketMessage: null
		// 	}
		// },
		//methods: {
			
		// 	notify(event, type) {
		// 		if (this.showNotification) {
		// 			this.closeNotifier();
		// 		}

		// 		this.notifyData = {
		// 			message: event.message,
		// 			type: type
		// 		};
		// 		this.showNotification = true;
		// 	},
		// 	closeNotifier() {
		// 		this.showNotification = false;
		// 	}
		// },
		// sockets: {
		// 	connect() {
		// 		this.isConnected = true;
		// 		console.log('Web-socket connection: connected to server');
		// 		this.$socket.emit('join');
		// 	},
		// 	disconnect() {
		// 		this.isConnected = false;
		// 		console.error('Web-socket connection: disconnected from server');
		// 	},
		// 	graphs(data) {
		// 		console.info('Web-socket message: ', data[0]);
		// 		this.socketMessage = data[0];
		// 	}
		// },
	}
</script>

<style scoped lang="scss">
	.upper-layout {
		z-index: 2;
		position: relative;
	}
</style>