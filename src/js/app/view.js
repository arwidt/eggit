
var app = app || {};

(function($) {
	'use strict';

	app.EggitView = Backbone.View.extend({
		el: '',
		timeVisual: null,
		
		initialize: function() {
			var that = this;

			this.el = $('#apparea');
			this.initTemplates();

			this.listenTo(app.model, 'change:currentStep', that.change_currentStep);
			this.listenTo(app.model, 'change:time', that.change_time);
		},

		initTemplates: function() {
			this.templates = {
				start: $("#template_start"),
				prep: $("#template_prep"),
				boil: $("#template_boil"),
				rinse: $("#template_rinse"),
				wait: $("#template_wait"),
				end: $("#template_end")};
		},

		change_currentStep: function() {
			switch(app.model.get('currentStep')) {
				case 'start':
					this.el.html(this.templates.start.html());
					$('#soft').click(function(){
						app.model.set({
							typeData: app.settings.soft,
							currentStep: 'prep'});
					});
					$('#medium').click(function(){
						app.model.set({
							typeData: app.settings.medium,
							currentStep: 'prep'});
					});
					$('#hard').click(function(){
						app.model.set({
							typeData: app.settings.hard,
							currentStep: 'prep'});
					});
					break;
				case 'prep':
					console.log(app.model.attributes);
					this.el.html(
						_.template(this.templates.prep.html(),
						app.model.get('typeData').prep));

					$('.step_prep .btn').click(function() {
						app.model.set({currentStep: 'boil'});
						app.model.start_time(app.model.get('typeData').boil.time);
					});
					break;
				case 'boil':
					console.log(app.model.attributes);
					this.el.html(
						_.template(this.templates.boil.html(),
						app.model.get('typeData').boil));

					this.timeVisual = $('#timeVisual');

					// Cancel
					$('.step_boil .btn').click(function() {
						app.model.stop_time();
						app.model.set({currentStep: 'start'});
					});
					break;
				case 'rinse':
					console.log(app.model.attributes);
					this.el.html(
						_.template(this.templates.rinse.html(),
						app.model.get('typeData').rinse));

					this.timeVisual = $('#timeVisual');

					// Cancel
					$('.step_rinse .btn').click(function() {
						app.model.stop_time();
						app.model.set({currentStep: 'start'});
					});
					break;
				case 'wait':
					console.log(app.model.attributes);
					this.el.html(
						_.template(this.templates.wait.html(),
						app.model.get('typeData').wait));

					this.timeVisual = $('#timeVisual');

					// Cancel
					$('.step_wait .btn').click(function() {
						app.model.stop_time();
						app.model.set({currentStep: 'start'});
					});
					break;
				case 'end':
					console.log(app.model.attributes);
					this.el.html(
						_.template(this.templates.end.html(),
						app.model.get('typeData').end));

					this.timeVisual = $('#timeVisual');

					// Reset
					$('.step_end .btn').click(function() {
						app.model.set({currentStep: 'start'});
					});
					break;
			}
		},

		change_time: function() {
			var time = app.model.get('time');
			this.timeVisual.html(TimeConvert.milliseconds_to_mmss(time));

			if (time <= 0) {
				switch(app.model.get('currentStep')) {
					case 'boil':
						app.model.stop_time();
						app.model.set({currentStep: 'rinse'});
						app.model.start_time(app.model.get('typeData').rinse.time);
						break;
					case 'rinse':
						app.model.stop_time();
						app.model.set({currentStep: 'wait'});
						app.model.start_time(app.model.get('typeData').wait.time);
						break;
					case 'wait':
						app.model.stop_time();
						app.model.set({currentStep: 'end'});
						break;
				}
			}
		},

		render: function() {
			//console.log('render');
		}

	});

})(jQuery);

