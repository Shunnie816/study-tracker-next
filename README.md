# Study Tracker

学習進捗を記録・可視化できる Web アプリです。

[こちら](https://study-tracker.shunniehub.com/)から見ることができます。

---

## アプリ紹介

### 主な機能

- Google アカウントによる認証（ログイン）
- 学習記録の登録
- 学習統計の確認（今日・今週・累計・教材別集計）
- 教材の登録・編集・削除
- 学習記録一覧の表示・削除

---

## 技術スタック

| カテゴリ | 技術 |
|---|---|
| フレームワーク | Next.js 16 (App Router) |
| 言語 | TypeScript (strict mode) |
| UI ライブラリ | MUI (Material UI) v9 + Emotion |
| スタイリング | SCSS Modules |
| 状態管理 | Jotai |
| データ取得 | SWR + Firestore リアルタイムリスナー |
| フォーム | React Hook Form + Zod |
| バックエンド | Firebase / Firestore |
| 認証 | Firebase Auth (Google OAuth) |
| ホスティング | Firebase App Hosting |
| テスト | Vitest + Testing Library / Playwright (E2E) |
| コンポーネント開発 | Storybook |

---

## ローカル開発

### 前提条件

- Node.js 20+
- pnpm 9+
- Firebase CLI

### セットアップ

```bash
# 依存パッケージのインストール
pnpm install

# 環境変数の設定（Firebase 設定・App Check デバッグトークンを記入）
cp .env.local.example .env.local

# Firebase エミュレーター起動（Firestore + Auth、port 8080）
pnpm mock

# 開発サーバー起動（別ターミナル）
pnpm dev
```

開発サーバーは http://localhost:3000 で起動します。  
`NODE_ENV === "development"` 時にエミュレーターへ自動接続されます。

---

## スクリプト一覧

| コマンド | 説明 |
|---|---|
| `pnpm dev` | 開発サーバー起動 (localhost:3000) |
| `pnpm lint` | ESLint 実行 |
| `pnpm type-check` | 型チェック (tsc --noEmit) |
| `pnpm test` | Vitest 単発実行 |
| `pnpm test:watch` | Vitest ウォッチモード |
| `pnpm test:e2e:local` | E2E テスト（エミュレーター自動起動） |
| `pnpm mock` | Firebase エミュレーター起動 |
| `pnpm storybook` | Storybook 起動 (localhost:6006) |

---

## 公開記事

アプリ開発の詳細はこちらの記事で紹介しています：  
[Zenn: Next.js + TypeScriptで作った学習管理アプリ『study-tracker』を振り返る](https://zenn.dev/nekonoko2323/articles/795d624f3293c7)
