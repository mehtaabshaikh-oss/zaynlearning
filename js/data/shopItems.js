/**
 * Avatar Cosmetics, Minifig Parts, Minecraft Armor & Meme Flairs
 */

const SHOP_ITEMS = [
  // Heads / Helmets
  {
    id: "head_default",
    name: "Classic Gamer Hair",
    category: "heads",
    icon: "👦",
    price: 0,
    owned: true,
    svgType: "hair_brown"
  },
  {
    id: "head_diamond",
    name: "Diamond Helmet",
    category: "heads",
    icon: "⛑️",
    price: 45,
    owned: false,
    svgType: "helmet_diamond"
  },
  {
    id: "head_lego_cap",
    name: "Red Lego Snapback",
    category: "heads",
    icon: "🧢",
    price: 30,
    owned: false,
    svgType: "cap_red"
  },
  {
    id: "head_crown",
    name: "1% Club Grandmaster Crown",
    category: "heads",
    icon: "👑",
    price: 150,
    owned: false,
    svgType: "crown_gold"
  },
  {
    id: "head_creeper",
    name: "Creeper Mask",
    category: "heads",
    icon: "🟩",
    price: 60,
    owned: false,
    svgType: "mask_creeper"
  },

  // Outfits / Armor
  {
    id: "outfit_default",
    name: "Speedway Hoodie",
    category: "outfits",
    icon: "👕",
    price: 0,
    owned: true,
    color: "#3b82f6"
  },
  {
    id: "outfit_diamond_chest",
    name: "Netherite Armor Plate",
    category: "outfits",
    icon: "🦺",
    price: 75,
    owned: false,
    color: "#374151"
  },
  {
    id: "outfit_lego_suit",
    name: "Lego Master Builder Suit",
    category: "outfits",
    icon: "🥋",
    price: 50,
    owned: false,
    color: "#e3000b"
  },
  {
    id: "outfit_tuxedo",
    name: "Gigachad Sigma Suit",
    category: "outfits",
    icon: "🤵",
    price: 120,
    owned: false,
    color: "#0f172a"
  },

  // Memes & Flair
  {
    id: "flair_shades",
    name: "Pixel Thug Life Shades",
    category: "accessories",
    icon: "🕶️",
    price: 40,
    owned: false,
    auraBonus: "+50 Aura on streaks"
  },
  {
    id: "flair_mewing_jaw",
    name: "Sigma Jawline Glow",
    category: "accessories",
    icon: "🗿",
    price: 80,
    owned: false,
    auraBonus: "+100 Aura"
  },
  {
    id: "flair_diamond_sword",
    name: "Sharpness V Diamond Sword",
    category: "accessories",
    icon: "🗡️",
    price: 95,
    owned: false,
    auraBonus: "+1.2x Boss Damage"
  },
  {
    id: "flair_golden_apple",
    name: "Enchanted Golden Apple",
    category: "accessories",
    icon: "🍎",
    price: 70,
    owned: false,
    auraBonus: "Free Streak Shield"
  },

  // Pets & Companions
  {
    id: "pet_pixel_bot",
    name: "Pixel The Math Robot",
    category: "pets",
    icon: "🤖",
    price: 0,
    owned: true
  },
  {
    id: "pet_capybara",
    name: "Capybara With Shades",
    category: "pets",
    icon: "🦫",
    price: 100,
    owned: false
  },
  {
    id: "pet_tamed_wolf",
    name: "Minecraft Tamed Wolf",
    category: "pets",
    icon: "🐺",
    price: 85,
    owned: false
  },
  {
    id: "pet_phoenix",
    name: "Phonk Neon Phoenix",
    category: "pets",
    icon: "🦅",
    price: 200,
    owned: false
  }
];
