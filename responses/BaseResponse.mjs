import BaseError from "../types/BaseError.mjs";
import BaseStatus from "../types/BaseStatus.mjs";
import BaseType from "../types/BaseType.mjs";



export default class BaseResponse extends BaseType {
    /**
     * Gets the status of the response
     * @returns {BaseStatus} The response status
     */
    getStatus() {
        throw new Error("Method 'getStatus()' must be implemented.");
    }



    /**
     * Gets the version of the response
     * @returns {string} The response version
     */
    static getVersion() {
        throw new Error("Method 'getVersion()' must be implemented.");
    }



    /**
     * Gets the data of the response
     * @returns {*} The response data
     */
    getData() {
        throw new Error("Method 'getData()' must be implemented.");
    }



    /**
     * Gets the message of the response
     * @returns {string|null} The response message
     */
    getMessage() {
        throw new Error("Method 'getMessage()' must be implemented.");
    }



    /**
     * Gets the extensions of the response
     * @returns {Object} The response extensions
     */
    getExtensions() {
        throw new Error("Method 'getExtensions()' must be implemented.");
    }



    /**
     * Gets the metadata of the response
     * @returns {Object|null} The response metadata
     */
    getMetadata() {
        throw new Error("Method 'getMetadata()' must be implemented.");
    }



    /**
     * Gets the error of the response
     * @returns {BaseError|null} The response error
     */
    getError() {
        throw new Error("Method 'getError()' must be implemented.");
    }



    /**
     * Checks if the response is an error
     * @returns {boolean} True if it is an error, false otherwise
     */
    isError() {
        throw new Error("Method 'isError()' must be implemented.");
    }



    /**
     * Checks if the response is a success
     * @returns {boolean} True if it is a success, false otherwise
     */
    isSuccess() {
        throw new Error("Method 'isSuccess()' must be implemented.");
    }



    /**
     * Checks if the response has a specific extension
     * @param {string} code The extension code to check for
     * @returns {boolean} True if it has an extension, false otherwise
     */
    hasExtension(code) {
        throw new Error("Method 'hasExtension()' must be implemented.");
    }



    /**
     * Gets a specific extension by its code
     * @param {string} code The extension code
     * @returns {*} The extension value
     */
    getExtension(code) {
        throw new Error("Method 'getExtension()' must be implemented.");
    }
}