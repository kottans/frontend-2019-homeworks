document.addEventListener('DOMContentLoaded', function () {
  let pageContent = document.querySelector('.page-content');
  pageContent.innerHTML = contentData.ukr;







});

document.addEventListener('click', function (event) {
  if (event.target.classList.contains('.menu-link')) {
    event.preventDefault();
    let thisTheme = this.dataset.theme;
    console.log(thisTheme);
    pageContent.innerHTML = contentData.ukr;
  }
}, false);


let contentData = {
  ukr: '<article> <div class = "container" ><h1 class = "article-header" > Монеты Украины </h1> <p class = "text" >Юбилейные монеты Украины являются очень красивыми и ценяться даже среди коллекционеров других стран.В моей  коллекции присутствуют некоторые експонаты из этих монет. </p> <div class = "img-wrap" ></div><div class = "img-block" ><h3 class = "img-header" > Обиходные монеты Украины </h3> <img src = "img/ukr.jpg" alt = "обиходные монеты украины" ></div><div class = "img-block" ><h3 class = "img-header" > Геноцид крымско татарского народа </h3> <img src = "img/ukr1.jpg" alt = "Геноцид крымско татарского народа" ></div><div class = "img-block" ><h3 class = "img-header" > День добровольця </h3><img src = "img/ukr2.jpg" alt = "День добровольця" ></div> <div class = "img-block" ><h3 class = "img-header" > Киборги </h3> <img src = "img/ukr3.jpg" alt = "Киборги" ></div> <div class = "img-block" ><h3 class = "img-header" > День защитника Украины </h3> <img src = "img/ukr4.jpg" alt = "День защитника Украины" ></div> <div class = "img-block" ><h3 class = "img-header" > 100 лет песне Щедрик </h3> <img src = "img/ukr5.jpg" alt = "100 лет песне Щедрик" ></div></div> </div> </article>'
}