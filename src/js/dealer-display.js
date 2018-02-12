/*****
  The Dealer-Display module is designed to
  listen for the any criteria changes from the
  "dealer filter" and update the displayed dealers
  accordingly.
*****/


(function($) {


 	var dom;


	// load the dealer data
 	function loadDealerData() {
		$.getJSON("src/js/dealers.json", renderDealers);
  	};


	// cache necessary dom nodes for this module
	function cacheDOM() {
		dom = {};
		dom.document = $(document);
		// filter elements
		dom.filterCount = dom.document.find('.dealer-filter__count');
		dom.mobileFilterCount = dom.document.find('.mobile__dealer-filter__count');
		// find a pool pro elements
		dom.findPoolButton = dom.document.find('.header__menu-button');
		dom.locationIcon = dom.document.find('.header__location-icon');
		dom.overlay = dom.document.find('.pool-locator__overlay');
		dom.modalClose = dom.document.find('.pool-locator__close');
		dom.modalButton = dom.document.find('.pool-locator__button');
		dom.modalUserLocation = dom.document.find('.pool-locator__user-location');
		// dealers returned elements
		dom.dealersReturned = dom.document.find('.dealers');
		dom.noDealers = dom.document.find('.dealers__not-returned');
		dom.template = dom.document.find('#tmplt');
		dom.dealerEmailButton = $('.dealer__email-modal-title');
		dom.dealerEmailModal = $('.dealer__email-modal-container');
	};


	// bind event handlers for this module
	function bindEventHandlers() {
		dom.document.on('dealer_filter_criteria_changed', onDealerFilterCriteriaChanged);
		dom.document.on('click touchstart', '.dealer__email-button', onDealerEmailBtnClicked);
		dom.findPoolButton.mouseenter(locationIconHovered);
		dom.findPoolButton.mouseleave(locationIconNotHovered);
		dom.findPoolButton.on('click touch', findPoolClicked);
		dom.overlay.on('click touchstart', onModalClicked);
		dom.modalClose.on('click touch', onModalClosedClicked);
		dom.modalButton.on('click touchstart', onModalButtonClicked);
		dom.modalUserLocation.on('keydown', onEnterUserSearch);
		dom.modalButton.on('keydown', onEnterUserSearch);
	};


	// change location icon when user mouse enters
	function locationIconHovered() {
		dom.locationIcon[0].setAttribute('src', 'src/images/location-icon-hover.png');
	};


	// change location icon when user mouse leaves
	function locationIconNotHovered() {
		dom.locationIcon[0].setAttribute('src', 'src/images/location-icon.png');
	};


	// display modal when user clicks the find a pool button
	function findPoolClicked(e) {
		dom.overlay[0].style.visibility = 'visible';
		dom.modalUserLocation[0].value = "";
		dom.modalUserLocation.focus();
		if(e.type == 'touchstart') {
			dom.overlay[0].style.visibility = 'visible';
			dom.modalUserLocation.focus();
			$(this).off('click');
		}
	};

	
	// hide modal when user clicks the X
	function onModalClosedClicked() {
		 dom.overlay[0].style.visibility = 'hidden';
		 
	};


	// hide modal when user clicks the modal
	function onModalClicked(event) {
		if (event.target == dom.overlay[0]) {
			dom.overlay[0].style.visibility = 'hidden';
		}
	};
	

	// display the dealers when user enters correct info
	function onModalButtonClicked() {
		if (dom.modalUserLocation[0].value == "28205" || dom.modalUserLocation[0].value.toUpperCase() == "CHARLOTTE, NC") {
			dom.dealersReturned[0].style.display = "flex";
			dom.overlay[0].style.visibility = "hidden";
			dom.noDealers[0].style.display = "none";
			dom.dealersReturned[0].style.display = "flex";
			dom.filterCount[0].innerHTML = $('.dealer:visible').length + " dealers in " + dom.modalUserLocation[0].value;
			dom.mobileFilterCount[0].innerHTML = $('.dealer:visible').length + " dealers in " + dom.modalUserLocation[0].value;
			$('html, body').animate({
				scrollTop: $('.dealers').offset().top
			}, 1000)
		} else {
			dom.dealersReturned[0].style.display = "none";
			dom.noDealers[0].style.display = "block";
			dom.overlay[0].style.visibility = "hidden";
			dom.modalUserLocation[0].value = "";
			console.log(dom.modalUserLocation);
			$('html, body').animate({
				scrollTop: $('.dealers__not-returned').offset().top
			}, 1000)
		}
	};


	// display dealers when user hits enter
	function onEnterUserSearch(e){
		if (e.which === 13) {
			onModalButtonClicked();
		}
	};
	
	
	// display the correct dealer name and email when user emails pool pro
	function onDealerEmailBtnClicked() {
		var $template = $(this).parents('.dealer');
		var $dealerNameElement = $template.find('.dealer__name');
		var $dealerEmail = $template.find('.dealer__email--hidden');

		$('.dealer__email-modal-title').text($dealerNameElement.text());
		$('.modal__form-span-dealerName').text($dealerNameElement.text());
		$('.dealer__email-send').attr('href', 'mailto:' + $dealerEmail.text());
		$('.modal__form-container-name')[0].value = "";
		$('.modal__form--invalid')[0].setAttribute("src", 'src/images/circle-form.png');
		$('.modal__form-container-name').focus();
		
		var $modalInput = $('.modal__input');
		var $modalForm = $('.modal__form--invalid');

		// check if user entered a name
		$modalInput[0].addEventListener('keyup', function() {
			if($modalInput[0].checkValidity() == true){
				$modalForm[0].setAttribute("src", 'src/images/checkmark-circle.png');
				
			} else {
				$modalForm[0].setAttribute("src", 'src/images/circle-form.png');
			};

		})

		// check if user entered a phone number
		$modalInput[1].addEventListener('keyup', function() {
			if($modalInput[1].checkValidity() == true && $modalInput[1].value.length == 10){
				$modalForm[1].setAttribute("src", 'src/images/checkmark-circle.png');
			} else {
				$modalForm[1].setAttribute("src", 'src/images/circle-form.png');
			};

		})

		// check if user entered an email
		$modalInput[2].addEventListener('keyup', function() {
			if($modalInput[2].checkValidity() == true){
				$modalForm[2].setAttribute("src", 'src/images/checkmark-circle.png');
			} else {
				$modalForm[2].setAttribute("src", 'src/images/circle-form.png');
			};

		})
	};
	

    // display dealers based on new criteria
	function onDealerFilterCriteriaChanged(eventData) {
		var $dealers = $('.dealer');
		var i;
		var j;

		// if no certification criteria is provided, show ALL the dealers
		if (eventData.certifications.length == 0) {
			$dealers.show();
			dom.filterCount[0].innerHTML = $('.dealer:visible').length + " dealers in " + dom.modalUserLocation[0].value;
			dom.mobileFilterCount[0].innerHTML = $('.dealer:visible').length + " dealers in " + dom.modalUserLocation[0].value;
			return;
		}

		// if certification criteria provided, only show matching dealers
		for (i = 0; i < $dealers.length; i++) {

			for (j = 0; j < eventData.certifications.length; j++) {

				if ($dealers.eq(i).attr('data-certifications').indexOf(eventData.certifications[j]) >= 0) {
				$dealers.eq(i).show();
				dom.filterCount[0].innerHTML = $('.dealer:visible').length + " dealers in " + dom.modalUserLocation[0].value;
				console.log(dom.modalUserLocation);
				dom.mobileFilterCount[0].innerHTML = $('.dealer:visible').length + " dealers in " + dom.modalUserLocation[0].value;
				break;
				} else {
				$dealers.eq(i).hide();
				dom.filterCount[0].innerHTML = $('.dealer:visible').length + " dealers in " + dom.modalUserLocation[0].value;
				dom.mobileFilterCount[0].innerHTML = $('.dealer:visible').length + " dealers in " + dom.modalUserLocation[0].value;
				}
			}
		}
	};


    // render the dealers
	function renderDealers(response) {

		var template = document.querySelector('#tmplt');

    	// loop over dealers to build markup
		for (var i=0; i < response.dealers.length; i++) {
			var dealer = response.dealers[i].data;
			var templateClone = template.content.cloneNode(true);

			// prepare the dealer markup
			templateClone.querySelector('.dealer__name').innerHTML = dealer.name;
			templateClone.querySelector('.dealer__phone').innerHTML = '<img src="src/images/phone-icon-desktop.png" class="phone-icon">' + '<span class="tap-to-call">Tap to call</span>' + dealer.phone1.replace( /-/g ,".");
			templateClone.querySelector('.dealer__phone').href = "tel:" + dealer.phone1;
			templateClone.querySelector('.dealer__email-button').innerHTML = '<img src="src/images/email-icon.png" class="dealer__email-icon"> Contact this Pro';
			templateClone.querySelector('.dealer__email-modal-title').innerHTML = dealer.name;
			templateClone.querySelector('.dealer__email--hidden').innerHTML = dealer.email;
			templateClone.querySelector('.modal__form-span-dealerName').innerHTML = dealer.name;
			templateClone.querySelector('.dealer__weekday-hours').innerHTML = "Weekdays: " + dealer.weekHours.mon;
			templateClone.querySelector('.dealer__saturday-hours').innerHTML = dealer.weekHours.sat == "" ? "Saturdays: CLOSED" : "Saturdays: " + dealer.weekHours.sat;
			templateClone.querySelector('.dealer__sunday-hours').innerHTML = dealer.weekHours.sun == "" ? "Sundays: CLOSED" : "Sundays: " + dealer.weekHours.sun;
			templateClone.querySelector(".dealer__certifications").appendChild(buildCertificationList(dealer.certifications));
			templateClone.querySelector('.dealer').setAttribute('data-certifications', dealer.certifications);
			templateClone.querySelector('.dealer__email--hidden').innerHTML = dealer.email;

			// inject this dealer template into the dom
			template.parentNode.appendChild(templateClone);
		}
	};

	// build the list of dealer certifications
	function buildCertificationList(array) {
		var list = document.createElement('ul');
		list.setAttribute('class' , 'dealer__cert-list');

		for(var i = 0; i < array.length; i++) {
			var item = document.createElement('li');
			item.setAttribute('class', 'dealer__cert-list-item');
			if (array[i] == "Installation Pro") {
				item.innerHTML = '<img src="src/images/star-installation-pro.png" class="dealer__cert-icons">'
			} else if (array[i] == "Service Pro") {
				item.innerHTML = '<img src="src/images/gear-service-pro.png" class="dealer__cert-icons">'
			} else if (array[i] == "Residential Pro") {
				item.innerHTML = '<img src="src/images/home-residential-pro.png" class="dealer__cert-icons">'
			} else if (array[i] == "Commercial Pro") {
				item.innerHTML = '<img src="src/images/users-commercial-pro.png" class="dealer__cert-icons">'
			}
			item.appendChild(document.createTextNode(array[i]));
			list.appendChild(item);
		}
		return list;
	};


	// initialize the module
	function init() {
		cacheDOM();
		bindEventHandlers();
		loadDealerData();
  };


  	// initialize this bad boy!
	init();


}(jQuery));
