#!/usr/bin/env bash
# Usage: ./scripts/issue-start.sh <issue-number>
# GitHub Issue を取得し、ブランチを切って Claude Code のコンテキストを準備する

set -euo pipefail

ISSUE_NUMBER="${1:?Usage: $0 <issue-number>}"

# --- Issue 取得 ---
echo "=== Issue #${ISSUE_NUMBER} を取得中... ==="

TITLE=$(gh issue view "$ISSUE_NUMBER" --json title  --template '{{.title}}')
BODY=$(gh issue view  "$ISSUE_NUMBER" --json body   --template '{{.body}}')
STATE=$(gh issue view "$ISSUE_NUMBER" --json state  --template '{{.state}}')
LABELS=$(gh issue view "$ISSUE_NUMBER" --json labels --template '{{range .labels}}{{.name}} {{end}}')

BODY="${BODY:-"(本文なし)"}"
LABELS="${LABELS:-"(なし)"}"

if [ "$STATE" = "CLOSED" ]; then
  echo "警告: Issue #${ISSUE_NUMBER} はすでにクローズされています。続けますか？ [y/N]"
  read -r CONFIRM
  [[ "$CONFIRM" =~ ^[Yy]$ ]] || exit 0
fi

# --- ブランチ名生成 ---
SLUG=$(echo "$TITLE" \
  | tr '[:upper:]' '[:lower:]' \
  | sed 's/[^a-z0-9[:space:]-]//g' \
  | sed 's/[[:space:]][[:space:]]*/-/g' \
  | sed 's/--*/-/g' \
  | sed 's/^-//;s/-$//' \
  | cut -c1-40)

if [ -z "$SLUG" ]; then
  SLUG="work"
fi

# ラベルに応じてプレフィックスを決定
if echo "$LABELS" | grep -qi "bug\|fix"; then
  PREFIX="fix"
elif echo "$LABELS" | grep -qi "chore\|setup\|ci"; then
  PREFIX="chore"
elif echo "$LABELS" | grep -qi "docs"; then
  PREFIX="docs"
elif echo "$LABELS" | grep -qi "refactor"; then
  PREFIX="refactor"
else
  PREFIX="feature"
fi

BRANCH_NAME="${PREFIX}/issue-${ISSUE_NUMBER}-${SLUG}"

echo ""
echo "=== Issue 情報 ==="
echo "  タイトル : $TITLE"
echo "  ラベル   : $LABELS"
echo "  ブランチ : $BRANCH_NAME"
echo ""

# --- ブランチ作成 ---
if git show-ref --verify --quiet "refs/heads/${BRANCH_NAME}"; then
  echo "ブランチ '${BRANCH_NAME}' はすでに存在します。チェックアウトします。"
  git checkout "$BRANCH_NAME"
else
  BASE_BRANCH="main"
  echo "ベースブランチ '${BASE_BRANCH}' からブランチを作成します。"
  git fetch origin "$BASE_BRANCH" --quiet
  git checkout -b "$BRANCH_NAME" "origin/${BASE_BRANCH}"
fi

# --- Claude Code 向けコンテキストファイルを生成 ---
CONTEXT_FILE=".claude/issue-context.md"
cat > "$CONTEXT_FILE" <<CONTEXT
# Issue #${ISSUE_NUMBER}: ${TITLE}

## 対応ブランチ
\`${BRANCH_NAME}\`

## Issue 本文
${BODY}

## ラベル
${LABELS}

## Claude Code への作業指示

以下のワークフローで作業してください:

1. **タスク分解**: Issue の内容を具体的な実装タスクに分解し、ユーザーと確認する
2. **Issue 更新**: 合意したタスクをチェックリスト形式で Issue #${ISSUE_NUMBER} にコメントする
   \`\`\`bash
   gh issue comment ${ISSUE_NUMBER} --body "## タスク\n- [ ] ..."
   \`\`\`
3. **実装**: タスクをひとつずつ実装し、各タスク完了後にコミットする
4. **PR 作成**: 全タスク完了後、以下の形式で PR を作成する
   - ベースブランチ: \`main\`
   - 本文に \`Closes #${ISSUE_NUMBER}\` を含める
CONTEXT

echo ""
echo "=== 準備完了 ==="
echo "コンテキストファイル: $CONTEXT_FILE"
echo ""
echo "--- Issue 本文 ---"
echo "$BODY"
echo "------------------"
echo ""
echo "次のステップ: /plan ${ISSUE_NUMBER}"
