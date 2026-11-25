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
    ]
  },

  // ---------- käynnistysruutu ----------
  boot:{
    lead:'Roivo on IT-johtamisen asiantuntijatalo.',
    lines:['IT-kokonaisuus näkyväksi','Vastuut määritelty','Ongelmista päätöksiksi']
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
  cardTagline:'IT-johtamisen asiantuntijatalo'
};
