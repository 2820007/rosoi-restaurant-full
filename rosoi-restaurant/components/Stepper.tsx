"use client";

export default function Stepper({
  qty,
  onInc,
  onDec,
  label,
}: {
  qty: number;
  onInc: () => void;
  onDec: () => void;
  label: string;
}) {
  return (
    <div
      className="inline-flex items-center rounded-lg border border-line bg-surface-2"
      role="group"
      aria-label={`Quantity for ${label}`}
    >
      <button onClick={onDec} className="h-9 w-9 text-lg hover:text-brand" aria-label={`Decrease ${label}`}>
        −
      </button>
      <span className="min-w-8 text-center text-sm font-semibold" aria-live="polite">
        {qty}
      </span>
      <button onClick={onInc} className="h-9 w-9 text-lg hover:text-brand" aria-label={`Increase ${label}`}>
        +
      </button>
    </div>
  );
}
