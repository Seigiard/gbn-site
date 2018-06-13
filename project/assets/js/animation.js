function isMainPage($container) {
  return !!$container.$content.has('.layout--content .main-page').length;
}

function Container($el) {
  const object = $el;
  object.$sidebar = $('#sidebar', object);
  object.$content = $('#content', object);
  return object;
}

function delayPromise(msec) {
  return new Promise(resolve => setTimeout(resolve, msec))
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

    this.isLoadingStart();
    return Promise.all([this.newContainerLoading, delayPromise(1000)])
      .then(this.pageIn.bind(this))
      .then(this.reinitJs.bind(this));
  },

  isLoadingStart() {
    $('body').addClass('is-loading');
  },

  isLoadingEnd() {
    $('body').removeClass('is-loading');
  },

  getCurrentContainer: function() {
    if (!this.$newContainer) {
      this.$container = new Container($('body'));
    }
    return this.$container;
  },

  getNewContainer: function() {
    if (!this.$newContainer) {
      var newPage = document.createElement( 'html' );
      newPage.innerHTML = Barba.Pjax.Dom.currentHTML;
      this.$newContainer = new Container($(newPage).find('body'));
    }

    return this.$newContainer;
  },

  animateSidebar: function() {
    $container = this.getCurrentContainer();
    $newContainer = this.getNewContainer();

    const $menu1 = $container.$sidebar.find('.menu__level1')
    const $menu2 = $container.$sidebar.find('.menu__level2')
    const $newMenu1 = $newContainer.$sidebar.find('.menu__level1')
    const $newMenu2 = $newContainer.$sidebar.find('.menu__level2')

    $menu1.html($newMenu1.html());
    $menu2.html($newMenu2.html());
    $menu1[0].className = [...$newMenu1[0].classList].join(' ');
    $menu2[0].className = [...$newMenu2[0].classList].join(' ');

    return Promise.resolve();
  },

  pageIn: function() {
    $container = this.getCurrentContainer();
    $newContainer = this.getNewContainer();

    this.animateSidebar();
    if (!(isMainPage($container) && isMainPage($newContainer))) {
      $container.$content.html($newContainer.$content.html());
    }
    $container[0].className = [...$newContainer[0].classList, 'js'].join(' ');
    this.isLoadingEnd();
    this.done();
  },
  reinitJs: function() {
    initAll();
  }
});

/**
 * Next step, you have to tell Barba to use the new Transition
 */
Barba.Pjax.getTransition = function() {
  return PageTransition;
};

Barba.Pjax.start();
document.getElementsByTagName('html')[0].classList.add('js-animate');