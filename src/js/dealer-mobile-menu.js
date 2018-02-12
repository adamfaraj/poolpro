/*****
  The Dealer-mobile-menu module is designed to
  listen for a user click to display the mobile
  menu or hide it.
*****/


(function($) {


    var dom;


    // cache necessary dom nodes for this module
	function cacheDOM() {
		dom = {};
		dom.document = $(document);
		dom.mobileMenuIcon = dom.document.find('.mobile-header__icon');
		dom.mobileMenu = dom.document.find('.mobile-header__container--show');
		dom.mobileMenuClose = dom.document.find('.mobile-header__close');
	};


	// bind event handlers for this module
	function bindEventHandlers() {
       dom.mobileMenuIcon.on('click', mobileMenuIconClicked);
       dom.mobileMenuClose.on('click', mobileMenuCloseClicked)
	};


	// display mobile menu when user clicks icon
	function mobileMenuIconClicked() {
		dom.mobileMenu.animate({
        marginLeft: '0px',
      	}, 500)
    };


	//when user closes the menu
  	function mobileMenuCloseClicked() {
		dom.mobileMenu.animate({
		 marginLeft: '-450px',
		},500)
	};

	
	// initialize the module
	function init() {
       cacheDOM();
       bindEventHandlers();
 	};


	// initialize this bad boy!
	init();


}(jQuery));
