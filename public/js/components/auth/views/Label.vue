<template>
	<logo @click="openDialogs"></logo>
</template>

<script>
	import Logo from '../../Logo.vue';

	export default {
		components: { Logo },
		methods: {
			openDialogs() {
				this.$router.push({ name: 'signIn' });
			}
		}
	}
</script>

<style scoped lang="scss">
	.main-title {
		font-size: 2.2em;
	}
</style>