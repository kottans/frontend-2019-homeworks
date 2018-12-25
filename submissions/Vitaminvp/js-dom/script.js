document.addEventListener("DOMContentLoaded", ()=>{
    let data = [ {
        title: "Responsive Side Menu Home",
        content: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>`,
        imgSrc: "img/354.jpg"
    },
        {
            title: "Responsive Side Menu About",
            content: "<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p><p> Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?</p>",
            imgSrc: "img/355.jpg"

        },{
            title: "Responsive Side Menu Services",
            content: "<p>But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful.</p>",
            imgSrc: "img/356.jpg"
        },{
            title: "Responsive Side Menu Contacts",
            content: "<p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.</p>",
            imgSrc: "img/357.jpg"

        }
    ];

    const toggleMnu = document.querySelector('.toggle-mnu');
    toggleMnu.addEventListener('click', function(e){
        e.preventDefault();
        if(this.classList.contains('on')){
            this.classList.remove('on');
            document.getElementById('side-menu').style.width = '40px';
            document.querySelector('.content').classList.remove('ml250');
        }else{
            this.classList.add('on');
            document.getElementById('side-menu').style.width = '250px';
            document.querySelector('.content').classList.add('ml250');
        }
    });
    const sideMenuLinks = document.querySelectorAll('.side-menu__link');
    sideMenuLinks[0].classList.add('active');
    for(let i=0; i<sideMenuLinks.length; i++){
        sideMenuLinks[i].addEventListener('click', function(e){
            e.preventDefault();
            openContent(this.dataset.id);

        });
    };
    const content = document.querySelector('.content');
    openContent();
    function openContent(contentId="0") {
        const links = document.getElementsByClassName("side-menu__link");
        for (let i = 0; i < links.length; i++) {
            links[i].classList.remove("active");
        }
        content.innerHTML = null;
        const h1 = document.createElement('H1');
        const div = document.createElement('DIV');
        const img = document.createElement('IMG');
        h1.textContent = data[contentId].title;
        div.innerHTML = data[contentId].content;
        img.src = data[contentId].imgSrc;
        content.appendChild(h1);
        content.appendChild(div);
        content.appendChild(img);
        sideMenuLinks[contentId].classList.add('active');
    }
});


