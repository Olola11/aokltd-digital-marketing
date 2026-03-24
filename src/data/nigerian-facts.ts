export type FactCategory =
  | 'history'
  | 'geography'
  | 'culture'
  | 'language'
  | 'science'
  | 'nature'
  | 'people'
  | 'economy';

export interface NigerianFact {
  id: string;
  fact: string;
  category: FactCategory;
  source: string;
  sourceUrl?: string;
  yearRelevant?: string;
}

export const nigerianFacts: NigerianFact[] = [
  // ═══ HISTORY ═══
  {
    id: 'hist-001',
    fact: 'The Nok civilisation in central Nigeria produced terracotta sculptures as early as 500 BC — over a thousand years before the Roman Empire fell.',
    category: 'history',
    source: 'Encyclopedia Britannica — Nok Culture',
    sourceUrl: 'https://www.britannica.com/art/Nok-culture',
    yearRelevant: '500 BC',
  },
  {
    id: 'hist-002',
    fact: 'The walls of Benin City, destroyed by the British in 1897, were collectively four times longer than the Great Wall of China and consumed a hundred times more material than the Great Pyramid of Giza.',
    category: 'history',
    source: 'Guinness Book of Records, 1974 edition',
    yearRelevant: '1897',
  },
  {
    id: 'hist-003',
    fact: 'Nigeria\'s first television station, WNTV Ibadan, launched on 31 October 1959 — making it the first in Africa and one of the earliest in the developing world.',
    category: 'history',
    source: 'UNESCO — History of Broadcasting in Africa',
    yearRelevant: '1959',
  },
  {
    id: 'hist-004',
    fact: 'The Igbo-Ukwu bronzes, discovered in eastern Nigeria, date to the 9th century AD and represent some of the earliest and most technically sophisticated bronze castings ever found in sub-Saharan Africa.',
    category: 'history',
    source: 'Thurstan Shaw — Igbo-Ukwu: An Account of Archaeological Discoveries',
    yearRelevant: '9th century',
  },
  {
    id: 'hist-005',
    fact: 'Lagos was Nigeria\'s capital until December 1991 when the government officially moved to Abuja, a purpose-built city in the geographic centre of the country.',
    category: 'history',
    source: 'Federal Capital Territory Administration',
    yearRelevant: '1991',
  },
  {
    id: 'hist-006',
    fact: 'Nigeria gained independence from Britain on 1 October 1960, becoming the most populous country to gain independence in Africa at the time.',
    category: 'history',
    source: 'National Archives of Nigeria',
    yearRelevant: '1960',
  },
  {
    id: 'hist-007',
    fact: 'The Nigerian Civil War (1967-1970) led to the founding of Medecins Sans Frontieres (Doctors Without Borders), created partly in response to the Biafran famine.',
    category: 'history',
    source: 'MSF — Our History',
    sourceUrl: 'https://www.msf.org/our-history',
    yearRelevant: '1971',
  },
  {
    id: 'hist-008',
    fact: 'Queen Amina of Zazzau (now Zaria) ruled in the 15th century and is credited with building fortification walls around Hausa cities, some of which still stand today.',
    category: 'history',
    source: 'UNESCO — Women in African History',
    yearRelevant: '15th century',
  },
  {
    id: 'hist-009',
    fact: 'The Oba of Benin\'s palace contained hundreds of brass plaques that served as a visual historical archive — essentially Africa\'s equivalent of a national museum, centuries before the concept existed in Europe.',
    category: 'history',
    source: 'British Museum — Benin Bronzes Collection Notes',
    sourceUrl: 'https://www.britishmuseum.org/about-us/british-museum-story/contested-objects-collection/benin-bronzes',
  },
  {
    id: 'hist-010',
    fact: 'Amos Tutuola\'s "The Palm-Wine Drinkard," published in 1952, was the first Nigerian novel written in English and was praised by T.S. Eliot and Dylan Thomas.',
    category: 'history',
    source: 'Faber & Faber Publishing Archives',
    yearRelevant: '1952',
  },

  // ═══ GEOGRAPHY ═══
  {
    id: 'geo-001',
    fact: 'Nigeria has 853 languages — the third highest linguistic diversity of any country on earth, after Papua New Guinea and Indonesia.',
    category: 'geography',
    source: 'Ethnologue — Languages of the World',
    sourceUrl: 'https://www.ethnologue.com/country/NG',
  },
  {
    id: 'geo-002',
    fact: 'Chappal Waddi, Nigeria\'s highest point at 2,419 metres, sits on the border with Cameroon and is so remote that many Nigerians have never heard of it.',
    category: 'geography',
    source: 'Survey of Nigeria — National Geographic Records',
  },
  {
    id: 'geo-003',
    fact: 'The Niger River, from which Nigeria gets its name, is the third longest river in Africa at 4,180 kilometres.',
    category: 'geography',
    source: 'Encyclopedia Britannica — Niger River',
    sourceUrl: 'https://www.britannica.com/place/Niger-River',
  },
  {
    id: 'geo-004',
    fact: 'Nigeria spans two major climate zones: the Sahel savanna in the north and tropical rainforest in the south, giving it one of the most ecologically diverse landscapes on the continent.',
    category: 'geography',
    source: 'World Wildlife Fund — Nigeria Ecoregions',
  },
  {
    id: 'geo-005',
    fact: 'Yankari National Park in Bauchi State is home to the largest remaining elephant population in West Africa.',
    category: 'geography',
    source: 'Wildlife Conservation Society — Yankari Report',
  },
  {
    id: 'geo-006',
    fact: 'Nigeria has more than 250 ethnic groups, making it one of the most ethnically diverse nations on earth.',
    category: 'geography',
    source: 'CIA World Factbook — Nigeria',
    sourceUrl: 'https://www.cia.gov/the-world-factbook/countries/nigeria/',
  },
  {
    id: 'geo-007',
    fact: 'The Jos Plateau sits at approximately 1,200 metres above sea level, giving Jos a climate so mild it was used as a hill station retreat by British colonial officers.',
    category: 'geography',
    source: 'Plateau State Tourism Board',
  },
  {
    id: 'geo-008',
    fact: 'Lake Chad, which borders northeast Nigeria, has shrunk by approximately 90% since the 1960s — from 25,000 square kilometres to roughly 2,500.',
    category: 'geography',
    source: 'United Nations Environment Programme',
    sourceUrl: 'https://www.unep.org/resources/report/africa-water-atlas',
  },
  {
    id: 'geo-009',
    fact: 'Cross River State in southeastern Nigeria contains some of the last remaining patches of tropical high forest in West Africa.',
    category: 'geography',
    source: 'Cross River National Park Management Plan',
  },
  {
    id: 'geo-010',
    fact: 'Obudu Mountain Resort (formerly Obudu Cattle Ranch) sits at 1,576 metres above sea level, making it one of the highest inhabited areas in Nigeria.',
    category: 'geography',
    source: 'Cross River State Tourism Bureau',
  },

  // ═══ CULTURE ═══
  {
    id: 'cul-001',
    fact: 'The Yoruba people have one of the highest rates of twin births in the world — about four times the global average.',
    category: 'culture',
    source: 'British Journal of Obstetrics and Gynaecology',
  },
  {
    id: 'cul-002',
    fact: 'Nollywood, Nigeria\'s film industry, produces more films annually than Hollywood, making it the second largest film industry in the world by volume after India\'s Bollywood.',
    category: 'culture',
    source: 'UNESCO Institute for Statistics — Feature Film Diversity',
  },
  {
    id: 'cul-003',
    fact: 'The Durbar festival in Kano and other northern cities features horsemen in medieval-style armour and has been celebrated for over 600 years.',
    category: 'culture',
    source: 'Kano State Tourism Board',
  },
  {
    id: 'cul-004',
    fact: 'Jollof rice, Nigeria\'s most celebrated dish, is the subject of a semi-serious culinary rivalry with Ghana that has its own dedicated social media hashtags and diplomatic exchanges.',
    category: 'culture',
    source: 'BBC News — The Jollof Wars',
  },
  {
    id: 'cul-005',
    fact: 'The Igbo apprenticeship system (Igba-boi) is one of the largest informal business training networks in the world, producing a disproportionate number of Nigeria\'s entrepreneurs.',
    category: 'culture',
    source: 'Harvard Business Review — The Igbo Apprenticeship Model',
  },
  {
    id: 'cul-006',
    fact: 'Adire, the Yoruba tradition of resist-dyed indigo cloth, uses techniques that predate European contact and are now studied by textile researchers worldwide.',
    category: 'culture',
    source: 'Smithsonian National Museum of African Art',
  },
  {
    id: 'cul-007',
    fact: 'The Benin Kingdom\'s brass-casting guilds were hereditary — the knowledge of bronze casting was passed from father to son for centuries, producing some of the most technically perfect metal sculptures in human history.',
    category: 'culture',
    source: 'Metropolitan Museum of Art — Art of Benin',
    sourceUrl: 'https://www.metmuseum.org/toah/hd/beni/hd_beni.htm',
  },
  {
    id: 'cul-008',
    fact: 'Fela Kuti invented Afrobeat in Lagos in the 1970s, fusing Yoruba music, jazz, highlife, and funk into a genre that now influences pop music globally.',
    category: 'culture',
    source: 'Fela: This Bitch of a Life — Carlos Moore',
    yearRelevant: '1970s',
  },
  {
    id: 'cul-009',
    fact: 'The Argungu Fishing Festival in Kebbi State features thousands of men jumping into the Sokoto River simultaneously to catch the biggest fish with their bare hands and gourds.',
    category: 'culture',
    source: 'Kebbi State Cultural Heritage Board',
  },
  {
    id: 'cul-010',
    fact: 'Nigeria\'s pidgin English is so widespread that the BBC launched a dedicated Pidgin service in 2017, recognising it as a language spoken by an estimated 75 million people.',
    category: 'culture',
    source: 'BBC News — BBC Pidgin Launch',
    sourceUrl: 'https://www.bbc.com/pidgin',
    yearRelevant: '2017',
  },

  // ═══ LANGUAGE ═══
  {
    id: 'lang-001',
    fact: 'Yoruba is a tonal language with three tones (high, mid, low), meaning the same syllable can have completely different meanings depending on pitch.',
    category: 'language',
    source: 'Cambridge University Press — Yoruba Phonology',
  },
  {
    id: 'lang-002',
    fact: 'The word "wahala" (trouble/problem) from Nigerian pidgin has entered informal British English, particularly in London, through diaspora influence.',
    category: 'language',
    source: 'Oxford English Dictionary — New Words Updates',
  },
  {
    id: 'lang-003',
    fact: 'Hausa is spoken by approximately 80 million people across West Africa, making it the most widely spoken Chadic language and a lingua franca across the Sahel.',
    category: 'language',
    source: 'Ethnologue — Hausa Language Profile',
    sourceUrl: 'https://www.ethnologue.com/language/hau',
  },
  {
    id: 'lang-004',
    fact: 'The Efik people of Cross River State developed Nsibidi, a system of symbols used for communication that predates European contact and may represent one of the oldest writing systems in West Africa.',
    category: 'language',
    source: 'P.A. Talbot — In the Shadow of the Bush (1912)',
    yearRelevant: 'pre-colonial',
  },
  {
    id: 'lang-005',
    fact: 'Nigeria has produced two winners of the Scripps National Spelling Bee in the United States, both of Nigerian descent.',
    category: 'language',
    source: 'Scripps National Spelling Bee Archives',
  },

  // ═══ SCIENCE & NATURE ═══
  {
    id: 'sci-001',
    fact: 'Nigeria is one of only two countries in the world where you can find both forest elephants and savanna elephants in the wild (the other is Cameroon).',
    category: 'science',
    source: 'IUCN African Elephant Status Report',
  },
  {
    id: 'sci-002',
    fact: 'Philip Emeagwali, a Nigerian computer scientist, won the 1989 Gordon Bell Prize for using 65,536 processors to perform 3.1 billion calculations per second — a breakthrough in parallel computing.',
    category: 'science',
    source: 'IEEE Gordon Bell Prize Archives',
    yearRelevant: '1989',
  },
  {
    id: 'nat-001',
    fact: 'The drill monkey, one of Africa\'s most endangered primates, is found in the wild only in southeastern Nigeria and neighbouring Cameroon.',
    category: 'nature',
    source: 'IUCN Red List — Mandrillus leucophaeus',
    sourceUrl: 'https://www.iucnredlist.org/species/12754/4379512',
  },
  {
    id: 'sci-003',
    fact: 'Nigerian-born Jelani Nelson became one of the youngest tenured professors at Harvard, specialising in algorithms and data structures.',
    category: 'science',
    source: 'Harvard School of Engineering and Applied Sciences',
  },
  {
    id: 'nat-002',
    fact: 'The Osun-Osogbo Sacred Grove in Osun State is a UNESCO World Heritage Site and one of the last remaining patches of primary high forest in southern Nigeria.',
    category: 'nature',
    source: 'UNESCO World Heritage Centre',
    sourceUrl: 'https://whc.unesco.org/en/list/1118',
  },

  // ═══ PEOPLE ═══
  {
    id: 'ppl-001',
    fact: 'Wole Soyinka became the first African to win the Nobel Prize in Literature in 1986.',
    category: 'people',
    source: 'The Nobel Prize — Wole Soyinka',
    sourceUrl: 'https://www.nobelprize.org/prizes/literature/1986/soyinka/biographical/',
    yearRelevant: '1986',
  },
  {
    id: 'ppl-002',
    fact: 'Ngozi Okonjo-Iweala became the first African and first woman to lead the World Trade Organization in 2021.',
    category: 'people',
    source: 'World Trade Organization — Director-General',
    sourceUrl: 'https://www.wto.org/english/thewto_e/dg_e/dg_e.htm',
    yearRelevant: '2021',
  },
  {
    id: 'ppl-003',
    fact: 'Chinua Achebe\'s "Things Fall Apart" (1958) has been translated into more than 50 languages and has sold over 20 million copies, making it the most widely read African novel ever written.',
    category: 'people',
    source: 'Penguin Random House — Things Fall Apart',
    yearRelevant: '1958',
  },
  {
    id: 'ppl-004',
    fact: 'Hakeem Olajuwon, born in Lagos, is considered one of the greatest basketball players in NBA history and won two consecutive championships with the Houston Rockets (1994-1995).',
    category: 'people',
    source: 'NBA — Hakeem Olajuwon Career Stats',
    sourceUrl: 'https://www.nba.com/stats/player/165/career',
    yearRelevant: '1994-1995',
  },
  {
    id: 'ppl-005',
    fact: 'Amina J. Mohammed, from Gombe State, served as Deputy Secretary-General of the United Nations from 2017 to 2025.',
    category: 'people',
    source: 'United Nations — Deputy Secretary-General',
    sourceUrl: 'https://www.un.org/sg/en/content/profiles/amina-j-mohammed',
    yearRelevant: '2017-2025',
  },

  // ═══ ECONOMY ═══
  {
    id: 'econ-001',
    fact: 'Nigeria\'s GDP is the largest in Africa, overtaking South Africa in 2014 after a statistical rebasing revealed the economy was nearly twice as large as previously estimated.',
    category: 'economy',
    source: 'World Bank — Nigeria GDP Rebasing',
    yearRelevant: '2014',
  },
  {
    id: 'econ-002',
    fact: 'Lagos has more people than 32 individual African countries — its metropolitan population exceeds 20 million.',
    category: 'economy',
    source: 'United Nations World Urbanization Prospects',
    sourceUrl: 'https://population.un.org/wup/',
  },
  {
    id: 'econ-003',
    fact: 'The Nigerian diaspora sends home approximately $20 billion in remittances annually, making Nigeria the largest recipient of remittances in sub-Saharan Africa.',
    category: 'economy',
    source: 'World Bank — Migration and Remittances Data',
  },
  {
    id: 'econ-004',
    fact: 'Nigeria produces approximately 2 million barrels of crude oil per day, making it the largest oil producer in Africa and a member of OPEC since 1971.',
    category: 'economy',
    source: 'OPEC — Nigeria Country Profile',
    sourceUrl: 'https://www.opec.org/opec_web/en/about_us/167.htm',
    yearRelevant: '1971',
  },
  {
    id: 'econ-005',
    fact: 'The informal economy accounts for an estimated 65% of Nigeria\'s GDP, with markets like Lagos\'s Alaba International Market generating billions of naira in daily transactions.',
    category: 'economy',
    source: 'International Monetary Fund — Nigeria Article IV Consultation',
  },
];

export const factCategories: FactCategory[] = [
  'history',
  'geography',
  'culture',
  'language',
  'science',
  'nature',
  'people',
  'economy',
];
