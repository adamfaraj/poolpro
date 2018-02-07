/*****
  The Dealer-Display module is designed to
  listen for the any criteria changes from the
  "dealer filter" and update the displayed dealers
  accordingly.
*****/


(function($) {


    var dom;

 // cache necessary dom nodes for this module
   var cacheDOM = function() {
        dom = {};
        dom.document = $(document);
        dom.mobileMenuIcon = dom.document.find('.mobile-header__icon');
        dom.mobileMenu = dom.document.find('.mobile-header__container--show');
        dom.mobileMenuClose = dom.document.find('.mobile-header__close');

   };

 // bind event handlers for this module
   var bindEventHandlers = function() {
       dom.mobileMenuIcon.on('click', mobileMenuIconClicked);
       dom.mobileMenuClose.on('click', mobileMenuCloseClicked)
   };

   var mobileMenuIconClicked = function() {
      dom.mobileMenu.animate({
        marginLeft: '0px',
      }, 500)
        // Animation complete.
    };

  var mobileMenuCloseClicked = function() {
      dom.mobileMenu.animate({
        marginLeft: '-450px',
      },500)
  }
 // initialize the module
   var init = function() {
       cacheDOM();
       bindEventHandlers();
 };


 // initialize this bad boy!
 init();


}(jQuery));
