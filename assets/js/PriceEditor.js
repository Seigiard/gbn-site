class PriceEditor {
  constructor(options) {
    var self = this;
    this.$priceInput = $(".PriceEditor-priceInput");
    this.$priceFormatted = $(".PriceEditor-priceFormatted");
    this.$priceRange = $(".PriceEditor-priceRange");
    this.$commissionPercentage = $('.PriceEditor-commissionPercentage');
    this.$commissionValue = $('.PriceEditor-commissionValue');
    this.$commissionValueInput = $('.PriceEditor-commissionValueInput');
    this.$percentage = $('.PriceEditor-percentage');
    this.isInputChanged = false;
    this.maxInputValue = options.maxInputValue;
    this.minCommissionValue = options.minCommissionValue || 0;
    this.commissionType = options.commissionType;
    this.commissionRange = options.commissionRange;

    this.$priceRange.rangeslider({
      polyfill: false,

      onSlide: function (position, value) {
        // If input was changed don't change it again
        if (!self.isInputChanged) {
          self.$priceInput.val(value);
        }
        self.$priceFormatted.html(self.formatPrice(self.$priceInput.val()));
        self.changeCommissionValue(parseInt(self.$priceInput.val()), self.commissionType);
        self.isInputChanged = false;
      }
    });

    this.$priceFormatted.on('click', this.onPriceFormattedClick.bind(this));
    this.$priceInput.on('keydown', this.onPriceInputKeydown.bind(this));
    this.$priceInput.on('change input', this.onPriceInputChange.bind(this));
    this.onPriceInputChange();
    // if (this.maxInputValue) this.$priceInput.on('input', this.checkPriceInputValue.bind(this));
  }

  formatPrice(price) {
    var semispace = '<span class="hs"></span>';
    // reverse string because we need split price from end of string
    var reversePrice = price.split('').reverse().join('');
    var splittedPrice = reversePrice.match(/.{1,3}/g);
    // Reverse each splitted block for correct join
    for (var i = 0; i < splittedPrice.length; i++) {
      splittedPrice[i] = splittedPrice[i].split('').reverse().join('');
    }
    var formattedPrice = splittedPrice.reverse().join(semispace);
    return formattedPrice + '<span class="rhs">&nbsp;</span>₽';
  }

  priceChangeState() {
    $('.PriceEditor-price').toggleClass('PriceEditor-price--isActive');
  }

  onPriceFormattedClick(e) {
    e.stopPropagation();
    this.priceChangeState();
    $(window).on('click', this.onInputBlurCheck.bind(this));
    this.$priceInput.focus();
  }

  onInputBlurCheck(e) {
    // If click on input, we don't need to hide input
    if (e.target == this.$priceInput[0]) return;
    $(window).off('click');
    this.priceChangeState();
  }

  onPriceInputKeydown(e) {
    // If Enter is pressed
    if (e.which == 13) {
      e.preventDefault();
      $(window).off('click');
      this.priceChangeState();
    } else {
      // this.$priceInput.change();
    }
  }

  onPriceInputChange() {
    let value = this.$priceInput.val();
    if (this.maxInputValue && value > this.maxInputValue) {
      value = this.maxInputValue;
      this.$priceInput.val(value);
    }
    this.$priceRange.val(value)
    this.isInputChanged = true;
    this.$priceRange.rangeslider('update', true);
  }

  changeCommissionValue(price, type) {
    // If price is greater then all range values, take percentage from last range
    var commission = this.commissionRange[this.commissionRange.length - 1].commission;
    var calculatedCommission;
    var calculatedPercentage;
    // Set default value for parameter
    type = type || 'commission';
    for (var i = 0; i < this.commissionRange.length; i++) {
      if (price < this.commissionRange[i].range) {
        commission = this.commissionRange[i].commission;
        break;
      }
    }
    if (type == 'commission') {
      this.$commissionPercentage.html(commission);
      calculatedCommission = this.calculateCommission(price, parseFloat(commission));
      this.$commissionValue.html(this.formatPrice(calculatedCommission.toString()));
      this.$commissionValueInput.val(calculatedCommission);
    }
    if (type == 'percentage') {
      this.$commissionValue.html(this.formatPrice(commission));
      calculatedPercentage = this.calculatePercentage(price, parseInt(commission));
      this.$commissionValueInput.val(calculatedPercentage);
      if (price == 0) {
        this.$commissionPercentage.hide();
        this.$percentage.hide();
      } else {
        this.$commissionPercentage.html(calculatedPercentage);
        this.$commissionPercentage.show();
        this.$percentage.show();
      }
    }
  }

  calculateCommission(price, percentage) {
    return Math.max(Math.round(price * percentage / 100), this.minCommissionValue);
  }

  calculatePercentage(price, commission) {
    return (commission / price * 100).toFixed(2);
  }
}