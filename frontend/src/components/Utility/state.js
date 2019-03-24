export const getSafe = (obj, def = "") => obj !== null && obj !== undefined ? obj : def;


export function getSafeDeep(object, path, undefinedValue=""){

    let currentObject = object;
    const pathStrings = path.split(".");


    for(let pathString of pathStrings){
        if(currentObject == null || currentObject == undefined) return undefinedValue;
        currentObject = currentObject[pathString];
    }
    if(currentObject == null || currentObject == undefined) return undefinedValue;
    return currentObject;
}


export function setSafeDeep(object, path, value) {
    let a = path.split('.');
    let o = object;
    for (let i = 0; i < a.length - 1; i++) {
        let n = a[i];
        if (n in o) {
            o = o[n];
        } else {
            o[n] = {};
            o = o[n];
        }
    }
    o[a[a.length - 1]] = value;
}


export function deepCopy(item){
    return JSON.parse(JSON.stringify(item));
}
