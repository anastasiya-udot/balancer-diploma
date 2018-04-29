export default {
	methods: {
		signIn(data) {
			return this.$http.post('/sign-in', data);
		},

		signUp(data) {
			return this.$http.post('/sign-up', data);
		},

		saveUserSession(userId) {
			localStorage.setItem('user_id', userId);
			this.$router.replace({ path: '/main' });
		},

		clearUserSession() {
			localStorage.removeItem('user_id');
			this.$router.replace({ path: '/' });
		}
	}
};