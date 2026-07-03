"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Theme = "volt" | "victory" | "fun";
type IntroState = "loading" | "sound" | "entered";

const chapters = [
  ["01", "HOME", "home"], ["02", "BRAND MESSAGE", "brand-message"],
  ["03", "CI UPDATE", "ci-update"], ["04", "VISION VISUAL", "vision-visual"],
  ["05", "FUNTECH WAY", "funtech-way"], ["06", "A MILLION-VOLT CREATIVE", "megavolt-creative"],
  ["07", "BREAKERS OF VICTORY", "breakers-of-victory"], ["08", "ALL FOR FUN", "all-for-fun"],
  ["09", "LOGO DETAILS", "logo-details"], ["10", "LOGO VARIATION", "logo-variation"],
  ["11", "10th SPECIAL ITEM", "10th-special-item"], ["12", "ENDING MESSAGE", "ending-message"],
  ["13", "WE ARE FUNTECH", "we-are-funtech"], ["14", "FIN", "fin"],
] as const;

const details = [
  {
    code: "DETAILS_01", title: <>Play Technology<br />All In</>,
    body: <>Boyish in impulse, street in style. A playful,<br />boundary-breaking spirit in a cartoon-inspired look<br />with charm and a hint of edge. Unbound by<br />convention, it goes all in on playing with creativity.</>,
    art: "play",
  },
  {
    code: "DETAILS_02", title: <>Star Creators</>,
    body: <>We are a collective of star creators who shine with<br />originality.<br />The stars woven into the “U” and “C” continue to<br />illuminate the kind of organization FunTech strives to<br />be.</>,
    art: "star",
  },
  {
    code: "DETAILS_03", title: <>Ever-Evolving</>,
    body: <>Its ever-shifting form is a style built to play boldly<br />through an unpredictable era.<br />No matter how technology or the environment<br />changes, we ride those waves with a sense of play.</>,
    art: "evolve",
  },
] as const;

function NoiseBorder() {
  return <><i className="edge edge-t" /><i className="edge edge-r" /><i className="edge edge-b" /><i className="edge edge-l" /></>;
}

function DetailArt({ type }: { type: string }) {
  if (type === "star") return <div className="art art-star"><span /><span /><span /><span className="spark">✦</span></div>;
  if (type === "evolve") return <div className="art art-evolve"><b /><b /><b /><b /><i>✦</i></div>;
  return <div className="art art-play"><span className="flame">●</span><span className="shoe">Fun-kun<br />Shoes!</span><span className="fire">Fun-kun<br />Fire!</span></div>;
}

