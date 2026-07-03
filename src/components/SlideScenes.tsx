"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  logoVariationCards,
  members,
  specialGifs,
  specialItems,
  waySlides,
  type SlideSlug,
  type Theme,
} from "@/data/slides";

type SceneProps = { basePath: string; slug: SlideSlug; theme: Theme };

const detailCards = [
  { code: "DETAILS_01", title: "Play Technology\nAll In", body: "Boyish in impulse, street in style. A playful,\nboundary-breaking spirit in a cartoon-inspired look\nwith charm and a hint of edge. Unbound by\nconvention, it goes all in on playing with creativity.", art: "detail-01" },
  { code: "DETAILS_02", title: "Star Creators", body: "We are a collective of star creators who shine with\noriginality.\nThe stars woven into the ‘U’ and ‘C’ continue to\nilluminate the kind of organization FunTech strives to\nbe.", art: "detail-02" },
  { code: "DETAILS_03", title: "Ever-Evolving", body: "Its ever-shifting form is a style built to play boldly\nthrough an unpredictable era.\nNo matter how technology or the environment\nchanges, we ride those waves with a sense of play.", art: "detail-03" },
] as const;

function NoiseEdges() {
  return <><i className="scene-edge scene-edge-t" /><i className="scene-edge scene-edge-r" /><i className="scene-edge scene-edge-b" /><i className="scene-edge scene-edge-l" /></>;
}

function MangaLayer({ basePath, name, opacity = 1 }: { basePath: string; name: "a" | "b" | "c" | "d"; opacity?: number }) {
  return <div className="manga-layer" style={{ "--manga-mask": `url(${basePath}/assets/full-site/webgl/manga-${name}-alpha.png)`, opacity } as React.CSSProperties} />;
}

function Gif({ basePath, name, className = "", style }: { basePath: string; name: string; className?: string; style?: React.CSSProperties }) {
  return <Image className={`scene-gif ${className}`} src={`${basePath}/assets/full-site/stickers/gif/${name}`} alt="" width={800} height={800} unoptimized style={style} />;
}

function NoiseIllustration({ basePath, name, className = "" }: { basePath: string; name: string; className?: string }) {
  return <span className={`noise-illustration ${className}`}><span className="noise-strip">{[0, 1, 2].map((frame) => <span key={frame} style={{ backgroundImage: `url(${basePath}/assets/full-site/noise-illustrations/${name}-${frame}.webp)` }} />)}</span></span>;
}

function HomeScene({ basePath }: SceneProps) {
  return <div className="slide-scene home-scene">
    <MangaLayer basePath={basePath} name="a" opacity={0.16} />
    <h1 className="home-word home-word-1">FUNTECH</h1><h1 className="home-word home-word-2">BRAND</h1><h1 className="home-word home-word-3">IDENTITY</h1>
    <p className="home-date">UPDATED ON MAY 2026</p>
    <div className="home-logo-cloud">{Array.from({ length: 7 }, (_, index) => <span className={`home-letter home-letter-${index + 1}`} key={index}><Image src={`${basePath}/assets/full-site/stickers/webp/sticker${index}.webp`} alt="" width={500} height={500} unoptimized /></span>)}</div>
  </div>;
}

function BrandMessageScene({ basePath }: SceneProps) {
  return <div className="slide-scene brand-scene">
    <MangaLayer basePath={basePath} name="b" opacity={0.12} />
    <Image className="work-archive" src={`${basePath}/assets/full-site/webgl/work-archive.webp`} alt="" width={2560} height={1440} unoptimized />
    <div className="brand-copy"><h2>CREATIVITY IS<br />“ROMAN”</h2><p>We enjoy creativity as a team.<br />We share the journey with our clients.<br />We chase “ROMAN”, together.<br />Ten years behind us.<br />A new decade to evolve.</p></div>
    <Gif basePath={basePath} name="waaa.gif" className="brand-gif brand-gif-a" /><Gif basePath={basePath} name="waaa.gif" className="brand-gif brand-gif-b" />
  </div>;
}

