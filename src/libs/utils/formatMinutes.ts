export function formatMinutes(totalMinutes: number): string {
  const hour = Math.floor(totalMinutes / 60);
  const minute = totalMinutes % 60;
  if (hour > 0) {
    return minute > 0 ? `${hour}時間${minute}分` : `${hour}時間`;
  }
  return `${minute}分`;
}
