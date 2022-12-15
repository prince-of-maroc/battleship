import createShip from "../app/modules/ship.js";
import createGameboard from "../app/modules/gameboard.js";

describe("Gameboard Testing", () => {
    let ship = createShip(4);
    let gameboard = createGameboard();

    test("Gameboard can place ship at specific location", () => {
        gameboard.placeShip(ship, [5, 4], "left");
        expect(gameboard.shipAt([5, 4])).toBe(true);
    });

    test("Gameboard can detect if enemy shot hit", () => {
        gameboard.receiveAttack([2, 4]);
        expect(ship.hits).toBe(1);
    });

    test("Gameboard can detect if enemy shot missed", () => {
        gameboard.receiveAttack([1, 1]);
        expect(gameboard.missedSquares.includes([1, 1]));
    });

    test("Gameboard can detect if all ships are sunk", () => {
        gameboard.receiveAttack([3, 4]);
        gameboard.receiveAttack([4, 4]);
        gameboard.receiveAttack([5, 4]);
        expect(gameboard.allSunk()).toBe(true);
    });
});
