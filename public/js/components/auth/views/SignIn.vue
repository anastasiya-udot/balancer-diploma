<template>
	<div class="form">
		<b-form @submit.prevent="onSubmit" novalidate>
			<h3>Sign in</h3>
			<b-form-group>
				<b-form-input
						type="email"
						v-model.trim="form.email"
						:state="emailState"
						placeholder="Enter email">
				</b-form-input>
			</b-form-group>
			<b-form-group>
				<b-form-input
						type="password"
						v-model.trim="form.password"
						:state="passwordState"
						placeholder="Enter password">
				</b-form-input>
			</b-form-group>
			<div class="button-loader">
				<div class="invalid-feedback server">{{errorServerMessage}}</div>
				<three-dots v-show="loading"></three-dots>
				<b-button type="submit"
						:disabled="loading || !passwordState || !emailState"
						variant="light">
						Submit
				</b-button>
			</div>
		</b-form>
	</div>
</template>

<script>
	import Form from '../../Form.vue';
	import User from '../../../mixin/routes/User.js';

	export default {
		extends: Form,
		mixins: [User],
		data() {
			return {
				form: {
					email: '',
					password: ''
				}
			}
		},
		computed: {
			passwordState() {
				return this.form.password;
			},
			emailState() {
				return this.form.email;
			}
		},
		methods: {
			onSubmit () {
				this.errorServerMessage = '';
				this.loading = true;
				this.signIn(this.form)
				.then(
					res => {
						this.loading = false;
						this.saveUserSession(res.body.id);
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

</style>