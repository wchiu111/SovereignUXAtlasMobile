import type { ConstellationRelation } from "./constellationTypes";

export default function ConstellationRelations({
  relations,
  color,
  opacity = 1,
}: {
  relations: readonly ConstellationRelation[];
  color: string;
  opacity?: number;
}) {
  return (
    <g pointerEvents="none" opacity={opacity}>
      {relations.map((relation) => {
        const primary = relation.strength !== "secondary";
        return (
          <path
            key={relation.id}
            d={relation.d}
            fill="none"
            stroke={color}
            strokeWidth={primary ? 0.5 : 0.35}
            strokeDasharray={
              relation.dashed
                ? primary
                  ? "3.5 7"
                  : "2 7"
                : undefined
            }
            opacity={primary ? 0.14 : 0.07}
          />
        );
      })}
    </g>
  );
}
