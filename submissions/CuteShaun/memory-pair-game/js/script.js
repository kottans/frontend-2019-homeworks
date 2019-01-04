(function() {
  const data = [
    "img/mabel.png",
    "img/dipper.png",
    "img/puhlya.png",
    "img/stan.png",
    "img/bill.png",
    "img/soos.png",
    "img/mabel.png",
    "img/dipper.png",
    "img/puhlya.png",
    "img/stan.png",
    "img/bill.png",
    "img/soos.png"
  ];

  const container = document.getElementById("parent");
  const heading = document.getElementById("heading");
  let html;

  function dataSort() {
    data.sort(function() {
      return 0.5 - Math.random();
    });
  }

  function addImgAttr() {
    html = data
      .map(item => {
        return `<div class="flip-box">
      <div class="flipper">
        <div class="flip-box__front"></div>
        <div class="flip-box__back">
          <img class="flip-box__img"src="${item}" alt="cartoon-character" />
        </div>
      </div>
    </div>`;
      })
      .join(" ");

    container.innerHTML = html;
    return;
  }

  function removeActive(activeElements) {
    activeElements.forEach(item => {
      item.classList.remove("active");
    });
  }

  function addHidden(activeElements) {
    activeElements.forEach(item => {
      item.classList.add("hidden");
    });
  }

  function compareImgSrc(imgs) {
    imgs = [...document.querySelectorAll(".active .flip-box__img")];
    if (imgs.length === 2 && imgs[0].src === imgs[1].src) {
      return true;
    }
  }

  function getActiveElems() {
    let activeElements = [...document.querySelectorAll(".active")];
    return activeElements;
  }

  container.addEventListener("click", function(event) {
    let classList = event.target.classList;

    if (getActiveElems().length > 1) {
      removeActive(getActiveElems());
    }

    if (classList.contains("flip-box")) {
      classList.toggle("active");
      getActiveElems();
    }

    if (compareImgSrc()) {
      addHidden(getActiveElems());
      let quantityHidden = document.querySelectorAll(".hidden");

      quantityHidden.length === 12
        ? heading.classList.add("main-heading--active")
        : "";
    }
  });

  dataSort();
  addImgAttr();
})();
