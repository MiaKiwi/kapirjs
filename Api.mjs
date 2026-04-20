import BaseResponse from "./responses/BaseResponse.mjs";
import { default as Response0_1_28 } from "./responses/v0.1.28/Response.mjs";
import { default as Response25_1_0 } from "./responses/v25.1.0/Response.mjs";



export default class Api {
    /**
     * Creates a new API instance
     * @param {string} base Base of the API
     * @param {object} headers Default headers added to every request
     */
    constructor(base = null, headers = {}) {
        this.headers = headers;
        this._base = base === '/' ? base : base.replace(/\/$/, "");
        this._responses = [];
    }



    /**
     * Prepends the API base to a path, or returns the input
     * @param {string} endpoint Path of the request
     * @returns {string} Full endpoint URL
     * @private
     */
    _getFullURL(endpoint) {
        return endpoint.startsWith("/") ? this._base + endpoint : endpoint;
    }



    /**
     * Sends a request with the given parameters
     * @param {string} endpoint URL or path to send the request too
     * @param {string} method HTTP method to use
     * @param {object} [headers={}] Headers to include
     * @param {*} [body=undefined] Data to include in the request body
     * @returns {object|BaseResponse|null|null} Response from the API
     * @private
     */
    async _request(endpoint, method, headers = {}, body = undefined) {
        let options = {
            method: method,
            headers: { ...this.headers, ...headers }
        };

        if (body !== undefined) options.body = JSON.stringify(body);

        let url = this._getFullURL(endpoint);

        let res = await fetch(url, options);

        let rawResponse = null;
        if (res.status === 204 || res.status === 205 || res.headers.get('Content-Length') === '0') {
        } else {
            try {
                rawResponse = await res.json();
            } catch (e) {
                rawResponse = await res.text().catch(() => null);
            }
        }

        let response = null;
        try {
            response = this._parseResponse(rawResponse);
        } catch {
            response = rawResponse;
        }

        this._responses.push(response);

        return response;
    }



    /**
     * Sends a GET request to the API
     * @param {string} endpoint Target URL or path
     * @param {*} [body=undefined] Data to include
     * @param {object} [headers={}] Headers to include
     * @returns {object|BaseResponse|null} API response
     */
    async get(endpoint, body = undefined, headers = {}) {
        return await this._request(endpoint, 'GET', headers, body);
    }

    /**
     * Sends a POST request to the API
     * @param {string} endpoint Target URL or path
     * @param {*} [body=undefined] Data to include
     * @param {object} [headers={}] Headers to include
     * @returns {object|BaseResponse|null} API response
     */
    async post(endpoint, body = undefined, headers = {}) {
        return await this._request(endpoint, 'POST', headers, body);
    }

    /**
     * Sends a PUT request to the API
     * @param {string} endpoint Target URL or path
     * @param {*} [body=undefined] Data to include
     * @param {object} [headers={}] Headers to include
     * @returns {object|BaseResponse|null} API response
     */
    async put(endpoint, body = undefined, headers = {}) {
        return await this._request(endpoint, 'PUT', headers, body);
    }

    /**
     * Sends a PATCH request to the API
     * @param {string} endpoint Target URL or path
     * @param {*} [body=undefined] Data to include
     * @param {object} [headers={}] Headers to include
     * @returns {object|BaseResponse|null} API response
     */
    async patch(endpoint, body = undefined, headers = {}) {
        return await this._request(endpoint, 'PATCH', headers, body);
    }

    /**
     * Sends a DELETE request to the API
     * @param {string} endpoint Target URL or path
     * @param {*} [body=undefined] Data to include
     * @param {object} [headers={}] Headers to include
     * @returns {object|BaseResponse|null} API response
     */
    async delete(endpoint, body = undefined, headers = {}) {
        return await this._request(endpoint, 'DELETE', headers, body);
    }

    /**
     * Sends a OPTIONS request to the API
     * @param {string} endpoint Target URL or path
     * @param {*} [body=undefined] Data to include
     * @param {object} [headers={}] Headers to include
     * @returns {object|BaseResponse|null} API response
     */
    async options(endpoint, body = undefined, headers = {}) {
        return await this._request(endpoint, 'OPTIONS', headers, body);
    }

    /**
     * Sends a HEAD request to the API
     * @param {string} endpoint Target URL or path
     * @param {*} [body=undefined] Data to include
     * @param {object} [headers={}] Headers to include
     * @returns {object|BaseResponse|null} API response
     */
    async head(endpoint, body = undefined, headers = {}) {
        return await this._request(endpoint, 'HEAD', headers, body);
    }



    /**
     * Parses an API response with the appropriate KAPIR format version
     * @param {object} rawResponse Raw API response object
     * @returns {BaseResponse} Parsed API response
     * @throws An error if KAPIR version not supported
     * @private
     */
    _parseResponse(rawResponse) {
        let version = rawResponse?.version;

        if (version.startsWith("0.1.28")) {
            return Response0_1_28.fromRaw(rawResponse);
        } else if (version.startsWith("25.1.0")) {
            return Response25_1_0.fromRaw(rawResponse);
        } else {
            throw new Error(`KAPIR version "${version ?? 'unknown'}" is not supported`)
        }
    }
}