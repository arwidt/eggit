
var app = app || {};

(function($) {
	'use strict';

	app.EggitView = Backbone.View.extend({
		el: '',
		timeVisual: null,
		
		initialize: function() {
			var that = this;

			console.log("initialize view");
			this.el = $('#apparea');
			this.initTemplates();

			this.listenTo(app.model, 'change:currentStep', that.change_currentStep);
			this.listenTo(app.model, 'change:time', that.change_time);
		},

		initTemplates: function() {
			console.log('initTemplates');
			this.templates = [
				$("#template_start"),
				$("#template_prep"),
				$("#template_boil")];
		},

		change_currentStep: function() {
			switch(app.model.get('currentStep')) {
				case 'start':
					this.el.html(this.templates[0].html());
					$('#soft').click(function(){
						app.model.set({
							typeData: app.settings.soft,
							currentStep: 'prep'});
					});
					$('#medium').click(function(){
					});
					$('#hard').click(function(){
					});
					break;
				case 'prep':
					console.log(app.model.attributes);
					this.el.html(
						_.template(this.templates[1].html(),
						app.model.get('typeData').prep));

					$('.step1 .btn').click(function() {
						app.model.set({currentStep: 'boil'});
						app.model.start_time(app.model.get('typeData').boil.time);
					});

					this.timeVisual = $('#timeVisual');


					break;
				case 'boil':
					console.log(app.model.attributes);
					this.el.html(
						_.template(this.templates[2].html(),
						app.model.get('typeData').boil));
					break;
			}
		},

		change_time: function() {

		},

		render: function() {
			console.log('render');

		}

	});

})(jQuery);

