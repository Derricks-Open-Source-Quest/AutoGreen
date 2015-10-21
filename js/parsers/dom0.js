
(function(window, document, $, VisualEvent){

  VisualEvent.parsers.push( function () {
    var elements = [], n, all = document.getElementsByTagName('*'),
        types = [ 'click', 'dblclick', 'mousedown', 'mousemove', 'mouseout',
                  'mouseover', 'mouseup', 'change', 'focus', 'blur', 'scroll',
                  'select', 'submit', 'keydown', 'keypress', 'keyup', 'load',
                  'unload' ],
        i, iLen, j, jLen = types.length;

    var QoSType, TypeReason;

    // Hijack rAF
    var originalrAF = requestAnimationFrame;
    requestAnimationFrame = function(callback){
      QoSType = "continuous";
      TypeReason = "[rAF]";
      originalrAF(function(){
        callback();
      });
    }

    // CSS Transition
    for ( i=0, iLen=all.length ; i<iLen ; i++ ) {
      for ( j=0 ; j<jLen ; j++ ) {
        if ( typeof all[i]['on'+types[j]] == 'function' ) {
          QoSType = "single";
          TypeReason = "[general]"

          var elem = all[i];
          var style = window.getComputedStyle(elem);
          if (style.getPropertyValue('transition') !== 'all 0s ease 0s') {
            QoSType = "continuous";
            TypeReason = "[CSSTransition]";
            // TODO: Ideally we want detect QoSType in the callback
            //elem.addEventListener("transitionend", function () {
            //  QoSType = "continuous";
            //  QoSType += " :CSSTransition";
            //}, true);
          }

          if (types[j] == "click") {
            //elem.click();
          }
          else if (types[j] == "scroll") {
            QoSType = "continuous";
            TypeReason = "[scroll]";
          }

          elements.push({
            "node": all[i],
            "QoSType": QoSType+" "+TypeReason,
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
  
    return elements;
  });

})(window, document, jQuery, VisualEvent);
