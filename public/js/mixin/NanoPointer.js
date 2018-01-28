/* global TweenLite, Circ */
class Circle {

	constructor(ctx, pos, rad, color) {
		this.pos = pos || null;
		this.radius = rad || null;
		this.color = color || null;
		this.ctx = ctx || null;
	}

	draw() {
		if (!this.active) return;
		this.ctx.beginPath();
		this.ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI, false);
		this.ctx.fillStyle = 'rgba(156,217,249,' + this.active + ')';
		this.ctx.fill();
	}
}


module.exports = {
	data() {
		return {
			width: 0,
			height: 0,
			ctx: null,
			points: [],
			canvas: null,
			largeHeader: null,
			animateHeader: true,
			target: {
				x: 0,
				y: 0
			}
		};
	},
	methods: {
		initNanoPointer() {
			this.initHeader();
			this.initAnimation();
		},
		initAnimation() {
			this.animate();

			for (let i in this.points) {
				this.shiftPoint(this.points[i]);
			}
		},

		animate() {
			if (this.animateHeader) {
				this.ctx.clearRect(0, 0, this.width, this.height);
				for (let i in this.points) {
					// detect points in range
					if (Math.abs(this.getDistance(this.target, this.points[i])) < 4000) {
						this.points[i].active = 0.3;
						this.points[i].circle.active = 0.6;
					} else if (Math.abs(this.getDistance(this.target, this.points[i])) < 20000) {
						this.points[i].active = 0.1;
						this.points[i].circle.active = 0.3;
					} else if (Math.abs(this.getDistance(this.target, this.points[i])) < 40000) {
						this.points[i].active = 0.02;
						this.points[i].circle.active = 0.1;
					} else {
						this.points[i].active = 0;
						this.points[i].circle.active = 0;
					}

					this.drawLines(this.points[i]);
					this.points[i].circle.draw();
				}
			}
			requestAnimationFrame(this.animate);
		},

		// Canvas manipulation
		drawLines(p) {
			if (!p.active) return;

			for (let i in p.closest) {
				this.ctx.beginPath();
				this.ctx.moveTo(p.x, p.y);
				this.ctx.lineTo(p.closest[i].x, p.closest[i].y);
				this.ctx.strokeStyle = 'rgba(156,217,249,' + p.active + ')';
				this.ctx.stroke();
			}
		},

		shiftPoint(p) {
			var _this = this;

			TweenLite.to(p,
				1 + 1 * Math.random(),
				{
					x: p.originX - 50 + Math.random() * 100,
					y: p.originY - 50 + Math.random() * 100,
					ease: Circ.easeInOut,
					onComplete: function() {
						_this.shiftPoint(p);
					}
				}
			);
		},

		addListeners() {
			if (!('ontouchstart' in window)) {
				window.addEventListener('mousemove', this.mouseMove);
			}
			window.addEventListener('scroll', this.scrollCheck);
			window.addEventListener('resize', this.resize);
		},

		mouseMove(event) {
			var posx = 0;
			var posy = 0;

			if (event.pageX || event.pageY) {
				posx = event.pageX;
				posy = event.pageY;
			} else if (event.clientX || event.clientY) {
				posx = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
				posy = event.clientY + document.body.scrollTop + document.documentElement.scrollTop;
			}
			this.target.x = posx;
			this.target.y = posy;
		},

		resize(event) {
			this.width = window.innerWidth;
			this.height = window.innerHeight;
			this.largeHeader.style.height = this.height + 'px';
			this.canvas.width = this.width;
			this.canvas.height = this.height;
		},

		scrollCheck(event) {
			this.animateHeader = document.body.scrollTop <= this.height;
		},

		initHeader() {

			this.width = window.innerWidth;
			this.height = window.innerHeight;

			this.target.x = this.width / 2;
			this.target.y = this.height / 2;

			this.largeHeader = document.getElementById('nano-container');
			this.largeHeader.style.height = this.height + 'px';

			this.canvas = document.getElementById('nano-canvas');
			this.canvas.width = this.width;
			this.canvas.height = this.height;

			this.ctx = this.canvas.getContext('2d');

			// create points
			for (let x = 0; x < this.width; x = x + this.width / 20) {
				for (let y = 0; y < this.height; y = y + this.height / 20) {
					let px = x + Math.random() * this.width / 20;
					let py = y + Math.random() * this.height / 20;
					let p = { x: px, originX: px, y: py, originY: py };

					this.points.push(p);
				}
			}

			// for each point find the 5 closest points
			for (let i = 0; i < this.points.length; i++) {
				let closest = [];
				let p1 = this.points[i];

				for (let j = 0; j < this.points.length; j++) {
					let p2 = this.points[j];

					if (p1 != p2) {
						let placed = false;

						/* eslint-disable max-depth */
						for (let k = 0; k < 5; k++) {
							if (!placed) {
								if (closest[k] == undefined) {
									closest[k] = p2;
									placed = true;
								}
							}
						}

						for (let k = 0; k < 5; k++) {
							if (!placed) {
								if (this.getDistance(p1, p2) < this.getDistance(p1, closest[k])) {
									closest[k] = p2;
									placed = true;
								}
							}
						}
						/* eslint-enable max-depth */
					}
				}
				p1.closest = closest;
			}

			// assign a circle to each point
			for (let i in this.points) {
				let c = new Circle(this.ctx, this.points[i], 2 + Math.random() * 2, 'rgba(255,255,255,0.3)');

				this.points[i].circle = c;
			}
		},

		getDistance(p1, p2) {
			return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
		}
	},

	beforeDestroy() {
		window.removeEventListener('scroll', this.scrollCheck);
		window.removeEventListener('resize', this.resize);
		window.removeEventListener('mousemove', this.mouseMove);
	}
};