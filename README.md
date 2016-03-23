# AutoGreen

AutoGreen is a system that automatically annotates (mobile) Web applications to enable energy-efficiency optimizations by the Web runtime. The annotations are called GreenWeb, which are Web language extensions that allow Web developers to express user QoS expectations at an abstract level. Based on programmer-guided QoS information the Web runtime dynamically determines how to deliver the target QoS experience while minimizing the energy consumption.

This is a project from the [Electrical and Computer Engineering Department](http://www.ece.utexas.edu/) at [The University of Texas at Austin](http://www.utexas.edu/). See the contributors and acknowledgement at the end for more information.

## Repo Structure

The high-level structure of this repo is as follows:

* `css/`: The CSS code of the AutoGreen panel
* `js/`: The JavaScript code of the AutoGreen annotation logic
* `build.sh`: The script that builds AutoGreen
* `bookmarklet.html`: The bookmark generation page
* `simple-https-server.py`: A simple python-based HTTPS server that can be use to host AutoGreen
* `VisualEvents.README.md`: The original readme file of [Visual Events](https://github.com/DataTables/VisualEvent)
* `README.md`: This file

## Installation and Usage

**Installation** AutoGreen works as a browser bookmarklet, which is essentially a piece of JavaScript code that gets injected to the end of a Web application. Install it in following steps:
* Build the AutoGreen code by `sh ./build.sh`. This will generate AutoGreen code in the `out/` directory. Supply the `c` commandline option (i.e., `sh ./build.sh c`) to compress the JavaScript code in AutoGreen. Supply the `d` option for generating [JSDoc](http://usejsdoc.org/) documentations for AutoGreen. Supply `cd` for doing both.
* Host AutoGreen in a HTTPS server because most browsers do not allow loading resources from the local file system. The repo checkout contains a simple python-based HTTPS server. To use that simply run `python simple-https-server.py` in the repo directory.
* Open the bookmarklet generation page `bookmarklet.html` in a Web browser, and drag the *AutoGreen* link to your bookmark bar. For more details take a look at the code in `bookmarklet.html`. Otherwise, that's all!

**Usage** Navigate to the Web application (webpage) that you want to apply GreenWeb annotations to.
* Click *AutoGreen* on your browser bookmarklet bar. DOM nodes with JavaScript events will be highlighted.
* Move the mouse over any highlighted DOM node to display the AutoGreen panel which shows further event details. GreenWeb annotation information (at the bottom of the panel) is "Unknown" at this point.
* Click "trigger event" link on the AutoGreen panel to dispatch an event. After the event finishes execution, AutoGreen will automatically update the GreenWeb annotations.

## How does AutoGreen Work

AutoGreen owes a great debt of gratitude to <a href="https://github.com/DataTables/VisualEvent">Visual Events</a>, which automatically identifies details of all JavaScript events associated with all DOM elements on a Web application (webpage).

## Contributors and Acknowledgments

AutoGreen (and GreenWeb) is developed by [Yuhao Zhu](http://yuhaozhu.com/) at UT Austin. The project is advised by [Vijay Janapa Reddi](http://3nity.io/~vj/).

AutoGreen owes a great debt of gratitude to [Visual Events](https://github.com/DataTables/VisualEvent) and its author [Allan Jardine](http://sprymedia.co.uk/about).
