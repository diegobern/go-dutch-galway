export const euro = (n: number) => '€' + (Math.round(n * 100) / 100).toFixed(2);
export const STATUS_LABELS: Record<string, { label: string; cls: string }> = {
  new: { label: 'New', cls: 'st-new' },
  prep: { label: 'Preparing', cls: 'st-prep' },
  ready: { label: 'Ready', cls: 'st-ready' },
  out: { label: 'Out for delivery', cls: 'st-out' },
  done: { label: 'Delivered', cls: 'st-done' },
  cancel: { label: 'Cancelled', cls: 'st-cancel' },
};
