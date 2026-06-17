---
description: 型チェック確認後、main への PR をテンプレートに従って作成する。実装が完了してレビュー依頼を出すときに使う。
---

# /pr — PR 作成担当

## 手順

1. `.claude/issue-context.md` から Issue 番号・ブランチ名を読み取る。
2. `git log main..HEAD --oneline` で変更コミットを確認する。
3. `npm run type-check` を実行して型エラーがないことを確認する。
4. 以下のテンプレートで PR を作成する:
   ```bash
   gh pr create --base main --head <ブランチ名> --title "<タイトル>" --body "..."
   ```

## PR テンプレート

```markdown
## 概要

<!-- 変更内容を簡潔に -->

## 対応 Issue

Closes #<番号>

## 変更内容

-

## 確認事項

- [ ] 型エラーなし (`npm run type-check`)
- [ ] テスト通過 (`npm test`) ※ロジック変更時
- [ ] lint / build は CI で確認
```

## サブエージェント戦略

- このスキルはシンプルな操作が中心のため、サブエージェントは基本不要
- コミット履歴やコードの広範なスキャンが必要な場合のみ `haiku` で委任する

## 注意

- PR のベースブランチは必ず `main`
- タイトルは Conventional Commits に準じる形式 (`feat:`, `fix:`, `chore:` など)
- `Closes #番号` を本文に含めること
- **`git push origin main` と `git push --force` は禁止**
