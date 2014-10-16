//
// A*SEARCH
// Figure 7-10
//

var storage = require('../storage_type').StorageType
,   solution = require('../lib').solution
,   rankedCell = require('../lib').rankedCell
;

//
// The search algorithm (mostly) as presented in Figure 7-10
//
function aStar(initial, goal) {
  var initialRanked = rankedCell(initial.toString(), goal.toString())
  ,   open     = storage.priorityQueue([initialRanked])
  ,   closed   = storage.set()
  ,   s = solution()
  ,   explored = 1
  ;

  if (initial.eq(goal)) { return solution(goal, explored) }

  while (open.length() && s.solved() === false) {
    var n = open.pop();
    closed.add(n.toString(), n);

    if (n.eq(goal)) { s = solution(n, explored) }

    explored++;

    n.moves(function(next){
      if (closed.contains(next.toString())) {
        var prior = closed.get(next.toString());
        if (next.rank() < prior.rank()) {
          closed.remove(prior.toString());
          open.push(next);
        }
      } else {
        open.push(next);
      }
    });
  }

  return s;
}

module.exports = aStar;
