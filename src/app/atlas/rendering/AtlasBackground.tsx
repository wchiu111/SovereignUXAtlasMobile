import AtlasNebulaField from "./AtlasNebulaField";

interface AtlasBackgroundProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
}

export default function AtlasBackground({ canvasRef }: AtlasBackgroundProps) {
  return (
    <>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <AtlasNebulaField />

        {/* Preserve a quiet center so Sovereign Design remains the dominant focal point. */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 48%, rgba(0,0,0,0.015) 0%, rgba(0,0,0,0.06) 44%, rgba(0,0,0,0.23) 100%)",
          }}
        />

        <div
          aria-hidden="true"
          className="absolute"
          style={{
            left: "50%",
            top: "48%",
            width: "34vw",
            height: "34vw",
            minWidth: 420,
            minHeight: 420,
            transform: "translate(-50%,-50%)",
            background:
              "radial-gradient(circle, rgba(3,3,7,0.24) 0%, rgba(3,3,7,0.13) 44%, transparent 74%)",
          }}
        />
      </div>

      {/* Existing Atlas starfield remains structurally untouched and renders above atmosphere. */}
      <canvas ref={canvasRef} className="absolute inset-0" />
    </>
  );
}
