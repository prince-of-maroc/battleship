import contains from "../utils/contains.js";

export default function domManager() {
    return {
        renderGameboards() {
            document.querySelectorAll(".board").forEach((board) => {
                for (let i = 9; i >= 0; i--) {
                    let row = document.createElement("div");
                    row.classList = "row";
                    row.setAttribute("id", `y${i}`);
                    for (let j = 0; j < 10; j++) {
                        let space = document.createElement("div");
                        space.classList = "space";
                        space.setAttribute("id", `x${j}`);
                        row.appendChild(space);
                    }
                    board.appendChild(row);
                }
            });
        },
        populateGameboard(player, isPlayer = true) {
            for (let x = 0; x < 10; x++) {
                for (let y = 0; y < 10; y++) {
                    if (player.gameboard.spaces[x][y]) {
                        if (isPlayer) {
                            let space = document.querySelector(
                                `.board #y${y} #x${x}`
                            );
                            space.classList.add("hasShip");
                        } else {
                            let space = document
                                .querySelector("main")
                                .lastElementChild.lastElementChild.querySelector(
                                    `#y${y} #x${x}`
                                );
                            space.classList.add("hasShip");
                        }
                    }
                }
            }
        },
        addClickabilityToEnemyGameboard(enemyPlayer) {
            document
                .querySelector("main")
                .lastElementChild.lastElementChild.querySelectorAll(".space")
                .forEach((space) => {
                    space.addEventListener("click", () => {
                        //Get x and y coordinates of element
                        const x = parseInt(space.id.replace(/\D/g, ""));
                        const y = parseInt(
                            space.parentElement.id.replace(/\D/g, "")
                        );

                        //Attack enemy
                        enemyPlayer.gameboard.receiveAttack([x, y]);
                        if (
                            contains(enemyPlayer.gameboard.hitSquares, [x, y])
                        ) {
                            space.classList.remove("hasShip");
                            space.classList.add("hit");
                        } else {
                            space.classList.add("missed");
                        }
                    });
                });
        },
    };
}
