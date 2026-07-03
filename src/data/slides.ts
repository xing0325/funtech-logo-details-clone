export type Theme = "volt" | "breaker" | "fun";

export const slides = [
  { number: "01", label: "HOME", slug: "home" },
  { number: "02", label: "BRAND MESSAGE", slug: "brand-message" },
  { number: "03", label: "CI UPDATE", slug: "ci-update" },
  { number: "04", label: "VISION VISUAL", slug: "vision-visual" },
  { number: "05", label: "FUNTECH WAY", slug: "funtech-way" },
  { number: "06", label: "A MILLION-VOLT CREATIVE", slug: "megavolt-creative" },
  { number: "07", label: "BREAKERS OF VICTORY", slug: "breakers-of-victory" },
  { number: "08", label: "ALL FOR FUN", slug: "all-for-fun" },
  { number: "09", label: "LOGO DETAILS", slug: "logo-details" },
  { number: "10", label: "LOGO VARIATION", slug: "logo-variation" },
  { number: "11", label: "10th SPECIAL ITEM", slug: "10th-special-item" },
  { number: "12", label: "ENDING MESSAGE", slug: "ending-message" },
  { number: "13", label: "WE ARE FUNTECH", slug: "we-are-funtech" },
  { number: "14", label: "FIN", slug: "fin" },
] as const;

export type SlideSlug = (typeof slides)[number]["slug"];

export const waySlides = {
  "megavolt-creative": {
    code: "WAY_01",
    title: "Million-Volt\nCreativity",
    body: "A powerful Creativity\nas if you get an electric shock to the heart.\nBy riding the accelerating evolution of technology,\nwe continue to break through moments of ‘creative saturation’\nand deliver million-volt-level craftsmanship to the world.",
    illustration: "funtech-way-lightning",
    video: "https://player.vimeo.com/progressive_redirect/playback/1193249260/rendition/1440p/file.mp4%20%281440p%29.mp4?loc=external&log_user=0&signature=9d38761fd667e49bc7670c3ac7596d58e6576bae8a59eabcfb7e1e1af78eeada",
  },
  "breakers-of-victory": {
    code: "WAY_02",
    title: "Victory\nBreaker",
    body: "Not only through craft, but through strategy.\nWe build brands that break through our clients’ barriers,\ncreating sources of energy that drive victory and transformation.\nWe stand beside our clients as ‘Breakers’ who initiate change.",
    illustration: "funtech-way-02",
    video: "https://player.vimeo.com/progressive_redirect/playback/1194628489/rendition/1080p/file.mp4%20%281080p%29.mp4?loc=external&log_user=0&signature=a15d6dd18b8d924f587e57242d68e2996a3b2ed446e6aebb7a868b7bdb633f74",
  },
  "all-for-fun": {
    code: "WAY_03",
    title: "All for Fun",
    body: "We fully enjoy technology and take joy in craftsmanship.\nThat spirit of fun overflows into our creative work,\nsets users’ hearts in motion, and crosses borders around the world.\nFor us, enjoyment is everything.",
    illustration: "funtech-way-03",
    video: "https://player.vimeo.com/progressive_redirect/playback/1193254458/rendition/1440p/file.mp4%20%281440p%29.mp4?loc=external&log_user=0&signature=62868fb6fdef5186024a16f5f0f047a60259d491d3520154025991ddd8753d71",
  },
} as const;

export const logoVariationCards = [
  { left: 34.157, top: 0.705, rotation: -12.384, title: "2D MODE", image: "2D.png" },
  { left: 68.065, top: 24.207, rotation: 13.515, title: "TOON MODE", image: "TOON.png" },
  { left: 67.141, top: 2.426, rotation: 16.654, title: "3D MODE", image: "3D.png" },
  { left: 22.641, top: 23.684, rotation: 14.724, title: "DOT MODE", image: "dot.png" },
  { left: 46.645, top: 26.381, rotation: -15.066, title: "BALLOON MODE", image: "balloon.png" },
  { left: 1.167, top: 28.601, rotation: -16.139, title: "MATERIAL MODE", image: "MATERIAL.png" },
  { left: 4.958, top: 3.181, rotation: 17.019, title: "FUN MODE", image: "fun.png" },
] as const;

