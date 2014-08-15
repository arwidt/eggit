
var app = app || {};

(function($) {
	'use strict';

	app.EggitView = Backbone.View.extend({
		el: '',
		timeVisual: null,
		bottom_btn: null,
		
		initialize: function() {
			var that = this;

			this.el = $('#apparea');
			this.bottom_btn = $('.bottom_btn');
			this.bottom_btn.css({opacity: 0, y: 10});
			$(this.bottom_btn).find('button').click(function() {
				app.model.stop_time();
				app.model.set({
					typeData: app.settings.start,
					currentStep: 'start'});
			});

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
			var typeData;
			switch(app.model.get('currentStep')) {
				case 'start':
					this.hide_bottom_btn();
					$.getJSON("http://thingsarerandom.com:8080/eggit/api/getEggs", function( data ) {
						that.el.transition({opacity: 0, x: 10}, function() {
							
							typeData = app.model.get('typeData');
							var insert = {desc: typeData.desc, current: typeData.current};
							insert.current = _.template(insert.current, {boiled: data.numOfEggs});

							that.el.html(
								_.template(that.templates.start.html(),
								insert));

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
					});
					break;
				case 'prep':
					this.el.transition({opacity: 0, x: -10}, 500, function() {
						typeData = app.model.get('typeData').prep;
						that.el.css({x: 10});
						that.el.html(
							_.template(that.templates.prep.html(),
							typeData));

						$('.step_prep .btn').click(function() {
							app.model.set({currentStep: 'boil'});
							app.model.start_time(app.model.get('typeData').boil.time);
						});
					}).transition({opacity: 1, x: 0}, 500);
					break;
				case 'boil':
					this.el.transition({opacity: 0, x: -10}, 500, function() {
						typeData = app.model.get('typeData').boil;
						that.show_bottom_btn(typeData.btnlabel);

						that.el.css({x: 10});
						that.el.html(
							_.template(that.templates.boil.html(),
							typeData));
						that.timeVisual = $('#time_visual');
						that.update_timeVisual(app.model.get('time'));
						that.timeVisual.fitText(0.3);

						// Cancel
						$('.step_boil .btn').click(function() {
							app.model.stop_time();
							app.model.set({currentStep: 'start'});
						});
					}).transition({opacity: 1, x: 0}, 500);

					break;
				case 'rinse':
					this.el.transition({opacity: 0, x: -10}, 500, function() {
						typeData = app.model.get('typeData').rinse;
						that.show_bottom_btn(typeData.btnlabel);

						that.el.css({x: 10});
						that.el.html(
							_.template(that.templates.rinse.html(),
							typeData));

						that.timeVisual = $('#time_visual');
						that.update_timeVisual(app.model.get('time'));
						that.timeVisual.fitText(0.3);

						// Cancel
						$('.step_rinse .btn').click(function() {
							app.model.stop_time();
							app.model.set({currentStep: 'start'});
						});
					}).transition({opacity: 1, x: 0}, 500);
					
					break;
				case 'wait':
					this.el.transition({opacity: 0, x: -10}, 500, function() {
						typeData = app.model.get('typeData').wait;
						that.show_bottom_btn(typeData.btnlabel);

						that.el.css({x: 10});
						that.el.html(
							_.template(that.templates.wait.html(),
							typeData));

						that.timeVisual = $('#time_visual');
						that.update_timeVisual(app.model.get('time'));
						that.timeVisual.fitText(0.3);

					}).transition({opacity: 1, x: 0}, 500);
					
					break;
				case 'end':
					this.el.transition({opacity: 0, x: -10}, 500, function() {
						typeData = app.model.get('typeData').end;
						that.show_bottom_btn(typeData.btnlabel);

						$.getJSON("http://thingsarerandom.com:8080/eggit/api/addEgg?auth=123", function( data ) {
							console.log("currentEggs:", data);
						});

						that.el.css({x: 10});
						that.el.html(
							_.template(that.templates.end.html(),
							typeData));

					}).transition({opacity: 1, x: 0}, 500);

					break;
			}
		},

		change_time: function() {
			if (!this.timeVisual) return;

			var time = app.model.get('time');
			this.update_timeVisual(time);

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

		update_timeVisual: function(time) {
			if (this.timeVisual) {
				var time_str = TimeConvert.milliseconds_to_mmss(time);
				time_str = time_str.replace(":", '<span class="time_divider">:</span>');
				this.timeVisual.html(time_str);
			}
		},

		show_bottom_btn: function(label) {
			this.bottom_btn.find('button').html(label);
			this.bottom_btn.transition({delay: 500, opacity: 1, y: 0}, 500);
		},

		hide_bottom_btn: function() {
			this.bottom_btn.transition({opacity: 0, y: 10}, 300);
		},

		render: function() {
			//console.log('render');
		}
		
	});

})(jQuery);

