var assertEqual = require('../lib').assertEqual
,   ticTacToe = require('./tic_tac_toe')
;

(function ticTacToeSpec(){
  assertEqual(false, ticTacToe().winning());
  assertEqual(true, ticTacToe([1,1,1,0,0,0,0,0,0]).winning());
  assertEqual(true, ticTacToe([0,1,0,0,1,0,0,1,0]).winning());
  assertEqual(true, ticTacToe([0,0,1,0,1,0,1,0,0]).winning());

  assertEqual(false, ticTacToe().losing());
  assertEqual(true, ticTacToe([-1,-1,-1,0,0,0,0,0,0]).losing());
}());

console.log('*');
