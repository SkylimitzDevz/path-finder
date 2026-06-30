# Path Finder

A from-scratch JavaScript implementation of the A* pathfinding algorithm, built on a 2D grid.

## What it does

Given a grid, a start cell, and an end cell, `findPath` searches for the shortest path between them using the A* algorithm — picking the most promising cell to explore next based on a combination of distance already travelled (`g`) and estimated distance remaining (`h`).

Movement is restricted to 4 directions (up, down, left, right) — no diagonals.

## Usage

```javascript
import { createGrid, findPath } from "./index.js";

// Create a 10x10 grid
const grid = createGrid(10, 10);

// Find a path from (0,0) to (9,9)
const result = findPath(0, 0, 9, 9, grid);
```

### Grid structure

`createGrid(rows, cols)` returns a 2D array of cell objects:

```javascript
{
  parent: null,    // used for path tracing
  x: 0,
  y: 0,
  isWall: false,   // set to true to block movement through this cell
  type: "none"
}
```

To add walls, set `isWall: true` on the relevant cell(s) before calling `findPath`.

## How it works

Each cell tracks three scores:

- **g** — actual cost (steps) from the start to this cell
- **h** — estimated cost (Manhattan distance) from this cell to the end
- **f** — `g + h`, the total estimated cost of a path through this cell

The algorithm repeatedly picks the cell with the lowest `f` from the open list, checks if it's the goal, and otherwise expands its neighbours — scoring and queuing any that are valid (not a wall, not already explored).

## Functions

| Function | Purpose |
|---|---|
| `createGrid(rows, cols)` | Builds the grid of cell objects |
| `getHeuristicVal(x1, y1, x2, y2)` | Calculates Manhattan distance between two points |
| `getNeighbourNodes(x, y)` | Returns the coordinates of the 4 cardinal neighbours |
| `isNodeClosed(x, y, closedList)` | Checks whether a cell has already been fully explored |
| `openNewNode(node, endNode, currentNode)` | Builds a scored node object (g, h, f) for the open list |
| `closeNode(node, openList, closedList)` | Moves a node from the open list to the closed list |
| `findPath(startX, startY, endX, endY, grid)` | Runs the main A* loop |

## TODO

- [ ] Fix infinite loop: neighbours can currently be added to the open list multiple times, since there's no check for whether a neighbour is already open (only closed). Need an `isNodeOpen` check before pushing a new node.
- [ ] Path tracing — once the goal is reached, walk back through `parent` references to reconstruct the actual route.
- [ ] Fix hardcoded `x: 0, y: 0` in `startBlock` inside `findPath` (should use `startX`, `startY`).
