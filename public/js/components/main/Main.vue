<template>
	<div>
		<navigation class="upper-layout"></navigation>
		<transition name="v-slide-fade">
			<notifier
				v-if="showNotification"
				class="upper-layout"
				@closeNotifier="closeNotifier"
				:notifyData="notifyData">
			</notifier>
		</transition>
		<content-container
			class="upper-layout"
			@apiError="notify">
		</content-container>
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
	import Notifier from './Notifier.vue';
	import NanoPointer from '../../mixin/NanoPointer';
	import ContentContainer from './content/ContentContainer.vue';
	import constants from '../../constants';

	export default {
		extends: BaseContainer,
		components: { Navigation, ContentContainer, Notifier },
		mixins: [NanoPointer],
		data() {
			return {
				isConnected: false,
				socketMessage: null,
				notifyData: {
					message: 'LALA',
					type: constants.NOTIFY_TYPE.WARNING
				},
				showNotification: true
			}
		},
		methods: {
			notify(event, type) {
				if (this.showNotification) {
					this.closeNotifier();
				}

				this.notifyData = {
					message: event.message,
					type: type
				};
				this.showNotification = true;
			},
			closeNotifier() {
				this.showNotification = false;
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
	.upper-layout {
		z-index: 2;
		position: relative;
	}
</style>