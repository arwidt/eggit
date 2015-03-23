'use strict';

module.exports = {
    milliseconds_to_seconds: function(ms) {
        return ms/1000;
    },
    milliseconds_to_minutes: function(ms) {
        return (ms/1000)/60;
    },
    milliseconds_to_mmss: function(ms) {
        var seconds = Math.floor(ms/1000);
        var minutes = Math.floor(seconds / 60);
        seconds -= minutes*60;

        if (minutes < 10) {minutes = "0"+minutes;}
        if (seconds < 10) {seconds = "0"+seconds;}
        
        return minutes+':'+seconds;
    },
    seconds_to_minutes_and_secondsrest: function(s) {
        return [
            Math.floor(Math.min(s/60)),
            s-(Math.floor(Math.min(s/60)) * 60)];
    }
};