function CiUpdateScene({ basePath }: SceneProps) {
  return <div className="slide-scene ci-scene">
    <MangaLayer basePath={basePath} name="c" opacity={0.18} />
    <div className="ci-logo-cloud">{Array.from({ length: 6 }, (_, index) => <span key={index}><Image src={`${basePath}/assets/full-site/stickers/webp/sticker${index + 7}.webp`} alt="" width={480} height={480} unoptimized /></span>)}</div>
    <h2 className="ci-word ci-a">FUNTECH CI</h2><h2 className="ci-word ci-b">FOR</h2><h2 className="ci-word ci-c">NEXT</h2><h2 className="ci-word ci-d"><b>10</b> YEARS</h2>
    <Gif basePath={basePath} name="guooo.gif" className="ci-gif ci-gif-a" /><Gif basePath={basePath} name="guooo.gif" className="ci-gif ci-gif-b" />
  </div>;
}

function VisionScene({ basePath, theme }: SceneProps) {
  return <div className="slide-scene vision-scene">
    <Image className="vision-art" src={`${basePath}/assets/full-site/vision-visual/vision-visual-${theme}.png`} alt="" width={1080} height={1116} unoptimized />
    <h2>A Team of<br />Superstar-Creators</h2>
    <p>Each individual shines in their own way,<br />coming together to create overwhelming, electrifying creativity<br />that sends a jolt straight to the heart.<br />Our CI expresses FunTech as a playful container<br />where our Superstar-Creators gather, collide, and spark.</p>
    <div className="vision-video"><NoiseEdges /><Image className="video-poster" src={`${basePath}/assets/full-site/video-posters/vision-visual.webp`} alt="" width={560} height={560} unoptimized /><video src="https://player.vimeo.com/progressive_redirect/playback/1194390919/rendition/1080p/file.mp4%20%281080p%29.mp4?loc=external&log_user=0&signature=439525a5b88ca5eeaa712df3fc9613d46578f374dd10a1715d406ee4e8d12f26" autoPlay muted loop playsInline /></div>
    <Gif basePath={basePath} name="baribari.gif" className="vision-gif" />
  </div>;
}

function FuntechWayScene({ basePath }: SceneProps) {
  const ways = [
    ["WAY_01", "Million-Volt\nCreativity", "funtech-way-lightning", "volt"],
    ["WAY_02", "Victory\nBreaker", "funtech-way-02", "breaker"],
    ["WAY_03", "All for Fun", "funtech-way-03", "fun"],
  ] as const;
  return <div className="slide-scene funtech-way-scene"><MangaLayer basePath={basePath} name="d" opacity={0.08} />
    <h2>A shared language<br />for the next 10 years</h2>
    <div className="way-cards">{ways.map(([code, title, illustration, color]) => <article className={`way-card way-card-${color}`} key={code}><NoiseEdges /><NoiseIllustration basePath={basePath} name={illustration} /><small>{code}</small><h3>{title}</h3></article>)}</div>
    <p>To guide our next decade,<br />we defined a core set of shared values<br />that will shape how FunTech<br />thinks, creates, and moves forward.</p>
  </div>;
}

function WayScene({ basePath, slug }: SceneProps) {
  const data = waySlides[slug as keyof typeof waySlides];
  return <div className="slide-scene way-scene">
    <div className="way-illustration"><NoiseIllustration basePath={basePath} name={data.illustration} /></div>
    <div className="way-copy"><small>{data.code}</small><h2>{data.title}</h2><p>{data.body}</p></div>
    <div className="way-video"><NoiseEdges /><video src={data.video} autoPlay muted loop playsInline /></div>
  </div>;
}

function LogoDetailsScene({ basePath }: SceneProps) {
  return <div className="slide-scene logo-details-scene"><MangaLayer basePath={basePath} name="d" />
    <h2>Logo Details</h2><Gif basePath={basePath} name="zyan.gif" className="detail-gif" />
    <div className="detail-cards">{detailCards.map((detail, index) => <article className={`detail-card detail-${index + 1}`} key={detail.code}><div className="detail-art"><NoiseEdges /><Image src={`${basePath}/assets/logo-details/${detail.art}.svg`} alt="" width={380} height={380} unoptimized /><div><small>{detail.code}</small><h3>{detail.title}</h3></div></div><p>{detail.body}</p></article>)}</div>
  </div>;
}

