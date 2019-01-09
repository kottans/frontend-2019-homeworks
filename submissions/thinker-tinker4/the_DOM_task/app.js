const ul = document.querySelector('.container');
const h2 = document.querySelector('.techName');
const p1 = document.querySelector('.description');
const img = document.querySelector('.logo');
const technology = (el) => {
   document.h2 = el.name;
   h2.content = el.name;
   p1.textContent = el.paragraph;
   img.src = el.image;
};
ul.addEventListener ('click', event => {
   document.querySelector('.default').classList.remove('.default');
   event.target.classList.add('default');
   const currentParagraph = (el) => event.target.textContent == el.name;
   technology(data.find(currentParagraph));
 });
let data = [ 
    {name: "React",
    paragraph: "React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes. Declarative views make your code more predictable and easier to debug.",
    image: "img/react2.png"}, 
    {name: "Vue",
    paragraph: "Vue is a progressive framework for building user interfaces. Unlike other monolithic frameworks, Vue is designed from the ground up to be incrementally adoptable. The core library is focused on the view layer only, and is easy to pick up and integrate with other libraries or existing projects. On the other hand, Vue is also perfectly capable of powering sophisticated Single-Page Applications when used in combination with modern tooling and supporting libraries.",
    image: "img/vue3.png"},
    {name: "Angular",
    paragraph: "Angular is a TypeScript-based open-source front-end web application framework led by the Angular Team at Google and by a community of individuals and corporations. Angular is a complete rewrite from the same team that built AngularJS",
    image: "img/angular-icon.svg"},
    {name: "Ruby",
    paragraph: "A dynamic, open source programming language with a focus on simplicity and productivity. It has an elegant syntax that is natural to read and easy to write. Ruby is a language of careful balance. Its creator, Yukihiro “Matz” Matsumoto, blended parts of his favorite languages (Perl, Smalltalk, Eiffel, Ada, and Lisp) to form a new language that balanced functional programming with imperative programming.",
    image: "img/ruby1.png"}
];
 

