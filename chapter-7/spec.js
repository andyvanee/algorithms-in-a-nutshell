var assertEqual = require('../lib').assertEqual
,   depthFirstSearch = require('./dfs').depthFirstSearch
,   cell2 = require('../lib').cell2
;

assertEqual(
  '1-4',
  depthFirstSearch(cell2('0-0'), cell2('1-4')).toString()
);

assertEqual(
  '0-8',
  depthFirstSearch(cell2('0-0'), cell2('0-8')).toString()
);

assertEqual(
  8,
  depthFirstSearch(cell2('0-0'), cell2('4-4')).depth(),
  "4-4 takes takes 8 moves to complete"
);

assertEqual(
  false,
  depthFirstSearch(cell2('0-0'), cell2('4-4'), 7),
  "Doesn't find the cell if it's further than maxDepth"
);
