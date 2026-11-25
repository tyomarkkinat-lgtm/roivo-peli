// ROIVO Business Survival – English texts. Same structure as content.js.
// The English version has no Finnish-only paths: all calls to action lead to roivo.fi.
window.RBS_CONTENT_EN={

  links:{
    pikatesti:'https://roivo.fi',
    roivo:'https://roivo.fi'
  },

  hub:{
    tagline:'How well do you lead your company’s IT?',
    about:'Roivo is an IT leadership consultancy. We help organisations develop their IT, put AI to productive use and get more out of their people’s working time. We strengthen security, run IT procurement and help lead technology investments.',
    services:['IT leadership','IT360 assessment','AI and productivity','IT procurement','Security and resilience'],
    more:'About Roivo',
    diffHint:'Choose a difficulty and start playing.'
  },

  aboutPanel:{
    kick:'Behind the game',
    title:'About Roivo',
    intro:['Roivo is a Finnish IT leadership consultancy. We help organisations develop their IT, use AI productively and improve the productivity of everyday work.',
      'We don’t run IT on your behalf. We make the whole of your IT visible, assign clear ownership and turn the problems we find into decisions and actions.'],
    services:[
      ['IT360 assessment','A complete picture of your IT: systems, contracts, risks and ownership.'],
      ['Fractional CIO','IT leadership part-time: direction, decisions and investments tied into one plan.'],
      ['Interim CIO','An IT leader for a transition period or a major change.'],
      ['AI and productivity','Using AI and existing systems so that time and quality actually improve.'],
      ['IT procurement','Vendor tendering and contract comparison over the full contract term.'],
      ['Security and resilience','Cyber preparedness, recovery testing and continuity planning.']
    ],
    cta:'Visit roivo.fi',
    back:'Back to the game'
  },

  boot:{
    lead:'Roivo is an IT leadership consultancy.',
    lines:['IT made visible','Ownership assigned','Problems turned into decisions'],
    start:'Starting IT leadership',
    loading:'Loading BUSINESS SURVIVAL...',
    hint:'Tap or press any key'
  },

  notes:[
    {topic:'Security',text:'When did your company last test recovering from a system outage?',w:['w1','w4']},
    {topic:'AI',text:'Buying an AI licence takes minutes. Changing how people work takes leadership.',w:['w2','w4']},
    {topic:'IT costs',text:'When did you last check which IT services your organisation is paying for?',w:['w1','w3']},
    {topic:'Productivity',text:'How many times is the same data entered into different systems in your organisation?',w:['w2']},
    {topic:'IT leadership',text:'Who in your organisation decides where the IT money goes?',w:['w3','w4']},
    {topic:'AI',text:'Do you know which AI services your people are using?',w:['w1','w2','w4']},
    {topic:'AI',text:'Measure the benefits of AI in time saved and in the quality of work.',w:['w2','w4']},
    {topic:'Security',text:'You only know a backup works once you have restored from it.',w:['w1','w4']},
    {topic:'Resilience',text:'How long can your organisation keep working without its most important system?',w:['w1','w2','w4']},
    {topic:'Procurement',text:'Compare IT bids on total cost over the whole contract term.',w:['w3']},
    {topic:'Contracts',text:'Do you know on what terms you can switch IT vendor?',w:['w1','w3']},
    {topic:'Licences',text:'Unused software licences are money spent on nothing.',w:['w3']},
    {topic:'Productivity',text:'Find out how much of your people’s time goes into moving data by hand.',w:['w2']},
    {topic:'IT360',text:'When did you last look at your organisation’s IT as a whole?',w:['w1','w2','w3','w4']},
    {topic:'Technical debt',text:'A temporary IT fix can stay in production for years.',w:['w1','w3']},
    {topic:'Investments',text:'Define what an IT investment should achieve before you buy it.',w:['w3','w4']},
    {topic:'Skills',text:'Who knows the system if its main administrator leaves?',w:['w2','w4']},
    {topic:'Systems',text:'Does every critical system have a named owner?',w:['w1','w2']},
    {topic:'Development',text:'How much of your IT budget goes into developing the business?',w:['w3','w4']}
  ],

  log:{
    priceHike:'IT vendor price list updated. Surprise.',
    contractRenew:'Software licence renewed. User not found.',
    techDebt:'Temporary fix just turned 10.',
    excel:'Excel file detected in a critical process.',
    integrationOk:'Meeting replaced by a working integration.',
    aiTool:'New AI tool purchased. Purpose missing.',
    backupOk:'Backup restored. Tested in advance, for once.',
    budgetOver:'Budget not responding. Check connection to the management team.'
  },
  humor:['System working. Nobody knows why.','Password changed. New password is on a sticky note on the monitor.','Vendor promises the update is small.','40 licences. 23 users.','CSV file sent by email. Again.','API documentation found. It dates from 2014.','Three video meeting tools. All paid for.','Cloud bill went up. Nobody knows why.'],

  svc:{
    w1:{sec:'Security and resilience',bak:'Security and resilience',edu:'AI and productivity',auto:'AI and productivity',view:'IT360 assessment'},
    w2:{auto:'AI and productivity',map:'IT360 assessment',lib:'AI and productivity',buf:'Security and resilience',api:'Fractional CIO'},
    w3:{comp:'IT procurement',arch:'IT360 assessment',debt:'Fractional CIO',cloud:'IT procurement',auto:'AI and productivity'},
    w4:{sec:'Security and resilience',auto:'AI and productivity',bak:'Security and resilience',edu:'AI and productivity',lead:'Fractional CIO',comp:'IT procurement'}
  },

  result:{
    kick:'ROIVO / AFTER ACTION REPORT',
    dims:{cost:'Cost control',sec:'Security',prod:'Productivity'},
    strong:{cost:'costs',sec:'security',prod:'productivity'},
    weak:{
      cost:['costs got away from you','When did you last check which IT services your organisation is paying for?'],
      sec:['resilience needs work','When did your organisation last test how it copes with an IT outage?'],
      prod:['productivity was left on the table','How many times is the same data entered into different systems in your organisation?']
    },
    allGood:['You handled all three areas in the game. In a real organisation, that takes someone looking after the whole.','Who in your organisation decides where the IT money goes?'],
    disclaimer:'The result describes your game, not your organisation’s IT.',
    ctaTitle:'Want to talk about IT leadership in your organisation?',
    ctaText:'Roivo helps organisations develop their IT, use AI productively and lead technology investments.',
    ctaLink:'Visit roivo.fi',
    services:'Roivo’s services',
    share:'Share your result',
    again:'Play again'
  },

  rules:{
    w1:{name:'Survive',
      idea:'You steer your company’s data chain. The business grows with every coin, but growth brings new systems and new threats. This world is about IT risk: prepare before the outage, not after.',
      goal:'Collect the target number of coins in each round. There are five rounds. Between rounds you invest your cash in permanent upgrades.',
      fail:'Hitting a wall, an obstacle, an outage or your own chain costs operational capacity, and so does a cyber threat. When capacity runs out, the round restarts. Upgrades you bought are kept.',
      desktop:'Arrow keys or WASD. P or Esc pauses the game.',
      mobile:'Swipe on the field or use the direction pad.',
      legend:[
        ['coin','Coin','Grows your cash and your chain. Every coin also adds new obstacles to the field.'],
        ['shield','Shield','Blocks the next hit.'],
        ['bolt','Productivity','Coins pay double for 10 seconds.'],
        ['backup','Backup','Restores 20% operational capacity.'],
        ['skill','Skills','Halves the impact of hits for a while.'],
        ['contract','Contract card','Collect it before time runs out. Otherwise the contract renews and costs you cash.'],
        ['block','New system','Flashes briefly, then becomes a permanent obstacle.'],
        ['debt','Technical debt','Becomes a permanent obstacle.'],
        ['price','Price rise','Moves around the field. Touching it costs you cash.'],
        ['virus','Cyber threat','Heads for your chain. A hit costs operational capacity.'],
        ['outage','System outage','An area is closed for a while. A warning flashes first.']
      ]},
    w2:{name:'Connect',
      idea:'You build the pipes that carry data from one system to another. This world is about integrations and productivity: when systems don’t talk to each other, people move the data by hand.',
      goal:'Route every data flow to the target system of the same colour. There are five processes. Between processes you invest your cash in permanent upgrades.',
      fail:'If data reaches the end of a pipe, an empty tile, an Excel transfer or the wrong system, it leaks into manual work and the process restarts.',
      desktop:'Click a tile to place the next piece there. Space starts the flow or speeds it up. S skips a piece. P or Esc pauses the game.',
      mobile:'Tap a tile. Use the buttons below to start the flow and skip pieces.',
      legend:[
        ['src','Source system','Data starts here. The colour tells you where it belongs.'],
        ['tgt','Target system','Data must reach the target of the same colour.'],
        ['pipeH','Straight piece','Carries data straight through.'],
        ['pipeC','Corner piece','Turns the data flow.'],
        ['pipeX','Crossing','Two flows can pass through each other.'],
        ['flow','Flow','Starts when the timer runs out. Starting early earns a bonus.'],
        ['excel','Excel transfer','A manual step. You can’t build through it.'],
        ['legacy','Legacy system','An obstacle in the acquisition round.']
      ],
      extra:'You can replace a placed piece, but it costs money. Efficiency drops for every piece the data never passes through.'},
    w3:{name:'Optimize',
      idea:'The falling blocks are your company’s IT purchases. Arrange them so overlaps disappear and costs stay within budget. This world is about IT cost control and procurement.',
      goal:'Clear the target number of rows. A full row removes overlapping costs and brings savings. There are five rounds.',
      fail:'If a new purchase doesn’t fit on the field, your IT collapses and the round restarts. Going over budget halves your row savings.',
      desktop:'Arrows move, up rotates, down drops faster and space drops instantly. C tenders the purchase. P or Esc pauses the game.',
      mobile:'Use the buttons below. On the field, tap to rotate, swipe sideways to move and swipe down to drop.',
      legend:[
        ['p_dev','Device','€40/month.'],
        ['p_lic','Licence','€60/month.'],
        ['p_cloud','Cloud service','€80/month.'],
        ['p_team','Team app','€100/month.'],
        ['p_db','Database','€120/month.'],
        ['p_contract','Rigid 5-year contract','€150/month. Can’t be rotated.'],
        ['p_debt','Technical debt','Rises from the bottom as a row with one gap.'],
        ['p_price','Price rise','Drops onto the field and adds €50/month.']
      ],
      extra:'Tendering swaps your current purchase for another. You only get a few per round.'},
    w4:{name:'Defend & Grow',
      idea:'You build protection and improvements for your company’s four functions. Threats come down the lanes towards the company. This world brings the earlier ones together: IT leadership means putting investment where the risk or the benefit is greatest.',
      goal:'Hold off eight waves. In the last wave, a cyber incident, rising costs and a demand spike all hit at once.',
      fail:'A threat that reaches the end of a lane costs operational capacity. When it runs out, the wave restarts. Price rises cost you cash.',
      desktop:'Pick a solution from the bar below or with keys 1–6, then click a slot on a lane. Space starts the wave. Click a built solution to sell it. P or Esc pauses the game.',
      mobile:'Pick a solution from the bar below and tap a slot on a lane.',
      legend:[
        ['t_sec','Security','Stops threats on its lane. Most effective against cyber attacks.'],
        ['t_bak','Backup','Takes hits and recovers on its own.'],
        ['t_edu','Training','Slows threats and stops phishing.'],
        ['t_auto','Automation','Earns money during waves.'],
        ['t_lead','IT leadership','Boosts every solution on its lane by 30%. One per lane.'],
        ['t_comp','Procurement','Stops price rises and turns them into savings.'],
        ['e_kyber','Cyber attack','The standard threat.'],
        ['e_phish','Phishing','Fast but weak.'],
        ['e_vika','System failure','Slow and tough.'],
        ['price','Price rise','Passes through defences. Only procurement stops it.'],
        ['e_boss','Major cyber incident','The main threat of the final wave.']
      ],
      extra:'Earlier worlds matter: security upgrades in Survive strengthen Security, finishing Connect raises Automation income and finishing Optimize lowers prices.'}
  },
  cardTagline:'IT leadership consultancy'
};
