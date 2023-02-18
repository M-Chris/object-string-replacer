/**
 * extractKeys
 *
 * Extracts all keys from a string in the format of '{{key}}'
 *
 * @param {string} str - The input string
 * @return {Array} - An array of extracted keys
 */
 const extractKeys = (str) => {
    // Get all matches in the string that match the pattern '{{...}}'
    const matches = str.match(/\{\{.*?\}\}/g);
    // If no matches were found, return an empty array
    if (!matches) return [];
    // Map over the matches, and remove the '{{' and '}}' from each match
    return matches.map((key) => key.slice(2, -2));
};


/**
 * replaceTokens
 *
 * Replaces tokens in a string with their corresponding values from provided objects
 *
 * @param {string} str - The input string
 * @param {Object} tokens - Object containing keys and values to replace tokens with
 * @param {Object} [fallbackTokens={}] - Object containing fallback keys and values to replace tokens with if not found in tokens
 * @return {string} - The string with tokens replaced by values
 */
const replaceTokens = (str, tokens, fallbackTokens = {}) => {
    // Initialize a cache object to store the extracted keys and their values
    const cache = {};
    // Extract the keys from the input string
    const keys = extractKeys(str);

    // Iterate over each extracted key
    for (const key of keys) {
        // Check if the current key exists in the cache
        if (cache[key]) {
            // If yes, continue to the next iteration
            continue;
        }
        let value = null;
        let fallbackKey = null;
        // Check if the current key contains " || "
        if (key.includes(' || ')) {
        // If yes, split the key into two parts: mainkey and fallbackKey
            const parts = key.split('||');
            const mainkey = parts[0].trim();
            fallbackKey = parts[1].trim();
            // Try to get the value of mainkey from tokens
            value = getValueFromPath(mainkey, tokens);
            // If not found, try to get the value of fallbackKey from fallbackTokens
            if (!value) value = getValueFromPath(fallbackKey, fallbackTokens);
            // If still not found, try to get the value of fallbackKey from tokens
            if (!value) value = getValueFromPath(fallbackKey, tokens);
        } else {
            // If not, try to get the value of key from tokens
            value = getValueFromPath(key, tokens);
            // If not found, try to get the value of key from fallbackTokens
            if (!value) value = getValueFromPath(key, fallbackTokens);
        }
        // Store the extracted key and its value in the cache object
        cache[key] = value;
        // Replace the {{key}} in the input string with the extracted value
        str = str.replace(`{{${key}}}`, value || '');
    }
    // Return the final string with all the tokens replaced
    return str;
};


/**
 * getValueFromPath - Function to extract value from an object based on a given path string
 *
 * @param {string} path  - The path of the desired property
 * @param {object} obj   - The object containing the desired property
 *
 * @return {any} - The value of the property at the given path, or undefined if the property is not found
 */
const getValueFromPath = (path, obj) => {
    try {
        // Use reduce to traverse the path and extract the value
        return path.split('.').reduce(function(object, property) {
            // Check if the property is an array index, indicated by [index] syntax
            const match = property.match(/\[(\d+)\]/);
            if (match) {
                // If it is an array index, extract the property name and the index
                const propertyName = property.split('[')[0];
                // Check if the object is an array and the index is within bounds
                if (Array.isArray(object[propertyName]) && object[propertyName].length > match[1]) {
                    // If so, return the value at that index
                    return object[propertyName][match[1]];
                } else {
                    // If not, return undefined
                    return undefined;
                }
            } else {
                // If the property is not an array index, just return the property value if it exists
                return Object.prototype.hasOwnProperty.call(object, property) ? object[property] : undefined;
            }
        }, obj);
    } catch (e) {
        // Return undefined if there is an error during the reduction process
        return undefined;
    }
};


module.exports = { extractKeys, replaceTokens, getValueFromPath };
