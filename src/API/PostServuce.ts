import axios from "axios";

interface Post {
  data(data: any): unknown;
  id: number;
  title: string;
  body: string;
  userId: number;
  tags: string[];
  reactions: number;
}

interface Comment {
  id: number;
  body: string;
  postId: number;
  user: {
    id: number;
    username: string;
  };
}

interface PostsResponse {
  posts: Post[];
  total: number;
  skip: number;
  limit: number;
}

interface CommentsResponse {
  data: any;
  comments: Comment[];
  total: number;
  skip: number;
  limit: number;
}

const BASE_URL = "https://dummyjson.com/posts";

export default class PostService {
  static async getAll(limit: number = 10, skip: number = 0): Promise<PostsResponse> {
    try {
      const response = await axios.get<PostsResponse>(BASE_URL, {
        params: {
          limit,
          skip,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  }

  static async getById(id: number): Promise<Post> {
    try {
      const response = await axios.get<Post>(`${BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching post with id ${id}:`, error);
      throw error;
    }
  }

  static async getCommentsByPostId(id: number): Promise<CommentsResponse> {
    try {
      const response = await axios.get<CommentsResponse>(`${BASE_URL}/${id}/comments`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching comments for post ${id}:`, error);
      throw error;
    }
  }
}
