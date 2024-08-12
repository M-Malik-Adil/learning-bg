// /**
//  * @param {number[][]} matrix
//  * @return {number[]}
//  */
// var spiralOrder = function(matrix) {
//   if(matrix.length === 0) return [];
  
//   // initialize 

//   let result = [];
//   let top = 0;
//   let bottom = matrix.length-1; //2
//   let left = 0;
//   let right = matrix[0].length-1 //2

//   // now run the loop through the matrix
  
//   while(top<=bottom && left <= right){

//     // move from left to right and travers col from top
//     for(let col=left; col<=right; col++){
//         result.push(matrix[top][col])
//     }
//     top++;

//     // move from top to bottom and travers row form right

//     for(let row=top; row<=bottom; row++){
//         result.push(matrix[row][right]);
 
//     }
//     right--;

//     // if row still exit the trivers from left
//     if(top<=bottom){
//        for(let col=right; col>= left; col--){
//         result.push(matrix[bottom][col])
//        }
//        bottom--;
//     }


//     // if col still exit the trivers from top
//     if(left<= right){
//         for(let row = bottom; row>=top; row--){
//             result.push(matrix[row][left])
//         }
//         left++;
//     }


    
    
//   }
  

  

//    return result;
// };

// const matrix = [
//     [1, 2, 3, 4],
//     [5, 6, 7, 8],
//     [9, 10, 11, 12],
//     [13, 14, 15, 16]
// ];

// console.log('Spiral Order:', spiralOrder(matrix));

// ======================= Sudoku Solver ======================== //

// const _board = [
//     ['.', '9', '.', '.', '4', '2', '1', '3', '6'],
//     ['.', '.', '.', '9', '6', '.', '4', '8', '5'],
//     ['.', '.', '.', '5', '8', '1', '.', '.', '.'],
//     ['.', '.', '4', '.', '.', '.', '.', '.', '.'],
//     ['5', '1', '7', '2', '.', '.', '9', '.', '.'],
//     ['6', '.', '2', '.', '.', '.', '3', '7', '.'],
//     ['1', '.', '.', '8', '.', '4', '.', '2', '.'],
//     ['7', '.', '6', '.', '.', '.', '8', '1', '.'],
//     ['3', '.', '.', '.', '9', '.', '.', '.', '.'],
// ];
// sodokoSolver(_board);
// console.log(_board);

// function isValid(board, row, col, k) {
//     for (let i = 0; i < 9; i++) {
//         const m = 3 * Math.floor(row / 3) + Math.floor(i / 3);
//         const n = 3 * Math.floor(col / 3) + i % 3;
//         if (board[row][i] == k || board[i][col] == k || board[m][n] == k) {
//           return false;
//         }
//     }
//     return true;
// }


// function sodokoSolver(data) {
//   for (let i = 0; i < 9; i++) {
//     for (let j = 0; j < 9; j++) {
//       if (data[i][j] == '.') {
//         for (let k = 1; k <= 9; k++) {
//           if (isValid(data, i, j, k)) {
//             data[i][j] = `${k}`;
//           if (sodokoSolver(data)) {
//            return true;
//           } else {
//            data[i][j] = '.';
//           }
//          }
//        }
//        return false;
//      }
//    }
//  }
//  return true;
// }