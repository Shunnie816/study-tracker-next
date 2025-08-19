export type Textbook = {
  id: string;
  name: string;
};

export type PostData = {
  /** 投稿するときには未定義(firestoreで自動生成されるため) */
  id?: string;
  date: string;
  textbook: Textbook;
  time: string;
  content: string;
};
