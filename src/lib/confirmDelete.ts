export function confirmDelete(itemLabel: string): boolean {
  return window.confirm(`Delete ${itemLabel}? This cannot be undone.`);
}
