"use client";

export default function Modal({ isOpen, onClose, children, hideCloseButton = false }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="relative max-h-[90vh] w-full max-w-sm overflow-y-auto rounded-2xl bg-white p-5 shadow-lg sm:p-6">
        {!hideCloseButton && (
          <button
            onClick={onClose}
            className="absolute left-4 top-4 text-zinc-400 hover:text-zinc-600"
          >
            ✕
          </button>
        )}
        {children}
      </div>
    </div>
  );
}