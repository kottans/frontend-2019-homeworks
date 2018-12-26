var towns = [
  {
    name: 'Castle', 
    image: 'img/Adventure_Map_Castle_fort.gif', 
    content: 'Castle is a good alignment town with the knight and cleric hero classes. Castle armies are primarily composed of human ' + 
    'men-at-arms, though these towns have also formed an alliance with the griffins and are under the protection of angels. Castle ' +
    'represents Erathia. Castle\'s native terrain is grass.'
  },
  {
    name: 'Rampart', 
    image: 'img/Adventure_Map_Rampart_fort.gif', 
    content: 'Rampart is a good alignment town with the ranger and druid hero classes. Ramparts are built by creatures in allied ' +
    'defense of the unspoiled wilderness regions of Enroth. Rampart represents AvLee. Rampart\'s native terrain is grass.'
  },
  {
    name: 'Tower', 
    image: 'img/Adventure_Map_Tower_fort.gif', 
    content: 'Tower is a good alignment town with alchemist and wizard hero classes. Tower populations are comprised of creatures ' +
    'bound into service by powerful magic, made on the spot, or allied with the town through ancient pacts. Tower represents Bracada. ' +
    'Tower\'s native terrain is snow.'
  },
  {
    name: 'Inferno', 
    image: 'img/Adventure_Map_Inferno_fort.gif', 
    content: 'Inferno is an evil alignment town with the demoniac and heretic hero classes. Infernos can be found in Erathian regions ' +
    'blighted by the emergence of the underworld on the surface. Demoniac and heretic heroes stand in an uneasy alliance with these ' +
    'towns. Inferno represents Eeofol. Inferno\'s native terrain is lava.'
  },
  {
    name: 'Necropolis', 
    image: 'img/Adventure_Map_Necropolis_fort.gif', 
    content: 'Necropolis is an evil alignment town, that is overrun and ruled by undead creatures. They are the natural bases for the ' +
    'necromancer and death knight hero classes. Necropolis represents Deyja. Necropolis\' native terrain is dirt.'
  },
  {
    name: 'Dungeon', 
    image: 'img/Adventure_Map_Dungeon_fort.gif', 
    content: 'Dungeon is an evil alignment town. Dungeons are built by the warlock and overlord hero classes to act as bases from ' +
    'which to wage campaigns of conquest for wealth and power. Similarly minded creatures are attracted as allies. Other dungeon ' +
    'creatures are in thrall to their masters. Dungeon represents Nighon. Dungeon\'s native terrain is subterranean.'
  },
  {
    name: 'Stronghold', 
    image: 'img/Adventure_Map_Stronghold_fort.gif', 
    content: 'Stronghold is a neutral alignment town with the barbarian and battle mage hero classes. Strongholds are built by ' +
    'alliances of tribes. Stronghold represents Krewlod. Stronghold\'s native terrain is rough.'
  },
  {
    name: 'Fortress', 
    image: 'img/Adventure_Map_Fortress_fort.gif', 
    content: 'Fortress is a neutral alignment town with the beastmaster and witch hero classes. Fortresses are built at the edge of ' +
    'swamps. Their armies are primarily made up of deadly creatures – born of the swamps, and then subdued and trained for warfare. ' +
    'Fortress represents Tatalia. Fortress\' native terrain is swamp.'
  },
  {
    name: 'Conflux', 
    image: 'img/Adventure_Map_Conflux_fort.gif', 
    content: 'Conflux is a neutral alignment town with the planeswalker and elementalist hero classes. Conflux is focused around ' +
    'magic and magic-related units. Conflux represents the elemental planes. Conflux\'s native terrain is grass. It is replaced with' +
    'highlands in Horn of the Abyss.'}
]
var main = [
  {
    image: 'img/logo.jpg',
    content: 'Heroes of Might and Magic III: The Restoration of Erathia (commonly referred to as Heroes of Might & Magic 3, or simply ' +
  'Heroes 3) is a turn-based strategy game developed by Jon Van Caneghem through New World Computing originally released for ' +
  'Microsoft Windows by the 3DO Company in 1999. Its ports to several computer and console systems followed in 1999-2000. It is the ' +
  'third installment of the Heroes of Might and Magic series. The game\'s story is first referenced throughout Might and Magic VI: ' +
  'The Mandate of Heaven and serves as a prequel to Might and Magic VII: For Blood and Honor. The player can choose to play through ' +
  'seven different campaigns telling the story, or play in a scenario against computer or human opponents. The gameplay is very ' +
  'similar to its predecessors in that the player controls a number of heroes that command an army of creatures inspired by myth and ' +
  'legend. The gameplay is divided into two parts, tactical overland exploration and a turn based combat system. The player creates ' +
  'an army by spending resources at one of the eight town types in the game. The hero will progress in experience by engaging in ' +
  'combat with enemy heroes and monsters. The conditions for victory vary depending on the map, including conquest of all enemies ' + 
  'and towns, collection of a certain amount of a resource, or finding the grail artifact. Heroes III was released to universal ' +
  'acclaim and was praised by critics. The game received the expansion packs Heroes of Might and Magic III: Armageddon\'s Blade and ' +
  'Heroes of Might and Magic III: The Shadow of Death. Heroes Chronicles, a series of short introductory games based on the Heroes III' +
  'engine, was also released. A special version of Heroes III titled Heroes III Complete, which included the original game and both ' + 
  'expansion packs, was released in 2000. On December 10, 2014, Ubisoft announced an HD version of the game. The new version features ' + 
  'updated graphics as well as wide screen compatibility and was released on January 29, 2015 for Microsoft Windows, iOS and Android.' +
  '[2] However, the expansions have not been re-released because their source code is lost.[3] Numerous unofficial patches and mods ' +
  'made by the dedicated fan - such as the HD mod, In the Wake of Gods mod, and the Horn of the Abyss mod - have substantially ' +
  'improved the games\' stability, balance and features.'
}]
var plot = [
  {
    content: 'The game\'s story unfolds primarily through a series of seven playable campaigns, all set upon the continent of ' +
  'Antagarich. During the campaigns, the story is told from alternating points of view, giving players the opportunity to play as ' +
  'each of the town alignments.Following the disappearance of King Roland Ironfist of Enroth prior to Might and Magic VI: The Mandate ' +
  'of Heaven, his wife, Queen Catherine, is left to rule the realm. In the meantime, her father, King Gryphonheart of Erathia, is ' +
  'assassinated. Without their beloved King, the kingdom of Erathia falls to the dark forces of Nighon and Eeofol. Queen Catherine ' +
  'returns home to Antagarich seeking to rally the people of her homeland and lead them against the evil that has ravaged their ' +
  'nation. Erathia\'s capital of Steadwick is sacked by the dungeon lords of Nighon and the Kreegans of Eeofol. Meanwhile, the ' +
  'nations of Tatalia and Krewlod skirmish at the western border, seizing the chance to expand their territory. Catherine\'s first ' +
  'task is to establish a foothold in the conquered kingdom by enlisting the aid of allies. The wizards of Bracada and the elves of ' +
  'AvLee answer her call, and together they push towards Steadwick and eventually retake it, quickly quelling the border war in the ' +
  'west. Soon after, Lucifer Kreegan, a commander in the Eeofol armies, sends an envoy to Erathia claiming that Roland Ironfist is ' +
  'captive within their territories. AvLee invades Eeofol, but fails to rescue Roland, who is transported to their northern holdings. ' +
  'Afterwards, Catherine invades Nighon, pushing the dungeon armies back to their island home. In the meantime, the necromancers of ' +
  'Deyja, having been responsible for the assassination of King Gryphonheart, plot to revive his corpse as a lich. They plan to use ' +
  'his wisdom in leading their own armies of the undead. However, King Gryphonheart\'s will proves too much for the necromancers even ' +
  'in his corrupted state, and he becomes a rogue lich. Having little other recourse, Queen Catherine is forced to ally herself with ' +
  'the necromancers and together they set out to destroy the lich of King Gryphonheart before he becomes too powerful. A final bonus ' +
  'campaign, accessible only after the main campaigns are complete, tells the story of separatists living in the Contested Lands, a ' +
  'war-torn border between Erathia and AvLee. Tired of the skirmishes that bring unrest to their homelands, they join together to ' +
  'fight for independence from the two large kingdoms. It is later implied that this rising was orchestrated by Archibald Ironfist, ' +
  'the antagonist of Heroes of Might and Magic II.'
}]

