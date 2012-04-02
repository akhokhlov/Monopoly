/**
 * name
 * @param {type} param 
 */
 function MultiDimensionalArray(numRows,numCols)
{
    var thisRow, thisColumn;
    var arrayRet = new Array(numRows);
    
    for(thisRow=0; thisRow<numRows; thisRow++) {
       arrayRet[thisRow] = new Array(numCols);
       for (thisColumn=0; thisColumn < numCols; thisColumn++)
       {
           arrayRet[thisRow][thisColumn] = -1;
       }	
    }	
    return(arrayRet);
}