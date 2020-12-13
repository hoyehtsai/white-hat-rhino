jQuery(document).ready(function($) {

	"use strict";

	/* animate number */
	$('.dt-sc-counter').each(function(){

	  var $posttext = $(this).find('.dt-sc-counter-number').attr('data-append');
	  var $append = ''; 

	  if (typeof $posttext === "undefined") {
		  $append = $.animateNumber.numberStepFactories.append('');
	  } else {
		  $append = $.animateNumber.numberStepFactories.append($posttext);
	  }

	  $(this).one('inview', function (event, visible) {
		  if(visible === true) {
			  var val = $(this).find('.dt-sc-counter-number').attr('data-value');
			  $(this).find('.dt-sc-counter-number').animateNumber({ number: val, numberStep: $append }, 2000);
		  }
	  });
	});

	/* accordion & toggle */
	$('.dt-sc-toggle').toggle(function(){ $(this).addClass('active'); },function(){ $(this).removeClass('active'); });
	$('.dt-sc-toggle').click(function(){ $(this).next('.dt-sc-toggle-content').slideToggle(); });
	
	$('.dt-sc-toggle-frame-set').each(function(){
		var $this = $(this),
		    $toggle = $this.find('.dt-sc-toggle-accordion');
			
			$toggle.click(function(){
				if( $(this).next().is(':hidden') ) {
					$this.find('.dt-sc-toggle-accordion').removeClass('active').next().slideUp();
					$(this).toggleClass('active').next().slideDown();
				}
				return false;
			});

			// activate first item always
			$this.find('.dt-sc-toggle-accordion:first').addClass("active");
			$this.find('.dt-sc-toggle-accordion:first').next().slideDown();
  	});

	/* tooltip */
	if($(".dt-sc-tooltip-bottom").length){
	   $(".dt-sc-tooltip-bottom").each(function(){	$(this).tipTip({maxWidth: "auto"}); });
	}
	
	if($(".dt-sc-tooltip-top").length){
	   $(".dt-sc-tooltip-top").each(function(){ $(this).tipTip({maxWidth: "auto",defaultPosition: "top"}); });
	}
	
	if($(".dt-sc-tooltip-left").length){
	   $(".dt-sc-tooltip-left").each(function(){ $(this).tipTip({maxWidth: "auto",defaultPosition: "left"}); });
	}
	
	if($(".dt-sc-tooltip-right").length){
	   $(".dt-sc-tooltip-right").each(function(){ $(this).tipTip({maxWidth: "auto",defaultPosition: "right"}); });
	}

	/* horizontal tabs */
	if($('ul.dt-sc-tabs-horizontal').length > 0){
		$('ul.dt-sc-tabs-horizontal').each(function(){

			var $effect = $(this).parent('.dt-sc-tabs-horizontal-container').attr('data-effect');
			$(this).fpTabs('> .dt-sc-tabs-horizontal-content', {
				effect: $effect
			});
		});
	}
	if($('ul.dt-sc-tabs-horizontal-frame').length > 0){
		$('ul.dt-sc-tabs-horizontal-frame').each(function(){

			var $effect = $(this).parent('.dt-sc-tabs-horizontal-frame-container').attr('data-effect');
			$(this).fpTabs('> .dt-sc-tabs-horizontal-frame-content', {
				effect: $effect
			});
		});
	}

	/* vertical tabs */
	if($('ul.dt-sc-tabs-vertical').length > 0){
		$('ul.dt-sc-tabs-vertical').each(function(){

			var $effect = $(this).parent('.dt-sc-tabs-vertical-container').attr('data-effect');
			$(this).fpTabs('> .dt-sc-tabs-vertical-content', {
				effect: $effect
			});
		});

		$('.dt-sc-tabs-vertical').each(function(){
			$(this).find("li:first").addClass('first').addClass('current');
			$(this).find("li:last").addClass('last');
		});

		$('.dt-sc-tabs-vertical li').click(function(){
			$(this).parent().children().removeClass('current');
			$(this).addClass('current');
		});
	}
	if($('ul.dt-sc-tabs-vertical-frame').length > 0){
		$('ul.dt-sc-tabs-vertical-frame').each(function(){

			var $effect = $(this).parent('.dt-sc-tabs-vertical-frame-container').attr('data-effect');
			$(this).fpTabs('> .dt-sc-tabs-vertical-frame-content', {
				effect: $effect
			});
		});

		$('.dt-sc-tabs-vertical-frame').each(function(){
			$(this).find("li:first").addClass('first').addClass('current');
			$(this).find("li:last").addClass('last');
		});

		$('.dt-sc-tabs-vertical-frame li').click(function(){
			$(this).parent().children().removeClass('current');
			$(this).addClass('current');
		});
	}

	/* ajax mailchimp */
	$('form[name="frmsubscribe"]').each(function(){

		$(this).submit(function(){
			var $this = $(this);
			var $mc_fname = $this.find("input[name='dt_mc_fname']").val(),
				$mc_email = $this.find("input[name='dt_mc_emailid']").val(),
				$mc_apikey = $this.find("input[name='dt_mc_apikey']").val(),
				$mc_listid = $this.find("input[name='dt_mc_listid']").val();

			$.ajax({
				type: "post",
				dataType : "html",
				url: dttheme_urls.ajaxurl,
				data:
				{
					action: 'dt_theme_mailchimp_subscribe',
					mc_fname: $mc_fname,
					mc_email: $mc_email,
					mc_apikey: $mc_apikey,
					mc_listid: $mc_listid
				},
				success: function (response) {
					$this.parent().find('.dt_ajax_subscribe_msg').html(response);
					$this.parent().find('.dt_ajax_subscribe_msg').slideDown('slow');
					if (response.match('success') != null) $this.slideUp('slow');
				}
			});
			return false;
		});
    });

	$(window).load(function(){

		/* testimonial carousel */
		if($(".carousel_items").length) {
			$(".carousel_items .dt-sc-testimonial-carousel").each(function(){
	
			  var $prev = $(this).parents(".carousel_items").find(".testimonial-prev");
			  var $next = $(this).parents(".carousel_items").find(".testimonial-next");
			  var $anim = $(this).parents(".carousel_items").attr("data-animation");
	
			  $(this).carouFredSel({
				responsive: true,
				auto: true,
				width: '100%',
				prev: $prev,
				next: $next,
				height: 'variable',
				scroll: { easing: "linear", duration: 500, fx : $anim },
				items: { width: 1170, height: 'variable',  visible: { min: 1, max: 1 } },
				swipe: {
					onMouse: true,
					onTouch: true
				}
			  });
			});
		}
		
		/* partners carousel */
		if($(".dt-sc-partners-carousel").length) {
			$(".dt-sc-partners-carousel").each(function(){

				var $prev = $(this).parents(".dt-sc-partners-carousel-wrapper").find(".partners-prev");
				var $next = $(this).parents(".dt-sc-partners-carousel-wrapper").find(".partners-next");
				var $scroll = $(this).parents(".dt-sc-partners-carousel-wrapper").attr('data-scroll');
				var $visible = $(this).parents(".dt-sc-partners-carousel-wrapper").attr('data-visible');
				
				$(this).carouFredSel({
					responsive: true,
					auto: true,
					width: '100%',
					height: 'variable',
					prev: $prev,
					next: $next,
					scroll: parseInt($scroll), // The number of items to scroll at once
					items: {
						visible:{
							min: 1,
							max: parseInt($visible) // The number of items to show at once
						}
					},
					swipe: {
						onMouse: true,
						onTouch: true
					}
				});
			});
		}

		/* images carousel */
		if($(".dt-sc-images-carousel").length) {
			$(".dt-sc-images-carousel").each(function(){

				var $prev = $(this).parents(".dt-sc-images-wrapper").find(".images-prev");
				var $next = $(this).parents(".dt-sc-images-wrapper").find(".images-next");

				$(this).carouFredSel({
					responsive: true,
					auto: true,
					width: '100%',
					height: 'variable',
					prev: $prev,
					next: $next,
					scroll: 1,
					items: {
						width:570,
						height: 'variable',
						visible: { min: 1, max: 1 }
					},
					swipe: {
						onMouse: true,
						onTouch: true
					}
				});
			});
		}
	
		/* twitter carousel */
		if($('.dt-sc-twitter-carousel-wrapper').length > 0) {
			$('.dt-sc-twitter-carousel-wrapper .dt-sc-twitter-carousel').carouFredSel({
				width: 'auto',
				height: 'auto',
				scroll: 1,
				direction: 'up',
				items: {
					height: 'auto',
					visible: { min: 1, max: 1 }
				}
			});
		}

		/* special testimonials */
		if($('.dt-sc-testimonial-special-wrapper').length > 0) {
			$('.dt-sc-testimonial-special-wrapper .dt-sc-testimonial-special').carouFredSel({
				responsive: true,
				auto: true,
				width: '100%',
				pagination: {
					container: ".dt-sc-testimonial-images",
					anchorBuilder: false
				},
				height: 'auto',
				scroll: { fx: "crossfade" },
				items: { visible: { min: 1, max: 1 } }
			});
		}

		/* donutchart */
		$(".dt-sc-donutchart").each(function(){
			var $this = $(this);
			var $bgColor =  ( $this.data("bgcolor") !== undefined ) ? $this.data("bgcolor") : "#5D18D6";
			var $fgColor =  ( $this.data("fgcolor") !== undefined ) ? $this.data("fgcolor") : "#000000";
			var $size = ( $this.data("size") !== undefined ) ? $this.data("size") : "100";
		 
			$this.donutchart({'size': $size, 'fgColor': $fgColor, 'bgColor': $bgColor , 'donutwidth' : 5 });
			$this.donutchart('animate');
		});

		//Carousel Items...
		if($(".carousel_items").length) {
			$(".carousel_items .dt_carousel").each(function(){

			  var $min = parseInt($(this).attr('data-visible'));
			  var $scroll = parseInt($(this).attr('data-scroll'));
			  var $auto = false;
			  if($(this).attr('data-auto') == 'true') {
				  $auto = true;
			  }
			  var $animation = $(this).attr('data-animation');

			  if($(window).width() <= 767) { $min = 1; }

			  var prv = $(this).parent('.carousel_items').find('.prev-arrow'); var nxt = $(this).parent('.carousel_items').find('.next-arrow');
			  var pager = $(this).parent('.carousel_items').find('.dt-carousel-pagination');

			  $(this).carouFredSel({
				responsive: true,
				auto: $auto,
				width: '100%',
				prev: prv,
				next: nxt,
				pagination: pager,
				height: 'variable',
				scroll: { items: $scroll, fx: $animation },
				items: { width: parseInt( 1170 / $min ),  height: 'variable', visible: { min: $min } },
				onCreate: function () {
					$(window).bind("resize", function() {
						$(this).trigger('configuration', ['debug', false, true]);
					}).trigger('resize');
				},
				swipe: {
					onMouse: true,
					onTouch: true
				}
			  });
			});
		}

		$('.dt-sc-special-testimonial').each( function() {

			$(this).find('.testimonial-details-for').slick({
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: false,
				fade: true,
				asNavFor: '.testimonial-details-nav'
			});
	
			var dots = $(this).find('.testimonial-details-nav').attr('data-dots');
			if(dots == undefined) {
				dots = false;
			}
			dots = Boolean(dots);
	
			var itemstoshow = $(this).find('.testimonial-details-nav').attr('data-itemstoshow');
			if(itemstoshow == undefined) {
				itemstoshow = 5;
			}
	
			itemstoshow = parseInt(itemstoshow, 10);
	
			$(this).find('.testimonial-details-nav').slick({
				slidesToShow: itemstoshow,
				slidesToScroll: 1,
				asNavFor: '.testimonial-details-for',
				dots: dots,
				centerMode: true,
				focusOnSelect: true,
				responsive: [
				  {
					breakpoint: 992,
					settings: {
					  slidesToShow: 5,
					  slidesToScroll: 5,
					  dots: dots,
					}
				  },
				  {
					breakpoint: 768,
					settings: {
					  slidesToShow: 3,
					  slidesToScroll: 3
					}
				  },
				  {
					breakpoint: 480,
					settings: {
					  slidesToShow: 1,
					  slidesToScroll: 1
					}
				  }
				]
			});
		});
	});

	/* parallax section */
	if($(".dt-sc-parallax-section").length) {
		$('.dt-sc-parallax-section').each(function(){
			$(this).bind('inview', function (event, visible) {
				if(visible === true) {
					$(this).parallax("50%", 0.5);
				} else {
					$(this).css('background-position', '');
				}
			});
		});
	}

	/* video manager */
	if($(".dt-sc-video-wrapper").length) {
		
		if($(".dt-sc-video-item").length) {
			
			$(".dt-sc-video-item").each(function(){
				$(this).click(function(){
					$('.video-overlay-inner a').attr('href', $(this).attr('data-link'));
					$('.dt-sc-video-wrapper img').attr('src', $(this).find('.dt-sc-vitem-thumb img').attr('data-full'));
					$('.video-overlay-inner h2').html($(this).find('h2').html());
					$('.video-overlay-inner p').html($(this).find('p').html());
					$(this).parent('div').children().removeClass('active');
					$(this).addClass('active');
				});
			});
		}
		
		$(".video-overlay-inner a").prettyPhoto({animation_speed:'normal',theme:'light_square',slideshow:3000, autoplay_slideshow: false,social_tools: false,deeplinking:false});
		var video_scroll = $(".dt-sc-video-manager-right").niceScroll({ cursorcolor:"#ffffff", cursorwidth: "2px"});
		video_scroll.rail.addClass('dt-sc-skin');
	}

	/* Load More Button */
	$('.dt-sc-infinite-portfolio-load-more').each(function(){

		var $this = $(this),
			$x = $(this).prev('.dt-sc-infinite-portfolio-container').data('paged'),
			$xstyle = $(this).data('style');

		if(  $xstyle == 'lazy' ) {
			$(window).scroll(function(){
				if($(window).scrollTop() == $(document).height() - $(window).height()){

					var $per_page = $this.data('per-page'),
						$term = $this.data('term'),
						$style = $this.data('style'),
						$paged = $x,
						$prev = $this.prev();

					$x++;

					$.ajax({
						type : "post",
						dataType : "html",
						url : dttheme_urls.ajaxurl,
						data : { action: "dt_ajax_infinite_portfolios", per_page : $per_page, term : $term, style: $style , paged: $paged },
						success: function (data) {
							if (data.length > 0) {
								$prev.append( data );
							} else {
								$prev.find(".message").removeClass("hidden");
								//$this.addClass('hidden');

								setTimeout(function(){
									$prev.find(".message").addClass('hidden');
									$this.addClass('disable');									
								}, 5000);								
							}
						},
						error: function (jqXHR, textStatus, errorThrown) {
						}
					});				
				}
			});
		} else if( $xstyle == 'load-more') {

			$this.click(function(e){

				e.preventDefault();

				var $per_page = $(this).data('per-page'),
					$term = $(this).data('term'),
					$style = $(this).data('style'),
					$paged = $x,
					$prev = $(this).prev();

				$x++;

				$.ajax({
					type : "post",
					dataType : "html",
					url : dttheme_urls.ajaxurl,
					data : { action: "dt_ajax_infinite_portfolios", per_page : $per_page, term : $term, style: $style , paged: $paged },
					success: function (data) {

						if (data.length > 0) {
							$prev.append( data );
						} else {
							$prev.find(".message").removeClass("hidden");
							//$this.addClass('hidden');

							setTimeout(function(){
								$prev.find(".message").addClass('hidden');
								$this.addClass('disable');
							}, 5000);
						}
					},
					error: function (jqXHR, textStatus, errorThrown) {
					}
				});
			});
		}
	});
});

/* progress bar */
(function($){
	$(".dt-sc-progress").one('inview', function (event, visible) {
		var $this = $(this),
		pvalue = $this.find('.dt-sc-bar').attr('data-value');
		
		if (visible == true) {
			$this.find('.dt-sc-bar').animate({width: pvalue + "%"},600,function(){ $this.find('.dt-sc-bar-text').fadeIn(400); });
		}
	});
})(jQuery);