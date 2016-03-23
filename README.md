# AutoGreen

AutoGreen is a system that automatically annotates (mobile) Web applications to enable energy-efficiency optimizations by the Web runtime. The annotations are called GreenWeb, which are Web language extensions that allow Web developers to express user QoS expectations at an abstract level. Based on programmer-guided QoS information the Web runtime dynamically determines how to deliver the target QoS experience while minimizing the energy consumption.

This is a project from the [Electrical and Computer Engineering Department](http://www.ece.utexas.edu/) at [The University of Texas at Austin](http://www.utexas.edu/). See the contributors and acknowledgement at the end for more information.

## Overview

AutoGreen works as a browser bookmarklet, which is essentially a piece of JavaScript code that gets injected to the end of a Web application. The following JavaScript code in the textarea is the code that will be injected.  To generate the AutoGreen bookmarklet, drag the <i>AutoGreen</i> link to your bookmarklet bar. To change the injected code, you could simply modify the code in the textarea below and the <i>AutoGreen</i> link will be dynamically updated. Do not forget to drag the <i>AutoGreen</i> link to the bookmarklet bar again after changes are made.

AutoGreen owes a great debt of gratitude to <a href="https://github.com/DataTables/VisualEvent">Visual Events</a>, which automatically identifies details of all JavaScript events associated with all DOM elements on a Web application (webpage).

## Contributors and Acknowledgments
AutoGreen (and GreenWeb) is developed by [Yuhao Zhu](http://yuhaozhu.com/) at UT Austin. The project is advised by [Vijay Janapa Reddi](http://3nity.io/~vj/).

AutoGreen owes a great debt of gratitude to [Visual Events](https://github.com/DataTables/VisualEvent) and its author [Allan Jardine](http://sprymedia.co.uk/about).
