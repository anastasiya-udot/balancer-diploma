export default {
	methods: {
		signIn(data) {
			return this.$http.post('/sign-in', data);
		},

		signUp(data) {
			return this.$http.post('/sign-up', data);
		}
	}
};