import qs from "qs";
import axios from "axios";
const PENDING = new Map();

// base apiUrl
const APIURL = "https://api.themoviedb.org/3";

/**
 * Create axios instance
 */
const Axios = axios.create({
	timeout: 30000,
});

/**
 * Add pending request
 * @param config Request configuration
 */
const addPending = (config) => {
	if (config) {
		const url = [
			config.method,
			config.url,
			qs.stringify(config.params),
			qs.stringify(config.data),
		].join("&");
		config.cancelToken =
			config.cancelToken ||
			new axios.CancelToken((cancel) => {
				if (!PENDING.has(url)) {
					PENDING.set(url, cancel);
				}
			});
	}
};

/**
 * Remove pending request
 * @param config Request configuration
 */
const removePending = (config) => {
	if (config) {
		const url = [
			config.method,
			config.url,
			qs.stringify(config.params),
			qs.stringify(config.data),
		].join("&");
		if (PENDING.has(url)) {
			const cancel = PENDING.get(url);
			cancel(url);
			PENDING.delete(url);
		}
	}
};

// /**
//  * Clear all pending request
//  */
export const clearPending = () => {
	for (const [url, cancel] of PENDING) {
		cancel(url);
	}
	PENDING.clear();
};

// /**
//  * Add request interceptor
//  */
Axios.interceptors.request.use(
	(config) => {
		// Remove pending request with the same url
		removePending(config);

		// Add pending request
		addPending(config);

		// Setup base url
		if (config) {
			config.baseURL = APIURL;
		}

		// Return updated config
		return config;
	},
	(error) => {
		// Reject promise
		return Promise.resolve(error);
	}
);

// /**
//  * Add response interceptor
//  */
Axios.interceptors.response.use(
	(response) => {
		// Remove pending request
		removePending(response?.config);
		return response;
	},
	(error) => {
		// Reject promise
		return Promise.reject(error);
	}
);

export default Axios;
