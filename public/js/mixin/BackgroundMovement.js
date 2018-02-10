module.exports = {
	data() {
		return {
			movement: {
				x: 0,
				y: 0,
				followX: 0,
				followY: 0,
				friction: 1 / 30
			},
			backgroundStyle: {},
			movementEnabled: true
		};
	},
	methods: {
		initializeBackgroundMovement() {
			window.addEventListener('mousemove', this.updateMovement);
			this.moveBackground();
		},

		changeBackgroundTranslate(x, y) {
			let translate = 'translate(' + x + 'px, ' + y + 'px) scale(1.1)';

			this.backgroundStyle = {
				'-webit-transform': translate,
				'-moz-transform': translate,
				'transform': translate
			};
		},

		moveBackground() {
			this.movement.x += (this.movement.followX - this.movement.x) * this.movement.friction;
			this.movement.y += (this.movement.followY - this.movement.y) * this.movement.friction;

			this.changeBackgroundTranslate(this.movement.x, this.movement.y);

			requestAnimationFrame(this.moveBackground);
		},

		updateMovement(event) {

			if (!this.movementEnabled) {
				return;
			}

			let lMouseX = Math.max(-100, Math.min(100, window.innerWidth / 2 - event.clientX));
			let lMouseY = Math.max(-100, Math.min(100, window.innerHeight / 2 - event.clientY));

			this.movement.followX = (20 * lMouseX) / 100;
			this.movement.followY = (10 * lMouseY) / 100;
		}
	},
	beforeDestroy() {
		window.removeEventListener('mousemove', this.updateMovement);
	}
};