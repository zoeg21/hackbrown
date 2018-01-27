/*script*/


/* search for TV show */ 
/* theMovieDb.search.getTv({"query:" "QUERY_HERE"}, sucessCB, errorCB)*/

//input the information into the movieDb API 
//redirect to search.html, parse JSON and display search results 


function errorSearch(){
	console.log("failure");
}

function tvSearch(query){
	theMovieDb.search.getTv({'query': query}, function(result){
		var container = document.createElement('div');
		var paragraph = document.createElement('p');
		container.appendChild(paragraph);
		var paragraphText = document.createTextNode(result);
		paragraph.appendChild(paragraphText);

		console.log(result);
	}, error);
}


function error(){
	console.log(error);
}

window.onload = function(){
	var form = document.getElementById('searchForm');
	form.addEventListener('submit', function(e){
		e.preventDefault();
		var input = form.elements[0].value; 
		//redirect to search results page 
		window.location.href="search.html";

		//display results 
		tvSearch(input); 
		//console.log(input);
		console.log('submitted');
	})
}