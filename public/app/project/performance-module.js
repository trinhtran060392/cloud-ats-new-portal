define([
  'angular',
  'angular-couch-potato',
  'angular-ui-router',
  'angular-messages',
  'angular-ui-ace',
  'ng-file-upload'
], function (ng, couchPotato) {
  'use strict';

  var module = ng.module('app.project.performance', ['ui.router', 'ngMessages', 'ui.ace', 'ngFileUpload']);

  module.config(['$stateProvider', '$couchPotatoProvider', function ($stateProvider, $couchPotatoProvider) {
    $stateProvider
    .state('app.project.performance-reports', {
      url: '/project/:id/performance/reports',
      views: {
        'sub-content@app.project': {
          templateUrl: 'app/project/views/performance/reports-overview.tpl.html',
          resolve: {
            deps: $couchPotatoProvider.resolveDependencies([
              'project/directives/project-nav',
              'services/performance-service',
              'services/script-service',
              'project/controllers/report-overview-perf-ctrl',
              'project/controllers/execution-perf-ctrl'
            ])
          }
        },
        'header-box@app.project': {
          templateUrl: 'app/project/views/performance/reports-header-box.tpl.html'
        }
      },
      data: {
        title: 'Project Performance Reports',
        requireLogin: true
      }
    })
    .state('app.project.performance-reports.job', {
      url: '/job/:jobId',
      views: {
        'sub-content@app.project': {
          templateUrl: 'app/project/views/performance/report-job-detail.tpl.html',
          controller: 'ReportPerformanceCtrl',
          resolve: {
            deps: $couchPotatoProvider.resolveDependencies([
              'project/directives/project-nav',
              'project/controllers/report-perf-ctrl',
              'project/directives/performance-report',
              'services/report-service'
            ])
          }
        },
        'header-box@app.project': {
          templateUrl: 'app/project/views/performance/reports-header-box.tpl.html'
        }
      },
      data: {
        title: 'Project Performance Reports Job',
        requireLogin: true
      }
    })
    .state('app.project.performance-reports.job.sampler', {
      url: '/sampler/:reportId/:index/:hit/:trans',
      views: {
        'sub-content@app.project': {
          templateUrl: 'app/project/views/performance/report-perf-sampler.html',
          controller: 'ReportPerformanceSamplerCtrl',
          resolve: {
            deps: $couchPotatoProvider.resolveDependencies([
              'project/directives/project-nav',
              'project/controllers/report-perf-sampler-ctrl',
              'services/report-service'
            ])
          }
        },
        'header-box@app.project': {
          templateUrl: 'app/project/views/performance/reports-header-box.tpl.html'
        }
      },
      data: {
        title: 'Project Performance Reports Sampler',
        requireLogin: true
      }
    })
    .state('app.project.performance-scripts', {
      url: '/project/:id/performance/scripts',
      views: {
        'search-box@app': {
          templateUrl: 'app/project/views/performance/scripts-search-box.tpl.html',
          controller: 'ScriptsPerfActionCtrl'
        },
        'sub-content@app.project': {
          templateUrl: 'app/project/views/performance/scripts.tpl.html',
          controller: 'ScriptsPerfCtrl',
          resolve: {
            deps: $couchPotatoProvider.resolveDependencies([
              'project/directives/project-nav',
              'project/controllers/scripts-perf-ctrl',
              'project/controllers/scripts-perf-action-ctrl',
              'services/script-service',
              'project/services/shared-data-service'
            ])
          }
        },
        'header-box@app.project': {
          templateUrl: 'app/project/views/performance/scripts-header-box.tpl.html'
        }
      },
      data: {
        title: 'Project Performance Scripts',
        requireLogin: true
      }
    })
    
    .state('app.project.performance-scripts.wizard', {
      url: '/wizard/:scriptId',
      views: {
        'search-box@app': {
          templateUrl: undefined
        },
        'sub-content@app.project': {
          templateUrl: 'app/project/views/performance/script-wizard-detail.tpl.html',
          controller: 'ScriptsWizardCtrl',
          resolve: {
            deps: $couchPotatoProvider.resolveDependencies([
              'project/directives/project-nav',
              'project/controllers/scripts-wizard-ctrl',
              'services/script-service'
            ])
          }
        },
        'header-box@app.project': {
          templateUrl: 'app/project/views/performance/scripts-header-box.tpl.html'
        }
      },
      data: {
        title: 'Project Performance Script Wizard Detail',
        requireLogin: true
      }
    })
    .state('app.project.performance-scripts.editor', {
      url: '/editor/:scriptId',
      views: {
        'search-box@app': {
          templateUrl: undefined
        },
        'sub-content@app.project': {
          controller: 'ScriptEditorCtrl',
          templateUrl: 'app/project/views/performance/script-editor-detail.tpl.html',
          resolve: {
            deps: $couchPotatoProvider.resolveDependencies([
              'project/controllers/script-editor-ctrl',
              'project/directives/project-nav',
            ])
          }
        },
        'header-box@app.project': {
          templateUrl: 'app/project/views/performance/scripts-header-box.tpl.html'
        }
      },
      data: {
        title: 'Project Performance Script Editor Detail',
        requireLogin: true
      }
    })
    .state('app.project.performance-csv', {
      url: '/project/:id/performance/csv',
      views: {
        'sub-content@app.project': {
          templateUrl: 'app/project/views/performance/csv.tpl.html',
          resolve: {
            deps: $couchPotatoProvider.resolveDependencies([
              'project/directives/project-nav',
            ])
          }
        },
        'header-box@app.project': {
          templateUrl: 'app/project/views/performance/csv-header-box.tpl.html'
        }
      },
      data: {
        title: 'Project Performance CSV Data',
        requireLogin: true
      }
    })
  }]);

  couchPotato.configureApp(module);

  module.run(function($couchPotato) {
    module.lazy = $couchPotato;
  });

  return module;
});