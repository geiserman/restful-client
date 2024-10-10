const superagent = require('superagent');

require('superagent-retry-delay')(superagent);

const { getLogger } = require('@geiserman/js-logger');

const logger = getLogger();

/**
 * retry twice before responding, wait 3 seconds between failures, do not retry when response is success,
 * or 400, 401, 404, 403
 * @param endpoint
 * @param queryParams
 * @param requestBody
 * @param customHeaders
 * @returns {Promise<*>}
 */
async function post({ url, queryParams = {}, requestBody = {}, customHeaders = {} }) {
    try {
        logger.debug(`POST request to ${url}`);

        return superagent
            .post(url)
            .retry(3, [1000, 3000, 10000], [400, 401, 404, 403])
            .query(queryParams)
            .set(Object.assign(customHeaders))
            .send(requestBody);
    } catch (e) {
        throw new Error(`Unable to POST request to provided url ${url}: ${e}`);
    }
}

/**
 * retry twice before responding, wait 3 seconds between failures, do not retry when response is success,
 * or 400, 401, 404, 403
 * @param endpoint
 * @param queryParams
 * @returns {Promise<*>}
 */
async function get({ url, queryParams = {}, customHeaders = {} }) {
    try {
        logger.debug(`GET request to ${url}`);

        return superagent
            .get(url)
            .retry(3, [1000, 3000, 10000], [400, 401, 404, 403])
            .query(queryParams)
            .set(Object.assign(customHeaders))
            .send();
    } catch (e) {
        throw new Error(`Unable to GET request to url: ${url} ${e}`);
    }
}

/**
 * retry twice before responding, wait 3 seconds between failures, do not retry when response is success,
 * or 400, 401, 404, 403
 * @param endpoint
 * @param queryParams
 * @param requestBody
 * @param customHeaders
 * @returns {Promise<*>}
 */
async function del({ url, queryParams = {}, requestBody = {}, customHeaders = {} }) {
    try {
        logger.debug(`DELETE request to ${url}`);

        return superagent
            .delete(url)
            .retry(3, [1000, 3000, 10000], [400, 401, 404, 403])
            .query(queryParams)
            .set(Object.assign(customHeaders))
            .send(requestBody);
    } catch (e) {
        throw new Error(`Unable to send DELETE request to url: ${url} ${e}`);
    }
}

/**
 * retry twice before responding, wait 3 seconds between failures, do not retry when response is success,
 * or 400, 401, 404, 403
 * @param endpoint
 * @param queryParams
 * @param requestBody
 * @param customHeaders
 * @returns {Promise<*>}
 */
async function put({ url, queryParams = {}, requestBody = {}, customHeaders = {} }) {
    try {
        logger.debug(`PUT request to ${url}`);

        return superagent
            .put(url)
            .retry(3, [1000, 3000, 10000], [400, 401, 404, 403])
            .query(queryParams)
            .set(Object.assign(customHeaders))
            .send(requestBody);
    } catch (e) {
        throw new Error(`Unable to send PUT request to url: ${url} ${e}`);
    }
}

module.exports = {
    post,
    get,
    del,
    put,
};
