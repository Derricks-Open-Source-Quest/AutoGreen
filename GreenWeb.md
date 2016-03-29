# GreenWeb

**TL; DR**: GreenWeb is a set of Web language extensions (defined as CSS rules) that guide the Web browser runtime to perform energy-efficiency optimizations. One needs to patch the browser to support it. As a proof of concept we have only Chromium support for now. The Chromium patch is at: https://codereview.chromium.org/1835303002/.

This readme file serves three purposes: explains what exactly is Greenweb; describes how to use GreenWeb in a Web application; provides instructions on how to patch Chromium to support GreenWeb.

##Introduction##

GreenWeb let developers specify two critical aspects of end-user QoS experience in mobile Web applications: QoS type and QoS target. Intuitively, QoS type characterizes whether users perceive QoS experience by interaction responsiveness or animation smoothness, and QoS target denotes the performance level that is required to deliver a desirable user experience for a specific QoS type.

Two QoS types exist: single and continuous:
* Some user interactions produce only a single frame, which we call the response frame. The QoS type of these interactions is “single,” indicating that user QoS experience is determined by the latency at which the response frame is perceived by users .
* The other QoS type is “continuous,” corresponding to interactions whose responses are not one single frame but a sequence of continuous frames. User QoS experience is determined by the latency of each frame in the sequence rather than one specific frame as in the “single” case.

Two types of QoS targets exist: imperceptible target and usable target:
* Imperceptible target (T<sub>i</sub>) delivers a latency that is imperceptible/instantaneous to users. Achieving a performance higher than T<sub>i</sub> does not add user perceptible value while unnecessarily wasting energy.
* Usable target (T<sub>u</sub>), in contrast, corresponds to a latency that can barely keep users engaged. Delivering a performance lower than T<sub>u</sub> may cause users to deem an application unusable and even abandon it.

GreenWeb is designed as extensions to existing CSS language. Intuitively, each GreenWeb rule selects a DOM element `E`, and declares CSS properties to express the QoS type and QoS target information when an event `onevent` is triggered on `E`. For example: `E:QoS{ onevent-type: continuous }` means as soon as `onevent` is triggered on DOM element `E`, the application must continuously optimize for frame latency. See below for detailed syntax and semantics.

##How to use GreenWeb: Syntax and Semantics##

##Patch Chromium to Support GreenWeb##
