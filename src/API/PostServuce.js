import axios from "axios";

export default class PostService {
  static async getAll(limit, skip) {
    const response = await axios.get("https://dummyjson.com/posts", {
      params: {
        limit: limit,
        skip: skip,
      },
    });
    return response;
  }
}
