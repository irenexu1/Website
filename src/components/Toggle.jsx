import React from "react";

const Toggle = ({ options = [], value, onChange }) => {
  return (
    <div className="w-full flex justify-center">
      <div className="w-[520px] max-w-[92vw] p-[0px] rounded-full border border-white bg-pink-200/5 backdrop-blur">
        <div
          className="rounded-full overflow-hidden"
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))`,
          }}
        >
          {options.map((opt, idx) => {
            const selected = value === opt.key;

            return (
              <button
                key={opt.key}
                type="button"
                onClick={() => onChange?.(opt.key)}
                className={[
                  "relative py-3 text-lg font-semibold tracking-wide",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40",
                  selected
                    ? "text-white"
                    : "bg-transparent text-white/90 hover:text-white hover:bg-white/5",
                ].join(" ")}
              >
                {/* Animated fill overlay (fills the entire button, animates from left) */}
                {selected && (
                  <span
                    // key forces re-mount so the animation plays every time you select a new option
                    key={value}
                    className="absolute inset-0"
                    style={{
                      transformOrigin: "left",
                      backgroundImage:
                        "linear-gradient(to right, rgba(255,169,215,0.80), rgba(234,185,255,0.80))", // pink-300/80 -> purple-300/80
                      animation: "fillFromLeft 220ms ease-out forwards",
                    }}
                  />
                )}

                {/* Divider (your white/50) */}
                {!selected && idx !== 0 && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 h-7 w-px bg-white/50" />
                )}

                {/* Text above overlay */}
                <span className="relative z-10">{opt.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes fillFromLeft {
          from { transform: scaleX(0); opacity: 0.6; }
          to   { transform: scaleX(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default Toggle;
