import type { ConstellationConnection } from "../../types/atlas";

export interface RelationshipTraceStep {
  id: string;
  connection: ConstellationConnection;
  depth: number;
  direction: "downstream" | "incoming";
}

export interface RelationshipTrace {
  originId: string | null;
  nodeIds: string[];
  steps: RelationshipTraceStep[];
}

const connectionId = (connection: ConstellationConnection) =>
  `${connection.from}->${connection.to}`;

/**
 * Resolve the authored path outward from an origin. Connections are directional:
 * a node previews everything downstream from it. Terminal nodes retain context by
 * revealing their immediate incoming relationship.
 */
export function resolveRelationshipTrace(
  originId: string | null,
  connections: ConstellationConnection[] = [],
): RelationshipTrace {
  if (!originId) {
    return { originId: null, nodeIds: [], steps: [] };
  }

  const nodeIds = new Set([originId]);
  const visitedConnections = new Set<string>();
  const steps: RelationshipTraceStep[] = [];
  const queue = [{ nodeId: originId, depth: 0 }];
  const visitedNodes = new Set([originId]);

  while (queue.length > 0) {
    const current = queue.shift()!;
    const outgoing = connections.filter(
      (connection) => connection.from === current.nodeId,
    );

    outgoing.forEach((connection) => {
      const id = connectionId(connection);
      if (visitedConnections.has(id)) return;

      visitedConnections.add(id);
      nodeIds.add(connection.to);
      steps.push({
        id,
        connection,
        depth: current.depth,
        direction: "downstream",
      });

      if (!visitedNodes.has(connection.to)) {
        visitedNodes.add(connection.to);
        queue.push({ nodeId: connection.to, depth: current.depth + 1 });
      }
    });
  }

  if (steps.length === 0) {
    connections
      .filter((connection) => connection.to === originId)
      .forEach((connection) => {
        nodeIds.add(connection.from);
        steps.push({
          id: connectionId(connection),
          connection,
          depth: 0,
          direction: "incoming",
        });
      });
  }

  return {
    originId,
    nodeIds: [...nodeIds],
    steps,
  };
}
