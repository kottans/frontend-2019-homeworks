let newContent = [ {
	name: "Bill Gates",
	firstP: "Arguably one of the most popular computer programmers of all time, Bill Gates is an American business magnate, computer programmer, PC pioneer, investor, and philanthropist. He is the co-founder, ex-executive officer and current chairman of Microsoft, which is the world’s largest personal-computer software company. He is the best-known entrepreneurs of the personal computer revolution and helped develop Windows, which is the most used operating system in the world.",
	secondP: "For the first 5 years at Microsoft, aside from handling the business side of the company, Gates also personally oversaw every single code that the company sent out, often fixing ones he deemed incorrect or buggy. Aside from his programming skills, he is widely praised for his generosity and keen investment planning, but is highly criticized due to his anti-competitive business tactics.",
	image: "img/Bill-Gates.jpg"
}, 
{
	name: "Linus Torvalds",
	firstP: "Linus Benedict Torvalds s a Finnish American software engineer, who was the principal driving force behind the development of the Linux kernel. Its creation itself is attributed towards him and he later became the chief architect of the Linux kernel, and is now the project’s coordinator.",
	secondP: "Linus was honored with the 2012 Millennium Technology Prize by the Technology Academy Finland because of his creation of a new open source operating system for computers leading to the wide spread use of Linux kernel. He also created the ever popular distrbuted version control system called Git in 2005,as well as the diving log software Subsurface.",
	image: "img/Linus-Torvalds.jpg"

},{
	name: "Guido van Rossum",
	firstP: "Guido van Rossum is a Dutch computer programmer who is the author of the popular Python programming language that is wildly used today. His creation of Python lead him to being declared a “Benevolent Dictator For Life” the In the Python community which means that he continues to oversee the Python development process, making decisions where necessary, forever.",
	secondP: "Rossum had developed Python while working at Google, where he also created Mondrian (a code review system internally used by the Google) and Rietveld. After working for Google for 7 years, he is now working at Dropbox. Rossum has been recognized as a distinguished engineer by the Association for Computing Machinery and also received the NLUUG Award in May 2003.",
	image: "img/Guido-van-Rossum.jpg"
},{
	name: "Bjarne Stroustrup",
	firstP: "Bjarne Stroustrup is a Danish computer scientist who is credited for the creation and the development of the widely used and highly successful C++ programming language. He not only invented it, but also evolved it, all by himself, by writing its early definitions, producing its first implementation, formulating its design criteria, designing all its major facilities, processing extension proposals for standards committee and its standard textbook.",
	secondP: "Bjarne is currently working as a Professor and holder of the College of Engineering Chair in Computer Science at Texas A&M University.",
	image: "img/Bjarne-Stroustrup.jpg"

}
 ];
 
let ul = document.querySelector(".nav_list");
let h2 = document.querySelector('.replaceH2');
let p1 = document.querySelector('.replaceP1');
let p2 =  document.querySelector('.replaceP2');
let img = document.querySelector('.replaceImg');
let nameProgrammer;
 ul.addEventListener( 'click', event  => {
 	for(let i=0; i < newContent.length; i++){
 		nameProgrammer =event.target.textContent;
 		if(nameProgrammer === newContent[i].name){
 			 h2.textContent = newContent[i].name;
 			 p1.textContent = newContent[i].firstP;
 			 p2.textContent = newContent[i].secondP;
 			 img.src = newContent[i].image;
 			 break;

 		}
 	}

 } );
