var assertEqual = require('../lib').assertEqual
,   depthFirstSearch = require('./dfs')
,   breadthFirstSearch = require('./bfs')
,   aStar = require('./astar')
,   cell = require('../lib').cell
,   storage = require('../storage_type').StorageType
;

(function testDepthFirstSearch(){
  assertEqual(
    '1-4',
    depthFirstSearch(cell.two('0-0'), cell.two('1-4')).cell().toString()
  );

  assertEqual(
    '0-8',
    depthFirstSearch(cell.two('0-0'), cell.two('0-8')).cell().toString()
  );

  assertEqual(
    8,
    depthFirstSearch(cell.two('0-0'), cell.two('4-4')).cell().depth(),
    "4-4 takes takes 8 moves to complete"
  );

  assertEqual(
    false,
    depthFirstSearch(cell.two('0-0'), cell.two('4-4'), 7).solved(),
    "Doesn't find the cell if it's further than maxDepth"
  );

  assertEqual(
    8,
    depthFirstSearch(cell.two('0-0'), cell.two('2-1'), 3).explored()
  );
}());

(function testBreadthFirstSearch(){
  assertEqual(
    '0-0',
    breadthFirstSearch(cell.two('0-0'), cell.two('0-0')).cell().toString()
  );

  assertEqual(
    '4-6',
    breadthFirstSearch(cell.two('0-0'), cell.two('4-6')).cell().toString()
  );

  assertEqual(
    9,
    breadthFirstSearch(cell.two('0-0'), cell.two('2-1')).explored()
  );
}());

(function testRankedCells(){
  assertEqual(0, cell.rankedTwo('0-0', '0-0').rank());
  assertEqual(1, cell.rankedTwo('0-0', '0-1').rank());
  assertEqual(0, cell.rankedTwo('5-10', '5-10').rank());
  assertEqual(2, cell.rankedTwo('0-0', '0-0').moves().length);
  assertEqual(1, cell.rankedTwo('0-0', '0-1').moves().pop().depth());
  assertEqual(1, cell.rankedTwo('0-0', '0-1').moves().pop().rank());
  assertEqual(Infinity, cell.rankedTwo('1-1', '0-1').moves().pop().rank());
}());

(function testAStarSearch(){
  assertEqual('2-1', aStar(cell.two('0-0'), cell.two('2-1')).cell().toString());
  assertEqual(7,     aStar(cell.two('0-0'), cell.two('2-1')).explored());
  assertEqual(29,    aStar(cell.two('0-0'), cell.two('1-6')).explored()); // Seems large??
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
  pq.push({name: 'b', rank: function(){ return 4; }});
  pq.push({name: 'c', rank: function(){ return 4; }});

  assertEqual(3, pq.length());
  assertEqual('a', pq.pop().name);
  assertEqual('b', pq.pop().name);
  assertEqual('c', pq.pop().name);
  assertEqual(0, pq.length());
}());

console.log('*');
