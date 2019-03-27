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

export function eliminateWhiteSpace(string) {
    return string.trimStart().replace("  ", " ");
}
