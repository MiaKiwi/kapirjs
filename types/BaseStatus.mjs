import BaseType from "./BaseType.mjs";



export default class BaseStatus extends BaseType {
    /**
     * Gets the allowed values for the status
     * @returns {string[]} The array of allowed status values
     */
    getAllowedValues() {
        throw new Error("Method 'getAllowedValues()' must be implemented.");
    }



    /**
     * Gets the value of the status
     * @returns {string} The status value
     */
    getValue() {
        throw new Error("Method 'getValue()' must be implemented.");
    }
}