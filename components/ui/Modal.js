import React from "react";
import Button from "./Button";

export default function Modal({ isOpen, onClose, onConfirm, text, btnTask }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-70 flex items-center justify-center px-4 backdrop-blur-sm bg-black/60">
      <div className="bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl p-6 w-full max-w-sm">
        <p className="text-gray-200 text-base mb-6 leading-relaxed">{text}</p>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-gray-600 text-gray-300 text-sm font-semibold hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="flex-1 py-2.5 rounded-xl bg-rose-600 text-white text-sm font-semibold hover:bg-rose-700 transition-colors"
          >
            {btnTask}
          </button>
        </div>
      </div>
    </div>
  );
}
