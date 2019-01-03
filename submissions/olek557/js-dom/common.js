function getBook(link) {
  let xhr = new XMLHttpRequest(),
  bookContent = '';
  xhr.open('GET', link, false);
  xhr.send();
  if (xhr.status != 200) {
    alert( xhr.status + ': ' + xhr.statusText );
  } else {
    bookContent = JSON.parse(xhr.responseText)["content"];
    return generateContent(bookContent);
  }
}

function generateContent(book) {
  var bookName = book.match(/^# (.*?)\n/gm)[0].slice(2),
      contentArr = book.split('## '),
      content = [],
      bookNameTitle = document.createElement('h1');
  bookNameTitle.innerHTML = bookName;
  document.body.insertBefore(bookNameTitle, document.body.firstChild);
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

var book = getBook('./book.json'),
    sidebar = document.getElementById('sidebar'),
    contentWrapper = document.getElementById('content');

sidebar.addEventListener('click',function(event){
  if(event.target.tagName === 'LI') {
    sidebar.classList.remove('open');
    window.scrollTo(0, 0);
    changeChapter(event.target.getAttribute('data-chapter'));
  }
});

book.forEach((item, i) => {
  var sidebarItem = document.createElement('li');
  sidebarItem.innerHTML = item.title;
  sidebarItem.setAttribute('data-chapter', i);
  sidebar.appendChild(sidebarItem);
});

function changeChapter(number) {
  contentWrapper.innerHTML = '';
  let chapterLinks = sidebar.getElementsByTagName('li'),
      chapterLinksArray = Array.from(chapterLinks);

  chapterLinksArray.forEach(link => {
    link.classList.remove('active');
  });

  let title = document.createElement('h2'),
      paragraps = book[number].text.split('\n\n');
  title.innerHTML = book[number].title;
  contentWrapper.appendChild(title);
  paragraps.forEach(paragraph => {
    let text = document.createElement('p');
    text.innerHTML = paragraph;
    contentWrapper.appendChild(text);
  });

  chapterLinks[number].classList.add('active');
}

// INITIAL
changeChapter(0);

// MOBILE
var mobileOpenBtn = document.getElementsByClassName('mobile-menu')[0];
mobileOpenBtn.addEventListener('click', function() {
  sidebar.classList.add('open');
});