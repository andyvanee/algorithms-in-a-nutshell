var assertEqual = require('../lib').assertEqual
,   depthFirstSearch = require('./dfs')
,   breadthFirstSearch = require('./bfs')
,   aStar = require('./astar')
,   cell2 = require('../lib').cell2
,   rankedCell = require('../lib').rankedCell
,   storage = require('../storage_type').StorageType
;

(function testDepthFirstSearch(){
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
    8,
    depthFirstSearch(cell2('0-0'), cell2('2-1'), 3).explored()
  );
}());

(function testBreadthFirstSearch(){
  assertEqual(
    '0-0',
    breadthFirstSearch(cell2('0-0'), cell2('0-0')).cell().toString()
  );

  assertEqual(
    '4-6',
    breadthFirstSearch(cell2('0-0'), cell2('4-6')).cell().toString()
  );

  assertEqual(
    9,
    breadthFirstSearch(cell2('0-0'), cell2('2-1')).explored()
  );
}());

(function testRankedCells(){
  assertEqual(0, rankedCell('0-0', '0-0').rank());
  assertEqual(1, rankedCell('0-0', '0-1').rank());
  assertEqual(0, rankedCell('5-10', '5-10').rank());
  assertEqual(2, rankedCell('0-0', '0-0').moves().length);
  assertEqual(1, rankedCell('0-0', '0-1').moves().pop().depth());
  assertEqual(1, rankedCell('0-0', '0-1').moves().pop().rank());
}());

(function testStorageTypes(){
  var s = storage.set();
  assertEqual(false, s.contains('a'));
  s.add('a');
  assertEqual(true, s.contains('a'));
  s.remove('a');
  assertEqual(false, s.contains('a'));

  var pq = storage.priorityQueue();
  pq.push({name: 'a', rank: function(){ return 1; }});
  pq.push({name: 'b', rank: function(){ return 2; }});
  pq.push({name: 'c', rank: function(){ return 2; }});

  assertEqual(3, pq.length());
  assertEqual('c', pq.pop().name);
  assertEqual('b', pq.pop().name);
  assertEqual('a', pq.pop().name);
  assertEqual(0, pq.length());
}());
