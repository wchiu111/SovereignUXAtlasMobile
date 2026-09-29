import type {
  ObservatoryDestinationId,
  ObservatoryHotspotDefinition,
  ObservatoryPanelId,
} from "../observatoryTypes";

export default function ObservatoryObjectReactions({
  hotspots,
  selectedId,
  focusedId,
}: {
  hotspots: readonly ObservatoryHotspotDefinition[];
  selectedId: ObservatoryDestinationId | null;
  focusedId: ObservatoryPanelId | null;
}) {
  return (
    <div
      aria-hidden="true"
      style={{
        position:"absolute",
        inset:0,
        zIndex:5,
        pointerEvents:"none",
      }}
    >
      <style>{`
        @keyframes observatoryAmbientReaction {
          0%,100% {
            transform:translate(-50%,-50%) scale(.90);
            opacity:.30;
          }
          50% {
            transform:translate(-50%,-50%) scale(1.12);
            opacity:.62;
          }
        }

        @keyframes observatorySelectedReaction {
          0%,100% {
            transform:translate(-50%,-50%) scale(.94);
            opacity:.72;
          }
          50% {
            transform:translate(-50%,-50%) scale(1.14);
            opacity:1;
          }
        }

        @keyframes observatoryArchiveScan {
          0% { transform:translateY(-24px); opacity:0; }
          18% { opacity:.78; }
          70% { opacity:.32; }
          100% { transform:translateY(48px); opacity:0; }
        }

        @keyframes observatoryConsoleBlink {
          0%,100% { opacity:.24; transform:scale(.84); }
          38% { opacity:1; transform:scale(1.18); }
        }

        @keyframes observatoryConsoleSweep {
          0%,100% { transform:translateX(-22px) scaleX(.72); opacity:.08; }
          50% { transform:translateX(22px) scaleX(1); opacity:.62; }
        }

        @keyframes observatoryOrbitIdle {
          from { transform:translate(-50%,-50%) rotate(0deg); }
          to { transform:translate(-50%,-50%) rotate(360deg); }
        }

        @keyframes observatoryOrbitIdleReverse {
          from { transform:translate(-50%,-50%) rotate(0deg); }
          to { transform:translate(-50%,-50%) rotate(-360deg); }
        }

        @keyframes observatoryAtlasPulse {
          0%,100% {
            transform:translate(-50%,-50%) scale(.84);
            opacity:.28;
          }
          48% {
            transform:translate(-50%,-50%) scale(1.16);
            opacity:.72;
          }
        }

        @keyframes observatoryAtlasSweep {
          from { transform:translate(-50%,-50%) rotate(0deg); opacity:.22; }
          50% { opacity:.62; }
          to { transform:translate(-50%,-50%) rotate(360deg); opacity:.22; }
        }

        @keyframes observatoryAboutFloor {
          0%,100% {
            transform:translate(-50%,-50%) scale(.86);
            opacity:.18;
          }
          50% {
            transform:translate(-50%,-50%) scale(1.12);
            opacity:.48;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .observatory-object-animated {
            animation:none !important;
          }
        }
      `}</style>

      {hotspots.map((hotspot,index) => {
        const selected = selectedId === hotspot.id;
        const focused = focusedId === hotspot.id;
        const subdued =
          selectedId !== null && selectedId !== hotspot.id;

        const atmosphereSize =
          hotspot.id === "about"
            ? selected ? 218 : 174
            : hotspot.id === "atlas"
            ? selected ? 154 : 118
            : selected ? 146 : 108;

        return (
          <div
            key={hotspot.id}
            style={{
              position:"absolute",
              inset:0,
              opacity:subdued ? .32 : 1,
              transition:
                "opacity 380ms cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            <span
              className="observatory-object-animated"
              style={{
                position:"absolute",
                left:hotspot.x,
                top:hotspot.y,
                width:atmosphereSize,
                height:atmosphereSize,
                borderRadius:"50%",
                background:`radial-gradient(circle,
                  ${hotspot.color}${selected?"46":"24"} 0%,
                  ${hotspot.color}${selected?"20":"10"} 36%,
                  transparent 72%)`,
                mixBlendMode:"screen",
                filter:"blur(2px)",
                animation:focused
                  ? "none"
                  : selected
                  ? "observatorySelectedReaction 3.6s ease-in-out infinite"
                  : `observatoryAmbientReaction ${
                      5.2+index*.48
                    }s ease-in-out -${index*.72}s infinite`,
                opacity:focused ? .82 : undefined,
              }}
            />

            {hotspot.id === "journey" && (
              <>
                <span
                  style={{
                    position:"absolute",
                    left:hotspot.x-38,
                    top:hotspot.y-34,
                    width:76,
                    height:68,
                    overflow:"hidden",
                    borderRadius:9,
                    opacity:selected ? .96 : .56,
                  }}
                >
                  <span
                    className="observatory-object-animated"
                    style={{
                      position:"absolute",
                      left:2,
                      right:2,
                      top:9,
                      height:1,
                      background:`linear-gradient(90deg, transparent, ${hotspot.color}E0, transparent)`,
                      boxShadow:`0 0 10px ${hotspot.color}88`,
                      animation:
                        "observatoryArchiveScan 4.6s ease-in-out -1.1s infinite",
                    }}
                  />
                  <span
                    className="observatory-object-animated"
                    style={{
                      position:"absolute",
                      left:8,
                      right:8,
                      top:18,
                      height:.65,
                      background:`linear-gradient(90deg, transparent, ${hotspot.color}96, transparent)`,
                      animation:
                        "observatoryArchiveScan 6.2s ease-in-out -3.4s infinite",
                    }}
                  />
                </span>
              </>
            )}

            {hotspot.id === "contact" && (
              <>
                <span
                  className="observatory-object-animated"
                  style={{
                    position:"absolute",
                    left:hotspot.x-34,
                    top:hotspot.y+18,
                    width:68,
                    height:1,
                    background:`linear-gradient(90deg, transparent, ${hotspot.color}B8, transparent)`,
                    boxShadow:`0 0 10px ${hotspot.color}66`,
                    animation:
                      "observatoryConsoleSweep 3.6s ease-in-out infinite",
                  }}
                />
                {[-18,0,18].map((dx,dotIndex)=>(
                  <span
                    key={dx}
                    className="observatory-object-animated"
                    style={{
                      position:"absolute",
                      left:hotspot.x+dx,
                      top:hotspot.y+28,
                      width:selected ? 4.5 : 3.3,
                      height:selected ? 4.5 : 3.3,
                      borderRadius:"50%",
                      background:hotspot.color,
                      boxShadow:`0 0 10px ${hotspot.color}A8`,
                      animation:`observatoryConsoleBlink ${
                        2.2+dotIndex*.32
                      }s ease-in-out -${dotIndex*.56}s infinite`,
                    }}
                  />
                ))}
              </>
            )}

            {hotspot.id === "philosophy" && (
              <>
                <span
                  className="observatory-object-animated"
                  style={{
                    position:"absolute",
                    left:hotspot.x,
                    top:hotspot.y,
                    width:selected ? 92 : 70,
                    height:selected ? 48 : 38,
                    borderRadius:"50%",
                    border:`0.8px dashed ${hotspot.color}${selected?"B0":"70"}`,
                    boxShadow:selected
                      ? `0 0 16px ${hotspot.color}4A`
                      : `0 0 8px ${hotspot.color}20`,
                    animation:
                      "observatoryOrbitIdle 16s linear infinite",
                  }}
                />
                <span
                  className="observatory-object-animated"
                  style={{
                    position:"absolute",
                    left:hotspot.x,
                    top:hotspot.y,
                    width:selected ? 66 : 52,
                    height:selected ? 66 : 52,
                    borderRadius:"50%",
                    border:`0.65px solid ${hotspot.color}${selected?"70":"38"}`,
                    animation:
                      "observatoryOrbitIdleReverse 21s linear infinite",
                  }}
                />
              </>
            )}

            {hotspot.id === "atlas" && (
              <>
                {[54,78,104].map((size,ringIndex)=>(
                  <span
                    key={size}
                    className="observatory-object-animated"
                    style={{
                      position:"absolute",
                      left:hotspot.x,
                      top:hotspot.y,
                      width:selected ? size+14:size,
                      height:selected ? size+14:size,
                      borderRadius:"50%",
                      border:`0.75px solid ${hotspot.color}${selected?"84":"4C"}`,
                      boxShadow:
                        ringIndex===0
                          ? `0 0 12px ${hotspot.color}38`
                          : "none",
                      animation:`observatoryAtlasPulse ${
                        4.2+ringIndex*.85
                      }s ease-in-out -${ringIndex*1.1}s infinite`,
                    }}
                  />
                ))}
                <span
                  className="observatory-object-animated"
                  style={{
                    position:"absolute",
                    left:hotspot.x,
                    top:hotspot.y,
                    width:selected ? 118 : 92,
                    height:selected ? 118 : 92,
                    borderRadius:"50%",
                    borderTop:`1px solid ${hotspot.color}${selected?"A8":"64"}`,
                    borderRight:"1px solid transparent",
                    borderBottom:"1px solid transparent",
                    borderLeft:"1px solid transparent",
                    animation:
                      "observatoryAtlasSweep 10.5s linear infinite",
                  }}
                />
              </>
            )}

            {hotspot.id === "about" && (
              <>
                {[92,140,192].map((size,ringIndex)=>(
                  <span
                    key={size}
                    className="observatory-object-animated"
                    style={{
                      position:"absolute",
                      left:hotspot.x,
                      top:hotspot.y,
                      width:selected
                        ? size+ringIndex*6
                        : size,
                      height:
                        (selected
                          ? size+ringIndex*6
                          : size)*.38,
                      borderRadius:"50%",
                      border:`0.7px solid ${hotspot.color}${selected?"78":"3A"}`,
                      boxShadow:
                        ringIndex===0
                          ? `0 0 18px ${hotspot.color}2A`
                          : "none",
                      animation:`observatoryAboutFloor ${
                        5.8+ringIndex*.8
                      }s ease-in-out -${ringIndex*1.5}s infinite`,
                    }}
                  />
                ))}
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
