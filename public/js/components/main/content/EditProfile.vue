<template>
	<div class="form">
		<b-form @submit.prevent="onSubmit" novalidate>
			<h3>Edit profile</h3>
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
						:disabled="loading || !confirmPasswordState || !passwordState || !emailState"
						variant="light">
						Submit
				</b-button>
			</div>
    	</b-form>
	</div>
</template>

<script>
	import SignUp from '../../auth/views/SignUp.vue';

	export default {
		extends: SignUp,
		methods: {
			onSubmit() {
				
			}
		},
	}
</script>

<style scoped lang="scss">
	.form {
		position: absolute !important;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 500px;
		margin-top: 10px;
	}
</style>