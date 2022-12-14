export default function shipFactoryFunction(length) {
    return {
        length,
        hits: 0,
        hit() {
            this.hits++;
        },
        isSunk() {
            return this.hits >= this.length ? true : false;
        },
    };
}
