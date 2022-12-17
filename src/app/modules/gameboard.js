import contains from "../utils/contains.js";

export default function createGameboard() {
    return {
        spaces: create10x10Grid(),
        missedSquares: [],
        hitSquares: [],
        hasShip(coords) {
            const [x, y] = coords;
            return this.spaces[x][y] ? true : false;
        },
        placeShip(ship, coords, direction) {
            const [x, y] = coords;
            switch (direction) {
                case "left":
                    for (let i = x; i > x - ship.length; i--) {
                        this.spaces[i][y] = ship;
                    }
                    break;
                case "right":
                    for (let i = x; i < x + ship.length; i++) {
                        this.spaces[i][y] = ship;
                    }
                    break;
                case "up":
                    for (let i = y; i < y + ship.length; i++) {
                        this.spaces[x][i] = ship;
                    }
                    break;
                case "down":
                    for (let i = y; i > y - ship.length; i--) {
                        this.spaces[x][i] = ship;
                    }
                    break;
            }
        },
        receiveAttack(coords) {
            if (
                contains(this.hitSquares, coords) ||
                contains(this.missedSquares, coords)
            ) {
                return false;
            }

            const [x, y] = coords;

            if (this.hasShip([x, y])) {
                this.spaces[x][y].hit();
                this.spaces[x][y] = null;
                this.hitSquares.push(coords);
            } else {
                this.missedSquares.push(coords);
            }
        },
        allSunk() {
            if (this.spaces.every((val) => val != null)) {
                return true;
            }
            return false;
        },
    };
}

function create10x10Grid() {
    let spaces = [];
    for (let i = 0; i < 10; i++) {
        let space = [];
        for (let j = 0; j < 10; j++) {
            space.push(null);
        }
        spaces.push(space);
    }
    return spaces;
}
