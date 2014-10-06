
var app = app || {};

(function(){
	'use strict';

	app.EggitModel = Backbone.Model.extend({
		defaults: {
			title: '',
			currentStep: '',
			typeData: null,
			
			egg_type: 0,
			egg_size: 0,
			
			boiltime: 0,
			rinsetime: 0,
			waittime: 0,
			
			time: 0,
			timer: null
		},
		
		initialize: function() {
			console.log('initialize model');
		},

		// Set the boil, rinse and wait times depending
		// on what type and size the eggs are.
		set_times: function() {
			var type = this.get('egg_type');
			var size = this.get('egg_size');
			var s = {
				boiltime: Math.ceil(app.settings.time.boil + (0.1*type) + (0.1*size)),
				rinsetime: Math.ceil(app.settings.time.rinse + (0.1*type) + (0.1*size)),
				waittime: Math.ceil(app.settings.time.wait + (0.1*type) + (0.1*size))
			};
			this.set(s);
		},

		// TIMER
		start_time: function(time_val) {
			console.log("start_time", time_val);

			var that = this;
			this.set({time: time_val});
			this.attributes.timer = setInterval(function() { that.update_timer(); }, 100);
		},

		stop_time: function() {
			console.log("stop_time");

			clearInterval(this.attributes.timer);
		},

		update_timer: function() {
			this.set('time', this.get('time')-1);
			if (this.get('time') <= 0) {
				this.set('time', 0);
				this.stop_time();
			}
		}

	});

})();


