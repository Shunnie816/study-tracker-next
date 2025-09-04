import { getAnalytics } from "firebase/analytics";
import { initializeApp, getApps } from "firebase/app";
import {
  initializeAppCheck,
  ReCaptchaEnterpriseProvider,
} from "firebase/app-check";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID!,
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
export const analytics =
  typeof window !== "undefined" ? getAnalytics(app) : undefined;

function initAppCheck() {
  /** クライアント側限定で呼び出す(SSRで初期化しないように) */
  if (typeof window === "undefined") return;
  return initializeAppCheck(app, {
    provider: new ReCaptchaEnterpriseProvider(
      process.env.NEXT_PUBLIC_FIREBASE_APP_CHECK_KEY!
    ),
    isTokenAutoRefreshEnabled: true,
  });
}
export const appCheck = initAppCheck();

/** 開発環境のみ実行する */
if (process.env.NEXT_PUBLIC_FIREBASE_DEBUG_TOKEN) {
  /** ローカルデバッグトークンを有効にする(App Checkではじかれないように) */
  (globalThis as any).FIREBASE_APPCHECK_DEBUG_TOKEN =
    process.env.NEXT_PUBLIC_FIREBASE_DEBUG_TOKEN;
}

export const db = getFirestore(app);

/** Firestoreエミュレーター接続 */
if (process.env.NODE_ENV === "development") {
  try {
    connectFirestoreEmulator(db, "127.0.0.1", 8080);
  } catch (e) {
    // すでに接続済みの場合などは無視
  }
}
