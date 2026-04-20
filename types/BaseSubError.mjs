import BaseType from "./BaseType.mjs";



export default class BaseSubError extends BaseType {
    /**
     * Gets the code of the suberror
     * @returns {string} The suberror code
     */
    getCode() {
        throw new Error("Method 'getCode()' must be implemented.");
    }



    /**
     * Gets the message of the suberror
     * @returns {string|null} The suberror message
     */
    getMessage() {
        throw new Error("Method 'getMessage()' must be implemented.");
    }



    /**
     * Checks if this suberror is equal to another
     * @param {BaseSubError} suberror The suberror to compare with
     * @returns {boolean} True if equal, false otherwise 
     */
    equals(suberror) {
        throw new Error("Method 'equals()' must be implemented.");
    }
}