<template>
	<div>
		<launch-proxy><launch-proxy>
	</div>
</template>

<script>
	import Proxy from '../../../mixin/routes/Proxy.js';
	import LaunchProxy from './views/Proxy.vue';

	export default {
		mixins: [Proxy],
		components: { LaunchProxy },
		data() {
			return {
				proxyIsAlive: true
			}
		},
		beforeCreate() {
			// this.checkProxyIsAlive()
			// .then(
			// 	res => {
			// 		this.proxyIsAlive = res.body.alive;
			// 	},
			// 	res => {
			// 		this.$emit('apiError', res.body);
			// 	}
			// )
		}
	}
</script>

<style scoped>

</style>