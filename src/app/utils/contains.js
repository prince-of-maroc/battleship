export default function contains(arr, value) {
    // Same as default includes method, but works for arrays of arrays/objects.
    return JSON.stringify(arr).indexOf(JSON.stringify(value)) != -1
        ? true
        : false;
}
