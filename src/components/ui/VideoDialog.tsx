"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";

/**
 * La vidéo de présentation, dans une fenêtre par-dessus la page. C'est un
 * <dialog> natif : Échap le ferme, le focus y reste, et la page derrière ne
 * défile plus. La vidéo n'est chargée qu'à l'ouverture, et s'arrête à la
 * fermeture.
 */
export function VideoDialog({
  open,
  onClose,
  src,
  title,
  closeLabel,
}: {
  open: boolean;
  onClose: () => void;
  src: string;
  title: string;
  closeLabel: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open && !el.open) el.showModal();
    if (!open && el.open) el.close();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const previous = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = previous;
    };
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-label={title}
      onClose={onClose}
      // Un clic sur le fond (le <dialog> lui-même, hors du cadre) ferme.
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="m-auto w-[min(92vw,1120px)] max-w-none overflow-visible bg-transparent p-0 backdrop:bg-black/80 backdrop:backdrop-blur-sm"
    >
      {open && (
        <div className="relative">
          <button
            type="button"
            onClick={onClose}
            aria-label={closeLabel}
            className="absolute -top-12 right-0 grid h-10 w-10 place-items-center rounded-full border border-[var(--color-line-strong)] bg-[var(--color-surface-2)] text-[var(--color-fg)] transition-colors hover:bg-[var(--color-surface)]"
          >
            <X size={18} aria-hidden />
          </button>
          <div className="shadow-card overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-line-strong)] bg-black">
            <video
              src={src}
              controls
              autoPlay
              playsInline
              preload="metadata"
              className="block max-h-[80vh] w-full"
            />
          </div>
        </div>
      )}
    </dialog>
  );
}
