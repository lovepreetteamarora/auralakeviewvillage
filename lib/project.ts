/**
 * Single source of truth for every factual claim on the site.
 *
 * Both the visible copy and the JSON-LD structured data read from here, so a
 * price or address can never drift between what a user sees and what Google
 * parses — a mismatch there is treated as a trust signal problem.
 *
 * PROVENANCE: unless marked otherwise, every figure below is taken from
 * Caivan's own material in "Mississauga - Aura - Lakeview Village/":
 *   - Aura-Final-Release-Quick-Facts.pdf  (location, sizes, beds, baths)
 *   - FAQ - Aura.pdf                      (closing, fees, HST, conditional period)
 *   - Deposit Structure - Aura Towns.pdf  (deposits, sales centre)
 *   - Included Features - Aura Towns.pdf  (Schedule C standard specifications)
 *   - Floorplans/*.pdf                    (per-model square footage)
 *   - Site Plan - Aura Towns.pdf          (88 units, blocks 13–15, Ogden Park)
 *
 * Fields still marked `@verify` are OURS to fill, not the builder's — they
 * cannot be sourced from the kit and must be set before launch.
 */

export const SITE_URL = "https://www.auralakeviewvillage.org";

/** @verify — placeholder brokerage contact. Replace before launch. */
export const CONTACT = {
  phone: "+1-416-910-8923",
  phoneDisplay: "(416) 910-8923",
  /** @verify — inbox is still a placeholder; the phone number is confirmed. */
  email: "info@auralakeviewvillage.org",
  brokerage: "Team Arora Realty",
} as const;

/** Caivan's own sales channel, printed on the builder's material. */
export const SALES_CENTRE = {
  name: "Aura Sales Gallery",
  address: "985 Jim Tovey Boulevard, Mississauga, ON L5E 1E8",
  phoneDisplay: "289.949.3929",
  /** Source: the footer of Site Plan - Aura Towns.pdf (E. & O.E. August 2026). */
  hours: [
    { days: "Monday – Thursday", time: "12:00 PM – 7:00 PM" },
    { days: "Friday", time: "Closed" },
    { days: "Saturday – Sunday", time: "12:00 PM – 5:00 PM" },
  ],
} as const;


export const PROJECT = {
  name: "Aura at Lakeview Village",
  shortName: "Aura",
  alternateNames: ["Aura Towns", "Aura Lakeview Village", "Aura by Caivan"],
  developer: "Caivan Communities",
  /** Printed as the exclusive listing brokerage on all Caivan material. */
  listingBrokerage: "RARE Real Estate",
  masterPlan: "Lakeview Village",
  /** Caivan's own product description — stacked, with ground level entry. */
  homeType: "2-Storey Urban Towns",
  productNote: "Stacked townhomes with ground level entry",
  status: "Final Release — Now Selling",
} as const;

/**
 * The community fronts Lakeshore Rd. E between Cawthra and Dixie; the site plan
 * puts the release itself on Aerodrome Avenue backing onto Ogden Park.
 *
 * `street` is the project's civic address, confirmed directly by the brokerage.
 * It is NOT in the Caivan kit — the kit gives only the corridor ("Lakeshore Rd.
 * E, between Cawthra Rd. and Dixie Rd.") and the sales gallery on Jim Tovey
 * Blvd — so it is the one location fact here sourced from us rather than from
 * the builder. The sales gallery stays separate in SALES_CENTRE; they are two
 * different places and must not be conflated.
 */
export const ADDRESS = {
  street: "800 Hydro Road",
  crossStreets: "Lakeshore Rd. E & Dixie Rd.",
  locationNote: "Lakeshore Rd. E, between Cawthra Rd. and Dixie Rd.",
  city: "Mississauga",
  region: "ON",
  regionName: "Ontario",
  /** @verify — pairs with 800 Hydro Rd on third-party listings, unconfirmed by Caivan. */
  postalCode: "L5E 1H3",
  country: "CA",
  lat: 43.5747,
  lng: -79.5486,
  neighbourhood: "Lakeview",
} as const;

