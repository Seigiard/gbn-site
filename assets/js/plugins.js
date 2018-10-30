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

function isNumber(value) {
    return typeof value === 'number' && isFinite(value);
}

function getPrice(htmlString) {
    if (isNumber(htmlString)) {
        return htmlString;
    }
    return parseInt((htmlString || '').toString().replace(/\s+/gm, ''), 10);
}

function formatPrice(price) {
    return getPrice(price).toString().replace(/(\d)(?=(\d{3})$)/g, '$1<span class="hs"></span>');
}

function calculateTotal(inputs) {
    var result = 0;

    inputs.filter(':checked').each(function (i, el) {
        result += getPrice(el.getAttribute('data-price'));
    });

    return result;
};

function setCalculateTotal(form) {
    const priceInputs = $('[data-price]', form);
    const totalPriceSpan = $('.js-span-total-price', form);
    const totalPriceInput = $('.js-input-total-price', form);
    const $disabledButton = $('button[type="submit"]', form);

    // const calcFn = calculateAndSetTotal(priceInputs, totalPriceSpan, totalPriceInput);
    const calcFn = rafThrottle(() => {
        const total = calculateTotal(priceInputs);
        totalPriceSpan.html(formatPrice(total));
        totalPriceInput.val(total);
        if (total > 0) {
            $disabledButton.prop('disabled', false);
            form.prop('invalid', false);
        } else {
            $disabledButton.attr('disabled', true);
            form.prop('invalid', true);
        }
    })

    priceInputs.click(calcFn)
    $('label', form).click(calcFn)
    calcFn();
}


function initForm(id, form) {
    const $form = $(form);
    const $errorMessage = $('.error-message', $form);
    const $resetButtons = $('button[reset-form]', $form);
    const $disabledButtons = $('button[disable-on-submit]', $form);
    const $disabledInputs = $('input[disable-on-submit]', $form);
    const $inputs = $(':input:not([disable-on-submit])', $form);

    function enableInputs() {
        if ($form.prop('invalid')) {
            return
        }
        $disabledButtons.prop('disabled', false).removeClass('disabled');
        enableInputsOnly();
    }

    function enableInputsOnly() {
        if ($form.prop('invalid')) {
            return
        }
        $disabledInputs.removeClass('disabled');
    }

    function disableInputs() {
        if ($form.prop('invalid')) {
            return
        }
        $disabledButtons.prop('disabled', true).addClass('disabled');
        $disabledInputs.addClass('disabled');
    }

    $form.submit(function (event) {
        event.preventDefault();

        $.ajax({
            type: "POST",
            url: $form.attr('action'),
            data: $form.serialize(),
            success: function (r) {
                if (r.status !== 'sent') {
                    const errors = (r.error || '').split(':').map(x => x.trim());
                    errors[0] && $errorMessage.text(errors[0]);
                    $form.attr('error', true);
                    return;
                }
                $form.removeAttr('error');
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                $form.attr('error', true);
            }
        });

        disableInputs();
    });

    $inputs.on('blur focus input change', enableInputs);
    $disabledInputs.on('click', enableInputsOnly);
    $disabledInputs.on('input', enableInputs);
    $resetButtons.on('click', () => {
        enableInputs();
        $form.removeAttr('error');
        $errorMessage.text('He получилось')
    });

    if ($form.is('[calculate-total]')) {
        setCalculateTotal($form);
    }

    $('[save][id]', $form).savy('load');
    $('[price-mask]', $form).inputmask({
        "mask": "9{1,30}",
        showMaskOnFocus: false,
        showMaskOnInput: false
    });
    $('[phone-mask]', $form).each(function(id, el) {
        const $el = $(el);
        const form = $el.closest('form');
        const submit = form.find('button[type="submit"]')
        const disableSubmit = () => {
            submit.not(':disabled').prop('disabled', true);
            form.prop('invalid', true);
        }
        const enableSubmit = () => {
            submit.is(':disabled') && submit.prop('disabled', false);
            form.prop('invalid', false);
        }
        const validForm = () => {
            if($el.inputmask("isComplete")) {
                enableSubmit();
            } else {
                disableSubmit();
            }
        }
        $el.inputmask("+7 999 999-99-99",{
            oncomplete: enableSubmit,
            onincomplete: disableSubmit,
            onKeyDown: validForm,
        })
        validForm();

    });
}