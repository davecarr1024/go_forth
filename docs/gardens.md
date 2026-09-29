# Garden atlas research

Reviewed September 2026. These 23 garden prompts belong to 16 rail bases in
the starter network. They are destinations for an exploratory rail day, not
claims that a garden is open when a train arrives. The planner's journey time
ends at the **rail base**; the local walk, tram, bus, or museum shuttle below is
extra. Check the linked operator or official local tourism page for current
hours, admission, reservations, local transport, and accessibility.

The three classic gardens are [Kenroku-en](https://shiro-niwa.pref.ishikawa.lg.jp/english/access.html)
in Kanazawa, [Okayama Korakuen](https://okayama-korakuen.jp/section/english/access/index.html),
and [Kairakuen](https://visitmito.jp/en/highlight/park/kairakuen/) in Mito.
Each now has a garden activity and a connected rail base.

| Rail base | Garden and source | Local connection and planning character |
| --- | --- | --- |
| Mito | [Kairakuen](https://visitmito.jp/en/highlight/park/kairakuen/) | Bus from Mito Station, about 20 minutes; plum groves and Kobuntei. Use Mito as the year-round rail base. |
| Kanazawa | [Kenroku-en](https://shiro-niwa.pref.ishikawa.lg.jp/english/access.html) | City bus from Kanazawa Station; a broad pond circuit. |
| Tokyo | [Rikugien](https://www.tokyo-park.or.jp/park/rikugien/) | About seven minutes on foot from JR Komagome; poetic pond garden. |
| Tokyo | [Koishikawa Korakuen](https://www.tokyo-park.or.jp/park/koishikawakorakuen/index.html) | About five minutes from JR Suidobashi; historic pond garden. This is distinct from **Okayama Korakuen**. |
| Tokyo | [Hama-rikyu Gardens](https://www.tokyo-park.or.jp/park/hama-rikyu/) | About 12 minutes from JR Shimbashi; tidal pond and city skyline. |
| Tokyo | [Kiyosumi Gardens](https://www.tokyo-park.or.jp/park/kiyosumi/) | About three minutes from Kiyosumi-shirakawa subway station; stone crossings and pond. |
| Tokyo | [Shinjuku Gyoen](https://policies.env.go.jp/national-garden/shinjukugyoen/english/guide/access/) | About ten minutes from JR Shinjuku South Exit; a larger mixed-style garden visit. |
| Tokyo | [Kyu-Furukawa Gardens](https://www.tokyo-park.or.jp/park/kyu-furukawa/index.html) | About seven minutes from JR Kami-Nakasato; western and Japanese garden spaces. |
| Yokohama | [Sankeien](https://www.sankeien.or.jp/en_access/) | A bus leg from Yokohama or Sakuragicho, then a walk. It is a dedicated garden stop, not a station-adjacent stroll. |
| Kyoto | [Murin-an](https://murin-an.jp/info/) | About seven minutes from subway Keage. The operator limits entry by time slot; book ahead for a reliable visit. |
| Kyoto | [Shosei-en](https://www.higashihonganji.or.jp/about/guide/shoseien/guide/) | About ten minutes from Kyoto Station; easy to combine with a rail arrival or departure. |
| Nara | [Isuien](https://isuien.or.jp/en/access) | About 15 minutes from Kintetsu Nara; two gardens with borrowed scenery. |
| Nara | [Yoshikien](https://www.visitnara.jp/venues/A00492/) | Near Isuien; pond, moss, and tea-flower gardens. |
| Osaka | [Keitakuen](https://www.keitakuen-garden.jp/en) | About five minutes from JR Tennoji; an urban pond circuit. |
| Kobe | [Sorakuen](https://sorakuen.com/english/) | About ten minutes from JR Motomachi; city garden and historic buildings. |
| Himeji | [Koko-en](https://visit-himeji.com/en/sightseeing/koko-en-garden/) | Beside Himeji Castle; a natural pairing with the castle stop. |
| Okayama | [Okayama Korakuen](https://okayama-korakuen.jp/section/english/access/index.html) | About 25 minutes on foot from Okayama Station, or a local bus; allow time for its broad lawns and ponds. |
| Yasugi | [Adachi Museum of Art gardens](https://www.adachi-museum.or.jp/en/access) | [Free shuttle](https://www.adachi-museum.or.jp/en/shuttle-bus) from JR Yasugi takes about 20 minutes and seats are limited. The [museum says](https://www.adachi-museum.or.jp/en/faq) its gardens are viewed from inside; visitors cannot walk through them. |
| Takamatsu | [Ritsurin Garden](https://www.my-kagawa.jp/static/en/ritsurin/access) | About three minutes from JR Ritsurin Koen Kitaguchi; large pond-and-pine garden. |
| Hiroshima | [Shukkeien](https://shukkeien.jp/access/) | Walk or take the local tram from Hiroshima Station; compact landscaped circuit. |
| Hakata / Fukuoka | [Ohori Park Japanese Garden](https://www.gofukuoka.jp/spots/detail/26983) | Subway to Ohori Koen, then about 13 minutes on foot; a small formal garden beside the lake. |
| Kumamoto | [Suizenji Jojuen](https://www.suizenji.or.jp/en/) | About ten minutes from JR Shin-Suizenji; spring-fed pond and miniature Tokaido landscape. |
| Kagoshima | [Sengan-en](https://www.kagoshima-yokanavi.jp/en/spot/10006) | Reach JR Sengan-en-mae locally, then walk about three minutes; borrowed views of Sakurajima and the bay. |

## Rail links added for the atlas

- [JR East's Hitachi/Tokiwa route](https://www.jreast.co.jp/en/multi/traininformation/hitachi/)
  connects Tokyo and Mito. The planner uses an illustrative 85-minute pattern.
- [JR East's Yokohama station information](https://timetables.jreast.co.jp/en/timetable/list1638.html)
  and [Kamakura station information](https://timetables.jreast.co.jp/en/timetable/list0476.html)
  support the Tokyo–Yokohama–Kamakura corridor. Kamakura was previously an
  isolated station in the starter graph.
- [Adachi Museum access](https://www.adachi-museum.or.jp/en/access) describes
  Okayama to Yasugi on the Limited Express Yakumo at roughly two hours twenty
  minutes, before the separate museum shuttle. The planner uses a coarse
  140-minute rail pattern and expected wait, not a departure lookup.

Garden records live in `js/gardens.js`, where each prompt carries its official
source URL and a short access note. The app derives the garden preference tag
from those records, displays the atlas, and links each garden to its source in
the day plan. The generic rail graph does not add local bus, tram, shuttle,
walking, garden duration, or opening-hour constraints to its scores.
