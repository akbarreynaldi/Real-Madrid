import fetchAPI from './api.js';

class cacheAPI extends fetchAPI {
    constructor() {
            super();
        }
        //fetch call
    async fetchCache(path) {
        if ('caches' in window) {
            const cacheData = caches.match(this.baseUrl + path).then((response) => {
                if (response) {
                    return response.json();
                }
            })
            this.result = await cacheData;
            if (this.result) {
                return this.result;
            }
        }
    }

}

export default cacheAPI;