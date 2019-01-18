document.addEventListener('DOMContentLoaded', function init(){
const infoArray = [
    {title: 'Moraine Lake',
     text: 'Located in the remote Valley of the Ten Peaks in the Canadian Rockies, Moraine Lake is an emerald beauty, a small, cold glacier-fed jewel surrounded by towering mountains, immense waterfalls, and ancient rock piles, so beautiful it takes breath away. As the glaciers melt, the water in the lake rises and changes its color. <br><br> It might take away some of its magic to know that the color is affected by the sediment brought by the glacial waters. The whole area is crossed by scenic hiking trails that offer different perspectives of the lake depending on your elevation or location. You can also enjoy its beauty from a kayak or canoe, or just by sitting on a rock at its bank. Take it all in, no photograph will ever give it justice.'},
    {title: 'Geiranger Fjord', 
     text: 'In the land of hundreds of magnificent fjords, Geiranger is considered Norway’s most beautiful: A spectacular creation by glaciers, this fjord is about 15 km long and 1.5 km wide at its widest part. With almost vertical mountain sides and no habitable coast, the occasional abandoned mountain farms bear witness to the relentless efforts of humankind to conquer nature and gain a foothold. The most popular way of seeing the fjord is by ferry, but kayaking is as much fun. <br><br> You will pass by spectacular waterfalls that thunder down the steep mountain cliffs, creating a permanent veil of fog and endless rainbows. Another way of seeing the fjord is by taking the famous Trollstigen road, built in 1936 in an amazing feat of engineering, which snakes up steep mountain sides; narrow, occasionally protected by stone railings, and passing by massive waterfalls, it is nerve-wracking yet absolutely fascinating. The whole area is a dreamland for daredevils and adrenaline junkies, who find the steep cliffs a supreme challenge for climbing, rappelling, and ziplining.'},
    {title: 'Bora Bora',
      text: 'Far, far away in the vast South Pacific lies a dreamlike island with a dormant volcano at its heart, covered by thick jungle, surrounded by an emerald necklace of tiny sand-fringed islands that form a turquoise lagoon hiding rich coral reefs and thousands of colorful fish. As you spot this magical place while landing in a small plane from nearby Tahiti, you become aware that you are reaching one of the most beautiful islands in the world, where luxury resorts compete with lavish nature to fulfill your every wish. <br><br> Many people come to Bora Bora on their honeymoon to snuggle in one of the many thatch-roofed romantic villas perched over water, where room service is delivered by canoe. There is no place more romantic and more extravagantly beautiful than Bora Bora.'},
    {title: 'Santorini',
      text: 'Located on top of a cliff with a spectacular view of the Palea volcano, Nea Kameni, and the island of Thirassia, Oia is the most popular and arguably the most beautiful of all the picturesque villages of the beautiful Greek island of Santorini. Only about 11 km from Fira, on the north of the island, Oia will charm you with its traditional stone houses lining the narrow streets, breathtaking blue-domed churches, and sunbaked verandas. <br><br> While the village has its share of taverns, souvenir shops, and cafes, Oia is more quiet and laid-back than busy Fira and most people enjoy its quaint beauty by slowly exploring its narrow streets. Stroll through the village’s small port of Ammoudi by descending 300 steps down the cliff, or enjoy colorful galleries showcasing art from the many artists who fell in love with the village and made it their home. Oia, Santorini is considered by many one of the prettiest places in the world. '}
    ];

const sideMenu = document.querySelector('.side_menu_list');
const place = document.querySelectorAll('.side_menu_item');
const description = document.querySelector('.description');

description.innerHTML = infoArray[0].text ;

sideMenu.addEventListener('click', function(e) {
  place.forEach((item, i) =>{
    if(item  === e.target){
      description.innerHTML = infoArray[i].text;
    }
    item.classList.remove('active');
    e.target.classList.add('active');
  } );
});
}); 
