import createPlayer from "./modules/player.js";
import domManager from "./modules/dom.js";

export default function run() {
    // Run Battleship Gameloop
    let dom = domManager();
    let player = createPlayer();
    let computer = createPlayer();

    randomlyPopulateGameboard(player);
    randomlyPopulateGameboard(computer);

    dom.renderGameboards();
    dom.populateGameboard(player);
    dom.renderShipSpaces();

    dom.startDOMEventLoop(player, computer);
}

function randomlyPopulateGameboard(player) {
    // Temporary function to populate gameboards with ships at legal positions.
    player.gameboard.placeShip(player.ships.battleship, [0, 0], "right");
    player.gameboard.placeShip(player.ships.destroyer, [9, 9], "left");
    player.gameboard.placeShip(player.ships.carrier, [3, 3], "up");
    player.gameboard.placeShip(player.ships.cruiser, [7, 7], "down");
    player.gameboard.placeShip(player.ships.submarine, [0, 9], "right");
}
