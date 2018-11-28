var Luntik = {
    data: [
        {name: "Лунтик", image: "img/luntik.jpg", description: "Лунтик — главный персонаж российского мультфильма «Приключения Лунтика и его друзей» (Также фигурирует как главный персонаж в некоторых компьютерных играх). Доподлинно неизвестно, каким существом является Лунтик, однако, он свалился с Луны на Землю, и представился жителям поляны как лунная пчела. Добр, наивен, правдив. Имеет множество друзей. Умеет прощать и дружить. Лучшие друзья — Кузя, Мила и Пчелёнок. Дата рождения Лунтика — 12 апреля 2006."},
        {name: "Кузя", image: "img/kuzia.jpg", description: "Кузя — зелёный кузнечик, который постоянно ищет приключения на свою голову. Кузя стал первым другом Лунтика. Кузнечик Кузя зелёный, но туловище и ладони у него жёлтые. Из одежды у Кузи тёмно-зеленая курточка на пуговицах и жёлтые ботинки. Кузя очень любопытен, деятелен, отличается редкостным жизнелюбием, но в то же время он – хвастун, выдумщик и очень любит лесть. Благодаря непоседливости Кузи, друзья постоянно попадают в передряги, из которых вместе ищут выход, в процессе чего познают окружающий мир."},
        {name: "Мила", image: "img/mila.jpg", description: "Мила — божья коровка, подруга Лунтика. Она знакомится с Лунтиком в 12 серии. Пчелёнку Мила очень нравится, но он не может ей открыться и признаться в любви. Мила любит играть с Лунтиком, Кузей, Пчелёнком и гусеницами. Она часто сидит на берегу, лепит куличики и строит песочные замки. Мила любит разные сказочные истории, читает книги про рыцарей, драконов и фей, хотя с серии «Фея» понимает, что это неправда. А еще она часто бывает режиссёром — ставит спектакли и снимает фильмы."},
        {name: "Пчелёнок", image: "img/bee.jpg", description: "Пчелёнок — друг Лунтика, который ходит в школу пчёл и учится базовым навыкам пчелы. Пчелёнок трудолюбив и любознателен, но при этом, очень стеснителен. Он раньше считал, что ему незачем ходить в школу, ведь он и так всё знает, но после серии «Прогулял» он понял, что знания, полученные в школе, пригодятся. Самый умный среди своих детских персонажей. Иногда рассказывает своим друзьям о том, что он сегодня узнал. Мечта Пчелёнка — стать героем и спасти мир. Во время событий сериала смог перебороть страх темноты."}
    ],
    init: function(){
        let createItemFunction = this.createItem.bind(this);
        let removeContentFunction = this.removeContent.bind(this);
        let removeStylesFunction = this.removeStyles.bind(this);
        document.querySelector('#friend-list').addEventListener('click', function(){
            removeContentFunction();
            removeStylesFunction();
            //ADD CONTENT AND STYLES
            event.target.classList.toggle('person');
            document.querySelector('main').classList.add('mainActive');
            createItemFunction(event.target.dataset.item);
        }); 
    },
    createItem: function(n){
        let infoBlock = document.createElement("div");
        infoBlock.className = "infoBlock";
        
        let header = document.createElement('h1');
        header.innerHTML = this.data[n].name;

        let image = document.createElement('img');
        image.src = this.data[n].image;
        
        let p = document.createElement('p');
        p.innerHTML = this.data[n].description;

        infoBlock.appendChild(header);
        infoBlock.appendChild(image);
        infoBlock.appendChild(p);
        document.querySelector('main .content').appendChild(infoBlock);

    },
    removeContent: function(){
        if(event.target.hasAttribute('data-item')){            
            if(document.querySelector('main .content').childNodes.length > 0){
                if(document.querySelector('main .content').childNodes[0].classList.contains('infoBlock')){
                    document.querySelector('main .content').removeChild(document.querySelector('.infoBlock'));
                };
            }
        }
    },
    removeStyles: function(){
        for(let i = 0; i < document.querySelectorAll('#friend-list li').length;i++){
            if(document.querySelectorAll('#friend-list li')[i].classList.contains('person')){
                document.querySelectorAll('#friend-list li')[i].classList.remove('person');
            }
        }
    }
}