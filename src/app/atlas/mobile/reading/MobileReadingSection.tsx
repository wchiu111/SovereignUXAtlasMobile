import { Fragment, useEffect, useRef, useState } from "react";
import { T } from "../components/mobileShared";
import MobileEvidenceBlock from "./MobileEvidenceBlock";
import type {
  MobileEvidenceItem,
  MobileReadingSectionData,
} from "./mobileReadingTypes";

export default function MobileReadingSection({
  section,
  totalSections,
  evidence,
  setRef,
  onInspectEvidence,
}: {
  section: MobileReadingSectionData;
  totalSections: number;
  evidence: readonly MobileEvidenceItem[];
  setRef: (node: HTMLElement | null) => void;
  onInspectEvidence: (item: MobileEvidenceItem) => void;
}) {
  const localRef = useRef<HTMLElement | null>(null);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const node = localRef.current;
    if (!node || entered) return;

    if (
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    ) {
      setEntered(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setEntered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [entered]);

  const evidenceAfter = (paragraphIndex: number) =>
    evidence.filter((item) => item.insertAfterParagraph === paragraphIndex);

  const splitListParagraph = (paragraph: string) => {
    const marker = "\n\n• ";
    if (!paragraph.includes(marker)) return null;

    const [intro, listBody] = paragraph.split(marker, 2);
    const items = listBody
      .split("\n• ")
      .map((item) => item.trim())
      .filter(Boolean);

    return { intro: intro.trim(), items };
  };

  return (
    <section
      id={`mobile-reading-${section.id}`}
      ref={(node) => {
        localRef.current = node;
        setRef(node);
      }}
      data-section-id={section.id}
      style={{
        scrollMarginTop: 138,
        padding:
          "clamp(34px, 9vw, 40px) clamp(22px, 6.6vw, 28px) clamp(54px, 14vw, 64px)",
        borderBottom: "0.5px solid rgba(232,213,163,0.08)",
      }}
    >
      <div
        style={{
          marginBottom: 18,
          transform: entered ? "translateY(0)" : "translateY(10px)",
          opacity: entered ? 1 : 0,
          transition:
            "transform 360ms cubic-bezier(0.22,1,0.36,1), opacity 280ms ease",
        }}
      >
        <h2
          style={{
            margin: "0 0 10px",
            maxWidth: 336,
            fontFamily: T.serif,
            fontSize: "clamp(30px, 8vw, 34px)",
            fontWeight: 600,
            lineHeight: 1.08,
            color: "#F0E9D8",
            opacity: 0.98,
          }}
        >
          {section.label
            .toLowerCase()
            .replace(/\b\w/g, (letter) => letter.toUpperCase())}
        </h2>

        <div
          style={{
            maxWidth: 330,
            fontFamily: T.serif,
            fontSize: "clamp(18px, 4.9vw, 20px)",
            fontWeight: 500,
            lineHeight: 1.28,
            color: T.accentGold,
            opacity: 0.88,
          }}
        >
          {section.subtitle}
        </div>
      </div>

      <div
        style={{
          height: 0.5,
          background: "rgba(232,213,163,0.11)",
          marginBottom: 24,
        }}
      />

      {section.paragraphs.map((paragraph, index) => {
        const isShortEmphasis =
          paragraph.length < 58 &&
          !paragraph.endsWith(".") &&
          !paragraph.endsWith("?") &&
          !paragraph.includes("\n");

        const inlineEvidence = evidenceAfter(index);

        return (
          <Fragment key={index}>
            {(() => {
              const listParagraph = splitListParagraph(paragraph);
              const blockMargin =
                inlineEvidence.length > 0
                  ? "0 0 20px"
                  : index === section.paragraphs.length - 1
                    ? 0
                    : isShortEmphasis
                      ? "0 0 18px"
                      : "0 0 21px";

              const baseTextStyle = {
                maxWidth: 340,
                fontFamily: T.serif,
                fontSize: isShortEmphasis
                  ? "clamp(17px, 4.6vw, 18px)"
                  : "clamp(15px, 4.1vw, 16px)",
                fontWeight: isShortEmphasis ? 600 : 400,
                lineHeight: isShortEmphasis ? 1.42 : 1.7,
                color: isShortEmphasis ? T.accentGold : "#F0E9D8",
                opacity: isShortEmphasis ? 0.92 : 0.89,
              } as const;

              if (!listParagraph) {
                return (
                  <p
                    style={{
                      ...baseTextStyle,
                      margin: blockMargin,
                      whiteSpace: "pre-line",
                    }}
                  >
                    {paragraph}
                  </p>
                );
              }

              return (
                <div style={{ margin: blockMargin, maxWidth: 340 }}>
                  {listParagraph.intro && (
                    <p
                      style={{
                        ...baseTextStyle,
                        margin: "0 0 12px",
                      }}
                    >
                      {listParagraph.intro}
                    </p>
                  )}
                  <ul
                    style={{
                      ...baseTextStyle,
                      margin: 0,
                      paddingLeft: 20,
                    }}
                  >
                    {listParagraph.items.map((item) => (
                      <li
                        key={item}
                        style={{
                          marginBottom: 6,
                          paddingLeft: 2,
                        }}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })()}

            {inlineEvidence.map((item) => (
              <MobileEvidenceBlock
                key={item.id}
                evidence={item}
                onInspect={onInspectEvidence}
              />
            ))}
          </Fragment>
        );
      })}

      <aside
        aria-label={`${section.label} section insight`}
        style={{
          marginTop: 36,
          padding: "0 0 2px 16px",
          borderLeft: `1.5px solid ${T.caseStudies}66`,
        }}
      >
        <div
          style={{
            marginBottom: 9,
            fontFamily: T.mono,
            fontSize: "clamp(7.5px, 2vw, 8px)",
            letterSpacing: "0.18em",
            color: T.caseStudies,
            opacity: 0.82,
          }}
        >
          SECTION INSIGHT
        </div>

        <div
          style={{
            maxWidth: 326,
            fontFamily: T.serif,
            fontSize: "clamp(15px, 4vw, 16px)",
            fontStyle: "italic",
            lineHeight: 1.62,
            color: "#F0E9D8",
            opacity: 0.86,
          }}
        >
          “{section.insight}”
        </div>
      </aside>

      <div
        style={{
          marginTop: 28,
          fontFamily: T.mono,
          fontSize: 7.5,
          letterSpacing: "0.16em",
          color: T.body,
          opacity: 0.34,
        }}
      >
        {section.readingTime} MIN READ
      </div>
    </section>
  );
}
