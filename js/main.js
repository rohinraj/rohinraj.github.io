;(function () {
	
	'use strict';

	var isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
			BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
			iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
			Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
			Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
			any: function() {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};

	
	var fullHeight = function() {

		if ( !isMobile.any() ) {
			$('.js-fullheight').css('height', $(window).height());
			$(window).resize(function(){
				$('.js-fullheight').css('height', $(window).height());
			});
		}
	};

	// Parallax
	var parallax = function() {
		$(window).stellar();
	};

	var contentWayPoint = function() {
		var i = 0;
		$('.animate-box').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('animated-fast') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .animate-box.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn animated-fast');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft animated-fast');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight animated-fast');
							} else {
								el.addClass('fadeInUp animated-fast');
							}

							el.removeClass('item-animate');
						},  k * 100, 'easeInOutExpo' );
					});
					
				}, 50);
				
			}

		} , { offset: '85%' } );
	};



	var goToTop = function() {

		$('.js-gotop').on('click', function(event){
			
			event.preventDefault();

			$('html, body').animate({
				scrollTop: $('html').offset().top
			}, 500, 'easeInOutExpo');
			
			return false;
		});

		$(window).scroll(function(){

			var $win = $(window);
			if ($win.scrollTop() > 200) {
				$('.js-top').addClass('active');
			} else {
				$('.js-top').removeClass('active');
			}

		});
	
	};

	var pieChart = function() {
		$('.chart').easyPieChart({
			scaleColor: false,
			lineWidth: 4,
			lineCap: 'butt',
			barColor: '#FF9000',
			trackColor:	"#f5f5f5",
			size: 160,
			animate: 1000
		});
	};

	var skillsWayPoint = function() {
		if ($('#fh5co-skills').length > 0 ) {
			$('#fh5co-skills').waypoint( function( direction ) {
										
				if( direction === 'down' && !$(this.element).hasClass('animated') ) {
					setTimeout( pieChart , 400);					
					$(this.element).addClass('animated');
				}
			} , { offset: '90%' } );
		}

	};


	// Loading page
	var loaderPage = function() {
		$(".fh5co-loader").fadeOut("slow");
	};

	
	// Side Navigation
	var sideNavigation = function() {
		var $sideNav = $('#sideNav');
		var $navDots = $('.nav-dot');
		var sections = [];
		
		// Build sections array
		$navDots.each(function() {
			var target = $(this).attr('href');
			if ($(target).length) {
				sections.push({
					id: target,
					offset: $(target).offset().top,
					height: $(target).outerHeight()
				});
			}
		});
		
		// Smooth scroll on click
		$navDots.on('click', function(e) {
			e.preventDefault();
			var target = $(this).attr('href');
			if ($(target).length) {
				// Use native scrollIntoView for smoother performance
				document.querySelector(target).scrollIntoView({
					behavior: 'smooth',
					block: 'start'
				});
			}
		});
		
		// Update active state on scroll
		var updateActiveNav = function() {
			var scrollPos = $(window).scrollTop() + $(window).height() / 3;
			
			// Show/hide nav after hero section
			if ($(window).scrollTop() > 400) {
				$sideNav.addClass('visible');
			} else {
				$sideNav.removeClass('visible');
			}
			
			// Find active section
			var current = '';
			for (var i = 0; i < sections.length; i++) {
				if (scrollPos >= sections[i].offset) {
					current = sections[i].id;
				}
			}
			
			// Update active class
			$navDots.removeClass('active');
			if (current) {
				$('.nav-dot[href="' + current + '"]').addClass('active');
			}
		};
		
		// Update on scroll and resize
		$(window).on('scroll', updateActiveNav);
		$(window).on('resize', function() {
			// Rebuild sections array on resize
			sections = [];
			$navDots.each(function() {
				var target = $(this).attr('href');
				if ($(target).length) {
					sections.push({
						id: target,
						offset: $(target).offset().top,
						height: $(target).outerHeight()
					});
				}
			});
			updateActiveNav();
		});
		
		// Initial update
		updateActiveNav();
	};

	$(function(){
		contentWayPoint();
		goToTop();
		loaderPage();
		fullHeight();
		parallax();
		// pieChart();
		skillsWayPoint();
		sideNavigation();
	});


}());