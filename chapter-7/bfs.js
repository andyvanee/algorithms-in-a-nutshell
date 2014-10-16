//
// BREADTH-FIRST SEARCH
// Figure 7-8
//

var storage = require('../storage_type').StorageType
,   solution = require('../lib').solution
;

//
// The search algorithm (mostly) as presented in Figure 7-8
//
function breadthFirstSearch(initial, goal, _maxDepth) {
  var open     = storage.queue([initial])
  ,   closed   = storage.set()
  ,   s = solution()
  ,   maxDepth = _maxDepth ? _maxDepth : 20
  ,   explored = 1
  ;

  if (initial.eq(goal)) { s = solution(goal, explored) }

  while (open.length() && s.solved() === false) {
    var n = open.head();

    closed.add(n.toString());

    n.moves(function(next) {
      explored += 1;
      if (closed.contains(next.toString())) return;
      if (next.eq(goal)) s = solution(next, explored);
      if (next.depth() < maxDepth) open.insert(next);
    });
  }
  return s;
}

module.exports = breadthFirstSearch;
