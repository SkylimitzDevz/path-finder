import { createGrid, findPath } from "./index.js";

const grid = createGrid(10, 10)

findPath(0, 0, 9, 9, grid)
