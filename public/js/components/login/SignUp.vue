<template>
	<div class="form">
		<b-form @submit.prevent="onSubmit" novalidate>
			<h3>Sign up</h3>
			<b-form-group :invalid-feedback="emailInvalidFeedback">
				<b-form-input
						type="email"
						v-model.trim="form.email"
						:state="emailState"
						placeholder="Enter email">
				</b-form-input>
			</b-form-group>
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
						:disabled="!confirmPasswordState || !passwordState || !emailState"
						variant="light">
						Submit
				</b-button>
			</div>
    	</b-form>
	</div>
</template>

<script>
	import Form from '../Form.vue';
	import validate from '../../../../common/validate';
	import User from '../../mixin/routes/User';
	import ThreeDots from '../ThreeDots.vue';

	export default {
		extends: Form,
		props: ['form'],
		mixins: [User],
		components: {ThreeDots},
		computed: {
			emailValid() {
				return validate.email(this.form.email);
			},
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
				this.errorServerMessage = '';

				if (this.form.password.length <= 4) {
					return 'Password should be more reliable'
				}
			},
			emailInvalidFeedback() {
				this.errorServerMessage = '';

				if (!this.emailValid) {
					return 'Email is invalid';
				}
			},
			checkPasswordsInvalidFeedback() {
				if (this.form.password !== this.form.confirmPassword) {
					return 'Passwords does not match'
				}
			},
			
		},
		methods: {
			onSubmit () {
				this.loading = true;
				this.signUp(this.form)
				.then(
					data => {
						this.loading = false;
					},
					res => {
						this.loading = false;
						this.errorServerMessage = res.body.message;
					}
				);
			}
		}
	}
</script>

<style scoped lang="scss">
	form {
		margin-bottom: 10px;
	}
</style>