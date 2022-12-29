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
        populateGameboard(player, isPlayer = false) {
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
        startDOMEventLoop(user, enemyPlayer) {
            const enemyGameboard =
                document.querySelector("main").lastElementChild
                    .lastElementChild;

            enemyGameboard.querySelectorAll(".space").forEach((space) => {
                space.addEventListener("click", () => {
                    //Get x and y coordinates of element
                    const x = parseInt(space.id.replace(/\D/g, ""));
                    const y = parseInt(
                        space.parentElement.id.replace(/\D/g, "")
                    );

                    //Attack enemy
                    user.attack(enemyPlayer, [x, y]);

                    //Update enemy gameboard
                    if (contains(enemyPlayer.gameboard.hitSquares, [x, y])) {
                        space.classList.remove("hasShip");
                        space.classList.add("hit");
                    } else {
                        space.classList.add("missed");
                    }

                    // Either end game or receive attack from enemy
                    if (enemyPlayer.gameboard.allSunk()) {
                        alert("You win");
                    } else {
                        enemyPlayer.randomAttack(user);
                        this.updateUserDOM(user);
                    }
                });
            });
        },
        updateUserDOM(user) {
            user.gameboard.missedSquares.forEach((coords) => {
                const [x, y] = coords;
                let space = document.querySelector(`.board #y${y} #x${x}`);

                space.classList.add("missed");
            });

            user.gameboard.hitSquares.forEach((coords) => {
                const [x, y] = coords;
                let space = document.querySelector(`.board #y${y} #x${x}`);

                space.classList.remove("hasShip");
                space.classList.add("hit");
            });

            if (user.gameboard.allSunk()) {
                alert("You lose");
            }
        },
        executeShipPlacementLoop(player, shipNum = 1) {
            let isVertical = true;
            let activeSpace;
            const renderShipSpaces = (length) => {
                const ship = document.querySelector(".ship");
                ship.textContent = "";
                for (let i = 1; i <= length; i++) {
                    let space = document.createElement("div");
                    space.classList.add("space");
                    space.setAttribute("id", `s${i}`);
                    ship.appendChild(space);
                    space.addEventListener("mousedown", () => {
                        activeSpace = space;
                    });
                }
                const shipSpaces = document.querySelectorAll(".ship div");
                const gridSpace = document.querySelector(".space");

                shipSpaces.forEach((space) => {
                    space.style.width = `${gridSpace.offsetWidth}px`;
                    space.style.height = `${gridSpace.offsetHeight}px`;
                });
            };
            const updateShipSpaces = (length) => {
                const ship = document.querySelector(".ship");
                const shipChildren = [...ship.children];
                let currentLength = shipChildren.length;

                if (currentLength == length) {
                    return;
                }

                let diff = currentLength - length;
                for (let i = 0; i < diff; i++) {
                    let lastIndex = shipChildren.length - 1;
                    shipChildren[lastIndex].remove();
                }
            };
            const changeShipName = (name) => {
                document.querySelector("span").textContent = name;
            };
            const addRotateFunctionality = () => {
                const rotateBtn = document.querySelector(".btn");
                rotateBtn.addEventListener("click", () => {
                    isVertical = !isVertical;
                    document.querySelector(".ship").classList.toggle("rotate");
                });
            };
            const addDragDropListeners = () => {
                const ship = document.querySelector(".ship");
                ship.addEventListener("dragstart", () => {
                    setTimeout(() => (ship.style.display = "hidden"), 0);
                });
                const spaces = document.querySelectorAll(".space");
                spaces.forEach((space) => {
                    space.addEventListener("dragover", (e) => {
                        e.preventDefault();
                    });
                    space.addEventListener("dragenter", (e) => {
                        e.preventDefault();
                    });
                    space.addEventListener("drop", (e) => {
                        dropShip(activeSpace, e.toElement, isVertical);
                        ship.style.display = "flex";
                        ship.classList.remove("rotate");
                        isVertical = true;
                        displayNextShip(player, (shipNum = shipNum + 1));
                    });
                });
            };
            const displayNextShip = () => {
                switch (shipNum) {
                    case 1:
                        changeShipName("carrier");
                        renderShipSpaces(player.ships.carrier.length);
                        break;
                    case 2:
                        changeShipName("battleship");
                        updateShipSpaces(player.ships.battleship.length);
                        break;
                    case 3:
                        changeShipName("cruiser");
                        updateShipSpaces(player.ships.cruiser.length);
                        break;
                    case 4:
                        changeShipName("submarine");
                        updateShipSpaces(player.ships.submarine.length);
                        break;
                    case 5:
                        changeShipName("destroyer");
                        updateShipSpaces(player.ships.destroyer.length);
                        break;
                    case 6: // End loop
                        document.querySelector(".ships").style.display = "none";
                        document.querySelector(".enemy").style.display =
                            "block";
                        document.querySelector(".player h2").style.display =
                            "block";
                        break;
                }
            };

            addRotateFunctionality();
            addDragDropListeners();
            displayNextShip();
        },
    };
}

function dropShip(source, destination, isVertical) {
    let shipLength = source.parentElement.children.length;
    let dragPosition = getIDNumber(source);
    let xPosition = getIDNumber(destination);
    let rearDiff = shipLength - dragPosition;

    if (isVertical) {
        // Fill space and all spaces behind
        let row = destination.parentElement;
        for (let i = 0; i < dragPosition; i++) {
            row.querySelector(`#x${xPosition}`).classList.add("hasShip");
            row = row.previousElementSibling;
        }

        // Fill spaces after
        row = destination.parentElement;
        for (let i = 0; i < rearDiff; i++) {
            row = row.nextElementSibling;
            row.querySelector(`#x${xPosition}`).classList.add("hasShip");
        }
    } else {
        let space = destination;
        for (let i = 0; i < dragPosition; i++) {
            space.classList.add("hasShip");
            space = space.previousElementSibling;
        }

        space = destination;
        for (let i = 0; i < rearDiff; i++) {
            space = space.nextElementSibling;
            space.classList.add("hasShip");
        }
    }
}

function getIDNumber(element) {
    return parseInt(element.id.replace(/\D/g, ""));
}
