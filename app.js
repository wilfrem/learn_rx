var Greeter = (function () {
    function Greeter(element) {
        this.element = element;
        this.element.innerHTML += "The time is: ";
        this.span = document.createElement('span');
        this.element.appendChild(this.span);
        this.span.innerText = new Date().toUTCString();
    }
    Greeter.prototype.start = function () {
        var _this = this;
        this.timerToken = setInterval(function () {
            return _this.span.innerHTML = new Date().toUTCString();
        }, 500);
    };

    Greeter.prototype.stop = function () {
        clearTimeout(this.timerToken);
    };
    return Greeter;
})();

window.onload = function () {
    var el = document.getElementById('content');
    var greeter = new Greeter(el);
    greeter.start();

    var source = new Rx.Subject();
    var stream = source.do(function (i) {
        return console.log("side effect");
    }).share();

    stream.subscribeOnNext(function (i) {
        return console.log("child1: " + i);
    });
    source.onNext(1);
    stream.subscribeOnNext(function (i) {
        return console.log("child2: " + i);
    });
    source.onNext(2);
};
//# sourceMappingURL=app.js.map
