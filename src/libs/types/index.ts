export type Textbook = {
  /** 投稿するときにはid未定義(firestoreで自動生成されるため) */
  id?: string;
  name: string;
};

/** 投稿用の型 */
export type ReportData = {
  textbook: Textbook;
  time: number | string;
  content: string;
};

/** 投稿一覧用の型 */
export type PostData = {
  id: string;
  date: string;
  textbook: Textbook;
  time: number | string;
  content: string;
};
