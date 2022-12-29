import createPlayer from "./modules/player.js";
import domManager from "./modules/dom.js";

export default function run() {
    // Run Battleship Gameloop
    let dom = domManager();
    let player = createPlayer();
    let computer = createPlayer();

    dom.renderGameboards(); // Display gameboards

    // Allow user to drag and drop ships, randomly place computer ships;
    dom.executeShipPlacementLoop(player);
    computer.randomlyPopulateGameboard();

    // Execute main game loop
    dom.executeDOMEventLoop(player, computer);
}
