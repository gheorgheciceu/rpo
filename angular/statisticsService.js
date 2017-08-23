'use strict;'
angular.module('NewsPaperApp')
.service('StatisticsService', function( $http,$cookies) {
	var x2js = new X2JS();
	var posts;
	$http.get("data/news.xml").success(function(data) {

		var courseDef = x2js.xml_str2json(data);
		posts = courseDef.news.post;

	});

	var comments;
	$http.get("php/getAllComments.php").success(function(data) {


		comments = data;

	});

	this.commentsPerNews = function(){
		var ids = [];
		for(i=0;i<posts.length;i++){
			ids.push(posts[i].id+" "+posts[i].date);
		}
		console.log(ids);
		var counter=[];
		for(i=0;i<posts.length;i++){
			counter[posts[i].id] = 0;
		}
		for(i=0;i<comments.length;i++){
			counter[comments[i].postId]++;
		}
		var counter2 =[];
		for(var key in counter){
			counter2.push(counter[key]);
		}
		console.log(counter2);
		var trn = { labels :ids,
		series : ['Comments per news'],
		data : [
		 counter2
		],
				 colors : [ { // default
				 	"fillColor" : "rgba(69, 12, 232, 0.7)",
				 	"strokeColor" : "rgba(207,100,103,1)",
				 	"pointColor" : "rgba(220,220,220,1)",
				 	"pointStrokeColor" : "#fff",
				 	"pointHighlightFill" : "#fff",
				 	"pointHighlightStroke" : "rgba(151,187,205,0)"
				 } ]};
				  
				 return trn;
	}
	this.commentsPerMonth = function(){
		for(var post in posts){
			 console.log(post);
			//console.log(new Date(parts[2], parts[1]-1,parts[0]));
		}
		for(i=0;i<posts.length;i++){
			console.log(posts[i].date);
			var parts = posts[i].date.split("/");
			console.log(new Date(parts[2], parts[1]-1,parts[0]));
		}
		var months = ["JAN","FEB","MAR","APR","MAI","IUN","IUL","AUG","SEP","OCT","NOV","DEC"];
		var values=[];
		for(i=0;i<12;i++){
			values[i]=0;
		}
		for(i in posts){
			values[posts[i].date.split("/")[1]-1]++;
		}
			var trn = { labels :months,
		series : ['News per month'],
		data : [
		 values
		],
				 colors : [ { // default
				 	"fillColor" : "rgba(232, 156, 12, 0.7)",
				 	"strokeColor" : "rgba(207,100,103,1)",
				 	"pointColor" : "rgba(220,220,220,1)",
				 	"pointStrokeColor" : "#fff",
				 	"pointHighlightFill" : "#fff",
				 	"pointHighlightStroke" : "rgba(151,187,205,0)"
		}]};
				  
		 return trn;


	}

	this.demoFunction = function(){
		 
		return "Aooleeeu, pai ce-ai facut mai nene ma?";
	}

	this.commentsMonth = function(){
		console.log("getting comments / week");
		var trn = { labels :["January", "February", "March", "April", "May", "June", "July"],
		series : ['Series A', 'Series B'],
		data : [
		[65, 59, 80, 81, 56, 55, 40],
		[28, 48, 40, 19, 86, 27, 90]
		],
				 colors : [ { // default
				 	"fillColor" : "rgba(224, 108, 112, 0)",
				 	"strokeColor" : "rgba(207,100,103,1)",
				 	"pointColor" : "rgba(220,220,220,1)",
				 	"pointStrokeColor" : "#fff",
				 	"pointHighlightFill" : "#fff",
				 	"pointHighlightStroke" : "rgba(151,187,205,0)"
				 } ]};
				 console.log(comments);
				 return trn;
				}



			});