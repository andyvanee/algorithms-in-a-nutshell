var assertEqual = require('../lib').assertEqual
,   depthFirstSearch = require('./dfs')
,   breadthFirstSearch = require('./bfs')
,   cell2 = require('../lib').cell2
;

assertEqual(
  '1-4',
  depthFirstSearch(cell2('0-0'), cell2('1-4')).cell().toString()
);

assertEqual(
  '0-8',
  depthFirstSearch(cell2('0-0'), cell2('0-8')).cell().toString()
);

assertEqual(
  8,
  depthFirstSearch(cell2('0-0'), cell2('4-4')).cell().depth(),
  "4-4 takes takes 8 moves to complete"
);

assertEqual(
  false,
  depthFirstSearch(cell2('0-0'), cell2('4-4'), 7).solved(),
  "Doesn't find the cell if it's further than maxDepth"
);

assertEqual(
  '0-0',
  breadthFirstSearch(cell2('0-0'), cell2('0-0')).cell().toString()
);

assertEqual(
  '4-6',
  breadthFirstSearch(cell2('0-0'), cell2('4-6')).cell().toString()
);
