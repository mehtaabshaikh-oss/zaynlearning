/**
 * AvatarBuilder - SVG Dynamic Character Renderer
 * Generates custom Lego / Minecraft / Meme cosmetics for Zayn.
 */

class AvatarBuilder {
  static renderAvatarSVG(equipped, size = 120) {
    const headId = equipped.heads || 'head_default';
    const outfitId = equipped.outfits || 'outfit_default';
    const accId = equipped.accessories || null;
    const petId = equipped.pets || null;

    // Body / Shirt Colors
    let shirtFill = "#3b82f6";
    if (outfitId === "outfit_diamond_chest") shirtFill = "#374151";
    if (outfitId === "outfit_lego_suit") shirtFill = "#e3000b";
    if (outfitId === "outfit_tuxedo") shirtFill = "#0f172a";

    // Head / Hair Layer
    let headDecoration = `
      <!-- Default Stylish Gamer Hair -->
      <path d="M 32 36 Q 60 10 88 36 Q 80 24 60 22 Q 40 24 32 36 Z" fill="#451a03" />
      <path d="M 32 36 L 36 48 L 42 38 Z" fill="#451a03" />
      <path d="M 88 36 L 84 48 L 78 38 Z" fill="#451a03" />
    `;

    if (headId === "head_diamond") {
      headDecoration = `
        <!-- Authentic Minecraft Diamond Helmet (Open face with cheek guards) -->
        <!-- Helmet Crown -->
        <path d="M 32 36 L 32 16 Q 60 10 88 16 L 88 36 L 80 36 L 80 22 L 40 22 L 40 36 Z" fill="#4dedf4" stroke="#0891b2" stroke-width="2.5" />
        <!-- Nose Bridge Guard -->
        <rect x="56" y="22" width="8" height="14" fill="#4dedf4" stroke="#0891b2" stroke-width="1.5" />
        <!-- Left & Right Cheek Flaps -->
        <rect x="32" y="34" width="8" height="24" rx="2" fill="#4dedf4" stroke="#0891b2" stroke-width="2" />
        <rect x="80" y="34" width="8" height="24" rx="2" fill="#4dedf4" stroke="#0891b2" stroke-width="2" />
        <!-- Diamond Shading Highlights -->
        <rect x="42" y="16" width="10" height="4" fill="#cffafe" />
        <rect x="34" y="36" width="4" height="12" fill="#cffafe" />
      `;
    } else if (headId === "head_lego_cap") {
      headDecoration = `
        <!-- Red Lego Snapback -->
        <path d="M 32 30 Q 60 12 88 30 L 102 34 L 88 38 L 32 38 Z" fill="#e3000b" />
        <circle cx="60" cy="18" r="4" fill="#ffd500" />
        <path d="M 72 32 L 102 34 L 86 38 Z" fill="#b91c1c" />
      `;
    } else if (headId === "head_crown") {
      headDecoration = `
        <!-- 1% Grandmaster Gold Crown -->
        <polygon points="32,34 40,12 50,24 60,6 70,24 80,12 88,34" fill="#ffd500" stroke="#b45309" stroke-width="2" />
        <circle cx="60" cy="6" r="3" fill="#ef4444" />
        <circle cx="40" cy="12" r="2.5" fill="#38bdf8" />
        <circle cx="80" cy="12" r="2.5" fill="#38bdf8" />
      `;
    } else if (headId === "head_creeper") {
      headDecoration = `
        <!-- Creeper Mask (Framed around head) -->
        <rect x="32" y="14" width="56" height="54" rx="4" fill="#5b8731" stroke="#2e5016" stroke-width="2.5" />
        <rect x="42" y="24" width="10" height="10" fill="#1e293b" />
        <rect x="68" y="24" width="10" height="10" fill="#1e293b" />
        <polygon points="56,34 64,34 64,48 68,48 68,56 52,56 52,48 56,48" fill="#1e293b" />
      `;
    }

    // Accessory Layer
    let accessorySVG = "";
    if (accId === "flair_shades") {
      accessorySVG = `
        <!-- Pixel Thug Life Shades -->
        <rect x="38" y="38" width="20" height="12" fill="#000" />
        <rect x="62" y="38" width="20" height="12" fill="#000" />
        <rect x="58" y="42" width="4" height="4" fill="#000" />
        <rect x="40" y="40" width="4" height="4" fill="#fff" />
        <rect x="64" y="40" width="4" height="4" fill="#fff" />
      `;
    } else if (accId === "flair_mewing_jaw") {
      accessorySVG = `
        <!-- Mewing Glow -->
        <path d="M 44 64 Q 60 74 76 64" stroke="#ffd500" stroke-width="3" fill="none" stroke-linecap="round" />
      `;
    } else if (accId === "flair_diamond_sword") {
      accessorySVG = `
        <!-- Diamond Sword -->
        <g transform="translate(86, 40) rotate(25)">
          <rect x="0" y="0" width="6" height="32" fill="#4dedf4" stroke="#0891b2" stroke-width="1.5" />
          <rect x="-6" y="24" width="18" height="4" fill="#854d0e" />
          <rect x="1" y="28" width="4" height="8" fill="#525252" />
        </g>
      `;
    }

    // Companion Pet Layer
    let petSVG = "";
    if (petId === "pet_capybara") {
      petSVG = `
        <!-- Capybara Buddy -->
        <g transform="translate(4, 70)">
          <ellipse cx="14" cy="18" rx="14" ry="12" fill="#a16207" />
          <circle cx="22" cy="14" r="8" fill="#ca8a04" />
          <circle cx="25" cy="12" r="2" fill="#000" />
          <!-- Mini Shades -->
          <rect x="22" y="10" width="7" height="4" fill="#000" />
        </g>
      `;
    } else if (petId === "pet_pixel_bot") {
      petSVG = `
        <!-- Pixel Robot -->
        <g transform="translate(6, 68)">
          <rect x="4" y="8" width="20" height="18" rx="4" fill="#64748b" stroke="#38bdf8" stroke-width="1.5" />
          <circle cx="10" cy="16" r="2.5" fill="#38bdf8" />
          <circle cx="18" cy="16" r="2.5" fill="#38bdf8" />
          <line x1="14" y1="8" x2="14" y2="2" stroke="#38bdf8" stroke-width="2" />
          <circle cx="14" cy="2" r="2" fill="#ffd500" />
        </g>
      `;
    }

    return `
      <svg width="${size}" height="${size}" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
        <!-- Aura Glow Effect -->
        <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(255, 213, 0, 0.25)" stroke-width="4" stroke-dasharray="6,4" />

        <!-- Minifig / Boy Body -->
        <g id="avatar-torso">
          <path d="M 36 72 L 84 72 L 90 110 L 30 110 Z" fill="${shirtFill}" rx="6" />
          <!-- Belt / Details -->
          <rect x="36" y="104" width="48" height="6" fill="#1e293b" />
          <!-- Neck -->
          <rect x="52" y="64" width="16" height="10" fill="#fcd34d" />
        </g>

        <!-- Head Base (Lego Yellow Skin) -->
        <g id="avatar-head">
          <rect x="36" y="24" width="48" height="44" rx="10" fill="#fcd34d" stroke="#d97706" stroke-width="1.5" />
          
          <!-- Eyes -->
          <circle cx="48" cy="44" r="4" fill="#1e293b" />
          <circle cx="72" cy="44" r="4" fill="#1e293b" />
          <circle cx="49" cy="43" r="1.5" fill="#fff" />
          <circle cx="73" cy="43" r="1.5" fill="#fff" />

          <!-- Confident Gamer Smile -->
          <path d="M 50 56 Q 60 64 70 56" stroke="#b45309" stroke-width="2.5" fill="none" stroke-linecap="round" />
        </g>

        <!-- Headgear / Hair -->
        ${headDecoration}

        <!-- Accessories (Shades, Sword, Mewing) -->
        ${accessorySVG}

        <!-- Companion Pet -->
        ${petSVG}
      </svg>
    `;
  }
}

window.AvatarBuilder = AvatarBuilder;
