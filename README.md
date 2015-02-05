GTM Event Tracker
==============

A jQuery plugin to help with Google Tag Manager Event tracking.

How to use:

<strong>Step 1: Include jQuery</strong>

<pre>
&lt;script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"&gt;&lt;/script&gt;
</pre>

<strong>Step 2: Create your dataLayer</strong>

Classic Code (Replace GTM-XXXXX with your Google Tag Manager Account #)
<pre>
&lt;script&gt;
	var _gaq = _gaq || [];
	_gaq.push(['_setAccount', 'UA-XXXXXX-X']);
	_gaq.push(['_trackPageview']);
	(function () {
		var ga = document.createElement('script');
		ga.type = 'text/javascript';
		ga.async = true;
		ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
		var s = document.getElementsByTagName('script')[0];
		s.parentNode.insertBefore(ga, s);
	})();
&lt;/script&gt;
</pre>


<strong>Step 3: Include jquery.gtmeventtracker.js after gtm.js</strong>

<pre>
&lt;script src="//raw.github.com/bkingcis/gtm-event-tracker/v1.0/jquery.gtmeventtracker.js"&gt;&lt;/script&gt;
</pre>

<strong>Step 4: Modify HTML for tracked items</strong>

<pre>
&lt;a href="http://www.google.com" target="_blank" class="track-it" 
    data-gtm-category="Outbound Links" 
    data-gtm-action="Google" 
    data-gtm-label="Google Homepage" 
    data-gtm-value="100" 
    data-gtm-nonint="false" 
    data-gtm-delay="false"&gt;google.com&lt;/a&gt;
</pre>

<strong>Step 5: Initialize a new .gtmeventracker object on .ready()</strong>

<pre>
&lt;script&gt;
	jQuery( document ).ready(function( $ ) {
	
		$('.track-it').gtmeventtracker({ 		// Target all elements with class "track-it"
		
	  		'category' : 'Fallback Category',	// Fallback to use if data-ga-category attribute isn't set
	  		'action'   : 'Fallback Action',		// Fallback to use if data-ga-action attribute isn't set
	  		'label'    : 'Fallback Label',		// Fallback to use if data-ga-label attribute isn't set
	  		'value'    : 1234,			// Fallback to use if data-ga-value attribute isn't set
	  		'nonint'   : false,			// Fallback to use if data-ga-nonint attribute isn't set
	  		'delay'    : {
	  		               'status' : false 
			               }
			               
		});	
		
	});
&lt;/script&gt;
</pre>
