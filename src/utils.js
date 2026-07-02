function createGrid(rows, cols) {
    
    let gridArray = []
    
    for (let i = 0; i < rows; i++){

        let rowNum = i;
        let currentArray = []

        // Creates one block in a row
        for(let x = 0; x < cols; x++){
            let colNum = x

            const currentBlock = {
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
    return gridArray
}

// function to get the heuristic
function getHeuristicVal(startX, startY, endX, endY) {
    const x =  Math.abs(endX - startX)
    const y =  Math.abs(endY - startY)

    console.log(`[FROM GET HEURISTIC] : Heuristic > ${x + y}`)
    return(x + y)
}

// function to get all the potential neighbour nodes of a nodes
function getNeighbourNodes(nextBlock){
    const currentX = nextBlock.x
    const currentY = nextBlock.y

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

function isNodeOpen(x, y, openList) {
    const result = openList.find((node) => node.x === x && node.y === y)
    if(result){
        return true
    } else {
        return false
    }
}

function openNewNode(node, endNode, pastBlock) {
    let currentNode = {
        x: node.x,
        y: node.y,
        h: getHeuristicVal(node.x, node.y, endNode.x, endNode.y),
        g: pastBlock.g + 1,
        f: pastBlock.g + 1 + getHeuristicVal(node.x, node.y, endNode.x, endNode.y),
        parent: pastBlock
    }

    console.log("[FROM OPEN NODE] : Parent > " + JSON.stringify(currentNode.parent))
    return currentNode
}

function closeNode(node, openList, closedList) {

    const index = openList.findIndex((currentNode) => currentNode.x === node.x && currentNode.y === node.y)
    const transferrNode = openList[index]

    if(index >= 0){
        openList.splice(index, 1)
    } else {
        console.log("[FROM CLOSE NODE] : No index found!")
    }

    closedList.push(transferrNode)
    console.log("[FROM CLOSE NODE] : Node closed sucessfully!")
}

function isNodeValid(neighbourMatch, openList, closedList) {
    const isClosed = isNodeClosed(neighbourMatch.x, neighbourMatch.y, closedList)
    const isOpen = isNodeOpen(neighbourMatch.x, neighbourMatch.y, openList)

    if (!isClosed && !neighbourMatch.isWall){

        if(!isOpen) {
            return true
        } else {
            return false   
        }
        
    } else {
        return false
    }
}



export {createGrid, getHeuristicVal, getNeighbourNodes, isNodeClosed, isNodeOpen, isNodeValid, openNewNode, closeNode}


// [COMMAND FOR AI] : In the same way i have added a comment over the second, third and fouth function, briefly explaing what it does, i want you do complete it by adding comments to the rest of the functions, keep it small, compact and startight to the point