function assertEqual(a, b) {
  if (a === b) { process.stdout.write('.') }
  else { console.log('Failed assertEqual: ' + a + ' == ' + b) }
}

//
// A cell is constructed from a string like "0-0"
//
function cell2(str, optionalDepth) {
  var parts = str.split('-')
  ,   depth = optionalDepth ? optionalDepth : 0
  ;

  return {
    // The search depth, which is incremented each generation
    depth: function() { return depth },
    // A string representation
    toString: function() { return str },
    // The left-hand value
    x: function() { return parseInt(parts[0]) },
    // The right-hand value
    y: function() { return parseInt(parts[1]) },
    // Iterate the next available moves with the supplied callback
    moves: function(cb) {
      return [
        cell2([this.x()+1, this.y()  ].join('-'), this.depth()+1),
        cell2([this.x()  , this.y()+1].join('-'), this.depth()+1)
      ].forEach(cb)
    },
    // Check if this cell is equivalent to another given cell
    eq: function(other) {
      return (other.toString() == this.toString())
    }
  };
}

function rankedCell(str, target, depth){
  var delegate = cell2(str, depth)
  ,   targetCell = cell2(target)
  ,   self = {}
  ;

  for (var i in delegate) {
    self[i] = delegate[i]
  }

  function gStar() {
    return delegate.depth();
  }

  function fStar() {
    return (targetCell.x() - delegate.x()) + (targetCell.y() - delegate.y());
  }

  self.rank = function(){
    return gStar() + fStar();
  }

  self.moves = function(cb){
    var rankedCells = [];
    delegate.moves(function(innerCell){
      var innerRanked = rankedCell(innerCell.toString(), target, innerCell.depth());
      rankedCells.push(innerRanked);
      if (cb) { cb(innerRanked) }
    })
    return rankedCells;
  }

  return self;
}

function solution(cell, explored) {
  cell = cell ? cell : false;
  explored = explored > 0 ? explored : 0;
  return {
    cell: function() { return cell },
    explored: function() { return explored },
    solved: function(){
      return this.cell() !== false;
    }
  }
}

module.exports = {
  assertEqual: assertEqual,
  cell2: cell2,
  rankedCell: rankedCell,
  solution: solution
}
