// Illustrative planning data only. See docs/data.md.
export const stations = [
  { id: "kanazawa", name: "Kanazawa", x: 38, y: 43, south: 0, hotel: 8, food: 9, interest: 9, endpoint: true },
  { id: "toyama", name: "Toyama", x: 48, y: 34, south: -1, hotel: 7, food: 7, interest: 6, endpoint: true },
  { id: "tsuruga", name: "Tsuruga", x: 32, y: 54, south: 2, hotel: 6, food: 6, interest: 7, endpoint: true },
  { id: "nagano", name: "Nagano", x: 57, y: 41, south: -2, hotel: 7, food: 7, interest: 7, endpoint: true },
  { id: "tokyo", name: "Tokyo", x: 73, y: 50, south: -3, hotel: 10, food: 10, interest: 10, endpoint: true },
  { id: "maibara", name: "Maibara", x: 39, y: 65, south: 5, hotel: 5, food: 5, interest: 5, endpoint: false },
  { id: "kyoto", name: "Kyoto", x: 34, y: 70, south: 7, hotel: 10, food: 10, interest: 10, endpoint: true },
  { id: "osaka", name: "Osaka", x: 28, y: 75, south: 8, hotel: 10, food: 10, interest: 10, endpoint: true },
  { id: "himeji", name: "Himeji", x: 19, y: 78, south: 9, hotel: 7, food: 8, interest: 9, endpoint: true },
  { id: "okayama", name: "Okayama", x: 11, y: 74, south: 10, hotel: 7, food: 7, interest: 7, endpoint: true },
  { id: "takamatsu", name: "Takamatsu", x: 17, y: 88, south: 12, hotel: 8, food: 9, interest: 9, endpoint: true },
  { id: "hiroshima", name: "Hiroshima", x: 5, y: 69, south: 12, hotel: 9, food: 9, interest: 9, endpoint: true },
  { id: "hakata", name: "Hakata", x: 5, y: 87, south: 17, hotel: 10, food: 10, interest: 10, endpoint: true }
];

const edge = (from, to, minutes, headway, line, extras = {}) => ({ from, to, minutes, headway, line, confidence: headway > 35 ? "medium" : "high", ...extras });
export const services = [
  edge("kanazawa", "toyama", 22, 20, "Hokuriku Shinkansen", { green: true, scenic: 4 }), edge("toyama", "kanazawa", 22, 20, "Hokuriku Shinkansen", { green: true, scenic: 4 }),
  edge("kanazawa", "tsuruga", 55, 30, "Hokuriku Shinkansen", { green: true, scenic: 6 }), edge("tsuruga", "kanazawa", 55, 30, "Hokuriku Shinkansen", { green: true, scenic: 6 }),
  edge("kanazawa", "nagano", 65, 30, "Hokuriku Shinkansen", { green: true, scenic: 6 }), edge("nagano", "kanazawa", 65, 30, "Hokuriku Shinkansen", { green: true, scenic: 6 }),
  edge("kanazawa", "tokyo", 155, 30, "Hokuriku Shinkansen", { green: true, gran: true, scenic: 7 }), edge("tokyo", "kanazawa", 155, 30, "Hokuriku Shinkansen", { green: true, gran: true, scenic: 7 }),
  edge("tsuruga", "maibara", 52, 30, "Limited Express", { green: true, scenic: 6 }), edge("maibara", "tsuruga", 52, 30, "Limited Express", { green: true, scenic: 6 }),
  edge("maibara", "kyoto", 20, 15, "Tokaido Shinkansen", { green: true, scenic: 3 }), edge("kyoto", "maibara", 20, 15, "Tokaido Shinkansen", { green: true, scenic: 3 }),
  edge("kyoto", "osaka", 28, 15, "JR Kyoto Line", { green: false, scenic: 3 }), edge("osaka", "kyoto", 28, 15, "JR Kyoto Line", { green: false, scenic: 3 }),
  edge("osaka", "himeji", 60, 15, "Sanyo Shinkansen", { green: true, scenic: 5 }), edge("himeji", "osaka", 60, 15, "Sanyo Shinkansen", { green: true, scenic: 5 }),
  edge("himeji", "okayama", 22, 20, "Sanyo Shinkansen", { green: true, scenic: 5 }), edge("okayama", "himeji", 22, 20, "Sanyo Shinkansen", { green: true, scenic: 5 }),
  edge("okayama", "takamatsu", 55, 40, "Marine Liner", { green: true, scenic: 9, railfan: 6 }), edge("takamatsu", "okayama", 55, 40, "Marine Liner", { green: true, scenic: 9, railfan: 6 }),
  edge("okayama", "hiroshima", 40, 30, "Sanyo Shinkansen", { green: true, scenic: 5 }), edge("hiroshima", "okayama", 40, 30, "Sanyo Shinkansen", { green: true, scenic: 5 }),
  edge("hiroshima", "hakata", 65, 30, "Sanyo Shinkansen", { green: true, scenic: 6 })
];
