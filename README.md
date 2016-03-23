# AutoGreen

AutoGreen is a system that automatically annotates (mobile) Web applications to enable energy-efficiency optimizations by the Web runtime. The annotations are called GreenWeb, which are Web language extensions that allow Web developers to express user QoS expectations at an abstract level. Based on programmer-guided QoS information the Web runtime dynamically determines how to deliver the target QoS experience while minimizing the energy consumption.

This is a project from the [Electrical and Computer Engineering Department](http://www.ece.utexas.edu/) at [The University of Texas at Austin](http://www.utexas.edu/). See the contributors and acknowledgement at the end for more information.

## Repo Structure

The high-level structure of this repo is as follows:

* `css/`: The CSS code of the AutoGreen panel.
* `js/`: The JavaScript code of the AutoGreen annotation logic.
* `build.sh`: The script that builds AutoGreen.
* `bookmarklet.html`: The bookmark generation page.
* `simple-https-server.py`: A simple python-based HTTPS server that can be use to host AutoGreen.
* `VisualEvents.README.md`: The original readme file of [Visual Events](https://github.com/DataTables/VisualEvent).
* `README.md`: This file.

## Installation and Usage

**Installation** AutoGreen works as a browser bookmarklet, which is essentially a piece of JavaScript code that gets injected to the end of a Web application. Install it in following steps:
* Build the AutoGreen code by `sh ./build.sh`. This will generate AutoGreen code in the `out/` directory. Supply the `c` commandline option (i.e., `sh ./build.sh c`) to compress the JavaScript code in AutoGreen. Supply the `d` option for generating [JSDoc](http://usejsdoc.org/) documentations for AutoGreen. Supply `cd` for doing both.
* Host AutoGreen in a HTTPS server because most browsers do not allow injecting code from the local file system to a webpage. The repo checkout contains a simple python-based HTTPS server. To use that simply run `python simple-https-server.py` in the repo directory.
* Open the bookmarklet generation page `bookmarklet.html` in a Web browser, and drag the *AutoGreen* link to your bookmark bar. For more details take a look at the code in `bookmarklet.html`. Otherwise you are all set!

**Usage** Navigate to the Web application (webpage) that you want to apply GreenWeb annotations to.
* Click *AutoGreen* on your browser bookmarklet bar. DOM nodes with JavaScript events will be highlighted.
* Move the mouse over any highlighted DOM node to display the AutoGreen panel which shows further event details. GreenWeb annotation information (at the bottom of the panel) is "Unknown" at this point.
* Click "trigger event" link on the AutoGreen panel to dispatch the selected event. After the event finishes execution, AutoGreen will automatically update the GreenWeb annotations.

## How AutoGreen Works

#### A Brief Introduction of GreenWeb Language Extensions

AutoGreen is a system that automatically annotates Web applications with GreenWeb language extensions. Here we provide a brief overview of GreenWeb. More details can be found in this paper.

GreenWeb let developers specify two critical aspects of end-user QoS experience in mobile Web applications: QoS type and QoS target. Intuitively, QoS type characterizes whether users perceive QoS experience by interaction responsiveness or animation smoothness, and QoS target denotes the performance level that is required to deliver a desirable user experience for a specific QoS type.

Two QoS types exist: single and continuous:
* Some user interactions produce only a single frame, which we call the response frame. The QoS type of these interactions is “single,” indicating that user QoS experience is determined by the latency at which the response frame is perceived by users .
* The other QoS type is “continuous,” corresponding to interactions whose responses are not one single frame but a sequence of continuous frames. User QoS experience is determined by the latency of each frame in the sequence rather than one specific frame as in the “single” case.

GreenWeb is designed as extensions to existing CSS language. Intuitively, each GreenWeb rule selects a DOM element `E`, and declares CSS properties to express the QoS type and QoS target information when an event `onevent` is triggered on `E`. For example: `E:QoS{ onevent-qos: continuous }` means as soon as `onevent` is triggered on DOM element `E`, the application must continuously optimize for frame latency.

#### How AutoGreen Applies GreenWeb Annotations

AutoGreen mainly consists of two phases. The first phase is to detect the JavaScript events associated with all DOM nodes in a Web application. The second phase is to detect the QoS information of each event.

For the event detection phase, AutoGreen owes a great debt of gratitude to <a href="https://github.com/DataTables/VisualEvent">Visual Events</a>, which automatically identifies the details of all JavaScript events associated with all DOM elements on a Web application (webpage). In fact, AutoGreen started as a fork of Visual Events. Take a look at Visual Events' [readme](VisualEvents.README.md) for more details of the event detection phase.

For the QoS detection phase, AutoGreen performs a profiling run of each event by explicitly triggering its callback function. During the callback execution, AutoGreen checks for certain conditions to determine an event’s QoS type as follows. An event’s QoS type is set to “continuous” if its callback function triggers a jQuery `animate()` function, a `rAF`, or a CSS transition/animation. Otherwise the QoS type is set to “single.”
* To detect `animate()` and `rAF`, we overload their original functions and check in the overloaded function.
* To detect CSS transition/animation, we register a `transitionend`/`animationend` event, which if triggered indicates that a CSS transition/animation exists.

As a proof-of-concept prototype, our current implementation does not yet support checking other ways of realizing animations, but could be trivially extended to do so by following a similar detection procedure as described above.

## Contributors and Acknowledgments

AutoGreen (and GreenWeb) is developed by [Yuhao Zhu](http://yuhaozhu.com/) at UT Austin. The project is advised by [Vijay Janapa Reddi](http://3nity.io/~vj/).

AutoGreen owes a great debt of gratitude to [Visual Events](https://github.com/DataTables/VisualEvent) and its author [Allan Jardine](http://sprymedia.co.uk/about).
