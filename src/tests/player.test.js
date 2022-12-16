describe("Player Object Testing", () => {
    let playerOne = null;
    let playerTwo = null;
    test("Players can attack enemy gameboard", () => {
        playerOne.attack(playerTwo, [4, 4]);
        expect(playerTwo.shipAt([4, 4]).hits).toBe(1);
    });

    test("Computer players can make legal moves", () => {
        playerTwo.randomAttack(playerOne);
        expect(playerOne.gameboard.hitSquares.length).toBe(1);
    });
});
