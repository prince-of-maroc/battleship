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
        randomlyPopulateGameboard() {},
    };
}

function getRandomCoordinates() {
    return [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
}

function getRandomDirection() {
    return Math.floor(Math.random() * 10) > 5 ? "vertical" : "horizontal";
}
