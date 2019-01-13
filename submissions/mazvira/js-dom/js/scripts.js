document.addEventListener("DOMContentLoaded", function(event) {
    const phones = [
        {
            name: 'Samsung',
            info: 'The Samsung Galaxy Note 8 is an Android phablet smart phone designed, developed and marketed by Samsung Electronics. Unveiled on 23 August 2017, it is the successor to the discontinued Samsung Galaxy Note 7. It became available on 15 September 2017. The Note 8 improves on the core device specifications and hallmark S Pen features of earlier devices. While retaining the same overall look and approximate size of the Galaxy S8+, it features an upgraded processor and, for the first time in Samsung\'s smartphone history, a dual-camera system on the rear of the device; one functions as a wide-angle lens and the other as a telephoto lens, with both featuring 12 MP resolution and optical image stabilization. The S Pen has increased pressure sensitivity levels and its software has been upgraded to offer improved note taking capabilities on the always-on display, as well as animated GIF and improved translation features.',
        },
        {
            name: 'Iphone 6',
            info: 'The iPhone 6 and iPhone 6 Plus are smartphones designed and marketed by Apple. It is the eighth generation of the iPhone, succeeding the iPhone 5S that was announced on September 9, 2014, and released on September 19, 2014. The iPhone 6 and iPhone 6 Plus jointly were themselves replaced as the flagship devices of the iPhone series by the iPhone 6S and iPhone 6S Plus on September 9, 2015. The iPhone 6 and 6 Plus include larger 4.7 and 5.5 inches (120 and 140 mm) displays, a faster processor, upgraded cameras, improved LTE and Wi-Fi connectivity and support for a near field communications-based mobile payments offering.',            
        },
        {
            name: 'Iphone XR',
            info: 'iPhone XR is a smartphone designed and manufactured by Apple. It is the twelfth generation of the iPhone. The phone has a 6.1-inch "Liquid Retina" LCD display, which Apple claims is the "most advanced and color accurate in the industry." It is the least expensive device in Apple\'s iPhone X line of devices, with a starting price of $749 in the United States, $1029 in Canada, £749 in the United Kingdom, €849 in the Eurozone countries, and 6499 yuan in China. It features the same processor as the XS and XS Max, the Apple A12 Bionic chip built with a 7 nanometer process, which Apple claims to be the "smartest and most powerful chip" ever put into a smartphone.',          
        },
        {
            name: 'Huawei',
            info: 'The P20 is constructed with a metal chassis and glass backing, has a fingerprint reader on the front that can also be used for gesture navigation, and is available in various color finishes. Both the P20 and P20 Pro feature "FullView" displays with a "notch" tab at the top-centre, with the P20 having a 5.8-inch LCD panel and the P20 Pro a 6.1-inch OLED panel. Both use a 1080p resolution with an 18.7:9 aspect ratio. Both models include a Kirin 970 system-on-chip and 128 GB of non-expandable internal storage, with 4 GB of RAM for the base model and 6 for the Pro. The models feature 3320 and 4000 mAh batteries respectively; the P20 line does not support wireless charging. Both models have a USB-C port, but the P20 Pro does not include a headphone jack.',        
        },

    ];
	
    const phonesImg = [ 
 	  {
		  img: '<img src="img/samsung1.png" alt="Samsung">'
	  }, 
	  {
		  img: '<img src="img/iPhone2.png" alt="Iphone 6">'
	  },	  
	  {
		  img: '<img src="img/iPhone3.jpg" alt="Iphone XR">'
      },
	  {
		  img: '<img src="img/huawei4.png" alt="Huawei">'
	  }, 
 ];
  
const li = document.querySelectorAll('li');
const main = document.querySelector('.main');
const ul = document.querySelector('ul');

main.innerHTML = [phones[0].info, phonesImg[0].img].join("");

ul.addEventListener('click', function(e) {
const phone = phones.find(obj => obj.name === e.target.textContent);
const phoneInd = phones.findIndex(x => x.name == phone.name);
main.innerHTML = [phone.info, phonesImg[phoneInd].img].join("");
li.forEach(function (el){
	el.classList.remove("active")});
    e.target.classList.add("active");
 });
});

