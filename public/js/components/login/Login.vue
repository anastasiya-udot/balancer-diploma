<template>
	<div>
		<div class="wrapper">
			<div id="nano-container" class="login-background nano-container" v-bind:style="backgroundStyle">
				<canvas id="nano-canvas"
						@click="toggleDialogsVisibility">
				</canvas>
				<div class="login-container">
					<transition name="v-slide-fade" mode="out-in">
						<h1 class="main-title"
							v-if="dialogsHidden"
							@click="toggleDialogsVisibility">
							Net<span class="work-part">work</span> Balancer
						</h1>
						<div class="dialogs"
							v-else>
							<b-carousel id="login-carousel"
										controls
										:interval="0"
										v-model="currentDialog">
									 <b-carousel-slide>
										<sign-up
											@switchDialogs="switchDialogs"
											:form="signUpForm">
										</sign-up>
									</b-carousel-slide>
									<b-carousel-slide>
										<sign-in 
											@switchDialogs="switchDialogs"
											:form="signInForm">
										</sign-in>
									</b-carousel-slide>
							</b-carousel>
						</div>
					</transition>
				</div>
			</div>
		</div>
	</div>	
</template>

<script>
	import SignUp from './SignUp.vue';
	import SignIn from './SignIn.vue';
	import NanoPointer from '../../mixin/NanoPointer.js';
	import BackgroundMovement from '../../mixin/BackgroundMovement.js';
	
	const DIALOGS = {
		SIGN_UP: 0,
		SIGN_IN: 1
	};

	export default {
		components: {
			'sign-up': SignUp,
			'sign-in': SignIn
		},
		mixins: [NanoPointer, BackgroundMovement, ],
		data() {
			return {
				signUpForm: {
					email: '',
					password: '',
					confirmPassword: ''
				},
				signInForm: {
					email: '',
					password: ''
				},
				dialogsHidden: true,
				currentDialog: DIALOGS.SIGN_UP,
				dialogs: DIALOGS
			};
		},
		mounted() {
			this.$nextTick(() => {
				this.initNanoPointer();
				this.initializeBackgroundMovement();
				this.addListeners();
			});
		},
		methods: {
			toggleDialogsVisibility() {
				this.dialogsHidden = !this.dialogsHidden;

				this.movementEnabled = this.dialogsHidden;
			},
			switchDialogs() {
				switch (this.currentDialog) {
					case DIALOGS.SIGN_IN: this.currentDialog = DIALOGS.SIGN_UP; break;
					case DIALOGS.SIGN_UP: this.currentDialog = DIALOGS.SIGN_IN; break;
				}
			}
		}
	}

</script>

<style scoped lang="scss">

	* {
		&:focus {
			outline: none;
		}
	}

	.wrapper {
		position: relative;
		width: 100%;
		height: 100%;
		overflow: hidden;

		.login-background {
			position: relative;
			width: 100%;
			background: #333;
			overflow: hidden;
			background-size: cover;
			background-position: center center;
			background-image: url('../../../images/background-login.jpg');
			z-index: 1;

			transform: scale(1.1);
		}


		.login-container {
			position: absolute;
			text-align: center;
			top: 50%;
    		left: 50%;
    		transform: translate(-50%, -50%);
			width: 610px;
			margin: 0;

			#login-carousel {
				height: 390px;

				.carousel-item {
					height: 390px;
				}
			}

			.main-title {
				color: #f9f1e9;
				text-align: center;
				text-transform: uppercase;
				font-size: 2.2em;
				letter-spacing: 0.1em;

				.work-part {
					background-color: #6d7782;
				}

				&:hover {
					cursor: pointer;
				}
			}
		}
	}

	@media only screen and (max-width : 768px) {
		.main-title {
			font-size: 3em;
		}
	}

	.v-slide-fade-enter-active {
		animation: slideUpFade 0.3s linear;
	}

	.v-slide-fade-leave-active {
		animation: slideDownFade 0.2s linear;
	}

	@keyframes slideUpFade {
		from {
			transform: translate(0, 30%);
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
		animation: slideUpFade 0.3s linear;
	}

	.v-slide-fade-leave-active {
		animation: slideDownFade 0.2s linear;
	}

</style>