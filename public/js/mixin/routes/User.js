export default {
	methods: {
		signIn(data) {
			return this.$http.post('/sign-in', data);
		},

		signUp(data) {
			return this.$http.post('/sign-up', data);
		},

		signOut() {
			return this.$http.post('/sign-out');
		},

		saveUserSession(userId) {
			localStorage.setItem('user_id', userId);
			this.$router.replace({ name: 'main' });
		},

		clearUserSession() {
			localStorage.removeItem('user_id');
			this.$router.replace({ name: 'label' });
		}
	}
};