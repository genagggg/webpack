import axios from "axios";

export default class PostService {
  static async getAll() {
    try {
      const response = await axios.get("https://dummyjson.com/posts");
      return response.data.posts;
    } catch (e) {
      console.log(e);
    }
  }
}
