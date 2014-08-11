
var app = app || {};

(function(){
	'use strict';

	app.EggitModel = Backbone.Model.extend({
		defaults: {
			title: '',
			currentStep: ''
		},
		
		initialize: function() {
			console.log('initialize model');
		},

		step: function(val) {
			console.log('model.step', val);
			this.set('currentStep', val);
		}

	});

})();


