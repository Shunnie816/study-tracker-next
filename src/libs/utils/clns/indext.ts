/**
 * 可変長引数でクラス名を受け取り、条件付きで有効なクラスのみをスペース区切りで返す
 * 例: classNames("a", isActive && "b", isError && "c")
 */
export function clns(...args: unknown[]): string {
  return args.filter(Boolean).join(" ");
}
