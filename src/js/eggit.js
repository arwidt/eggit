
var app = app || {};

app.settings = {
	start: {
		desc: 'How do you like your eggs?<br/>Choose below.',
		current: '<%= boiled %> perfect eggs boiled so far!'
	},
	eggsize: {
		desc: 'How big are your eggs?',
		extra: 'A normal egg weighs between 53-63 grams, but some bigger eggs can weigh up to 90 grams.'
	},
	prep: {
		desc: 'Start boiling water, prick our eggs and prepare to drop our eggs in the water.',
		btnlabel: 'START'
	},
	boil : {
		desc: 'Boil your eggs until the clock runs out.',
		btnlabel: 'CANCEL'
	},
	rinse: {
		desc: 'Rinse your eggs in cold water until clock runs out.',
		btnlabel: 'CANCEL'
	},
	wait: {
		desc: 'Let your eggs stay in the water this period.',
		btnlabel: 'CANCEL'
	},
	end: {
		desc: 'You should now have a very good boiled egg, but no promises ;)',
		btnlabel: 'BOIL AGAIN'
	},
	time: {
		boil: 60,
		rinse: 60,
		wait : 60,
		typefactor: {
			soft: 1.0,
			medium: 1.0,
			hard: 1.0
		},
		sizefactor: {
			small: 1.0,
			medium: 1.0,
			big: 1.0
		}
	}
};

$(function() {
	'use strict';

	console.log("start");

	app.model = new app.EggitModel();
	app.view = new app.EggitView();
	
	// START
	/*app.model.set({
		typeData: app.settings.start,
		currentStep: 'start'});*/

	// SIZE
	/*app.model.set({
		typeData: app.settings.eggsize,
		currentStep: 'size'});
	return;*/

	
	// PREP
	app.model.set({
		egg_type: 0,
		egg_size: 1,
		typeData: app.settings.prep,
		currentStep: 'prep'});
	return;

	// BOIL
	/*app.model.set({
		egg_type: 0,
		egg_size: 1,
		typeData: app.settings.boil,
		currentStep: 'boil'});
	app.model.set_times();
	app.model.start_time(app.model.get('boiltime'));*/

	// END
	/*app.model.set({
		typeData: app.settings.end,
		currentStep: 'end'
	});*/
	
});