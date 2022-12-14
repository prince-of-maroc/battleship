import createShip from "../app/modules/ship.js";
import createGameboard from "../app/modules/gameboard.js";

describe("Gameboard Testing", () => {
    let ship = createShip(4);
    let gameboard = createGameboard();

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
