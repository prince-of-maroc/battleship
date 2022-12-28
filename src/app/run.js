import createPlayer from "./modules/player.js";
import domManager from "./modules/dom.js";

export default function run() {
    // Run Battleship Gameloop
    let dom = domManager();
    let player = createPlayer();
    let computer = createPlayer();

    dom.renderGameboards();
    dom.startShipPlacementLoop(player);
    dom.populateGameboard(player);

    dom.startDOMEventLoop(player, computer);
}
