#!/bin/bash
# ローカル E2E テスト実行スクリプト
# Firebase エミュレーターの起動・停止を自動管理する
set -e

firebase emulators:exec \
  --only firestore \
  --project demo-e2e \
  "pnpm run test:e2e"
