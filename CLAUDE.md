# CLAUDE.md

このファイルは Claude Code がこのリポジトリで作業する際のガイドラインです。

## プロジェクト概要

学習記録・管理アプリ。教材（テキスト）の登録・管理と、学習セッションの記録・集計を行う。
Next.js 14 (App Router) + Firebase/Firestore で構築されており、Firebase App Hosting でホストされている。

## 技術スタック

- **フレームワーク**: Next.js 14 (App Router)
- **言語**: TypeScript (strict mode)
- **UI ライブラリ**: MUI (Material UI) v5 + Emotion
- **スタイリング**: SCSS Modules + Tailwind CSS
- **状態管理**: Jotai (atom ベース)
- **データ取得**: SWR + Firestore リアルタイムリスナー
- **フォーム**: React Hook Form + Zod
- **バックエンド**: Firebase / Firestore (NoSQL)
- **セキュリティ**: Firebase App Check (reCAPTCHA Enterprise)
- **テスト**: Vitest + @testing-library/react
- **コンポーネント開発**: Storybook
- **Lint / Format**: ESLint 8 + Prettier + Stylelint

## ディレクトリ構成

```
src/
├── app/                        # Next.js App Router のルートファイル
│   ├── layout.tsx              # ルートレイアウト
│   ├── page.tsx                # ホーム (学習記録フォーム)
│   ├── posts/page.tsx          # 学習記録一覧
│   ├── register/page.tsx       # 教材登録
│   └── study-log/page.tsx      # 学習統計
├── components/                 # Atomic Design コンポーネント
│   ├── Atoms/                  # 基本 UI 要素
│   ├── Molecules/              # 複合コンポーネント
│   ├── Organisms/              # 機能単位コンポーネント
│   ├── Pages/                  # ページロジック + カスタムフック
│   └── Templates/              # レイアウトラッパー
├── libs/
│   ├── firebase/               # Firebase 初期化・定数
│   ├── hooks/                  # 共通カスタムフック
│   ├── types/                  # TypeScript 型定義
│   ├── utils/                  # ユーティリティ関数
│   └── constants/              # アプリ定数
└── assets/
    ├── styles/                 # グローバルスタイル・CSS 変数
    └── themes/                 # MUI テーマ設定
```

パスエイリアス: `@/*` → `src/*`

## Firestore データモデル

- **posts** コレクション: 学習記録 (textbook, time, content, createdAt)
- **textbooks** コレクション: 登録教材 (name, createdAt)

ローカル開発時は Firestore エミュレーター (port 8080) を使用する。

## 利用可能なスクリプト

```bash
npm run dev             # 開発サーバー起動 (localhost:3000)
npm run build           # プロダクションビルド
npm run start           # プロダクションサーバー起動
npm run lint            # ESLint 実行
npm run type-check      # 型チェック (tsc --noEmit)
npm test                # Vitest (単発実行)
npm run test:watch      # Vitest (watch モード)
npm run mock            # Firebase エミュレーター起動
npm run storybook       # Storybook 起動 (localhost:6006)
npm run build-storybook # Storybook ビルド
```

## コーディング規約

- **import の順序**: ESLint `import/order` ルールに従う (builtin → external → internal → parent → sibling)
- **型安全**: `any` を使わない。不明な場合は `unknown` を使い narrowing する
- **コンポーネント**: Atomic Design に従い適切な階層に配置する
- **スタイル**: SCSS Modules を基本とし、グローバルなリセット・変数は `src/assets/styles/` に置く
- **フォーム**: React Hook Form + Zod スキーマで型安全なバリデーションを行う
- **コミット**: Conventional Commits 形式 (`feat:`, `fix:`, `refactor:`, `test:`, `chore:`, `docs:`)

## チェック実行の役割分担

lint・build の二重実行を防ぐため、チェックの実行主体を明確に分けている。

| チェック | Claude Code | CI (GitHub Actions) |
|---|---|---|
| ESLint | **禁止** (deny) | ✅ `npm run lint` |
| ビルド | **禁止** (deny) | ✅ `npm run build` |
| 型チェック (tsc) | ✅ コミット前に実行 | ✅ `npm run type-check` |
| テスト (vitest) | ✅ ロジック修正時に実行 | ✅ `npm test` |
| Stylelint | ✅ スタイル修正時に手動可 | — |

**Claude Code はコミット前に `npm run type-check` のみ実行する。lint と build は実行しない。**

## Git ワークフロー

- `main`: プロダクションブランチ（PR のベースブランチ）
- 作業ブランチ: `feature/<name>`, `fix/<name>`, `chore/<name>`, `refactor/<name>`, `docs/<name>` 形式
- **`main` への直接コミット・push は禁止。** 作業は必ず Issue 起点でブランチを切ってから開始すること

### Issue 起点の開発ワークフロー

```bash
./scripts/issue-start.sh <issue番号>  # ブランチ作成 + コンテキスト生成
# → /plan   : タスク分解 → Issue にコメント投稿
# → /implement : タスクを実装 → 各タスク完了後にコミット
# → /test   : テストコード作成
# → /pr     : PR 作成
```

### ブランチ命名規則

| ラベル | プレフィックス |
|---|---|
| bug / fix | `fix/` |
| chore / setup / ci | `chore/` |
| docs | `docs/` |
| refactor | `refactor/` |
| その他 | `feature/` |

形式: `{prefix}/issue-{番号}-{タイトルのslug}`

## カスタムスキル

`.claude/skills/` に定義されたカスタムスキル。

| コマンド | 役割 |
|---|---|
| `/plan` | Issue を解析してタスクをチェックリスト化し、Issue にコメント投稿する |
| `/implement` | タスクリストをもとに実装を進め、各タスク完了後にコミットする |
| `/test` | テスト観点を列挙してテストコード (Vitest) を作成する |
| `/pr` | 型チェック確認後、`main` への PR をテンプレートに従って作成する |

## サブエージェント戦略

| タスク種別 | モデル | 具体例 |
|---|---|---|
| ファイル探索・コード調査 | `haiku` | Explore agent、glob、grep |
| 通常の実装・テスト・PR 作成 | `sonnet` | 機能実装、テストコード生成 |
| 複雑な設計・アーキテクチャ判断 | `opus` | 設計方針の検討、大規模リファクタ |

## トークン節約ルール

| 操作 | ガイドライン |
|---|---|
| `Read`（大きなファイル） | `offset` と `limit` で必要な行範囲に絞る |
| コードベース全体の探索 | `Grep`・`Glob` で絞り込んでから `Read` する |
| 広範な調査タスク | `Explore` サブエージェントに委任する |
| 長い会話の継続 | `/compact` でコンテキストを圧縮する |

## ローカル開発環境

Firebase エミュレーターを使った開発:
```bash
npm run mock  # Firestore エミュレーター起動 (port 8080) + データ永続化
```

`NODE_ENV === "development"` 時はエミュレーターに自動接続される。
環境変数は `.env.local` に設定する（Firebase 設定 + App Check デバッグトークン）。
