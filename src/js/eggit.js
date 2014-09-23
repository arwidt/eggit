
var app = app || {};

app.settings = {
	start: {
		desc: 'Just boiling an egg isnt hard, this site just wants to help you boil a perfect one.',
		current: 'Currenlty there is <%= boiled %> perfectly boiled eggs!'
	},
	soft: {
		prep: {
			desc: 'Start by getting your water to a boil, when it boils put your eggs in and press the START button.',
			btnlabel: 'START'
		},
		boil: {
			desc: 'Boil your egg the exact time given.',
			btnlabel: 'CANCEL',
			time: 500000
		},
		rinse: {
			desc: 'Rinse your eggs in cold water until the time ends.',
			btnlabel: 'CANCEL',
			time: 5000
		},
		wait: {
			desc: 'Let your eggs stay in the water this period.',
			btnlabel: 'CANCEL',
			time: 5000
		},
		end: {
			desc: 'You should now have a very good boiled egg, but no promises ;)',
			btnlabel: 'RESET'
		}
	},
	medium: {
		prep: {
			desc: 'Start boiling water and then prick your egg. Press start and then drop your egg in the water.',
			btnlabel: 'START'
		},
		boil: {
			desc: 'Boil your egg the exact time given.',
			btnlabel: 'CANCEL',
			time: 40000
		},
		rinse: {
			desc: 'Rinse your eggs in cold water until the time ends.',
			btnlabel: 'CANCEL',
			time: 20000
		},
		wait: {
			desc: 'Let your eggs stay in the water this period.',
			btnlabel: 'CANCEL',
			time: 10000
		},
		end: {
			desc: 'You should now have a very good boiled egg, but no promises ;)',
			btnlabel: 'RESET'
		}
	},
	hard: {
		prep: {
			desc: 'Start boiling water and then prick your egg. Press start and then drop your egg in the water.',
			btnlabel: 'START'
		},
		boil: {
			desc: 'Boil your egg the exact time given.',
			btnlabel: 'CANCEL',
			time: 50000
		},
		rinse: {
			desc: 'Rinse your eggs in cold water until the time ends.',
			btnlabel: 'CANCEL',
			time: 20000
		},
		wait: {
			desc: 'Let your eggs stay in the water this period.',
			btnlabel: 'CANCEL',
			time: 10000
		},
		end: {
			desc: 'You should now have a very good boiled egg, but no promises ;)',
			btnlabel: 'RESET'
		}
	}
};

$(function() {
	'use strict';

	console.log("start");

	app.model = new app.EggitModel();
	app.view = new app.EggitView();
	
	// START
	app.model.set({
		typeData: app.settings.start,
		currentStep: 'start'
    });
	
	// PREP
	/*app.model.set({
		typeData: app.settings.soft,
		currentStep: 'prep'});*/
	
	// BOIL
	/*app.model.set({typeData: app.settings.soft});
	app.model.set({currentStep: 'boil'});
	app.model.start_time(app.model.get('typeData').boil.time);*/
	
});