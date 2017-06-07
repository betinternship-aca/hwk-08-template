/* global Reflect */
(function() {
    'use strict';

    var inherit = function(SubClass, SuperClass) {
    };

    function Set() {
    }
    inherit(Set, Array);

    Set.prototype.concat = function() {
    };

    Set.prototype.push = function() {
    };

    Set.prototype.unshift = function() {
    };

    Set.prototype.splice = function(index, deleteCount) {
    };

    window.Set = Set;
}());
