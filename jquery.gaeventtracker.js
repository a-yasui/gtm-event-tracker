/*!
 * jQuery GA Event Tracker
 * Examples and documentation at: http://ga-event-tracker.wmxtools.com
 * Copyright (c) 2014 Derek Cavaliero
 * Version: 1.2 (10-SEPT-2014)
 * Requires: jQuery v1.4.3 or later
 */

;(function ($) {
    $.fn.gatrack = function (options) {
        var defaults = {
            'category': 'Tracked Element',
            'action': 'Clicked',
            'label': location.pathname,
            'value': 0,
            'nonint': true,
            'delay': true,
            'delay_timeout': 100,		  // time for delay in milliseconds
            'trigger': 'click',    // click | focus | blur
            'ga_type': 'classic',  // classic | universal | all
            'debug': {
                'type': 'console', // console or alert
                'status': true
            }
        };

        var settings = $.extend({}, defaults, options);

        return this.each(function (i, elem) {
            var $this = $(this);
            if (( $this.data('ga-nonint') !== undefined ) && ( $this.data('ga-nonint') !== settings.nonint )) {
                nonint = $this.data('ga-nonint');
            } else {
                nonint = settings.nonint;
            }

            if (( $this.data('ga-delay') !== undefined ) && ( $this.data('ga-delay') !== settings.delay )) {
                delay = $this.data('ga-delay');
            } else {
                delay = settings.delay;
            }

            var eventvalues = {
                'category': $this.data('ga-category') ? $this.data('ga-category') : settings.category,
                'action': $this.data('ga-action') ? $this.data('ga-action') : settings.action,
                'label': $this.data('ga-label') ? $this.data('ga-label') : settings.label,
                'value': $this.data('ga-value') ? $this.data('ga-value') : settings.value,
                'nonint': nonint,
                'delay': delay,
                'ga_type': $this.data('ga-type') ? $this.data('ga-type') : settings.ga_type,
                'link': $this.attr('href') ? $this.attr('href') : false,
                'trigger': $this.data('ga-trigger') ? $this.data('ga-trigger') : settings.trigger
            };

            $this.on(eventvalues.trigger, function (e) {

                if (eventvalues.delay) {
                    e.preventDefault();
                }

                trackEvent($this, eventvalues, e);

                switch (eventvalues.trigger) {

                    case 'click':
                        if (eventvalues.link && eventvalues.delay) {
                            setTimeout(function () {
                                document.location.href = eventvalues.link;
                            }, settings.delay_timeout);
                        }
                        break;
                }

                if (settings.debug.status) {

                    var debugString = '\nTrigger Action: ' + eventvalues.trigger +
                        '\nCategory: ' + eventvalues.category +
                        '\nAction: ' + eventvalues.action +
                        '\nLabel: ' + eventvalues.label +
                        '\nValue: ' + eventvalues.value +
                        '\nNon-Interaction: ' + eventvalues.nonint +
                        '\nDelay: ' + eventvalues.delay +
                        '\nDelay Length: ' + settings.delay_timeout + ' milliseconds' +
                        '\nGA Type: ' + eventvalues.ga_type +
                        '\nLink Value: ' + eventvalues.link;

                    switch (settings.debug.type) {

                        case 'alert':
                            alert(debugString);
                            break;

                        case 'console':
                        default:
                            console.log(debugString);
                            break;

                    }

                }

            });

        });

        function trackEvent(obj, eventvalues, e) {
            var sendBeacon = function (type) {
                switch (type) {
                    case 'classic':
                        _gaq.push(
                            [
                                '_trackEvent',
                                eventvalues.category,
                                eventvalues.action,
                                eventvalues.label,
                                eventvalues.value,
                                eventvalues.nonint
                            ]
                        );
                        break;

                    case 'universal':
                        ga('send', 'event',
                            eventvalues.category,
                            eventvalues.action,
                            eventvalues.label,
                            eventvalues.value, {
                                'nonInteraction': eventvalues.nonint
                                //'hitCallback': function() {}
                            }
                        );
                        break;
                }

            };

            switch (eventvalues.ga_type) {
                case 'all':
                    sendBeacon('classic');
                    sendBeacon('universal');
                    break;

                case 'universal':
                    sendBeacon('universal');
                    break;

                case 'classic':
                default:
                    sendBeacon('classic');
                    break;

            }

        }

    };

    $('a[data-ga-track], input[data-ga-track], textarea[data-ga-track], button[data-ga-track]').gatrack();
}(jQuery) );