import createPlayer from "../app/modules/player.js";

describe("Player Object Testing", () => {
    let playerOne = createPlayer();
    let playerTwo = createPlayer();

    playerTwo.gameboard.placeShip(playerTwo.ships.destroyer, [4, 4], "right");
    test("Players can attack enemy gameboard", () => {
        playerOne.attack(playerTwo, [4, 4]);
        expect(playerTwo.shipAt([5, 4]).hits).toBe(1);
    });

    test.skip("Computer players can make legal moves", () => {
        playerTwo.randomAttack(playerOne);
        expect(playerOne.gameboard.hitSquares.length).toBe(1);
    });
});
