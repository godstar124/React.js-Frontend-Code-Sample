import ApiUrls from './api.urls';
import storage from './storage';

class HTTP {
  /**
   * @param option
   * @param option.type - FormData, JSON - default
   * @param option.url - Url
   * @param option.body - Query body
   * @param option.headers - Headers
   * @param option.method - Query method
   */
  static query(option) {
    option.headers = option.headers || {};
    const token = storage().getItem('auth_token');
    if (token) {
      option.headers['x-auth-token'] = token;
    }
    switch (option.type) {
      default:
        option.headers['Content-Type'] = 'application/json';
        option.headers.Accept = 'application/json';
        return HTTP.send(option);
    }
  }

  static send(option) {
    return fetch(ApiUrls.HOST + option.url, {
      method: option.method,
      headers: new Headers(option.headers),
      body: JSON.stringify(option.body)
    });
  }
}

export default HTTP;
