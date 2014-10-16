var assertEqual = require('../lib').assertEqual
,   depthFirstSearch = require('./dfs')
,   breadthFirstSearch = require('./bfs')
,   cell2 = require('../lib').cell2
,   storage = require('../storage_type').StorageType
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
  8,
  depthFirstSearch(cell2('0-0'), cell2('2-1'), 3).explored()
);

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

(function(){
  // Testing the StorageType implementations
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
