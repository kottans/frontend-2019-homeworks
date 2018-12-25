function generateContent(book) {
  var bookName = book.match(/^# (.*?)\n/gm)[0].slice(2),
      contentArr = book.split('## '),
      content = [];
  contentArr.shift();
  contentArr.forEach(item => {
    var title = item.match(/^[a-z, A-Z](.*?)\n/g)[0],
        text = item.replace(title, ''),
        contentItem = {
          title: title,
          text: text
        }
    content.push(contentItem);
  });
  return content;
}

var aliceContent = generateContent(aliceInWonderland);

var sidebar = document.getElementsByClassName('sidebar')[0],
    contentWrapper = document.getElementsByClassName('content')[0];

sidebar.addEventListener('click',function(event){
  if(event.target.tagName === 'LI') {
    sidebar.classList.remove('open');
    window.scrollTo(0, 0);
    changeChapter(event.target.getAttribute('data-chapter'));
  }
});

aliceContent.forEach((item, i) => {
  var sidebarItem = document.createElement('li');
  sidebarItem.innerHTML = item.title;
  sidebarItem.setAttribute('data-chapter', i);
  sidebar.appendChild(sidebarItem);
});

function changeChapter(number) {
  contentWrapper.innerHTML = '';
  [].forEach.call(sidebar.getElementsByTagName('li'), function(elem) {
    elem.classList.remove('active');
  });

  let title = document.createElement('h2'),
      paragraps = aliceContent[number].text.split('\n\n');
  title.innerHTML = aliceContent[number].title;
  contentWrapper.appendChild(title);
  paragraps.forEach(paragraph => {
    let text = document.createElement('p');
    text.innerHTML = paragraph;
    contentWrapper.appendChild(text);
  });

  sidebar.getElementsByTagName('li')[number].classList.add('active');
}

// INITIAL
changeChapter(0);

// MOBILE
var mobileOpenBtn = document.getElementsByClassName('mobile-menu')[0];
mobileOpenBtn.addEventListener('click', function() {
  sidebar.classList.add('open');
});