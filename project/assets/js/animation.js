const DURATION = 300;
const MIN_WAITING = 500;

function isMainPage($container) {
  return !!$container.$content.has('.layout--content .main-page').length;
}

function getMenuWidth($menu) {
  if ($menu.hasClass('menu__virtual')) {
    return 0;
  }
  if ($menu.hasClass('menu__shrinked')) {
    return 124;
  }
  return 194;
}

function getBodyPadding($body) {
  if ($body.hasClass('has-sidebars')) {
    return 318;
  }
  if ($body.hasClass('has-sidebars_active')) {
    return 248;
  }
  return 194;
}

function animateMenuFromTo($menu, $newMenu) {
  const widthMenu = getMenuWidth($menu);
  const widthNewMenu = getMenuWidth($newMenu);

  console.log('menu resize from', widthMenu, ' to ', widthNewMenu);

  if (widthNewMenu === 0 && widthMenu !== 0) {
    return $menu.animate({ 'width': '0px' }, DURATION).promise()
      .then(() => {
        $menu.replaceWith($newMenu);
      });
  }

  if (widthNewMenu === widthMenu) {
    console.log('eq');
    $menu.replaceWith($newMenu);
    return Promise.resolve();
  }

  $newMenu.width(widthMenu);
  $menu.replaceWith($newMenu);

  const props = {
    width: `${widthNewMenu}px`
  };
  console.log(props);
  return $newMenu.animate(props, DURATION).promise()
    .then(() => {
      $newMenu.removeAttr('style');
    });
}

function animateBodyFromTo($body, $newBody) {
  const paddingMenu = getBodyPadding($body);
  const paddingNewMenu = getBodyPadding($newBody);

  console.log('body resize', paddingNewMenu - paddingMenu);

  if (paddingNewMenu === paddingMenu) {
    return Promise.resolve();
  }

  const props = {
    'padding-left': `${paddingNewMenu}px`
  };
  return $body.animate(props, DURATION).promise();
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
  start: function () {
    this.isLoadingStart();
    const pageTransform = this.newContainerLoading.then(this.animateSidebar.bind(this));
    return Promise.all([pageTransform, delayPromise(MIN_WAITING)])
      .then(this.pageIn.bind(this))
      .then(this.reinitJs.bind(this));
  },

  isLoadingStart() {
    $('body').addClass('is-loading');
  },

  isLoadingEnd() {
    $('body').removeClass('is-loading');
  },

  getCurrentContainer: function () {
    if (!this.$newContainer) {
      this.$container = new Container($('body'));
    }
    return this.$container;
  },

  getNewContainer: function () {
    if (!this.$newContainer) {
      var newPage = document.createElement('html');
      newPage.innerHTML = Barba.Pjax.Dom.currentHTML;
      this.$newContainer = new Container($(newPage).find('body'));
    }

    return this.$newContainer;
  },

  animateSidebar: function () {
    $container = this.getCurrentContainer();
    $newContainer = this.getNewContainer();

    const $menu1 = $container.$sidebar.find('.menu__level1')
    const $menu2 = $container.$sidebar.find('.menu__level2')
    const $newMenu1 = $newContainer.$sidebar.find('.menu__level1')
    const $newMenu2 = $newContainer.$sidebar.find('.menu__level2')

    return Promise.all([
      animateMenuFromTo($menu1, $newMenu1),
      animateMenuFromTo($menu2, $newMenu2),
      animateBodyFromTo($container, $newContainer),
    ]).then(() => console.warn(123));
  },

  pageIn: function () {
    $container = this.getCurrentContainer();
    $newContainer = this.getNewContainer();

    if (!(isMainPage($container) && isMainPage($newContainer))) {
      $container.$content.replaceWith($newContainer.$content);
    }
    $container[0].className = [...$newContainer[0].classList, 'js'].join(' ');

    this.isLoadingEnd();
    this.done();
  },
  reinitJs: function () {
    initAll();
  }
});

/**
 * Next step, you have to tell Barba to use the new Transition
 */
Barba.Pjax.getTransition = function () {
  return PageTransition;
};

Barba.Pjax.start();
document.getElementsByTagName('html')[0].classList.add('js-animate');