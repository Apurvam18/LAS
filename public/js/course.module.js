var course=angular.module('courseModule');
course
.controller('courseCtrl',['$scope','user','auth','courseSrv',function ($scope,user,auth,course,$http) {
	var self=$scope;
	self.courses=[];
	var logError=function (err) {
		console.log("Error: "+err);
	};

	self.resetCourseForm=function () {
		self.data={
			name:'',
			desc:'',
			code:''
		}
	}
	self.createCourse=function () {
		course.createCourse(self.data).then(function (res) {
			if(res.data.status){
				console.log(res.data);
				self.courses.push(res.data.message);
				self.data.name=self.data.desc=self.data.code="";
			}else{
				console.log(res.data);
			}
		},logError);
	};
	self.deleteCourse=function (c_id) {
		course.deleteCourse(c_id).then(function (res) {
			if(res.data.status){
				console.log(res.data.message);
				var removeIndex = self.courses.map(function(item) { return item._id; })
                       .indexOf(c_id);
                       ~removeIndex && self.courses.splice(removeIndex, 1);
			}else{
				console.log(res.data.message);
			}
		},logError);
	};
	self.getCourse=function (c_id) {
		course.getCourse(c_id).then(function (res) {
			if(res.data.status){
				console.log(res.data.message);
				self.courses.remove(res.data.message);
			}else{
				console.log(res.data.message);
			}
		},logError);
	};
	self.getAllCourses=function () {
		course.getAllCourses().then(function (res) {
			if(res.data.status){
				console.log(res.data.message);
				angular.copy(res.data.message, self.courses);
			}else{
				console.log(res.data.message);
			}
		},logError);
	};

	//initialise course list
	self.resetCourseForm();
	self.getAllCourses();

}])
.service('courseSrv',function ($http) {
	var self= this;
	self.createCourse=function (data) {
		return $http.post("/courses",data);
	}
	self.getCourse=function (c_id) {
		return $http.get("/courses/"+c_id);
	}
	self.getAllCourses=function () {
		return $http.get("/courses");
	}
	self.deleteCourse=function (c_id) {
		return $http.delete("/courses/"+c_id);
	}
})
.service('courseStuSrv',function ($http) {
	var self= this;
	self.addCourse=function (data) {
		return $http.post("/users/courses",data);
	}
	self.getCourse=function (c_id) {
		return $http.get("/users/courses/"+c_id);
	}
	self.getEnrolledCourses=function () {
		return $http.get("/users/courses");
	}
	self.getAllCourses=function () {
		return $http.get("/courses/all");
	}
	self.removeCourse=function (c_id) {
		return $http.delete("/users/courses/"+c_id);
	}
})
.controller('courseStuCtrl',['$scope','user','auth','courseStuSrv',function ($scope,user,auth,course,$http) {
	var self=$scope;
	self.allCourses=[];
	self.enrolledCourses=[];
	self.search={
		name:"",
		code:""
	};
	self.dispCourse={
		name:'',
		desc:''
	};
	self.courseDispNum=4;
	self.showMoreText="Show More";
	self.showMore=function () {
		if(self.showMoreText=="Show More"){
				self.courseDispNum+=3;
		}else if(self.showMoreText=="Show Less"){
				self.courseDispNum-=3;
		}
		if(self.courseDispNum<=4){
			self.showMoreText="Show More";
		}
		else if(self.courseDispNum>=self.allCourses.length){
			self.showMoreText="Show Less";
		}
	};
	self.showCourse=function (courseData) {
		angular.copy(courseData,self.dispCourse);
	};
	self.hideCourse=function (courseData) {
		self.dispCourse.name='';
	}
	self.addCourse=function (courseData) {
		console.log("adding course: ",courseData)
		course.addCourse(courseData).then(function (res) {
			if(res.data.status){
				console.log("added course: ",res.data.message);
				self.enrolledCourses.push(res.data.message);
			}else{
				console.log(res.data.message);
			}
		},function (err) {
			console.log(err);
		});
	};
	self.getEnrolledCourses=function () {
		course.getEnrolledCourses().then(function (res) {
			if(res.data.status){
				console.log("enrooled: ",res.data.message)
				angular.copy(res.data.message,self.enrolledCourses);
			}else{
				console.log(res.data.message);
			}
		},function (err) {
			console.log(err);
		});
	};
	self.getAllCourses=function () {
		course.getAllCourses().then(function (res) {
			if(res.data.status){
				console.log(res.data.message);
				angular.copy(res.data.message, self.allCourses);
			}else{
				console.log(res.data.message);
			}
		},function (err) {
			console.log(err);
		});
	};
	self.removeCourse=function (c_id) {
		course.removeCourse(c_id).then(function (res) {
			if(res.data.status){
				console.log(res.data.message);
				var removeIndex = self.enrolledCourses.map(function(item) { return item._id; })
                       .indexOf(c_id);
                       ~removeIndex && self.enrolledCourses.splice(removeIndex, 1);
			}else{
				console.log(res.data.message);
			}
		},function (err) {
			console.log(err);
		});
	};
	self.getCourse=function (c_id) {
		course.getCourse(c_id).then(function (res) {
			if(res.data.status){
				console.log(res.data.message);
				self.courses.remove(res.data.message);
			}else{
				console.log(res.data.message);
			}
		},logError);
	};
	self.getAllCourses();
	self.getEnrolledCourses();
}]);
