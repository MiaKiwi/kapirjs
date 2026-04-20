import BaseStatus from "../BaseStatus.mjs";



export default class Status extends BaseStatus {
    constructor(value) {
        super();

        if (!Status.ALLOWED_VALUES.includes(value)) {
            throw new Error(`Invalid status value: ${value}`);
        }

        this.value = value;
    }



    static get ALLOWED_VALUES() {
        return ['success', 'error'];
    }



    getAllowedValues() {
        return Status.ALLOWED_VALUES;
    }



    getValue() {
        return this.value;
    }



    equals(status) {
        if (!(status instanceof Status)) {
            return false;
        }

        return this.value === status.getValue();
    }



    static fromObject(obj) {
        let value = obj.value;

        return new Status(value);
    }



    /**
     * Creates a success status
     * @returns {Status} The created status
     */
    static success() {
        return new Status('success');
    }



    /**
     * Creates an error status
     * @returns {Status} The created status
     */
    static error() {
        return new Status('error');
    }



    static fromRaw(raw) {
        return new Status(raw);
    }
}