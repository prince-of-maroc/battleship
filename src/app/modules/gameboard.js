export default function createGameboard() {
    return {
        spaces: create10x10Grid(),
        shipAt() {},
        placeShip() {},
        receiveAttack() {},
    };
}

function create10x10Grid() {
    let spaces = [];
    for (let i = 0; i < 10; i++) {
        let space = [];
        for (let j = 0; j < 10; j++) {
            space.push("");
        }
        spaces.push(space);
    }
    return spaces;
}
