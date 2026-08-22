import { useState } from "react";
import { Plus, Minus, RotateCcw } from "lucide-react";

export default function TallyCounter() {
  const [count, setCount] = useState(0);
  const [flash, setFlash] = useState(null); // 'up' | 'down' | null

  const bump = (delta) => {
    setCount((c) => c + delta);
    setFlash(delta > 0 ? "up" : "down");
    window.clearTimeout(bump._t);
    bump._t = window.setTimeout(() => setFlash(null), 150);
  };

  const reset = () => setCount(0);

  // Render count as a fixed-width digit strip, like a mechanical tally counter
  const digits = Math.abs(count).toString().padStart(4, "0").split("");
  const isNegative = count < 0;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "radial-gradient(circle at 50% 20%, #2b2f36 0%, #15171b 70%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Courier New', ui-monospace, monospace",
        padding: "24px",
      }}
    >
      <div
        style={{
          width: 320,
          borderRadius: 20,
          background: "linear-gradient(160deg, #4b4f57 0%, #2a2d33 55%, #1c1e22 100%)",
          boxShadow:
            "0 30px 60px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.15), inset 0 -6px 12px rgba(0,0,0,0.4)",
          padding: "28px 24px 24px",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {/* Brand plate */}
        <div
          style={{
            textAlign: "center",
            color: "#9aa0a8",
            fontSize: 11,
            letterSpacing: "0.35em",
            marginBottom: 18,
            textTransform: "uppercase",
          }}
        >
          Tally · No.01
        </div>

        {/* Digit window */}
        <div
          style={{
            background: "#0c0d0f",
            borderRadius: 8,
            padding: "18px 10px",
            boxShadow: "inset 0 4px 10px rgba(0,0,0,0.7), inset 0 0 0 1px rgba(255,255,255,0.06)",
            display: "flex",
            justifyContent: "center",
            gap: 4,
            marginBottom: 22,
          }}
        >
          <span
            style={{
              width: 14,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 34,
              color: isNegative ? "#ff6b5e" : "transparent",
              fontVariantNumeric: "tabular-nums",
              transition: "color 120ms ease",
            }}
          >
            −
          </span>
          {digits.map((d, i) => (
            <div
              key={i}
              style={{
                width: 34,
                height: 52,
                background: "linear-gradient(180deg, #1a1c1f 0%, #0e0f11 100%)",
                borderRadius: 4,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 34,
                fontWeight: 700,
                color: flash ? "#ffb37a" : "#f4a261",
                textShadow: flash
                  ? "0 0 14px rgba(255,179,122,0.9)"
                  : "0 0 6px rgba(244,162,97,0.5)",
                boxShadow: "0 1px 0 rgba(255,255,255,0.05)",
                transition: "color 120ms ease, text-shadow 120ms ease",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {d}
            </div>
          ))}
        </div>

        {/* Controls */}
        <div style={{ display: "flex", gap: 12 }}>
          <PhysicalButton onClick={() => bump(-1)} label="Decrement" tone="down">
            <Minus size={22} strokeWidth={3} />
          </PhysicalButton>
          <PhysicalButton onClick={() => bump(1)} label="Increment" tone="up">
            <Plus size={22} strokeWidth={3} />
          </PhysicalButton>
        </div>

        {/* Reset */}
        <button
          onClick={reset}
          aria-label="Reset counter to zero"
          style={{
            width: "100%",
            marginTop: 14,
            background: "transparent",
            border: "none",
            color: "#7b8088",
            fontSize: 12,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            padding: "8px 0",
            cursor: "pointer",
            transition: "color 120ms ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#d7dadd")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#7b8088")}
        >
          <RotateCcw size={13} />
          Reset
        </button>
      </div>
    </div>
  );
}

function PhysicalButton({ onClick, children, label, tone }) {
  const [pressed, setPressed] = useState(false);
  const accent = tone === "up" ? "#e07a3f" : "#565b62";

  return (
    <button
      aria-label={label}
      onClick={onClick}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      style={{
        flex: 1,
        height: 56,
        borderRadius: 12,
        border: "none",
        cursor: "pointer",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: `linear-gradient(180deg, ${accent} 0%, ${shade(accent, -18)} 100%)`,
        boxShadow: pressed
          ? `inset 0 3px 6px rgba(0,0,0,0.5)`
          : `0 4px 0 ${shade(accent, -32)}, 0 6px 10px rgba(0,0,0,0.35)`,
        transform: pressed ? "translateY(3px)" : "translateY(0)",
        transition: "transform 80ms ease, box-shadow 80ms ease",
      }}
    >
      {children}
    </button>
  );
}

// tiny helper to darken/lighten a hex color for gradient + shadow shading
function shade(hex, percent) {
  const num = parseInt(hex.slice(1), 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.min(255, Math.max(0, (num >> 16) + amt));
  const G = Math.min(255, Math.max(0, ((num >> 8) & 0x00ff) + amt));
  const B = Math.min(255, Math.max(0, (num & 0x0000ff) + amt));
  return `#${((1 << 24) + (R << 16) + (G << 8) + B).toString(16).slice(1)}`;
}