export const PRICING = {
  /** Caivan publishes a "from high $500s" band, not an exact figure. */
  fromDisplay: "the high $500s",
  fromShort: "the high $500s",
  /** Lower bound of the published band — used only for AggregateOffer. */
  from: 500000,
  currency: "CAD",
  sqftMin: 789,
  sqftMax: 1138,
  bedsMin: 2,
  bedsMax: 3,
  bathsMin: 1.5,
  bathsMax: 2.5,
  occupancy: "December 2027 – March 2028",
  occupancyShort: "Dec 2027 – Mar 2028",
  parking: "Underground parking included",
} as const;

export const PHASE = {
  label: "Final Release",
  /** Counted from the site plan: 44 Main + 44 Upper across blocks 13–15. */
  homeCount: 88,
  /** Each address stacks one Main over one Upper, which is why 44 → 88. */
  mainResidences: 44,
  upperResidences: 44,
  blocks: "Blocks 13, 14 & 15",
  communityTotalHomes: "800+",
} as const;

/**
 * Purchase terms, all from the builder's FAQ and deposit sheet. These replaced
 * an earlier list of promotional incentives that could not be corroborated
 * anywhere in the builder kit — see README.
 */
export const DEPOSIT_SCHEDULE = [
  { when: "At time of signing", amount: "$10,000" },
  { when: "30 days", amount: "$7,500" },
  { when: "60 days", amount: "$7,500" },
  { when: "90 days", amount: "$7,500" },
  { when: "150 days", amount: "$7,500" },
  { when: "210 days", amount: "$7,500" },
  { when: "330 days", amount: "$7,500" },
  { when: "At occupancy", amount: "$10,000" },
] as const;

export const DEPOSIT_TOTAL = "$65,000";

export const PURCHASE_FACTS = [
  {
    title: "HST Rebate Eligible",
    detail: "Eligible homebuyers can receive up to $90,000 off through the HST rebate.",
  },
  {
    title: `${DEPOSIT_TOTAL} Total Deposit`,
    detail: "Spread across eight instalments from signing through to occupancy.",
  },
  {
    title: "10-Day Conditional Period",
    detail: "A full statutory cooling-off period from the date you sign.",
  },
  {
    title: "Underground Parking Included",
    detail: "One parking space in the underground garage is included with the home.",
  },
  {
    title: "Maintenance $199.99/mo",
    detail: "Unit fee $199.99 per month, plus $64.95 per month for parking.",
  },
  {
    title: "Non-Residents Eligible",
    detail: "Purchase is open to non-residents holding a 183-day work permit.",
  },
  {
    title: "Corporate Purchases Allowed",
    detail: "The purchaser must be on the agreement and can direct title on closing.",
  },
  {
    title: "Tarion-Backed Warranty",
    detail: "Caivan warranty backed by Tarion, Ontario's new home warranty programme.",
  },
] as const;

/** Schedule C highlights — the specification points buyers actually ask about. */
export const INCLUDED_FEATURES = [
  {
    title: "Kitchen",
    items: [
      "2cm granite countertops from the vendor's standard samples",
      "Undermount stainless steel sink with pull-down spray faucet",
      "Ceramic backsplash and colour-coordinated kick plates",
      "Over-the-range microwave vented to exterior",
    ],
  },
  {
    title: "Interior Finishes",
    items: [
      "Wide plank laminate flooring throughout the main living areas",
      "13\"x13\" ceramic tile in bathrooms, foyer and laundry",
      "Approximately 8'–10' ceilings on the main floor",
      "Contemporary oak handrails with closed stringers",
    ],
  },
  {
    title: "Energy & Comfort",
    items: [
      "Connected to the Lakeview Village District Energy system",
      "ERV (Energy Recovery Ventilator) for continuous fresh air",
      "Low-e Argon ENERGY STAR rated windows",
      "Smart thermostat and Decora style switches throughout",
    ],
  },
  {
    title: "Construction",
    items: [
      "Architectural laminated shingles with limited lifetime warranty",
      "Sound attenuation floor design between main and upper units",
      "Engineered floor joist system to minimise squeaks and deflection",
      "100 Amp service with circuit breaker panel",
    ],
  },
] as const;

