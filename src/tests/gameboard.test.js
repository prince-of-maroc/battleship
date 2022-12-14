import createShip from "../app/modules/ship";

describe("Gameboard Testing", () => {
    let ship = createShip(4);
    let gameboard = null;

    test("Gameboard can place ship at specific location", () => {
        gameboard.placeShip(ship, [0, 4], [4, 4]);
        expect(gameboard.shipAt([0, 2])).toBe(true);
    });

    test("Gameboard can detect if enemy shot hit", () => {
        gameboard.receiveAttack([0, 3]);
        expect(ship.hits).toBe(1);
    });

    test("Gameboard can detect if enemy shot missed", () => {
        gameboard.receiveAttack([1, 1]);
        expect(gameboard.missedSquares.includes([1, 1]));
    });
});
