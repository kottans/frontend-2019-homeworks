//select main fragments
const nav = document.querySelector('#books-list'),
    content = document.querySelector('#book-content');

//create parent container for menu items
const booksList = document.createElement('UL');
booksList.classList.add('books');

for (let i = 0; i < booksData.length; i++) {
    const listElement = document.createElement('LI'),
        bookTitle = document.createTextNode(booksData[i].title);
    listElement.dataset.index = i;
    listElement.appendChild(bookTitle);
    booksList.appendChild(listElement);
}

//add books list to nav tag and add 'active' class to first(default) element
nav.appendChild(booksList).firstChild.classList.add('active');

//create content
const addContent = (book) => {
    content.innerHTML = `
<h2>${book.title}</h2>
<p class="book-author">written by ${book.author}</p>
<div>
<p>${book.description}</p>
<img src="${book.imgPath}" alt="book ${book.title}" class="book-img">
</div>
`;
};

//set default book
addContent(booksData[0]);

//set another book by click
nav.addEventListener('click', function (event) {
    let navElement = event.target;

    if (document.querySelector('.active')) {
        document.querySelector('.active').classList.remove('active');
    }

    if (navElement.tagName != 'LI') {
        return;
    };

    navElement.classList.add('active');
    let book = booksData[navElement.dataset.index];
    addContent(book);
});