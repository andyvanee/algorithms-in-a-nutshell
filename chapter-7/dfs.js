//
// DEPTH-FIRST SEARCH
// Figure 7-5
//

var storage = require('../storage_type').StorageType
,   solution = require('../lib').solution
;


//
// The search algorithm (mostly) as presented in Figure 7-5
//
function depthFirstSearch(initial, goal, _maxDepth) {
  var open     = storage.stack([initial])
  ,   closed   = storage.set()
  ,   s = solution()
  ,   maxDepth = _maxDepth ? _maxDepth : 20
  ,   explored = 1
  ;

  if (initial.eq(goal)) { s = solution(goal, explored) }

  while (open.length() && s.solved() === false) {
    var n = open.pop();

    closed.add(n.toString());

    n.moves(function(next) {
      explored += 1;
      if (closed.contains(next.toString())) return;
      if (next.eq(goal)) s = solution(next, explored);
      if (next.depth() < maxDepth) open.push(next);
    });
  }
  return s;
}

module.exports = depthFirstSearch;

