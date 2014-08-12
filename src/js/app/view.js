
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
			var that = this;
			switch(app.model.get('currentStep')) {
				case 'start':
					this.el.transition({opacity: 0, x: 10}, function() {
						that.el.html(that.templates.start.html());
						$('#softbtn').click(function(){
							app.model.set({
								typeData: app.settings.soft,
								currentStep: 'prep'});
						});
						$('#softbtn').hover(
							function() {
								$(this).stop();
								$(this).transition({scale: 1.2}, 200);
							},
							function() {
								$(this).stop();
								$(this).transition({scale: 1}, 200);
							});

						$('#mediumbtn').click(function(){
							app.model.set({
								typeData: app.settings.medium,
								currentStep: 'prep'});
						});
						$('#mediumbtn').hover(
							function() {
								$(this).stop();
								$(this).transition({scale: 1.2}, 200);
							},
							function() {
								$(this).stop();
								$(this).transition({scale: 1}, 200);
							});

						$('#hardbtn').click(function(){
							app.model.set({
								typeData: app.settings.hard,
								currentStep: 'prep'});
						});
						$('#hardbtn').hover(
							function() {
								$(this).stop();
								$(this).transition({scale: 1.2}, 200);
							},
							function() {
								$(this).stop();
								$(this).transition({scale: 1}, 200);
							});
					}).transition({opacity: 1, x: 0}, 500);
					break;
				case 'prep':
					console.log(app.model.attributes);
					this.el.transition({opacity: 0, x: -10}, 500, function() {
						console.log(that);
						that.el.css({x: 10});
						that.el.html(
							_.template(that.templates.prep.html(),
							app.model.get('typeData').prep));

						$('.step_prep .btn').click(function() {
							app.model.set({currentStep: 'boil'});
							app.model.start_time(app.model.get('typeData').boil.time);
						});
					}).transition({opacity: 1, x: 0}, 500);
					break;
				case 'boil':
					console.log(app.model.attributes);

					this.el.transition({opacity: 0, x: -10}, 500, function() {
						console.log(that);
						that.el.css({x: 10});
						that.el.html(
							_.template(that.templates.boil.html(),
							app.model.get('typeData').boil));
						that.timeVisual = $('#timeVisual');

						// Cancel
						$('.step_boil .btn').click(function() {
							app.model.stop_time();
							app.model.set({currentStep: 'start'});
						});
					}).transition({opacity: 1, x: 0}, 500);

					break;
				case 'rinse':
					console.log(app.model.attributes);

					this.el.transition({opacity: 0, x: -10}, 500, function() {
						console.log(that);
						that.el.css({x: 10});
						that.el.html(
							_.template(that.templates.rinse.html(),
							app.model.get('typeData').rinse));

						that.timeVisual = $('#timeVisual');

						// Cancel
						$('.step_rinse .btn').click(function() {
							app.model.stop_time();
							app.model.set({currentStep: 'start'});
						});
					}).transition({opacity: 1, x: 0}, 500);
					
					break;
				case 'wait':
					console.log(app.model.attributes);
					this.el.transition({opacity: 0, x: -10}, 500, function() {
						console.log(that);
						that.el.css({x: 10});
						that.el.html(
							_.template(that.templates.wait.html(),
							app.model.get('typeData').wait));

						that.timeVisual = $('#timeVisual');

						// Cancel
						$('.step_wait .btn').click(function() {
							app.model.stop_time();
							app.model.set({currentStep: 'start'});
						});
					}).transition({opacity: 1, x: 0}, 500);

					
					break;
				case 'end':
					console.log(app.model.attributes);

					this.el.transition({opacity: 0, x: -10}, 500, function() {
						console.log(that);
						that.el.css({x: 10});
						that.el.html(
							_.template(that.templates.end.html(),
							app.model.get('typeData').end));

						that.timeVisual = $('#timeVisual');

						// Reset
						$('.step_end .btn').click(function() {
							app.model.set({currentStep: 'start'});
						});
					}).transition({opacity: 1, x: 0}, 500);

					break;
			}
		},

		change_time: function() {
			if (!this.timeVisual) return;

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

