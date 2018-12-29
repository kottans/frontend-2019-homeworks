'use strict';

/*
    Array data with content
*/
const data = [
    {
        name: "Cheetah",
        images: [`<img src="images/cheetah.jpg" alt="cheetah">`,`<img src="images/cheetah2.jpg" alt="cheetah">`],
        texts: ["The most primitive of all cats, evolving some 18 million years ago, the cheetah is a tall, slim, long-legged cat, built along the lines of the greyhound. Its claws are only semi-retractable, and it has a distinctly dog-like muzzle. Its coat is yellowish-brown with dark brown spots and a long white-tipped tail.The cheetah may be found in open grassland and nearby forests in all parts of Africa, the Middle East, and south-central Asia, where it hunts by day, from the ground, and seeks antelope and other grazing animals.","The cheetah is unique in several ways, and is the only member of genus Acinonyx. It is easily tamed and trained to the hunt and is the fastest four-footed animal on Earth, often achieving speeds in excess of 80 mph for short distances.","A fully grown cheetah can reach speeds in excess of 60 mph and can easily outrun any animal over short distances. It sports only slightly retractable claws, the only of its type amongst the species of cat, and offer the cat extra grip in its high-speed pursuits. The cheetah unlike other Big Cats, does not roar, however it does purr and other vocal sounds range from high pitched yelps and barks to longer chirruping sounds.", "The cheetahs hunting technique has been adapted to suit its speed and agility and unlike many other wild cats it hunts mainly by day. The cheetahs powerful jaw muscles enable the cat to grip its prey, without pause, for several minutes and it uses this to suffocate its catch by clamping the windpipe. Once the kill has been made the cheetah however will often pause to regain its strength before eating at this time the cheetah itself is vulnerable and can often lose its prey to packs of hyenas or to other scavengers of the open plains."],
    },
    {
        name: "Lion",
        images: [`<img src="images/lion.jpg" alt="lion">`,`<img src="images/lion2.jpg" alt="lion">`],
        texts: ["The lion stands out from the other big cats, not only in its distinctive appearance but also in being the only felid that lives in organized social groups. In appearance, the lion is a powerfully built, muscular cat. The fur is short and generally uniform in color, ranging from grey/buff to reddish brown in coloration with the exception of the undersides which are often white, especially in females. The back of the ears and tip of the tail are dark brown or black. However, the most distinctive feature of the male lion is its mane, a ruff of thick, long fur. The color of the mane varies from a light brown to almost black and covers the sides of the face, neck and in some animals extends to the abdomen. The adolescent male begins to grow its mane at about 18 months and it continues to grow until the cat reaches about five years of age – throughout this period it is common for the mane to darken. A fully developed male lion can grow up to 10 feet in body length and is surpassed in size only by the larger specie of tiger.The lion is unusual amongst the cat species in that it lives in an organized social groups called prides. The pride can consist of as many as thirty to forty lions, the majority of which are females and their offspring along with a small number of resident males. It is common for the females within the pride to be closely related and this family bonding is often extended through communal suckling and caring of the young within the group. The territory of the pride is fixed and varies in size depending on the availability and distribution of prey. In larger territories, which can be as much as 200 square miles, prides are often split into smaller social groupings.", "Hunting is also a shared process – the individual lion is relatively inefficient at hunting, and cannot sustain high-speed pursuit for long periods of time. Lionesses hunt by ambush, with the majority of the hunting group chasing the prey toward individuals lying in wait who are then able to give chase over short distances before leaping on the selected animal for the kill. The lions prey consists mainly of medium to large herd animals such as antelope, gazelle and wildebeest. Once the prey is taken, it is common for the males of the pride to eat first, even though they take no part in the hunting process. The females are next to feed followed by the cubs. It is common, when prey is scarce, that the young will often starve as a result of being last in the pecking order for food.", "Incoming males provide another threat to the young cubs of the pride. When a male lion reaches maturity, it leaves its natural pride and goes in search of another pride for which it must fight for the right to join. Older or injured males are ousted by the young incoming male, who then takes up residence in the pride, often killing the cubs of the beaten male, thus ensuring that its own future offspring will have greater chance of survival."],
    },
    {
        name: "Jaguar",
        images: [`<img src="images/jaguar.jpg" alt="jaguar">`,`<img src="images/jaguar2.jpg" alt="jaguar">`],
        texts: ["In appearance, the jaguar is often confused with the leopard. Both cats, depending to a degree on sub-species, have a similar brownish/yellow base fur color which is distinctively marked with dark rosette markings. However, the jaguar can be distinguished by the presence of small dots or irregular shapes within the larger rosette markings, a more stocky and muscular body and a shorter tail.In the wild, identification would not be an issue as the cats inhabit different continents – the jaguar is the only member of the Panthera family to be found in the Americas and it is by far the biggest cat on the continent. The jaguars range, which once spanned from the southern states of the USA, down to the tip of South America, now centers on the north and central parts of the South American continent. The jaguar is predominantly a forest dweller with the highest population densities centering on the lowland rain forests of the Amazon Basin – dry woodland and grassland also serve as suitable terrain, although the cat is rarely found in areas above 8000 feet.", "The overall body size and coloration of the cat often relates to its location. Jaguars found in dense forested areas of the Amazon Basin are often only half the size of those found in more open terrain and it has been suggested that this can be related to the more frequent occurrence of larger prey species found in open terrain . Coloration of dense forest dwelling jaguars is often darker than those found in grassland and scrub forest – here, as with the darker coloration of rain forest leopards, the darker coats give better camouflage in the low light condition on the forest floor and offers the dark coated cat greater success in hunting and a greater chance of survival.", "Unlike many other big cats, apart from man, the jaguar has no rivals – no other predator can compete with this powerful cat. The jaguars main periods of hunting activity are greatly dependent upon location – in some areas which are close to human habitation, it appears that the cat is most active at night, whilst in other locations the jaguar is crepuscular and in certain cases diurnal in its hunting activity. The prey base of the jaguar is extensive, taking full advantage of the diversity and dense concentration of animal species found in the rain forest areas. In size, its prey ranges from large domestic livestock such as cattle and horses (for which it has a poor reputation with local farmers), Marsh deer, Brocket deer, down through various species of Peccary, larger rodents such as Capybara, Paca and Agouti, to reptiles, monkeys and fish."],
    },
    {
        name: "Tiger",
        images: [`<img src="images/tiger.jpg" alt="tiger">`,`<img src="images/tiger2.jpg" alt="tiger">`],
        texts: ["The male Siberian or Amur Tiger, with a total body length in excess of 10 ft and weighing up to 300 kg is by far the largest and most powerful member of the cat family. – however overall body size varies considerably throughout the five sub-species – the female Sumatran being almost 3 ft smaller. With exception of the lion, the tiger is probably the most easily recognised of all wild cats – its fur which ranges from orange to brownish yellow with a white chest and belly is covered with broken vertical black/dark brown stripes. The length of the fur is longer in the Amur tiger which inhabits the colder forested regions of eastern Russia and northern China. However, seasonal variation occurs throughout the species, with the winter markings often being paler and less well defined in the longer winter coat. Males of all sub-species also exhibit longer fur in the form of a ruff, around the back of the head, this is specially pronounced in the Sumatran male.", "In general the tiger is a forest dweller but can also be found in grass land and swamp margins beyond woodland areas – they are never far from a source of water, are strong swimmers and have a particular love of bathing in pools and lakes in hotter regions. Principally, tigers are nocturnal hunters although in protected areas away from human intervention the animal is often active during the day. Although habitat dictates the type of animal that it hunts, the tiger prefers larger prey, such as wild boar, buffalo and deer, but also hunts fish, monkeys and various small mammals if it preferred food source is unavailable. The tiger is often regarded as a cautious hunter, stalking as close as it can to the rear its prey before making the final charge. Depending on the size of its prey the tigers killing bite is usually to the throat or neck of its victim – with smaller animals a bite to the neck is often sufficient to sever the spinal chord, whilst with larger prey the throat bite is preferred, gripping the animal until it finally suffocates. As in common with many cats the tiger will cache its food supply, hiding it under loose vegetation, returning to feed on the carcass over several days. Although, with the exception of mother and cubs learning to hunt, it is generally a solitary hunter, the tiger will often share its food with others of its family group."],
    },
    {
        name: "Leoard",
        images: [`<img src="images/leopard.jpg" alt="leopard">`,`<img src="images/leopard2.jpg" alt="leopard">`],
        texts: ["The leopard or panther is a large, graceful cat with a long, lithe build. Its coat is pale brown to yellowish-brown with dark brown spots in rosettes. Some individuals are very dark brown, almost black, effectively masking their spots and producing the famous black panther.", "The leopard may be found in all parts of Africa south of the Sahara, Asia east of the Indus and south of Mongolia, and Indonesia, where it hunts by night, by twilight, and by day in late afternoon and early morning, from the ground or from trees, often dropping silently on its prey, and seeks large or small game of almost any type.", "A solid-colored leopard or “black panther” is often of a more aggressive nature than those with a spotted coat. This is because normal spotted mothers tend to dislike solid-color cubs, often driving them away prematurely. This ostracism produces mean-tempered, intolerant individuals, just as it does with humans. No satisfactory explanation has ever been given for this phenomenon."],
    },
    {
        name: "Snow Leopard",
        images: [`<img src="images/snow-leopard.jpg" alt="snow-leopard">`,`<img src="images/snow-leopard2.jpg" alt="snow-leopard">`],
        texts: ["Although sharing its name with the common leopard, the snow leopard is not believed to be closely related to the leopard or the other members of the Pantherine group and is classified as the sole member of the genus Uncia uncia. Due to the underdevelopment of the fibro-elastic tissue that forms part of the vocal apparatus the Snow Leopard cannot give a full, deep roar and this along with differences in skull characteristics help to separate it from its fellow big cats.", "In appearance, the snow leopard is strikingly different from the common leopard. Although it has similar rosettes and broken-spot markings, they appear less well defined and are spaced further apart. The fur is long and woolly and helps protect the cat from the extreme cold of its generally mountainous habitat. The general ground coloration of the cat is predominantly grey with brownish/yellow tinges on its flanks and lighter, often white fur on its belly, chest and chin. The head, which sports small ears and a distinctive heavy brow, is rounded and comparatively small for its body size, which can be up to 1.3 meters length and weigh up to around 70kg. The long tail, which can measure as much as 900cm, helps the cat balance as it moves over rugged and often snowy terrain. The powerful limbs of the snow leopard are relatively short for its body size and are supported by large, powerful paws.", "The snow leopard is found in the mountainous regions of central Asia, ranging in the north from Russia and Mongolia down through China and Tibet into the Himalayan regions of Afghanistan, Pakistan and India. Although the total area of its range is extremely large the actual areas in which the cat is found are relatively small and notably fragmented. This has led to disagreements amongst experts as to the subspeciation of the snow leopard. The cats found in the north of the range are generally classified as Uncia uncia uncia, whilst those in the south, Uncia uncia uncioides. However some suggest that due to the fragmentation of the species within those broad areas, genetic differences may exist and further subspeciation may well be necessary."],
    },
]

