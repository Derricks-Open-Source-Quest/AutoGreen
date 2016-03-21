
(function(window, document, $, VisualEvent){

  VisualEvent.parsers.push( function () {
    var elements = [], n, all = document.getElementsByTagName('*'),
        types = [ 'click', 'dblclick', 'mousedown', 'mousemove', 'mouseout',
                  'mouseover', 'mouseup', 'change', 'focus', 'blur', 'scroll',
                  'select', 'submit', 'keydown', 'keypress', 'keyup', 'load',
                  'unload' ],
        i, iLen, j, jLen = types.length;

    for ( i=0, iLen=all.length ; i<iLen ; i++ ) {
      for ( j=0 ; j<jLen ; j++ ) {
        if ( typeof all[i]['on'+types[j]] == 'function' ) {
          // Only insert events that are directly triggered from click and touch
          if (types[j] === "click" ||
              types[j] === "scroll" ||
              types[j] === "touchstart" ||
              types[j] === "touchend" ||
              types[j] === "touchmove")
          {
            elements.push({
              "node": all[i],
              "listeners": [{
                "type": types[j],
                "func": all[i]['on'+types[j]].toString(),
                "removed": false,
                "source": 'DOM 0 event'
              }]
            });
          }
        }
      }
    }
  
    return elements;
  });

})(window, document, jQuery, VisualEvent);
