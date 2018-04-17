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
			<b-button type="submit"
					:disabled="!passwordState || !emailState"
					variant="light">
					Submit
			</b-button>
		</b-form>
	</div>
</template>

<script>
	import Form from '../Form.vue';
	import User from '../../mixin/routes/User.js';

	export default {
		props: ['form'],
		extends: Form,
		mixins: [User],
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
				this.signIn(this.form)
				.then(
					data => {
						this.loading = false;
					},
					err => {
						console.log(err);
					}
				);
			}
		}
	}
</script>

<style scoped lang="scss">
	form {
		margin-bottom: 60px;
	}
</style>