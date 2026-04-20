export default class BaseType {
    /**
     * Checks if the type is valid
     * @returns {boolean} True if valid, false otherwise
     */
    isValid() {
        throw new Error("Method 'isValid()' must be implemented.");
    }



    /**
     * Creates an instance from a plain object
     * @param {Object} obj The plain object
     * @returns {BaseType} The created instance
     */
    static fromObject(obj) {
        throw new Error("Method 'fromObject()' must be implemented.");
    }



    /**
     * Creates an instance from a raw KAPIR object
     * @param {*} rawValue Raw response from the API
     */
    static fromRaw(raw) {
        throw new Error("Method 'fromRaw()' must be implemented.");
    }
}