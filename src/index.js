import {createGrid, getHeuristicVal, getNeighbourNodes, isNodeClosed, isNodeOpen, isNodeValid, openNewNode, closeNode} from "./utils.js"

export function findPath(startX, startY, endX, endY, grid, onUpdate, tracePath) {
    const startBlock = {
        x: startX,
        y: startY,
        g: 0,
        h: getHeuristicVal(0,0, endX, endY),
        f: getHeuristicVal(0,0, endX, endY),
        parent: { x: 0, y: 0 }
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
            console.log("[ERROR] : OpenList is empty, cannot proceed!")
            break
        }

        // check if the found block is our final destination
        if(nextBlock.x === endBlock.x && nextBlock.y === endBlock.y){
            console.log("[SYSTEM] : End reached > " + JSON.stringify({x: nextBlock.x, y: nextBlock.y}))
            onUpdate(openList, closedList)
            tracePath(nextBlock)
            
            return nextBlock
            break
        }

        // all possible neighbour nodes of the current node
        const neighbourNodes = getNeighbourNodes(nextBlock)

        // go thorugh all nodes to see which are valid
        for (let i = 0; i < neighbourNodes.length; i++) {

            // current search node
            const currentSearchNode = neighbourNodes[i]

            // final result
            let neighbourMatch = null

            // find matches to the potential neighbour nodes from the grid
            for (let i = 0; i < grid.length; i++) {
                const currentRow = grid[i]

                const currentNeighbour = currentRow.find((currentNode) => currentNode.x === currentSearchNode[0] && currentNode.y === currentSearchNode[1] )

                if(currentNeighbour){
                    neighbourMatch = currentNeighbour
                    break
                }
            }

            if(!neighbourMatch) {
                console.log("[SYSTEM] : No neighbour node found!")
            } else {

                if(isNodeValid(neighbourMatch, openList, closedList)){

                    const pastBlock = nextBlock
                    const newNode = openNewNode(neighbourMatch, endBlock, pastBlock)
                    openList.push(newNode)
                    onUpdate(openList, closedList)

                }

            }

        }
        
        closeNode(nextBlock, openList, closedList)
        onUpdate(openList, closedList)

    }
}
