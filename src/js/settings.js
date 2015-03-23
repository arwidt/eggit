'use strict';

var stampit = require('stampit');

module.exports = stampit({

    start: {
        desc: 'How do you like your eggs?<br/>Choose below.',
        current: '<%= boiled %> perfect eggs boiled so far!'
    },
    eggsize: {
        desc: 'How big are your eggs?',
        extra: 'A normal egg weighs between 53-63 grams, but some larger eggs can weigh up to 90 grams.'
    },
    prep: {
        desc: 'Start boiling the water. Prick your eggs while waiting. Put the eggs in the boiling water and then press start.',
        btnlabel: 'START'
    },
    boil : {
        desc: 'Boil your eggs until the time runs out.',
        btnlabel: 'CANCEL'
    },
    rinse: {
        desc: 'Rinse your eggs in cold water.',
        btnlabel: 'CANCEL'
    },
    wait: {
        desc: 'Let your eggs lie in the cold water.',
        btnlabel: 'CANCEL'
    },
    end: {
        desc: 'Enjoy your perfectly boiled eggs!',
        extra: '',
        btnlabel: 'KEEP BOILING'
    },
    time: {
        boil: (60*7) + 40,
        rinse: 60,
        wait : 60,
        typefactor: {
            soft: 0.9,
            medium: 1.0,
            hard: 1.1
        },
        sizefactor: {
            small: 0.9,
            medium: 1.0,
            big: 1.1
        }
    }

});