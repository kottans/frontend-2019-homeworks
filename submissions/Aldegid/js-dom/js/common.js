window.onload = function () {

	const addContent = [ {
		title: 'HTML',
		description: "<p>Hypertext Markup Language is the standard markup language for creating web pages and web applications. With Cascading Style Sheets (CSS) and JavaScript, it forms a triad of cornerstone technologies for the World Wide Web.</p><p>Web browsers receive HTML documents from a web server or from local storage and render the documents into multimedia web pages. HTML describes the structure of a web page semantically and originally included cues for the appearance of the document.</p>",
		image: "img/HTML5_logo.png"
	},
	{
		title: 'CSS',
		description: "<p>Cascading Style Sheets (CSS) is a style sheet language used for describing the presentation of a document written in a markup language like HTML. CSS is a cornerstone technology of the World Wide Web, alongside HTML and JavaScript.</p><p>CSS is designed to enable the separation of presentation and content, including layout, colors, and fonts. This separation can improve content accessibility, provide more flexibility and control in the specification of presentation characteristics, enable multiple web pages to share formatting by specifying the relevant CSS in a separate .css file, and reduce complexity and repetition in the structural content.<p>",
		image: "img/CSS3_logo.png"
	},
	{
		title: 'Javascript',
		description: "<p>JavaScript often abbreviated as JS, is a high-level, interpreted programming language that conforms to the ECMAScript specification. It is a language which is also characterized as dynamic, weakly typed, prototype-based and multi-paradigm</p><p>Alongside HTML and CSS, JavaScript is one of the three core technologies of the World Wide Web. JavaScript enables interactive web pages and thus is an essential part of web applications. The vast majority of websites use it, and all major web browsers have a dedicated JavaScript engine to execute it.</p>",
		image: "img/JavaScript_logo.png"
	},
	{
		title: 'React',
		description: "<p>AngularJS (also written as Angular.js) is a JavaScript-based open-source front-end web application framework mainly maintained by Google and by a community of individuals and corporations to address many of the challenges encountered in developing single-page applications. The JavaScript components complement Apache Cordova, a framework used for developing cross-platform mobile apps. It aims to simplify both the development and the testing of such applications by providing a framework for client-side model–view–controller (MVC) and model–view–viewmodel (MVVM) architectures, along with components commonly used in rich Internet applications. (This flexibility has led to the acronym MVW, which stands for and may also encompass model–view–presenter and model–view–adapter.) In 2014, the original AngularJS team began working on the Angular application platform.</p>",
		image: "img/React-icon.png"
	},
	{
		title: 'Angular',
		description: "<p>In computing, React (also known as React.js or ReactJS) is a JavaScript library[3] for building user interfaces. It is maintained by Facebook and a community of individual developers and companies</p><p>React can be used as a base in the development of single-page or mobile applications. Complex React applications usually require the use of additional libraries for state management, routing, and interaction with an API</p>",
		image: "img/angular-logo.png"
	}		
		
	]; 

	var menu = document.querySelector('.nav__list');
	var mnuButton = document.querySelector('.header__hamburger');
	var navMenu = document.querySelector('.nav');
	var container = document.querySelector('.cont');

	var h2 = document.querySelector('.h2');
	var ul = document.querySelector('.nav__list');
	var txt = document.querySelector('.text');
	var img = document.querySelector('.main__img-item');
	console.log(img);

	var currLang = null;

	ul.addEventListener('click', function(e){
		for(var i = 0; i < addContent.length; i++){
			currLang = e.target.textContent;
			if(currLang === addContent[i].title){
				h2.textContent = addContent[i].title;
				txt.innerHTML = addContent[i].description;
				img.src = addContent[i].image;
				break;
			}
		}
	});




	menu.addEventListener('click', function(e){
		document.querySelector(".nav__item-active").classList.remove("nav__item-active");
		e.target.classList.add("nav__item-active");
	});

	mnuButton.addEventListener('click', function(e){
		navMenu.classList.toggle('open');
		container.classList.toggle('column');
		e.stopPropagation();
	});


	

}
