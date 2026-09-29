import AtlasOverviewChrome from "../../overview/AtlasOverviewChrome";

export default function FrameworksChrome({
  visible,
  onExitToAtlas,
}: {
  visible: boolean;
  onExitToAtlas: () => void;
}) {
  return (
    <AtlasOverviewChrome
      label="ATLAS"
      onBack={onExitToAtlas}
      ariaLabel="Return to Atlas"
      visible={visible}
      interactive={visible}
    />
  );
}
