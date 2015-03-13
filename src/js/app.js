
var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = $;
var transit = require('jquery.transit');

var _settings = require('./settings.js');
var _model = require('./model.js');
var _view = require('./view.js');

var app = app || {};

$(function() {
    'use strict';

    console.log("start");

    app.settings = _settings();
    app.model = new _model(app);
    app.view = new _view(app);
    
    //console.log(app.settings);
    console.log(app.model.cid);
    console.log(app.view.cid);

    // // START
    app.model.set({
        typeData: app.settings.start,
        currentStep: 'start'});

    console.log(app.model.get('currentStep'));
    
});

