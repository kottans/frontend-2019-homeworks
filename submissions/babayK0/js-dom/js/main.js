
const styles = {
    locationName: 'nav-item',
    locationInfo: 'info-item',
    locationNameActive: 'nav-item_active',
    locationInfoActive: 'info-item_active',
    emblemcontainer: 'img',
    emblem: 'emblem'
};
//here will be our selector-container
const selectors = { };


//Request for JSON
var request = new XMLHttpRequest();
request.overrideMimeType("application/json");
request.open("GET", "js/data.json");
request.onload = function() {
  if (request.status >= 200 && request.status < 400) {
    var jsondata = JSON.parse(request.responseText);
    
    var data;

    data = buildHTML(jsondata);
    showdata(data);
    //add selectors of new items into selector-container
    selectors.navitems = document.querySelectorAll("."+styles.locationName);
    selectors.infoitems = document.querySelectorAll("."+styles.locationInfo);

    active(0);
    var t = gettitles();
    change(t);

  } else {
    console.log("We reached our target server, but it returned an error");
  }
};
request.onerror = function() {
  console.log("Connection error!");
};
request.send();


function buildHTML(jsondata){
	const navFragment = document.createDocumentFragment();
	const contentFragment = document.createDocumentFragment();

	jsondata.data.forEach( function(dataelem){
		// nav
		let  navelem = document.createElement('li');
		navelem.classList.add(styles.locationName);

		let navheader = document.createElement('h2');
		navheader.innerText = dataelem.locationName;

		navelem.appendChild(navheader);
		navFragment.appendChild(navelem);

		//content
		let contentelem = document.createElement('li');
		contentelem.classList.add(styles.locationInfo);

		let contentinfo = document.createElement('p');
		contentinfo.innerText = dataelem.locationInfo;

		let econtainer = document.createElement('div');
		econtainer.classList.add(styles.emblemcontainer);

		let emblemimg = document.createElement('img');
		emblemimg.classList.add(styles.emblem);
		emblemimg.setAttribute('src',dataelem.emblemSrc);

		econtainer.appendChild(emblemimg);
		contentelem.appendChild(econtainer);
		contentelem.appendChild(contentinfo);
		contentFragment.appendChild(contentelem);
	});
return {
		nav:navFragment,
		content:contentFragment
		}
};

function showdata(node){
	selectors.navigation = document.querySelector('.nav');
	selectors.info = document.querySelector('.info');
	selectors.navigation.appendChild(node.nav);
	selectors.info.appendChild(node.content);
};

function active(i){
	var j=0;
		while(j<4){
			selectors.infoitems[i].classList.add(styles.locationInfoActive);
			selectors.infoitems[i].classList.remove(styles.locationInfo);
			selectors.navitems[i].classList.add(styles.locationNameActive);
			
			selectors.navitems[j].classList.remove(styles.locationNameActive);
			selectors.infoitems[j].classList.add(styles.locationInfo);
			j++;
		}
};


function gettitles(){
	var n = document.getElementsByClassName('nav');
	var titles = n[0].childNodes;
	titles = Array.prototype.slice.call(titles);//now titles is array
	console.log(titles);
	var g = titles[0];
	var r = titles[1];
	var m = titles[2];
	var i = titles[3];
	return {
		gondor: g,
		rohan: r,
		mordor: m,
		isengard: i
	}
};

function change(t){
	for (var name in t){
		console.log(name);
		t[name].addEventListener("click", changeActive);
	}
	console.log(t);
}

function changeActive(event){
	console.log(event);
	let title = event.target.closest("."+styles.locationName);
	console.log(title);
	console.log(title.innerText);
	if(title.innerHTML=="<h2>Gondor</h2>"){
		i=0;
		active(i);
	}else if(title.innerHTML=="<h2>Rohan</h2>"){
		i=1;
		active(i);
	}else if(title.innerHTML=="<h2>Mordor</h2>"){
		i=2;
		active(i);
	}else if(title.innerHTML=="<h2>Isengard</h2>"){
		i=3;
		active(i);
		selectors.infoitems[i].classList.add(styles.locationInfoActive);
		selectors.infoitems[i].classList.remove(styles.locationInfo);
		selectors.navitems[i].classList.add(styles.locationNameActive);
	}else{
		console.log('Error!')
	}
}