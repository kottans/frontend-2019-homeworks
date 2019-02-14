document.addEventListener("DOMContentLoaded", function(event) {
    let pony = [
        {
            name: 'Twilight Sparkle',
            bio: 'Twilight Sparkle is the central character of the series, based on the first generation or "G1" unicorn toy Twilight. She is depicted in the show\'s first three seasons as a purple unicorn with a pink-streaked indigo mane, and as a winged unicorn called an "alicorn" after the season three finale "Magical Mystery Cure". She leads the Mane Six during their adventures and helps resolve her friends\' differences. She is an intelligent and dutiful scholar with an avid love of learning and skill in unicorn magic such as levitation, teleportation, and the creation of force fields. Director Jayson Thiessen describes her as "kind of a neurotic perfectionist" who has "a touch OCD", prone to suffering from nervous breakdowns when confronted with a problem that goes against her understanding.',
            img:'<img src="images/twilight-sparkle.png">'
        },
        {
            name: 'Rainbow Dash',
            bio: 'Rainbow Dash is a blue[ pegasus with a rainbow-colored mane and tail who is based on the "G1" Firefly toy and shares her name with the "G3" earth pony. She is obsessed with speed and adventure. Her goal at the beginning of the series is to join her heroes, the elite Wonderbolts aerobatic team. This is accomplished in the season six episode "Newbie Dash" after she impresses them with the multiple heroic feats she performs in the first five seasons. She helps other pegasi manage the weather around Ponyville and spends her time practicing flight maneuvers such as the "Sonic Rainboom", a rainbow-hued sonic boom; it is shown in the episode "The Cutie Mark Chronicles" that Rainbow Dash\'s first Sonic Rainboom as a filly caused a chain of events that produced the Mane Six\'s cutie marks. She lives with a propeller-fitted pet tortoise named Tank in a floating condominium of clouds called the Cloudominium,[16] which is sparingly seen in the show because she "doesn\'t sit still for very long", according to director Jim Miller. Faust struggled to find a suitable aspect for Rainbow Dash\'s Element of Harmony, seeing the character as "self-absorbed and rather irresponsible." She eventually settled on "loyalty" because it "brought out [Rainbow Dash\'s] positive traits."',
            img:'<img src="images/full.png">'
        },
        {
            name: 'Fluttershy',
            bio: 'Fluttershy is a yellow pink-maned pegasus based on the "G1" earth pony Posey. True to her name, she is "defined by her shy sweetness; soft, whispery voice; and tender, nurturing nature", as described by author Begin. She possesses a unique affinity for animals that allows her to communicate with them. She lives in a secluded meadow cottage in Ponyville where she cares for multiple forest creatures such as her "conniving and willful" pet rabbit Angel Bunny. In many episodes, Fluttershy exhibits an authoritative personality that emerges whenever a friend or animal is harmed, in contrast to her normally fearful and submissive self. Her most prominent ability, "the Stare", causes any creature that meets her gaze to become "powerless and moved to meekness" while it is in effect.Faust enjoyed writing for Fluttershy the most out of the show\'s characters due to her "relatable" struggles with fear, which Faust says brings potential "not just for great storytelling but [also for] great filmmaking".',
            img:'<img src="images/full.png">'
        },
        {
            name: 'Pinkie Pie',
            bio: 'Pinkie Pie (fully named Pinkamena Diane Pie) is a pink earth pony based on the "G3" toy of the same name. Her character, which Thiessen summarized as "a frenetic sugar rush", was inspired by the "G1" pegasus toy Surprise. She is a party planner at Sugarcube Corner, a bakery and confectionery store in Ponyville that resembles a gingerbread house, where she also keeps a toothless baby alligator named Gummy. A comedic character who was raised on a "dreary rock farm", Pinkie is cheerful, energetic, and talkative. She is defined by her desire to entertain her friends by randomly throwing parties and acting as outlandish as possible; but has a lack of confidence and a fear of being rejected by others. Pinkie is a source of much of the series\' humor, and several of the show\'s "wacky gags" are kept exclusive to her. Her running gags include breaking the fourth wall and "appearing suddenly in unexpected places", as well as an ability to predict future events through various body reactions, which she calls the "Pinkie Sense". In early episodes, Faust worked to depict Pinkie as a "free spirit" to address concerns of the character being seen as too "hyper" and "ditzy". As the creative team grew more comfortable with Pinkie\'s character and humor, she became "really over-the-top strange and bordering on crazy, with a wacky cartoonish magic all her own." Throughout the show, depending on the episode or scene, Pinkie\'s friends alternate between detesting and enjoying her company, both ignoring her when she tries to speak to them but doing things with her such as pulling pranks or playing buckball.',
            img:'<img src="images/pinkie-pie.png">'
        },
        {
            name: 'Applejack',
            bio: 'Applejack is an orange, blonde-haired earth pony based on the "G1" character of the same name. She is characterized as a "farm gal" who sports a cowboy hat and lasso, and speaks with a Southern accent. She works as an apple farmer at the Sweet Apple Acres orchard in Ponyville, using her strength to "buck" apples out of trees. She lives with her grandmother Granny Smith, older brother Big McIntosh, younger sister Apple Bloom, and pet collie Winona. According to Faust, Applejack\'s parents – Bright Mac (voiced by Bill Newton) and Pear Butter (voiced by Felicia Day), first seen in the season seven episode "The Perfect Pear" – are deceased. Applejack is honest, reliable, and the most "down-to-earth" of the Mane Six. She also has a stubborn streak, with several episodes focusing on her taking up some sort of "herculean task". Author Begin says that her apple-themed cutie mark "not only represents her name, but also is a symbol of the down-home simplicity found in a classic and common fruit."',
            img:'<img src="images/applejack.png">'
        },
        {
            name: 'Rarity',
            bio: 'Rarity is a white unicorn with a curled violet mane who was based on the "G1" ponies Glory and Sparkler[24] and named after the "G3" pony Rarity. She is a ladylike fashionista who speaks with a Mid-Atlantic accent and runs a haute couture salon in Ponyville called Carousel Boutique. Despite her vain and melodramatic tendencies, she has a generous spirit and strives to create dresses that capture their wearers\' inner beauty. She owns a pet Persian cat named Opalescence who is commonly nicknamed Opal. Faust\'s original idea for Rarity\'s Element of Harmony was "inspiration", but it was changed to "generosity" after the production team deemed the former "too much of a thinker, especially for kids." Faust was pleased with the change, saying it "really helped pull [Rarity] away from the stereotypical, unlikable debutante." She cites Audrey Hepburn as her biggest influence for Rarity, and also says that Tabitha St. Germain\'s performance "added a humor to Rarity that was unexpected and wonderful."',
            img:'<img src="images/rarity.png">'
        },
    ];
    let li = document.querySelectorAll('li');
    let main = document.querySelector('.main');
    let ul = document.querySelector('ul');
    main.innerHTML = pony[0].bio+pony[0].img;
    ul.addEventListener('click', function(e) {
        let ponyObj = pony.find(obj => obj.name === e.target.textContent);
        main.innerHTML = ponyObj.bio+ponyObj.img;
        li.forEach(function (el){el.classList.remove("active")});
        e.target.classList.add("active");
    });
});
