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

  //////////////////////Function data handlers
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

  //////////////////////Function DOM workers
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

  function compareImgSrc(activeElements) {
    return (
      activeElements.length > 1 &&
      activeElements[0].children[0].children[1].children[0].src ===
        activeElements[1].children[0].children[1].children[0].src
    );
  }

  function getActiveElems(activeElements) {
    activeElements = [...document.querySelectorAll(".active")];
    return activeElements;
  }

  //////////////////////Event listener with cards logic
  container.addEventListener("click", function(event) {
    let classList = event.target.classList;
    getActiveElems();

    if (getActiveElems().length > 1) {
      removeActive(getActiveElems());
    }

    if (classList.contains("flip-box")) {
      classList.toggle("active");
      getActiveElems();
    }

    if (compareImgSrc(getActiveElems())) {
      addHidden(getActiveElems());
      let quantityHidden = document.querySelectorAll(".hidden");
      console.log(quantityHidden);

      //When all cards hidden, change main-heading color
      quantityHidden.length === 12
        ? heading.classList.add("main-heading--active")
        : console.log("нихуяшечки");
    }
  });

  dataSort();
  addImgAttr();
})();
