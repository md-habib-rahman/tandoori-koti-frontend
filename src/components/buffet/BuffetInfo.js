// Content for the buffet page that is not loaded from the API.
// Edit hours, prices and the list of inclusions here.
// Save as: src/data/buffetInfo.js

export const BUFFET_INFO = {
  hours: { fi: "Arkisin 10:30–14:30", en: "Weekdays 10:30–14:30" },

  tiers: [
    {
      id: "buffet",
      featured: true,
      name: { fi: "Lounasbuffet", en: "Lunch buffet" },
      price: "13.90",
      desc: {
        fi: "Sisältää kaikki lämpimät ruoat, salaattipöydän, tuoreen naan-leivän, kahvin ja jälkiruoan.",
        en: "Full access to all hot dishes, salad bar, fresh naan, tea, coffee and dessert.",
      },
    },
    {
      id: "children",
      name: { fi: "Lapset (5–12 v)", en: "Children (5–12 yrs)" },
      price: "8.90",
      desc: {
        fi: "Monipuolinen ja miedosti maustettu valikoima perheen pienimmille.",
        en: "A varied, mild selection suitable for younger guests.",
      },
    },
    {
      id: "takeaway",
      name: { fi: "Lounas takeaway", en: "Lunch takeaway box" },
      price: "12.50",
      desc: {
        fi: "Valitse suosikkisi mukaan otettavaan lounasrasiaan.",
        en: "Pack your favourite curries and sides to go.",
      },
    },
  ],

  features: [
    {
      fi: "Uunituore naan-leipä suoraan saviuunista",
      en: "Freshly baked naan straight from the clay oven",
    },
    {
      fi: "Raikas salaattipöytä ja viileä raita",
      en: "Crisp, vibrant salad bar and chilled raita",
    },
    {
      fi: "Aromaattinen basmatiriisi ja päivän lämmin keitto",
      en: "Fragrant basmati rice and a daily warm soup",
    },
    {
      fi: "Makea jälkiruoka tai mangolassi",
      en: "Sweet dessert or house mango specialty",
    },
    {
      fi: "Reilu kahvi ja haudutettu intialainen tee",
      en: "Brewed coffee and spiced Indian chai",
    },
  ],
};