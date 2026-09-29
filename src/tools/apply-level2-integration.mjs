#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const target = path.join(root, "src/app/atlas/AtlasExplorer.tsx");

if (!fs.existsSync(target)) {
  console.error(`AtlasExplorer.tsx was not found at:\n${target}`);
  process.exit(1);
}

let source = fs.readFileSync(target, "utf8");

function replaceOnce(label, before, after) {
  if (!source.includes(before)) {
    console.error(`Could not apply "${label}". Expected marker was not found.`);
    process.exit(1);
  }

  source = source.replace(before, after);
}

if (!source.includes('import ApplicationKitLevel2Drawer from "./components/ApplicationKitLevel2Drawer";')) {
  replaceOnce(
    "Level 2 imports",
    'import FocusedOverview from "./components/FocusedOverview";',
    `import FocusedOverview, {
  type ApplicationKitDepth,
} from "./components/FocusedOverview";
import ApplicationKitLevel2Drawer from "./components/ApplicationKitLevel2Drawer";`,
  );
}

if (!source.includes("const [applicationKitDepth, setApplicationKitDepth]")) {
  replaceOnce(
    "Level 2 state",
    `  const [reduceFocusMotion, setReduceFocusMotion] = useState(false);
  const [hoveredSystemPreview, setHoveredSystemPreview] = useState<{`,
    `  const [reduceFocusMotion, setReduceFocusMotion] = useState(false);
  const [applicationKitDepth, setApplicationKitDepth] =
    useState<ApplicationKitDepth>("overview");
  const applicationKitTimersRef = useRef<number[]>([]);
  const [hoveredSystemPreview, setHoveredSystemPreview] = useState<{`,
  );
}

if (!source.includes("applicationKitTimersRef.current.forEach(window.clearTimeout);")) {
  replaceOnce(
    "Level 2 timer cleanup",
    `  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreference = () => setReduceFocusMotion(media.matches);
    syncPreference();
    media.addEventListener?.("change", syncPreference);
    return () => media.removeEventListener?.("change", syncPreference);
  }, []);`,
    `  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreference = () => setReduceFocusMotion(media.matches);
    syncPreference();
    media.addEventListener?.("change", syncPreference);
    return () => media.removeEventListener?.("change", syncPreference);
  }, []);

  useEffect(() => {
    return () => {
      applicationKitTimersRef.current.forEach(window.clearTimeout);
    };
  }, []);`,
  );
}

if (!source.includes("const enterBehaviorAuthority = useCallback")) {
  replaceOnce(
    "Level 2 transition callbacks",
    `  const exitFocus  = useCallback(() => {
    actions.exitFocusMode();
    requestAnimationFrame(() => {
      actions.openProjectDrawer();
    });
  }, []);

  // Click-space-to-go-back`,
    `  const exitFocus  = useCallback(() => {
    actions.exitFocusMode();
    requestAnimationFrame(() => {
      actions.openProjectDrawer();
    });
  }, []);

  const enterBehaviorAuthority = useCallback(() => {
    if (
      activePlanet?.id !== "application-kit" ||
      applicationKitDepth !== "overview"
    ) {
      return;
    }

    applicationKitTimersRef.current.forEach(window.clearTimeout);
    applicationKitTimersRef.current = [];

    setApplicationKitDepth("entering-family");

    applicationKitTimersRef.current.push(
      window.setTimeout(
        () => setApplicationKitDepth("family"),
        reduceFocusMotion ? 120 : 760,
      ),
    );
  }, [
    activePlanet?.id,
    applicationKitDepth,
    reduceFocusMotion,
  ]);

  const exitBehaviorAuthority = useCallback(() => {
    if (
      applicationKitDepth === "overview" ||
      applicationKitDepth === "leaving-family"
    ) {
      return;
    }

    applicationKitTimersRef.current.forEach(window.clearTimeout);
    applicationKitTimersRef.current = [];

    setApplicationKitDepth("leaving-family");

    applicationKitTimersRef.current.push(
      window.setTimeout(
        () => setApplicationKitDepth("overview"),
        reduceFocusMotion ? 120 : 820,
      ),
    );
  }, [applicationKitDepth, reduceFocusMotion]);

  useEffect(() => {
    if (applicationKitDepth === "overview") return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      exitBehaviorAuthority();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [applicationKitDepth, exitBehaviorAuthority]);

  useEffect(() => {
    if (activePlanet?.id === "application-kit") return;

    applicationKitTimersRef.current.forEach(window.clearTimeout);
    applicationKitTimersRef.current = [];
    setApplicationKitDepth("overview");
  }, [activePlanet?.id]);

  // Click-space-to-go-back`,
  );
}

replaceOnce(
  "Level 2 background retreat",
  `  const handleBgClick = useCallback(() => {
    if (level === 3) return;
    if (level === 2) backToSystem();
    else if (level === 1) goToAtlas();
  }, [level, backToSystem, goToAtlas]);`,
  `  const handleBgClick = useCallback(() => {
    if (level === 3) return;

    if (level === 2 && applicationKitDepth !== "overview") {
      exitBehaviorAuthority();
      return;
    }

    if (level === 2) backToSystem();
    else if (level === 1) goToAtlas();
  }, [
    level,
    applicationKitDepth,
    exitBehaviorAuthority,
    backToSystem,
    goToAtlas,
  ]);`,
);

if (!source.includes("applicationKitDepth={applicationKitDepth}")) {
  replaceOnce(
    "FocusedOverview Level 2 props",
    `          transitioning={!!focusTransition}
          onOpenStar={(index, anchor) => {`,
    `          transitioning={!!focusTransition}
          applicationKitDepth={applicationKitDepth}
          onEnterBehaviorAuthority={enterBehaviorAuthority}
          onOpenStar={(index, anchor) => {`,
  );
}

replaceOnce(
  "Level 1 drawer exit",
  `          open={drawerOpen}
          system={activeSystem}`,
  `          open={
            drawerOpen &&
            (
              activePlanet.id !== "application-kit" ||
              applicationKitDepth === "overview"
            )
          }
          system={activeSystem}`,
);

if (!source.includes("<ApplicationKitLevel2Drawer")) {
  replaceOnce(
    "Level 2 drawer mount",
    `      {level === 2 && activeSystem && activePlanet && (
        <AtlasProjectIntelligenceDrawer
          open={
            drawerOpen &&
            (
              activePlanet.id !== "application-kit" ||
              applicationKitDepth === "overview"
            )
          }
          system={activeSystem}
          planet={activePlanet}
        />
      )}`,
    `      {level === 2 && activeSystem && activePlanet && (
        <AtlasProjectIntelligenceDrawer
          open={
            drawerOpen &&
            (
              activePlanet.id !== "application-kit" ||
              applicationKitDepth === "overview"
            )
          }
          system={activeSystem}
          planet={activePlanet}
        />
      )}

      {level === 2 &&
        activeSystem &&
        activePlanet?.id === "application-kit" && (
          <ApplicationKitLevel2Drawer
            open={applicationKitDepth === "family"}
            systemColor={activeSystem.color}
            onBack={exitBehaviorAuthority}
          />
        )}`,
  );
}

replaceOnce(
  "Level 2 idle hint",
  `      {level === 2 && (
        <div`,
  `      {level === 2 && applicationKitDepth === "overview" && (
        <div`,
);

fs.writeFileSync(target, source);
console.log("Updated src/app/atlas/AtlasExplorer.tsx");
console.log("Level 2 Behavior & Authority routing is now connected.");
