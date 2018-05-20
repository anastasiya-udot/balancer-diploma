<template>
	<div class="form">
		<b-form @submit.prevent="onSubmit" novalidate>
			<h3>Reset password</h3>
			<b-form-group :invalid-feedback="passwordInvalidFeedback">
				<b-form-input
						type="password"
						v-model.trim="form.password"
						:state="passwordState"
						placeholder="Enter password">
				</b-form-input>
			</b-form-group>
			<b-form-group :invalid-feedback="checkPasswordsInvalidFeedback">
				<b-form-input
						type="password"
						v-model.trim="form.confirmPassword"
						:state="confirmPasswordState"
						placeholder="Confirm password">
				</b-form-input>
			</b-form-group>
			<div class="button-loader">
				<div class="invalid-feedback server">{{errorServerMessage}}</div>
				<three-dots v-show="loading"></three-dots>
				<b-button type="submit"
						:disabled="loading || !confirmPasswordState || !passwordState || !emailState"
						variant="light">
						Submit
				</b-button>
			</div>
    	</b-form>
	</div>
</template>

<script>
	import Form from '../../Form.vue';
	import validate from '../../../../../common/validate';
	import User from '../../../mixin/routes/User';

	export default {
		extends: Form,
		mixins: [User],
		data() {
			return {
				form: {
					password: '',
					confirmPassword: ''
				}
			}
		},
		computed: {
			passwordState() {
				return this.form.password && this.form.password.length > 4;
			},
			confirmPasswordState() {
				return this.form.confirmPassword && this.form.password === this.form.confirmPassword;
			},
			emailState() {
				return this.form.email && this.emailValid;
			},
			passwordInvalidFeedback() {
				if (this.form.password.length <= 4) {
					return 'Password should be more reliable'
				}
			},
			checkPasswordsInvalidFeedback() {
				if (this.form.password !== this.form.confirmPassword) {
					return 'Passwords does not match'
				}
			}
		},
		methods: {
			onSubmit () {

			}
		}
	}
</script>

<style scoped lang="scss">
	form {
		margin-bottom: 10px;
	}
</style>