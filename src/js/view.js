
var $ = require('jquery');
var jQuery = $;
var Backbone = require('backbone');

var app = app || {};

(function($) {
    'use strict';

    app.EggitView = Backbone.View.extend({
        el: '',
        timeVisual: null,
        clock: null,
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
                eggsize: $("#template_eggsize"),
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
                    that.el.transition({opacity: 0, x: 10}, function() {
                        
                        typeData = app.model.get('typeData');
                        var insert = {desc: typeData.desc};

                        var h = _.template(that.templates.start.html())(insert);
                        that.el.html(h);

                        var softbtn = $('#softbtn');
                        var mediumbtn = $('#mediumbtn');
                        var hardbtn = $('#hardbtn');

                        softbtn.on('click', function() {
                            app.model.set({
                                egg_type: 0,
                                typeData: app.settings.eggsize,
                                currentStep: 'size'});
                        });
                        softbtn.hover(function(){
                            softbtn.transition({scale: 1.05, y: -5}, 50);
                        }, function(){
                            softbtn.transition({scale: 1, y: 0}, 50);
                        });

                        mediumbtn.click(function(){
                            app.model.set({
                                egg_type: 1,
                                typeData: app.settings.eggsize,
                                currentStep: 'size'});
                        });
                        mediumbtn.hover(function(){
                            mediumbtn.transition({scale: 1.05, y: -5}, 50);
                        }, function(){
                            mediumbtn.transition({scale: 1, y: 0}, 50);
                        });

                        hardbtn.click(function(){
                            app.model.set({
                                egg_type: 2,
                                typeData: app.settings.eggsize,
                                currentStep: 'size'});
                        });
                        hardbtn.hover(function(){
                            hardbtn.transition({scale: 1.05, y: -5}, 50);
                        }, function(){
                            hardbtn.transition({scale: 1, y: 0}, 50);
                        });

                    }).transition({opacity: 1, x: 0}, 500);
                    break;
                case 'size':
                    this.el.transition({opacity: 0, x: -10}, 500, function() {

                        typeData = app.model.get('typeData');
                        that.el.css({x: 10});
                        that.el.html(_.template(that.templates.eggsize.html())(typeData));

                        var smallbtn = $('#smallbtn');
                        var medbtn = $('#medbtn');
                        var bigbtn = $('#bigbtn');

                        smallbtn.click(function() {
                            app.model.set({
                                egg_size: 0,
                                typeData: app.settings.prep,
                                currentStep: 'prep'});
                        });
                        smallbtn.hover(function(){
                            smallbtn.transition({scale: 1.05, y: -5}, 50);
                        }, function(){
                            smallbtn.transition({scale: 1, y: 0}, 50);
                        });

                        medbtn.click(function(){
                            app.model.set({
                                egg_size: 1,
                                typeData: app.settings.prep,
                                currentStep: 'prep'});
                        });
                        medbtn.hover(function(){
                            medbtn.transition({scale: 1.05, y: -5}, 50);
                        }, function(){
                            medbtn.transition({scale: 1, y: 0}, 50);
                        });

                        bigbtn.click(function(){
                            app.model.set({
                                egg_size: 2,
                                typeData: app.settings.prep,
                                currentStep: 'prep'});
                        });
                        bigbtn.hover(function(){
                            bigbtn.transition({scale: 1.05, y: -5}, 50);
                        }, function(){
                            bigbtn.transition({scale: 1, y: 0}, 50);
                        });

                    }).transition({opacity: 1, x: 0}, 500);
                    break;
                case 'prep':
                    this.el.transition({opacity: 0, x: -10}, 500, function() {
                        
                        typeData = app.model.get('typeData');
                        that.el.css({x: 10});
                        that.el.html(_.template(that.templates.prep.html())(typeData));
                        
                        app.model.set_times();

                        $('.prep_btn .btn').click(function() {
                            app.model.set({
                                typeData: app.settings.boil,
                                currentStep: 'boil'});
                            app.model.start_time(app.model.get('boiltime'));
                        });
                    }).transition({opacity: 1, x: 0}, 500);
                    break;
                case 'boil':
                    this.el.transition({opacity: 0, x: -10}, 500, function() {
                        typeData = app.model.get('typeData');
                        
                        that.el.css({x: 10});
                        that.el.html(_.template(that.templates.boil.html())(typeData));

                        that.clock = new app.EggitClock("#clock_svg", 90);
                        that.clock.update_time(app.model.get('boiltime'));

                        that.show_bottom_btn(typeData.btnlabel);
                        // Cancel
                        $('.step_boil .btn').click(function() {
                            app.model.stop_time();
                            app.model.set({currentStep: 'start'});
                        });
                    }).transition({opacity: 1, x: 0}, 500);
                    break;
                case 'rinse':
                    this.el.transition({opacity: 0, x: -10}, 500, function() {
                        typeData = app.model.get('typeData');
                        that.show_bottom_btn(typeData.btnlabel);

                        that.el.css({x: 10});
                        that.el.html(_.template(that.templates.rinse.html())(typeData));

                        that.clock = new app.EggitClock("#clock_svg", 90);
                        that.clock.update_time(app.model.get('rinsetime'));

                        // Cancel
                        $('.step_rinse .btn').click(function() {
                            app.model.stop_time();
                            app.model.set({currentStep: 'start'});
                        });
                    }).transition({opacity: 1, x: 0}, 500);
                    break;
                case 'wait':
                    this.el.transition({opacity: 0, x: -10}, 500, function() {
                        typeData = app.model.get('typeData');
                        that.show_bottom_btn(typeData.btnlabel);

                        that.el.css({x: 10});
                        that.el.html(_.template(that.templates.wait.html())(typeData));

                        that.clock = new app.EggitClock("#clock_svg", 90);
                        that.clock.update_time(app.model.get('waittime'));

                    }).transition({opacity: 1, x: 0}, 500);
                    break;
                case 'end':
                    this.el.transition({opacity: 0, x: -10}, 500, function() {
                        typeData = app.model.get('typeData');
                        that.show_bottom_btn(typeData.btnlabel);

                        that.el.css({x: 10});
                        that.el.html(_.template(that.templates.end.html())(typeData));

                    }).transition({opacity: 1, x: 0}, 500);
                    break;
            }
        },

        change_time: function() {
            
            var start_clock = function(sec) {
                app.model.start_time(sec);
            };

            if (!this.clock) return;
            var time = app.model.get('time');
            this.update_clock(time);

            if (time <= 0) {
                switch(app.model.get('currentStep')) {
                    case 'boil':
                        app.model.stop_time();
                        this.clock.alarm();
                        _.delay(function() {
                            app.model.set({
                                typeData: app.settings.rinse,
                                currentStep: 'rinse'});
                        }, 3000);
                        _.delay(start_clock, 5000, app.model.get('rinsetime'));
                        break;
                    case 'rinse':
                        app.model.stop_time();
                        this.clock.alarm();
                        _.delay(function() {
                            app.model.set({
                                typeData: app.settings.wait,
                                currentStep: 'wait'});
                        }, 3000);
                        _.delay(start_clock, 5000, app.model.get('waittime'));
                        break;
                    case 'wait':
                        app.model.stop_time();
                        this.clock.alarm();
                        _.delay(function() {
                            app.model.set({
                                typeData: app.settings.end,
                                currentStep: 'end'});
                        }, 3000);
                        break;
                }
            }
        },

        update_clock: function(time) {
            if (this.clock) {
                this.clock.update_time(time);
            }
        },

        show_bottom_btn: function(label) {
            this.bottom_btn.find('button').html(label);
            this.bottom_btn.css({visibility: 'visible'});
            this.bottom_btn.transition({delay: 500, opacity: 1, y: 0}, 500);
        },

        hide_bottom_btn: function() {
            var that = this;
            this.bottom_btn.transition({opacity: 0, y: 10}, 300, function() {
                that.bottom_btn.css({visibility: 'hidden'});
            });
        },

        render: function() {
            //console.log('render');
        }
        
    });

})(jQuery);