export default function ExperienceFrame() {
  const [intro, setIntro] = useState<IntroState>("loading");
  const [progress, setProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>("volt");
  const [activeDetail, setActiveDetail] = useState(0);
  const lastWheel = useRef(0);
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

  useEffect(() => {
    if (intro !== "loading") return;
    const started = Date.now();
    const timer = window.setInterval(() => {
      const value = Math.min(100, Math.round((Date.now() - started) / 22));
      setProgress(value);
      if (value === 100) {
        window.clearInterval(timer);
        window.setTimeout(() => setIntro("sound"), 450);
      }
    }, 22);
    return () => window.clearInterval(timer);
  }, [intro]);

  function handleWheel(event: React.WheelEvent) {
    if (intro !== "entered" || menuOpen || Math.abs(event.deltaY) < 10) return;
    const now = Date.now();
    if (now - lastWheel.current < 420) return;
    lastWheel.current = now;
    setActiveDetail((current) => Math.max(0, Math.min(2, current + (event.deltaY > 0 ? 1 : -1))));
  }

  return (
    <main className="viewport" data-theme={theme} onWheel={handleWheel}>
      <div className={`stage ${intro === "entered" ? "is-entered" : ""}`}>
        <div className="ambient"><span>LOGODETAILS</span><span>LOGODETAILS</span><span>LOGODETAILS</span><span>LOGODETAILS</span></div>

        <aside className="rail" aria-label="Chapter navigation">
          <NoiseBorder />
          <div className="rail-scroll">
            {chapters.map(([number, label, slug]) => (
              <a className={number === "09" ? "current" : ""} href={`#${slug}`} key={number}>
                <Image src={`${basePath}/assets/thumbnails/${slug}.webp`} alt="" width={1024} height={576} unoptimized />
                <span><b>{number}</b> {label}</span>
              </a>
            ))}
          </div>
        </aside>

        <section className="workspace">
          <NoiseBorder />
          <header className="work-head">
            <span>09. LOGO DETAILS ▣</span>
            <h1>Logo Details</h1>
          </header>
          <div className="scribble scribble-a" /><div className="scribble scribble-b" />
          <div className="cards" style={{ "--active": activeDetail } as React.CSSProperties}>
            {details.map((detail, index) => (
              <article className={`detail-card card-${index + 1} ${activeDetail === index ? "active" : ""}`} key={detail.code}>
                <DetailArt type={detail.art} />
                <div className="detail-copy">
                  <small>{detail.code}</small>
                  <h2>{detail.title}</h2>
                  <p>{detail.body}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="scroll-meter" aria-label={`Detail ${activeDetail + 1} of 3`}>
            {[0, 1, 2].map((item) => <button key={item} aria-label={`Show detail ${item + 1}`} className={activeDetail === item ? "active" : ""} onClick={() => setActiveDetail(item)} />)}
          </div>
        </section>

        <div className="themes" aria-label="Visual theme">
          <button className={theme === "volt" ? "active" : ""} onClick={() => setTheme("volt")} aria-label="Million-Volt theme">⚡</button>
          <button className={theme === "victory" ? "active" : ""} onClick={() => setTheme("victory")} aria-label="Victory theme">🏆</button>
          <button className={theme === "fun" ? "active" : ""} onClick={() => setTheme("fun")} aria-label="All for Fun theme">🎉</button>
        </div>

        <footer className="bottom-bar">
          <NoiseBorder />
          <a href="#all-for-fun" className="previous"><b>←</b><span><em>08.</em> ALL FOR FUN</span></a>
          <div className="bar-actions">
            <a href={`${basePath}/reference/logo-details-desktop.png`}>PDF ⇩</a>
            <button className="menu-button" onClick={() => setMenuOpen(true)}>MENU <i>⌘</i></button>
            <button aria-label="Sound">▥</button><button>JP</button><button className="selected">EN</button>
          </div>
          <a href="#logo-variation" className="next"><span><em>10.</em> LOGO VARIATION</span><b>→</b></a>
        </footer>

        <section className={`menu ${menuOpen ? "open" : ""}`} aria-hidden={!menuOpen}>
          <NoiseBorder />
          <div className="menu-grid">
            {chapters.map(([number, label, slug]) => (
              <a href={`#${slug}`} className={number === "09" ? "current" : ""} key={number} onClick={() => setMenuOpen(false)}>
                <Image src={`${basePath}/assets/thumbnails/${slug}.webp`} alt="" width={1024} height={576} unoptimized />
                <span><b>{number}.</b> {label}</span>
              </a>
            ))}
          </div>
          <div className="menu-foot"><a href="https://funtech.inc/">CORPORATE SITE ↗</a><a href="https://www.wantedly.com/companies/fun-tech">WANTEDLY ↗</a><button onClick={() => setMenuOpen(false)}>MENU ×</button><span>▥　 JP　 <b>EN</b></span></div>
        </section>

        {intro !== "entered" && <section className={`intro intro-${intro}`}>
          {intro === "loading" ? <>
            <div className="loader-mark"><div className="helmet">︵<span>⌁⌁</span></div><div className="load-number">{progress}%</div></div>
            <svg className="lightning" viewBox="0 0 900 500" aria-hidden="true"><path d="M20 50 L180 250 L360 105 L430 330 L590 190 L670 390 L875 265" pathLength="100" style={{ strokeDashoffset: 100 - progress }} /></svg>
          </> : <div className="sound-gate">
            <h2>FOR THE BEST EXPERIENCE.<br />PLEASE TURN ON SOUND.</h2>
            <div><button onClick={() => setIntro("entered")}><b>▥</b><span>ON</span></button><button onClick={() => setIntro("entered")}><b>▧</b><span>OFF</span></button></div>
          </div>}
        </section>}
      </div>

      <style jsx global>{`
        .viewport{--accent:#ff481b;--accent2:#ffb400;width:100%;height:100%;min-width:1440px;min-height:1000px;overflow:hidden;background:#1c1d1e;color:#f5f3ee;font-family:Arial,Helvetica,sans-serif}
        .viewport[data-theme="victory"]{--accent:#d9ff22;--accent2:#ff481b}.viewport[data-theme="fun"]{--accent:#8d5cff;--accent2:#39e6ff}
        .stage{position:relative;width:1440px;height:1000px;padding:8px;overflow:hidden;background:#1c1d1e}.rail,.workspace,.themes,.bottom-bar,.ambient{opacity:0;transform:scale(1.015);transition:opacity .8s ease,transform 1.1s cubic-bezier(.25,1,.5,1)}.stage.is-entered .rail,.stage.is-entered .workspace,.stage.is-entered .themes,.stage.is-entered .bottom-bar,.stage.is-entered .ambient{opacity:1;transform:none}
        .ambient{position:absolute;inset:8px;overflow:hidden;opacity:.025;pointer-events:none;transform:rotate(-13deg) scale(1.4);display:flex;flex-direction:column;justify-content:center}.ambient span{font-weight:1000;font-size:190px;line-height:.8;white-space:nowrap;color:var(--accent);animation:marquee 14s linear infinite}.ambient span:nth-child(even){transform:translateX(-420px);animation-direction:reverse}
        .edge{position:absolute;z-index:8;pointer-events:none;background:var(--accent);filter:url(#none);opacity:.9}.edge-t,.edge-b{left:0;width:100%;height:2px}.edge-t{top:0}.edge-b{bottom:0}.edge-l,.edge-r{top:0;height:100%;width:2px}.edge-l{left:0}.edge-r{right:0}
        .rail{position:absolute;left:8px;top:8px;width:200px;height:928px;background:#191a1b;overflow:hidden}.rail-scroll{height:100%;overflow-y:auto;scroll-snap-type:y mandatory;padding:8px 9px 20px 16px;scrollbar-width:none}.rail-scroll::-webkit-scrollbar{display:none}.rail a{display:block;scroll-snap-align:center;height:134px;padding:7px 0;color:#7c7770;text-decoration:none;opacity:.58;transition:opacity .3s,color .3s,transform .3s}.rail a:hover,.rail a.current{opacity:1;color:#f5f3ee;transform:translateX(2px)}.rail img{display:block;width:172px;height:96px;object-fit:cover;border:1px solid #3b3834}.rail a.current img{border-color:var(--accent)}.rail span{display:block;margin-top:6px;font-size:11px;font-weight:700}.rail b{color:var(--accent)}
        .workspace{position:absolute;left:208px;top:8px;width:1209px;height:928px;overflow:hidden;background:#1c1d1e}.workspace:before{content:"";position:absolute;inset:0;background:repeating-linear-gradient(-135deg,rgba(255,255,255,.025) 0 1px,transparent 1px 5px);pointer-events:none}.work-head{position:absolute;z-index:4;left:20px;top:125px}.work-head span{display:inline-block;position:relative;z-index:2;padding:6px 22px;border:1px solid var(--accent);border-radius:20px;background:#1c1d1e;color:#fff;font-size:13px;font-weight:800;letter-spacing:.06em}.work-head h1{position:relative;z-index:2;color:#fff;margin:26px 0 0;font-size:54px;line-height:1;font-weight:900;letter-spacing:-.03em}.work-head:after{content:"";position:absolute;left:-25px;top:-16px;width:400px;height:150px;border-top:14px solid var(--accent);border-left:130px solid transparent;transform:skewX(-28deg);z-index:1;opacity:.95}
        .cards{position:absolute;left:23px;right:23px;top:290px;bottom:110px;display:grid;grid-template-columns:1fr 1fr 1fr;gap:34px;transition:transform .7s cubic-bezier(.25,1,.5,1)}.detail-card{position:relative;min-width:0;opacity:.76;transform:translateY(0);transition:opacity .55s,transform .55s}.detail-card.active{opacity:1;transform:translateY(-12px)}.detail-card:nth-child(2){margin-top:-58px}.detail-card:nth-child(3){margin-top:-155px}.art{position:relative;height:365px;border:1px solid var(--accent);overflow:hidden;background:#202122}.detail-card:nth-child(3) .art{height:365px}.detail-copy{padding:14px 8px}.detail-copy small{font-size:12px;font-weight:900;letter-spacing:.05em}.detail-copy h2{font-size:28px;line-height:1.05;margin:6px 0 20px}.detail-copy p{font-size:13px;line-height:2;margin:0;color:#f2eee8}.art-play:before,.art-play:after{content:"";position:absolute;border-radius:50%;background:#2b2c2d}.art-play:before{width:235px;height:235px;left:0;top:15px}.art-play:after{width:180px;height:180px;right:-25px;bottom:-20px}.flame{position:absolute;z-index:2;left:96px;top:40px;width:110px;height:145px;border-radius:52% 48% 60% 40%;background:var(--accent);color:var(--accent);clip-path:polygon(45% 0,62% 37%,100% 20%,83% 72%,50% 100%,15% 75%,0 42%,28% 52%)}.shoe,.fire{position:absolute;z-index:3;color:var(--accent);font-weight:900;letter-spacing:.06em}.shoe{right:26px;bottom:72px}.fire{left:80px;top:18px}.art-star span:not(.spark){position:absolute;width:175px;height:175px;border:1px solid color-mix(in srgb,var(--accent),transparent 45%);border-radius:50%}.art-star span:nth-child(1){left:30px;top:38px}.art-star span:nth-child(2){right:30px;top:38px}.art-star span:nth-child(3){left:30px;bottom:35px}.art-star span:nth-child(4){right:30px;bottom:35px}.spark{position:absolute;inset:50% auto auto 50%;transform:translate(-50%,-50%);font-size:115px;color:var(--accent);line-height:1}.art-evolve{background:#202122;display:grid;grid-template-columns:1fr 1fr;gap:16px;padding:28px}.art-evolve b{background:var(--accent);border-radius:60% 40% 55% 45%;transform:rotate(23deg)}.art-evolve b:nth-child(2){transform:rotate(-35deg)}.art-evolve b:nth-child(3){transform:rotate(66deg)}.art-evolve i{position:absolute;inset:44% auto auto 44%;font-size:54px;color:#202122}
        .scribble{position:absolute;z-index:5;width:22px;height:290px;background:var(--accent);clip-path:polygon(10% 0,100% 12%,25% 35%,90% 52%,10% 73%,78% 100%,0 92%,40% 65%,0 48%,50% 27%)}.scribble-a{left:405px;top:195px}.scribble-b{right:2px;top:310px;transform:rotate(12deg)}.scroll-meter{position:absolute;z-index:6;right:26px;bottom:22px;display:flex;gap:8px}.scroll-meter button{width:28px;height:4px;padding:0;border:0;background:#5e5954;cursor:pointer}.scroll-meter button.active{background:var(--accent)}
        .themes{position:absolute;z-index:7;right:20px;top:16px;display:flex;background:var(--accent)}.themes button{width:38px;height:40px;border:0;background:transparent;filter:grayscale(1);cursor:pointer}.themes button.active{filter:none;box-shadow:inset 0 0 0 2px #1c1d1e}
        .bottom-bar{position:absolute;left:8px;bottom:8px;width:1409px;height:56px;background:#171819;display:flex;align-items:center;justify-content:space-between}.bottom-bar a{color:#bbb5ae;text-decoration:none}.previous,.next{display:flex;align-items:center;height:100%;gap:14px;padding:0 12px;font-size:16px;letter-spacing:.06em}.previous b,.next b{display:grid;place-items:center;width:40px;height:40px;background:var(--accent);color:#1c1d1e;font-size:22px}.previous em,.next em{color:var(--accent);font-style:normal}.bar-actions{display:flex;align-items:center;gap:10px;height:100%}.bar-actions>a,.bar-actions>button{height:42px;min-width:42px;padding:0 14px;border:0;background:#303132;color:#aaa;display:grid;place-items:center;cursor:pointer}.bar-actions .menu-button{width:160px;background:var(--accent);color:#1c1d1e;font-weight:800;display:flex;justify-content:center;gap:18px}.bar-actions .selected{box-shadow:inset 0 0 0 2px #3c3d3e;color:#fff}
        .menu{position:absolute;z-index:20;inset:8px;width:1409px;height:984px;background:#1c1d1e;padding:30px 18px 70px;opacity:0;visibility:hidden;transform:translateY(24px);transition:opacity .35s,transform .55s cubic-bezier(.25,1,.5,1),visibility 0s .55s}.menu.open{opacity:1;visibility:visible;transform:none;transition-delay:0s}.menu-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:10px 12px}.menu-grid a{height:238px;background:#303132;padding:8px;color:#eee;text-decoration:none;transition:transform .25s,background .25s}.menu-grid a:hover{transform:translateY(-4px);background:#3a3b3c}.menu-grid a.current{opacity:.35}.menu-grid img{width:100%;height:180px;object-fit:cover}.menu-grid span{display:block;padding:11px 0 0;font-size:16px}.menu-grid b{color:var(--accent)}.menu-foot{position:absolute;left:12px;right:12px;bottom:8px;height:46px;display:flex;align-items:center;gap:7px}.menu-foot a,.menu-foot button{height:42px;padding:0 14px;background:#3a3b3c;color:#fff;border:0;text-decoration:none;display:grid;place-items:center}.menu-foot button{margin-left:auto;width:160px;background:var(--accent);color:#1c1d1e}.menu-foot span{margin-left:auto}
        .intro{position:absolute;z-index:100;inset:0;background:#020303;display:grid;place-items:center;color:#f5f3ee}.loader-mark{position:relative;width:300px;height:320px}.helmet{position:absolute;inset:0;border-radius:50%;border:16px solid #161717;display:grid;place-items:center;font-size:140px;color:#252627;box-shadow:inset 0 0 40px #000}.helmet span{position:absolute;font-size:55px;color:#b6d127}.load-number{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);font-size:36px;font-weight:1000}.lightning{position:absolute;width:920px;overflow:visible}.lightning path{fill:none;stroke:#fff;stroke-width:12;stroke-linecap:square;filter:drop-shadow(0 0 8px var(--accent)) drop-shadow(0 0 18px var(--accent));stroke-dasharray:100;transition:stroke-dashoffset .08s linear}.sound-gate{text-align:center}.sound-gate h2{font-size:25px;line-height:1.15;letter-spacing:.02em;margin-bottom:44px}.sound-gate>div{display:flex;gap:35px}.sound-gate button{width:180px;height:180px;border-radius:50%;border:1px solid var(--accent);background:transparent;color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:22px;cursor:pointer;transition:background .3s,color .3s,transform .3s}.sound-gate button:first-child,.sound-gate button:hover{background:var(--accent);color:#171819;transform:scale(1.04)}.sound-gate b{font-size:30px}.sound-gate span{font-size:13px;letter-spacing:.2em;font-weight:800}
        @keyframes marquee{to{transform:translateX(-25%)}}
        @media(max-width:800px){.stage{transform-origin:left top}.menu-grid{grid-template-columns:repeat(4,335px)}}
      `}</style>
    </main>
  );
}
