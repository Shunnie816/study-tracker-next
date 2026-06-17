---
description: タスクリストをもとに実装を進め、各タスク完了後にコミットする。実装フェーズに入るとき、またはサブスコープ（component, hook, style, config）を指定して実装するときに使う。
---

# /implement — 実装担当

## 手順

1. `.claude/issue-context.md` から Issue 番号・ブランチ名を読み取る。
2. `gh issue view <番号>` でタスクチェックリストを確認する。
3. 未完了タスクを上から順に実装する。
4. 各タスク完了後に型チェックを実行してからコミットする:
   ```bash
   npm run type-check  # 型エラーがないことを確認
   git add <対象ファイル>
   git commit -m "feat: ..."
   ```
5. 全タスク完了後にユーザーへ報告する。

## コミット規約

- 1コミット = 1責務
- 無関係な変更を混ぜない
- コミット前に `npm run type-check` を実行する
- **lint と build は実行しない**（CI に委ねる）

## Conventional Commits

- `feat:` 新機能
- `fix:` バグ修正
- `refactor:` リファクタリング
- `chore:` ツール・設定変更
- `test:` テスト追加・修正
- `docs:` ドキュメント

## サブエージェント戦略

- 実装前のコードベース調査 → `Explore` サブエージェント (`haiku`) に委任する
- 通常の実装タスク → メインモデルで実行する
- 複雑なアーキテクチャ判断が必要な場合 → ユーザーに確認する

## サブスキル

`$ARGUMENTS` にサブスキル名を指定すると、そのスコープに絞って実装する:

- `component` — UI コンポーネントの実装
- `hook` — カスタム React フックの実装
- `style` — スタイル定義の実装
- `config` — 設定ファイルの変更

## 注意

- Atomic Design の階層 (Atoms → Molecules → Organisms → Pages) を守ること
- Firebase 操作は `src/libs/hooks/` のカスタムフックに集約する
- Firestore のコレクション名は `src/libs/firebase/constants.ts` を参照する
