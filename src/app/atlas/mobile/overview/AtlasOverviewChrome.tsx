import MobileBackControl from "../components/MobileBackControl";
import { atlasOverviewChromeGeometry } from "./atlasOverviewGeometry";

export interface AtlasOverviewChromeProps {
  label: string;
  onBack: () => void;
  ariaLabel?: string;
  visible?: boolean;
  interactive?: boolean;
  zIndex?: number;
}

/**
 * Shared retreat chrome for Atlas system overviews.
 *
 * Positioning comes from the shared overview contract. Consumers only provide
 * semantic state: label, visibility, interactivity, and destination.
 *
 * Case Studies and Frameworks use this in Pass 2. Experiments can reuse the
 * same component later without introducing another chrome implementation.
 */
export default function AtlasOverviewChrome({
  label,
  onBack,
  ariaLabel,
  visible = true,
  interactive = true,
  zIndex = 8,
}: AtlasOverviewChromeProps) {
  return (
    <div
      data-atlas-overview-chrome
      style={{
        ...atlasOverviewChromeGeometry(),
        zIndex,
        opacity: visible ? 1 : 0,
        transform: `translateY(${visible ? 0 : -5}px)`,
        transition: "opacity 220ms ease, transform 260ms ease",
      }}
    >
      <MobileBackControl
        label={label}
        onBack={onBack}
        ariaLabel={ariaLabel}
        interactive={interactive && visible}
      />
    </div>
  );
}
