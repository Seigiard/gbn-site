function sidebarStatus(el) {
  return Array.prototype.filter
    .call(el.classList, function(x) { return x.includes('has-sidebar'); })
    .join('').replace('has-side', '') || 'none';
}

function serviceFooterStatus(el) {
  return Array.prototype.filter
    .call(el.classList, function(x) { return x.includes('has-service-footer'); })
    .join('').replace('has-service-footer-', '') || 'none';
}

function isMainPage($container) {
  return !!$container.$content.has('.layout--content .main-page').length;
}

function Container($el) {
  const object = $el;
  object.$sidebar = $('#sidebar', object);
  object.$content = $('#content', object);
  return object;
}

function getTransformationsFromTo(oldEl, newEl) {
  const transformations = [];
  if(oldEl.sidebarStatus !== newEl.sidebarStatus) {
    transformations.push('animate-sidebar--' + oldEl.sidebarStatus + '-to-' + newEl.sidebarStatus)
  }
  if(oldEl.serviceFooterStatus !== newEl.serviceFooterStatus) {
    transformations.push('animate-service-footer--' + oldEl.serviceFooterStatus + '-to-' + newEl.serviceFooterStatus)
  }
  return transformations;
}

//Please note, the DOM should be ready
var PageTransition = Barba.BaseTransition.extend({
  start: function() {
    /**
     * This function is automatically called as soon the Transition starts
     * this.newContainerLoading is a Promise for the loading of the new container
     * (Barba.js also comes with an handy Promise polyfill!)
     */

    // As soon the loading is finished and the old page is faded out, let's fade the new page
    this.newContainerLoading
      .then(this.initContainers.bind(this))
      // .then(this.pageOut.bind(this))
      .then(this.pageIn.bind(this))
      .then(this.reinitJs.bind(this));
  },

  initContainers: function() {
    this.$container = new Container($('body'));

    var newPage = document.createElement( 'html' );
    newPage.innerHTML = Barba.Pjax.Dom.currentHTML;
    this.$newContainer = new Container($(newPage).find('body'));
  },

  pageOut: function() {
    return Promise.resolve();
  },

  pageIn: function() {
    this.$container[0].className = [...this.$newContainer[0].classList].join(' ');


    this.$container.$sidebar.html(this.$newContainer.$sidebar.html());
    if (!(isMainPage(this.$container) && isMainPage(this.$newContainer))) {
      this.$container.$content.html(this.$newContainer.$content.html());
    }

    this.done();
  },
  reinitJs: function() {
    console.warn('init all');
  }
});

/**
 * Next step, you have to tell Barba to use the new Transition
 */
Barba.Pjax.getTransition = function() {
  return PageTransition;
};

Barba.Pjax.start();