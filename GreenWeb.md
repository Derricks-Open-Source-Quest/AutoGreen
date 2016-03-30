# GreenWeb

##TL; DR##

GreenWeb is a set of Web language extensions (defined as CSS rules) that guide the Web browser runtime to perform energy-efficiency optimizations. One needs to patch the browser to support it. As a proof of concept we have only Chromium support for now. The Chromium patch is at: https://codereview.chromium.org/1835303002/.

This readme file serves three purposes: explains what exactly is Greenweb; describes how to use GreenWeb in a Web application; provides instructions on how to patch Chromium to support GreenWeb.

##Introduction##

GreenWeb let developers specify two critical aspects of end-user QoS experience in mobile Web applications: QoS type and QoS target. Intuitively, QoS type characterizes whether users perceive QoS experience by interaction responsiveness or animation smoothness, and QoS target denotes the performance level that is required to deliver a desirable user experience for a specific QoS type.

Two QoS types exist: single and continuous:
* Some user interactions produce only a single frame, which we call the response frame. The QoS type of these interactions is “single,” indicating that user QoS experience is determined by the latency at which the response frame is perceived by users .
* The other QoS type is “continuous,” corresponding to interactions whose responses are not one single frame but a sequence of continuous frames. User QoS experience is determined by the latency of each frame in the sequence rather than one specific frame as in the “single” case.

Two types of QoS targets exist: imperceptible target and usable target:
* Imperceptible target (P<sub>i</sub>) delivers a latency that is imperceptible/instantaneous to users. Achieving a performance higher than P<sub>i</sub> does not add user perceptible value while unnecessarily wasting energy.
* Usable target (P<sub>u</sub>), in contrast, corresponds to a latency that can barely keep users engaged. Delivering a performance lower than P<sub>u</sub> may cause users to deem an application unusable and even abandon it.

Given the QoS type and target information, the GreenWeb runtime determines how to best deliver the QoS using the minimal energy consumption. As a proof of concept, we demonstrate one particular runtime implementation that leverages the [big/little ACMP architecture](https://en.wikipedia.org/wiki/ARM_big.LITTLE). It is also feasible to build a runtime leveraging only a single big (or little) core capable of DVFS. In addition, one could implement a GreenWeb runtime using pure software-level techniques, such as prioritizing resource loading or using power-conserving colors.

Having said this, the ACMP architecture is already widely adopted in today’s mobile SoCs shipped by major vendors such as [Samsung](https://www.arm.com/files/pdf/Heterogeneous_Multi_Processing_Solution_of_Exynos_5_Octa_with_ARM_bigLITTLE_Technology.pdf) and Qualcomm. We expect our implementation to be readily applicable on commodity mobile hardware. In fact, our implementation is prototyped on an [Odroid XU+E development board](http://www.hardkernel.com/main/products/prdt_info.php?g_code=G137463363079), which contains an Exynos 5410 SoC that is known for powering Samsung's Galaxy S4 smartphone.

##How to use GreenWeb: Syntax and Semantics##

GreenWeb is designed as extensions to existing CSS language. Intuitively, each GreenWeb rule selects a DOM element `E`, and declares CSS properties to express the QoS type and QoS target information when an event `onevent` is triggered on `E`. For example: `E:QoS{ onevent-type: continuous }` means as soon as `onevent` is triggered on DOM element `E`, the application must continuously optimize for frame latency *while minimizing energy consumption*.

####Supported Events####

GreenWeb primarily targets *mobile* Web applications. Therefore we support common events that can be triggered by fingertap and fingermove on a mobile device: `click`, `touchstart`, `touchend`, `touchmove`, and `click`.

####New Selector####

We add q pseudo-selector `:QoS`, indicating that a rule will be decorating the QoS information of a DOM node.

####New CSS Properties####

* `onevent-type` indicates the QoS type of `onevent` where `event` is one of the five supported events. It takes two values: `single` and `continuous`. By default, `click`, `touchstart`, and `touchend` have a QoS type of `single`; `touchmove` and `scroll` have a QoS type of `continuous`.
* `onevent-vpi` indicates the imperceptible QoS target. It takes a non-negative integer value and forms a time value with a millisecond unit. For instance, `onclick-vpi: 50` indicates that the imperceptible target of `onclick` event is `50 ms`.
* `onevent-vpu` indicates the usable QoS target with a similar semantics to `onevent-vpi`.
* `onevent-vduration` is a short-cut to specify the QoS target of the `single` events. It takes two values: `short` and `long`. When `short` is specified, `100 ms` and `300 ms` are used as the imperceptible and usable QoS target, respectively. When `long` is specified, `1000 ms` and `10000 ms` are used as the two targets.
  * `onevent-vduration` does not apply to `continuous` events. If used together with `onevent-type: continuous`, `onevent-vduration` will be ignored.
  * When specified together with `onevent-vpi` (or `onevent-vpu`), `onevent-vduration` will be ignored and the QoS targets will be set by user specified values.

##Patch Chromium to Support GreenWeb##

##Todo##

* Add support for maniputalating GreenWeb properties in JavaScript. Ideally we'd like to support something like:
```javascript
if ($( this ).css("onclick-type") == 'single') {
  $( this ).css("onclick-type", "continuous");
} else {
  $( this ).css("onclick-type", 'single');
  $( this ).css("onclick-vpi", "10");
  $( this ).css("onclick-vpu", "30");
}
```

* We must maintain the following order when the QoS properties are applied: Type --> Duration --> Pi/Pu. This is to make sure that the user specified values overwrite default ones. For that reason, the current implementation has to use the (ugly) names `vpi`, `vpu`, and `vduration` instead of the clean `pi`, `pu`, and `duration` because alphabetically `vpi` comes after `vduration`, which comes after `type`. The CSS style resolution engine of Chromium applies properties in alphabetical order. In the future, it would be ideal to adopt a multi-component CSS property using which we could specify everything in one line: `onevent-qos: type, [duration] | [pi, pu]`.
