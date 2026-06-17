---
description: テスト観点を列挙してテストコードを作成する。ビジネスロジックやカスタムフックのテストが必要なとき、実装後の品質確認をするときに使う。
---

# /test — テスト担当

## 手順

1. `$ARGUMENTS` に対象ファイル・関数名が渡された場合はそれを対象にする。なければ直近の実装変更 (`git diff main`) から対象を特定する。
2. テスト観点を列挙してユーザーに提示する（実装前に合意を取る）。
3. テストコードを作成する。
4. `npm test` を実行してテストが通ることを確認する。

## テスト観点の列挙フォーマット

```
対象: <ファイルパス or 関数名>

テスト観点:
- 正常系: 〜のとき、〜を返すべき
- 異常系: 〜のとき、〜をすべき
- 境界値: 〜のとき、〜になるべき
```

## テスト設計原則

- 振る舞い（Behavior）を検証し、実装詳細には依存しない
- 1テスト = 1振る舞い
- テストは独立して実行可能にする
- `it("〜すべき")` の形式でテスト名を書く
- Magic Number を使わない
- モックは最小限にする

## テスト環境

- **テストランナー**: Vitest 3.x（Jest ではない）
- **ライブラリ**: @testing-library/react 15.x
- **環境**: jsdom
- **設定ファイル**: `vitest.config.ts`、`src/vitest.setup.ts`
- **テストファイル**: コンポーネントと同階層に配置 (`*.test.tsx` / `*.test.ts`)

## renderHook の注意点

- `renderHook` のコールバック内でオブジェクトを生成しない（毎 render で新しい参照が生まれ useEffect が過剰起動する）
- モックオブジェクトはコールバックの外で生成してから渡す

```ts
// NG
const { result } = renderHook(() => useMyHook(createMockStorage()));

// OK
const mockStorage = createMockStorage();
const { result } = renderHook(() => useMyHook(mockStorage));
```

## サブエージェント戦略

- 既存テストパターンの調査 → `Explore` サブエージェント (`haiku`) に委任する
- テストコード生成はメインモデルで実行する

## 優先順位

1. ビジネスロジック（フォームスキーマ、ユーティリティ関数）
2. カスタムフック (`src/libs/hooks/`, `src/components/Pages/*/use*.ts`)
3. UI コンポーネント（ユーザー操作ベースのテスト）
4. UI の見た目はテストしない