export const specialItems = [
  { id: "tag", src: "tag.png", top: 1.504, left: 31.508, width: 10.049, rotate: -3.117 },
  { id: "bottle", src: "bottle.png", top: 38.434, left: 89.325, width: 9.039, rotate: 14 },
  { id: "opener", src: "opener.png", top: 23.278, left: 86.795, width: 11.772, rotate: -3.95 },
  { id: "ennichi", src: "ennichi.png", top: 2.648, left: 4.217, width: 5.182, rotate: -8 },
  { id: "cups", src: "cups.png", top: 43.128, left: 74.121, width: 9.623, rotate: -5 },
  { id: "logo-white", src: "logo-white.png", top: 45.05, left: 42.198, width: 15.729, rotate: -6 },
  { id: "logo-black", src: "logo-black.png", top: 28.75, left: 69.205, width: 17.4, rotate: -7.12 },
  { id: "logo-orange", src: "logo-orange.png", top: 22.558, left: 9.121, width: 13.938, rotate: -2 },
  { id: "towel", src: "towel.png", top: 40.176, left: 19.527, width: 19.994, rotate: 6 },
  { id: "logo-sticker", src: "logo-sticker.png", top: 42.91, left: 14.682, width: 13.2, rotate: -8 },
  { id: "banana", src: "banana.png", top: 6.472, left: 87.961, width: 10.304, rotate: -12.154 },
  { id: "plate", src: "plate.png", top: 7.924, left: 19.466, width: 12.787, rotate: 8 },
  { id: "fan", src: "fan.png", top: 11.473, left: 1.288, width: 19.318, rotate: -12 },
] as const;

export const specialGifs = [
  { src: "guooo.gif", top: 3.083, left: 66.247, size: 19.953, rotate: 57.955 },
  { src: "gogogo.gif", top: 32.575, left: 11.684, size: 12.746, rotate: 12 },
  { src: "gif9.gif", top: 4.944, left: 44.459, size: 8.457, rotate: -4.135 },
  { src: "gif4.gif", top: 1.883, left: 57.891, size: 8.1, rotate: -29.503 },
  { src: "gif6.gif", top: 24.379, left: 21.939, size: 6.6, rotate: -33.451 },
  { src: "gif16.gif", top: 43.688, left: 2.804, size: 6.8, rotate: -12 },
  { src: "gif11.gif", top: 18.985, left: 76.69, size: 12.601, rotate: 15 },
  { src: "gif1.gif", top: 42.91, left: 61.773, size: 8.93, rotate: 17.136 },
  { src: "gif14.gif", top: 41.174, left: 76.666, size: 7.2, rotate: -16 },
] as const;

export const members = [
  ["Ohta", "Ohta.23cae958.jpg", "Ohta-2.0c9ebe35.jpg"],
  ["Matsumoto", "Matsumoto.c4ac432c.jpg", "Matsumoto-2.dc3f3407.jpg"],
  ["Furuhashi", "Furuhashi.7b7e20e1.jpg", "Furuhashi-2.b2ebe002.jpg"],
  ["Kariya", "Kariya.5bea7e72.jpg", "Kariya-2.f967c9de.jpg"],
  ["Kondo", "Kondo.6f015d85.jpg", "Kondo-2.3670ab6d.jpg"],
  ["Hashimoto", "Hashimoto.99451fdd.jpg", "Hashimoto-2.ff7c0359.jpg"],
  ["Tanaka", "Tanaka.7ce13911.jpg", "Tanaka-2.fd9e97da.jpg"],
  ["Ueda", "Ueda.7e76068b.jpg", "Ueda-2.e4f34a20.jpg"],
  ["Jokura", "Jokura.e58d32d3.jpg", "Jokura-2.66babb9f.jpg"],
  ["Moriya", "Moriya.854cb686.jpg", "Moriya-2.20048f17.jpg"],
  ["Wakame", "Wakame.b606eba6.jpg", "Wakame-2.f7742689.jpg"],
  ["Kumei", "Kumei.fa333a5a.jpg", "Kumei-2.bd5161b7.jpg"],
  ["Terence", "Terence.2f2b00ba.jpg", "Terence-2.557c76bc.jpg"],
  ["Nakamura", "Nakamura.d9f853a8.jpg", "Nakamura-2.6d707de2.jpg"],
  ["Horino", "Horino.fe18a03a.jpg", "Horino-2.ecc72490.jpg"],
] as const;
