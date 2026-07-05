// Base properties
const domain = "http://127.0.0.1:5000/";
const allowedCharacters = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const base = allowedCharacters.length;

// Simulated Database Storage
const idToUrlMap = new Map();
const urlToIdMap = new Map();
let currentId = 100000;

/**
 * Converts a unique Base10 database ID into a Base62 alphanumeric string token.
 */
function encodeBase62(idVal) {
    let num = idVal;
    let sb = [];
    while (num > 0) {
        sb.push(allowedCharacters[num % base]);
        num = Math.floor(num / base);
    }
    sb.reverse();
    return sb.join("");
}

/**
 * Decodes a Base62 string token back into its source database numeric ID.
 */
function decodeBase62(strVal) {
    let num = 0;
    for (let i = 0; i < strVal.length; i++) {
        num = num * base + allowedCharacters.indexOf(strVal[i]);
    }
    return num;
}

/**
 * Shortens a given long URL string and stores it in the data maps.
 */
function shorten(longUrlStr) {
    // Return existing shortened token if URL was already processed
    if (urlToIdMap.has(longUrlStr)) {
        const existingId = urlToIdMap.get(longUrlStr);
        return domain + encodeBase62(existingId);
    }

    // Save entry and increment the counter
    const idVal = currentId;
    currentId += 1;

    idToUrlMap.set(idVal, longUrlStr);
    urlToIdMap.set(longUrlStr, idVal);

    return domain + encodeBase62(idVal);
}

/**
 * Resolves a shortened URL code back to its original form.
 */
function resolve(shortCode) {
    const idVal = decodeBase62(shortCode);
    return idToUrlMap.get(idVal);
}

function debugGetMaps() {
    return {
        idToUrl: Object.fromEntries(idToUrlMap),
        urlToId: Object.fromEntries(urlToIdMap),
        nextExpectedId: currentId
    };
}

// Export functions to be used in index.js
module.exports = { shorten, resolve, debugGetMaps };
