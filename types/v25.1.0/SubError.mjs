import BaseError from "../BaseError.mjs";
import BaseSubError from "../BaseSubError.mjs";



export default class SubError extends BaseSubError {
    /**
     * Creates a new suberror
     * @param {string} code The suberror code
     * @param {string|null} [message=null] The suberror message
     * @param {BaseError|null} [error=null] The parent error
     */
    constructor(code, message = null, error = null) {
        super();

        this.code = code;
        this.message = message;
        this.error = error;
    }



    getCode() {
        return this.code;
    }



    getMessage() {
        return this.message;
    }



    equals(suberror) {
        if (!(suberror instanceof SubError)) {
            return false;
        }

        return this.code === suberror.getCode() && this.message === suberror.getMessage();
    }



    isValid() {
        return typeof this.code === "string" && (this.message === null || typeof this.message === "string");
    }



    /**
     * Creates an instance from a plain object
     * @param {Object} obj The plain object
     * @param {BaseError} error The parent error
     * @returns {SubError} The created instance
     */
    static fromObject(obj, error = null) {
        let code = obj.code;
        let message = obj.message !== undefined ? obj.message : null;

        return new SubError(code, message, error);
    }



    /**
     * Creates an instance from a raw KAPIR object
     * @param {object} raw Raw API object
     * @param {BaseError} error Parent error
     * @returns 
     */
    static fromRaw(raw, error = null) {
        return this.fromObject(raw, error);
    }
}