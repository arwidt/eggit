
var app = app || {};

(function($) {
	'use strict';

	app.EggitView = Backbone.View.extend({
		el: '',
		
		initialize: function() {
			var that = this;

			console.log("initialize view");
			this.el = $('#apparea');
			this.initTemplates();

			this.listenTo(app.model, 'change:currentStep', that.render);
		},

		initTemplates: function() {
			console.log('initTemplates');
			this.templates = [
				$("#template_start"),
				$("#template_prep"),
				$("#template_boil")];
		},

		render: function() {
			console.log('render');
			switch(app.model.get('currentStep')) {
				case 'start':
					this.el.html(this.templates[0].html());
					$('#soft').click(function(){
						app.model.set({boilTime: 3000,
										rinseTime: 3000,
										waitTime: 3000,
										step1Title: 'SOFT BOILED',
										step1Desc: 'This is how you boil the perfect soft egg. The best kind.',
										step1Btn: 'NEXT',
										currentStep: 1});
					});
					$('#medium').click(function(){
						app.model.set({boilTime: 4000,
										rinseTime: 4000,
										waitTime: 4000,
										step1Title: 'MEDIUM BOILED',
										step1Desc: 'This is how you boil the perfect medium egg.',
										step1Btn: 'NEXT',
										currentStep: 1});
					});
					$('#hard').click(function(){
						app.model.set({boilTime: 4000,
										rinseTime: 4000,
										waitTime: 4000,
										step1Title: 'HARD BOILED',
										step1Desc: 'This is how you boil the perfect hard egg.',
										step1Btn: 'NEXT',
										currentStep: 1});
					});
					break;
				case 'prep':
					console.log(app.model.attributes);
					this.el.html(_.template(this.templates[1].html(), app.model.attributes));

					$('.step1 .btn').click(function() {
						console.log("step1");
					});
					break;
				case 'boil':
					console.log(app.model.attributes);
					this.el.html(_.template(this.templates[2].html()));
					break;
			}
		}

	});

})(jQuery);

