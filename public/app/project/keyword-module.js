define([
  'angular',
  'angular-couch-potato',
  'angular-ui-router',
  'angular-messages',
  'angular-drag-and-drop-lists',
  'angular-material-data-table'
], function (ng, couchPotato) {
  'use strict';

  var module = ng.module('app.project.keyword', ['ui.router', 'ngMessages', 'dndLists']);

  module.config(['$stateProvider', '$couchPotatoProvider', function ($stateProvider, $couchPotatoProvider) {
    $stateProvider
    .state('app.project.keyword-reports', {
      url: '/project/:id/keyword/reports',
      views: {
        'sub-content@app.project': {
          templateUrl: 'app/project/views/keyword/reports-overview.tpl.html',
          resolve: {
            deps: $couchPotatoProvider.resolveDependencies([
              'project/directives/project-nav',
              'project/controllers/execution-func-ctrl',
              'project/controllers/report-overview-func-ctrl',
              'services/suite-service',
              'services/keyword-service'
            ])
          }
        },
        'header-box@app.project': {
          templateUrl: 'app/project/views/keyword/reports-header-box.tpl.html'
        }
      },
      data: {
        title: 'Project Keyword Reports Overview',
        requireLogin: true
      }
    })
    .state('app.project.keyword-reports.reportJob', {
      url: '/report/:jobId',
      views: {
        'sub-content@app.project': {
          templateUrl: 'app/project/views/keyword/report-job-detail.tpl.html',
          resolve: {
            deps: $couchPotatoProvider.resolveDependencies([
              'project/directives/project-nav',
              'project/controllers/report-job-detail-ctrl'
            ])
          }
        },
        'header-box@app.project': {
          templateUrl: 'app/project/views/keyword/reports-header-box.tpl.html'
        }
      },
      data: {
        title: 'Project Keyword Report Job',
        requireLogin: true
      }
    })
    .state('app.project.keyword-reports.reportJob.reportSuite', {
      url: '/suite/:suiteId/:suiteReportId',
      views: {
        'sub-content@app.project': {
          templateUrl: 'app/project/views/keyword/report-suite-detail.tpl.html',
          controller: 'ReportSuiteDetailCtrl',
          resolve: {
            deps: $couchPotatoProvider.resolveDependencies([
              'project/directives/project-nav',
              'project/controllers/report-suite-detail-ctrl'
            ])
          }
        },
        'header-box@app.project': {
          templateUrl: 'app/project/views/keyword/reports-header-box.tpl.html'
        }
      },
      data: {
        title: 'Project Keyword Report Suite',
        requireLogin: true
      }
    })
    .state('app.project.keyword-reports.reportJob.reportSuite.reportCase', {
      url: '/testcase/:caseReportId',
      views: {
        'sub-content@app.project': {
          templateUrl: 'app/project/views/keyword/report-case-detail.tpl.html',
          controller: 'ReportCaseDetailCtrl',
          resolve: {
            deps: $couchPotatoProvider.resolveDependencies([
              'project/directives/project-nav',
              'project/controllers/report-case-detail-ctrl'
            ])
          }
        },
        'header-box@app.project': {
          templateUrl: 'app/project/views/keyword/reports-header-box.tpl.html'
        }
      },
      data: {
        title: 'Project Keyword Report Case',
        requireLogin: true
      }
    })
    .state('app.project.keyword-suites', {
      url: '/project/:id/keyword/suites',
      views: {
        'search-box@app': {
          templateUrl: 'app/project/views/keyword/suites-search-box.tpl.html',
          controller: 'SuitesActionCtrl'
        },
        'sub-content@app.project': {
          templateUrl: 'app/project/views/keyword/suites.tpl.html',
          controller: 'SuitesCtrl',
          resolve: {
            deps: $couchPotatoProvider.resolveDependencies([
              'project/directives/project-nav',
              'project/controllers/suites-ctrl',
              'project/controllers/suites-action-ctrl',
              'project/services/shared-data-service',
              'services/suite-service',
            ])
          }
        },
        'header-box@app.project': {
          templateUrl: 'app/project/views/keyword/suites-header-box.tpl.html',
          controller: 'SuitesActionCtrl'
        }
      },
      data: {
        title: 'Project Keyword Suites',
        requireLogin: true
      }
    })
    .state('app.project.keyword-suites.suite', {
      url: '/:suiteId',
      views: {
        'search-box@app': {
          templateUrl: 'app/project/views/keyword/suite-detail-action.tpl.html',
          controller: 'SuiteActionCtrl',
          resolve: {
            deps: $couchPotatoProvider.resolveDependencies([
              'project/controllers/suite-detail-action-ctrl',
              'project/services/shared-data-service',
              'services/suite-service',
              'services/case-service'
            ])
          }
        },
        'sub-content@app.project': {
          templateUrl: 'app/project/views/keyword/suite-detail.tpl.html',
          controller: 'SuiteDetailCtrl',
          resolve: {
            deps: $couchPotatoProvider.resolveDependencies([
              'project/directives/project-nav',
              'project/controllers/suite-detail-ctrl',
              'project/services/shared-data-service',
              'services/suite-service',
              'services/case-service'
            ])
          }
        },
        'header-box@app.project': {
          templateUrl: 'app/project/views/keyword/suites-header-box.tpl.html'
        }
      },
      data: {
        title: 'Project Keyword Suite Detail',
        requireLogin: true
      }
    })
    .state('app.project.keyword-cases', {
      url: '/project/:id/keyword/cases',
      views: {
        'search-box@app': {
          templateUrl: 'app/project/views/keyword/cases-search-box.tpl.html'
        },
        'sub-content@app.project': {
          templateUrl: 'app/project/views/keyword/cases.tpl.html',
          controller: 'CasesCtrl',
          resolve: {
            deps: $couchPotatoProvider.resolveDependencies([
              'project/directives/project-nav',
              'project/controllers/cases-ctrl',
              'services/case-service'
            ])
          }
        },
        'header-box@app.project': {
          templateUrl: 'app/project/views/keyword/cases-header-box.tpl.html'
        }
      },
      data: {
        title: 'Project Keyword Cases',
        requireLogin: true
      }
    })
    .state('app.project.keyword-case', {
      url: '/project/:id/keyword/case/:caseId',
      views: {
        'sub-content@app.project': {
          templateUrl: 'app/project/views/keyword/case-detail.tpl.html',
          controller: 'CaseDetailCtrl',
          resolve: {
            deps: $couchPotatoProvider.resolveDependencies([
              'project/directives/project-nav',
              'project/controllers/case-detail-controller',
              'services/case-service',
              'services/keyword-service',
              'services/custom-keyword-service'
            ])
          }
        },
        'header-box@app.project': {
          templateUrl: 'app/project/views/keyword/cases-header-box.tpl.html'
        }
      },
      data: {
        title: 'Project Keyword Cases',
        requireLogin: true
      }
    })
    .state('app.project.keyword-data', {
      url: '/project/:id/keyword/data',
      views: {
        'sub-content@app.project': {
          templateUrl: 'app/project/views/keyword/data-driven.tpl.html',
          resolve: {
            deps: $couchPotatoProvider.resolveDependencies([
              'project/directives/project-nav'
            ])
          }
        },
        'header-box@app.project': {
          templateUrl: 'app/project/views/keyword/data-driven-header-box.tpl.html'
        }
      },
      data: {
        title: 'Project Keyword Data Driven',
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