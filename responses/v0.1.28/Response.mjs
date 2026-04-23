import Error from "../../types/v0.1.28/Error.mjs";
import Status from "../../types/v0.1.28/Status.mjs";
import BaseResponse from "../BaseResponse.mjs";



export default class Response extends BaseResponse {
    /**
     * Creates a new response
     * @param {object} params
     * @param {Status} params.status The response status
     * @param {*} params.data The response data
     * @param {null|string} [params.message=null] The repsonse message
     * @param {null|Error} [params.error=null] The response error
     * @param {null|object} [params.metadata=null] The response metadata
     * @param {object} [params.extensions={}] The response extensions
     */
    constructor({
        status,
        data,
        message = null,
        error = null,
        metadata = null,
        extensions = {}
    } = {
            message: null,
            error: null,
            metadata: null,
            extensions: {}
        }) {
        super();

        this.status = status;
        this.data = data;
        this.message = message;
        this.error = error;
        this.metadata = metadata;
        this.extensions = extensions;
    }



    static get VERSION() {
        return "0.1.28";
    }



    get version() {
        return this.constructor.VERSION;
    }



    getStatus() {
        return this.status;
    }



    static getVersion() {
        return this.constructor.VERSION;
    }



    getData() {
        return this.data;
    }



    getMessage() {
        return this.message;
    }



    getExtensions() {
        return this.extensions;
    }



    getMetadata() {
        return this.metadata;
    }



    getError() {
        return this.error;
    }


    isError() {
        return this.status.equals(Status.error()) && this.error instanceof Error;
    }



    isSuccess() {
        return this.status.equals(Status.success()) && this.error === null;
    }



    hasExtension(code) {
        return Object.keys(this.extensions).includes(code);
    }



    getExtension(code) {
        return this.extensions[code];
    }



    isValid() {
        return (
            this.getStatus() instanceof Status &&
            this.getStatus().isValid() &&
            typeof this.getVersion() === "string" &&
            (this.getMessage() === null || typeof this.getMessage() === "string") &&
            (this.getMetadata() === null || typeof this.getMetadata() === "object") &&
            (this.getError() === null || (this.getError() instanceof Error && this.getError().isValid()))
        );
    }



    static fromObject(obj) {
        let status = Status.fromObject(obj.status);
        let data = obj.data;
        let message = obj.message !== undefined ? obj.message : null;
        let error = obj.error !== undefined && obj.error !== null ? Error.fromObject(obj.error) : null;
        let metadata = obj.metadata !== undefined ? obj.metadata : null;
        let extensions = obj.extensions !== undefined ? obj.extensions : {};

        return new Response({
            status,
            data,
            message,
            error,
            metadata,
            extensions
        });
    }



    static fromRaw(raw) {
        let status = Status.fromRaw(raw.status);
        let data = raw.data;
        let message = raw.message !== undefined ? raw.message : null;
        let error = raw.error !== undefined && raw.error !== null ? Error.fromRaw(raw.error) : null;
        let metadata = raw.meta !== undefined ? raw.meta : null;
        let extensions = raw.extensions !== undefined ? raw.extensions : {};

        return new Response({
            status,
            data,
            message,
            error,
            metadata,
            extensions
        });
    }
}