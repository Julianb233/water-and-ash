export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: 'Sea Burial Guide' | 'Grief & Healing' | 'Ocean Conservation' | 'Company News';
  imageUrl: string;
  author: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'what-to-expect-sea-burial-ceremony',
    title: 'What to Expect During a Sea Burial Ceremony',
    excerpt:
      'A complete guide to understanding the sea burial process, from preparation to the ceremony itself. Learn how families find peace through this meaningful tribute.',
    content: `
A sea burial is one of the most profound ways to honor a loved one. For many families, the ocean holds deep significance — a place of peace, adventure, and timeless beauty. If you're considering a sea burial in San Diego, here's what you can expect.

## Before the Ceremony

Our team will guide you through every detail. You'll choose your preferred vessel, select a date, and discuss any personal touches you'd like to include — readings, music, flowers, or other meaningful elements.

We handle all EPA documentation and permitting, so you can focus entirely on honoring your loved one.

## The Day Of

On the day of the ceremony, your party will board at our private dock in San Diego Harbor. Our experienced captain will navigate to the designated scattering site, typically 3-5 nautical miles offshore.

The journey itself is part of the experience. Watching the coastline recede and the open Pacific stretch before you creates a natural transition — a moment to breathe, reflect, and prepare.

## The Ceremony

Once at the scattering site, the captain will bring the vessel to a gentle stop. The ceremony can be as formal or informal as you wish. Many families share memories, read poems, or simply stand together in quiet reflection.

The actual scattering is handled with the utmost care and dignity. Biodegradable flowers are often placed on the water as a final tribute.

## After the Ceremony

Following the ceremony, you'll receive official EPA documentation including the exact GPS coordinates of the scattering site. Many families find comfort in knowing the precise location, returning by boat on anniversaries or simply looking out at the ocean knowing where their loved one rests.

## Why Families Choose Sea Burial

Sea burial offers something unique — a sense of return to nature, of vastness and peace. There are no maintenance fees, no fixed plots to visit. Instead, the entire Pacific Ocean becomes a memorial, present in every sunset, every wave, every sea breeze.

If you're considering a sea burial for your loved one, we're here to answer any questions. Reach out to our compassionate team at any time.
    `.trim(),
    date: '2025-12-15',
    category: 'Sea Burial Guide',
    imageUrl:
      'https://images.unsplash.com/photo-1534278931827-8a259344abe7?w=800&h=600&fit=crop&q=80',
    author: 'Water & Ash Team',
  },
  {
    slug: 'healing-power-of-ocean-memorials',
    title: 'The Healing Power of Ocean Memorials',
    excerpt:
      'How ocean ceremonies help families process grief and find peace. The therapeutic connection between water, memory, and healing.',
    content: `
Grief is one of the most universal human experiences, yet it feels deeply personal every time. In our years of serving San Diego families, we've witnessed how ocean memorials provide a unique form of healing that traditional services sometimes cannot.

## Water and Healing

There's a reason humans have always been drawn to water. Research in environmental psychology confirms what we instinctively know — being near the ocean reduces stress, promotes calm, and creates space for emotional processing.

Dr. Wallace J. Nichols, in his book *Blue Mind*, describes the meditative state that water induces. For grieving families, this natural calm creates an environment where emotions can flow freely and healing can begin.

## The Gift of Ritual

A sea burial ceremony creates a powerful ritual of letting go. The physical act of releasing ashes to the water provides something that many families tell us they needed — a tangible moment of farewell that feels complete and meaningful.

Unlike a graveside service where the casket is lowered behind a curtain, a sea burial allows families to witness the full return to nature. There's a raw honesty to it that many find deeply comforting.

## Continuing Connection

One of the most beautiful aspects of an ocean memorial is how the connection continues long after the ceremony. The ocean doesn't close at 5 PM. It's there every day — in the sound of waves, in a sunset drive along the coast, in the salt air on a morning walk.

Many of our families tell us they feel closest to their loved one during quiet moments near the water. The ocean becomes a living memorial, always present and always accessible.

## Finding Your Path

Grief doesn't follow a schedule, and neither should the decision to hold a memorial. Whether you're planning ahead or processing a recent loss, we encourage you to take your time. Our team is here whenever you're ready, with no pressure and no rush.

If you'd like to learn more about how an ocean memorial might bring peace to your family, we welcome your call.
    `.trim(),
    date: '2025-11-28',
    category: 'Grief & Healing',
    imageUrl:
      'https://images.unsplash.com/photo-1476673160081-cf065607f449?w=800&h=600&fit=crop&q=80',
    author: 'Water & Ash Team',
  },
  {
    slug: 'protecting-san-diego-marine-environment',
    title: 'Protecting San Diego\'s Marine Environment',
    excerpt:
      'How we ensure every sea burial is environmentally responsible. Our commitment to ocean conservation and EPA compliance.',
    content: `
At Water & Ash, our work takes place in one of the most beautiful marine environments on Earth. San Diego's coastal waters are home to dolphins, sea lions, gray whales, and countless marine species. We take our responsibility to protect this ecosystem seriously.

## EPA Compliance

Every sea burial we conduct is fully compliant with EPA regulations under the Marine Protection, Research, and Sanctuaries Act (MPRSA). This means:

- **Location requirements**: All scatterings take place at least 3 nautical miles from shore in water depths of at least 600 feet
- **Material restrictions**: Only biodegradable materials are used — no plastics, no metals, no synthetic flowers
- **Documentation**: We file all required EPA notifications and provide families with official documentation

## Biodegradable Practices

We've carefully selected every element of our ceremonies to be ocean-friendly:

- **Biodegradable urns** that dissolve within hours
- **Fresh flower petals** instead of synthetic alternatives
- **Natural wreaths** made from sustainable materials
- **Water-soluble ceremony elements** that leave no trace

## Supporting Local Conservation

Beyond compliance, we actively support San Diego's marine conservation efforts. A portion of every service goes toward local ocean conservation organizations working to protect our coastal waters.

We believe that honoring loved ones and honoring the ocean are not separate goals — they're deeply connected. When families choose a sea burial, they're choosing a memorial that gives back to nature rather than taking from it.

## A Natural Return

There's something poetically fitting about returning to the ocean. Life on Earth began in the sea, and a sea burial completes that circle in the most natural way possible. No concrete vaults, no embalming chemicals, no land permanently removed from the ecosystem.

It's a choice that honors both the person you've lost and the planet they loved.

For more information about our environmental practices, please don't hesitate to reach out.
    `.trim(),
    date: '2025-10-20',
    category: 'Ocean Conservation',
    imageUrl:
      'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&h=600&fit=crop&q=80',
    author: 'Water & Ash Team',
  },
  {
    slug: 'introducing-the-relentless-catamaran',
    title: 'Welcome Aboard the Relentless: Our Newest Vessel',
    excerpt:
      'We\'re excited to introduce the Relentless, a 45-foot Bali Catamaran joining our fleet. More space, more stability, more comfort for your memorial.',
    content: `
We're proud to announce the newest addition to the Water & Ash fleet — the **Relentless**, a stunning 45-foot Bali Catamaran.

## Why a Catamaran?

Families have been asking for a vessel option with more deck space and greater stability, especially for guests who may be less comfortable on the open water. A catamaran's twin-hull design provides significantly less rocking motion than a traditional monohull, making the journey more comfortable for everyone aboard.

## Features of the Relentless

The Relentless offers:

- **Spacious deck area** with comfortable seating for up to 15 guests
- **Exceptional stability** thanks to the catamaran design
- **Covered salon** for shade and comfort
- **Open stern platform** ideal for the scattering ceremony
- **Climate-controlled cabin** for year-round comfort

## The Same Dignified Service

While the vessel is new, our commitment to compassionate, dignified service remains unchanged. Every ceremony aboard the Relentless includes the same careful preparation, professional crew, and attention to detail that families expect from Water & Ash.

## Book Your Ceremony

The Relentless is available now for memorial services at the same $2,000 all-inclusive rate as our other vessels. Whether you're planning ahead or need assistance now, our team is ready to help you choose the right vessel for your family's needs.

Contact us to learn more or to schedule a dock visit to see the Relentless in person.
    `.trim(),
    date: '2025-09-05',
    category: 'Company News',
    imageUrl:
      'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&h=600&fit=crop&q=80',
    author: 'Water & Ash Team',
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getAllSlugs(): string[] {
  return blogPosts.map((post) => post.slug);
}

export const categories = [
  'Sea Burial Guide',
  'Grief & Healing',
  'Ocean Conservation',
  'Company News',
] as const;
