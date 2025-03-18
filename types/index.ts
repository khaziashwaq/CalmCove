export interface Story {
  id: string;
  title: string;
  author: string;
  content: string;
  date: string;
  likes: number;
}

export interface Comment {
  id: number;
  story_id: string;
  author: string;
  content: string;
  date: string;
}