function LogoVariationScene({ basePath, theme }: SceneProps) {
  return <div className="slide-scene logo-variation-scene"><h2>Logo Variation</h2>{logoVariationCards.map((card, index) => <article className="variation-card" key={card.title} style={{ left: `${card.left}cqw`, top: `${card.top}cqw`, transform: `rotate(${card.rotation}deg)`, animationDelay: `${index * 0.04}s`, backgroundImage: `url(${basePath}/assets/full-site/logo-variation/${theme}-bg.png)` }}><NoiseEdges /><Image src={`${basePath}/assets/full-site/logo-variation/${card.image}`} alt={card.title} width={620} height={250} unoptimized /><span>{card.title}</span><span>{card.title}</span></article>)}</div>;
}

function SpecialItemScene({ basePath }: SceneProps) {
  return <div className="slide-scene special-scene"><Image className="special-bg" src={`${basePath}/assets/full-site/10th-special-item/items-bg.jpg`} alt="" width={1920} height={1080} unoptimized />
    {specialItems.map((item, index) => <Image className="special-item" src={`${basePath}/assets/full-site/10th-special-item/items/${item.src}`} alt="" width={600} height={600} unoptimized key={item.id} style={{ top: `${item.top}cqw`, left: `${item.left}cqw`, width: `${item.width}cqw`, transform: `rotate(${item.rotate}deg)`, animationDelay: `${index * 0.035}s` }} />)}
    {specialGifs.map((item) => <Gif key={`${item.src}-${item.left}`} basePath={basePath} name={item.src} className="special-gif" style={{ top: `${item.top}cqw`, left: `${item.left}cqw`, width: `${item.size}cqw`, transform: `rotate(${item.rotate}deg)` }} />)}
    <div className="special-copy"><h2><b>10th</b> Item</h2><p>To celebrate our 10th anniversary and CI renewal,<br />we created a lively collection of festival-inspired items<br />under the theme “Million Volt Ennichi.”<br />They will be given away through a lottery,<br />so be sure to check out the details.</p><a href="https://x.com/funtech_inc/status/2064665083121455130">GET THE ITEMS! ↗</a></div>
  </div>;
}

function EndingScene({ basePath }: SceneProps) {
  const columns = [
    "In May 2026,\nFunTech will celebrate its 10th anniversary.\nWhen we started,\nwe were almost a student-led company.\nNone of us came from\nmajor advertising agencies or fine art universities.\nYet we were able to grow, through sheer effort,\ninto the creative company we are proud of today.\nThis was only possible\nthanks to the trust and support\nof our clients and partners\nwho chose to work with us.\nWe are deeply grateful.\nThank you.",
    "Over the next decade,\nwe will step into a broader field:\ncreative branding,\non a larger stage than ever before.\nAs the starting point of that challenge,\nwe renewed our own CI.\nIf this renewal helps you\nsense our strength\nin designing craft and language\npowered by technology,\nthen it is a perfect score for us.",
    "We will continue to fully explore\nevery emerging technology\nof the moment\nand relentlessly pursue creativity\nthat sends a jolt of electricity\nthrough you.\nPlease look forward\nto what’s next.\nAnd we sincerely appreciate\nyour continued support.",
  ];
  return <div className="slide-scene ending-scene"><MangaLayer basePath={basePath} name="b" opacity={0.1} /><h2>Dear all,</h2><div className="ending-columns">{columns.map((column, index) => <p key={index}>{column}</p>)}</div><Gif basePath={basePath} name="dodon.gif" className="ending-gif" /></div>;
}

