/**
 * AtlasSearchPlaceholder — Phase 3 search handoff.
 *
 * This is intentionally not the final Atlas Search experience.
 * It validates Utility Layer → Search → return without inventing
 * desktop behavior inside the mobile utility menu.
 */

import { useEffect, useRef, useState } from "react";
import { T } from "./mobileShared";

interface AtlasSearchPlaceholderProps {
  onBack: () => void;
  onClose: () => void;
}

export default function AtlasSearchPlaceholder({
  onBack,
  onClose,
}: AtlasSearchPlaceholderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState("");

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;

      if (document.activeElement === inputRef.current) {
        inputRef.current?.blur();
        return;
      }

      onBack();
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onBack]);

  return (
    <div
      role="dialog"
      aria-label="Search Atlas"
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        boxSizing: "border-box",
        padding: "18px 24px 28px",
      }}
    >
      <div
        style={{
          minHeight: 44,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 14,
        }}
      >
        <button
          type="button"
          onClick={onBack}
          style={{
            minHeight: 44,
            minWidth: 44,
            border: "none",
            background: "transparent",
            color: T.body,
            padding: 0,
            fontFamily: T.mono,
            fontSize: 8.5,
            letterSpacing: "0.18em",
            opacity: 0.78,
            textAlign: "left",
            cursor: "pointer",
          }}
        >
          ‹ UTILITY LAYER
        </button>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close Search and return to Atlas"
          style={{
            minHeight: 44,
            minWidth: 44,
            border: "none",
            background: "transparent",
            color: T.gold,
            padding: 0,
            fontFamily: T.mono,
            fontSize: 18,
            opacity: 0.68,
            cursor: "pointer",
          }}
        >
          ×
        </button>
      </div>

      <div
        style={{
          fontFamily: T.mono,
          fontSize: 10,
          letterSpacing: "0.24em",
          color: T.accentGold,
          opacity: 1,
          marginBottom: 8,
        }}
      >
        SEARCH
      </div>

      <div
        style={{
          fontFamily: T.serif,
          fontSize: 13,
          lineHeight: 1.5,
          color: T.body,
          opacity: 0.84,
          marginBottom: 18,
        }}
      >
        Navigate thought across the Atlas.
      </div>

      <label
        style={{
          display: "block",
          fontFamily: T.mono,
          fontSize: 7,
          letterSpacing: "0.16em",
          color: T.body,
          opacity: 0.72,
          marginBottom: 8,
        }}
      >
        SEARCH ATLAS
      </label>

      <div
        style={{
          minHeight: 52,
          display: "grid",
          gridTemplateColumns: "24px 1fr",
          gap: 10,
          alignItems: "center",
          border: "0.5px solid rgba(232,213,163,0.18)",
          borderRadius: 4,
          padding: "0 14px",
          background: "rgba(5,5,10,0.42)",
        }}
      >
        <span
          aria-hidden="true"
          style={{
            fontFamily: T.serif,
            fontSize: 20,
            color: T.accentGold,
            opacity: 0.82,
          }}
        >
          ⌕
        </span>

        <input
          ref={inputRef}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="Search Atlas..."
          autoComplete="off"
          spellCheck={false}
          style={{
            width: "100%",
            height: 50,
            border: "none",
            outline: "none",
            background: "transparent",
            color: T.gold,
            fontFamily: T.mono,
            fontSize: 10,
            letterSpacing: "0.08em",
          }}
        />
      </div>

      <div
        style={{
          marginTop: 22,
          paddingTop: 16,
          borderTop: "0.5px solid rgba(232,213,163,0.07)",
          fontFamily: T.serif,
          fontSize: 12.5,
          lineHeight: 1.6,
          color: T.body,
          opacity: 0.76,
        }}
      >
        Mobile Search architecture will be adapted in the next pass.
      </div>

      {value.trim() && (
        <div
          style={{
            marginTop: 16,
            fontFamily: T.mono,
            fontSize: 7.5,
            letterSpacing: "0.14em",
            color: T.body,
            opacity: 0.66,
          }}
        >
          SEARCH IS NOT EXECUTED IN THIS PROTOTYPE
        </div>
      )}
    </div>
  );
}
