<template>
	<div class="notify-line"
		@click="close"
		v-bind:class="{error: isError, success: isSuccess }">
		<span>
			{{headText}} {{messageText}}
		</span>
	</div>
</template>

<script>
	import constants from '../../constants';

	export default {
		props: ['notifyData'],
		data() {
			return {
				message: this.notifyData.message,
				type: this.notifyData.type
			}
		},
		computed: {
			messageText() {
				return this.message ? `: ${this.message}` : '';
			},
			headText() {
				if (this.isError) {
					return 'Error occured';
				} else if (this.isSuccess) {
					return 'Success';
				}
				return 'Message';
			},
			isError() {
				return this.type === constants.NOTIFY_TYPE.ERROR;
			},
			isSuccess() {
				return this.type === constants.NOTIFY_TYPE.SUCCESS;
			}
		},
		methods: {
			close() {
				this.$emit('closeNotifier');
			}
		},
	}
</script>

<style scoped lang="scss">
	$error-color: #e05a5a;
	$success-color: #5eb773;
	$default-color: #63a6b1;

	.notify-line {
		position: relative;
		color: white;
		height: 40px;
		text-align: center;
		margin: 5px 0;

		&.error {
			&:before {
				background-color: $error-color;
			}
		}

		&.success {
			&:before {
				background-color: $success-color;
			}
		}

		&:hover {
			cursor: pointer;

			&:before {
				opacity: 0.5;
			}
		}



		span {
			display: inline-block;
			vertical-align: middle;
			height: 20px;
		}

		&:after {
			content: "";
			vertical-align: middle;
			height: 100%;
			display: inline-block;
		}

		&:before {
			position: absolute;
			content: "";
			display: block;
			width: 100%;
			height: 40px;
			background-color: $default-color;
			opacity: 0.3;
			z-index: -1;
		}
	}
</style>