// Avoid `console` errors in browsers that lack a console.
(function () {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// Place any jQuery/helper plugins in here.

function rafThrottle(callback) {
    let requestId

    const later = (context, args) => () => {
        requestId = null
        callback.apply(context, args)
    }

    const throttled = function (...args) {
        if ((requestId === null) || (requestId === undefined)) {
            requestId = requestAnimationFrame(later(this, args))
        }
    }

    throttled.cancel = () =>
        cancelAnimationFrame(requestId)

    return throttled
}

function getPrice(htmlString) {
    return parseInt((htmlString || '').toString().replace(/\s+/gm, ''), 10);
}

function formatPrice(price) {
    return getPrice(price).toString().replace(/(\d)(?=(\d{3})$)/g, '$1<span class="hs"></span>');
}

var calculateAndSetTotal = function calculateAndSetTotal(inputs, totalSpan, totalInput) {
    return function () {
        var result = 0;

        inputs.filter(':checked').each(function (i, el) {
            result += getPrice(el.getAttribute('data-price'));
        });

        totalSpan.html(formatPrice(result));
        totalInput.val(result);
    };
};

function setCalculateTotal(id, form) {
    const priceInputs = $('[data-price]', form);
    const totalPriceSpan = $('.js-span-total-price', form);
    const totalPriceInput = $('.js-input-total-price', form);
    const calcFn = calculateAndSetTotal(priceInputs, totalPriceSpan, totalPriceInput);
    priceInputs.click(calcFn)
    $('label', form).click(calcFn)
    calcFn();
}