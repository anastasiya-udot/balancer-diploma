<script>
	import NanoPointer from '../mixin/NanoPointer.js';

	export default {
		mixins: [NanoPointer],
		mounted() {
			this.$nextTick(() => {
				this.initNanoPointer();
				this.addListeners();
			});
		}
	}
</script>

<style lang="scss">

	* {
		&:focus {
			outline: none;
		}
	}

	.wrapper {
		position: absolute;
		top: 0;
		width: 100%;
		height: 100%;
		overflow: hidden;

		.main-background {
			position: relative;
			width: 100%;
			background: #333;
			overflow: hidden;
			background-size: cover;
			background-position: center center;
			background-image: url('../../images/background-main.jpg');
			z-index: 1;
			transform: scale(1.1);
		}
	}
</style>