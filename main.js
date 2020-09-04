// Get the Grid element in the main.js

let minesweeperGrid
const gridSize = 10 // making the Grid of 10 * 10 

window.onload = function () {
    minesweeperGrid = document.getElementById("minesweeperGrid")
    //Generating the Grid of cells on load 
    makeMineSweeperGrid()
};

function makeMineSweeperGrid() {
    //reset grid 
    minesweeperGrid.innerHTML = ''
    // Since we have two directions(row and columns) of cells applying loop in x and y direction to make cells 
    for (let rowIndex = 0; rowIndex < gridSize; rowIndex++) {
        // Inserting a <tr> and placing them into table based on rowIndex
        // can be used createElement('tr') IE NOt supported 
        const gridRow = minesweeperGrid.insertRow(rowIndex)
        for (let columnIndex = 0; columnIndex < gridSize; columnIndex++) {
            //Inserting cells inside the row 
            const gridCell = gridRow.insertCell(columnIndex)
            gridCell.onclick = function () {
                onClickCell(gridCell)
            }
            gridCell.setAttribute('data-isMine', false);
        }
    }
    //adding mines randomly to some cells 
    addMinesToCells()
}

function addMinesToCells() {
    for (let i = 0; i < 20; i++) {
        const rowNumber = Math.floor(Math.random() * 10)
        const colNumber = Math.floor(Math.random() * 10)
        // get the cell details 
        const cell = minesweeperGrid.rows[rowNumber].cells[colNumber]
        cell.setAttribute('data-isMine', true)
    }
}

function checkAdjacentCells(parentRowIndex, cellIndex,isRecursiveCheck) {
    // counting and displaying the no of adjecent mines 
    let mineCount = 0
    //Putting max method to avoid -1 case where rowIndex is 0
    // accessing the above and below rows by giving +1 and -1 in loop 
    for (let rowIndex = Math.max(parentRowIndex - 1, 0); rowIndex <= Math.min(parentRowIndex + 1, 9); rowIndex++) {
        // Now will access the cell +1 and -1 from current cell 
        for (let cellI = Math.max(cellIndex - 1, 0); cellI <= Math.min(cellIndex + 1, 9); cellI++) {
            //check flag that is mine or not 
            const cell = minesweeperGrid.rows[rowIndex].cells[cellI]
            if (cell.getAttribute('data-ismine') === 'true' && !isRecursiveCheck) {
                mineCount++
                //cell should not have mines 
            }else if(isRecursiveCheck && cell.innerHTML == ''){
                //check all adjacent cells 
                onClickCell(cell)
            }
        }
    }
    return mineCount
}

function showMines (){
    for (let rowIndex = 0; rowIndex < 10; rowIndex++) {
        for (let columnIndex = 0; columnIndex < 10; columnIndex++) {
            const cell = minesweeperGrid.rows[rowIndex].cells[columnIndex]
            cell.getAttribute("data-ismine") == "true" ? cell.classList.add("mine") : ''
        }
    }
}

function checkComplection(){
    // accessing all the cells for checking is all are filled or not 
    let isLevelComplected = true
    for (let rowIndex = 0; rowIndex < gridSize; rowIndex++) {
        for (let columnIndex = 0; columnIndex < gridSize; columnIndex++) {
            const cell = minesweeperGrid.rows[rowIndex].cells[columnIndex]
            // check cell should not have mine and should not be empty 
            if(cell.getAttribute('data-ismine') === 'true' && cell.innerHTML === ''){
                isLevelComplected = false
            }
        }
    }
    if(isLevelComplected){
        alert("You Win!");
        showMines()
    }
}



function onClickCell(cellDetails) {
    // Checking if the user has clicked on the mine or not 
    const isCellContainsMine = cellDetails.getAttribute("data-ismine") == "true"
    if (isCellContainsMine) {
        // if u got mine then hightlight all the available mines need to travel all the cells and check
        alert('Game Over')
        showMines()
    } else {
        // get parent row details where cell exists so that easy to calculate adjecent mines 
        const parentRowIndex = cellDetails.parentNode.rowIndex
        const cellIndex = cellDetails.cellIndex
        const minesNumber = checkAdjacentCells(parentRowIndex, cellIndex,false)
        cellDetails.innerHTML = minesNumber
        if(!minesNumber){
            checkAdjacentCells(parentRowIndex, cellIndex,true)
        }
        cellDetails.classList.add('tdColorChange')
        //Check for level complection if all are done 
        checkComplection()
    }
}
