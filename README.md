# KAPIR JS

_**kiwi.mia.0005** — KapirJS_

Hi! Welcome to KapirJS, a JavaScript implementation of a [KAPIR](https://mia.kiwi/kapir) client.

## About KAPIR

KAPIR is an open standard defining the structure and meaning of API responses, this implementation in particular is aimed towards HTTP APIs, though KAPIR can be used for any type of API server-to-client communication.

### Response structure

Following KAPIR draft version v0.1.28, a standard API response looks like this:

```json
{
    "status": "success",
    "version": "0.1.28",
    "data": {
        "id": 1,
        "name": "John",
        "friend": true
    },
    "message": "Found John!",
    "error": null,
    "meta": {
        "response_time": "2026-07-29T19:03:04+02:00"
    },
    "ext": []
}
```

or this, if something went wrong:

```json
{
    "status": "error",
    "version": "0.1.28",
    "data": null,
    "message": "Invalid credentials",
    "error": {
        "code": "UNAUTHORIZED",
        "message": "Invalid login credentials provided",
        "errors": []
    },
    "meta": {
        "response_time": "2026-07-29T19:03:04+02:00"
    },
    "ext": []
}
```

## How to use

### Prepare an API

You can instantiate a new API using the `Api` class. You can also set its `base` property when creating it to prepend an URL to paths you give it. For example, an API with a base of `https://example.com/api/v1/`, when called with the path `users/1`, will send its requests to `https://example.com/api/v1/users/1`.

You can also define default headers with the constructor

```js
import Api from "./kapir/Api.mjs";

// Creates an API with the given base and default header
let api = new Api('https://api.example.com/v1/', {
    'Content-Type': 'application/json'
});
```

That API will now always send the `Content-Type` header with its requests, unless the value is overriden by the request call itself.

### Sending requests

To send request, you can call the method of the `Api` class that suits your needs. For example, to send a GET request:

```js
await api.get('/users/1');
```

You can also include a body:

```js
await api.post('/users/1/comments', {
    content: 'Love your outfit!'
});
```

And add headers as well:

```js
await api.get('/animals/1', undefined, {
    'Authorization': 'Bearer mr-snuggles-key'
})
```

The following HTTP methods are supported natively by KapirJS: GET, POST, PUT, PATCH, DELETE, OPTIONS, and HEAD. You can also easily implement new verbs by extending the `Api` class:

```js
import Api from "./kapir/Api.mjs";

class KissApi extends Api {
    async kiss(endpoint, body = undefined, headers = {}) {
        return await this._request(endpoint, 'KISS', headers, body); // Peace and love amirite
    }
}
```

### Understanding responses

The `Api` request methods return:

- `null`, if the body is empty;
- A normal JS object, if parsing failed;
- A `BaseResponse` extension of the appropriate KAPIR version.

The exact type of `BaseResponse` returns depends on the format version used by the API itself. As of 2026-04-20, KapirJS supports the following KAPIR format versions:

- WD v0.1.28 (`0.1.28`);
- WD v25.1.0 (`25.1.0`);