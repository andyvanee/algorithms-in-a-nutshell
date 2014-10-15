var dfs = require('./dfs')
,   assertEqual = require('../lib').assertEqual
,   depthFirstSearch = dfs.depthFirstSearch
,   cell = dfs.cell
;

assertEqual(
  '1-4',
  depthFirstSearch(cell('0-0'), cell('1-4')).toString()
);

assertEqual(
  '0-8',
  depthFirstSearch(cell('0-0'), cell('0-8')).toString()
);

assertEqual(
  8,
  depthFirstSearch(cell('0-0'), cell('4-4')).depth(),
  "4-4 takes takes 8 moves to complete"
);

assertEqual(
  false,
  depthFirstSearch(cell('0-0'), cell('4-4'), 7),
  "Doesn't find the cell if it's further than maxDepth"
);
