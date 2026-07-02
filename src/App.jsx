import { useEffect, useState } from 'react'
import './index.css'
import { createGrid } from './utils.js'
import { findPath } from './index.js'

function App() {

  const [openList, setOpenList] = useState(null)
  const [closedList, setClosedList] = useState(null)
  const [fullPath, setFullPath] = useState([])

  let grid = createGrid(10,10)
  const gridLen = grid[0].length
  const startY = 0
  const startX = 0
  const endY = grid.length - 1
  const endX = gridLen - 1

  grid[5][5].isWall = true
  grid[4][5].isWall = true
  grid[9][5].isWall = true
  grid[5][0].isWall = true
  grid[7][1].isWall = true
  grid[6][2].isWall = true
  grid[5][2].isWall = true
  grid[4][2].isWall = true
  grid[3][2].isWall = true
  grid[2][2].isWall = true
  grid[1][2].isWall = true
  grid[0][4].isWall = true

  function getId(x,y){
    const id = `cell-${x}-${y}`
    return id
  }

  function onUpdate(openList, closedList) {
    setOpenList(openList)
    setClosedList(closedList)
  }

  function tracePath(finalNode){
    let currentNode = finalNode
    let origin = []

    while(currentNode.parent){
      origin.push({x:currentNode.x, y:currentNode.y})
      currentNode = currentNode.parent
    }

    setFullPath(origin)
  }

  function getCellColor(x,y) {
    if (!openList || !closedList) return
    if ( x === startX && y === startY ) return "bg-green-500"
    if ( x === endX && y === endY) return "bg-red-500"
    if ( fullPath.some(node => node.x === x && node.y === y )) return "bg-orange-300"
    if ( openList.some(node => node.x === x && node.y === y)) return "bg-purple-500"
    if ( closedList.some(node => node.x === x && node.y === y )) return "bg-blue-300"
  }
  
  useEffect(() => {
    findPath(startX, startY, endX, endY, grid, onUpdate, tracePath)
  },[])

  return (
    <>
      <div id='container' className='w-full h-dvh flex justify-center items-center'>
        <div 
        className={`border-1 h-auto grid gap-1 p-3 rounded-2xl border-white/20`} 
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
                          className={` rounded-lg w-full h-1full border-1 border-white/30 ${getCellColor(block.x, block.y)} ${block.isWall ? "bg-white" : ""}`}

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
