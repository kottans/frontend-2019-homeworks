var contentData = {
    About : {
        contentHeder : 'Liverpool Football Club',
        contentImg : 'img/Liverpool_FC.png',
        contentText : 'Liverpool Football Club is a professional football club in Liverpool, England, that competes in the Premier League, the top tier of English football. The club has won 5 European Cups, more than any other English club, 3 UEFA Cups, 3 UEFA Super Cups, 18 League titles, 7 FA Cups, a record 8 League Cups, and 15 FA Community Shields.'
    },
    Stadium : {
        contentHeder : 'Anfield',
        contentImg : 'img/Anfield.jpg',
        contentText : 'Anfield is a football stadium in Anfield, Liverpool, England, which has a seating capacity of 54,074, making it the sixth largest football stadium in England.[4] It has been the home of Liverpool F.C. since their formation in 1892. It was originally the home of Everton F.C. from 1884 to 1891, before they moved to Goodison Park after a dispute with the club president.'
    },
    Anthem : {
        contentHeder : 'You\'ll Never Walk Alone',
        contentImg : 'img/YoullNeverWalkAlone.jpg',
        contentText : 'The club\'s anthem is "You\'ll Never Walk Alone". The song is also sung at association football clubs around the world, where it is performed by a massed chorus of supporters on matchday; this tradition began at Liverpool F.C. after the chart success of the 1963 single of the song by the local Liverpool group Gerry and the Pacemakers. '
    },
    Manager : {
        contentHeder : 'Jürgen Klopp',
        contentImg : 'img/Jürgen_Klopp.jpg',
        contentText : 'Jürgen Norbert Klopp born 16 June 1967 is a German professional football coach and former player who is the manager of Premier League club Liverpool. Often credited with popularising the football philosophy known as Gegenpressing, Klopp is regarded by many as one of the best managers in the world.'
    }
}

document.addEventListener("DOMContentLoaded", addListenerToMenu);

function addListenerToMenu() {
    var menuList = document.getElementsByTagName("li");
    for (var i = 0; i < menuList.length; i++){
        menuList[i].addEventListener("click", onMenuItemClick);
    };
}

function onMenuItemClick(e) {
    if (e && e.currentTarget && e.currentTarget.textContent) {
       fillContent(e.currentTarget.textContent);
    }
}

function fillContent(value) {
    var contentHeder = document.getElementById("contentHeder");
    var contentImg = document.getElementById("contentImg");
    var contentText = document.getElementById("contentText");
    for (const key in contentData) {
        if (key === value) {
            contentHeder.textContent = contentData[key]["contentHeder"] || "";
            contentImg.src = contentData[key]["contentImg"] || "";            
            contentText.textContent = contentData[key]["contentText"] || "";                        
        }
    }
}
