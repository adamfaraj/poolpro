/*****
  The Dealer-Display module is designed to
  listen for the any criteria changes from the
  "dealer filter" and update the displayed dealers
  accordingly.
*****/


(function($) {


 	var dom;

  // load the dealer data
 	var loadDealerData = function() {
		$.getJSON("src/js/dealers.json", renderDealers);
  	};


  // cache necessary dom nodes for this module
	var cacheDOM = function() {
		dom = {};
		 dom.document = $(document);
		 //filter elements
		dom.filterCount = dom.document.find('.dealer-filter__count');
		dom.mobileFilterCount = dom.document.find('.mobile__dealer-filter__count');
		//find a pool pro elements
		dom.findPoolButton = dom.document.find('.header__menu-button');
		dom.locationIcon = dom.document.find('.location_icon');
		dom.poolLocatorModal = dom.document.find('.pool__locator--modal');
		dom.overlay = dom.document.find('.pool-locator__overlay');
		dom.modalDiv = dom.document.find('.pool-locator__form-container');
		dom.modalClose = dom.document.find('.pool-locator__span');
		dom.modalCity = dom.document.find('.pool-locator__city');
		dom.modalButton = dom.document.find('.pool-locator__button');
		dom.modalZipcode = dom.document.find('.pool-locator__zipcode');
		//dealers returned elements
		dom.dealersReturned = dom.document.find('.dealers');
		dom.noDealers = dom.document.find('.dealers__not-returned');
		dom.template = dom.document.find('#tmplt');
		dom.dealerEmailButton = $('.dealerEmailButton_name');
		dom.dealerEmailModal = $('.dealer__email-modal-container');
		dom.dealerEmailSpan = $('.modal_from-span-dealerName');
		dom.sendEmailLink  = $('.sendEmailLink');
		// dom.emailOverlay = $('.dealer__email-overlay');

	};

  // bind event handlers for this module
	var bindEventHandlers = function() {
		dom.document.on('dealer_filter_criteria_changed', onDealerFilterCriteriaChanged);
		dom.document.on('click touchstart', '.dealer__email-button', onDealerEmailBtnClicked);
		dom.findPoolButton.mouseenter(locationIconHovered);
		dom.findPoolButton.mouseleave(locationIconNotHovered);
		dom.findPoolButton.on('click touch', findPoolClicked);
		dom.overlay.on('click touchstart', onModalClicked);
		// dom.emailOverlay.on('click touchstart', onModalClicked);
		dom.modalClose.on('click touch', onModalClosedClicked);
		dom.modalButton.on('click touchstart', onModalButtonClicked);
		dom.modalZipcode.on('keydown', onEnterUserSearch);
		dom.modalCity.on('keydown', onEnterUserSearch);
		dom.modalButton.on('keydown', onEnterUserSearch);
	};

	var locationIconHovered = function() {
		dom.locationIcon[0].setAttribute('src', 'src/images/location-icon-hover.png');
	}

	var locationIconNotHovered = function() {
		dom.locationIcon[0].setAttribute('src', 'src/images/location-icon.png');
	}

	var findPoolClicked = function(e) {
		dom.overlay[0].style.visibility = 'visible';
		dom.modalZipcode[0].value = "";
		dom.modalZipcode.focus();
		if(e.type == 'touchstart') {
			dom.overlay[0].style.visibility = 'visible';
			dom.modalZipcode.focus();
			$(this).off('click');
		}
		
	}

	
	var onModalClosedClicked = function() {
		 dom.overlay[0].style.visibility = 'hidden';
		 
	   }

	var onModalClicked = function(event) {
		var node = dom.template.prop('content');
		var $emailOverlay = $(node).find('.dealer__email-overlay');
		if (event.target == dom.overlay[0]) {
			dom.overlay[0].style.visibility = 'hidden';
		}

	};
	
	
	var onModalButtonClicked = function() {
		if (dom.modalZipcode[0].value == "28205" || dom.modalZipcode[0].value.toUpperCase() == "CHARLOTTE, NC") {
			dom.dealersReturned[0].style.display = "flex";
			dom.overlay[0].style.visibility = "hidden";
			dom.noDealers[0].style.display = "none";
			dom.dealersReturned[0].style.display = "flex";
			dom.filterCount[0].innerHTML = $('.dealer:visible').length + " dealers in " + dom.modalZipcode[0].value;
			dom.mobileFilterCount[0].innerHTML = $('.dealer:visible').length + " dealers in " + dom.modalZipcode[0].value;
			$('html, body').animate({
				scrollTop: $('.dealers').offset().top
			}, 1000)
		} else {
			dom.dealersReturned[0].style.display = "none";
			dom.noDealers[0].style.display = "block";
			dom.overlay[0].style.visibility = "hidden";
			dom.modalZipcode[0].value = "";
			console.log(dom.modalZipcode);
			$('html, body').animate({
				scrollTop: $('.dealers__not-returned').offset().top
			}, 1000)
		}
	}
	
	var onEnterUserSearch = function(e){
		if (e.which === 13) {
			onModalButtonClicked();
		}
	}
	
	
	var onDealerEmailBtnClicked = function() {
		var $template = $(this).parents('.dealer');
		var $dealerNameElement = $template.find('.dealer__name');
		var $dealerEmail = $template.find('.dealer__email--hidden');
		$('.dealerEmailButton_name').text($dealerNameElement.text());
		$('.modal_form-span-dealerName').text($dealerNameElement.text());
		$('.sendEmailLink').attr('href', 'mailto:' + $dealerEmail.text());
		$('.modal_form-container-name')[0].value = "";
		$('.modal__form--invalid')[0].setAttribute("src", 'src/images/circle-form.png');
		$('.modal_form-container-name').focus();
		var $modalInput = $('.modal__input');
		var $modalForm = $('.modal__form--invalid');

		//check if user entered a name
		$modalInput[0].addEventListener('keyup', function() {
			if($modalInput[0].checkValidity() == true){
				$modalForm[0].setAttribute("src", 'src/images/checkmark-circle.png');
				
			} else {
				$modalForm[0].setAttribute("src", 'src/images/circle-form.png');
			};

		})

		// //check if user entered a phone number
		$modalInput[1].addEventListener('keyup', function() {
			if($modalInput[1].checkValidity() == true && $modalInput[1].value.length == 10){
				$modalForm[1].setAttribute("src", 'src/images/checkmark-circle.png');
			} else {
				$modalForm[1].setAttribute("src", 'src/images/circle-form.png');
			};

		})

		// //check if user entered an email
		$modalInput[2].addEventListener('keyup', function() {
			if($modalInput[2].checkValidity() == true){
				$modalForm[2].setAttribute("src", 'src/images/checkmark-circle.png');
			} else {
				$modalForm[2].setAttribute("src", 'src/images/circle-form.png');
			};

		})
		// var node = dom.template.prop('content');
		// var $emailOverlay = $(node).find('.dealer__email-overlay');
        // var $input = $(node).find('#modalName');
		// var $check = $(node).find('.modal__form--invalid');
		
		// $emailOverlay.on('click', function() {
		// 	if($emailOverlay[0].style.display == 'block') {
		// 		$emailOverlay[0].style.visibility == 'none';
		// 	}
		// });

		// $input.on('keyup', function() {
        //     console.log($input);
        //     console.log($input.checkValidity());
    
    
        //     if ($input[0].checkValidity() == true) {
        //       $check[0].setAttribute("src", 'src/images/checkmark-circle.png');
        //       console.log($check);
        //     } else {
        //         $check[0].setAttribute("src", "src/images/circle-form.png");
        //       console.log($check);
              
        //     }
        // })
		// console.log($input);
		// console.log($input[0]);
  };
	

    // display dealers based on new criteria
	var onDealerFilterCriteriaChanged = function(eventData) {
		var $dealers = $('.dealer');
		var i;
		var j;

		// if no certification criteria is provided, show ALL the dealers
		if (eventData.certifications.length == 0) {
			$dealers.show();
			dom.filterCount[0].innerHTML = $('.dealer:visible').length + " dealers in " + dom.modalZipcode[0].value;
			dom.mobileFilterCount[0].innerHTML = $('.dealer:visible').length + " dealers in " + dom.modalZipcode[0].value;
			return;
		}

		// if certification criteria provided, only show matching dealers
		for (i = 0; i < $dealers.length; i++) {

			for (j = 0; j < eventData.certifications.length; j++) {

				if ($dealers.eq(i).attr('data-certifications').indexOf(eventData.certifications[j]) >= 0) {
				$dealers.eq(i).show();
				dom.filterCount[0].innerHTML = $('.dealer:visible').length + " dealers in " + dom.modalZipcode[0].value;
				console.log(dom.modalZipcode);
				dom.mobileFilterCount[0].innerHTML = $('.dealer:visible').length + " dealers in " + dom.modalZipcode[0].value;
				break;
				} else {
				$dealers.eq(i).hide();
				dom.filterCount[0].innerHTML = $('.dealer:visible').length + " dealers in " + dom.modalZipcode[0].value;
				dom.mobileFilterCount[0].innerHTML = $('.dealer:visible').length + " dealers in " + dom.modalZipcode[0].value;
				}
			}
		}
	};


    // render the dealers
	var renderDealers = function(response) {

		var template = document.querySelector('#tmplt');

    // loop over dealers to build markup
		for (var i=0; i < response.dealers.length; i++) {
			var dealer = response.dealers[i].data;
			var templateClone = template.content.cloneNode(true);

			// prepare the dealer markup
			templateClone.querySelector('.dealer__name').innerHTML = dealer.name;
			templateClone.querySelector('.dealer__phone').innerHTML = '<img src="src/images/phone-icon-desktop.png" class="phone-icon">' + '<span class="tap-to-call">Tap to call</span>' + dealer.phone1.replace( /-/g ,".");
			templateClone.querySelector('.dealer__phone').href = "tel:" + dealer.phone1;
			templateClone.querySelector('.dealer__email-button').innerHTML = '<img src="src/images/email-icon.png" class="email-Icon"> Contact this Pro';
			templateClone.querySelector('.dealerEmailButton_name').innerHTML = dealer.name;
			templateClone.querySelector('.dealer__email--hidden').innerHTML = dealer.email;
			templateClone.querySelector('.modal_form-span-dealerName').innerHTML = dealer.name;
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
	var buildCertificationList = function(array) {
		var list = document.createElement('ul');
		list.setAttribute('class' , 'dealerUL');

		for(var i = 0; i < array.length; i++) {
			var item = document.createElement('li');
			item.setAttribute('class', 'dealerLI');
			if (array[i] == "Installation Pro") {
				item.innerHTML = '<img src="src/images/star-installation-pro.png" class="cert_icons">'
			} else if (array[i] == "Service Pro") {
				item.innerHTML = '<img src="src/images/gear-service-pro.png" class="cert_icons">'
			} else if (array[i] == "Residential Pro") {
				item.innerHTML = '<img src="src/images/home-residential-pro.png" class="cert_icons">'
			} else if (array[i] == "Commercial Pro") {
				item.innerHTML = '<img src="src/images/users-commercial-pro.png" class="cert_icons">'
			}
			item.appendChild(document.createTextNode(array[i]));
			list.appendChild(item);
		}
		return list;
	}



  // initialize the module
	var init = function() {
		cacheDOM();
		bindEventHandlers();
		loadDealerData();
  };


  // initialize this bad boy!
  init();


}(jQuery));
