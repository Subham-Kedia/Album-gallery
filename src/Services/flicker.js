import axios from "axios";

class FLICKERAPI {
  static #FLICKER_BASE_URL = "https://www.flickr.com/services/rest/";
  static #FLICKER_METHODS = {
    GET_RECENT: "flickr.photos.getRecent",
    SEARCH: "flickr.photos.search",
  };
  static #API_KEY = process.env.REACT_APP_FLICKER_API_KEY;

  static getRecentPhotos(page, limit) {
    return axios.get(this.#FLICKER_BASE_URL, {
      params: {
        method: this.#FLICKER_METHODS.GET_RECENT,
        api_key: this.#API_KEY,
        per_page: limit,
        page: page,
        safe_search: 1,
        format: "json",
        jsoncallback: 1,
      },
    });
  }

  static getPhotosBySearchText(page, query, limit) {
    return axios.get(this.#FLICKER_BASE_URL, {
      params: {
        method: this.#FLICKER_METHODS.SEARCH,
        api_key: this.#API_KEY,
        text: query,
        per_page: limit,
        page: page,
        safe_search: 1,
        format: "json",
        jsoncallback: 1,
      },
    });
  }
}

export default FLICKERAPI;
