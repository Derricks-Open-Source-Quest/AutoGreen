
(function(window, document, $, VisualEvent){

  VisualEvent.parsers.push( function () {
    var elements = [], n, all = document.getElementsByTagName('*'),
        types = [ 'click', 'dblclick', 'mousedown', 'mousemove', 'mouseout',
                  'mouseover', 'mouseup', 'change', 'focus', 'blur', 'scroll',
                  'select', 'submit', 'keydown', 'keypress', 'keyup', 'load',
                  'unload' ],
        i, iLen, j, jLen = types.length;

    //function asyncPush(elements, node, type, func) {
    //  // http://stackoverflow.com/questions/12959006/javascript-variables-undefined-within-settimeout-function
    //  // settimeout doesn't pass arguments
    //  setTimeout(function() {
    //    elements.push({
    //      "node": node,
    //      "QoSType": QoSType,
    //      "listeners": [{
    //        "type": type,
    //        "func": func,
    //        "removed": false,
    //        "source": 'DOM 0 event'
    //      }]
    //    });
    //  }, 20);
    //}

    for ( i=0, iLen=all.length ; i<iLen ; i++ ) {
      for ( j=0 ; j<jLen ; j++ ) {
        if ( typeof all[i]['on'+types[j]] == 'function' ) {

          var QoSType = "undef";
          var elem = all[i];

          if (types[j] == "click") {
            QoSType = "single";

            // rAF
            // Hijack rAF in case we want to do more later.
            var originalrAF = requestAnimationFrame;
            requestAnimationFrame = function(callback){
              QoSType = "continuous";
              QoSType += " :rAF";
              originalrAF(function(){
                callback();
              });
            }

            //asyncPush(elements, all[i], types[j], all[i]['on'+types[j]].toString());

            // CSS Transition
            var style = window.getComputedStyle(elem);
            if (style.getPropertyValue('transition') !== 'all 0s ease 0s') {
              QoSType = "continuous";
              QoSType += " :CSSTransition";
              // TODO: trigger click, wait for |duration| second, and see if
              // the ontransitioned callback is executed.
              //elem.addEventListener("transitionend", function () {
              //  QoSType = "continuous";
              //}, true);
            }
            elem.click();
          }
          else if (types[j] == "scroll") {
            QoSType = "continuous";
            QoSType += " :scroll";
          }

          elements.push({
            "node": all[i],
            "QoSType": QoSType,
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
