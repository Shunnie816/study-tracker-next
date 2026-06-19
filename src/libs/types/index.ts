export type Textbook = {
  /** 投稿するときにはid未定義(firestoreで自動生成されるため) */
  id?: string;
  name: string;
  color?: string;
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

/** 教材別集計結果 */
export type TextbookStat = {
  textbook: Textbook;
  totalMinutes: number;
};