export const TRANSIT = [
  { place: "Lake Ontario waterfront", time: "2 min", mode: "Walk" },
  { place: "Long Branch GO Station", time: "4 min", mode: "Drive" },
  { place: "QEW / Highway 427", time: "5 min", mode: "Drive" },
  { place: "TTC Long Branch Loop", time: "5 min", mode: "Drive" },
  { place: "Sherway Gardens", time: "9 min", mode: "Drive" },
  { place: "Trillium Health — Queensway", time: "9 min", mode: "Drive" },
  { place: "Toronto Pearson Airport", time: "15 min", mode: "Drive" },
  { place: "Downtown Toronto", time: "20 min", mode: "Drive" },
] as const;

/** Schools listed on the brochure's neighbourhood map. */
export const SCHOOLS = [
  "Janet I. McDougald Public School",
  "Allan A. Martin Public School",
  "Cawthra Park Secondary School",
  "Queen of Heaven Elementary School",
  "Lakeview Park Public School",
  "Toronto French School (West Campus)",
] as const;

export const MASTER_PLAN_STATS = [
  { value: "177", label: "Master-planned acres" },
  { value: "88", label: "Homes in the final release" },
  { value: "2 min", label: "Walk to the waterfront" },
  { value: "789+", label: "Square feet" },
] as const;

export const COMMUNITY_FEATURES = [
  {
    title: "Parks & Trails",
    body: "The final release backs directly onto Ogden Park, with shoreline trails and open space connecting through the wider Lakeview Village park system.",
  },
  {
    title: "The Revitalized Pier",
    body: "Lakeview Village's plan includes a revitalized long pier, beaches, and recreation along the community's Lake Ontario frontage.",
  },
  {
    title: "Shops & Restaurants",
    body: "Retail, offices, and restaurants are built into the master plan rather than driven to — part of everyday life inside the community.",
  },
  {
    title: "Public Art & Culture",
    body: "The master plan programmes public art and culture alongside its residential and employment lands.",
  },
  {
    title: "Innovation District",
    body: "An innovation district within the plan is intended to create jobs and support vibrant lakeside urban living.",
  },
  {
    title: "District Energy",
    body: "Homes connect to the Lakeview Village District Energy system for hydronic heating, chilled water, and domestic hot water.",
  },
] as const;

export const BUYER_PERSONAS = [
  {
    title: "First-Time Buyers",
    body: "A 10-day conditional period, a staged $65,000 deposit, and an HST rebate worth up to $90,000 make this one of the more approachable entry points into new construction on the Mississauga waterfront.",
  },
  {
    title: "Investors",
    body: "A finite release of 88 homes inside a 177-acre master plan, with a maintenance fee of $199.99 per month and a documented occupancy window, gives a clear basis for underwriting rather than guesswork.",
  },
  {
    title: "Downsizers",
    body: "Ground level entry, 789 to 1,138 sq. ft. of well-planned space, and a two-minute walk to the waterfront — with the exterior maintenance handled for you.",
  },
  {
    title: "Young Families",
    body: "Up to 3 bedrooms and 2.5 baths, direct frontage onto Ogden Park, and six schools within the surrounding neighbourhood.",
  },
  {
    title: "Professionals",
    body: "Four minutes to Long Branch GO, five to the QEW and Highway 427, fifteen to Pearson — and an innovation district planned inside the community itself.",
  },
] as const;

