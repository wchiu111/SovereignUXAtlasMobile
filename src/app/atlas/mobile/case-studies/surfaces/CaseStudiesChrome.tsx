import AtlasOverviewChrome from "../../overview/AtlasOverviewChrome";

type CaseStudiesChromeProps = {
  state: "atlas-landing" | "system-awakened" | "system-overview";
  overviewChromeVisible: boolean;
  isReturningFromReading: boolean;
  returnChromeVisible: boolean;
  isExitingCaseStudies: boolean;
  focusedEntryProjectId: string | null;
  onExitToAtlas: () => void;
  onOverviewBack: () => void;
};

export default function CaseStudiesChrome({
  state,
  overviewChromeVisible,
  isReturningFromReading,
  returnChromeVisible,
  isExitingCaseStudies,
  focusedEntryProjectId,
  onExitToAtlas,
  onOverviewBack,
}: CaseStudiesChromeProps) {
  if (state === "system-awakened") {
    const visible =
      overviewChromeVisible ||
      (isReturningFromReading && returnChromeVisible);

    return (
      <AtlasOverviewChrome
        label="ATLAS"
        onBack={onExitToAtlas}
        ariaLabel="Return to Atlas"
        visible={visible}
        interactive={
          overviewChromeVisible &&
          !isExitingCaseStudies &&
          !isReturningFromReading &&
          focusedEntryProjectId === null
        }
      />
    );
  }

  if (state === "system-overview") {
    return (
      <AtlasOverviewChrome
        label="CASE STUDIES"
        onBack={onOverviewBack}
        ariaLabel="Return to Case Studies"
      />
    );
  }

  return null;
}
