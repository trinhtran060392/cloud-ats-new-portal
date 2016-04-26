define([
  'angular',
  'angular-couch-potato',
  'angular-ui-router',
  'angular-messages'
], function (ng, couchPotato) {
  'use strict';

  var module = ng.module('app.project.keyword.reports', ['ui.router', 'ngMessages']);

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
              'services/keyword-service',
              'services/event-service'
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
  }]);

  couchPotato.configureApp(module);

  module.run(function($couchPotato) {
    module.lazy = $couchPotato;
  });

  return module;
});