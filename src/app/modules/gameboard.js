export default function createGameboard() {
    return {
        spaces: create10x10Grid(),
        missedSquares: [],
        shipAt(coords) {
            const [x, y] = coords;
            if (this.spaces[x][y] != "") return true;
            return false;
        },
        placeShip(ship, coords, direction) {
            const [x, y] = coords;
            switch (direction) {
                case "left":
                    for (let i = x; i >= x - ship.length; i--) {
                        this.spaces[i][y] = ship;
                    }
                    break;
                case "right":
                    for (let i = x; i <= x + ship.length; i++) {
                        this.spaces[i][y] = ship;
                    }
                    break;
                case "up":
                    for (let i = y; i <= y + ship.length; i++) {
                        this.spaces[x][i] = ship;
                    }
                    break;
                case "down":
                    for (let i = y; i >= y - ship.length; i--) {
                        this.spaces[x][i] = ship;
                    }
                    break;
            }
        },
        receiveAttack(coords) {
            const [x, y] = coords;
            if (this.shipAt([x, y])) {
                this.spaces[x][y].hit();
            } else {
                this.missedSquares.push(coords);
            }
        },
    };
}

function create10x10Grid() {
    let spaces = [];
    for (let i = 0; i < 10; i++) {
        let space = [];
        for (let j = 0; j < 10; j++) {
            space.push("");
        }
        spaces.push(space);
    }
    return spaces;
}
