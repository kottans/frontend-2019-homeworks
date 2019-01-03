'use strict';

import bookContent from './book.js'

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

var book = generateContent(bookContent["content"]),
    sidebar = document.getElementById('sidebar'),
    contentWrapper = document.getElementById('content');

sidebar.addEventListener('click',function(event){
  if(event.target.getAttribute('data-chapter')) {
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
  if(!number) {
    number = 0;
  }
  contentWrapper.innerHTML = '';
  let chapterLinks = sidebar.getElementsByTagName('li'),
      chapterLinksArray = Array.from(chapterLinks);
  chapterLinksArray.forEach(link => {
    link.classList.remove('active');
  });

  let title = document.createElement('h2'),
      paragraps = book[number].text.split('\n\n'),
      paragrapsWrapper = document.createElement('div');
  title.innerHTML = book[number].title;
  contentWrapper.appendChild(title);

  paragraps.forEach(paragraph => {
    let text = document.createElement('p');
    text.innerHTML = paragraph;
    paragrapsWrapper.appendChild(text);
  });
  contentWrapper.appendChild(paragrapsWrapper);
  chapterLinks[number].classList.add('active');
}

// INITIAL
changeChapter();

// MOBILE
var mobileOpenBtn = document.querySelector('.mobile-menu');
mobileOpenBtn.addEventListener('click', function() {
  sidebar.classList.add('open');
});