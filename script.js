/*script*/


/* search for TV show */ 
/* theMovieDb.search.getTv({"query:" "QUERY_HERE"}, sucessCB, errorCB)*/

//input the information into the movieDb API 
//redirect to search.html, parse JSON and display search results 

var imageURL = 'http://image.tmdb.org/t/p/w500//';

function errorSearch(){
	console.log("failure");
}

//create section to display results 
//add results to that section 

function deleteSearchResults(){
	console.log('deleting');
	var container = document.getElementById('lightSlider');
	$('div').remove('.lSSlideOuter');
	var slider = document.createElement('ul');
	slider.setAttribute('id', 'lightSlider');
	$(slider).insertAfter('#padding');
}

function createSearchResult(name, poster, description){
	//use cards from bootstrap
	var card = document.createElement('div');
	card.setAttribute('class', 'card'); 
	card.setAttribute('style', 'width: 20rem; display: inline-block; background-color: #D3D3D3;');

	/* create poster element*/	
	var showPoster = document.createElement('img');
	showPoster.setAttribute('class', 'card-img-top'); 
	var posterSource = imageURL + poster; 
	showPoster.setAttribute('src', posterSource);
	showPoster.setAttribute('style', 'max-height: 200px; max-width: 200px; margin-left: auto; margin-right: auto; display: block;'); 
	
	
	/*create name element*/
	var contentContainer = document.createElement('div');
	var cardTitle = document.createElement('h4');
	var cardTitleText = document.createTextNode(name);
	cardTitle.appendChild(cardTitleText);
	cardTitle.setAttribute('class', 'card-title');
	contentContainer.appendChild(cardTitle);
	contentContainer.setAttribute('class', 'card-block');

	/*create overview element*/
	var overview = document.createElement('p');
	overview.setAttribute('class', 'card-text');
	var descriptionShort = description.substring(0, 150);
	descriptionShort = descriptionShort + "...";
	var descriptionText = document.createTextNode(descriptionShort);
	overview.appendChild(descriptionText);
	contentContainer.appendChild(overview);
	if(poster != null){
		card.appendChild(showPoster);
	}
	
	card.appendChild(contentContainer);
	return card; 
}

function tvSearch(query){
	theMovieDb.search.getTv({'query': query}, function(data){
		//need to delete previous search results 
		data = JSON.parse(data);

		//create slider 
		//var slider = document.createElement('ul');
		//slider.setAttribute('id', 'lightSlider');

		//var myshows = document.getElementById('myshows');
		

		var slider = document.getElementById('lightSlider');
		/*var section = document.getElementById('myshows');
		var container = document.createElement('div');*/
		console.log(data);
		if(data.hasOwnProperty("results") && data.results.length > 0){
			for(var i = 0; i <  data.results.length; i++){
				var name = data.results[i]["name"]; 
				var poster = data.results[i]["poster_path"];
				var description = data.results[i]["overview"];
				//console.log(description);
				var card = createSearchResult(name, poster, description);
				var listItem = document.createElement('li');
				listItem.appendChild(card);
				$(slider).append(listItem);
				//console.log('appened to slider');
			}
		}
		/*slider.lightSlider{
			item:4,
	        loop:false,
	        slideMove:2,
	        easing: 'cubic-bezier(0.25, 0, 0.25, 1)',
	        speed:600,
		}*/
		$("#lightSlider").lightSlider({
			item:4,
	        loop:false,
	        slideMove:2,
	        easing: 'cubic-bezier(0.25, 0, 0.25, 1)',
	        speed:600,
		});
			
			//$(slider).insertAfter('#padding');

		//$(section).prepend(container);
	}, error);
}


function error(){
	console.log(error);
}

window.onload = function(){
	/*$("#lightSlider").lightSlider({
		item:4,
        loop:false,
        slideMove:2,
        easing: 'cubic-bezier(0.25, 0, 0.25, 1)',
        speed:600,
	}); */
	
	var form = document.getElementById('searchForm');
	form.addEventListener('submit', function(e){
		deleteSearchResults();
		e.preventDefault();
		var input = form.elements[0].value; 		

		//display results 
		//window.location.href="search.html";
		tvSearch(input); 
		
		//console.log(input);
		console.log('submitted');
		
	})
}