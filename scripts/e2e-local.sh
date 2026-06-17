#!/bin/bash
# ローカル E2E テスト実行スクリプト
# Firebase エミュレーターの起動・停止を自動管理する
set -e

pnpm exec playwright install chromium

export NEXT_PUBLIC_SKIP_APP_CHECK=true
export NEXT_PUBLIC_FIREBASE_PROJECT_ID=demo-e2e

firebase emulators:exec \
  --only firestore \
  --project demo-e2e \
  "pnpm run test:e2e"
