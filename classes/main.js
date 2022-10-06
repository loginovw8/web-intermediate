class Rectangle {
	constructor(x1, y1, x2, y2, x3, y3, x4, y4) {
		this.x1 = x1;
		this.x2 = x2;
		this.x3 = x3;
		this.x4 = x4;
		this.y1 = y1;
		this.y2 = y2;
		this.y3 = y3;
		this.y4 = y4;
	}

	square() {
		return (this.y2 - this.y1) * (this.x4 - this.x1);
	}

	intersection(rect) {
		let x = 0;
		let y = 0;

		if (rect.x1 >= this.x1) {
			if (rect.x4 > this.x4) {
				x = rect.x4 - this.x4;

				if (rect.x1 >= this.x4) {
					x = 0;
				}
			} else {
				if (rect.x1 > this.x1) {
					x = rect.x4 - rect.x1;
				} else {
					x = rect.x4 - this.x1;	
				}
			}
		} else {
			if (rect.x4 > this.x1) {
				x = rect.x4 - this.x1;

				if (rect.x4 > this.x4) {
					x = this.x4 - this.x1;
				}
			}
		}

		if (rect.y1 >= this.y1) {
			if (rect.y2 > this.y2) {
				y = rect.y2 - this.y2;
			} else {
				y = rect.y2 - rect.y1;
			}
		} else {
			if (rect.y2 > this.y1) {
				y = rect.y2 - this.y1;

				if (rect.y2 > this.y2) {
					y = this.y2 - this.y1;
				}
			}
		}
		
		return x * y;
	}
}

rect1 = new Rectangle(0, 0, 0, 3, 6, 3, 6, 0);

rect2 = new Rectangle(-1, -1, -1, 1, 1, 1, 1, -1);
console.log(`cor left down ${rect1.intersection(rect2)}`);

rect2 = new Rectangle(-1, 2, -1, 4, 1, 4, 1, 2);
console.log(`cor left up ${rect1.intersection(rect2)}`);

rect2 = new Rectangle(5, 2, 5, 4, 7, 4, 7, 2);
console.log(`cor right up ${rect1.intersection(rect2)}`);

rect2 = new Rectangle(5, -1, 5, 1, 7, 1, 7, -1);
console.log(`cor right down ${rect1.intersection(rect2)}`);

rect2 = new Rectangle(0, 0, 0, 3, 3, 3, 3, 0);
console.log(`inside ${rect1.intersection(rect2)}`);

rect2 = new Rectangle(-3, 0, -3, 3, 0, 3, 0, 0);
console.log(`out left ${rect1.intersection(rect2)}`);

rect2 = new Rectangle(6, 0, 6, 3, 8, 3, 8, 0);
console.log(`out right ${rect1.intersection(rect2)}`);

rect2 = new Rectangle(5, 1, 5, 2, 7, 2, 7, 1);
console.log(`single ear right ${rect1.intersection(rect2)}`);

rect2 = new Rectangle(2, -1, 2, 1, 4, 1, 4, -1);
console.log(`single ear down ${rect1.intersection(rect2)}`);

rect2 = new Rectangle(-1, 1, -1, 2, 1, 2, 1, 1);
console.log(`single ear left ${rect1.intersection(rect2)}`);

rect2 = new Rectangle(2, 2, 2, 4, 4, 4, 4, 2);
console.log(`single ear top ${rect1.intersection(rect2)}`);

rect2 = new Rectangle(-1, 1, -1, 2, 7, 2, 7, 1);
console.log(`ear horizontal ${rect1.intersection(rect2)}`);

rect2 = new Rectangle(2, -1, 2, 4, 4, 4, 4, -1);
console.log(`ear vertical ${rect1.intersection(rect2)}`);

