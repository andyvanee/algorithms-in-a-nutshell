var spec = require('../spec')
,   ticTacToe = require('./tic_tac_toe')
;

spec('ticTacToeSpec', function(s){
  s.assertEqual(false, ticTacToe().winning());
  s.assertEqual(true, ticTacToe([1,1,1,0,0,0,0,0,0]).winning());
  s.assertEqual(true, ticTacToe([0,1,0,0,1,0,0,1,0]).winning());
  s.assertEqual(true, ticTacToe([0,0,1,0,1,0,1,0,0]).winning());

  s.assertEqual(false, ticTacToe().losing());
  s.assertEqual(true, ticTacToe([-1,-1,-1,0,0,0,0,0,0]).losing());
});
