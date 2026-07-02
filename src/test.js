import {findPath } from "./index.js";
import { createGrid } from "./utils.js";

const grid = createGrid(10, 10)

const result = findPath(0, 0, 9, 9, grid)

console.log("[ RESULT ] : " + JSON.stringify(result))
