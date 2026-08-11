import {
  ADDRESS,
  DEPOSIT_TOTAL,
  PHASE,
  PRICING,
  PROJECT,
  SALES_CENTRE,
} from "@/lib/project";

/**
 * Editorial content for /blog.
 *
 * Posts are stored as structured blocks rather than MDX so that no extra build
 * dependency is needed and every post renders through one audited component.
 *
 * Same sourcing rule as lib/project.ts: any claim about Aura traces back to
 * Caivan's own material in the builder kit. General explanation — how interim
 * occupancy works, what a stacked town is — is written plainly and generically,
 * and is never dressed up as a promise about this specific purchase.
 */

export type PostBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "note"; text: string };

export type Post = {
  slug: string;
  title: string;
  /** Used for <meta description>, the card on /blog, and the Article schema. */
  description: string;
  /** ISO date. Drives sitemap lastModified and the Article datePublished. */
  published: string;
  readMinutes: number;
  tag: string;
  body: PostBlock[];
};

export const POSTS: Post[] = [
  {
    slug: "final-release-explained",
    title: `What the Final Release at ${PROJECT.name} Actually Includes`,
    description: `The last release at Aura is ${PHASE.homeCount} homes across ${PHASE.blocks.toLowerCase()}, from ${PRICING.fromDisplay}. What is in it, what comes standard, and what to confirm before you sign.`,
    published: "2026-07-28",
    readMinutes: 6,
    tag: "The Project",
    body: [
      {
        type: "p",
        text: `Aura is a community of ${PROJECT.homeType.toLowerCase()} by ${PROJECT.developer}, built inside the ${PROJECT.masterPlan} master plan on the ${ADDRESS.city} waterfront. The final release is ${PHASE.homeCount} homes across ${PHASE.blocks.toLowerCase()}, fronting Aerodrome Avenue and backing onto Ogden Park. After it, there is no further builder inventory at Aura.`,
      },
      { type: "h2", text: "What you are actually buying" },
      {
        type: "p",
        text: `Seven floor plans, from ${PRICING.sqftMin} to ${PRICING.sqftMax} sq. ft., split between Main Residences and Upper Residences. Main Residences run 789 to 973 sq. ft. and enter at grade with finished space on the lower level. Upper Residences run 957 to 1,138 sq. ft. and are two-storey homes above, reached by their own stair from their own door at ground level.`,
      },
      {
        type: "p",
        text: `Bedrooms are ${PRICING.bedsMin} or ${PRICING.bedsMax} and bathrooms run ${PRICING.bathsMin} to ${PRICING.bathsMax}, depending on the plan and on which designer choices you select. One underground parking space is included in the purchase price rather than sold separately, which is unusual on this stretch of waterfront.`,
      },
      { type: "h2", text: "The numbers that decide it" },
      {
        type: "ul",
        items: [
          `Deposit: ${DEPOSIT_TOTAL} in total — $10,000 at signing, $7,500 at each of 30, 60, 90, 150, 210 and 330 days, and $10,000 at occupancy.`,
          "Maintenance: $199.99 per month for the home, plus $64.95 per month for the parking space.",
          `First tentative closing: ${PRICING.occupancy}.`,
          "Conditional period: 10 days from signing.",
          "HST rebate: eligible homebuyers can receive up to $90,000 off, subject to their own circumstances.",
        ],
      },
      { type: "h2", text: "What comes standard" },
      {
        type: "p",
        text: "Schedule C runs to roughly a hundred line items and forms part of the agreement. The headline inclusions are 2cm granite counters, wide plank laminate flooring, approximately 8' to 10' ceilings on the main floor, ENERGY STAR rated windows, an ERV for continuous fresh air, and a connection to the Lakeview Village District Energy system for heating, cooling, and hot water.",
      },
      {
        type: "p",
        text: "Read the rental line carefully. The fan coil heating and cooling unit, the smart thermostat, and the ERV are rental items, which is standard for a district energy building but is a monthly cost on top of the maintenance fee. Ask for the rental rates in writing before you sign.",
      },
      { type: "h2", text: "What to confirm before you sign" },
      {
        type: "ul",
        items: [
          "The closing date written into your agreement. The published window is tentative; the agreement governs.",
          "Which lot and which model — pricing is set per lot, and premiums apply to some.",
          "The rental rates for the fan coil, thermostat, and ERV.",
          "Your eligibility for the HST rebate, with your own lawyer or accountant.",
          "That your mortgage pre-approval is from a Schedule A bank, which is what Caivan accepts.",
        ],
      },
      {
        type: "note",
        text: `Prices, figures, and specifications are preliminary, are set by ${PROJECT.developer}, and are subject to change without notice. Register for the current price list rather than relying on figures published on any third-party page, including this one.`,
      },
    ],
  },

  {
    slug: "stacked-towns-main-vs-upper-residence",
    title: "Stacked Towns Explained: Main Residence vs. Upper Residence",
    description:
      "Aura Towns are stacked townhomes with ground level entry. What that means in practice, how a Main Residence differs from an Upper Residence, and which one suits how you actually live.",
    published: "2026-07-14",
    readMinutes: 6,
    tag: "Buying Guide",
    body: [
      {
        type: "p",
        text: "The single most useful thing to understand about Aura is its product type. Caivan's own FAQ answers the question directly: yes, Aura Towns are stacked towns, with ground level entry. Schedule C of the agreement calls them stacked townhomes.",
      },
      {
        type: "p",
        text: "That is a real and specific thing, and it sits between the two products most buyers are comparing. It is not a traditional freehold townhouse where you own the whole structure front to back. It is also not a condo suite off an interior corridor. Every home has its own door to the outside at grade.",
      },
      { type: "h2", text: "The Main Residence" },
      {
        type: "p",
        text: "A Main Residence occupies the lower portion of the block. You enter at grade through a poured concrete porch, with living, dining, and kitchen on the entry level, and bedrooms on the level below. Square footages include that finished lower level, which is why a 789 sq. ft. Echo lives differently than 789 sq. ft. spread across one flat plane.",
      },
      {
        type: "p",
        text: "The four Main Residences are The Echo (789 sq. ft.), The Echo End (815), The Prism End (961), and The Lux Corner (973). The larger two come with three bedrooms as standard and can trade the third bedroom for a den and powder room, or for a dining room.",
      },
      { type: "h2", text: "The Upper Residence" },
      {
        type: "p",
        text: "An Upper Residence sits above the Main and is a two-storey home in its own right. It has its own entry at ground level and its own stair up — no shared corridor, no elevator, no lobby. The trade is a stair climb in exchange for being above grade on both levels, with a private balcony.",
      },
      {
        type: "p",
        text: "The three Upper Residences are The Halo (957 sq. ft.), The Halo End (977), and The Nova Corner (1,138) — the largest home at Aura, with corner exposure and the same dining room and den options as the Lux Corner.",
      },
      { type: "h2", text: "How to choose between them" },
      {
        type: "ul",
        items: [
          "Prefer a Main Residence if you want the shortest path from car to kitchen, or if stairs on the way in are a factor now or later.",
          "Prefer an Upper Residence if you want more square footage, more light on both levels, and do not mind the entry stair.",
          "End and corner models buy you extra glazing on a second exposure — the most durable upgrade available here, because you cannot add windows later.",
          "If you want three bedrooms, only the Prism End, Lux Corner, and Nova Corner offer them.",
          "Sound attenuation between main and upper units is a specified part of the floor design in Schedule C — worth asking about at the sales centre if it matters to you.",
        ],
      },
      { type: "h2", text: "What stacked towns are and are not" },
      {
        type: "p",
        text: "You get your own front door, no elevator dependency, and generally lower common element costs than an amenity-heavy tower, because there is far less shared building to fund. What you do not get is a freehold house: this is a condominium form of ownership with a monthly maintenance fee, currently $199.99 for the home plus $64.95 for parking.",
      },
      {
        type: "note",
        text: "General information about the product type, not advice about a specific purchase. Review the agreement of purchase and sale and the disclosure statement with your own lawyer.",
      },
    ],
  },

  {
    slug: "lakeview-village-master-plan-guide",
    title: `A Guide to ${PROJECT.masterPlan}, Mississauga's 177-Acre Waterfront Plan`,
    description:
      "Lakeview Village is a 177-acre master-planned waterfront community on the Lake Ontario shoreline: homes, parks, trails, a revitalized pier, beaches, and an innovation district. How the pieces fit together.",
    published: "2026-06-30",
    readMinutes: 6,
    tag: "The Community",
    body: [
      {
        type: "p",
        text: `${PROJECT.masterPlan} occupies 177 acres of Lake Ontario shoreline in the ${ADDRESS.neighbourhood} neighbourhood of ${ADDRESS.city} — former industrial land, now the largest waterfront redevelopment on this stretch of the lake.`,
      },
      {
        type: "p",
        text: "Caivan describes it as a sustainable mixed-use community offering homes, parks, trails, public art and culture, shops, restaurants, a revitalized long pier, beaches and recreation, plus an innovation district. The mix is the point: a district with employment and public space in it behaves differently from one that is only housing.",
      },
      { type: "h2", text: "The waterfront and the parks" },
      {
        type: "p",
        text: "Parks, trails, and open space are planned through the community, connecting into Mississauga's existing waterfront park system. Aura's final release sits directly against Ogden Park, and the lake itself is a two-minute walk from the homes.",
      },
      {
        type: "p",
        text: "The signature public work is a revitalized long pier planned as a year-round destination. Treat it the way you would treat any planned public work — as something with its own approvals and its own timeline, independent of when any individual home closes.",
      },
      { type: "h2", text: "The innovation district" },
      {
        type: "p",
        text: "An innovation district is planned within the community, intended to create jobs and support what Caivan calls vibrant lakeside urban living. For a resident, employment land inside the plan is the difference between a neighbourhood that empties at 9am and one with daytime activity of its own.",
      },
      { type: "h2", text: "How the district is built" },
      {
        type: "ul",
        items: [
          "A community-wide district energy system supplying hydronic heating, chilled water, and domestic hot water — the homes connect to it rather than running independent equipment.",
          "Homes specified with ENERGY STAR rated windows and ERV ventilation as standard.",
          "Street and block patterns organised around walking and waterfront access.",
          "Public art and cultural programming planned alongside the residential and employment lands.",
        ],
      },
      { type: "h2", text: "Where Aura sits inside it" },
      {
        type: "p",
        text: `Aura is the low-rise piece: ${PHASE.homeCount} stacked towns in the final release, against Ogden Park, in a plan otherwise weighted toward higher density. Low-rise supply inside a master plan is fixed by the plan — it is the argument for buying this product here, rather than an argument for buying anything here.`,
      },
      {
        type: "note",
        text: "Master plan features are planned by the developer and the City and remain subject to approvals and change. Nothing here commits any amenity to any date.",
      },
    ],
  },

  {
    slug: "lakeview-location-and-getting-around",
    title: "Living in Lakeview: What Is Actually Within Reach",
    description:
      "Aura sits on Lakeshore Rd. E between Cawthra and Dixie, two minutes' walk from the water. A look at the transit, highways, shops, parks, and schools around it.",
    published: "2026-06-16",
    readMinutes: 5,
    tag: "Location",
    body: [
      {
        type: "p",
        text: `${ADDRESS.neighbourhood} sits at the eastern edge of ${ADDRESS.city}, against the Toronto border. That position is the whole argument for the location: you are on the Mississauga side of the line for pricing, and on the Toronto side of it for access.`,
      },
      { type: "h2", text: "The two-minute walk" },
      {
        type: "p",
        text: "Caivan's own quick facts sheet leads with it, and it is the number that matters most here: the Lake Ontario waterfront is a two-minute walk from Aura. Not a drive, not a partial view from a balcony. That is a materially different relationship with the water than most waterfront-branded projects offer.",
      },
      { type: "h2", text: "Transit and highways" },
      {
        type: "p",
        text: "Caivan lists quick access to GO Transit, the QEW, and Highway 427. The brochure's neighbourhood map plots Long Branch, Dixie, Mimico, Cooksville, and Port Credit stations around the community — Lakeshore West is one of the more frequent corridors in the GO network, which matters more than raw travel time, because a fast train you wait forty minutes for is a slow commute.",
      },
      {
        type: "p",
        text: "The 427 link is the one people underrate. It connects to the 401, the 407, and the airport employment lands, which makes a west-end or airport-area workplace reachable without touching the Gardiner.",
      },
      { type: "h2", text: "What is around it" },
      {
        type: "ul",
        items: [
          "Shopping: Dixie Outlet Mall, CF Sherway Gardens, Square One, Longo's, Metro, Costco, IKEA.",
          "Parks and waterfront: Jim Tovey Conservation Area, Lakefront Promenade Park, Marie Curtis West Beach, Colonel Samuel Smith Park, Lakeview Park.",
          "Dining: Snug Harbour, Stonehooker Brewing Company, Cactus Club, Colossus Greek Taverna, Posta Italbar Cucina.",
          "Health and fitness: Mississauga Hospital, One Health Clubs, F45 Training, Fitness By The Lake.",
          "Schools: Lakeview Park PS, Janet I. McDougald PS, Allan A. Martin PS, Cawthra Park SS, Queen of Heaven, Port Credit SS, Toronto French School (West Campus).",
        ],
      },
      { type: "h2", text: "The part that changes later" },
      {
        type: "p",
        text: "The master plan's innovation district is intended to bring employment into the community itself. Commuting analysis assumes you leave; the more interesting long-term case for this location is the share of residents who eventually will not have to.",
      },
      {
        type: "note",
        text: `Amenities are drawn from Caivan's own neighbourhood map. Drive and transit times vary with traffic, weather, and schedule — verify your own commute before you rely on it. The ${SALES_CENTRE.name} is at ${SALES_CENTRE.address}.`,
      },
    ],
  },

  {
    slug: "deposit-structure-and-carrying-costs",
    title: `What ${DEPOSIT_TOTAL} in Deposits and $199.99 a Month Actually Buy`,
    description:
      "The deposit schedule, the maintenance fee, the rentals, the HST rebate, and the 10-day conditional period — the real cash flow of buying pre-construction at Aura.",
    published: "2026-06-02",
    readMinutes: 6,
    tag: "Buying Guide",
    body: [
      {
        type: "p",
        text: "Most pre-construction marketing talks about the purchase price and stops. The purchase price is the one number your lender handles for you. The numbers that decide whether a purchase is comfortable are the deposit schedule and the monthly carrying cost, and both are published for Aura.",
      },
      { type: "h2", text: "The deposit schedule" },
      {
        type: "p",
        text: `${DEPOSIT_TOTAL} in total, staged across eight payments: $10,000 at signing, then $7,500 at each of 30, 60, 90, 150, 210, and 330 days, and a final $10,000 at occupancy.`,
      },
      {
        type: "p",
        text: "Two practical notes. The first deposit must be a bank draft, payable to Bennett Jones LLP, In Trust — not a personal cheque. And the post-dated cheques for the remaining deposits are due at the sales centre within 10 days of signing, so they need to be written while the ink is still wet on the agreement.",
      },
      {
        type: "p",
        text: "Structurally, this is a gentler schedule than the 20%-before-occupancy pattern common in GTA high-rise. Roughly $55,000 is spread over the first eleven months, with the balance deferred to occupancy.",
      },
      { type: "h2", text: "The monthly cost" },
      {
        type: "ul",
        items: [
          "Maintenance fee: $199.99 per month for the home.",
          "Parking maintenance: $64.95 per month for the included underground space.",
          "Rentals: the fan coil heating and cooling unit, the smart thermostat, and the ERV are rental items under Schedule C. Ask for the rates in writing.",
          "Property taxes, insurance, and utilities are separate and begin as applicable.",
        ],
      },
      {
        type: "p",
        text: "A maintenance fee near $200 reflects what a stacked town actually has to fund — landscaping, common elements, shared infrastructure — rather than elevators, corridors, a concierge, and an amenity floor. That is the structural reason the number is what it is.",
      },
      { type: "h2", text: "The HST rebate" },
      {
        type: "p",
        text: "Caivan's material states that eligible homebuyers can receive up to $90,000 off through the HST rebate. Eligibility turns on how you intend to use the home — broadly, whether it is your primary residence or a rental — and the mechanics differ between the two. It is worth an hour with your accountant before you sign, not after.",
      },
      { type: "h2", text: "The 10 days that matter most" },
      {
        type: "p",
        text: "There is a 10-day conditional period from signing. Use it. That is the window to have a lawyer read the agreement, confirm the closing date actually written into it, check the rental terms, and confirm your mortgage pre-approval is from a Schedule A bank, which is what Caivan accepts. Caivan also runs an RBC blanket appraisal program worth asking a sales consultant about.",
      },
      {
        type: "note",
        text: "General information, not legal, tax, or financial advice. Deposit terms, fees, and rebates vary by agreement and by individual circumstances — confirm the terms in your own agreement of purchase and sale.",
      },
    ],
  },
];

export function getPost(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}

/** Newest first — the order used on /blog and in the related-posts strip. */
export const POSTS_BY_DATE: Post[] = [...POSTS].sort((a, b) =>
  b.published.localeCompare(a.published),
);
