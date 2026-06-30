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
// check if a node is already checked / closed
function isNodeClosed(x, y, closedList) {
    const result = closedList.find((node) => node.x === x && node.y === y)
    if(result){
        return true
    } else {
        return false
    }
}

function openNewNode(node, endNode, nextBlock) {
    let currentNode = {
        x: node.x,
        y: node.y,
        h: getHeuristicVal(node.x, node.y, endNode.x, endNode.y),
        g: nextBlock.g + 1,
        f: nextBlock.g + 1 + getHeuristicVal(node.x, node.y, endNode.x, endNode.y),
    }

    return currentNode
}

function closeNode(node, openList, closedList) {
    const index = openList.findIndex((currentNode) => currentNode.x === node.x && currentNode.y === node.y)

    const transferrNode = openList[index]

    if(index >= 0){
        openList.splice(index, 1)
    } else {
        console.log("No index found!")
    }

    closedList.push(transferrNode)
}

export function findPath(startX, startY, endX, endY, grid) {
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

        let nextBlock = null

        // get the node with the lowest f value from the open list
        if(openList){
            nextBlock = openList.reduce((min, obj) => obj.f < min.f ? obj : min)
        } else {
            console.log("OpenList is empty, cannot proceed!")
            break
        }

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

            // current search node
            const currentSearchNode = neighbourNodes[i]
            console.log("current search node > " + JSON.stringify(currentSearchNode, null, 2))

            // final result
            let neighbourMatch = null

            // find matches to the potential neighbour nodes from the grid
            for (let i = 0; i < grid.length; i++) {
                const currentRow = grid[i]
                // console.log("current row > " + JSON.stringify(currentRow, null, 2))

                const currentNeighbour = currentRow.find((node) => node.x === currentSearchNode[0] && node.y === currentSearchNode[1] )

                if(currentNeighbour){
                    neighbourMatch = currentNeighbour
                    console.log("Neigbour node found! > " + neighbourMatch)
                    break
                }
            }

            if(!neighbourMatch) {
                console.log("No neighbour node found!")
            } else {

                if(!neighbourMatch.isWall && !isNodeClosed(neighbourMatch.x, neighbourMatch.y, closedList)){
                    const newNode = openNewNode(neighbourMatch, endBlock, nextBlock)

                    openList.push(newNode)

                }

            }

        }
        
        closeNode(nextBlock, openList, closedList)

    }
}


// getHeuristicVal(0,0,10,10)
// createGrid(10,10)


// first off it calcutaes the distance between the current x and y coods to the final x and y

// now it checks if it should move straight or diagonally by checking if either the x or y coods of the end and the start is equal, if yes it should move vertically or horzontally, if no, it should move diagonally


//  g(n) — the actual cost to reach this node from the start
// h(n) — a heuristic estimate of the cost to reach the goal from here (usually straight-line distance)
// f(n) — the total estimated cost of the path through this node
