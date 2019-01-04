let winesObject = [ {
	wineTitle: "Sparkling Wine",
	wineText: "If you already love sparkling wine, give yourself a pat on the back for your exquisite taste. This wine first came about in France and is synonymous with the region of Champagne. Despite the lowly appeal of many grocery store options (e.g. Cook’s), sparkling wines are the most technically challenging and time intensive wines made in the world.Champagne is often too price restrictive, so instead, keep your eyes peeled for Brut-level sparklers (i.e. not sweet) like Cava, Prosecco, Crémant or perhaps a $12–16 American bubbly.",

},
{
	wineTitle: "Light-Bodied White Wine",
	wineText: "These light easy-drinking dry white wines are some of the most-sold wines in the world (even if red wines get more attention). Light whites are like the “beer of wine” and, for this reason, they are perfect to drink with most foods. Some of these wines are perfect for savory lovers (like Sauv. Blanc and Grüner) with green herbal flavors of gooseberry and bell pepper. Wines that fit into this category include Pinot Gris (aka Pinot Grigio) and Sauvignon Blanc but they also include many lesser known wines like Grüner Veltliner, Albariño and Soave (“swah-vay”). I would highly recommend looking for a wine from a cool climate region (imagine the places with a rainy month of June). Cool climates produce some of the best examples of this light, zesty style.",
},
{
	wineTitle: "Full-Bodied White Wine",
	wineText: "Full-bodied white wines are perfect for red wine lovers because of their rich smooth taste with subtle creaminess. What makes them different than light white wines usually involves special winemaking techniques including the use of oak-aging, (just like aged whiskeys, wine becomes smoother with barrel aging too). he classic choice for this wine is Chardonnay and particularly Chardonnay from a warmer climate (like California, Spain or Italy). Beside Chardonnay, another great option in this style is Viognier.",
},
{
	wineTitle: "Aromatic (sweet) White Wine",
	wineText: "Aromatic grapes are some of the oldest wine varieties in the world. In fact, Cleopatra is noted for her love of Muscat of Alexandria from Greece–a lovely rich aromatic white wine. These wines have explosive, almost perfumed, aromas that spring out of the glass into your nose. They can be either dry or sweet, but most will taste a touch sweet due to all those perfume-y aromas. There are many great aromatic wines to try, and most are shockingly affordable. A few examples of these include Moscato d’Asti, Gewürztraminer, Torrontés (great if you like a more dry style), and Riesling.",
},
{
	wineTitle: "Rosé Wine",
	wineText: "Rosé is a true winemaker’s wine because it’s made by “dying” a wine for only a short time with the skins of red wine grapes. Rosé wines were first popularized in the late 1700’s when French wines imported in England were called “Claret” (sounds like “Clairette”) to describe their pale red color. Today, you can find rosé wines of all styles (sweet or dry) made from many different grapes from Cabernet Sauvignon to Zinfandel (known commonly as White Zinfandel). Instead of the sweet version, try a more dry style Rosé to taste its subtle elegant flavors. Some of the most classic versions of dry rosé come from Southern France in Provence and the Pays d’Oc region. The varieties used to make these wines include Grenache, Syrah, Carignan and Mourvèdre -which are all red wine varieties! Since rosé is made everywhere, perhaps stick to one made with one or several of the aforementioned varieties to experience a classic rosé.",
},
{
	wineTitle: "Light-Bodied Red Wine",
	wineText: "Light-bodied red wines are typically pale in color (you can see through them in a glass) and have very light tannin. FYI, tannin tastes astringent in wine and dries your mouth out in the same way that putting a wet tea bag on your tongue would. For this reason, light red wines are some of the most coveted wines in the world. The classic light red wine that most people know is Pinot Noir but, besides that, Gamay Noir is another great wine to try in this category. Gamay is most known by the name of a region where it grows called Beaujolais.",
},
{
	wineTitle: "Medium-Bodied Red Wine",
	wineText: "Medium red wines are what I like to call “food wines.” They offer up tons of flavor with a balance of zesty acidity which makes them match with a wide variety of foods (from zesty salads to rich and cheesy lasagna). These are the perfect mid-week wines for red wine lovers. There are many varieties that span the mid-weight red wine category so, to name a few familiar ones, check out Grenache, Sangiovese, Merlot, Zinfandel, Montepulciano, Cabernet Franc and Barbera.",
},
{
	wineTitle: "Full-Bodied Red Wine",
	wineText: "Full-bodied red wines are the deepest darkest and most tannic of all the red wines. Tannin might sound weird and bitter but the tannin in wine binds to proteins in our saliva and it has a palate-cleansing effect. This is why a bold red wine pairs so wonderfully with a juicy, fatty steak like ribeye. Full-bodied red wines are also quite pleasing and stand on their own as a cocktail wine. You’ve no doubt experienced one of these wines if you’re a wine lover, they include Syrah/Shiraz, Cabernet Sauvignon, Malbec and even Pinotage. These are perfect examples of how bold a wine can be.",
},
{
	wineTitle: "Dessert Wine",
	wineText: "In the mid to late 1800’s, sweet wines were more popular than dry wines. In fact, several of the most exalted wines in the world, from Sauternes in Bordeaux to Essencia from Hungary, are practically as thick as maple syrup. Dessert wines today now range from dry to sweet and are some of the boldest, most intensely flavored (and aromatic) wines in the world. There are many different types of dessert wines to explore however, if you can start with a Port or a Sauternais-styled wine (a late harvest white wine), you’ll have a great preview of what dessert wines can offer.",
}
];

let list   = 	document.querySelector(".list");
let title   = 	document.querySelector('.title');
let paragraph   = 	document.querySelector('.paragraph');

let showParagraph = (page) => {
	document.title = page.wineTitle;
	title.textContent = page.wineTitle;
	paragraph.textContent = page.wineText;
}

list.addEventListener( 'click', e => {
	document.querySelector(".active").classList.remove("active");
	e.target.classList.add("active");

	let searchParagraph = (el, i, arr) => {
		if(e.target.textContent == el.wineTitle)
		return el;
	}

	showParagraph(winesObject.find(searchParagraph));

});

//rolldown list
// Increments the delay on each item.
$('.rolldown-list li').each(function () {
  var delay = ($(this).index() / 4) + 's';
  $(this).css({
    webkitAnimationDelay: delay,
    mozAnimationDelay: delay,
    animationDelay: delay
  });
});

$('#btnReload').click(function () {
  $('#myList').removeClass('rolldown-list');
  setTimeout(function () {
    $('#myList').addClass('rolldown-list');
  }, 1);
});
