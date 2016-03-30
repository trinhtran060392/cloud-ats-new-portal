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

    'domReady': '../plugin/requirejs-domready/domReady',

    'modules-includes': 'includes'
  }, 
  shim: {
    'angular': {'exports': 'angular', deps: ['jquery']},
    'angular-animate': { deps: ['angular'] },
    'angular-cookies': { deps: ['angular'] },
    'angular-resource': { deps: ['angular'] },
    'angular-sanitize': { deps: ['angular'] },
    'angular-messages': { deps: ['angular'] },
    'angular-aria': { deps: ['angular']},

    'angular-ui-router': { deps: ['angular'] },
    'angular-loading-bar': {deps: ['angular']},
    'angular-couch-potato': { deps: ['angular'] },
    'angular-material' : { deps: ['angular', 'angular-animate', 'angular-aria']},
    'angular-material-icons': {deps:['angular', 'angular-material']}
  },
  priority: [
    'jquery',
    'angular'
  ]
}