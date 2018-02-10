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
			<b-button type="submit"
					:disabled="!confirmPasswordState || !passwordState || !emailState"
					variant="light">
					Submit
			</b-button>
    	</b-form>
	</div>
</template>

<script>
	import Form from '../Form.vue';

	export default {
		extends: Form,
		props: ['form'],
		data () {
			return {
				emailRegexp: new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
			}
		},
		computed: {
			emailValid() {
				return this.emailRegexp.test(this.form.email);
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
				if (this.form.password.length <= 4) {
					return 'Password should be more reliable'
				}
			},
			emailInvalidFeedback() {
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

			}
		}
	}
</script>

<style scoped lang="scss">
	form {
		margin-bottom: 10px;
	}
</style>