/*
    This function gets all names in data array,
    add it to 'li' tag, create 'ul' tag and add
    to DOM 
*/
const initNavList = () => {
    let ul = document.createElement('ul');
    ul.classList.add('nav-list');    
    
    data.forEach( obj => {
        let li = document.createElement('li');
        li.classList.add('nav-item');
        li.textContent = obj['name'];
        ul.appendChild(li);
    });

    document.querySelector('.navigation').appendChild(ul);
}

/*
    Create new article
*/
const createArticle = (content) => {
    let article = document.createElement('article');
    article.classList.add('article');

    let h2 = document.createElement('h2');
    h2.textContent = content['name'];

    article.appendChild(h2);
    content['images'].forEach( img => {
        article.insertAdjacentHTML('beforeend', img);
    });

     content['texts'].forEach(text => {
         let paragraph = document.createElement('p');
         paragraph.innerHTML = text;
         article.appendChild(paragraph);
     });

    return article;
}

/*
    When page loads, the first article will be on screen
*/
const initContent = () => {
    let firstData = data[0];
    document.querySelector('.main').appendChild(createArticle(firstData));
    // get first nav item
    document.querySelector('.nav-item').classList.add('active');
}

/*
    Clear content and remove active class from 'li' tag
*/
const clearContent = () => {
    document.querySelector('.main').innerHTML = "";
    document.querySelectorAll('.nav-item').forEach((item) => {
        if (item.classList.contains('active')) {
            item.classList.remove('active');
        }
    });
}

/*
    This function search content object in data array
    and create a new article with this content
*/
const changeContent = (navItem) => {
    clearContent();
    navItem.classList.add('active');
    let contentObj = data.find(obj => {
        if (navItem.textContent.toLowerCase() === obj['name'].toLowerCase()) {
            return true;
        } else {
            return false;
        }
    });
    document.querySelector('.main').appendChild(createArticle(contentObj));
}

/*
    A handler for event listener
*/
const onNavClick = (event) => {
    event.preventDefault();
    if (event.target.parentElement.tagName === 'A'){
        document.querySelector('.navigation').classList.remove("open");
    } else if (event.target.tagName === 'LI') {
        changeContent(event.target);
    }
}

/*
    A handler for event listener
*/
const onMenuButtonClick = (event) => {
    event.preventDefault();
    document.querySelector('.navigation').classList.toggle("open");
}

document.addEventListener('DOMContentLoaded', () => {
    initNavList();
    initContent();
    document.querySelector('.navigation').addEventListener('click', onNavClick);
    document.querySelector('.menu-button').addEventListener('click', onMenuButtonClick);
});