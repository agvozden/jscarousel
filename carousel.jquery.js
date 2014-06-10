/*
 * Jquery Carousel left / right by agvozden
 */
(function($) {
$.fn.carousel = function(options) {
	
	/*
	 * if ( this.length ) { return this.each(function(){ var newCarousel =
	 * Object.create(Carousel); newCarousel.init(options, this); $.data(this,
	 * 'carousel', newCarousel); }); }
	 */
	
	var settings=jQuery.extend({
		prevButton:		'#carousel-prev',
		nextButton:		'#carousel-next',
		autoscroll:		0,
		duration:		0,
		step:			0,
		width:			0,
		parent_width:	0,
		stop_at:		0,
		loop:			false,
		random:			false
	}, options);
	
	this.each(function(i, one) {
		
		// instance
		//if (!$(one).data('slider')) $(one).data('slider', $(i));
		//else return $(i); 

		// Setting variables...
		var $this = $(one);	// This box - component
		var slideAct = false;
		
		var btn = {};
		btn.prev = $(settings.prevButton);
		btn.next = $(settings.nextButton);

		var set=jQuery.extend({
			// Inherit settings value from default
			autoscroll:	settings.autoscroll,
			duration: settings.duration,
			step: settings.step,
			width: settings.width,
			parent_width: settings.parent_width,
			stop_at: settings.stop_at,
			loop: settings.loop,
			random: settings.random
		});
		
		function setAutoScroll() {
			myTimer = setInterval(function() {autoScroll();}, set.autoscroll);
			$this.data("autoscroll", set.autoscroll);
		}

		function autoScroll(){
			if ($this.data("autoscroll"))
			slidenext();
		}
		
		function setRandom(){
			var carousel_items = $this.children('li').length;
			var carousel_skip = Math.floor((Math.random()*carousel_items)+1);
			for ( var int = 0; int < carousel_skip; int++) {
				$this.append($this.children('li:first'));
			}
		}

		function slidenext(){
			if (slideAct) return false;
			
			if (set.loop){
				$this.append($this.children('li:first'));
				return;	
			}
			slideAct = true;

			var curpos = parseInt($this.css('left'));
			var width = parseInt($this.css('width')); // instance need
			if ( curpos>(0-width+set.parent_width) && (set.stop_at==0 || (curpos+width) > (set.step*(set.stop_at+1))) ){
				if (set.duration){
					$this.animate({left:(curpos-set.step)+'px'}, set.duration, function(){
						slideAct = false;
					});					
				} else {
					$this.css('left', (curpos-set.step)+'px');
					slideAct = false;
				}				
			} else slideAct = false;			
		}

		function slideprev(){
			if (slideAct) return false;
			slideAct = true;

			var curpos = parseInt($this.css('left'));
			if (curpos<0){
				if (set.duration){
					$this.animate({left:(curpos+set.step)+'px'}, set.duration, function(){
						slideAct = false;
					});
				} else {
					$this.css('left', (curpos+set.step)+'px');
					slideAct = false;
				}								
			} else slideAct = false;
		}
		
		// Initialise
		$(function(){

			// set total width
			if (set.width==0){
				$this.children('li').each(function() {
					set.width += $(this).outerWidth( true );
				});
				if (set.width==0) return false;
				$this.css('width', set.width);
			}
			
			if (set.step==0){
				set.step = $this.children('li').innerWidth()+'px';
			}
			
			// force left
			$this.css('left', '0px');

			btn.prev.click(slideprev);
			btn.next.click(slidenext);

			// set radnom
			if (set.random){
				setRandom();
			}				

			// set autoscroll
			if (set.autoscroll){
				setAutoScroll();
			}				
			
		});
		
	});

	return this;
}
})(jQuery);

