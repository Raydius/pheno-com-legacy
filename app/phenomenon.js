/**
 * Created by rdollete on 4/1/16.
 */

var angular = require('angular');

require('angular-ui-router');
require('angular-animate');
require('angular-cookies');
require('angular-messages');
require('angular-snap');

//var Snap = require('legacy-loader?exports=Snap!Snap.svg');
//window.Snap = Snap; // transform REQUIRES Snap on the window because it uses eval

angular.module('phenoCom',[
    'ui.router',
    'snap',
    'ngAnimate',
    'ngCookies',
    'ngMessages'
]);

angular.module('phenoCom').config(function(SnapConstructorProvider) {
    SnapConstructorProvider.use(window.Snap);
});

require('./_config');
require('./_run');
require('./_controllers');
require('./_directives');
