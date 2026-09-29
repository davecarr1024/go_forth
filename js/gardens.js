// Curated garden prompts. Access is descriptive, never a live connection promise.
// Each source is the garden operator or an official local tourism authority.
const garden = (name, detail, fromStation, sourceUrl, options = {}) => ({
  kind: "GARDEN", name, detail, fromStation, sourceUrl,
  best: "daylight", duration: "1–2 hr", effort: "easy walk",
  reservation: "check official site", lastReviewed: "2026-09",
  source: "official garden or tourism source", ...options
});

export const gardenCatalog = {
  mito: [
    garden("Kairakuen", "Plum groves and Kobuntei make this one of the classic three gardens.", "Bus from Mito Station; allow around 20 minutes", "https://visitmito.jp/en/highlight/park/kairakuen/", { duration: "2–3 hr" })
  ],
  kanazawa: [
    garden("Kenroku-en", "A broad strolling garden that rewards a slow circuit around Kasumigaike Pond.", "Bus from Kanazawa Station", "https://shiro-niwa.pref.ishikawa.lg.jp/english/access.html", { duration: "2–3 hr" })
  ],
  tokyo: [
    garden("Rikugien", "A poetic pond circuit with a calmer, enclosed feel than the city around it.", "JR Komagome, about 7 min walk", "https://www.tokyo-park.or.jp/park/rikugien/"),
    garden("Koishikawa Korakuen", "A historic pond garden with borrowed scenery beside the Tokyo Dome area.", "JR Suidobashi, about 5 min walk", "https://www.tokyo-park.or.jp/park/koishikawakorakuen/index.html"),
    garden("Hama-rikyu Gardens", "A tidal-pond garden where old landscape design meets the waterfront skyline.", "JR Shimbashi, about 12 min walk", "https://www.tokyo-park.or.jp/park/hama-rikyu/"),
    garden("Kiyosumi Gardens", "Stone crossings and a pond circuit pair well with a slow coffee stop nearby.", "Kiyosumi-shirakawa subway, about 3 min walk", "https://www.tokyo-park.or.jp/park/kiyosumi/"),
    garden("Shinjuku Gyoen", "A large garden day with Japanese and other landscape styles in one place.", "JR Shinjuku South Exit, about 10 min walk", "https://policies.env.go.jp/national-garden/shinjukugyoen/english/guide/access/", { duration: "2–3 hr" }),
    garden("Kyu-Furukawa Gardens", "A western-style rose garden and Japanese garden on the same hillside.", "JR Kami-Nakasato, about 7 min walk", "https://www.tokyo-park.or.jp/park/kyu-furukawa/index.html")
  ],
  yokohama: [
    garden("Sankeien", "A spacious garden of ponds and historic buildings worth making a dedicated stop.", "Bus from Yokohama or Sakuragicho Station, then walk", "https://www.sankeien.or.jp/en_access/", { duration: "2–3 hr", reservation: "check bus and opening hours" })
  ],
  kyoto: [
    garden("Murin-an", "A small Meiji garden where water and the Higashiyama foothills shape the view.", "Subway Keage, about 7 min walk", "https://murin-an.jp/info/", { reservation: "advance time slot recommended" }),
    garden("Shosei-en", "A pond garden close enough to Kyoto Station for an easy first or last stop.", "JR Kyoto, about 10 min walk", "https://www.higashihonganji.or.jp/about/guide/shoseien/guide/")
  ],
  nara: [
    garden("Isuien", "Two linked gardens use the surrounding hills and temple roofs as scenery.", "Kintetsu Nara, about 15 min walk", "https://isuien.or.jp/en/access"),
    garden("Yoshikien", "A compact trio of pond, moss, and tea-flower gardens near Isuien.", "Kintetsu Nara, about 15 min walk", "https://www.visitnara.jp/venues/A00492/")
  ],
  osaka: [
    garden("Keitakuen", "A pond-strolling garden inside Tennoji Park, easy to fit between trains.", "JR Tennoji, about 5 min walk", "https://www.keitakuen-garden.jp/en")
  ],
  kobe: [
    garden("Sorakuen", "A sheltered city garden with a pond circuit and historic buildings.", "JR Motomachi, about 10 min walk", "https://sorakuen.com/english/")
  ],
  himeji: [
    garden("Koko-en", "Nine garden spaces next to Himeji Castle make a natural castle-day pairing.", "Near Himeji Castle; local walk or bus from station", "https://visit-himeji.com/en/sightseeing/koko-en-garden/")
  ],
  okayama: [
    garden("Okayama Korakuen", "One of the classic three gardens, with open lawns, ponds, and castle views.", "Okayama Station: about 25 min walk or local bus", "https://okayama-korakuen.jp/section/english/access/index.html", { duration: "2–3 hr" })
  ],
  yasugi: [
    garden("Adachi Museum of Art gardens", "Dry landscape, moss, and pond gardens are viewed from inside the museum; they are not walk-through gardens.", "Free shuttle from JR Yasugi, about 20 min; seats are limited", "https://www.adachi-museum.or.jp/en/faq", { duration: "2–3 hr", reservation: "check shuttle capacity and museum hours" })
  ],
  takamatsu: [
    garden("Ritsurin Garden", "A large pond-and-pine circuit backed by Mt. Shiun.", "JR Ritsurin Koen Kitaguchi, about 3 min walk", "https://www.my-kagawa.jp/static/en/ritsurin/access", { duration: "2–3 hr" })
  ],
  hiroshima: [
    garden("Shukkeien", "A compact circuit of miniature landscapes near the prefectural art museum.", "Hiroshima Station: walk or local tram to Shukkeien-mae", "https://shukkeien.jp/access/")
  ],
  hakata: [
    garden("Ohori Park Japanese Garden", "A formal garden beside the lake, useful for a gentle Fukuoka pause.", "Subway Ohori Koen, about 13 min walk", "https://www.gofukuoka.jp/spots/detail/26983")
  ],
  kumamoto: [
    garden("Suizenji Jojuen", "A spring-fed pond and miniature Tokaido landscape in the city.", "JR Shin-Suizenji, about 10 min walk", "https://www.suizenji.or.jp/en/")
  ],
  kagoshima: [
    garden("Sengan-en", "A Shimadzu garden with Sakurajima and the bay as borrowed scenery.", "Reach JR Sengan-en-mae locally, then about 3 min walk", "https://www.kagoshima-yokanavi.jp/en/spot/10006", { duration: "2–3 hr" })
  ]
};
