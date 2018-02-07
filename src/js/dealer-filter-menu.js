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
        dom.dropdownButton = dom.document.find('.dropdown-button');
        dom.dropdownMenu = dom.document.find('.dropdown-menu-container--hidden');
   };

 // bind event handlers for this module
   var bindEventHandlers = function() {
       dom.dropdownButton.on('click', dropdownButtonClicked);
   };

   var dropdownButtonClicked = function() {
        if (dom.dropdownMenu.hasClass("dropdown-menu-container--hidden")) {
            dom.dropdownMenu.removeClass("dropdown-menu-container--hidden").addClass("dropdown-menu-container--show");
        } else {
            dom.dropdownMenu.removeClass("dropdown-menu-container--show").addClass("dropdown-menu-container--hidden");
        }
    };

 // initialize the module
   var init = function() {
       cacheDOM();
       bindEventHandlers();
 };


 // initialize this bad boy!
 init();


}(jQuery));
