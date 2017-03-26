$(function(){
	var timer = setInterval(function(){
	var time = new Date();
	var time_day = time.getDate();
	var time_month = time.getMonth()+1;
	var time_year = time.getFullYear();
	var time_hour = time.getHours();
	var time_min = time.getMinutes();
	var time_sec = time.getSeconds();
	$("#nowtime").html(time_year+"/"+time_month+"/"+time_day+"/"+time_hour+":"+time_min+":"+time_sec);
	},1000);
	
	
});
var app = angular.module("app",[]);
	app.controller("myapp",["$scope",function($scope){
		$scope.internet = [
			{
				id:1,
				address:"http://www.baidu.com"
			},{
				id:2,
				address:"qqqq"
			},{
				id:3,
				address:'dfsdfd'
			}
		]
	}]);