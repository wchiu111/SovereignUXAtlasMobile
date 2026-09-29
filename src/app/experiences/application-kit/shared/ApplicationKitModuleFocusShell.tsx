import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

interface Props {
  eyebrow: string;
  title: string;
  summary: string;
  question: string;
  color: string;
  onExit: () => void;
  children: ReactNode;
  inspector?: ReactNode;
}

export default function ApplicationKitModuleFocusShell({
  eyebrow, title, summary, question, color, onExit, children, inspector,
}: Props) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.section
      role="dialog"
      aria-modal="true"
      aria-label={title}
      initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.994 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.997 }}
      transition={{ duration: reducedMotion ? 0.18 : 0.52, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: "absolute", inset: 0, zIndex: 64,
        display: "grid", gridTemplateColumns: "286px minmax(0,1fr) 310px",
        overflow: "hidden", color: "#F4EBD0",
        background:
          "radial-gradient(circle at 51% 42%, rgba(138,174,200,.045), transparent 28%), linear-gradient(180deg, rgba(4,5,11,.997), rgba(3,4,9,.997))",
      }}
    >
      <aside style={{
        minWidth: 0, display: "flex", flexDirection: "column",
        borderRight: "1px solid rgba(200,180,130,.09)",
        background: "rgba(4,5,11,.78)",
      }}>
        <button type="button" onClick={onExit} style={{
          minHeight: 62, padding: "0 22px", border: 0,
          borderBottom: "1px solid rgba(200,180,130,.09)",
          background: "transparent", color: "rgba(200,180,130,.68)",
          textAlign: "left", fontFamily: "'DM Mono',monospace",
          fontSize: 8.5, letterSpacing: ".17em", textTransform: "uppercase",
          cursor: "pointer",
        }}>
          <span style={{ color, marginRight: 10 }}>←</span>
          Behavior &amp; Authority
        </button>

        <div style={{ padding: "26px 24px 22px" }}>
          <div style={{
            marginBottom: 12, fontFamily: "'DM Mono',monospace",
            fontSize: 8, letterSpacing: ".22em", textTransform: "uppercase", color,
          }}>{eyebrow}</div>
          <h1 style={{
            margin: 0, fontFamily: "'EB Garamond',serif",
            fontSize: 27, lineHeight: 1.04, fontWeight: 500,
            color: "rgba(255,248,230,.97)",
          }}>{title}</h1>
          <p style={{
            margin: "17px 0 0", fontFamily: "'EB Garamond',serif",
            fontSize: 14.5, lineHeight: 1.58, color: "rgba(240,232,215,.64)",
          }}>{summary}</p>
        </div>

        <div style={{ height: 1, margin: "0 24px", background: "rgba(245,235,210,.08)" }} />

        <div style={{ padding: "22px 24px" }}>
          <div style={{
            marginBottom: 10, fontFamily: "'DM Mono',monospace",
            fontSize: 8, letterSpacing: ".22em", textTransform: "uppercase",
            color: "rgba(101,214,154,.72)",
          }}>Question it answers</div>
          <p style={{
            margin: 0, fontFamily: "'EB Garamond',serif",
            fontSize: 13.5, lineHeight: 1.55, color: "rgba(245,235,210,.72)",
          }}>{question}</p>
        </div>

        <div style={{
          marginTop: "auto", padding: "18px 24px",
          borderTop: "1px solid rgba(245,235,210,.07)",
          fontFamily: "'DM Mono',monospace", fontSize: 7.5,
          lineHeight: 1.8, letterSpacing: ".16em",
          color: "rgba(245,235,210,.34)", textTransform: "uppercase",
        }}>
          Esc · Return to family<br />
          Hover · Reveal possibility<br />
          Click · Commit
        </div>
      </aside>

      <main style={{ minWidth: 0, overflowY: "auto", scrollbarWidth: "none", padding: "30px 34px 60px" }}>
        {children}
      </main>

      <aside style={{
        minWidth: 0, overflowY: "auto",
        borderLeft: "1px solid rgba(200,180,130,.09)",
        background: "rgba(4,5,11,.70)", padding: "26px 22px 50px",
      }}>
        {inspector ?? (
          <>
            <div style={{
              marginBottom: 18, fontFamily: "'DM Mono',monospace",
              fontSize: 8, letterSpacing: ".22em",
              textTransform: "uppercase", color: "rgba(101,214,154,.70)",
            }}>Inspector</div>
            <div style={{
              padding: "14px 15px", border: `1px solid ${color}2B`,
              background: `${color}0A`,
            }}>
              <div style={{
                marginBottom: 8, fontFamily: "'DM Mono',monospace",
                fontSize: 8, letterSpacing: ".17em", color, textTransform: "uppercase",
              }}>Focus mode</div>
              <div style={{
                fontFamily: "'EB Garamond',serif", fontSize: 13.5,
                lineHeight: 1.55, color: "rgba(245,235,210,.62)",
              }}>
                Pass 6 establishes a committed focus destination for this module.
                Its deeper interactive canvas can evolve independently without changing
                the shared Behavior &amp; Authority constellation.
              </div>
            </div>
          </>
        )}
      </aside>
    </motion.section>
  );
}
