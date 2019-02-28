'use strict'

import('../js/add.js');

let visa = document.getElementById('visa');
let payPal = document.getElementById('payPal');
let amazon = document.getElementById('amazon');
let numberInput = document.getElementById('curd-number');

visa.addEventListener('focus', () => {
    if(numberInput.classList.toggle('pay-pal-bg')){
        numberInput.classList.remove('pay-pal-bg');
    }else if(numberInput.classList.toggle('amazon-bg')){
        numberInput.classList.remove('amazon-bg');
    }
    numberInput.classList.add('visa-bg');
} );

payPal.addEventListener('focus', () => {
    if(numberInput.classList.toggle('visa-bg')){
        numberInput.classList.remove('visa-bg');
    }
    numberInput.classList.remove('amazon-bg');
    numberInput.classList.add('pay-pal-bg');
} );

amazon.addEventListener('focus', () => {
    if(numberInput.classList.toggle('visa-bg')){
        numberInput.classList.remove('visa-bg');
    }else if(numberInput.classList.toggle('pay-pal-bg')){
        numberInput.classList.remove('pay-pal-bg');
    }
    numberInput.classList.add('amazon-bg');
} );