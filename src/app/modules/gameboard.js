export default function createGameboard() {
    return {
        spaces: create10x10Grid(),
        missedSquares: [],
        hitSquares: [],
        shipAt(coords) {
            const [x, y] = coords;
            if (this.spaces[x][y] != "") return true;
            return false;
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
            const [x, y] = coords;

            const coordsAreRepetitive = () => {
                for (const coord of this.hitSquares) {
                    if (coord[0] == x && coord[1] == y) {
                        return true;
                    }
                }
                for (const coord of this.missedSquares) {
                    if (coord[0] == x && coord[1] == y) {
                        return true;
                    }
                }
                return false;
            };
            if (coordsAreRepetitive()) {
                return false;
            }
            if (this.shipAt([x, y])) {
                this.spaces[x][y].hit();
                this.spaces[x][y] = "";
                this.hitSquares.push(coords);
            } else {
                this.missedSquares.push(coords);
            }
        },
        allSunk() {
            for (const row of this.spaces) {
                for (const space of row) {
                    if (space != "") {
                        return false;
                    }
                }
            }
            return true;
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
