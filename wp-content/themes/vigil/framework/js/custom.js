jQuery.noConflict();
jQuery(document).ready(function($){
	
	"use strict";
	if( dttheme_urls.loadingbar === "enable") {
		Pace.on("done", function(){
			$(".loader").fadeOut(500);
			$(".pace").remove();
		});
	}
	
	if( $('.dt-sc-icon-box-type9').length ) {
		setTimeout(function(){
			$('.dt-sc-icon-box-type9').each(function(){
				$(this).find('.icon-wrapper').css('height', $(this).find('.icon-content').outerHeight(true) );
			});
		},1000);
    }
	   	
	if( $('ul.dt-sc-tabs-vertical-frame').length ) {
		$('ul.dt-sc-tabs-vertical-frame').each(function(){
			$(this).css('min-height', $(this).height() );
		});
	}

	if( $('ul.dt-sc-tabs-vertical').length ) {
		$('ul.dt-sc-tabs-vertical').each(function(){
			$(this).css('min-height', $(this).height() );
		});
	}
	
	// <select>	
	$("select").each(function(){
		if($(this).css('display') != 'none') {
			$(this).wrap( '<div class="selection-box"></div>' );
		}
	});

	//To Top...
	$().UItoTop({ easingType: 'easeOutQuart' });

	$('.activity-type-tabs > ul >li:first').addClass('selected');
	$('.dir-form > .item-list-tabs > ul > li:first').addClass('selected');

	/*Menu */
	function DTMegaMenu() {
		var screenWidth = $(document).width(),
		containerWidth = $("#header .container").width(),
		containerMinuScreen = (screenWidth - containerWidth)/2;
		if( containerWidth == screenWidth ){

			$("li.menu-item-megamenu-parent .megamenu-child-container").each(function(){

				var ParentLeftPosition = $(this).parent("li.menu-item-megamenu-parent").offset().left,
				MegaMenuChildContainerWidth = $(this).width();

				if( (ParentLeftPosition + MegaMenuChildContainerWidth) > screenWidth ){
					var SwMinuOffset = screenWidth - ParentLeftPosition;
					var marginFromLeft = MegaMenuChildContainerWidth - SwMinuOffset;
					var marginFromLeftActual = (marginFromLeft) + 25;
					var marginLeftFromScreen = "-"+marginFromLeftActual+"px";
					$(this).css('left',marginLeftFromScreen);
				}

			});
		} else {

			$("li.menu-item-megamenu-parent .megamenu-child-container").each(function(){
				var ParentLeftPosition = $(this).parent("li.menu-item-megamenu-parent").offset().left,
				MegaMenuChildContainerWidth = $(this).width();

				if( (ParentLeftPosition + MegaMenuChildContainerWidth) > containerWidth ){
					var marginFromLeft = ( ParentLeftPosition + MegaMenuChildContainerWidth ) - screenWidth;
					var marginLeftFromContainer = containerMinuScreen + marginFromLeft + 20;

					if( MegaMenuChildContainerWidth > containerWidth ){
						var MegaMinuContainer	= ( (MegaMenuChildContainerWidth - containerWidth)/2 ) + 10;
						var marginLeftFromContainerVal = marginLeftFromContainer - MegaMinuContainer;
						marginLeftFromContainerVal = "-"+marginLeftFromContainerVal+"px";
						$(this).css('left',marginLeftFromContainerVal);
					} else {
						marginLeftFromContainer = "-"+marginLeftFromContainer+"px";
						$(this).css('left',marginLeftFromContainer);
					}
				}

			});
		}
	}
	
	DTMegaMenu();
	
	$(window).bind("resize", function() {
		DTMegaMenu();
	});

	//Menu Hover Animation...
	
	function DTMenuHover() {
		
		$("li.menu-item-depth-0,li.menu-item-simple-parent ul li" ).hover(function(){
			//mouseover 
			if( $(this).find(".megamenu-child-container").length  ){
				$(this).find(".megamenu-child-container").stop().fadeIn('fast');
			} else {
				$(this).find("> ul.sub-menu").stop().fadeIn('fast');
			}
		
		},function(){
			//mouseout
			if( $(this).find(".megamenu-child-container").length ){
				$(this).find(".megamenu-child-container").stop(true, true).hide();
			} else {
				$(this).find('> ul.sub-menu').stop(true, true).hide(); 
			}
		});
	}//Menu Hover End
	
	$("div.dt-video-wrap").fitVids();
	
	var isMobile = (navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/iPad/i)) || (navigator.userAgent.match(/Android/i)) || (navigator.userAgent.match(/Blackberry/i)) || (navigator.userAgent.match(/Windows Phone/i) || navigator.platform.match(/(Mac|iPhone|iPod|iPad)/i) ) ? true : false;
	
	var currentWidth = window.innerWidth || document.documentElement.clientWidth;
	
	if(typeof dttheme_urls !== 'undefined') {
		
		//Sticky Navigation
		if( isMobile && dttheme_urls.mobilestickynav == "enable" ) {
			$(dttheme_urls.stickyele).sticky({ topSpacing: 0 });
		}
		if( dttheme_urls.stickynav === "enable" && currentWidth > 767 ) {
			$(dttheme_urls.stickyele).sticky({ topSpacing: 0 });			
		}		
    }

	//Mobile Menu
	$("#dt-menu-toggle").click(function( event ){
		event.preventDefault();
		
		var $menu = $("nav#main-menu").find("ul.menu:first");
		$menu.slideToggle(function(){
			$menu.css('overflow' , 'visible');
			$menu.toggleClass('menu-toggle-open');
		});
		
		var $right = $("nav#main-menu").find("ul.menu-right");
		if( $right.length ) {
			$right.slideToggle(function(){
				$right.css('overflow' , 'visible');
				$right.toggleClass('menu-toggle-open');
			});			
		}		
	});

	$(".dt-menu-expand").click(function(){
		if( $(this).hasClass("dt-mean-clicked") ){
			$(this).text("+");
			if( $(this).prev('ul').length ) {
				$(this).prev('ul').slideUp(300);
			} else {
				$(this).prev('.megamenu-child-container').find('ul:first').slideUp(300);
			}
		} else {
			$(this).text("-");
			if( $(this).prev('ul').length ) {
				$(this).prev('ul').slideDown(300);
			} else{
				$(this).prev('.megamenu-child-container').find('ul:first').slideDown(300);
			}
		}
		
		$(this).toggleClass("dt-mean-clicked");
		return false;
	});

	currentWidth = window.innerWidth || document.documentElement.clientWidth;
	if( currentWidth > 767 ){
		DTMenuHover();
	}
	//Mobile Menu End	
	
	$('.dt-search-icon.type1').on('click', function(e){
		e.stopPropagation();
		$('#header .top-menu-search-container').toggleClass('show-top-menu-search');
	});

	//Portfolio single
	if( $(".dt-portfolio-single-slider").find("li").length > 1 ) {
		$(".dt-portfolio-single-slider").bxSlider({ auto:false, video:true, useCSS:false, pagerCustom: '#bx-pager', autoHover:true, adaptiveHeight:true, controls:false });
	}

	var $pphoto = $('a[data-gal^="prettyPhoto[gallery]"]');
	if ($pphoto.length) {
		$pphoto.prettyPhoto({
			hook: 'data-gal',
			show_title: false,
			deeplinking: false,
			social_tools: false,
			default_width: 500,
			default_height: 344
       });
	}

	$('a.video-image').prettyPhoto({
		animation_speed:'normal',
		theme:'facebook',
		slideshow:3000,
		autoplay_slideshow: false,
		social_tools: false,
		deeplinking:false
	});

	$('.downcount').each(function(){
		var el = $(this);
		el.downCount({
			date	: el.attr('data-date'),
			offset	: el.attr('data-offset')
		});
	});
	
	$('p:empty').each(function (){
		$(this).next('br').remove();
		$(this).remove();
	});

	if( currentWidth > 767 ){
		if( $('#primary').hasClass('with-both-sidebar') ) {
		   if( ( $('#secondary-left').is(':empty') && $('#secondary-right').is(':empty')) ){
				$('#primary').css({'width': '100%', 'margin': 0});
		   }
		} else if( $('#primary').hasClass('with-left-sidebar') ) {
		   if( $('#secondary-left').is(':empty') ){
				$('#primary').css({'width': '100%', 'margin': 0});
		   }
		} else if( $('#primary').hasClass('with-right-sidebar') ) {
		   if( $('#secondary-right').is(':empty') ){
				$('#primary').css({'width': '100%', 'margin': 0});
		   }
		}
	}

	$('.dt-sc-contact-details-on-map a.map-switch-icon').on( "click", function() {
		$(this).parents('.dt-sc-contact-details-on-map').toggleClass('hide-overlay');
		$('.dt-sc-map-overlay').toggle();		
		return false;
	});

	$('.dt-sc-contact-details-on-map a.switch-icon').on( "click", function() {
		$(this).parents('.dt-sc-contact-details-on-map').addClass('hide-overlay');
		$('.dt-sc-map-overlay').toggle();
		$('.back-to-contact').toggle();
		return false;
	});

	$('.dt-sc-contact-details-on-map a.back-to-contact').on( "click", function() {
		$(this).parents('.dt-sc-contact-details-on-map').removeClass('hide-overlay');
		$('.dt-sc-map-overlay').toggle();
		$(this).toggle();
		return false;
	});

	//Smart Resize Start
	$(window).bind("resize", function() {
		//Blog Template
		if( $(".apply-isotope").length ) {
			$(".apply-isotope").isotope({itemSelector : '.column',transformsEnabled:false,masonry: { columnWidth: '.grid-sizer' } });
		}

		//Portfolio Template
		if( $('.dt-sc-portfolio-container').length ) {
			$('.dt-sc-portfolio-container').css({overflow:'hidden'}).isotope({itemSelector : '.column',masonry: { columnWidth: '.grid-sizer' } });
		}		
	});

	// Window Load Start
	$(window).load(function(){

		var portfolioHeight = $('.dt-sc-portfolio-wrapper .portfolio:first').height();
		$('.icon-link-title').css('height', portfolioHeight+'px');	

		//Blog Template
		if( $(".apply-isotope").length ) {
			$(".apply-isotope").isotope({itemSelector : '.column',transformsEnabled:false,masonry: { columnWidth: '.grid-sizer' } });
		}
		//Blog Template End

		//Portfolio Template : Sorting
		var $container = $('.dt-sc-portfolio-container');
		if( $container.length) {

			$container.isotope({
				filter: '*',
				masonry: { columnWidth: '.grid-sizer' },
				animationOptions: { duration: 750, easing: 'linear', queue: false  }
			});
		}//Isotope End

		if($("div.dt-sc-portfolio-sorting").length){

			$("div.dt-sc-portfolio-sorting a").on('click',function(){
				$("div.dt-sc-portfolio-sorting a").removeClass("active-sort");

				var selector = $(this).attr('data-filter');
				$(this).addClass("active-sort");

				$('.dt-sc-portfolio-container').isotope({
					filter: selector,
					masonry: { columnWidth: '.grid-sizer' },
					animationOptions: { duration:750, easing: 'linear',  queue: false }
				});

				return false;
			});
		}
		//Portfolio Template : Sorting End

		//Gallery Post Slider
		if( ($("ul.entry-gallery-post-slider").length) && ( $("ul.entry-gallery-post-slider li").length > 1 ) ){
			$("ul.entry-gallery-post-slider").bxSlider({auto:false, video:true, useCSS:false, pager:'', autoHover:true, adaptiveHeight:true});
		}
	});

	$(".dt-like-this").click(function(){

		var el = jQuery(this);

		if( el.hasClass('liked') ) {
			return false;
		}

		var post = {
			action: 'vigil_likes_ajax',
			post_id: el.attr('data-id')
		};

		$.post(dttheme_urls.ajaxurl, post, function(data){
			el.find('span').html(data);
			el.addClass('liked');
		});
		return false;
	});

	if($('body').hasClass('page-template-tpl-onepage')) {
		$('nav#main-menu ul.menu').visualNav({
			selectedClass     : 'current_page_item',
			externalLinks     : 'external',
			useHash           : false
		});
		$('nav#main-menu ul.menu-left').visualNav({
			selectedClass     : 'current_page_item',
			externalLinks     : 'external',
			useHash           : false
		});
		$('nav#main-menu ul.menu-right').visualNav({
			selectedClass     : 'current_page_item',
			externalLinks     : 'external',
			useHash           : false
		});
		$('.left-header nav#main-menu ul.menu, .left-header-boxed nav#main-menu ul.menu, .left-header-creative nav#main-menu ul.menu').visualNav({
			selectedClass     : 'current_page_item',
			externalLinks     : 'external',
			useHash           : false
		});
	} else {
		if($('nav#main-menu ul.menu li a[href^="#"]').length){
			$('nav#main-menu ul.menu li a[href^="#"]').on('click', function(e) {
				$(location).attr('href', dttheme_urls.url+'/' + $(this).attr('href'));
			});
		}
	}

	if($('body').hasClass('left-header-creative')) {
		$('#header-wrapper').simpleSidebar({
			opener: '#toggle-sidebar',
			wrapper: '#main',
			animation: {
				easing: "easeOutQuint"
			},
			sidebar: {
				align: 'left',
				width: 260
			},
			sbWrapper: {
				display: true
			}
		});
		
		$('#toggle-sidebar, div[data-simplesidebar="mask"]').click(function(){
			$('#toggle-sidebar').toggleClass('close-icon');
		});		
	}
	$('input, textarea').placeholder();

	// Toggle store locator advacned options
	$("a.dt-sc-toggle-advanced-options").click(function( event ){
		event.preventDefault();
		var $this = $(this);
		$this.parents('.wpsl-search').find( "div.dt-sc-advanced-options" ).slideToggle( "slow", function() {
			$this.toggleClass('expanded');
			if($this.hasClass('expanded')) {
				$this.html(dttheme_urls.advOptions + ' <span class="fa fa-angle-up"></span>');
			} else {
				$this.html(dttheme_urls.advOptions + ' <span class="fa fa-angle-down"></span>');
			}
		});
	});

	$('#main .sidebar-as-sticky').theiaStickySidebar({
		additionalMarginTop: 70,
		containerSelector: $('#primary').parent('.container')
	});

	if($('.sidenav-sticky').length){
		$('.sidenav-sticky .side-navigation').theiaStickySidebar({
			additionalMarginTop: 90,
			containerSelector: $('#primary')
		});
	}
	
	//Animate Post Images
    $(".blog-entry .entry-thumb img.animate").each(function(){
	  $(this).one('inview', function (event, visible) {
		  if(visible) {
			  $(this).addClass($(this).attr('data-animate'));
		  }
	  });
    });

	//Sinle post like btn
	if( $(".single-post").length ) {
		$(".dt_like_btn a").on("click",function() {
			var btn = $(this);
			var post_id = btn.data("postid");
			var act = btn.data("action");

			$.ajax({
				type: "post",
				url: dttheme_urls.ajaxurl,
				data: { action: 'vigil_post_rating_like',
						nonce: dttheme_urls.wpnonce,
						post_id: post_id,
						doaction: act
					  },
				success: function(data, textStatus, XMLHttpRequest){
						btn.find('i').text(data);
				},
				error: function(MLHttpRequest, textStatus, errorThrown){
					//alert(textStatus);
				}
			});
			return false;
		});
	}

	//Scroll down animate
	$(".dt_scroll_down a").click(function(a) {
		a.preventDefault();

		var st = 0;
		if(dttheme_urls.stickynav === 'enable') {
			st = 90;
		}

		$("html, body").stop();
		$("html, body").animate({
			scrollTop: $('.entry-details.within-image').offset().top - st
		}, {
			duration: 1000,
			easing: "easeInOutQuart"
		});
	});
});

