class CacheProxy {
    _fetchData(url) {
        return fetch(url, {
            headers: {
                'X-Auth-Token': '0abc6396d0bc4baa9513580656e492d7'
            }
        })
    }
    constructor() {
        this.cache = {}
        this.get = url => {
            if (url in this.cache)
                return Promise.resolve(this.cache[url]);
            else
                return this._fetchData(url).then(data => {
                    this.cache[url] = data;
                    return data;
                });
        }
    }
}

module.exports = new CacheProxy();
