export function runInlineHandler(event: React.SyntheticEvent, code: string): void {
  const target = event.currentTarget as HTMLElement;
  const handler = new Function("event", code);
  handler.call(target, event.nativeEvent);
}
