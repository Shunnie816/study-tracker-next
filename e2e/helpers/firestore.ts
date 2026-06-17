const PROJECT_ID =
  process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? "demo-e2e";
const EMULATOR_BASE = "http://127.0.0.1:8080";

/** エミュレーター上のデータをすべて削除する */
export async function clearFirestore(): Promise<void> {
  await fetch(
    `${EMULATOR_BASE}/emulator/v1/projects/${PROJECT_ID}/databases/(default)/documents`,
    { method: "DELETE" }
  );
}

/** テキストブックを1件シードし、ドキュメント ID を返す */
export async function seedTextbook(name: string): Promise<string> {
  const res = await fetch(
    `${EMULATOR_BASE}/v1/projects/${PROJECT_ID}/databases/(default)/documents/textbooks`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fields: {
          name: { stringValue: name },
          createdAt: { timestampValue: new Date().toISOString() },
        },
      }),
    }
  );
  const data = (await res.json()) as { name: string };
  return data.name.split("/").pop()!;
}

/** 学習記録を1件シードする */
export async function seedPost(data: {
  textbookId: string;
  textbookName: string;
  timeMinutes: number;
  content: string;
}): Promise<void> {
  await fetch(
    `${EMULATOR_BASE}/v1/projects/${PROJECT_ID}/databases/(default)/documents/posts`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fields: {
          textbook: {
            mapValue: {
              fields: {
                id: { stringValue: data.textbookId },
                name: { stringValue: data.textbookName },
              },
            },
          },
          time: { integerValue: String(data.timeMinutes) },
          content: { stringValue: data.content },
          createdAt: { timestampValue: new Date().toISOString() },
        },
      }),
    }
  );
}
