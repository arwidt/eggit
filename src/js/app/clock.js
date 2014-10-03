
var app = app || {};

(function($) {
	'use strict';

	app.EggitClock = Backbone.View.extend({
		
		svgId: '',
		totalSeconds: '',
		clock: null,
		clockGroup: null,
		clockHead: null,
		minuteText: null,

		min_sec: null,
		dgr: null,
		mat: null,

		initialize: function(svgId) {
			this.clock = Snap.select(svgId);
			
			this.clockGroup = this.clock.select('#clock');

			this.time = 0;			
			
			var t = TimeConvert.seconds_to_minutes_and_secondsrest(this.time);
			
			var head_center = this.clock.select("#head_center");
			var head_line = this.clock.select("#head_line");
			var head_end = this.clock.select("#head_end");

			this.minuteText = this.clock.text(58, 60, t[0] + " min");
			this.clockHead = this.clock.group(head_center, head_line, head_end);
			this.colorBody = this.clock.select("#color_body");
		},

		update_time: function(seconds) {
			this.min_sec = TimeConvert.seconds_to_minutes_and_secondsrest(seconds);

			this.minuteText.node.textContent = this.min_sec[0] + " min";
			this.dgr = this.min_sec[1]*(360/60);
			this.mat = Snap.matrix();
			this.mat.rotate(this.dgr, 71.563, 75);
			this.clockHead.transform(this.mat);
		},

		set_color: function(color) {
			this.colorBody.attr({
				fill: color
			});
		},

		ring: function() {
			console.log("ring");
			//this.clockGroup.animate({
			//	fill: '#FF0000'
			//}, 2000);
		},

		render: function() {
			
		}
		
	});

})(jQuery);

