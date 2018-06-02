<template>
	<div class="table-wrapper">
		<b-table 
			:striped="tableOptions.striped"
			:bordered="tableOptions.bordered"
			:outlined="tableOptions.outlined"
			:small="tableOptions.small"
			:hover="tableOptions.hover"
			:dark="tableOptions.dark"
			:fixed="tableOptions.fixed"
			:foot-clone="tableOptions.footClone"
			:fields="fields"
			:items="items">
			<template slot="is_active" slot-scope="row">
				<div v-if="row.value"
					class="active-dot">
				</div>
				<div v-else
					class="inactive-dot">
				</div>
			</template>
			<template slot="actions" slot-scope="row">
				<b-button size="sm" :variant="'info'" @click.stop="onDetailsItemsClicked(row.item)" class="mr-1">
					Details
				</b-button>
				<b-button size="sm" :variant="'danger'" @click.stop="onRemoveItemClicked(row.item)" class="mr-1">
					Remove
				</b-button>
			</template>
			<!-- <template slot="row-details" slot-scope="row">
				<b-card>
					<b-list-group>
						<b-list-group-item v-for="(value, key) in row.item" :key="key" v-if="showDetail(key)">
							<b>{{getDetailsName(key)}}</b>: {{getDetailsValue(key, value)}}
						</b-list-group-item>
					</b-list-group>
				</b-card>
			</template> -->
		</b-table>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				tableOptions: {
                    striped: true,
                    bordered: false,
                    outlined: false,
                    small: true,
                    hover: true,
                    dark: true,
                    fixed: false,
                    footClone: false
                },
				items: [
					{ id: 1, status: 'medium load', is_active: true, name: 'New agent 1', address: "192.168.0.110", token: "dece2e4945469361dfb6b92f863779b4", created_at: Date.now() },
					{ id: 2, status: 'token expired', is_active: false, name: 'New agent 2', address: "192.168.0.112", token: "96cbdeb938e4644f24e1acb7e1147c2d", created_at: Date.now() - 31 * 24 * 60 * 60 * 1000 },
					{ id: 3, status: 'low load', is_active: true, name: 'New agent 3', address: "192.168.0.113", token: "b0811958eeb5a8b5c118424dc8a3f7d1", created_at: Date.now() },
				],
				fields: {
					isActive: { label: 'Online', key: 'is_active', sortable: true },
					status: {label: 'Status', key: 'status', sortable: true },
					name: { key: 'name', label: 'Agent name', sortable: true },
					address: { key: 'address', label: 'Address', sortable: false },
					token: { key: 'token', label: 'Token', sortable: false },
					createdAt: { key: 'created_at', label: 'Created at', formatter: value => {
							if (!(value instanceof Date)) {
								value = new Date(value);
							}

							return `${value.getDate()}.${value.getMonth()}.${value.getFullYear()}`;
						}
					},
					actions: { key: 'actions', label: 'Actions' }
				},
			}
		},
		methods: {
			onDetailsItemsClicked(item) {
				this.$router.push({ name: 'details', params: { id: item.id } });
			},
			onRemoveItemClicked(item) {
				
			}
		},
	}
</script>

<style scoped lang="scss">
	@mixin dot($active) {
		height: 10px;
		width: 10px;
		border-radius: 50%;
		margin-left: 20px;
		margin-top: 10px;

		@if ($active == true) {
			background-color: #ccff99;
		} @else {
			background-color: #bbb;
		}
	} 
	.table-wrapper {
		margin: 80px 20px;
		.table {
			background-color: transparent;

			.active-dot {
				@include dot(true);
			}

			.inactive-dot {
				@include dot(false);
			}
		}
	}
</style>