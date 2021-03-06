/*Main Module
list all dependent modules here
*/

angular.module('authModule',[]);
angular.module('accountModule',[]);
angular.module('codeModule',['ui.ace']);
angular.module('solutionModule',['authModule','ui.ace']);
angular.module('questionModule',['authModule']);
angular.module('courseModule',['authModule']);
angular.module('assignmentModule',['authModule']);
angular.module('performanceModule',['chart.js','courseModule','assignmentModule','solutionModule']);
angular.module('studentDashboard',['authModule','codeModule']);
angular.module('adminDashboard',['authModule','codeModule']);
var app=angular.module(
	"lasApp",[
	'performanceModule','accountModule',
	'ui.bootstrap','solutionModule','questionModule',
	'assignmentModule','courseModule','ui.router',
	'authModule','studentDashboard','adminDashboard',
	'ui.ace','chart.js','codeModule'
	]);

app.config(['$stateProvider','$urlRouterProvider',function ($stateProvider,$urlRouterProvider) {
	$stateProvider
	.state('signIn',{
		url:'/signIn',
		templateUrl:'/templates/signIn.htm',
		controller:'signIn'
	})
	.state('signInAdmin',{
		url:'/signIn/admin',
		templateUrl:'/templates/signInAdmin.htm',
		controller:'signInAdmin'
	})
	.state('signUp',{
		url:'/signUp',
		templateUrl:'/templates/signUp.htm',
		controller:'signUp'
	})
	.state('signUpAdmin',{
		url:'/signUp/admin',
		templateUrl:'/templates/signUpAdmin.htm',
		controller:'signUpAdmin'
	})
	.state('studentDashboard',{
		templateUrl:'/templates/studentDashboard.htm',
		url:'/studentDashboard',
		controller:'studentCtrl'
	})
	.state('studentDashboard.home',{
		templateUrl:'/templates/homeStudent.htm',
		url:'/home',
		controller:'studentCtrl'
	})
	.state('studentDashboard.performance',{
		templateUrl:'/templates/perfStu.htm',
		url:'/performance',
		controller:'perfCtrlStu'
	})
	.state('studentDashboard.courses',{
		templateUrl:'/templates/coursesView.htm',
		url:'/courses',
		controller:'courseStuCtrl'
	})
	.state('studentDashboard.profile',{
		templateUrl:'/templates/studentDashboard.htm',
		url:'/profile',
		controller:'student'
	})
	.state('studentDashboard.solutions',{
		templateUrl:'/templates/allSolnsStu.htm',
		url:'/:course/assignments/:assignment/questions/:question/solutions',
		controller:'solutionCtrl'
	})
	.state('studentDashboard.solutions.create',{
		templateUrl:'/templates/createSoln.htm',
		url:'/create',
		controller:'solutionCreateCtrl'
	})
	.state('studentDashboard.viewSoln',{
		templateUrl:'/templates/viewSoln.htm',
		url:'/solutions/:solution/view',
		controller:'viewSolnCtrl'
	})
	.state('studentDashboard.questions',{
		templateUrl:'/templates/questionsStu.htm',
		url:'/:course/assignments/:assignment/questions',
		controller:'questionCtrl'
	})
	.state('studentDashboard.ide',{
		templateUrl:'/templates/ide.htm',
		url:'/ide',
		controller:"codeEditor"
	})
	.state('studentDashboard.assignments',{
		templateUrl:'/templates/assignmentsStu.htm',
		url:'/:course/assignments',
		controller:'assignmentCtrl'
	})
	.state('studentDashboard.assignmentsAll',{
		templateUrl:'/templates/assignmentsAllStu.htm',
		url:'/user/assignments/all',
		controller:'assignmentCtrlAllStu'
	})
	.state('studentDashboard.account',{
		templateUrl:'/templates/accountStu.htm',
		url:'/account',
		controller:'accountCtrlStu'
	})
	.state('studentDashboard.account.editPass',{
		templateUrl:'/templates/editPass.htm',
		url:'/editPassword',
		controller:'editPass'
	})
	.state('adminDashboard',{
		templateUrl:'/templates/adminDashboard.htm',
		url:'/adminDashboard',
		controller:'adminCtrl'
	})
	.state('adminDashboard.home',{
		templateUrl:'/templates/homeAdmin.htm',
		url:'/home',
		controller:'adminCtrl'
	})
	.state('adminDashboard.courses',{
		templateUrl:'/templates/courses.htm',
		url:'/courses',
		controller:'courseCtrl'
	})
	.state('adminDashboard.assignments',{
		templateUrl:'/templates/assignments.htm',
		url:'/:course/assignments',
		controller:'assignmentCtrl'
	})
	.state('adminDashboard.assignmentsAll',{
		templateUrl:'/templates/assignmentsAll.htm',
		url:'/user/assignments/all',
		controller:'assignmentCtrlAll'
	})
	.state('adminDashboard.questions',{
		templateUrl:'/templates/questions.htm',
		url:'/:course/assignments/:assignment/questions',
		controller:'questionCtrl'
	})
	.state('adminDashboard.ide',{
		templateUrl:'/templates/ide.htm',
		url:'/ide',
		controller:"codeEditor"
	})
	.state('adminDashboard.solutions',{
		templateUrl:'/templates/allSolnsAdmin.htm',
		url:'/:course/assignments/:assignment/questions/:question/solutions',
		controller:'solutionCtrlAdmin'
	})
	.state('adminDashboard.viewSoln',{
		templateUrl:'/templates/viewSoln.htm',
		url:'/solutions/:solution',
		controller:'viewSolnCtrlAdmin'
	})
	.state('adminDashboard.viewSoln.checkSoln',{
		templateUrl:'/templates/checkSoln.htm',
		url:'/check',
		controller:'checkSolnCtrl'
	})
	$urlRouterProvider.otherwise('signIn');
}])
.controller('mainApp',['auth','$scope','$state','$window',function (auth,$scope,$state,$window) {
	$scope.userLogout=function (argument) {
		auth.logout();
		$window.localStorage.removeItem('lasUser');
		$window.localStorage.removeItem('lasCode');
		$window.localStorage.removeItem('solution');
		$state.go('signIn');
	};
}])
.controller('headerController', ['$scope','$location',function ($scope, $location) { 
	$scope.isActive = function (viewLocation) { 
		return viewLocation === $location.path();
	};
}]);