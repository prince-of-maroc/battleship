export default function domObject() {
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
    };
}
