<template>
	<b-navbar type="dark" toggleable="md">

		<b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
		<b-navbar-brand><logo></logo></b-navbar-brand>

		<b-collapse is-nav id="nav_collapse">
			<b-navbar-nav>
                <b-nav-item @click="onNewUserClicked">Create new agent</b-nav-item>
				<b-nav-item @click="onAgentsListClicked">Agents list</b-nav-item>
			</b-navbar-nav>
			<b-navbar-nav class="ml-auto">
				<b-nav-item-dropdown text="Settings" right>
					<b-dropdown-item @click="onEditProfileClicked">Profile</b-dropdown-item>
					<b-dropdown-item @click="onSignOutClicked">Signout</b-dropdown-item>
				</b-nav-item-dropdown>
			</b-navbar-nav>
		</b-collapse>
	</b-navbar>
</template>

<script>
	import Logo from '../Logo.vue';
	import Users from '../../mixin/routes/User';

	export default {
		components: { Logo },
		mixins: [Users],
		methods: {
			onAgentsListClicked() {
				this.$router.push({ name: 'agentsList' });
			},
			onNewUserClicked() {
				this.$router.push({ name: 'newAgent' });
			},
			onEditProfileClicked() {
				this.$router.push({ name: 'editProfile' });
			},
			onSignOutClicked() {
				this.signOut()
				.then(
					res => {
						this.clearUserSession();
					}
				);
			}
		},
	}
</script>

<style scoped lang="scss">
	.navbar {
		.main-title {
			font-size: 1.4em;
			margin-bottom: 0;
		}

		&:before {
			content: "";
			background-color: #6d7782;
			display: block;
			position: absolute;
			opacity: 0.6;
			top: 0;
			left: 0;
			z-index: -1;
			width: 100%;
			height: 100%;
		}
	}
</style>