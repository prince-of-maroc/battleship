describe("Ship Object Tests", () => {
    test("Object has necessary properties", () => {
        let ship = null;
        expect(ship.length).toBe(4);
        expect(ship.hits).toBe(0);
    });

    test("isSunk method successfully calculates if ship is sunk", () => {
        let ship = null;
        expect(ship.isSunk()).toBe(false);
    });
});
