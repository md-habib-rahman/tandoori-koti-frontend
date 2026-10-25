// Content for the three editorial blocks on the menu page.
// Edit text, prices and photos here instead of inside the components.

export const SHOWCASE_SECTIONS = [
  {
    id: "starters",
    image:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",
    alt: { fi: "Alkuruoat ja samosat", en: "Starters and samosas" },
    tag: { fi: "Alkuruoat ja herkut", en: "Starters and bites" },
    title: { fi: "Täydellinen alku", en: "The perfect starter" },
    desc: {
      fi: "Rapeita samosoja, tandoorilämmössä paistettuja vartaita ja maustettuja katkarapuja herättelemään ruokahalua.",
      en: "Crisp golden samosas, spiced street pakoras and sizzling tandoori skewers to awaken your palate.",
    },
    items: [
      {
        name: { fi: "Paneer Pakora", en: "Paneer Pakora" },
        price: "7.00",
        desc: {
          fi: "Friteerattua tuorejuustoa maustetussa taikinassa.",
          en: "Deep-fried cottage cheese in spiced chickpea batter.",
        },
      },
      {
        name: { fi: "Chicken Tikka", en: "Chicken Tikka" },
        price: "9.00",
        featured: true,
        desc: {
          fi: "Jogurttimarinoitua hiiligrillattua kanaa.",
          en: "Tandoor-charred boneless chicken in a yogurt marinade.",
        },
      },
      {
        name: { fi: "Prawn Puri", en: "Prawn Puri" },
        price: "8.90",
        desc: {
          fi: "Meheviä katkarapuja paistetulla puri-leivällä.",
          en: "Juicy sautéed king prawns on crisp Indian puri bread.",
        },
      },
      {
        name: { fi: "Kasvissamosa", en: "Vegetable Samosa" },
        price: "7.00",
        desc: {
          fi: "Rapea leivonnainen peruna-, herne- ja yrttitäytteellä.",
          en: "Golden pastry filled with spiced potatoes, peas and fresh mint.",
        },
      },
    ],
  },
  {
    id: "mains",
    image:
      "https://res.cloudinary.com/vbi0knds/image/upload/v1788718600/DSC09455.jpg",
    alt: { fi: "Tandoori ja curryt", en: "Tandoori and curries" },
    tag: { fi: "Pääruoat ja tandoori", en: "Mains and live tandoor" },
    title: { fi: "Tandoorin parhaat", en: "Meet your meat" },
    desc: {
      fi: "Perinteisessä saviuunissa kypsennetyt mureat lihat, mehevät lampaanpalat ja täyteläiset miedot tai tuliset currykastikkeet.",
      en: "Tender lamb simmered in Kashmiri aromatics, succulent char-grilled chicken and slow-braised beef curries.",
    },
    items: [
      {
        name: {
          fi: "Murg Makhani (Voikana)",
          en: "Murg Makhani (Butter Chicken)",
        },
        price: "17.50",
        featured: true,
        desc: {
          fi: "Tandoorigrillattua kanaa täyteläisessä tomaatti-voikermakastikkeessa.",
          en: "Char-grilled tandoori chicken in a rich butter, tomato and cashew gravy.",
        },
      },
      {
        name: { fi: "Mutton Rogan Josh", en: "Mutton Rogan Josh" },
        price: "18.90",
        desc: {
          fi: "Mureaa lammasta kashmirilaisessa chili-yrttikastikkeessa.",
          en: "Tender lamb in Kashmiri chili and an aromatic whole-spice reduction.",
        },
      },
      {
        name: { fi: "Nautaa Vindaloo", en: "Beef Vindaloo" },
        price: "17.90",
        desc: {
          fi: "Erittäin tulista nautaa etikka-chilikastikkeessa perunalla.",
          en: "Fiery Goan beef curry with vinegar, garlic and soft potatoes.",
        },
      },
      {
        name: {
          fi: "Tandoori Mix Tikka Sizzler",
          en: "Tandoori Mix Tikka Sizzler",
        },
        price: "20.50",
        desc: {
          fi: "Kanan, lampaan ja juuston tikkapaloja kuumalla parilalla.",
          en: "Char-grilled chicken, lamb and paneer on a piping hot cast-iron sizzler.",
        },
      },
    ],
  },
  {
    id: "veg-seafood",
    image:
      "https://res.cloudinary.com/vbi0knds/image/upload/v1788718601/DSC09476.jpg",
    alt: {
      fi: "Kasvisruoat ja merenelävät",
      en: "Vegetarian and seafood dishes",
    },
    tag: { fi: "Kasvis ja merenelävät", en: "Vegetarian and seafood" },
    title: { fi: "Herkkua joka suupalassa", en: "Delight in every bite" },
    desc: {
      fi: "Talon tuorejuustoa kermaisessa pinaattikastikkeessa sekä mereneläviä aromaattisessa tamarindi-kookoscurryssa.",
      en: "House-made cottage cheese in a rich garlic spinach sauce and jumbo prawns stewed in a spiced coconut gravy.",
    },
    items: [
      {
        name: { fi: "Palak Paneer", en: "Palak Paneer" },
        price: "15.50",
        featured: true,
        desc: {
          fi: "Tuorejuustoa pehmeässä ja maustetussa pinaattikastikkeessa.",
          en: "Cottage cheese cubes in smooth, fragrant garlic-steeped spinach.",
        },
      },
      {
        name: { fi: "Valkosipulikatkaravut", en: "Garlic Prawns" },
        price: "18.90",
        desc: {
          fi: "Jättikatkarapuja tuoreessa valkosipulivoissa korianterilla.",
          en: "King prawns sautéed in crushed garlic butter, cilantro and spice.",
        },
      },
      {
        name: { fi: "Dal Makhani", en: "Dal Makhani" },
        price: "14.50",
        desc: {
          fi: "Mustia linssejä haudutettuna voissa ja tomaattikastikkeessa.",
          en: "Black lentils slow-simmered overnight with butter and pureed tomatoes.",
        },
      },
      {
        name: { fi: "Kalacurry", en: "Fish Curry" },
        price: "17.50",
        desc: {
          fi: "Kalaa kookosmaidossa ja mausteisessa curryliemessä.",
          en: "Tender fish simmered with mustard seeds, curry leaves and coconut milk.",
        },
      },
    ],
  },
];