export const REASONS = [
  {
    title: "Two Minutes to the Water",
    body: "A two-minute walk to the Lake Ontario waterfront — the shortest distance to the lake of any new townhome release in the community.",
  },
  {
    title: "Lowest Waterfront Entry",
    body: "Caivan positions Aura as the lowest priced entry point in the GTA for townhome living at the waterfront.",
  },
  {
    title: "Ground Level Entry",
    body: "Aura Towns are stacked townhomes with ground level entry — your own door at grade rather than a corridor and an elevator.",
  },
  {
    title: "177-Acre Master Plan",
    body: "Part of Lakeview Village: homes, parks, trails, public art, shops, restaurants, beaches, and an innovation district.",
  },
  {
    title: "Backing Onto Ogden Park",
    body: "The final release sits on Aerodrome Avenue with frontage onto Ogden Park and its open space.",
  },
  {
    title: "Seven Distinct Layouts",
    body: "Main and Upper Residences from 789 to 1,138 sq. ft., several with optional dens, dining rooms, or an added bathroom.",
  },
  {
    title: "Included Underground Parking",
    body: "One underground parking space comes with the home rather than being priced as an extra.",
  },
  {
    title: "Sustainable by Design",
    body: "Connected to the Lakeview Village District Energy system, with ENERGY STAR rated windows and ERV ventilation as standard.",
  },
  {
    title: "Award-Winning Builder",
    body: "Caivan is an industry-leading builder known for craftsmanship, design, and setting the standard for included features.",
  },
  {
    title: "The Last Release",
    body: `${PHASE.homeCount} homes across ${PHASE.blocks.toLowerCase()}. This is the final opportunity to buy at Aura from the builder.`,
  },
] as const;

export const FAQS = [
  {
    q: "What is Aura at Lakeview Village?",
    a: `Aura is a community of ${PROJECT.homeType.toLowerCase()} by ${PROJECT.developer}, located within the ${PROJECT.masterPlan} master-planned waterfront community in ${ADDRESS.city}, Ontario. Homes range from ${PRICING.sqftMin} to ${PRICING.sqftMax} sq. ft. with ${PRICING.bedsMin} to ${PRICING.bedsMax} bedrooms and ${PRICING.bathsMin} to ${PRICING.bathsMax} bathrooms.`,
  },
  {
    q: "Are Aura Towns stacked townhomes?",
    a: "Yes — Aura Towns are stacked townhomes with ground level entry. The community is made up of Main Residences, which occupy the lower two levels and enter at grade, and Upper Residences above them, which also have their own entry at ground level.",
  },
  {
    q: "Where exactly is Aura located?",
    a: `Aura is at ${ADDRESS.street}, ${ADDRESS.city}, ${ADDRESS.regionName} — on Lakeshore Rd. E between Cawthra Rd. and Dixie Rd., inside the ${PROJECT.masterPlan} community. The final release sits on Aerodrome Avenue backing onto Ogden Park, and Lake Ontario's shoreline is a two-minute walk away. Note that the ${SALES_CENTRE.name} is at a separate address, ${SALES_CENTRE.address}.`,
  },
  {
    q: "What is the starting price at Aura?",
    a: `Caivan publishes the final release as starting from ${PRICING.fromDisplay}. Exact pricing is set per lot and per model and changes between releases — register and the current price list is sent to you directly.`,
  },
  {
    q: "How many homes are in the final release?",
    a: `The final release is ${PHASE.homeCount} homes across ${PHASE.blocks.toLowerCase()}, split evenly between Main Residences and Upper Residences. After this release there is no further builder inventory at Aura.`,
  },
  {
    q: "How big are the homes and how many bedrooms do they have?",
    a: `Homes range from ${PRICING.sqftMin} to ${PRICING.sqftMax} sq. ft. Main Residences run 789 to 973 sq. ft. and Upper Residences run 957 to 1,138 sq. ft., with 2 or 3 bedrooms and 1.5 to 2.5 bathrooms depending on the model and the options selected.`,
  },
  {
    q: "When is the first tentative closing?",
    a: `Caivan lists the first tentative closing as ${PRICING.occupancy}. Closing dates are set by the builder and are subject to change — the binding date is the one written into your agreement of purchase and sale.`,
  },
  {
    q: "What is the deposit structure?",
    a: `${DEPOSIT_TOTAL} in total: $10,000 at signing, $7,500 at each of 30, 60, 90, 150, 210 and 330 days, and $10,000 at occupancy. The initial deposit must be paid by bank draft, payable to Bennett Jones LLP, In Trust.`,
  },
  {
    q: "What are the maintenance fees?",
    a: "The unit maintenance fee is $199.99 per month, plus $64.95 per month for the parking space. Note that the fan coil heating and cooling unit, the ERV, and the smart thermostat are rentals, which is standard for this district energy configuration.",
  },
  {
    q: "Is there a conditional period?",
    a: "Yes — a 10-day conditional period applies from the date you sign, which is the statutory cooling-off period for new home purchases in Ontario. Use it to have your lawyer review the agreement.",
  },
  {
    q: "Does Aura qualify for the HST rebate?",
    a: "Yes. Caivan's material states that eligible homebuyers can receive up to $90,000 off through the HST rebate. Eligibility depends on your own circumstances — confirm with your lawyer or accountant before you rely on it.",
  },
  {
    q: "Can non-residents or corporations purchase?",
    a: "Non-residents can purchase provided they hold a 183-day work permit. Corporate purchases are permitted as well — the purchaser must be named on the agreement and can direct title on closing.",
  },
  {
    q: "Is a mortgage pre-approval required?",
    a: "Yes. Purchasers need to provide a satisfactory mortgage pre-approval, and the mortgage approval or financial letter is due within 30 days of purchase. Caivan accepts Schedule A banks and runs an RBC blanket appraisal program — ask a sales consultant about it.",
  },
  {
    q: "Is parking included at Aura?",
    a: "Yes. One parking space in the underground garage is included with the home; the location within the garage is determined by the vendor. The parking maintenance fee is $64.95 per month.",
  },
  {
    q: "Who is the builder?",
    a: `${PROJECT.developer} — an industry-leading builder that constantly re-imagines what is possible in new homes and aims to set the standard for included features and home performance. Every home is covered by the Caivan warranty backed by Tarion.`,
  },
  {
    q: "How do I get the Aura floor plans and price list?",
    a: "Register on this page. Registration unlocks all seven floor plan packages for immediate download, and the current price list, deposit structure, and feature list are sent to you directly. It is free and carries no obligation.",
  },
];

