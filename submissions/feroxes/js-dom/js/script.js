function SuperHero(name, disc, img) {
    this.name = name;
    this.disc = disc;
    this.img = img;
    this.addParametersToHero = function(){
        document.getElementById('hero__name').innerHTML = this.name;
        document.getElementById('hero__discription').innerHTML = this.disc;
        document.getElementById('hero__img').outerHTML = `<img id = 'hero__img' src=${this.img}>`;
    }
}

let ironMan = new SuperHero('Iron Man', `Iron Man is a fictional superhero appearing in American comic books published by Marvel Comics. The character
    was created by writer and editor Stan Lee, developed by scripter Larry Lieber, and designed by artists Don
    Heck and Jack Kirby. The character made his first appearance in Tales of Suspense #39 (cover dated March
    1963), and received his own title in Iron Man #1 (May 1968)`, 'style/img/ironMan.jpg')

let hulk = new SuperHero('Hulk', `The Hulk is a fictional comic book superhero appearing in publications by
    the American publisher Marvel Comics. Created by writer Stan Lee and artist Jack Kirby, the character
    first appeared in the debut issue of The Incredible Hulk (May 1962)`, 'style/img/hulk.jpg');

let capitanAmerica = new SuperHero('Capitan America', `Captain America is a fictional superhero appearing
    in American comic books published by Marvel Comics. Created by cartoonists Joe Simon and Jack Kirby,
    the character first appeared in Captain America Comics #1 (cover dated March 1941) from Timely Comics,
    a predecessor of Marvel Comics.`, 'style/img/capitan.jpeg');

let spiderMan = new SuperHero('Spider Man', `Spider-Man is a fictional superhero created by writer-editor Stan
    Lee and writer-artist Steve Ditko. He first appeared in the anthology comic book Amazing Fantasy #15
    (August 1962) in the Silver Age of Comic Books. He appears in American comic books published by Marvel
    Comics, as well as in a number of movies, television shows, and video game adaptations set in the Marvel
    Universe. `, 'style/img/spider.jpg');

let thor = new SuperHero('Thor', `Thor is a fictional superhero appearing in American comic books published by
    Marvel Comics. The character, based on the Norse deity of the same name, is the Asgardian god of thunder
    and possesses the enchanted hammer Mjolnir, which grants him the ability to fly and manipulate weather
    amongst his other superhuman attributes.`, 'style/img/thor.jpg');

let vision = new SuperHero('Vision', `The Vision is a fictional superhero appearing in American comic books
    published by Marvel Comics. He is an android and a member of the Avengers who first appeared in The Avengers #57
    (October 1968). `, 'style/img/vision.jpg');

let menu = document.getElementById('menu');
    menu.addEventListener('click', changeMenu);

function changeMenu(e) {
    let childrenList = e.target.parentElement.children;

    for(let i = 0; i < childrenList.length; i++){
        childrenList[i].className = '';
    }
    e.target.className = 'checked';
    
    switch(e.target.innerHTML) {
        case 'Iron Man':
        ironMan.addParametersToHero();
        break;
        case 'Hulk':
        hulk.addParametersToHero();
        break;
        case 'Capitan America':
        capitanAmerica.addParametersToHero();
        break;
        case 'Spider Man':
        spiderMan.addParametersToHero();
        break;
        case 'Thor':
        thor.addParametersToHero();
        break;
        default:
        vision.addParametersToHero();
    }
}
