const main_page = document.getElementById('main-page');

let controller = () => {
    window.addEventListener('hashchange', e => {
        router();
    });
}

let router = () => {
    switch (getHash()) {
        case 'kottans': 
            routerAnimation('kottans');
            break;
        case 'contents': 
            routerAnimation('contents');
            break;
        case 'faq': 
            routerAnimation('faq');
            break;
        case 'about': 
            routerAnimation('about');
            break;
        case '': 
            main_page.innerHTML = '<p><img src="http://kottans.org/public/images/logo.png"></p>';
            break;
        default: main_page.innerHTML = '<h1>404<br><img src="http://kottans.org/public/images/logo.png"></h1>';
            break;
    }
}

let getHash = () => {
    return location.hash.substr(1);
}

let routerAnimation = (page) => {
    const content = document.getElementsByClassName('content')[0];
    if (content == undefined) {
        main_page.innerHTML = pages[page].text;
        /*main_body.className = `${page}-bg`;
        main_html.className = `${page}-bg`;*/
    }
    else {
        content.classList.add('content-hide');
        setTimeout(() => {
            content.classList.remove('content-hide');
            main_page.innerHTML = pages[page].text;
            /*main_body.className = `${page}-bg`;
            main_html.className = `${page}-bg`;*/
        },500);
    }
}