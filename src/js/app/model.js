
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
			console.log("start_time()", time_val);
			this.set({time: time_val});
			this.attributes.timer = setInterval(that.update_timer, 1000);
		},

		cancel_time: function() {

		},

		update_timer: function() {
			this.set('time', this.get('time')-1000);
		}
	});

})();


