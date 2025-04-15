import { ProjectImages } from "../../assets/ProjectImages";

export interface Blog {
  id: number;
  title: string;
  date: string;
  image: string;
  shortDescription: string;
  content: string[];
  category: string;
  tag: string;
}

export const blogs: Blog[] = [
  {
    id: 1,
    title: 'Trekking the Trails of Patagonia',
    date: 'Sep 26, 2025',
    image: ProjectImages.DESTINATION_BANNER, // Swap for Patagonia image if available
    shortDescription:
      'Patagonia’s rugged trails offer breathtaking views and thrilling adventures. From glaciers to peaks, discover why this region is a hiker’s paradise.',
    content: [
      'Patagonia, spanning Chile and Argentina, is a dream for adventure seekers. Its trails, like the W Trek in Torres del Paine, weave through turquoise lakes, glaciers, and granite spires. The park’s unpredictable weather adds a thrill—pack layers and sturdy boots.',
      'Beyond hiking, spot guanacos and condors, or kayak near icebergs. Refugios (mountain huts) provide cozy rest stops with hearty meals. For a lighter trek, try Laguna Azul’s scenic loop. Patagonia’s raw beauty demands respect—stick to marked paths to preserve its wilderness.',
      'This destination suits those craving nature’s untamed side. A week here feels like a lifetime of stories.',
    ],
    category: 'Adventure',
    tag: 'Hiking',
  },
  {
    id: 2,
    title: 'Uncovering Marrakech’s Cultural Souks',
    date: 'Oct 5, 2025',
    image: ProjectImages.TOURPAGE_BANNER, // Swap for souk image if available
    shortDescription:
      'Marrakech’s vibrant souks pulse with history and color. Dive into Morocco’s cultural heart for spices, crafts, and timeless tales.',
    content: [
      'Marrakech, Morocco, is a sensory overload. Its souks, narrow alleys in the medina, brim with leather bags, lanterns, and saffron piles. Jemaa el-Fnaa square buzzes with snake charmers and storytellers at dusk. Bargaining is an art here—smile, sip mint tea, and haggle politely.',
      'Beyond shopping, visit the Bahia Palace for intricate tilework or the Saadian Tombs for royal history. Locals are warm but firm—respect their pace. A guided tour helps navigate the maze without getting lost. Try a tagine cooking class for a taste of tradition.',
      'Marrakech blends chaos and charm, perfect for culture lovers. Two days feel like a whirlwind of discovery.',
    ],
    category: 'Culture',
    tag: 'History',
  },
  {
    id: 3,
    title: 'Serenity Over Santorini’s Caldera',
    date: 'Oct 12, 2025',
    image: ProjectImages.DESTINATION_BANNER, // Swap for Santorini image if available
    shortDescription:
      'Santorini’s whitewashed cliffs and blue domes frame stunning sunsets. Explore Greece’s volcanic gem for peace and beauty.',
    content: [
      'Santorini, Greece, is a postcard come alive. Its caldera, formed by a volcanic eruption, cradles villages like Oia and Fira. Stroll cobblestone paths for jaw-dropping views, especially at sunset when crowds hush. The island’s black-sand beaches, like Perissa, add raw contrast.',
      'Skip overpriced restaurants—local tavernas serve fresh calamari and fava beans. Rent a scooter to explore Akrotiri’s ancient ruins or sail to hot springs. Summer’s busy, so book early or visit in fall for quieter vibes. Santorini’s magic lies in its serene, timeless feel.',
      'Ideal for couples or solo travelers, a few days here recharge the soul. Bring a camera—you’ll need it.',
    ],
    category: 'Nature',
    tag: 'Scenic',
  },
  {
    id: 4,
    title: 'Savoring Street Food in Bangkok',
    date: 'Oct 20, 2025',
    image: ProjectImages.TOURPAGE_BANNER, // Swap for food stall image if available
    shortDescription:
      'Bangkok’s street food is a flavor explosion. From spicy som tam to sweet mango sticky rice, taste Thailand’s soul.',
    content: [
      'Bangkok’s streets are a foodie’s playground. At Yaowarat (Chinatown), stalls dish out crispy duck and peppery crab. Sukhumvit Soi 38 offers som tam (papaya salad) that bites back—ask for mild if you’re spice-shy. Don’t skip mango sticky rice; it’s pure joy.',
      'Vendors cook fresh, but check for busy stalls to avoid tummy troubles. Pair meals with iced Thai tea. For a break, visit Chatuchak Market to snack while browsing. Night markets blend food and vibe—go hungry. A street food tour maximizes variety in one evening.',
      'Bangkok’s flavors are bold yet balanced, perfect for culinary explorers. You’ll leave craving more.',
    ],
    category: 'Food',
    tag: 'Cuisine',
  },
];