/**
 * Third-party brokerage sites for a builder's project have to say so plainly.
 * This text is rendered in the footer of every page and is deliberately not
 * buried behind a link.
 */
export const DISCLAIMER = `${CONTACT.brokerage} is an independent real estate brokerage. This website is a marketing resource operated by ${CONTACT.brokerage} and is not the official website of ${PROJECT.developer}, ${PROJECT.masterPlan}, or ${PROJECT.listingBrokerage}, the exclusive listing brokerage, nor is it endorsed by them. Prices, figures, incentives, sizes, specifications, and closing dates are preliminary, are set by the builder, and are subject to change without notice. All areas and stated room dimensions are approximate; floor area is measured in accordance with Tarion Bulletin #22 and actual living area will vary from the areas stated. Renderings and illustrations are artist's concepts. E. & O.E. Not intended to solicit buyers or sellers currently under contract with another brokerage.`;

export const NAV = [
  { href: "/#overview", label: "Overview" },
  { href: "/#gallery", label: "Gallery" },
  // Points at the dedicated section, not the homepage anchor: the per-model
  // pages need internal links from every page on the site to get crawled.
  { href: "/floor-plans", label: "Floor Plans" },
  { href: "/#purchase", label: "Purchase" },
  { href: "/#location", label: "Location" },
  { href: "/#faq", label: "FAQ" },
  { href: "/blog", label: "Insights" },
] as const;

export const GALLERY = [
  {
    src: "/renderings/lakefront-ogden-park.jpg",
    alt: "Aura townhomes overlooking Ogden Park with the Lake Ontario shoreline beyond",
    caption: "Ogden Park and the lakefront",
  },
  {
    src: "/renderings/courtyard-patio.jpg",
    alt: "Landscaped interior courtyard at Aura at dusk with seating and mature planting",
    caption: "The interior courtyard",
  },
  {
    src: "/renderings/community-courtyard.jpg",
    alt: "Residents dining under a pergola in the shared courtyard between Aura town blocks",
    caption: "Shared outdoor rooms",
  },
  {
    src: "/renderings/kitchen.jpg",
    alt: "Aura kitchen with deep green cabinetry, stone counters, and a walkout to a private balcony",
    caption: "Kitchen, Main Residence",
  },
  {
    src: "/renderings/living-upper-residence.jpg",
    alt: "Open living and dining area in an Aura Upper Residence",
    caption: "Living, Upper Residence",
  },
  {
    src: "/renderings/primary-bedroom-upper.jpg",
    alt: "Primary bedroom in an Aura Upper Residence with large windows",
    caption: "Primary bedroom, Upper",
  },
  {
    src: "/renderings/ensuite.jpg",
    alt: "Ensuite bathroom at Aura with tiled shower enclosure and vanity",
    caption: "Ensuite",
  },
  {
    src: "/renderings/streetscape-waterway.jpg",
    alt: "Streetscape at Aura along the waterway common",
    caption: "The waterway common",
  },
] as const;

