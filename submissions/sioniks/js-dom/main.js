document.addEventListener('DOMContentLoaded', function () {
  let pageContent = document.querySelector('.page-content');
  pageContent.innerHTML = contentData.ukr;

  let leftMenu = document.querySelector('.left-menu');
  leftMenu.addEventListener('click', function () {
    this.classList.contains('is-active') ? this.classList.remove('is-active') : this.classList.add('is-active');
  });
  let page = document.querySelector('.page-content');
  page.addEventListener('click', function () {
    leftMenu.classList.contains('is-active') ? leftMenu.classList.remove('is-active') : null;
  });
});

document.querySelector('.menu').addEventListener('click', function (evt) {
  let pageContent = document.querySelector('.page-content');
  evt.preventDefault();
  if (evt.target.nodeName.toLowerCase() === 'a') {
    pageContent.classList.add('hide');
    let thisTheme = evt.target.dataset.theme;
    setTimeout(() => {
      pageContent.innerHTML = contentData[thisTheme];
      pageContent.classList.remove('hide');
    }, 500)
  }
});


let contentData = {
  ukr: '<article> <div class = "container" ><h1 class = "article-header" > Монеты Украины </h1> <p class = "text" >Юбилейные монеты Украины являются очень красивыми и ценяться даже среди коллекционеров других стран. В моей  коллекции присутствуют некоторые експонаты из этих монет. </p> <div class = "img-wrap" ></div><div class = "img-block" ><h3 class = "img-header" > Обиходные монеты Украины </h3> <img src = "img/ukr.jpg" alt = "обиходные монеты украины" ></div><div class = "img-block" ><h3 class = "img-header" > Геноцид крымско татарского народа </h3> <img src = "img/ukr1.jpg" alt = "Геноцид крымско татарского народа" ></div><div class = "img-block" ><h3 class = "img-header" > День добровольця </h3><img src = "img/ukr2.jpg" alt = "День добровольця" ></div> <div class = "img-block" ><h3 class = "img-header" > Киборги </h3> <img src = "img/ukr3.jpg" alt = "Киборги" ></div> <div class = "img-block" ><h3 class = "img-header" > День защитника Украины </h3> <img src = "img/ukr4.jpg" alt = "День защитника Украины" ></div> <div class = "img-block" ><h3 class = "img-header" > 100 лет песне Щедрик </h3> <img src = "img/ukr5.png" alt = "100 лет песне Щедрик" ></div></div> </div> </article>',
  usa: '<article> <div class = "container" ><h1 class = "article-header" > Монеты США </h1> <p class = "text" >Монетный двор США выпускает множество монет, как для себя так и для других стран. В моей коллекции данная страна представлена монетами номиналом 25 центов - так называемые "квотеры" </p> <div class = "img-wrap" ></div><div class = "img-block" ><h3 class = "img-header" > Обиходные монеты США </h3> <img src = "img/usa.jpg" alt = "обиходные монеты сша" ></div><div class = "img-block" ><h3 class = "img-header" > 25 центов - национальные парки </h3> <img src = "img/usa1.jpg" alt = "25 центов - национальные парки" ></div><div class = "img-block" ><h3 class = "img-header" > 25 центов - национальные парки</h3><img src = "img/usa2.jpg" alt = "25 центов - национальные парки" ></div> <div class = "img-block" ><h3 class = "img-header" > 25 центов - национальные парки </h3> <img src = "img/usa3.jpg" alt = "25 центов - национальные парки" ></div> <div class = "img-block" ><h3 class = "img-header" > 25 центов - национальные парки </h3> <img src = "img/usa4.jpg" alt = "25 центов - национальные парки" ></div> <div class = "img-block" ><h3 class = "img-header" > 25 центов - национальные парки </h3> <img src = "img/usa5.jpg" alt = "25 центов - национальные парки" ></div></div> </div> </article>',
  ussr: '<article> <div class = "container" ><h1 class = "article-header" > Монеты СССР </h1> <p class = "text" >Так как это уже несуществующее государство, то и монеты ценятся среди коллекционеров. Хотя и выпускались они миллионными тиражами. Монеты выпускались под разнообразные события в жизни страны: годовщина победы в ВОВ, полет человека в космос, фестивали ну или годовщины от дня рождения известных людей.</p> <div class = "img-wrap" ></div><div class = "img-block" ><h3 class = "img-header" > 175 лет от дря рождения Т.Г.Шевченко </h3> <img src = "img/ussr1.jpg" alt = "175 лет от дря рождения Т.Г.Шевченко" ></div><div class = "img-block" ><h3 class = "img-header" > Серебрянная монета - 1 рубль 1924год </h3><img src = "img/ussr2.jpg" alt = "Серебрянная монета - 1 рубль 1924год" ></div> <div class = "img-block" ><h3 class = "img-header" > 130 лет от дня рождения А.П.Чехова </h3> <img src = "img/ussr3.jpg" alt = "130 лет от дня рождения А.П.Чехова" ></div> <div class = "img-block" ><h3 class = "img-header" > 1 рубль - 50 лет советской власти </h3> <img src = "img/ussr4.jpg" alt = "1 рубль - 50 лет советской власти" ></div> </div> </div> </article>',
  token: '<article> <div class = "container" ><h1 class = "article-header" > Жетоны </h1> <p class = "text" >Жетоны часто выполняют роль альтернативных средств оплаты и применяются для оплаты таких услуг как: мойки, метро, автоматы продажи воды, туалеты, почта, телефонные автоматы и прочее </p> <div class = "img-wrap" ></div><div class = "img-block" ><h3 class = "img-header" > спец жетон министерства торговли </h3><img src = "img/token2.jpg" alt = "спец жетон министерства торговли" ></div> <div class = "img-block" ><h3 class = "img-header" > спец жетон министерства торговли </h3> <img src = "img/token3.jpeg" alt = "спец жетон министерства торговли" ></div> <div class = "img-block" ><h3 class = "img-header" > жетон для оплаты услуг ресторана </h3> <img src = "img/token4.jpg" alt = "жетон для оплаты услуг ресторана" ></div> <div class = "img-block" ><h3 class = "img-header" > жетон метрополитена </h3> <img src = "img/token5.jpg" alt = "жетон метрополитена" ></div></div> </div> </article>'
}