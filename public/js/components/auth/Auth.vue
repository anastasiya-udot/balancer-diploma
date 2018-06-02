<template>
	<div>
		<div class="wrapper">
			<div id="nano-container" class="main-background nano-container" v-bind:style="backgroundStyle">
				<canvas id="nano-canvas"
						@click="toggleDialogsVisibility">
				</canvas>
				<div class="arrow-container">
					<transition name="v-slide-fade" mode="out-in">
						<div v-if="!isLabelShown"
							@click="showSignUp"
							:class="{disabled: isSignUpShown}"
							class="arrow-left">
						</div>
					</transition>
					<div class="transition-login-container">
						<transition :name="authTransition" mode="out-in">
							<router-view class="login-container"></router-view>
						</transition>
					</div>
					<transition name="v-slide-fade" mode="out-in">
						<div v-if="!isLabelShown"
							@click="showSignIn"
							:class="{disabled: isSignInShown}"
							class="arrow-right">
						</div>
					</transition>
				</div>
			</div>
		</div>
	</div>	
</template>

<script>
	import BaseContainer from '../BaseContainer.vue';
	import BackgroundMovement from '../../mixin/BackgroundMovement.js';

	export default {
		extends: BaseContainer,
		mixins: [BackgroundMovement],
		data() {
			return {
				authTransition: 'v-slide-fade'
			};
		},
		created() {
			this.movementEnabled = this.isLabelShown;
		},
		mounted() {
			this.$nextTick(() => {
				this.initializeBackgroundMovement();
			});
		},
		computed: {
			isLabelShown() {
				return this.$route.name === 'label';
			},
			isSignInShown() {
				return this.$route.name === 'signIn';
			},
			isSignUpShown() {
				return this.$route.name === 'signUp';
			}
		},
		beforeRouteUpdate (to, from, next) {
			const toPath = this.getComponentByPath(to.path);
			const fromPath = this.getComponentByPath(from.path);

			if (fromPath === 'sign-in' || fromPath === 'sign-up') {
				if (toPath === 'label') {
					this.authTransition = 'v-slide-fade';
				} else {
					if (fromPath === 'sign-in') {
						this.authTransition = 'slide-right';
					} else {
						this.authTransition = 'slide-left';
					}
				}
			} else {
				this.authTransition = 'v-slide-fade';
			}
			next()
		},
		methods: {
			showSignIn() {
				this.$router.push({ name: 'signIn' });
			},
			showSignUp() {
				this.$router.push({ name: 'signUp' });
			},
			showLabel() {
				this.$router.push({ name: 'label' });
			},
			getComponentByPath(path) {
				var parts = path.split('/');

				parts = parts.filter(p => p !== '#');

				return parts[parts.length - 1];
			},
			toggleDialogsVisibility() {
				if (this.isLabelShown) {
					this.showSignIn();
					this.movementEnabled = false;
				} else {
					this.showLabel();
					this.movementEnabled = true;
				}
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

	$loggin-container-width: 500px;
	$arrow-button-width: 50px;

	@mixin arrow($dir) {
		@if ($dir == "right") {
			margin-right: 10px;
			background-image: url('../../../images/arrow-dialog-right.png');
		} @else {
			margin-left: 10px;
			background-image: url('../../../images/arrow-dialog-left.png');
		}
		
		width: $arrow-button-width;
		height: $arrow-button-width;
		opacity: 0.7;
		background-size: cover;
		background-position: center center;

		&:hover {
			opacity: 1;
			cursor: pointer;
		}

		&.disabled {
			pointer-events: none;
			opacity: 0.3;
			cursor: none;
		}
	}

	.arrow-right {
		@include arrow("left")
	}

	.arrow-left {
		@include arrow("right")
	}

	.arrow-container {
		position: absolute;
		top: 50%;
		left: 50%;
		text-align: center;
		transform: translate(-50%, -50%);
		width: 620px;

		display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: nowrap;
	}

	.transition-login-container {
		height: 100%;
		overflow: hidden;
	}

	.login-container {
		width: $loggin-container-width;
	}

	@media only screen and (max-width : 768px) {
		.main-title {
			font-size: 3em;
		}
	}
</style>