/**
 * Named places around the community.
 *
 * Source: the amenity key map on pages 5–7 of Caivan-Aura-Brochure.pdf, which
 * plots roughly 75 numbered locations. Competing sites describe the
 * neighbourhood in adjectives ("parks, trails and amenities at your door") but
 * name almost nothing, so this is both the most useful block on the page for a
 * buyer and the one with the least competition for local search.
 *
 * Schools are deliberately not repeated here — they render from SCHOOLS in
 * their own block in the location section.
 *
 * Distances are intentionally absent. The brochure plots these places; it does
 * not publish travel times to them, and inventing them is exactly how these
 * pages go wrong.
 */
/**
 * NOTE: currently NOT rendered. The neighbourhood map graphic covers the same
 * ground visually and the duplicate list made the location section overlong, so
 * the list was pulled. Kept here because it is the only crawlable, indexable
 * form of these ~36 place names — if the location section ever needs text for
 * local search, this is it, ready to drop back in.
 */
export const NEARBY = [
  {
    group: "Shopping & Groceries",
    places: [
      "Dixie Outlet Mall",
      "CF Sherway Gardens",
      "Square One Shopping Centre",
      "Longo's",
      "Metro",
      "Farm Boy",
      "Rabba Fine Foods",
      "Walmart Supercentre",
      "Costco Wholesale",
      "IKEA",
      "The Home Depot",
      "Canadian Tire",
    ],
  },
  {
    group: "Parks, Beaches & Recreation",
    places: [
      "Jim Tovey Lakeview Conservation Area",
      "Lakefront Promenade Park",
      "Marie Curtis West Beach",
      "Colonel Samuel Smith Park",
      "Lakeview Park",
      "Douglas Kennedy Park",
      "A. E. Crookes Park",
      "St. Lawrence Park",
      "Lakeview Golf Course",
      "Toronto Golf Club",
      "Mississauga Golf & Country Club",
      "Lakeview Library",
    ],
  },
  {
    group: "Dining & Drinking",
    places: [
      "Snug Harbour",
      "Stonehooker Brewing Company",
      "Colossus Greek Taverna",
      "Posta Italbar Cucina",
      "Cactus Club Cafe",
      "Joey Sherway",
      "Soranno's",
      "The Crooked Cue",
      "Papa Giuseppe's",
      "Coffee Culture Cafe & Eatery",
      "Wingporium",
      "Starbucks",
    ],
  },
  {
    group: "Health & Fitness",
    places: [
      "Mississauga Hospital",
      "One Health Clubs",
      "F45 Training",
      "Corefit",
      "Fitness By The Lake",
      "Auria Pilates",
    ],
  },
] as const;

/**
 * The builder block.
 *
 * Every competing site has one; ours did not. Confined to what the kit says:
 * the FAQ's own description of Caivan, the Quick Facts line about craftsmanship,
 * and the Tarion warranty in Schedule C.
 *
 * NOT included, because no document in the kit supports them: the ABIC robotic
 * manufacturing claim, the "10,000-point inspection", the "Caivan 360" promise,
 * "OpenPlan" layouts, and the Sasaki / Q4 Architects credits. Competing pages
 * assert all of these. Add them only against Caivan's corporate material.
 */
