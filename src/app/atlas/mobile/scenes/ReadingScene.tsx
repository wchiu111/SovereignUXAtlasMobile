/**
 * ReadingScene
 *
 * Shared continuous-reading renderer for mobile case studies.
 * Project-specific content and evidence are selected through the registry.
 */

import { useEffect, useMemo, useRef, useState } from "react";
import { T } from "../components/mobileShared";
import MobileReadingHeader from "../reading/MobileReadingHeader";
import MobileSectionRail from "../reading/MobileSectionRail";
import MobileReadingSection from "../reading/MobileReadingSection";
import MobileEvidenceViewer from "../reading/MobileEvidenceViewer";
import { mobileCaseStudyDocumentFor } from "../reading/caseStudyReadingRegistry";
import type {
  MobileCaseStudyProjectId,
  MobileEvidenceItem,
} from "../reading/mobileReadingTypes";

function CaseStudyReadingSurface({
  projectId,
  onBack,
}: {
  projectId: MobileCaseStudyProjectId | null;
  onBack: () => void;
}) {
  const caseStudyDocument = mobileCaseStudyDocumentFor(projectId);
  const sections = caseStudyDocument.sections;
  const scrollRef = useRef<HTMLDivElement>(null);
  const chromeRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef(new Map<string, HTMLElement>());

  const [activeId, setActiveId] = useState<string>(sections[0].id);
  const [selectedEvidence, setSelectedEvidence] =
    useState<MobileEvidenceItem | null>(null);
  const [headerElevated, setHeaderElevated] = useState(false);
  const [isExitingReading, setIsExitingReading] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [chromeHeight, setChromeHeight] = useState(114);
  const exitTimerRef = useRef<number | null>(null);
  const evidenceTriggerRef = useRef<HTMLElement | null>(null);

  const sectionIds = useMemo(
    () => sections.map((section) => section.id),
    [sections],
  );

  useEffect(() => {
    setActiveId(sections[0].id);
    setSelectedEvidence(null);
    scrollRef.current?.scrollTo({ top: 0, behavior: "auto" });
  }, [caseStudyDocument.id, sections]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setPrefersReducedMotion(media.matches);
    sync();
    media.addEventListener?.("change", sync);
    return () => media.removeEventListener?.("change", sync);
  }, []);

  useEffect(() => {
    const chrome = chromeRef.current;
    if (!chrome) return;

    const updateChromeHeight = () => {
      const nextHeight = Math.ceil(chrome.getBoundingClientRect().height);
      if (nextHeight > 0) setChromeHeight(nextHeight);
    };

    updateChromeHeight();

    const observer = new ResizeObserver(updateChromeHeight);
    observer.observe(chrome);
    window.addEventListener("resize", updateChromeHeight);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateChromeHeight);
    };
  }, []);

  function requestBack() {
    if (isExitingReading) return;
    setIsExitingReading(true);

    const duration = prefersReducedMotion ? 140 : 280;
    exitTimerRef.current = window.setTimeout(() => {
      exitTimerRef.current = null;
      onBack();
    }, duration);
  }

  useEffect(() => {
    return () => {
      if (exitTimerRef.current !== null) {
        window.clearTimeout(exitTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      if (selectedEvidence) setSelectedEvidence(null);
      else requestBack();
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isExitingReading, onBack, prefersReducedMotion, selectedEvidence]);

  useEffect(() => {
    const scroller = scrollRef.current;
    if (!scroller) return;

    let frame = 0;

    const updateActiveSection = () => {
      cancelAnimationFrame(frame);
      setHeaderElevated(scroller.scrollTop > 12);
      frame = requestAnimationFrame(() => {
        const rootTop = scroller.getBoundingClientRect().top;
        const activationLine = rootTop + 156;

        let bestId = sectionIds[0];
        let bestDistance = Number.POSITIVE_INFINITY;

        for (const id of sectionIds) {
          const node = sectionRefs.current.get(id);
          if (!node) continue;

          const rect = node.getBoundingClientRect();
          const distance = Math.abs(rect.top - activationLine);

          if (rect.top <= activationLine + 24 && distance < bestDistance) {
            bestId = id;
            bestDistance = distance;
          }
        }

        const lastId = sectionIds[sectionIds.length - 1];
        const lastNode = sectionRefs.current.get(lastId);

        if (
          lastNode &&
          scroller.scrollTop + scroller.clientHeight >=
            scroller.scrollHeight - 24
        ) {
          bestId = lastId;
        }

        setActiveId(bestId);
      });
    };

    updateActiveSection();
    scroller.addEventListener("scroll", updateActiveSection, {
      passive: true,
    });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      cancelAnimationFrame(frame);
      scroller.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [sectionIds]);

  const scrollToSection = (id: string) => {
    const node = sectionRefs.current.get(id);
    const scroller = scrollRef.current;
    if (!node || !scroller) return;

    setActiveId(id);

    const scrollerTop = scroller.getBoundingClientRect().top;
    const nodeTop = node.getBoundingClientRect().top;
    const target = scroller.scrollTop + nodeTop - scrollerTop - 2;

    scroller.scrollTo({
      top: target,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  const activeSection =
    sections.find((section) => section.id === activeId) ?? sections[0];

  const evidenceForSection = (sectionId: string) =>
    caseStudyDocument.evidence.filter((item) => item.sectionId === sectionId);

  return (
    <div
      className="mobile-focused-reading"
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        background: "rgba(5,5,10,0.99)",
        color: T.body,
        opacity: isExitingReading ? 0 : 1,
        transition: prefersReducedMotion
          ? "opacity 140ms ease"
          : "opacity 260ms ease",
        pointerEvents: isExitingReading ? "none" : "auto",
      }}
    >
      <style>{`
        .mobile-focused-reading {
          --mobile-reading-inline: clamp(22px, 6.6vw, 28px);
        }

        .mobile-reading-focusable:focus-visible {
          outline: 1.5px solid rgba(232,200,109,0.92) !important;
          outline-offset: 3px;
        }

        .mobile-evidence-block:active {
          transform: scale(0.992);
          background: rgba(10,10,17,0.96) !important;
        }

        @media (max-width: 374px) {
          .mobile-section-rail > div {
            gap: 18px !important;
            padding-left: 18px !important;
            padding-right: 18px !important;
          }
        }

        @media (min-width: 431px) {
          .mobile-focused-reading {
            max-width: 430px;
            margin: 0 auto;
            left: 50% !important;
            right: auto !important;
            width: min(100%, 430px);
            transform: translateX(-50%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .mobile-focused-reading *,
          .mobile-focused-reading *::before,
          .mobile-focused-reading *::after {
            scroll-behavior: auto !important;
            transition-duration: 0.01ms !important;
            animation-duration: 0.01ms !important;
          }
        }
      `}</style>

      <div
        ref={chromeRef}
        style={{
          position: "absolute",
          inset: "0 0 auto 0",
          zIndex: 10,
        }}
      >
        <MobileReadingHeader
          title={caseStudyDocument.title}
          onBack={requestBack}
          elevated={headerElevated}
        />
        <MobileSectionRail
          sections={sections}
          activeId={activeId}
          ariaLabel={`${caseStudyDocument.title} case study sections`}
          onSelect={scrollToSection}
        />
      </div>

      <div
        ref={scrollRef}
        role="main"
        aria-label={caseStudyDocument.ariaLabel}
        style={{
          position: "absolute",
          top: chromeHeight,
          right: 0,
          bottom: 0,
          left: 0,
          overflowY: "auto",
          overflowX: "hidden",
          WebkitOverflowScrolling: "touch",
          overscrollBehaviorY: "contain",
        }}
      >
        {sections.map((section) => (
          <MobileReadingSection
            key={section.id}
            section={section}
            totalSections={sections.length}
            evidence={evidenceForSection(section.id)}
            setRef={(node) => {
              if (node) sectionRefs.current.set(section.id, node);
              else sectionRefs.current.delete(section.id);
            }}
            onInspectEvidence={(item) => {
              evidenceTriggerRef.current =
                window.document.activeElement instanceof HTMLElement
                  ? window.document.activeElement
                  : null;
              setSelectedEvidence(item);
            }}
          />
        ))}

        <div
          style={{
            padding:
              "clamp(42px, 11vw, 50px) clamp(22px, 6.6vw, 28px) calc(72px + env(safe-area-inset-bottom))",
            textAlign: "left",
          }}
        >
          <div
            style={{
              fontFamily: T.mono,
              fontSize: 8,
              letterSpacing: "0.18em",
              color: T.identityGold,
              opacity: 0.52,
              marginBottom: 12,
            }}
          >
            END OF CASE STUDY
          </div>

          <button
            type="button"
            onClick={requestBack}
            className="mobile-reading-focusable"
            style={{
              minHeight: 44,
              border: "none",
              background: "transparent",
              padding: 0,
              fontFamily: T.mono,
              fontSize: 9,
              letterSpacing: "0.16em",
              color: T.caseStudies,
              opacity: 0.86,
              cursor: "pointer",
            }}
          >
            ← RETURN TO CASE STUDIES
          </button>
        </div>
      </div>

      {selectedEvidence && (
        <MobileEvidenceViewer
          item={selectedEvidence}
          sectionLabel={activeSection.label}
          onClose={() => {
            setSelectedEvidence(null);
            window.requestAnimationFrame(() => {
              evidenceTriggerRef.current?.focus({ preventScroll: true });
              evidenceTriggerRef.current = null;
            });
          }}
        />
      )}
    </div>
  );
}

interface ReadingSceneProps {
  projectId: MobileCaseStudyProjectId | null;
  onBack: () => void;
}

export default function ReadingScene({
  projectId,
  onBack,
}: ReadingSceneProps) {
  return <CaseStudyReadingSurface projectId={projectId} onBack={onBack} />;
}
