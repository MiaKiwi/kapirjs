import BaseError from "../BaseError.mjs";
import BaseSubError from "../BaseSubError.mjs";
import SubError from "./SubError.mjs";



export default class Error extends BaseError {
    /**
     * Creates a new error
     * @param {string} code The error code
     * @param {string|null} [message=null] The error message
     * @param {BaseSubError[]} [suberrors=[]] The array of suberrors
     */
    constructor(code, message = null, suberrors = []) {
        super();

        this.code = code;
        this.message = message;
        this.suberrors = suberrors;
    }



    getCode() {
        return this.code;
    }



    getMessage() {
        return this.message;
    }



    getSubErrors() {
        return this.suberrors;
    }



    hasSubError(suberror) {
        return this.suberrors.some(se => se.equals(suberror));
    }



    hasSubErrorByValue({
        code = null,
        message = null
    } = {}) {
        return this.suberrors.some(se => {
            let codeMatches = code === null || se.getCode() === code;
            let messageMatches = message === null || se.getMessage() === message;

            return codeMatches && messageMatches;
        });
    }



    equals(error) {
        if (!(error instanceof Error)) {
            return false;
        }

        return this.code === error.getCode() && this.message === error.getMessage() && this.suberrors.length === error.getSubErrors().length && this.suberrors.every((se, index) => se.equals(error.getSubErrors()[index]));
    }



    isValid() {
        return typeof this.code === "string" && (this.message === null || typeof this.message === "string") && Array.isArray(this.suberrors) && this.suberrors.every(suberror => suberror instanceof BaseSubError && suberror.isValid());
    }



    static fromObject(obj) {
        let code = obj.code;
        let message = obj.message !== undefined ? obj.message : null;
        let suberrors = Array.isArray(obj.suberrors) ? obj.suberrors.map(suberrorObj => SubError.fromObject(suberrorObj)) : [];

        return new Error(code, message, suberrors);
    }



    static fromRaw(raw) {
        raw.suberrors = raw.error.errors;
        delete raw.errors;

        return this.fromObject(raw);
    }
}