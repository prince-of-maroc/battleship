import createGameboard from "./gameboard.js";
import createShip from "./ship.js";
import contains from "../utils/contains.js";

export default function createPlayer() {
    return {
        gameboard: createGameboard(),
        ships: {
            carrier: createShip(5),
            battleship: createShip(4),
            cruiser: createShip(3),
            submarine: createShip(3),
            destroyer: createShip(2),
        },
        shipAt(coords) {
            const [x, y] = coords;
            return this.gameboard.spaces[x][y];
        },
        attack(player, coords) {
            player.gameboard.receiveAttack(coords);
        },
        randomAttack(player) {
            let coords = getRandomCoordinates();
            while (
                contains(player.gameboard.hitSquares, coords) ||
                contains(player.gameboard.missedSquares, coords)
            ) {
                coords = getRandomCoordinates();
            }
            player.gameboard.receiveAttack(coords);
        },
        randomlyPopulateGameboard(shipNum = 1) {
            const isWithinBounds = (ship, coords, direction) => {
                if (direction == "vertical" && coords[1] - ship.length < 0) {
                    return false;
                }

                if (
                    direction == "horizontal" &&
                    coords[0] + ship.length >= 10
                ) {
                    return false;
                }

                let arrOfCoords = [];
                if (direction == "vertical") {
                    for (let y = coords[1]; y > coords[1] - ship.length; y--) {
                        arrOfCoords.push([coords[0], y]);
                    }
                } else {
                    for (let x = coords[0]; x < coords[0] + ship.length; x++) {
                        arrOfCoords.push([x, coords[1]]);
                    }
                }

                for (let i = 0; i < arrOfCoords.length; i++) {
                    if (this.gameboard.hasShip(arrOfCoords[i])) {
                        return false;
                    }
                }
                return true;
            };
            let ship;
            switch (shipNum) {
                case 1:
                    ship = this.ships.carrier;
                    break;
                case 2:
                    ship = this.ships.battleship;
                    break;
                case 3:
                    ship = this.ships.cruiser;
                    break;
                case 4:
                    ship = this.ships.destroyer;
                    break;
                case 5:
                    ship = this.ships.submarine;
                    break;
            }
            let coords = getRandomCoordinates();
            let direction = getRandomDirection();

            while (!isWithinBounds(ship, coords, direction)) {
                coords = getRandomCoordinates();
                direction = getRandomDirection();
            }
        },
    };
}

function getRandomCoordinates() {
    return [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
}

function getRandomDirection() {
    return Math.floor(Math.random() * 10) > 4 ? "vertical" : "horizontal";
}
