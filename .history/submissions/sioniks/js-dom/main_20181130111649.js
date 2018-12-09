document.addEventListener('DOMContentLoaded', function () {
  let pageContent = document.querySelector('.page-content');
  pageContent.innerHTML = contentData.token;
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
    }, 1000)
  }
});


let contentData = {
  ukr: '<article> <div class = "container" ><h1 class = "article-header" > Монеты Украины </h1> <p class = "text" >Юбилейные монеты Украины являются очень красивыми и ценяться даже среди коллекционеров других стран.В моей  коллекции присутствуют некоторые експонаты из этих монет. </p> <div class = "img-wrap" ></div><div class = "img-block" ><h3 class = "img-header" > Обиходные монеты Украины </h3> <img src = "img/ukr.jpg" alt = "обиходные монеты украины" ></div><div class = "img-block" ><h3 class = "img-header" > Геноцид крымско татарского народа </h3> <img src = "img/ukr1.jpg" alt = "Геноцид крымско татарского народа" ></div><div class = "img-block" ><h3 class = "img-header" > День добровольця </h3><img src = "img/ukr2.jpg" alt = "День добровольця" ></div> <div class = "img-block" ><h3 class = "img-header" > Киборги </h3> <img src = "img/ukr3.jpg" alt = "Киборги" ></div> <div class = "img-block" ><h3 class = "img-header" > День защитника Украины </h3> <img src = "img/ukr4.jpg" alt = "День защитника Украины" ></div> <div class = "img-block" ><h3 class = "img-header" > 100 лет песне Щедрик </h3> <img src = "img/ukr5.png" alt = "100 лет песне Щедрик" ></div></div> </div> </article>',
  usa: '<article> <div class = "container" ><h1 class = "article-header" > Монеты США </h1> <p class = "text" >Монетный двор США выпускает множество монет, как для себя так и для других стран. В моей коллекции данная страна представлена монетами номиналом 25 центов - так называемые "квотеры" </p> <div class = "img-wrap" ></div><div class = "img-block" ><h3 class = "img-header" > Обиходные монеты США </h3> <img src = "img/usa.jpg" alt = "обиходные монеты сша" ></div><div class = "img-block" ><h3 class = "img-header" > 25 центов - национальные парки </h3> <img src = "img/usa1.jpg" alt = "25 центов - национальные парки" ></div><div class = "img-block" ><h3 class = "img-header" > 25 центов - национальные парки</h3><img src = "img/usa2.jpg" alt = "25 центов - национальные парки" ></div> <div class = "img-block" ><h3 class = "img-header" > 25 центов - национальные парки </h3> <img src = "img/usa3.jpg" alt = "25 центов - национальные парки" ></div> <div class = "img-block" ><h3 class = "img-header" > 25 центов - национальные парки </h3> <img src = "img/usa4.jpg" alt = "25 центов - национальные парки" ></div> <div class = "img-block" ><h3 class = "img-header" > 25 центов - национальные парки </h3> <img src = "img/usa5.jpg" alt = "25 центов - национальные парки" ></div></div> </div> </article>',
  ussr: '<article> <div class = "container" ><h1 class = "article-header" > Монеты СССР </h1> <p class = "text" >Юбилейные монеты Украины являются очень красивыми и ценяться даже среди коллекционеров других стран.В моей  коллекции присутствуют некоторые експонаты из этих монет. </p> <div class = "img-wrap" ></div><div class = "img-block" ></div><div class = "img-block" ><h3 class = "img-header" > Геноцид крымско татарского народа </h3> <img src = "img/ussr1.jpg" alt = "Геноцид крымско татарского народа" ></div><div class = "img-block" ><h3 class = "img-header" > День добровольця </h3><img src = "img/ussr2.jpg" alt = "День добровольця" ></div> <div class = "img-block" ><h3 class = "img-header" > Киборги </h3> <img src = "img/ussr3.jpg" alt = "Киборги" ></div> <div class = "img-block" ><h3 class = "img-header" > День защитника Украины </h3> <img src = "img/ussr4.jpg" alt = "День защитника Украины" ></div> </div> </div> </article>',
  token: '<article> <div class = "container" ><h1 class = "article-header" > Жетоны </h1> <p class = "text" >Юбилейные монеты Украины являются очень красивыми и ценяться даже среди коллекционеров других стран.В моей  коллекции присутствуют некоторые експонаты из этих монет. </p> <div class = "img-wrap" ></div><div class = "img-block" ></div><div class = "img-block" ><h3 class = "img-header" > Геноцид крымско татарского народа </h3> <img src = "img/token1.jpg" alt = "Геноцид крымско татарского народа" ></div><div class = "img-block" ><h3 class = "img-header" > День добровольця </h3><img src = "img/token2.jpg" alt = "День добровольця" ></div> <div class = "img-block" ><h3 class = "img-header" > Киборги </h3> <img src = "img/token3.jpeg" alt = "Киборги" ></div> <div class = "img-block" ><h3 class = "img-header" > День защитника Украины </h3> <img src = "img/token4.jpg" alt = "День защитника Украины" ></div> <div class = "img-block" ><h3 class = "img-header" > 100 лет песне Щедрик </h3> <img src = "img/token5.jpg" alt = "100 лет песне Щедрик" ></div></div> </div> </article>'
}