function MemberScene({ basePath }: SceneProps) {
  const [wave, setWave] = useState(0);
  useEffect(() => { const timer = window.setInterval(() => setWave((value) => (value + 1) % members.length), 760); return () => window.clearInterval(timer); }, []);
  return <div className="slide-scene member-scene">{members.map(([name, off, on], index) => <div className="member-cell" key={name}><Image src={`${basePath}/assets/full-site/media/${off}`} alt={name} width={740} height={706} unoptimized /><Image className={Math.abs(index - wave) <= 1 ? "on" : ""} src={`${basePath}/assets/full-site/media/${on}`} alt="" width={740} height={706} unoptimized /></div>)}</div>;
}

function FinScene({ basePath }: SceneProps) {
  const cards = [["CORPORATE SITE", "corporate.jpg", "https://funtech.inc/"], ["RECRUITING SITE", "recruit.jpg", "https://www.wantedly.com/companies/fun-tech"], ["BRAND IDENTITY (PDF)", "brand.jpg", "https://jdwwpp2ikybqtgsb.public.blob.vercel-storage.com/pdf/20260526_FunTech_CI_EN_r3-8JWkzsYYvfu3fye9ml6PLkbw7nq6vD.pdf"]];
  return <div className="slide-scene fin-scene"><MangaLayer basePath={basePath} name="a" opacity={0.28} /><Image className="fin-atlas" src={`${basePath}/assets/full-site/webgl/logo/home-logo-stickers-atlas.webp`} alt="" width={1600} height={1600} unoptimized /><div className="fin-cards">{cards.map(([label, image, href]) => <a href={href} key={label}><NoiseEdges /><Image src={`${basePath}/assets/full-site/fin/${image}`} alt="" width={800} height={500} unoptimized /><span>{label}</span><b>↗</b></a>)}</div></div>;
}

