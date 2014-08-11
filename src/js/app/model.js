
var app = app || {};

(function(){
	'use strict';

	app.EggitModel = Backbone.Model.extend({
		defaults: {
			title: '',
			currentStep: '',
			typeData: null,
			time: 0,
			timer: null
		},
		
		initialize: function() {
			console.log('initialize model');
		},

		// TIMER
		start_time: function(time_val) {
			var that = this;
			this.set({time: time_val});
			this.attributes.timer = setInterval(function() { that.update_timer(); }, 1000);
		},

		stop_time: function() {
			clearInterval(this.attributes.timer);
		},

		update_timer: function() {
			this.set('time', this.get('time')-1000);

			if (this.get('time') <= 0) {
				this.stop_time();
			}
		}

	});

})();


