
var app = app || {};

app.settings = {
	soft: {
		start: {
			desc: 'Just boiling an egg isnt hard, this site<br/>just wants to help you boil a perfect one.'
		},
		prep: {
			desc: 'Start by getting your water to a boil, when it boils put your eggs in and press the START button.',
			btnlabel: 'START'
		},
		boil: {
			desc: 'Boil your egg the exact time given.',
			btnlabel: 'CANCEL',
			time: 5000
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
			title: 'MEDIUM BOILED EGG',
			desc: 'Start boiling water and then prick your egg. Press start and then drop your egg in the water.',
			btnlabel: 'START'
		},
		boil: {
			title: 'BOIL',
			desc: 'Boil your egg the exact time given.',
			btnlabel: 'CANCEL',
			time: 40000
		},
		rinse: {
			title: 'RINSE',
			desc: 'Rinse your eggs in cold water until the time ends.',
			btnlabel: 'CANCEL',
			time: 20000
		},
		wait: {
			title: 'WAIT',
			desc: 'Let your eggs stay in the water this period.',
			btnlabel: 'CANCEL',
			time: 10000
		},
		end: {
			title: 'CONGRATZZ!',
			desc: 'You should now have a very good boiled egg, but no promises ;)',
			btnlabel: 'RESET'
		}
	},
	hard: {
		prep: {
			title: 'HARD BOILED EGG',
			desc: 'Start boiling water and then prick your egg. Press start and then drop your egg in the water.',
			btnlabel: 'START'
		},
		boil: {
			title: 'BOIL',
			desc: 'Boil your egg the exact time given.',
			btnlabel: 'CANCEL',
			time: 50000
		},
		rinse: {
			title: 'RINSE',
			desc: 'Rinse your eggs in cold water until the time ends.',
			btnlabel: 'CANCEL',
			time: 20000
		},
		wait: {
			title: 'WAIT',
			desc: 'Let your eggs stay in the water this period.',
			btnlabel: 'CANCEL',
			time: 10000
		},
		end: {
			title: 'CONGRATZZ!',
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
	app.model.set({currentStep: 'start'});
	
	// PREP
	/*app.model.set({
		typeData: app.settings.soft,
		currentStep: 'prep'});*/
	
	// BOIL
	/*app.model.set({typeData: app.settings.soft});
	app.model.set({currentStep: 'boil'});
	app.model.start_time(app.model.get('typeData').boil.time);*/
	
});