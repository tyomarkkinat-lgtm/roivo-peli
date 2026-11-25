// ROIVO Business Survival – muokattavat tekstit
// Tähän tiedostoon on koottu Roivon esittely, palvelut, Roivo Notes, järjestelmälokin viestit,
// palvelukytkennät ja tulossivun huomiot. Tekstejä voi muuttaa koskematta pelilogiikkaan.
// Muista Roivon tyylisäännöt: ei huutomerkkejä, ei "ilmainen", ei "kokonaisvaltainen".
window.RBS_CONTENT={

  links:{
    pikatesti:'https://testi.roivo.fi',
    roivo:'https://roivo.fi'
  },

  // ---------- etusivu ----------
  hub:{
    tagline:'Miten hyvin johdat yrityksesi IT:tä?',
    about:'Roivo on IT-johtamisen asiantuntijatalo. Autamme organisaatioita kehittämään IT-toimintojaan, hyödyntämään tekoälyä ja parantamaan työn tuottavuutta. Vahvistamme tietoturvaa, kilpailutamme IT-palveluita ja autamme johtamaan teknologiaan liittyviä investointeja.',
    services:['IT-johtaminen','IT360-kartoitus','Tekoäly ja tuottavuus','IT-kilpailutukset','Tietoturva ja varautuminen'],
    more:'Tutustu Roivoon',
    diffHint:'Valitse vaikeustaso ja aloita peli.'
  },

  // ---------- Tutustu Roivoon -ikkuna ----------
  aboutPanel:{
    kick:'Pelin takana',
    title:'Tutustu Roivoon',
    intro:['Roivo on IT-johtamisen asiantuntijatalo. Autamme organisaatioita kehittämään IT-toimintojaan, hyödyntämään tekoälyä ja parantamaan työn tuottavuutta.',
      'Emme hoida IT:tä organisaation puolesta. Teemme IT-kokonaisuuden näkyväksi, määritämme vastuut ja muutamme havaitut ongelmat päätöksiksi ja toimenpiteiksi.'],
    services:[
      ['IT-pikatesti','Lyhyt testi viidestä osa-alueesta. Tulos samalla asteikolla kuin tässä pelissä. Maksuton, ei sitoumuksia.'],
      ['IT360-kartoitus','Kokonaiskuva organisaation IT:stä: järjestelmät, sopimukset, riskit ja vastuut.'],
      ['IT-johtaja palveluna','IT-johtaminen osa-aikaisesti: suunta, päätökset ja investoinnit yhteen kokonaisuuteen.'],
      ['Interim CIO','IT-johtaja siirtymävaiheen tai muutoksen ajaksi.'],
      ['Tekoäly ja tuottavuus','Tekoälyn ja järjestelmien hyödyntäminen niin, että työaika ja laatu oikeasti paranevat.'],
      ['IT-kilpailutukset','Toimittajien kilpailutus ja sopimusten vertailu koko sopimuskauden kustannuksilla.'],
      ['Tietoturva ja varautuminen','Kybervarautuminen, palautumisen testaus ja jatkuvuuden suunnittelu.']
    ],
    cta:'Tee IT-pikatesti',
    back:'Takaisin peliin'
  },

  // ---------- käynnistysruutu ----------
  boot:{
    lead:'Roivo on IT-johtamisen asiantuntijatalo.',
    lines:['IT-kokonaisuus näkyväksi','Vastuut määritelty','Ongelmista päätöksiksi'],
    start:'Käynnistetään IT-johtaminen',
    loading:'Ladataan BUSINESS SURVIVAL...',
    hint:'Napauta tai paina mitä tahansa näppäintä'
  },

  // ---------- Roivo Notes ----------
  // w = pelimaailmat, joissa note sopii näytettäväksi (w1 Survive, w2 Connect, w3 Optimize, w4 Defend & Grow)
  notes:[
    {topic:'Tietoturva',text:'Milloin yrityksessäsi on viimeksi testattu palautumista järjestelmäkatkoksesta?',w:['w1','w4']},
    {topic:'Tekoäly',text:'Tekoälylisenssin hankkiminen vie minuutteja. Työtapojen muuttaminen vaatii johtamista.',w:['w2','w4']},
    {topic:'IT-kustannukset',text:'Milloin viimeksi tarkistit, mistä IT-palveluista organisaatiosi maksaa?',w:['w1','w3']},
    {topic:'Tuottavuus',text:'Kuinka monta kertaa sama tieto syötetään organisaatiosi eri järjestelmiin?',w:['w2']},
    {topic:'IT-johtaminen',text:'Kuka organisaatiossasi päättää, mihin IT-raha käytetään?',w:['w3','w4']},
    {topic:'Tekoäly',text:'Tiedätkö, mitä tekoälypalveluita henkilöstösi käyttää?',w:['w1','w2','w4']},
    {topic:'Tekoäly',text:'Mittaa tekoälyn hyötyjä säästyneenä työaikana ja työn laadussa.',w:['w2','w4']},
    {topic:'Tietoturva',text:'Varmuuskopioiden toimivuus selviää palauttamalla tiedot.',w:['w1','w4']},
    {topic:'Varautuminen',text:'Kuinka pitkään organisaatiosi pystyy toimimaan ilman tärkeintä järjestelmäänsä?',w:['w1','w2','w4']},
    {topic:'Kilpailutus',text:'Vertaa IT-tarjousten kokonaiskustannuksia koko sopimuskaudelta.',w:['w3']},
    {topic:'Sopimukset',text:'Tiedätkö, millä ehdoilla voit vaihtaa IT-toimittajaasi?',w:['w1','w3']},
    {topic:'Lisenssit',text:'Käyttämättömät ohjelmistolisenssit aiheuttavat turhia kustannuksia.',w:['w3']},
    {topic:'Tuottavuus',text:'Selvitä, kuinka paljon henkilöstön työaikaa kuluu manuaaliseen tiedonsiirtoon.',w:['w2']},
    {topic:'IT360',text:'Milloin viimeksi tarkastelit organisaatiosi IT-kokonaisuutta?',w:['w1','w2','w3','w4']},
    {topic:'Tekninen velka',text:'Väliaikaisen IT-ratkaisun ylläpito voi jatkua vuosia.',w:['w1','w3']},
    {topic:'Investoinnit',text:'Määrittele IT-investoinnin tavoiteltu hyöty ennen hankintaa.',w:['w3','w4']},
    {topic:'Osaaminen',text:'Kuka tuntee järjestelmän, jos sen pääkäyttäjä lähtee?',w:['w2','w4']},
    {topic:'Järjestelmät',text:'Onko jokaisella tärkeällä järjestelmällä nimetty vastuuhenkilö?',w:['w1','w2']},
    {topic:'Kehittäminen',text:'Kuinka paljon IT-budjetistasi käytetään toiminnan kehittämiseen?',w:['w3','w4']}
  ],

  // ---------- ROIVO SYSTEM LOG ----------
  // Tapahtumiin sidotut viestit. Pelin luvut (esim. kassan muutos) lisätään perään automaattisesti.
  log:{
    priceHike:'IT-toimittajan hinnasto päivitetty. Yllätys.',
    contractRenew:'Ohjelmistolisenssi uusiutui. Käyttäjää ei löytynyt.',
    techDebt:'Väliaikainen ratkaisu täytti juuri 10 vuotta.',
    excel:'Excel-tiedosto havaittu kriittisessä prosessissa.',
    integrationOk:'Palaveri korvattu toimivalla integraatiolla.',
    aiTool:'Uusi AI-työkalu hankittu. Käyttötarkoitus puuttuu.',
    backupOk:'Varmuuskopio palautettu. Kerrankin testattu etukäteen.',
    budgetOver:'Budjetti ei vastaa. Tarkista yhteys johtoryhmään.'
  },
  // Satunnaiset viestit, jotka eivät liity yksittäiseen tapahtumaan
  humor:['Järjestelmä toimii. Kukaan ei tiedä miksi.','Salasana vaihdettu. Uusi salasana on lapulla näytön reunassa.','Toimittaja lupaa, että päivitys on pieni.','Lisenssejä on 40. Käyttäjiä on 23.','CSV-tiedosto lähetetty sähköpostilla. Taas.','Rajapinnan dokumentaatio löytyi. Se on vuodelta 2014.','Kolme eri videopalaverityökalua. Kaikki maksussa.','Pilvilasku nousi. Kukaan ei tiedä miksi.'],

  // ---------- palvelukytkennät parannuksiin ----------
  svc:{
    w1:{sec:'Tietoturva ja varautuminen',bak:'Tietoturva ja varautuminen',edu:'Tekoäly ja tuottavuus',auto:'Tekoäly ja tuottavuus',view:'IT360-kartoitus'},
    w2:{auto:'Tekoäly ja tuottavuus',map:'IT360-kartoitus',lib:'Tekoäly ja tuottavuus',buf:'Tietoturva ja varautuminen',api:'IT-johtaja palveluna'},
    w3:{comp:'IT-kilpailutukset',arch:'IT360-kartoitus',debt:'IT-johtaja palveluna',cloud:'IT-kilpailutukset',auto:'Tekoäly ja tuottavuus'},
    w4:{sec:'Tietoturva ja varautuminen',auto:'Tekoäly ja tuottavuus',bak:'Tietoturva ja varautuminen',edu:'Tekoäly ja tuottavuus',lead:'IT-johtaja palveluna',comp:'IT-kilpailutukset'}
  },

  // ---------- tulossivu ----------
  result:{
    kick:'ROIVO / AFTER ACTION REPORT',
    dims:{cost:'Kustannusten hallinta',sec:'Tietoturva',prod:'Tuottavuus'},
    // vahvin osa-alue kuvataan näin ("Hallitsit pelissä ___ hyvin")
    strong:{cost:'kustannukset',sec:'tietoturvan',prod:'tuottavuuden'},
    // heikoin osa-alue: huomio ja kysymys
    weak:{
      cost:['kustannukset pääsivät karkaamaan','Milloin viimeksi tarkistit, mistä IT-palveluista organisaatiosi maksaa?'],
      sec:['varautumiseen jäi kehitettävää','Milloin omassa organisaatiossasi on viimeksi testattu selviytymistä IT-häiriöstä?'],
      prod:['tuottavuuteen jäi käyttämätöntä potentiaalia','Kuinka monta kertaa sama tieto syötetään organisaatiosi eri järjestelmiin?']
    },
    allGood:['Hallitsit pelissä kaikki kolme osa-aluetta. Oikeassa organisaatiossa sama vaatii, että joku katsoo kokonaisuutta.','Kuka organisaatiossasi päättää, mihin IT-raha käytetään?'],
    disclaimer:'Pelin tulos kuvaa pelisuoritusta, ei organisaatiosi IT-tilannetta.',
    ctaTitle:'Haluatko tietää, missä organisaatiosi IT oikeasti on?',
    ctaText:'IT-pikatesti käy läpi viisi osa-aluetta. Maksuton, ei sitoumuksia.',
    ctaLink:'Tee IT-pikatesti',
    services:'Tutustu Roivon palveluihin',
    share:'Jaa saavutuksesi',
    again:'Pelaa uudelleen'
  },

  // ---------- pelimaailmojen säännöt ----------
  // icon = kuvake, jonka icons.js piirtää. Kuvakkeet vastaavat pelikentän grafiikkaa.
  rules:{
    w1:{name:'Survive',
      idea:'Ohjaat yrityksen dataketjua. Liiketoiminta kasvaa jokaisesta kolikosta, mutta kasvu tuo mukanaan uusia järjestelmiä ja uhkia. Maailma kuvaa IT-riskejä: varautuminen kannattaa tehdä ennen häiriötä.',
      goal:'Kerää jokaisella kierroksella tavoitemäärä kolikoita. Kierroksia on viisi. Kierrosten välissä investoit kassasta pysyviin parannuksiin.',
      fail:'Törmäys seinään, esteeseen, katkoon tai omaan ketjuun vie toimintakykyä, samoin kyberuhan osuma. Kun toimintakyky loppuu, kierros alkaa alusta. Ostetut parannukset säilyvät.',
      desktop:'Nuolinäppäimet tai WASD. P tai Esc pysäyttää pelin.',
      mobile:'Pyyhkäise kentällä tai käytä ohjausristiä.',
      legend:[
        ['coin','Kolikko','Kasvattaa kassaa ja ketjua. Jokainen kolikko tuo kentälle myös uusia esteitä.'],
        ['shield','Suojakilpi','Torjuu seuraavan osuman.'],
        ['bolt','Tuottavuus','Kolikot tuottavat tuplasti 10 sekunnin ajan.'],
        ['backup','Varmuuskopio','Palauttaa 20 % toimintakykyä.'],
        ['skill','Osaaminen','Osumien vaikutus puolittuu hetkeksi.'],
        ['contract','Sopimuskortti','Kerää ennen kuin aika loppuu. Muuten sopimus uusiutuu ja kassasta lähtee rahaa.'],
        ['block','Uusi järjestelmä','Vilkkuu hetken ja muuttuu pysyväksi esteeksi.'],
        ['debt','Tekninen velka','Muodostuu kentälle pysyväksi esteeksi.'],
        ['price','Hintojen nousu','Liikkuu kentällä. Osuma vie kassasta rahaa.'],
        ['virus','Kyberuhka','Hakeutuu ketjun luo. Osuma vie toimintakykyä.'],
        ['outage','Järjestelmäkatko','Alue suljetaan hetkeksi. Varoitus vilkkuu ennen katkoa.']
      ]},
    w2:{name:'Connect',
      idea:'Rakennat putkiston, jota pitkin tieto kulkee järjestelmästä toiseen. Maailma kuvaa integraatioita ja tuottavuutta: kun järjestelmät eivät keskustele keskenään, tieto siirretään käsin.',
      goal:'Johda jokainen tietovirta saman väriseen kohdejärjestelmään. Prosesseja on viisi. Kierrosten välissä investoit kassasta pysyviin parannuksiin.',
      fail:'Jos tieto päätyy putken päähän, tyhjään ruutuun, Excel-siirtoon tai väärään järjestelmään, se vuotaa käsityöksi ja prosessi alkaa alusta.',
      desktop:'Klikkaa ruutua: seuraava pala asettuu siihen. Välilyönti käynnistää virtauksen tai kiihdyttää sitä. S ohittaa palan. P tai Esc pysäyttää pelin.',
      mobile:'Napauta ruutua. Alapalkin painikkeista käynnistät virtauksen ja ohitat palan.',
      legend:[
        ['src','Lähdejärjestelmä','Tieto lähtee tästä. Väri kertoo, mihin kohteeseen tieto kuuluu.'],
        ['tgt','Kohdejärjestelmä','Tiedon pitää päätyä saman väriseen kohteeseen.'],
        ['pipeH','Suora pala','Vie tiedon suoraan läpi.'],
        ['pipeC','Kulmapala','Kääntää tiedon suuntaa.'],
        ['pipeX','Risteys','Kaksi virtaa voi kulkea toistensa läpi.'],
        ['flow','Virtaus','Lähtee liikkeelle, kun aika loppuu. Etuajassa käynnistys tuo bonuksen.'],
        ['excel','Excel-siirto','Manuaalinen siirto. Putkea ei voi rakentaa sen läpi.'],
        ['legacy','Vanha järjestelmä','Este yritysostokierroksella.']
      ],
      extra:'Valmiin palan voi korvata, mutta se maksaa. Tehokkuus laskee jokaisesta palasta, jonka läpi tieto ei kulje.'},
    w3:{name:'Optimize',
      idea:'Putoavat palikat ovat yrityksen IT-hankintoja. Järjestät ne niin, että päällekkäisyydet poistuvat ja kustannukset pysyvät budjetissa. Maailma kuvaa IT-kustannusten hallintaa ja kilpailutusta.',
      goal:'Täytä kierroksen tavoitemäärä rivejä. Täysi rivi poistaa päällekkäisiä kustannuksia ja tuo säästöjä. Kierroksia on viisi.',
      fail:'Jos uusi hankinta ei mahdu kentälle, IT-kokonaisuus kaatuu ja kierros alkaa alusta. Budjetin ylitys puolittaa rivien säästöt.',
      desktop:'Nuolet liikuttavat, ylänuoli kääntää, alanuoli pudottaa nopeammin ja välilyönti pudottaa heti. C kilpailuttaa hankinnan. P tai Esc pysäyttää pelin.',
      mobile:'Käytä alapalkin painikkeita. Kentällä napautus kääntää, sivuttaispyyhkäisy liikuttaa ja alaspyyhkäisy pudottaa.',
      legend:[
        ['p_dev','Laite','40 €/kk.'],
        ['p_lic','Lisenssi','60 €/kk.'],
        ['p_cloud','Pilvipalvelu','80 €/kk.'],
        ['p_team','Tiimisovellus','100 €/kk.'],
        ['p_db','Tietokanta','120 €/kk.'],
        ['p_contract','Jäykkä 5 v sopimus','150 €/kk. Ei käänny.'],
        ['p_debt','Tekninen velka','Nousee pohjalle kerroksena, jossa on yksi aukko.'],
        ['p_price','Hinnannousu','Putoaa kentälle ja nostaa kustannuksia 50 €/kk.']
      ],
      extra:'Kilpailutus vaihtaa nykyisen hankinnan toiseen. Kilpailutuksia on rajallisesti jokaisella kierroksella.'},
    w4:{name:'Defend & Grow',
      idea:'Rakennat yrityksen neljälle toiminnolle suojauksia ja kehittämistoimia. Uhat tulevat kaistoja pitkin kohti yritystä. Maailma kokoaa yhteen aiempien maailmojen opit: IT-johtaminen on investointien kohdistamista sinne, missä riski tai hyöty on suurin.',
      goal:'Torju kahdeksan aaltoa. Viimeisessä aallossa kyberhäiriö, kustannusten nousu ja kysyntäpiikki tulevat yhtä aikaa.',
      fail:'Kaistan päähän päässyt uhka vie toimintakykyä. Kun toimintakyky loppuu, aalto alkaa alusta. Hinnannousu vie kassasta rahaa.',
      desktop:'Valitse ratkaisu alapalkista tai numeroilla 1–6 ja klikkaa paikkaa kaistalla. Välilyönti aloittaa aallon. Klikkaa rakennettua ratkaisua, jos haluat myydä sen. P tai Esc pysäyttää pelin.',
      mobile:'Valitse ratkaisu alapalkista ja napauta paikkaa kaistalla.',
      legend:[
        ['t_sec','Tietoturva','Torjuu uhkia omalla kaistallaan. Tehokkain kyberhyökkäyksiä vastaan.'],
        ['t_bak','Varmistus','Kestää iskuja ja palautuu itsestään.'],
        ['t_edu','Koulutus','Hidastaa uhkia ja pysäyttää tietojenkalastelun.'],
        ['t_auto','Automaatio','Tuottaa rahaa aaltojen aikana.'],
        ['t_lead','IT-johtaminen','Vahvistaa kaistan kaikkia ratkaisuja 30 %. Yksi kaistaa kohden.'],
        ['t_comp','Kilpailutus','Pysäyttää hinnannousut ja muuttaa ne säästöiksi.'],
        ['e_kyber','Kyberhyökkäys','Tavallinen uhka.'],
        ['e_phish','Tietojenkalastelu','Nopea mutta heikko.'],
        ['e_vika','Järjestelmävika','Hidas ja kestävä.'],
        ['price','Hinnannousu','Kulkee suojausten läpi. Vain kilpailutus pysäyttää sen.'],
        ['e_boss','Laaja kyberhäiriö','Viimeisen aallon pääuhka.']
      ],
      extra:'Aiemmat maailmat vaikuttavat: Surviven tietoturvainvestoinnit tehostavat Tietoturvaa, läpäisty Connect nostaa Automaation tuottoa ja läpäisty Optimize laskee hintoja.'}
  },
  cardTagline:'IT-johtamisen asiantuntijatalo'
};
