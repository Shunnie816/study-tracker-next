#!/bin/bash
# ローカル E2E テスト実行スクリプト
# Firebase エミュレーターの起動・停止を自動管理する
set -e

pnpm exec playwright install chromium

export NEXT_PUBLIC_SKIP_APP_CHECK=true
export NEXT_PUBLIC_FIREBASE_PROJECT_ID=demo-e2e

# Next.js 16 は同一ディレクトリで複数の dev サーバー起動を禁止する。
# ポート 3001 を占有しているプロセスを事前に終了させる。
npx kill-port 3001 2>/dev/null || true

# Next.js 16 のロックファイルを削除して再起動を許可する
rm -f .next/dev/lock 2>/dev/null || true

firebase emulators:exec \
  --only firestore \
  --project demo-e2e \
  "pnpm run test:e2e"
