import { useState } from 'react'
import './index.css'
import { createGrid } from './index.js'

function App() {

  let grid = createGrid(10,10)
  console.log(grid)

  const gridLen = grid[0].length

  const startY = 0
  const startX = 0
  const endY = grid.length - 1
  const endX = gridLen - 1

  grid[startX][startY].type = "start"
  grid[endY][endX].type = "end"

  return (
    <>
      <div id='container' className='w-full h-dvh flex justify-center items-center'>
        <div 
        className={`border-1 h-auto grid gap-0 `} 
        style={{ 
          gridTemplateColumns: `repeat(${gridLen}, 50px`, 
          gridTemplateRows: `repeat(${grid.length}, 50px`
          }}>
          {
            grid.map((row) => {
              return row.map((block) => {
                const id = `cell-${block.x}-${block.y}`
                return( <div 
                          key={id}
                          id={id}
                          className={`w-full h-1full border-1 border-amber-50 ${block.type === "start" ? "bg-green-500" : block.type === "end" ? "bg-red-500" : block.type === "todo" ? "bg-purple-500" : block.type === "checked" ? "bg-blue-300" : "" }`}

                          ></div>)
              })
            })
          }
        </div>
      </div>
    </>
  )
}

export default App
