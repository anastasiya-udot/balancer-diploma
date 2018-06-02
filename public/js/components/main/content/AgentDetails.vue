<template>
	<div class="agent-details">
		<div class="row">
			<div class="col system-info">
				<h3>New agent 1</h3>
				<h4>Address: 192.168.0.110</h4>
				<h4>State: <span style="color: #65cc7d;">online</span></h4>
				<h4>Created: 19.04.2018</h4>
				<h4>Token: dece2e4945469361dfb6b92f863779b4</h4>
				<h4>Token expires: 19.05.2018</h4>
				<h4>Status: <span style="color: orange">medium load</span></h4>
			</div>
			<div class="col system-info">
				<h3>System info</h3>
				<table>
					<tr>
						<td><h4>Platform:</h4></td>
						<td><h4>Linux</h4></td>
					</tr>
					<tr>
						<td><h4>Distibutiv:</h4></td>
						<td><h4>Ubuntu</h4></td>
					</tr>
					<tr>
						<td><h4>Version:</h4></td>
						<td><h4>17.04</h4></td>
					</tr>
					<tr>
						<td><h4>Memory:</h4></td>
						<td><h4>16 GB</h4></td>
					</tr>
					<tr>
						<td><h4>CPU model:</h4></td>
						<td><h4>Intel Core i7</h4></td>
					</tr>
					<tr>
						<td><h4>Cores:</h4></td>
						<td><h4>4</h4></td>
					</tr>
					<tr>
						<td><h4>Frequency:</h4></td>
						<td><h4>2 400 МГц</h4></td>
					</tr>
				</table>
			</div>
			<div class="col system-info">
				<h3>Critical load</h3>
				<b-form-group>
					<b-row>
						<b-col sm="3"><label for="name">Memory:</label></b-col>
						<b-col sm="7">
							<b-form-input
								type="range">
							</b-form-input>
						</b-col>
						<b-col sm="2"><label>74%</label></b-col>
					</b-row>
					<b-row>
						<b-col sm="3"><label for="name">ROM:</label></b-col>
						<b-col sm="7">
							<b-form-input
								type="range">
							</b-form-input>
						</b-col>
						<b-col sm="2"><label>100%</label></b-col>
					</b-row>
					<b-row>
						<b-col sm="3"><label for="name">CPU:</label></b-col>
						<b-col sm="7">
							<b-form-input
								type="range">
							</b-form-input>
						</b-col>
						<b-col sm="2"><label>60%</label></b-col>
					</b-row>
				</b-form-group>
			</div>
			<div class="col system-info">
				<h3>Server info</h3>
				<h4>Status: <span style="color: #65cc7d;">available</span></h4>
				<h4>Port: 8400</h4>
				<h4>Launch: 2 days ago</h4>
			</div>
		</div>
		<div class="load-area">
			<table>
				<tr>
					<td><h3>Load info</h3></td>
					<td><h4 class="memory">Memory: 23%</h4></td>
					<td><h4 class="rom">ROM: 54%</h4></td>
					<td><h4 class="cpu">CPU: 40%</h4></td>
				</tr>
			</table>
			<div class="сhart">
				<load-chart :chart-data="chartData"></load-chart>
			</div>
		</div>
	</div>
</template>

<script>
	import LoadChart from './views/LoadChart.vue';

	export default {
		components: {
			LoadChart
		},
		data() {
			return {
				
				chartData: {
					labels: ['0am', '1am', '2am', '3am', '4am', '5am', '6am', '7am', '9am', '10am', '11am', '12am',
						'0pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '9pm', '10pm', '11pm', '12pm'],
					datasets: [
						{
							label: 'Memory loadage',
							borderColor: '#666699',
							borderWidth: 1,
							backgroundColor: 'rgba(102, 153, 204, 0.25)',
							data: [40, 39, 10, 40, 39, 80, 40, 70, 45, 42, 5, 2, 12, 53, 78, 30, 60, 50, 80, 75, 67, 57, 78, 23]
						}, {
							label: 'ROM load',
							borderColor: '#669999',
							borderWidth: 1,
							backgroundColor: 'rgba(102, 153, 153, 0.25)',
							data: [60, 55, 50, 55, 55, 56, 57, 58, 59, 60, 61, 60, 64, 50, 54, 50, 49, 45, 43, 42, 41, 50, 52, 54]
						}, {
							label: 'CPU load',
							borderColor: '#336699',
							borderWidth: 1,
							backgroundColor: 'rgba(102, 102, 153, 0.25)',
							data: [90, 80, 40, 70, 45, 42, 5, 2, 12, 53, 78, 30, 60, 50, 100, 78, 30, 60, 50, 80, 40, 39, 10, 40]
						}
					]
				}
			}
		},
		methods: {
			addInfo() {
				
			}
		},
	}
</script>

<style scoped lang="scss">

	.agent-details {
		overflow-y: auto;
		height: 100%;
	}

	.row {
		margin:  0;
	}

	@mixin area() {
		background: rgba(109, 119, 130, 0.6);
		margin: 10px;
		padding: 10px;
		border-radius: 5px;

		h3 {
			color: aliceblue;
			margin-right: 10px;
		}

		h4 {
			color: aliceblue;
			margin-right: 5px;
			font-size: 1rem;
		}
	}

	.system-info {
		@include area();
		color: aliceblue;
	}

	.load-area {
		@include area();

		.сhart {
			background-color: #212733;
		}

		h4 {
			margin-bottom: 0;

			&.cpu {
				text-shadow: 2px 2px #336699;
			}

			&.rom {
				text-shadow: 2px 2px #669999;
			}

			&.memory {
				text-shadow: 2px 2px #666699;
			}
		}
	}
</style>