export default function SlideScene(props: SceneProps) {
  let scene: React.ReactNode;
  switch (props.slug) {
    case "home": scene = <HomeScene {...props} />; break;
    case "brand-message": scene = <BrandMessageScene {...props} />; break;
    case "ci-update": scene = <CiUpdateScene {...props} />; break;
    case "vision-visual": scene = <VisionScene {...props} />; break;
    case "funtech-way": scene = <FuntechWayScene {...props} />; break;
    case "megavolt-creative": case "breakers-of-victory": case "all-for-fun": scene = <WayScene {...props} />; break;
    case "logo-details": scene = <LogoDetailsScene {...props} />; break;
    case "logo-variation": scene = <LogoVariationScene {...props} />; break;
    case "10th-special-item": scene = <SpecialItemScene {...props} />; break;
    case "ending-message": scene = <EndingScene {...props} />; break;
    case "we-are-funtech": scene = <MemberScene {...props} />; break;
    case "fin": scene = <FinScene {...props} />; break;
  }
  return <>{scene}<style jsx global>{`
    .slide-scene{position:absolute;inset:0;overflow:hidden;background:#1c1d1e;color:var(--foreground);animation:scene-in .62s cubic-bezier(.25,1,.5,1) both}.slide-scene h1,.slide-scene h2,.slide-scene h3{margin:0;font-weight:900;letter-spacing:-.035em}.slide-scene p{margin:0}.manga-layer{position:absolute;inset:0;background:var(--accent);-webkit-mask-image:var(--manga-mask);mask-image:var(--manga-mask);-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-size:400% 100%;mask-size:400% 100%;-webkit-mask-position:0 0;mask-position:0 0;animation:manga-mask 1s steps(4,end) infinite;pointer-events:none}.scene-edge{position:absolute;z-index:8;pointer-events:none}.scene-edge-t,.scene-edge-b{left:0;width:100%;height:10px;background:var(--edge-h) repeat-x 0 -5px/128px 320px;animation:edge-h 2s steps(16) infinite}.scene-edge-t{top:0;transform:translateY(-50%)}.scene-edge-b{bottom:0;transform:translateY(50%)}.scene-edge-l,.scene-edge-r{top:0;height:100%;width:10px;background:var(--edge-v) repeat-y -5px 0/320px 128px;animation:edge-v 2s steps(16) infinite}.scene-edge-l{left:0;transform:translateX(-50%)}.scene-edge-r{right:0;transform:translateX(50%)}.scene-gif{position:absolute;z-index:7;height:auto;object-fit:contain;pointer-events:none}.noise-illustration{position:absolute;inset:0;overflow:hidden}.noise-strip{position:absolute;inset:0;display:flex;width:300%;height:100%;animation:noise-cycle .9s infinite}.noise-strip>span{flex:0 0 33.3333%;height:100%;background-position:center;background-repeat:no-repeat;background-size:contain}
    .home-scene{font-family:"elevon",sans-serif}.home-word{position:absolute;z-index:4;font-size:9cqw;line-height:.86}.home-word-1{left:2cqw;top:3cqw}.home-word-2{right:2cqw;top:12cqw}.home-word-3{left:2cqw;bottom:3cqw}.home-date{position:absolute;z-index:4;right:2cqw;bottom:3cqw;font-size:2cqw;font-weight:900}.home-logo-cloud{position:absolute;z-index:2;inset:7cqw 17cqw 6cqw 19cqw;transform:rotate(-8deg)}.home-letter{position:absolute;width:14cqw;height:24cqw;border-radius:48% 52% 42% 58%;background:#08090a;box-shadow:inset 0 0 0 1px #343536,0 1cqw 2cqw #0008;display:grid;place-items:center;transform:rotate(var(--r,0deg));animation:home-float 2.8s ease-in-out infinite alternate}.home-letter img{width:85%;height:85%;object-fit:contain}.home-letter-1{left:0;top:7cqw;--r:-12deg}.home-letter-2{left:11cqw;top:3cqw;--r:9deg}.home-letter-3{left:22cqw;top:8cqw;--r:-5deg}.home-letter-4{left:33cqw;top:1cqw;--r:13deg}.home-letter-5{left:44cqw;top:8cqw;--r:-10deg}.home-letter-6{left:55cqw;top:3cqw;--r:6deg}.home-letter-7{left:66cqw;top:8cqw;--r:-4deg}
    .brand-scene{display:grid;place-items:center;text-align:center}.work-archive{position:absolute;inset:-8%;width:116%;height:116%;object-fit:cover;opacity:.48;filter:saturate(.75) brightness(.52);animation:archive-pan 14s ease-in-out infinite alternate}.brand-scene:after{content:"";position:absolute;inset:0;background:radial-gradient(circle,#1c1d1e 0 24%,transparent 64%)}.brand-copy{position:relative;z-index:3}.brand-copy h2{font:900 7cqw/.88 "elevon",sans-serif}.brand-copy p{margin-top:4cqw;font-size:1.2cqw;line-height:2}.brand-gif{width:14cqw}.brand-gif-a{left:9cqw;top:30cqw;transform:rotate(-70deg)}.brand-gif-b{left:78cqw;top:21cqw}
    .ci-logo-cloud{position:absolute;z-index:1;left:18cqw;top:5cqw;width:65cqw;height:48cqw}.ci-logo-cloud span{position:absolute;width:19cqw;height:30cqw;border-radius:44%;background:#08090a;display:grid;place-items:center;transform:rotate(calc((var(--n,1) - 3) * 5deg))}.ci-logo-cloud span:nth-child(1){left:0;top:6cqw}.ci-logo-cloud span:nth-child(2){left:10cqw;top:0}.ci-logo-cloud span:nth-child(3){left:20cqw;top:8cqw}.ci-logo-cloud span:nth-child(4){left:31cqw;top:1cqw}.ci-logo-cloud span:nth-child(5){left:42cqw;top:7cqw}.ci-logo-cloud span:nth-child(6){left:52cqw;top:0}.ci-logo-cloud img{width:90%;height:90%;object-fit:contain}.ci-word{position:absolute;z-index:4;font:900 7cqw/.85 "elevon",sans-serif}.ci-a{right:2cqw;top:3cqw}.ci-b{right:2cqw;top:10cqw}.ci-c{left:2cqw;bottom:16cqw}.ci-d{left:2cqw;bottom:3cqw}.ci-d b{font-size:13cqw}.ci-gif-a{left:77.6cqw;top:33.3cqw;width:17.9cqw;transform:rotate(58deg)}.ci-gif-b{left:.36cqw;top:4.2cqw;width:25.7cqw}
    .vision-art{position:absolute;left:1cqw;top:4cqw;width:45cqw;height:46.5cqw;object-fit:contain}.vision-scene>h2{position:absolute;z-index:3;left:2cqw;top:6cqw;font-size:7cqw;line-height:1.05}.vision-scene>p{position:absolute;z-index:3;left:2cqw;bottom:5cqw;font-size:1.2cqw;line-height:2}.vision-video{position:absolute;right:2cqh;top:2%;height:96%;aspect-ratio:1;background:#1c1d1e;overflow:hidden}.vision-video .video-poster{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}.vision-video video,.way-video video{position:relative;width:100%;height:100%;object-fit:cover}.vision-gif{left:24.5cqw;top:22.5cqw;width:27.7cqw;transform:rotate(7deg)}
    .funtech-way-scene>h2{position:absolute;z-index:4;left:2cqw;top:6cqw;font-size:5cqw;line-height:1.15}.funtech-way-scene>p{position:absolute;z-index:4;right:4cqw;bottom:5cqw;font-size:1.2cqw;line-height:2}.way-cards{position:absolute;inset:0}.way-card{position:absolute;z-index:2;top:11cqw;width:32cqw;height:32cqw;background:#1c1d1e;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2cqw;text-align:center}.way-card:nth-child(1){left:1cqw}.way-card:nth-child(2){left:34cqw}.way-card:nth-child(3){left:67cqw}.way-card small{position:relative;z-index:2;font:700 2cqw/1 "elevon",sans-serif}.way-card h3{position:relative;z-index:2;font-size:3.5cqw;line-height:1;white-space:pre-line}.way-card-volt{color:#dffe38}.way-card-breaker{color:#ff2929}.way-card-fun{color:#ff481b}
    .way-illustration{position:absolute;left:0;top:0;width:calc(100cqw - 98cqh);height:100%;opacity:.42}.way-copy{position:absolute;z-index:3;left:2cqw;top:50%;transform:translateY(-50%);display:flex;flex-direction:column;align-items:flex-start;gap:2cqw}.way-copy small{font:700 2cqw/1 "elevon",sans-serif;color:var(--accent)}.way-copy h2{font-size:5cqw;line-height:.95;white-space:pre-line;color:var(--accent)}.way-copy p{font-size:1.2cqw;line-height:2;white-space:pre-line;color:var(--accent)}.way-video{position:absolute;right:2cqh;top:2%;height:96%;aspect-ratio:1;background:#1c1d1e;overflow:hidden}
    .logo-details-scene>h2,.logo-variation-scene>h2{position:absolute;z-index:4;left:2cqw;top:6cqw;font-size:5cqw;line-height:1.15}.detail-gif{z-index:8;left:52.676cqw;top:.865cqw;width:19.175cqw}.detail-cards{position:absolute;inset:0;z-index:3}.detail-card{position:absolute;width:30cqw;display:flex;flex-direction:column;gap:1cqw;animation:detail-in .6s cubic-bezier(.645,.045,.355,1) both}.detail-1{left:2cqw;top:14cqw}.detail-2{left:35cqw;top:9cqw;animation-delay:.05s}.detail-3{right:2cqw;top:2cqw;animation-delay:.1s}.detail-art{position:relative;width:100%;aspect-ratio:1;background:#1c1d1e;overflow:hidden}.detail-art>img{position:absolute;inset:0;width:100%;height:100%;object-fit:contain}.detail-art>div{position:absolute;z-index:2;left:.9cqw;bottom:1cqw}.detail-art small{font:500 1cqw/1 "elevon",sans-serif}.detail-art h3{font-size:2.45cqw;line-height:1;white-space:pre-line}.detail-card>p{font-size:1.1cqw;line-height:2;white-space:pre-line}
    .variation-card{position:absolute;z-index:2;width:30cqw;height:30cqw;background:#1c1d1e center/cover;display:grid;place-items:center;animation:variation-drop .8s cubic-bezier(.34,1.56,.64,1) both;transition:translate .35s cubic-bezier(.25,1,.5,1)}.variation-card:hover{translate:0 -1.2cqw}.variation-card>img{width:24cqw;height:auto}.variation-card>span{position:absolute;z-index:3;padding:.18cqw .35cqw;background:#1c1d1e;color:var(--accent);font:500 1.4cqw/1 "elevon",sans-serif}.variation-card>span:first-of-type{left:1.05cqw;top:1.05cqw}.variation-card>span:last-of-type{right:1.05cqw;bottom:1.05cqw}
    .special-bg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}.special-scene:after{content:"";position:absolute;inset:0;box-shadow:inset 0 0 6.5cqw 3.2cqw #1c1d1e40;pointer-events:none}.special-item,.special-gif{position:absolute;z-index:2;height:auto;object-fit:contain;animation:variation-drop .7s cubic-bezier(.34,1.56,.64,1) both}.special-copy{position:absolute;z-index:6;left:50%;top:13.9cqw;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;text-align:center}.special-copy h2{padding:0 .8cqw;background:#1c1d1e;font-size:5.2cqw;line-height:1.1}.special-copy h2 b{font:500 1em "elevon",sans-serif}.special-copy p{margin-top:3.85cqw;font-size:1.2cqw;line-height:2}.special-copy a{margin-top:2cqw;padding:1cqw 1.5cqw;background:var(--accent);color:#1c1d1e;font-weight:900}
    .ending-scene>h2{position:absolute;z-index:3;left:2cqw;top:6cqw;font-size:5cqw}.ending-columns{position:absolute;z-index:3;left:2cqw;right:2cqw;top:30cqh;display:flex;justify-content:space-between}.ending-columns p{width:29cqw;font-size:1.3cqw;line-height:2;white-space:pre-line}.ending-gif{left:53.38cqw;top:-5.257cqw;width:25.347cqw}
    .member-scene{display:grid;grid-template-columns:repeat(5,1fr);grid-template-rows:repeat(3,1fr)}.member-cell{position:relative;overflow:hidden;min-width:0;min-height:0}.member-cell img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}.member-cell img+img{opacity:0;transition:opacity .3s}.member-cell img+img.on{opacity:1}
    .fin-atlas{position:absolute;z-index:1;right:-8cqw;top:-18cqw;width:65cqw;height:65cqw;object-fit:contain;opacity:.45;transform:rotate(-9deg)}.fin-cards{position:absolute;z-index:3;inset:0;display:flex;align-items:center;justify-content:center;gap:2cqw}.fin-cards a{position:relative;width:24cqw;height:21cqw;padding:1cqw;background:#141516;color:#f2eeeb;transition:transform .35s cubic-bezier(.25,1,.5,1)}.fin-cards a:hover{transform:translateY(-1cqw)}.fin-cards img{width:100%;height:15.8cqw;object-fit:cover}.fin-cards span{display:block;margin-top:1cqw;font:500 1.2cqw/1 "elevon",sans-serif}.fin-cards b{position:absolute;right:1cqw;bottom:1cqw;color:var(--accent)}
    @keyframes scene-in{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}@keyframes manga-mask{to{-webkit-mask-position:100% 0;mask-position:100% 0}}@keyframes noise-cycle{0%,32.999%{transform:translateX(0)}33%,65.999%{transform:translateX(-33.3333%)}66%,to{transform:translateX(-66.6667%)}}@keyframes detail-in{from{opacity:0;transform:translateY(16px)}}@keyframes variation-drop{from{opacity:0;translate:0 -50cqw;rotate:40deg}}@keyframes edge-h{to{background-position:0 -325px}}@keyframes edge-v{to{background-position:-325px 0}}@keyframes home-float{to{translate:0 -1cqw;rotate:2deg}}@keyframes archive-pan{to{transform:scale(1.08) translate(-2%,1%)}}
  `}</style></>;
}
