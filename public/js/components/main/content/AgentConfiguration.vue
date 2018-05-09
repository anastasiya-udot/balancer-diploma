<template>
	<div class="form">
		<a id="downloadAnchorElem" style="display:none"></a>
		<b-form novalidate>
			<h3>Add new agent</h3>
			<div class="margin-content">
				<b-form-group>
					<b-row>
						<b-col sm="3"><label for="token">Token:</label></b-col>
						<b-col sm="9">
							<b-input-group>
								<b-form-input
									v-model="model.token"
									readonly>
								</b-form-input>
								<b-input-group-append>
									<b-btn
										@click="generateToken">
									Regenerate
									</b-btn>
								</b-input-group-append>
							</b-input-group>
						</b-col>
					</b-row>
				</b-form-group>
				<b-form-group>
					<b-row>
						<b-col sm="2"><label for="name">Agent name:</label></b-col>
						<b-col sm="4">
							<b-form-input
								id="name"
								v-model="model.name"
								placeholder="Enter agent name">
							</b-form-input>
						</b-col>
					</b-row>
				</b-form-group>
				<b-form-group class="small-margin">
					<b-row>
						<b-col sm="3"><label>Launch script:</label></b-col>
						<b-col sm="6" class="radio">
							<b-form-radio-group
								v-model="selectedOS"
								buttons
								:options="optionsOS">
							</b-form-radio-group>
						</b-col>
					</b-row>
				</b-form-group>
				<codemirror
					v-model="model.script"
					@change="onScriptChanged"
					:options="codemirrorOptions">
				</codemirror>
			</div>
			<div class="button-loader">
				<div class="invalid-feedback server">{{errorServerMessage}}</div>
				<three-dots v-show="loading"></three-dots>
				<b-button
					@click="onGenerageConfigClicked"
					:disabled="loading || !canCreateAgent"
					variant="light">
					Generate config file
				</b-button>
			</div>
		</b-form>
	</div>
</template>

<script>
	import Form from '../../Form.vue';
	import { codemirror } from 'vue-codemirror';
	import ConfigFile from '../../../mixin/routes/api/ConfigFile';

	const OS = {
		WIN: 0,
		LINUX: 1,
		MACOS: 2
	};

	export default {
		extends: Form,
		сomponents: {codemirror},
		mixins: [ConfigFile],
		data() {
			return {
				newToken: '',
				model: {
					script: '',
					name: 'New agent',
					token: '',
					server_address: ''
				},
				scriptMode: 'powershell',
				selectedOS: 0,
				optionsOS: [
					{ text: 'Windows', value: 0 },
					{ text: 'Linux', value: 1 },
					{ text: 'MacOS', value: 2 }
				]
			}
		},
		watch: {
			newToken(newValue) {
				this.model.token = this.newToken;
			},
			selectedOS(newValue) {
				switch (newValue) {
					case OS.WIN: this.scriptMode = 'powershell'; break;
					default: this.scriptMode = 'shell'; break;
				}
			}
		},
		computed: {
			canCreateAgent() {
				return !!this.model.script && !!this.model.name && !!this.model.token && !!this.model.server_address;
			},
			codemirrorOptions() {
				return {
					mode: this.scriptMode,
					theme: 'lucario',
					lineNumbers: true,
					matchBrackets: true,
					autoRefresh: true,
					styleSelectedText: true,
					showCursorWhenSelecting: true
				}
			}
		},
		methods: {
			onGenerageConfigClicked() {
				let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.model));
				let dlAnchorElem = document.getElementById('downloadAnchorElem');
				dlAnchorElem.setAttribute("href", dataStr);
				dlAnchorElem.setAttribute("download", "agent.json");
				dlAnchorElem.click();
			},
			onScriptChanged() {
				
			},
			generateToken() {
				this.generateNewToken()
				.then(
					res => {
						this.newToken = res.body.token;
					}
				)
			}
		},
		created() {
			this.generateToken();
			this.getServerAddress()
			.then(
				res => {
					this.model.server_address = res.body.serverAddress
				}
			)
		}
	}
</script>

<style css lang="scss">
	.form {
		position: absolute !important;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 700px;
		margin-top: 10px;

		.margin-content {
			margin: 10px 0;
		}

		.radio {
			text-align: center;
		}

		.small-margin {
			margin-bottom: 5px;
		}
	}
</style>