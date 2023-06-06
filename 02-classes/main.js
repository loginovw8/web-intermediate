class Rectangle {
    constructor(a, b) {
        this.a = a;
        this.b = b;
    }

    square() {
        return this.a * this.b;
    }

    perimeter() {
        return (this.a + this.b) * 2;
    }
}

let r = new Rectangle(2, 4);
console.log(`Square is ${r.square()}`);
