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

	/*create add button*/
	var add = document.createElement('button');
	add.innerHTML = "Add";
	/*create event listener for add button*/ 
	$(add).click(function(){
		console.log('clicked' + name);
	})
	contentContainer.appendChild(add);

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
		var slider = document.getElementById('lightSlider');
		if(data.hasOwnProperty("results") && data.results.length > 0){
			for(var i = 0; i <  data.results.length; i++){
				var name = data.results[i]["name"]; 
				var poster = data.results[i]["poster_path"];
				var description = data.results[i]["overview"];
				//console.log(description);
				var card = createSearchResult(name, poster, description);
				/*$(card).mouseenter(function(){
					$(this).css("background-color", "#514C4C");
				});
				$(card).mouseleave(function(){
					$(this).css("background-color", "#D3D3D3");
				});*/
				var listItem = document.createElement('li');
				listItem.appendChild(card);
				$(slider).append(listItem);
			}
		}

		$("#lightSlider").lightSlider({
			item:4,
	        loop:false,
	        slideMove:2,
	        easing: 'cubic-bezier(0.25, 0, 0.25, 1)',
	        speed:600,
		});
	}, error);
}

//add event listeners to all tv cards -- on click and on hover 




function error(){
	console.log(error);
}

window.onload = function(){
	
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