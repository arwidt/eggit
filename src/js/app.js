
var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = $;
var transit = require('jquery.transit');

var _settings = require('./settings.js');
var _model = require('./model.js');
var _view = require('./view.js');
var _clock = require('./clock.js');

var app = app || {};

$(function() {
    'use strict';

    $('.bottom_btn').css({opacity: 0, y: 10});

    app.settings = _settings();
    app.model = new _model(app);
    app.view = new _view(app);

    // START
    app.model.set({
        typeData: app.settings.start,
        currentStep: 'start'});
    
});

