export type Book = {
  slug: string;
  title: string;
  cover: string;
  pdf: string;
  description: string;
  folder: string;
  pages: number;
  category: string;
};

export const books: Book[] = [
  {
    slug: "adam-and-the-cloud-city",
    title: "Adam and the Cloud City",
    cover: "/covers/Adam_and_the_Cloud_City.webp",
    pdf: "/books/Adam_and_the_Cloud_City.pdf",
    description:  "Join Adam on an unforgettable journey through a magical city floating above the clouds. Filled with mystery, friendship, and exciting discoveries, this adventure inspires imagination and courage.",
    folder: "adam-and-the-cloud-city",
    pages: 15,
    category: "Story",
  },

  {
    slug: "farm-animals",
    title: "Farm Animals",
    cover: "/covers/farm animals.webp",
    pdf: "/books/farm animals.pdf",
    description:"Discover the wonderful world of farm animals through colorful illustrations and engaging storytelling. A perfect introduction for young readers to learn about life on the farm.",
    folder: "farm-animals",
    pages: 15,
    category: "Animals",
  },

  {
  slug: "maxs-forest-adventure",
  title: "Max's Forest Adventure",
  cover: "/covers/Max_s_Forest_Adventure.png",
  pdf: "/books/Max_s_Forest_Adventure.pdf",
  description:
    "Follow Max as he explores a mysterious forest filled with hidden paths, friendly creatures, and exciting challenges that test his bravery and curiosity.",
  folder: "maxs-forest-adventure",
  pages: 15,
  category: "Story",
},

  {
    slug: "princess-best-friend",
    title: "Princess Best Friend",
    cover: "/covers/princess-best-friend.webp",
    pdf: "/books/princess-best-friend.pdf",
    description:  "A heartwarming story about friendship, kindness, and magical adventures as a young princess discovers the true meaning of being a loyal and caring friend.",
    folder: "princess-best-friend",
    pages: 15,
    category: "Story",
  },

  {
    slug: "sami-and-the-tower-giant",
    title: "Sami and the Tower Giant",
    cover: "/covers/Sami_and_the_Tower_Giant.png",
    pdf: "/books/Sami_and_the_Tower_Giant.pdf",
    description: "Sami's ordinary day turns into an extraordinary adventure when he encounters the legendary Tower Giant and uncovers secrets hidden high above the clouds.",
    folder: "sami-and-the-tower-giant",
    pages: 15,
    category: "Story",
  },

  {
    slug: "the-clockwork-cloud-tower",
    title: "The Clockwork Cloud Tower",
    cover: "/covers/The_Clockwork_Cloud_Tower.png",
    pdf: "/books/The_Clockwork_Cloud_Tower.pdf",
    description: "An enchanting tale of gears, mysteries, and flying machines set inside a magical tower where every clock hides a new secret waiting to be discovered.",
    folder: "the-clockwork-cloud-tower",
    pages: 15,
    category: "Story",
  },

  {
    slug: "the-clockwork-sky",
    title: "The Clockwork Sky",
    cover: "/covers/The_Clockwork_Sky.png",
    pdf: "/books/The_Clockwork_Sky.pdf",
    description: "Soar through a breathtaking world above the clouds where imagination, adventure, and unexpected discoveries await at every turn.",
    folder: "the-clockwork-sky",
    pages: 15,
    category: "Story",
  },

  {
    slug: "the-skyward-scroll",
    title: "The Skyward Scroll",
    cover: "/covers/The_Skyward_Scroll.png",
    pdf: "/books/The_Skyward_Scroll.pdf",
    description: "A magical scroll reveals ancient secrets and leads its discoverers on an unforgettable quest filled with puzzles, surprises, and wonder.",
    folder: "the-skyward-scroll",
    pages: 15,
    category: "Story",
  },

  {
    slug: "the-slow-adventure",
    title: "The Slow Adventure",
    cover: "/covers/The_Slow_Adventure.png",
    pdf: "/books/The_Slow_Adventure.pdf",
    description:  "A gentle adventure that teaches patience, perseverance, and the joy of discovering the world one step at a time through meaningful experiences.",
    folder: "the-slow-adventure",
    pages: 15,
    category: "Story",
  },

  {
    slug: "yassers-golden-lantern",
    title: "Yasser's Golden Lantern",
    cover: "/covers/yasser-golden-lantern.webp",
    pdf: "/books/Yasser_s_Golden_Lantern.pdf",
    description: "Join Yasser as he follows the mysterious light of a golden lantern that guides him toward hidden treasures, magical places, and unforgettable adventures.",
    folder: "yassers-golden-lantern",
    pages: 15,
    category: "Story",
  },

  {
    slug: "animals-plants-activiter",
    title: "Animals Plants Activity Book",
    cover: "/covers/animals-plants-activiter.jpg",
    pdf: "/books/animals plants activiter.pdf",
    description: "A fun educational activity book packed with puzzles, games, coloring exercises, and engaging activities that help children learn about animals and plants.",
    folder: "animals-plants-activiter",
    pages: 15,
    category: "Activity",
  },
{
  slug: "solar-system",
  title: "Solar System",
  cover: "/covers/solar-system.png",
  pdf: "/books/Solar_System.pdf",
  description:
    "Antique Astronomical Compendium is a beautifully illustrated reference book that explores the wonders of the universe through vintage-style scientific artwork. Featuring planets, moons, asteroids, galaxies, and celestial phenomena, it combines classic astronomical knowledge with elegant antique illustrations, making it an inspiring resource for space enthusiasts, students, and collectors alike.",
  folder: "solar-system",
  pages: 15,
  category: "Education",
},
{
 slug: "botanical-chronicles",
  title: "Botanical Chronicles",
  cover: "/covers/Botanical_Chronicles.png",
  pdf: "/books/Botanical_Chronicles.pdf",
  description:
    "A beautifully illustrated botanical book exploring plants, flowers, trees, and the fascinating diversity of the natural world.",
  folder: "botanical-chronicles",
  pages: 15,
  category: "Education",
},

{
   slug: "botanical-compendium",
  title: "Botanical Compendium",
  cover: "/covers/Botanical_Compendium.png",
  pdf: "/books/Botanical_Compendium a.pdf",
  description:
    "An educational collection of botanical knowledge featuring detailed illustrations and information about remarkable plant species.",
  folder: "botanical-compendium",
  pages: 15,
  category: "Education",
},

{
  slug: "botanical-ledger",
  title: "Botanical Ledger",
  cover: "/covers/Botanical_Ledger.png",
  pdf: "/books/Botanical_Ledger.pdf",
  description:
    "A vintage-style botanical reference book filled with artistic illustrations and fascinating insights into plant life.",
  folder: "botanical-ledger",
  pages: 15,
  category: "Education",
},

{
  slug: "green-and-blue",
  title: "Green and Blue Coloring Book",
  cover: "/covers/green-and-blue.png",
  pdf: "/books/green-and-blue.pdf",
  description:
    "A creative coloring book designed for children, featuring playful illustrations that encourage imagination and artistic expression.",
  folder: "green-and-blue",
  pages: 15,
  category: "Coloring",
},

{
  slug: "forest-animals",
  title: "Forest Animals",
  cover: "/covers/forest-animals.png",
  pdf: "/books/forest-animals.pdf",
  description:
    "A fun coloring adventure featuring bears, foxes, deer, owls, and many other forest animals waiting to be brought to life with color.",
  folder: "forest-animals",
  pages: 15,
  category: "Activity",
},

{
  slug: "dracos-inner-fire",
  title: "Draco's Inner Fire",
  cover: "/covers/Draco_s_Inner_Fire.png",
  pdf: "/books/Draco_s_Inner_Fire.pdf",
  description:
    "An inspiring fantasy story following Draco as he discovers courage, wisdom, and the power hidden deep within himself.",
  folder: "dracos-inner-fire",
  pages: 15,
  category: "Story",
},

{
  slug: "the-anatomical-ledger-ab",
  title: "The Anatomical Ledger AB",
  cover: "/covers/The_Anatomical_Ledger_ab.png",
  pdf: "/books/The_Anatomical_Ledger_ab.pdf",
  description:
    "A detailed educational volume featuring anatomical illustrations and scientific observations presented in a classic vintage style.",
  folder: "the-anatomical-ledger-ab",
  pages: 15,
  category: "Education",
},

{
  slug: "the-cosmographers-ledger",
  title: "The Cosmographer's Ledger",
  cover: "/covers/The_Cosmographer_s_Ledger.png",
  pdf: "/books/The_Cosmographer_s_Ledger.pdf",
  description:
    "A fascinating journey through maps, stars, celestial observations, and the wonders of the universe in an antique scientific style.",
  folder: "the-cosmographers-ledger",
  pages: 15,
  category: "Education",
},

{
  slug: "the-anatomical-ledger",
  title: "The Anatomical Ledger",
  cover: "/covers/The_Anatomical_Ledger.png",
  pdf: "/books/The_Anatomical_Ledger.pdf",
  description:
    "An educational anatomy book showcasing beautifully illustrated scientific drawings and detailed descriptions of the human body.",
  folder: "the-anatomical-ledger",
  pages: 15,
  category: "Education",
},

{
  slug: "the-superbee-and-the-great-wizard",
  title: "The Superbee and the Great Wizard",
  cover: "/covers/The_Superbee_and_the_Great_Wizard.png",
  pdf: "/books/The_Superbee_and_the_Great_Wizard.pdf",
  description:
    "A magical children's adventure where Superbee embarks on an exciting quest alongside the Great Wizard to save the day.",
  folder: "the-superbee-and-the-great-wizard",
  pages: 15,
  category: "Story",
},
{
  slug: "the-anatomical-ledger-z",
  title: "The Anatomical Ledger Z",
  cover: "/covers/The_Anatomical_Ledger_z.png",
  pdf: "/books/The_Anatomical_Ledger_z.pdf",
  description:
    "A detailed educational anatomy book featuring vintage-style scientific illustrations and fascinating insights into the structure of the human body. Perfect for students, science enthusiasts, and readers interested in classical anatomical studies.",
  folder: "the-anatomical-ledger-z",
  pages: 15,
  category: "Education",
},

];