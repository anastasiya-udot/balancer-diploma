<template>
	<h1 class="main-title" @click="onLogoClick">
		Net<span class="work-part">work</span> Balancer
	</h1>
</template>

<script>
	export default {
		methods: {
			onLogoClick() {
				this.$emit('click');
			}
		},
	}
</script>


<style scoped lang="scss">
	.main-title {
		color: #f9f1e9;
		text-align: center;
		text-transform: uppercase;
		letter-spacing: 0.1em;

		.work-part {
			background-color: #6d7782;
		}

		&:hover {
			cursor: pointer;
		}
	}
</style>