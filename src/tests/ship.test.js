import shipFactoryFunction from "../app/modules/ship.js";

describe("Ship Object Tests", () => {
    let ship = shipFactoryFunction(4);
    test("Object has necessary properties", () => {
        expect(ship.length).toBe(4);
        expect(ship.hits).toBe(0);
    });

    test("isSunk method successfully calculates if ship is sunk", () => {
        for (let i = 0; i < 4; i++) {
            ship.hit();
        }
        expect(ship.isSunk()).toBe(true);
    });
});
