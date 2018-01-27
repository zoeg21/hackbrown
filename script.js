/*script*/


/* search for TV show */ 
/* theMovieDb.search.getTv({"query:" "QUERY_HERE"}, sucessCB, errorCB)*/

//input the information into the movieDb API 
//redirect to search.html, parse JSON and display search results 


function successSearch(){
	console.log("success");
}

function errorSearch(){
	console.log("failure");
}


function tvSearch(query){
	theMovieDb.search.getTv({'query': query}, function(result){
		console.log(result);
	}, error);
	//console.log(response);
	/*$.ajax({
		url: 
	})*/

}


function error(){
	console.log(error);
}

window.onload = function(){
	var form = document.getElementById('searchForm');
	form.addEventListener('submit', function(e){
		e.preventDefault();

		//get input text
		var input = form.elements[0].value; 
		window.location.href="search.html"
		tvSearch(input); 
		console.log(input);
		//console.log('submitted');
	})
}