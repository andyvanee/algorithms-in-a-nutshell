var spec = require('../spec')
,   depthFirstSearch = require('./dfs')
,   breadthFirstSearch = require('./bfs')
,   aStar = require('./astar')
,   cell = require('../lib').cell
,   storage = require('../storage_type').StorageType
;

spec('depthFirstSearch', function(s){
  s.assertEqual(
    '1-4',
    depthFirstSearch(cell.two('0-0'), cell.two('1-4')).cell().toString()
  );

  s.assertEqual(
    '0-8',
    depthFirstSearch(cell.two('0-0'), cell.two('0-8')).cell().toString()
  );

  s.assertEqual(
    8,
    depthFirstSearch(cell.two('0-0'), cell.two('4-4')).cell().depth(),
    "4-4 takes takes 8 moves to complete"
  );

  s.assertEqual(
    false,
    depthFirstSearch(cell.two('0-0'), cell.two('4-4'), 7).solved(),
    "Doesn't find the cell if it's further than maxDepth"
  );

  s.assertEqual(
    8,
    depthFirstSearch(cell.two('0-0'), cell.two('2-1'), 3).explored()
  );
});

spec('testBreadthFirstSearch', function(s){
  s.assertEqual(
    '0-0',
    breadthFirstSearch(cell.two('0-0'), cell.two('0-0')).cell().toString()
  );

  s.assertEqual(
    '4-6',
    breadthFirstSearch(cell.two('0-0'), cell.two('4-6')).cell().toString()
  );

  s.assertEqual(
    9,
    breadthFirstSearch(cell.two('0-0'), cell.two('2-1')).explored()
  );
});

spec('testRankedCells', function(s){
  s.assertEqual(0, cell.rankedTwo('0-0', '0-0').rank());
  s.assertEqual(1, cell.rankedTwo('0-0', '0-1').rank());
  s.assertEqual(0, cell.rankedTwo('5-10', '5-10').rank());
  s.assertEqual(2, cell.rankedTwo('0-0', '0-0').moves().length);
  s.assertEqual(1, cell.rankedTwo('0-0', '0-1').moves().pop().depth());
  s.assertEqual(1, cell.rankedTwo('0-0', '0-1').moves().pop().rank());
  s.assertEqual(Infinity, cell.rankedTwo('1-1', '0-1').moves().pop().rank());
});

spec('testAStarSearch', function(s){
  s.assertEqual('2-1', aStar(cell.two('0-0'), cell.two('2-1')).cell().toString());
  s.assertEqual(7,     aStar(cell.two('0-0'), cell.two('2-1')).explored());
  s.assertEqual(29,    aStar(cell.two('0-0'), cell.two('1-6')).explored()); // Seems large??
});

spec('testStorageTypes', function(s){
  var set = storage.set();
  s.assertEqual(false, set.contains('a'));
  set.add('a');
  s.assertEqual(true, set.contains('a'));
  set.remove('a');
  s.assertEqual(false, set.contains('a'));

  var pq = storage.priorityQueue();
  pq.push({name: 'a', rank: function(){ return 1; }});
  pq.push({name: 'b', rank: function(){ return 4; }});
  pq.push({name: 'c', rank: function(){ return 4; }});

  s.assertEqual(3, pq.length());
  s.assertEqual('a', pq.pop().name);
  s.assertEqual('b', pq.pop().name);
  s.assertEqual('c', pq.pop().name);
  s.assertEqual(0, pq.length());
});
