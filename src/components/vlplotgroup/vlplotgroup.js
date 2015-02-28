'use strict';

/**
 * @ngdoc directive
 * @name vegalite-ui.directive:visListItem
 * @description
 * # visListItem
 */
angular.module('vleApp')
  .directive('vlPlotGroup', function (Bookmarks, consts) {
    return {
      templateUrl: 'components/vlplotgroup/vlplotgroup.html',
      restrict: 'E',
      replace: true,
      scope: {
        chart: '=',
        //optional
        fieldSet: '=',

        showBookmark: '=',
        showDebug: '=',
        showExpand: '=',
        showToggle: '=',

        configSet: '@',
        alwaysSelected: '=',
        isSelected: '=',
        highlighted: '=',
        expandAction: '&'
      },
      link: function postLink(scope, element, attrs) {
        scope.Bookmarks = Bookmarks;
        scope.consts = consts;
      }
    };
  });