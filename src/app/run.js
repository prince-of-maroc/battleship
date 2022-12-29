import createPlayer from "./modules/player.js";
import domManager from "./modules/dom.js";

export default function run() {
    // Run Battleship Gameloop
    let dom = domManager();
    let player = createPlayer();
    let computer = createPlayer();

    dom.renderGameboards();
    dom.executeShipPlacementLoop(player);
    randomlyPopulateGameboard(computer);
    dom.startDOMEventLoop(player, computer);
}

function randomlyPopulateGameboard(player) {
    // Temporary function to populate gameboards with ships at legal positions.
    player.gameboard.placeShip(player.ships.battleship, [0, 0], "horizontal");
    player.gameboard.placeShip(player.ships.destroyer, [3, 9], "horizontal");
    player.gameboard.placeShip(player.ships.carrier, [3, 3], "vertical");
    player.gameboard.placeShip(player.ships.cruiser, [7, 7], "vertical");
    player.gameboard.placeShip(player.ships.submarine, [0, 8], "horizontal");
}
