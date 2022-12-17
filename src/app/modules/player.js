import createGameboard from "./gameboard.js";
import createShip from "./ship.js";

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
            let coords = generateRandomCoordinates();
            while (
                player.gameboard.hitSquares.includes(coords) ||
                player.gameboard.missedSquares.includes(coords)
            ) {
                coords = generateRandomCoordinates();
            }
            player.gameboard.receiveAttack(coords);
        },
    };
}

function generateRandomCoordinates() {
    return [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
}
