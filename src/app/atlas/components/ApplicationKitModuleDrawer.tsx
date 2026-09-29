import { getAtlasEntry } from "../../content/registry";
import type { AtlasApplicationModule, AtlasModuleFamily } from "../../content/types";

export const APPLICATION_KIT_DRAWER_WIDTH = 470;

interface ApplicationKitModuleDrawerProps {
  open: boolean;
  module: AtlasApplicationModule | null;
  family: AtlasModuleFamily | null;
  color: string;
  onClose: () => void;
  onSelectModule: (moduleId: string) => void;
}

function frameworkLabel(id: string): string {
  return getAtlasEntry(id)?.title ?? id.replace(/-/g, " ").toUpperCase();
}

export default function ApplicationKitModuleDrawer({
  open,
  module,
  family,
  color,
  onClose,
  onSelectModule,
}: ApplicationKitModuleDrawerProps) {
  return (
    <aside
      role="dialog"
      aria-modal="false"
      aria-label={module ? `${module.title} module details` : "Application Kit module details"}
      aria-hidden={!open}
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        zIndex: 32,
        width: `min(${APPLICATION_KIT_DRAWER_WIDTH}px, 92vw)`,
        display: "flex",
        flexDirection: "column",
        background:
          "linear-gradient(180deg, rgba(4,6,10,0.985) 0%, rgba(5,8,12,0.975) 100%)",
        borderLeft: `1px solid ${color}2b`,
        boxShadow: "-28px 0 90px rgba(0,0,0,0.46)",
        backdropFilter: "blur(34px)",
        color: "#F4EBD0",
        transform: open ? "translateX(0)" : "translateX(100%)",
        opacity: open ? 1 : 0,
        pointerEvents: open ? "auto" : "none",
        transition:
          "transform 0.58s cubic-bezier(0.16,1,0.3,1), opacity 0.34s ease-out",
      }}
      onClick={(event) => event.stopPropagation()}
    >
      <div
        style={{
          minHeight: 58,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 20,
          padding: "0 24px",
          borderBottom: "1px solid rgba(106,184,138,0.10)",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            minWidth: 0,
            fontFamily: "'DM Mono',monospace",
            fontSize: 8,
            letterSpacing: "0.22em",
            color,
            opacity: 0.78,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          APPLICATION KIT · {family?.title ?? "MODULE"}
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close module details"
          title="Close module details"
          style={{
            width: 44,
            height: 44,
            display: "grid",
            placeItems: "center",
            flexShrink: 0,
            border: "none",
            background: "transparent",
            color: "rgba(244,235,208,0.68)",
            fontFamily: "'DM Mono',monospace",
            fontSize: 18,
            cursor: "pointer",
          }}
        >
          ×
        </button>
      </div>

      <div
        style={{
          flex: 1,
          minHeight: 0,
          overflowY: "auto",
          padding: "34px 32px 44px",
          scrollbarWidth: "thin",
          scrollbarColor: `${color}42 transparent`,
        }}
      >
        {module && family && (
          <>
            <div style={eyebrowStyle(color)}>OPTIONAL MODULE</div>
            <h1
              style={{
                margin: "0 0 18px",
                maxWidth: 390,
                fontFamily: "'EB Garamond',serif",
                fontSize: 34,
                lineHeight: 1.02,
                fontWeight: 500,
                color: "rgba(255,252,245,0.96)",
              }}
            >
              {module.title}
            </h1>
            <p
              style={{
                margin: 0,
                fontFamily: "'EB Garamond',serif",
                fontSize: 17,
                lineHeight: 1.62,
                color: "rgba(214,232,220,0.86)",
              }}
            >
              {module.purpose}
            </p>

            <div style={dividerStyle(color)} />

            <section style={sectionStyle}>
              <div style={eyebrowStyle(color)}>INCLUDES</div>
              <ul
                style={{
                  margin: 0,
                  padding: 0,
                  listStyle: "none",
                  display: "grid",
                  gap: 12,
                }}
              >
                {module.includes.map((item) => (
                  <li
                    key={item}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "12px 1fr",
                      gap: 10,
                      fontFamily: "'EB Garamond',serif",
                      fontSize: 15.5,
                      lineHeight: 1.55,
                      color: "rgba(244,235,208,0.82)",
                    }}
                  >
                    <span aria-hidden="true" style={{ color, opacity: 0.72 }}>◇</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section style={sectionStyle}>
              <div style={eyebrowStyle(color)}>USE WHEN</div>
              <div style={bodyStyle}>{module.useWhen}</div>
            </section>

            {module.watchFor && (
              <section
                style={{
                  ...sectionStyle,
                  padding: "18px 20px 20px",
                  borderLeft: `2px solid ${color}`,
                  borderTop: "1px solid rgba(106,184,138,0.08)",
                  borderBottom: "1px solid rgba(106,184,138,0.06)",
                  background:
                    "linear-gradient(90deg, rgba(106,184,138,0.07), rgba(106,184,138,0.018))",
                }}
              >
                <div style={eyebrowStyle(color)}>WATCH FOR</div>
                <div style={bodyStyle}>{module.watchFor}</div>
              </section>
            )}

            {!!module.relatedFrameworks?.length && (
              <section style={sectionStyle}>
                <div style={eyebrowStyle(color)}>RELATED FRAMEWORKS</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {module.relatedFrameworks.map((frameworkId) => (
                    <span
                      key={frameworkId}
                      style={{
                        padding: "8px 10px",
                        border: `1px solid ${color}30`,
                        background: `${color}0d`,
                        fontFamily: "'DM Mono',monospace",
                        fontSize: 8,
                        letterSpacing: "0.16em",
                        color,
                      }}
                    >
                      {frameworkLabel(frameworkId)}
                    </span>
                  ))}
                </div>
              </section>
            )}

            <section style={{ ...sectionStyle, marginBottom: 0 }}>
              <div style={eyebrowStyle(color)}>OTHER MODULES IN THIS FAMILY</div>
              <div style={{ display: "grid", gap: 7 }}>
                {family.modules.map((sibling) => {
                  const selected = sibling.id === module.id;
                  return (
                    <button
                      key={sibling.id}
                      type="button"
                      onClick={() => onSelectModule(sibling.id)}
                      aria-current={selected ? "true" : undefined}
                      style={{
                        width: "100%",
                        minHeight: 44,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 14,
                        padding: "10px 12px",
                        border: selected
                          ? `1px solid ${color}52`
                          : "1px solid rgba(244,235,208,0.08)",
                        background: selected ? `${color}12` : "rgba(255,255,255,0.018)",
                        color: selected ? color : "rgba(244,235,208,0.62)",
                        fontFamily: "'DM Mono',monospace",
                        fontSize: 8,
                        letterSpacing: "0.14em",
                        textAlign: "left",
                        cursor: selected ? "default" : "pointer",
                      }}
                    >
                      <span>{sibling.title}</span>
                      <span aria-hidden="true" style={{ opacity: selected ? 0.9 : 0.38 }}>
                        {selected ? "●" : "→"}
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>
          </>
        )}
      </div>
    </aside>
  );
}

const sectionStyle = {
  marginTop: 30,
};

const bodyStyle = {
  fontFamily: "'EB Garamond',serif",
  fontSize: 15.5,
  lineHeight: 1.65,
  color: "rgba(244,235,208,0.82)",
};

const eyebrowStyle = (color: string) => ({
  marginBottom: 10,
  fontFamily: "'DM Mono',monospace",
  fontSize: 8,
  letterSpacing: "0.28em",
  color,
  opacity: 0.78,
});

const dividerStyle = (color: string) => ({
  width: 62,
  height: 1,
  marginTop: 27,
  background: `linear-gradient(90deg, ${color}, transparent)`,
  opacity: 0.58,
});