(function() {

	function dttoggleOverlay() {
		if( classie.has( overlay, 'open' ) ) {
			classie.remove( overlay, 'open' );
			classie.add( overlay, 'close' );
			var onEndTransitionFn = function( ev ) {
				if( support.transitions ) {
					if( ev.propertyName !== 'visibility' ) return;
					this.removeEventListener( transEndEventName, onEndTransitionFn );
				}
				classie.remove( overlay, 'close' );
			};
			if( support.transitions ) {
				overlay.addEventListener( transEndEventName, onEndTransitionFn );
			}
			else {
				onEndTransitionFn();
			}
		}
		else if( !classie.has( overlay, 'close' ) ) {
			classie.add( overlay, 'open' );
		}
	}
	
	if(jQuery('div.overlay.overlay-hugeinc').length) {
	
		var triggerBttn = document.getElementById( 'trigger-overlay' ),
			overlay = document.querySelector( 'div.overlay' ),
			closeBttn = overlay.querySelector( 'div.overlay-close' );
			transEndEventNames = {
				'WebkitTransition': 'webkitTransitionEnd',
				'MozTransition': 'transitionend',
				'OTransition': 'oTransitionEnd',
				'msTransition': 'MSTransitionEnd',
				'transition': 'transitionend'
			},
			transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ],
			support = { transitions : Modernizr.csstransitions };
			
		triggerBttn.addEventListener( 'click', dttoggleOverlay );
		closeBttn.addEventListener( 'click', dttoggleOverlay );
	}
	
	if(jQuery('div.overlay.overlay-search').length) {
		
		var triggerBttn = document.getElementById( 'overlay-search-type2' ),
			overlay = document.querySelector( 'div.overlay' ),
			closeBttn = overlay.querySelector( 'div.overlay-close' );
			transEndEventNames = {
				'WebkitTransition': 'webkitTransitionEnd',
				'MozTransition': 'transitionend',
				'OTransition': 'oTransitionEnd',
				'msTransition': 'MSTransitionEnd',
				'transition': 'transitionend'
			},
			transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ],
			support = { transitions : Modernizr.csstransitions };
			
		triggerBttn.addEventListener( 'click', dttoggleOverlay );
		closeBttn.addEventListener( 'click', dttoggleOverlay );
	}
})();