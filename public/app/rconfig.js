var require = {
  waitSeconds: 0,
  paths: {
    'jquery': '../plugin/jquery/dist/jquery.min',
    'angular': '../plugin/angular/angular.min',
    'angular-animate': '../plugin/angular-animate/angular-animate.min',
    'angular-cookies': '../plugin/angular-cookies/angular-cookies.min',
    'angular-resource': '../plugin/angular-resource/angular-resource.min',
    'angular-sanitize': '../plugin/angular-sanitize/angular-sanitize.min',
    'angular-messages': '../plugin/angular-messages/angular-messages.min',
    'angular-aria': '../plugin/angular-aria/angular-aria.min',
    'angular-ui-router': '../plugin/angular-ui-router/release/angular-ui-router.min',
    'angular-couch-potato': '../plugin/angular-couch-potato/dist/angular-couch-potato',
    'angular-material': '../plugin/angular-material/angular-material.min',
    'angular-material-icons': '../plugin/angular-material-icons/angular-material-icons.min',
    'angular-loading-bar': '../plugin/angular-loading-bar/build/loading-bar.min',
    'perfect-scrollbar': '../plugin/perfect-scrollbar/js/perfect-scrollbar',
    'perfect-scrollbar-jquery': '../plugin/perfect-scrollbar/js/perfect-scrollbar.jquery',
    'domReady': '../plugin/requirejs-domready/domReady',
    'c3':'../plugin/c3/c3.min',
    'd3':'../plugin/d3/d3.min',
    'highcharts':'../plugin/highcharts/highcharts',
    'lodash': '../plugin/lodash/dist/lodash.min',
    'angular-drag-and-drop-lists': '../plugin/angular-drag-and-drop-lists/angular-drag-and-drop-lists.min',
    'angular-material-data-table': '../plugin/angular-material-data-table/dist/md-data-table.min',
    'ng-file-upload': '../plugin/ng-file-upload/ng-file-upload-all.min',
    'angular-ui-ace': '../plugin/angular-ui-ace/ui-ace.min',
    'ace-builds': '../plugin/ace-builds/src-min-noconflict/ace',

    'modules-includes': 'includes',
    'appConfig': 'app.config'
  }, 
  shim: {
    'angular': {'exports': 'angular', deps: ['jquery']},
    'angular-animate': { deps: ['angular'] },
    'angular-cookies': { deps: ['angular'] },
    'angular-resource': { deps: ['angular'] },
    'angular-sanitize': { deps: ['angular'] },
    'angular-messages': { deps: ['angular'] },
    'angular-aria': { deps: ['angular']},
    'angular-material-data-table': {deps:['angular-material']},

    'c3': { deps: ['d3']},
    'angular-ui-router': { deps: ['angular'] },
    'angular-loading-bar': {deps: ['angular']},
    'angular-couch-potato': { deps: ['angular'] },
    'angular-material' : { deps: ['angular', 'angular-animate', 'angular-aria']},
    'angular-material-icons': {deps:['angular', 'angular-material']},
    'angular-drag-and-drop-lists': { deps: ['angular']},
    'ng-file-upload': {deps: ['angular']},
    'angular-ui-ace': { deps: ['angular', 'ace-builds'] }
  },
  priority: [
    'jquery',
    'angular'
  ]
}