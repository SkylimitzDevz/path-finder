export function createGrid(rows, cols) {
    
    let gridArray = []
    
    for (let i = 0; i < rows; i++){

        let rowNum = i;
        let currentArray = []

        // Creates one block in a row
        for(let x = 0; x < cols; x++){
            let colNum = x

            const currentBlock = {
                parent: null,
                x: rowNum,
                y: colNum,
                isWall: false,
                type: "none"
            }

            currentArray.push(currentBlock)
        }
        // push the complete row/array to the final array
        gridArray.push(currentArray)

    }
    console.log(gridArray)
    return gridArray
}

// function to get the heuristic
function getHeuristicVal(startX, startY, endX, endY) {
    const x =  Math.abs(endX - startX)
    const y =  Math.abs(endY - startY)

    console.log(x,y)
    return(x + y)
}

// function to get all the potential neighbour nodes of a nodes
function getNeighbourNodes(currentX, currentY){
    const node1 = [currentX + 1, currentY]
    const node2 = [currentX, currentY + 1]
    const node3 = [currentX - 1, currentY]
    const node4 = [currentX, currentY - 1]

    return [node1, node2, node3, node4]
}


function findPath(startX, startY, endX, endY, grid) {
    const startBlock = {
        x: 0,
        y: 0,
        g: 0,
        h: getHeuristicVal(0,0, endX, endY),
        f: getHeuristicVal(0,0, endX, endY),
    }

    const endBlock = {x: endX, y: endY}

    let openList = [startBlock]
    let closedList = []

    while(true) {

        // get the node with the lowest f value from the open list
        const nextBlock = openList.reduce((min, obj) => obj.f < min.f ? obj : min)

        // check if the found block is our final destination
        if(nextBlock.x === endBlock.x && nextBlock.y === endBlock.y){
            console.log("End reached!")
            return nextBlock

            break
        }

        // all possible neighbour nodes of the current node
        const neighbourNodes = getNeighbourNodes(nextBlock.x, nextBlock.y)

        // go thorugh all nodes to see which are valid
        for (let i = 0; i < neighbourNodes.length; i++) {

            const currentSearchNode = neighbourNodes[i]
            let neighbourMatch = null

            // find matches to the potential neighbour nodes from the grid
            for (let i = 0; i < grid.length; i++) {
                const currentRow = grid[i]

                const currentNeighbour = currentRow.find((node) => node.x === currentSearchNode.x && node.y === currentSearchNode.y )

                if(currentNeighbour){
                    neighbourMatch = currentNeighbour
                    break
                }
            }

            if(!neighbourMatch) {
                console.log("No neighbour node found!")
            } else {

                if(!neighbourMatch.isWall){
                    console.log("potential next node found!")
                }

            }
        }


    }
}


// getHeuristicVal(0,0,10,10)
// createGrid(10,10)


// first off it calcutaes the distance between the current x and y coods to the final x and y

// now it checks if it should move straight or diagonally by checking if either the x or y coods of the end and the start is equal, if yes it should move vertically or horzontally, if no, it should move diagonally


//  g(n) — the actual cost to reach this node from the start
// h(n) — a heuristic estimate of the cost to reach the goal from here (usually straight-line distance)
// f(n) — the total estimated cost of the path through this node