export const BUILDER = {
  name: PROJECT.developer,
  summary:
    "Industry-leading builders who constantly re-imagine what is possible in new homes, and aim to set the standard for included features and home performance.",
  points: [
    {
      title: "Award-Winning",
      body: "Caivan is an award-winning builder known for its craftsmanship and design.",
    },
    {
      title: "Tarion-Backed Warranty",
      body: "Every home is covered by the Caivan warranty, backed by Tarion, Ontario's new home warranty programme.",
    },
    {
      title: "Specified, Not Improvised",
      body: "Schedule C sets out the standard specifications in detail — finishes, ceiling heights, envelope, and mechanical systems — and forms part of the agreement of purchase and sale.",
    },
    {
      title: "Built to the District",
      body: `Homes connect to the ${PROJECT.masterPlan} District Energy system for hydronic heating, chilled water, and domestic hot water, with ENERGY STAR rated windows and ERV ventilation as standard.`,
    },
  ],
  url: "https://www.caivan.com",
} as const;

/**
 * The investment case.
 *
 * Deliberately built only from documented facts — supply, entry price,
 * deposit staging, eligibility, carrying cost. No appreciation forecast, no
 * projected rent, no "X% growth" claim. Competing pages compare the district to
 * Coal Harbour and Lakeshore East; that is a story, not a number, and a
 * brokerage putting it in writing owns it.
 */
export const INVESTMENT_CASE = [
  {
    title: "Supply is fixed at 88",
    body: `This is the final release. ${PHASE.homeCount} homes across ${PHASE.blocks.toLowerCase()}, and no further builder inventory at Aura afterwards. Low-rise supply inside a master plan is capped by the plan itself.`,
  },
  {
    title: "The lowest waterfront entry",
    body: `Caivan positions Aura as the lowest priced entry point in the GTA for townhome living at the waterfront, from ${PRICING.fromDisplay}, with underground parking included rather than priced separately.`,
  },
  {
    title: "Capital is staged, not front-loaded",
    body: `${DEPOSIT_TOTAL} in total across eight instalments — roughly $55,000 spread over the first eleven months, with the balance deferred to occupancy.`,
  },
  {
    title: "Open to non-residents and corporations",
    body: "Non-residents holding a 183-day work permit can purchase, and corporate purchasers are accepted — the purchaser must be named on the agreement and can direct title on closing.",
  },
  {
    title: "A documented carrying cost",
    body: "$199.99 per month for the home plus $64.95 for parking, with the fan coil, thermostat, and ERV as rental items. Enough to underwrite with, rather than estimate.",
  },
  {
    title: "An employment district next door",
    body: `${PROJECT.masterPlan} plans an innovation district within the community itself, intended to create jobs and daytime activity alongside the housing.`,
  },
] as const;

/**
 * Third-party embeds. Kept here so the IDs sit in one place rather than buried
 * in JSX — a dead video or a moved pin becomes a one-line fix.
 *
 * The map pin is on the project's civic address, NOT the sales gallery. They
 * are two different places and sending a buyer to the wrong one is a real cost.
 */
export const MEDIA = {
  /** Vimeo ID from https://vimeo.com/1147349088 */
  vimeoId: "1147349088",
  videoTitle: `${PROJECT.name} — the community film`,
  mapEmbedSrc:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d19243.2798391026!2d-79.55305460726437!3d43.576817399448274!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b488429cc83ed%3A0xfaf567d16a262604!2s800%20Hydro%20Rd%2C%20Mississauga%2C%20ON%20L5E%201H3!5e0!3m2!1sen!2sca!4v1786429175985!5m2!1sen!2sca",
  /** Page 1 of Site Plan - Aura Towns.pdf, rasterised. Public, unlike the floor plans. */
  sitePlan: "/site-plan.jpg",
  /**
   * Caivan's neighbourhood map. Two versions of the same artwork: the map on
   * its own, and the map with its numbered legend.
   *
   * The plain map is what renders — the legend is unreadable at page width and
   * is text locked inside a picture, which no crawler can index. NEARBY carries
   * the same places as real markup, and the legend version is the click-through
   * for anyone who wants to match a pin to a number.
   *
   * Derived from Aura_lakeview_siteplan.png / siteplan.png; those originals are
   * ~3 MB of PNG and can be deleted from public/ once you are happy with these.
   */
  areaMap: "/area-map.jpg",
  areaMapLegend: "/area-map-legend.jpg",
} as const;
