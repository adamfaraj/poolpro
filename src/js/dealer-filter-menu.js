/*****
  The dealer-filter-menu module either shows or hides the mobile
  dropdown menu for the dealer filter criteria.
*****/


(function($) {


    var dom;

    // cache necessary DOM nodes for this module
    function cacheDOM() {
        dom = {};
        dom.document = $(document);
        dom.dropdownButton = dom.document.find('.dropdown-button');
        dom.dropdownMenu = dom.document.find('.dropdown-menu-container--hidden');
   };


    // bind event handlers for this module
    function bindEventHandlers() {
       dom.dropdownButton.on('click', dropdownButtonClicked);
    };


    // show or hide dropdown menu when user clicks
    function dropdownButtonClicked() {
        if (dom.dropdownMenu.hasClass("dropdown-menu-container--hidden")) {
            dom.dropdownMenu.removeClass("dropdown-menu-container--hidden").addClass("dropdown-menu-container--show");
        } else {
            dom.dropdownMenu.removeClass("dropdown-menu-container--show").addClass("dropdown-menu-container--hidden");
        }
    };

    
    // initialize the module
    function init() {
       cacheDOM();
       bindEventHandlers();
    };


    // initialize this bad boy!
    init();


}(jQuery));
