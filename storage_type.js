(function(global){
  global.StorageType = {
    //
    // Implementation of set, using the keys of a hash
    //
    set: function(initialArray) {
      initialArray = initialArray ? initialArray : [];

      var set = {};

      initialArray.forEach(function(elem){
        set[elem] = true;
      });

      return {
        add:      function(k) { set[k] = true },
        remove:   function(k) { delete set[k] },
        contains: function(k) { return (k in set) }
      }
    },

    //
    // Implementation of stack, using an array (LIFO)
    //
    stack: function(initialArray) {
      initialArray = initialArray ? initialArray : [];

      var stack = Array.prototype.slice.call(initialArray);

      return {
        length: function() { return stack.length },
        pop: function(){ return stack.pop() },
        push: function(val) { return stack.push(val) }
      }
    },

    //
    // Implementation of queue, using an array (FIFO)
    //
    queue: function(initialArray) {
      initialArray = initialArray ? initialArray : [];

      var queue = Array.prototype.slice.call(initialArray);

      return {
        length: function() { return queue.length },
        head: function() { return queue.shift() },
        insert: function(val) { return queue.push(val) }
      }
    }
  }
})(typeof module !== 'undefined' && module.exports ? module.exports : this);
