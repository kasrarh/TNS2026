'use client';
import { useEffect, useRef } from 'react';

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function CallForAbstractModal({ open, onClose }: Props) {
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const prevActive = document.activeElement as HTMLElement | null;
    closeBtnRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      prevActive?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="modal-overlay"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="presentation"
    >
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        ref={dialogRef}
      >
        <header className="modal-header">
          <h2 id="modal-title">Call for Abstracts</h2>
          <button
            ref={closeBtnRef}
            className="btn btn-ghost modal-close"
            aria-label="Close dialog"
            onClick={onClose}
            type="button"
          >
            ✕
          </button>
        </header>

        <div className="modal-body">
          <p>
            Submit your abstract for True North Spatial 2026. Choose one of the options below to view guidelines or submit.
          </p>
        </div>

        <footer className="modal-actions">
          <a
            className="btn btn-primary"
            href="https://example.com/submit-abstract"
            target="_blank"
            rel="noopener noreferrer"
          >
            Submit Abstract
          </a>
          <a
            className="btn btn-secondary"
            href="https://example.com/abstract-guidelines"
            target="_blank"
            rel="noopener noreferrer"
          >
            Guidelines
          </a>
        </footer>
      </div>
    </div>
  );
}