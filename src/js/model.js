'use strict';

var stampit = require('stampit');

var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = $;

//var ModelFunctionality = Backbone.Model.extend({});
//var ModelObject = new ModelFunctionality();
//var ModelFuncStamp = stampit(ModelObject);

var ModelStamp = Backbone.Model.extend({
    defaults: {
        title: '',
        currentStep: '',
        typeData: null,
        
        egg_type: 0,
        egg_size: 0,
        
        boiltime: 0,
        rinsetime: 0,
        waittime: 0,
        
        time: 0,
        timer: null
    },
    
    initialize: function(app) {
        this.app = app;
    },

    // Set the boil, rinse and wait times depending
    // on what type and size the eggs are.
    set_times: function() {
        var type = this.get('egg_type');
        var size = this.get('egg_size');
        var app = this.app;
        
        var s = {
            //boiltime: Math.ceil(app.settings.time.boil * (type) * (size)),
            boiltime: Math.ceil(app.settings.time.boil),
            //rinsetime: Math.ceil(app.settings.time.rinse * (type) * (size)),
            rinsetime: Math.ceil(app.settings.time.rinse),
            //waittime: Math.ceil(app.settings.time.wait * (type) * (size))
            waittime: Math.ceil(app.settings.time.wait)
        };
        this.set(s);
    },

    // TIMER
    start_time: function(time_val) {
        var that = this;
        this.set({time: time_val});
        this.attributes.timer = setInterval(function() { that.update_timer(); }, 1000);
    },

    stop_time: function() {
        clearInterval(this.attributes.timer);
    },

    update_timer: function() {
        this.set('time', this.get('time')-1);
        if (this.get('time') <= 0) {
            
            this.set('time', 0);
            this.stop_time();
        }
    }

});

module.exports = ModelStamp;

