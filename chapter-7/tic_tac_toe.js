function ticTacToe(initialState){
  var s = initialState || [0,0,0, 0,0,0, 0,0,0];
  return {
    winning: function() {
      return (
        s[0] << s[1] << s[2] == 4 || // horizontal
        s[3] << s[4] << s[5] == 4 ||
        s[6] << s[7] << s[8] == 4 ||
        s[0] << s[3] << s[6] == 4 || // vertical
        s[1] << s[4] << s[7] == 4 ||
        s[2] << s[5] << s[8] == 4 ||
        s[0] << s[4] << s[8] == 4 || // diagonal
        s[2] << s[4] << s[6] == 4
      );
    },
    losing: function() {
      return this.reflection().winning();
    },
    reflection: function() {
      return ticTacToe(s.map(function(elem){
        return elem == 0 ? 0 : elem == 1 ? -1 : 1
      }));
    },
    toString: function(){
      return [
        [s[0],s[1],s[2]].join(' '),
        [s[3],s[4],s[5]].join(' '),
        [s[6],s[7],s[8]].join(' ')
      ].join('\n')
    }
  }
}

module.exports = ticTacToe;
