var cell = {
  //
  // A cell.two is constructed from a string like "0-0"
  //
  two: function(str, optionalDepth) {
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
          cell.two([this.x()+1, this.y()  ].join('-'), this.depth()+1),
          cell.two([this.x()  , this.y()+1].join('-'), this.depth()+1)
        ].forEach(cb)
      },
      // Check if this cell is equivalent to another given cell
      eq: function(other) {
        return (other.toString() == this.toString())
      }
    };
  },

  //
  // cell.rankedTwo wraps cell.two but implements a ranking mechanism as
  // described in the first paragraphs of A*Search in the book.
  //
  rankedTwo: function(str, target, depth){
    var delegate = cell.two(str, depth)
    ,   targetCell = cell.two(target)
    ,   self = {}
    ;

    // copy all delegate methods to self
    for (var i in delegate) { self[i] = delegate[i] }

    function gStar() { return delegate.depth() }
    function fStar() {
      if (targetCell.x() < delegate.x() || targetCell.y() < delegate.y()) {
        return Infinity; // the cell is past the target on either axis
      }
      return (targetCell.x() - delegate.x()) + (targetCell.y() - delegate.y());
    }

    self.rank = function(){
      return gStar() + fStar();
    }

    // cell.two.moves must be wrapped to return ranked cells
    self.moves = function(cb){
      var rankedCells = [];
      delegate.moves(function(innerCell){
        var innerRanked = cell.rankedTwo(innerCell.toString(), target, innerCell.depth());
        rankedCells.push(innerRanked);
        if (cb) { cb(innerRanked) }
      })
      return rankedCells;
    }
    return self;
  }
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
  cell: cell,
  solution: solution
}
