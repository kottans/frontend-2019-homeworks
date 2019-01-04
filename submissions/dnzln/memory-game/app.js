var arr = [];
var arrayImg = [1,2,3,4,5,6,1,2,3,4,5,6];
arrayImg = arrayImg.sort(function() { return 0.5 - Math.random() });  // перемешиваем массив

arrayImg.forEach(                       // создаем на странице div с классом back и в него вкладываем
    function(elem, ind, arr) {          // скрытую картинку. Блок и картинка добавляется для каждой карточки
        let underPicture = document.createElement('img');
        underPicture.classList.add('under-img');
        underPicture.setAttribute('src', 'img/'+elem+'.png');
        let conteiner = document.getElementById(ind);
        let underConteiner = document.createElement('div');
        underConteiner.classList.add('back');
        underConteiner.appendChild(underPicture);
        conteiner.appendChild(underConteiner);
    }
);

for(let i = 0; i <= 11; i++) {
    document.getElementById(i).addEventListener('click', function () {main(i)});  // каждой карте - слушатель!
}

function main(id) {     // каждый клик обрабатывается по сценарию ниже, вызываются соответ. функции: 
    arr.push(id);       // открытие или закрытие карточек, скрытие отыграных карточек. 
    openImg(id);
    if(arr.length == 1) return;
    if(arr.length == 2) {
        if(arrayImg[arr[0]] == arrayImg[arr[1]]) {
            setTimeout(destroy, 1300, arr[0], arr[1])
            return;
        } 
        return;
    } else if(arr.length == 3) {
        if(arrayImg[arr[2]] == arrayImg[arr[1]]) {
            setTimeout(destroy, 1300, arr[1], arr[2])
            closeImg(arr[0]);
            arr = [];
            return;
        } else {
            closeImg(arr[0]);
            closeImg(arr[1]);
            arr = [arr[2]];
        }
    }
}

function openImg(id) {
    document.getElementById(id).classList.add('game-card-click');
}

function closeImg(id) {
    document.getElementById(id).classList.remove('game-card-click');
}

function destroy(id1, id2) {
    document.getElementById(id1).classList.add('hidden');
    document.getElementById(id2).classList.add('hidden');
    document.getElementById(id1).innerHTML = ""; 
    document.getElementById(id2).innerHTML = "";
    if(document.querySelector('.back') == null) setTimeout(alert, 1300, 'You win!');
}

