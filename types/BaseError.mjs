import BaseSubError from "./BaseSubError.mjs";



export default class BaseError {
    /**
     * Gets the code of the error
     * @returns {string} The error code
     */
    getCode() {
        throw new Error("Method 'getCode()' must be implemented.");
    }



    /**
     * Gets the message of the error
     * @returns {string|null} The error message
     */
    getMessage() {
        throw new Error("Method 'getMessage()' must be implemented.");
    }



    /**
     * Gets the suberrors of the error
     * @returns {BaseSubError[]} The array of suberrors
     */
    getSubErrors() {
        throw new Error("Method 'getSubErrors()' must be implemented.");
    }



    /**
     * Checks if the error has a specific suberror
     * @param {BaseSubError} suberror The suberror to check for
     * @returns {boolean} True if the suberror exists, false otherwise
     */
    hasSubError(suberror) {
        throw new Error("Method 'hasSubError()' must be implemented.");
    }



    /**
     * Checks if the error has a suberror by its values
     * @param {Object} filters The filters to check
     * @param {string|null} [filters.code=null] The suberror code to check for
     * @param {string|null} [filters.message=null] The suberror message to check for
     * @returns {boolean} True if a matching suberror exists, false otherwise
     */
    hasSubErrorByValue({
        code = null,
        message = null
    } = {}) {
        throw new Error("Method 'hasSubErrorByValue()' must be implemented.");
    }



    /**
     * Checks if this error is equal to another
     * @param {BaseError} error The error to compare with
     * @returns {boolean} True if equal, false otherwise 
     */
    equals(error) {
        throw new Error("Method 'equals()' must be implemented.");
    }
}