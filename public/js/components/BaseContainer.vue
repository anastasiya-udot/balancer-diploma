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

	.v-slide-fade-enter-active {
		animation: slideUpFade 0.3s linear;
	}

	.v-slide-fade-leave-active {
		animation: slideDownFade 0.2s linear;
	}

	.slide-left-leave-active,
	.slide-left-enter-active {
		transition: 0.3s;
	}
	.slide-left-enter {
		transform: translate(100%, 0);
	}
	.slide-left-leave-to {
		transform: translate(-100%, 0);
	}


	.slide-right-leave-active,
	.slide-right-enter-active {
		transition: 0.3s;
	}
	.slide-right-enter {
		transform: translate(-100%, 0);
	}
	.slide-right-leave-to {
		transform: translate(100%, 0);
	}

	@keyframes slideUpFade {
		from {
			transform: translate(0, 10%);
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	@keyframes slideDownFade {
		from {
			opacity: 1;
		}
		to {
			transform: translate(0, 30%);
			opacity: 0;
		}
	}

	.v-slide-fade-enter-active {
		animation: slideUpFade 0.2s linear;
	}

	.v-slide-fade-leave-active {
		animation: slideDownFade 0.2s linear;
	}

</style>