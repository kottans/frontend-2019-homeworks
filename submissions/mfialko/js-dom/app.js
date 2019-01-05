'use strict';
var content = [
    { 'text': "<h2>Kottans Front-End</h2><p>Click on the menu button to change the content inside the main section.</p>"},
    { 'text': "<h2>Mei no partem maluisset</h2><p>An facilisis dissentiunt quo. Sea primis concludaturque id, mel in minim voluptatum, pro antiopam cotidieque ei. Doming atomorum suscipiantur vix ut, perpetua referrentur delicatissimi cu his. No his electram definiebas, qui in lorem ludus, in has magna admodum. An eum vidisse vituperatoribus, lorem apeirian pro et, te audire mandamus deterruisset duo.</p><p>Ea nec laudem electram, et populo epicurei est. Vis an iusto similique temporibus. Sed nulla tritani fabellas ad. In legendos expetenda necessitatibus usu, nonumy graece accommodare mei te, verear mnesarchum eam in. Sed albucius deleniti periculis et. In est quem impedit inermis, his purto ullum in.</p><p>Choro possit expetendis duo an, in ius alii nonumy similique. Cum expetenda consectetuer te.</p>"},
    { 'text': "<h2>Mea homero molestiae similique id, has doctus deseruisse no</h2><p>Ex regione malorum delenit ius, nec an erat recusabo. Sea ut alia malorum, ea per dicat tempor semper, vix porro tation nonumy et. Te has hinc lorem falli. Meliore lucilius te has. Equidem interpretaris nam cu. Nibh congue antiopam nec ea, ne noster volutpat eam. Ei pri decore detracto honestatis, vix consequat cotidieque ea, eu est sensibus suscipiantur. Possit prompta fierent cu vis, error nostrum hendrerit his ea. Facete placerat vel ut, no doming oporteat usu, an vel partiendo maiestatis. Prompta minimum usu et, ut minim choro his. Ne vis velit aperiri definiebas. Simul aliquip qui te.</p><p>Sensibus constituto eum ea. Ex animal concludaturque eos, autem partiendo sed ea. Eu paulo epicurei mandamus mel.</p><p>Eam at nibh cibo disputationi, ut insolens reformidans eos, his elit liber paulo et. Nam quis odio laoreet et. Has vidit putant lucilius an, pro nonumy graecis eu. Qui solum eloquentiam ea.</p>" },
    { 'text': "<h2>Et sea commune complectitur, ex amet malis qui</h2><p>Duo quis mutat munere ex, nam invidunt consulatu no, cum at legimus voluptua mandamus. Affert assentior cu eum, et sea illum ridens necessitatibus. Dicat populo ponderum ea sit, sit an tation labore necessitatibus. Mea purto dolor percipit et, duo esse sonet in, vitae voluptatum et qui. Id utamur repudiandae mel, inani atomorum ad vel. Sale aperiri suscipit est in. Vix in corrumpit deseruisse efficiantur, id qui mucius viderer tractatos. Vix id quodsi accusamus referrentur, eam at ludus quando, cu mei homero propriae. Ea case eius voluptaria pri, ei nam solet blandit tractatos. Et dicant saperet assentior est. Qui ad novum cetero accusam.</p>" },
    { 'text': "<h2>Verear noluisse intellegebat eu nec</h2><p>Eu sit utinam ubique, ea ius ubique mediocrem. Vis id inermis verterem, sea et viderer consetetur definitiones. Quo cibo interpretaris ei, platonem dissentias vim ex, ancillae iracundia eos et.</p><p>Lorem maiormum ut per, dicta nostro labores mel ex, eos molestie definitiones cu. Sit an augue dolore nonumy, ad nostrud intellegam per.Nam et adolescens incorrupte, ex nulla mazim utroque nec. At labores appetere nam. Mel ea option dolorum, usu clita epicurei volutpat eu, iuvaret deseruisse ex eam. Ut cibo evertitur rationibus eam, quodsi ancillae maluisset mel eu.</p>"}
]; 

const sideMenu = document.querySelector('.side-menu');
const main = document.querySelector('main'); 
const mobileMenu = document.querySelector('#menu')
const anchors = Array.prototype.slice.call( document.querySelector('.side-menu').children );

sideMenu.addEventListener('click', function(event) {
    var target = event.target;
    if (target.tagName != 'A') return;
    main.innerHTML="";
    main.insertAdjacentHTML('afterbegin', content[anchors.indexOf(target)]['text']);
    sideMenu.classList.remove('open');
    });

mobileMenu.addEventListener('click', function(e) {
        sideMenu.classList.toggle('open');
        e.stopPropagation();
      });
