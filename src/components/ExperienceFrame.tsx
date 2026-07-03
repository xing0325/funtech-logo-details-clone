"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Theme = "volt" | "victory" | "fun";
type IntroState = "loading" | "sound" | "opening" | "entered";

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
    art: "detail-01",
  },
  {
    code: "DETAILS_02", title: <>Star Creators</>,
    body: <>We are a collective of star creators who shine with<br />originality.<br />The stars woven into the “U” and “C” continue to<br />illuminate the kind of organization FunTech strives to<br />be.</>,
    art: "detail-02",
  },
  {
    code: "DETAILS_03", title: <>Ever-Evolving</>,
    body: <>Its ever-shifting form is a style built to play boldly<br />through an unpredictable era.<br />No matter how technology or the environment<br />changes, we ride those waves with a sense of play.</>,
    art: "detail-03",
  },
] as const;

function NoiseBorder() {
  return <><i className="edge edge-t" /><i className="edge edge-r" /><i className="edge edge-b" /><i className="edge edge-l" /></>;
}

export default function ExperienceFrame() {
  const [intro, setIntro] = useState<IntroState>("loading");
  const [progress, setProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>("volt");
  const [openingFrame, setOpeningFrame] = useState(0);
  const [transitionDirection, setTransitionDirection] = useState<"prev" | "next" | null>(null);
  const wheelState = useRef({ accumulatedDeltaY: 0, direction: null as "prev" | "next" | null, lastNavigationAt: null as number | null, lastWheelAt: null as number | null });
  const railRef = useRef<HTMLDivElement>(null);
  const bgmRef = useRef<HTMLAudioElement>(null);
  const lightningAudioRef = useRef<HTMLAudioElement>(null);
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

  useEffect(() => {
    if (intro !== "loading") return;
    const started = Date.now();
    const timer = window.setInterval(() => {
      const value = Math.min(100, Math.round((Date.now() - started) / 8));
      setProgress(value);
      if (value === 100) {
        window.clearInterval(timer);
        window.setTimeout(() => setIntro("sound"), 200);
      }
    }, 25);
    return () => window.clearInterval(timer);
  }, [intro]);

  useEffect(() => {
    if (intro !== "opening") return;
    const started = performance.now();
    let animationFrame = 0;
    const tick = (now: number) => {
      const elapsed = Math.max(0, (now - started) / 1000);
      const ramp = 2.4;
      const initialFps = 1.25;
      const peakFps = 36;
      const integral = elapsed <= ramp
        ? initialFps * elapsed + (peakFps - initialFps) * ramp * ((elapsed / ramp) ** 4 / 4)
        : initialFps * ramp + (peakFps - initialFps) * ramp * 0.25 + peakFps * (elapsed - ramp);
      setOpeningFrame(Math.floor(integral) % 8);
      if (elapsed < 3.4) animationFrame = window.requestAnimationFrame(tick);
      else setIntro("entered");
    };
    animationFrame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(animationFrame);
  }, [intro]);

  useEffect(() => {
    if (intro !== "entered") return;
    const frame = window.requestAnimationFrame(() => {
      railRef.current?.querySelector(".current")?.scrollIntoView({ block: "center", behavior: "smooth" });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [intro]);

  function handleWheel(event: React.WheelEvent) {
    if (intro !== "entered" || menuOpen) return;
    const now = performance.now();
    const normalized = event.deltaMode === 1 ? event.deltaY * 40 : event.deltaMode === 2 ? event.deltaY * Math.max(1, window.innerHeight) : event.deltaY;
    if (Math.abs(normalized) < 4) return;
    const state = wheelState.current;
    if (state.lastNavigationAt !== null && (now - state.lastNavigationAt < 800 || (state.lastWheelAt !== null && now - state.lastWheelAt <= 220))) {
      wheelState.current = { ...state, accumulatedDeltaY: 0, direction: null, lastWheelAt: now };
      return;
    }
    const direction = normalized > 0 ? "next" : "prev";
    const accumulated = state.lastWheelAt === null || now - state.lastWheelAt > 220 || (state.direction !== null && state.direction !== direction)
      ? normalized
      : state.accumulatedDeltaY + normalized;
    if (Math.abs(accumulated) >= 180) {
      wheelState.current = { accumulatedDeltaY: 0, direction: null, lastNavigationAt: now, lastWheelAt: now };
      setTransitionDirection(direction);
      window.setTimeout(() => setTransitionDirection(null), 800);
    } else {
      wheelState.current = { ...state, accumulatedDeltaY: accumulated, direction, lastNavigationAt: null, lastWheelAt: now };
    }
  }

  function enterWithSound(enabled: boolean) {
    if (enabled) {
      if (bgmRef.current) {
        bgmRef.current.currentTime = 16.5;
        bgmRef.current.volume = 0.2;
        void bgmRef.current.play().catch(() => {});
      }
      if (lightningAudioRef.current) {
        lightningAudioRef.current.currentTime = 0;
        lightningAudioRef.current.volume = 0.55;
        void lightningAudioRef.current.play().catch(() => {});
      }
    }
    setIntro("opening");
  }

  return (
    <main className="viewport" data-theme={theme} onWheel={handleWheel}>
      <audio ref={bgmRef} src={`${basePath}/assets/opening/sound/bgm.mp3`} preload="auto" loop />
      <audio ref={lightningAudioRef} src={`${basePath}/assets/opening/sound/lightning.aac`} preload="auto" />
      <div className={`stage ${intro === "entered" ? "is-entered" : ""}`}>
        <div className="ambient"><span>LOGODETAILS</span><span>LOGODETAILS</span><span>LOGODETAILS</span><span>LOGODETAILS</span></div>

        <aside className="rail" aria-label="Chapter navigation">
          <NoiseBorder />
          <div className="rail-scroll" ref={railRef}>
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
          <div className="title-loop" aria-hidden="true">{Array.from({ length: 6 }, (_, index) => <span key={index}>LOGODETAILSLOGODETAILS</span>)}</div>
          <div className="content-fx" aria-hidden="true">
            <div className="manga-frame" />
          </div>
          <svg className="main-lightning" viewBox="0 0 1209 680" preserveAspectRatio="none" aria-hidden="true">
            <g className="bolt bolt-a"><path className="bolt-shadow" d="M-30 185C62 155 105 270 185 280S287 180 385 232 470 302 545 254" /><path className="bolt-core" d="M-30 185C62 155 105 270 185 280S287 180 385 232 470 302 545 254" /></g>
            <g className="bolt bolt-b"><path className="bolt-shadow" d="M842 294C920 340 977 342 1032 374S1134 350 1240 294" /><path className="bolt-core" d="M842 294C920 340 977 342 1032 374S1134 350 1240 294" /></g>
          </svg>
          <span className="section-label">09. LOGO DETAILS ▣</span>
          <header className="work-head">
            <h1>Logo Details</h1>
          </header>
          <Image className="sticker-gif" src={`${basePath}/assets/logo-details/zyan.gif`} alt="" width={990} height={1080} unoptimized />
          <div className="cards">
            {details.map((detail, index) => (
              <article className={`detail-card card-${index + 1}`} key={detail.code}>
                <div className="art">
                  <NoiseBorder />
                  <Image src={`${basePath}/assets/logo-details/${detail.art}.svg`} alt="" width={380} height={380} unoptimized />
                  <div className="detail-title">
                  <small>{detail.code}</small>
                  <h2>{detail.title}</h2>
                  </div>
                </div>
                <p>{detail.body}</p>
              </article>
            ))}
          </div>
        </section>

        <div className={`route-transition ${transitionDirection ?? ""}`} aria-hidden={!transitionDirection}>
          <span>{transitionDirection === "next" ? "10. LOGO VARIATION" : "08. ALL FOR FUN"}</span>
          <svg viewBox="0 0 900 500"><path d="M10 245L170 90l110 245 145-210 145 280 120-230 200 105" /></svg>
        </div>

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
            <div className="opening-scroll-text loading-text" aria-hidden="true">{Array.from({ length: 6 }, (_, index) => <span key={index}>FUNTECHBRANDIDENTITYFUNTECHBRANDIDENTITY</span>)}</div>
            <div className="opening-logo loading-logo" style={{ backgroundPosition: `${(Math.floor(progress / 20) % 4) * 100 / 3}% ${Math.floor((Math.floor(progress / 20) % 8) / 4) * 100}%` }} />
            <div className="lightning-field sparse" aria-hidden="true">{Array.from({ length: 8 }, (_, index) => <Image key={index} src={`${basePath}/assets/opening/lightning.png`} alt="" width={512} height={256} unoptimized style={{ "--i": index } as React.CSSProperties} />)}</div>
            <div className="loading-ui"><span>{progress}%</span><i><b style={{ transform: `scaleX(${progress / 100})` }} /></i></div>
          </> : intro === "sound" ? <div className="sound-gate">
            <h2>FOR THE BEST EXPERIENCE.<br />PLEASE TURN ON SOUND.</h2>
            <div><button onClick={() => enterWithSound(true)}><b>▥</b><span>ON</span></button><button onClick={() => enterWithSound(false)}><b>▧</b><span>OFF</span></button></div>
          </div> : <div className="opening-sequence">
            <div className="opening-scroll-text" aria-hidden="true">{Array.from({ length: 6 }, (_, index) => <span key={index}>FUNTECHBRANDIDENTITYFUNTECHBRANDIDENTITY</span>)}</div>
            <div className="opening-logo" style={{ backgroundPosition: `${(openingFrame % 4) * 100 / 3}% ${Math.floor(openingFrame / 4) * 100}%` }} />
            <div className="lightning-field" aria-hidden="true">{Array.from({ length: 36 }, (_, index) => <Image key={index} src={`${basePath}/assets/opening/lightning.png`} alt="" width={512} height={256} unoptimized style={{ "--i": index } as React.CSSProperties} />)}</div>
          </div>}
        </section>}
      </div>

      <style jsx global>{`
        .viewport{--accent:#ff481b;--accent2:#ffb400;width:100%;height:100%;min-width:1440px;min-height:1000px;overflow:hidden;background:#1c1d1e;color:#f5f3ee;font-family:Arial,Helvetica,sans-serif}
        .viewport[data-theme="victory"]{--accent:#d9ff22;--accent2:#ff481b}.viewport[data-theme="fun"]{--accent:#8d5cff;--accent2:#39e6ff}
        .stage{position:relative;width:1440px;height:1000px;padding:8px;overflow:hidden;background:#1c1d1e}.rail,.workspace,.themes,.bottom-bar,.ambient{opacity:0;transform:scale(1.015);transition:opacity .8s ease,transform 1.1s cubic-bezier(.25,1,.5,1)}.stage.is-entered .rail,.stage.is-entered .workspace,.stage.is-entered .themes,.stage.is-entered .bottom-bar,.stage.is-entered .ambient{opacity:1;transform:none}
        .ambient{position:absolute;inset:8px;overflow:hidden;opacity:.025;pointer-events:none;transform:rotate(-13deg) scale(1.4);display:flex;flex-direction:column;justify-content:center}.ambient span{font-weight:1000;font-size:190px;line-height:.8;white-space:nowrap;color:var(--accent);animation:marquee 14s linear infinite}.ambient span:nth-child(even){transform:translateX(-420px);animation-direction:reverse}
        .edge{position:absolute;z-index:8;pointer-events:none;opacity:1;background-color:transparent}.edge-t,.edge-b{left:0;width:100%;height:10px;background-image:url("${basePath}/assets/noise-border/fun-h.png");background-repeat:repeat-x;background-size:128px 320px;background-position:0 -85px}.edge-t{top:0;transform:translateY(-50%)}.edge-b{bottom:0;transform:translateY(50%)}.edge-l,.edge-r{top:0;height:100%;width:10px;background-image:url("${basePath}/assets/noise-border/fun-v.png");background-repeat:repeat-y;background-size:320px 128px;background-position:-85px 0}.edge-l{left:0;transform:translateX(-50%)}.edge-r{right:0;transform:translateX(50%)}
        .rail{position:absolute;left:8px;top:8px;width:200px;height:928px;background:#191a1b;overflow:hidden}.rail-scroll{height:100%;overflow-y:auto;scroll-snap-type:y mandatory;padding:8px 9px 20px 16px;scrollbar-width:none}.rail-scroll::-webkit-scrollbar{display:none}.rail a{display:block;scroll-snap-align:center;height:134px;padding:7px 0;color:#7c7770;text-decoration:none;opacity:.58;transition:opacity .3s,color .3s,transform .3s}.rail a:hover,.rail a.current{opacity:1;color:#f5f3ee;transform:translateX(2px)}.rail img{display:block;width:172px;height:96px;object-fit:cover;border:1px solid #3b3834}.rail a.current img{border-color:var(--accent)}.rail span{display:block;margin-top:6px;font-size:11px;font-weight:700}.rail b{color:var(--accent)}
        .workspace{--content-offset:calc((100cqh - 56.25cqw)/2);position:absolute;left:208px;top:8px;width:1209px;height:928px;container-type:size;overflow:hidden;background:#1c1d1e}.workspace:before{content:"";position:absolute;inset:0;background:repeating-linear-gradient(-135deg,rgba(255,255,255,.025) 0 1px,transparent 1px 5px);pointer-events:none}.title-loop{display:none}.content-fx{position:absolute;z-index:1;left:0;top:var(--content-offset);width:100%;height:56.25cqw;overflow:hidden;pointer-events:none}.manga-frame{position:absolute;inset:0;background-image:url("${basePath}/assets/webgl/manga-d-sprite-key.png");background-repeat:no-repeat;background-size:400% 100%;background-position:0 0;animation:manga-idle 1s steps(4,end) infinite}.main-lightning{position:absolute;z-index:6;left:0;top:var(--content-offset);width:100%;height:56.25cqw;overflow:visible;pointer-events:none}.bolt{animation:main-lightning-jitter .18s steps(2,end) infinite alternate}.bolt-b{animation-delay:-.09s}.bolt-shadow,.bolt-core{fill:none;stroke-linecap:round;stroke-linejoin:round}.bolt-shadow{stroke:#020303;stroke-width:25}.bolt-core{stroke:var(--accent);stroke-width:8;filter:drop-shadow(0 0 2px #020303)}.section-label{position:absolute;z-index:3;left:1cqw;top:calc(var(--content-offset) + 1.45cqw);display:inline-block;width:17cqw;padding:6px 14px;border:1px solid var(--accent);border-radius:20px;background:#1c1d1e;color:#fff;font:800 1.05cqw/1 "elevon",sans-serif;letter-spacing:.06em}.work-head{position:absolute;z-index:3;left:2cqw;top:calc(var(--content-offset) + 6cqw)}.work-head h1{color:#fff;margin:0;font-size:5cqw;line-height:1.15;font-weight:900;letter-spacing:-.03em}.work-head:after{display:none}
        .cards{position:absolute;inset:0;z-index:2}.detail-card{position:absolute;width:30cqw;display:flex;flex-direction:column;gap:1cqw;opacity:0;transform:translateY(16px);animation:logo-detail-in .6s cubic-bezier(.645,.045,.355,1) forwards}.card-1{left:2cqw;top:calc(var(--content-offset) + 14cqw);animation-delay:0s}.card-2{left:0;right:0;top:calc(var(--content-offset) + 9cqw);margin:auto;animation-delay:.05s}.card-3{right:2cqw;top:calc(var(--content-offset) + 2cqw);animation-delay:.1s}.art{position:relative;width:100%;aspect-ratio:1;background:#1c1d1e;overflow:hidden}.art>img{position:absolute;inset:0;width:100%;height:100%;object-fit:contain}.detail-title{position:absolute;z-index:1;left:.9cqw;bottom:1cqw;display:flex;flex-direction:column;align-items:flex-start;gap:.45cqw}.detail-title small{font:400 1cqw/1 "elevon",sans-serif;letter-spacing:0}.detail-title h2{font-size:2.45cqw;line-height:1;margin:0;font-weight:700;letter-spacing:0}.detail-card>p{font-size:1.1cqw;font-weight:500;line-height:2;margin:0;white-space:normal}.sticker-gif{position:absolute;z-index:4;top:calc(var(--content-offset) + .865cqw);left:52.676cqw;width:19.175cqw;height:19.175cqw;object-fit:contain;pointer-events:none}
        .route-transition{position:absolute;z-index:60;inset:8px;background:#080909;display:grid;place-items:center;opacity:0;pointer-events:none;transition:opacity .18s}.route-transition.next,.route-transition.prev{opacity:1;animation:route-flash .8s ease both}.route-transition span{font:800 22px/1 "elevon",sans-serif;letter-spacing:.08em}.route-transition svg{position:absolute;width:80%;overflow:visible}.route-transition path{fill:none;stroke:var(--accent);stroke-width:16;filter:drop-shadow(0 0 9px var(--accent));stroke-dasharray:1200;stroke-dashoffset:1200;animation:route-bolt .75s ease-out forwards}
        .themes{position:absolute;z-index:7;right:20px;top:16px;display:flex;background:var(--accent)}.themes button{width:38px;height:40px;border:0;background:transparent;filter:grayscale(1);cursor:pointer}.themes button.active{filter:none;box-shadow:inset 0 0 0 2px #1c1d1e}
        .bottom-bar{position:absolute;left:8px;bottom:8px;width:1409px;height:56px;background:#171819;display:flex;align-items:center;justify-content:space-between}.bottom-bar a{color:#bbb5ae;text-decoration:none}.previous,.next{display:flex;align-items:center;height:100%;gap:14px;padding:0 12px;font-size:16px;letter-spacing:.06em}.previous b,.next b{display:grid;place-items:center;width:40px;height:40px;background:var(--accent);color:#1c1d1e;font-size:22px}.previous em,.next em{color:var(--accent);font-style:normal}.bar-actions{display:flex;align-items:center;gap:10px;height:100%}.bar-actions>a,.bar-actions>button{height:42px;min-width:42px;padding:0 14px;border:0;background:#303132;color:#aaa;display:grid;place-items:center;cursor:pointer}.bar-actions .menu-button{width:160px;background:var(--accent);color:#1c1d1e;font-weight:800;display:flex;justify-content:center;gap:18px}.bar-actions .selected{box-shadow:inset 0 0 0 2px #3c3d3e;color:#fff}
        .menu{position:absolute;z-index:20;inset:8px;width:1409px;height:984px;background:#1c1d1e;padding:30px 18px 70px;opacity:0;visibility:hidden;transform:translateY(24px);transition:opacity .35s,transform .55s cubic-bezier(.25,1,.5,1),visibility 0s .55s}.menu.open{opacity:1;visibility:visible;transform:none;transition-delay:0s}.menu-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:10px 12px}.menu-grid a{height:238px;background:#303132;padding:8px;color:#eee;text-decoration:none;transition:transform .25s,background .25s}.menu-grid a:hover{transform:translateY(-4px);background:#3a3b3c}.menu-grid a.current{opacity:.35}.menu-grid img{width:100%;height:180px;object-fit:cover}.menu-grid span{display:block;padding:11px 0 0;font-size:16px}.menu-grid b{color:var(--accent)}.menu-foot{position:absolute;left:12px;right:12px;bottom:8px;height:46px;display:flex;align-items:center;gap:7px}.menu-foot a,.menu-foot button{height:42px;padding:0 14px;background:#3a3b3c;color:#fff;border:0;text-decoration:none;display:grid;place-items:center}.menu-foot button{margin-left:auto;width:160px;background:var(--accent);color:#1c1d1e}.menu-foot span{margin-left:auto}
        .intro{position:fixed;z-index:100;inset:0;width:100vw;height:100dvh;background:#020303;display:grid;place-items:center;color:#f5f3ee;overflow:hidden}.opening-sequence{position:absolute;inset:0;isolation:isolate;overflow:hidden}.opening-scroll-text{position:absolute;inset:-25%;display:flex;flex-direction:column;justify-content:center;transform:rotate(-15deg);font:900 clamp(96px,22vw,340px)/.82 "elevon",sans-serif;color:#fff;opacity:.1;white-space:nowrap}.opening-scroll-text span{animation:opening-scroll .9s linear infinite}.opening-scroll-text span:nth-child(even){transform:translateX(-45%);animation-direction:reverse}.loading-text span{animation-duration:5.5s}.opening-logo{position:absolute;z-index:2;left:50%;top:50%;width:40vmin;height:40vmin;transform:translate(-50%,-50%);background-image:url("${basePath}/assets/opening/old-logos-atlas.webp");background-repeat:no-repeat;background-size:400% 200%;opacity:.8;filter:drop-shadow(0 0 18px rgba(255,72,27,.18));transition:transform .6s cubic-bezier(.25,1,.5,1),opacity .6s}.loading-logo{width:40vmin;height:40vmin}.lightning-field{position:absolute;z-index:3;inset:0;mix-blend-mode:hard-light;pointer-events:none}.lightning-field img{position:absolute;left:50%;top:50%;width:clamp(190px,34vw,620px);height:auto;opacity:0;transform-origin:0 50%;filter:drop-shadow(0 0 6px #fff) drop-shadow(0 0 16px var(--accent));animation:lightning-burst .72s steps(4,end) infinite;animation-delay:calc(var(--i) * -.037s);transform:rotate(calc(var(--i) * 47deg)) translateX(calc(4vmin + var(--i) * .45vmin)) scale(calc(.32 + var(--i) * .012))}.lightning-field.sparse img{animation-duration:2.1s;animation-delay:calc(var(--i) * -.21s);width:clamp(150px,25vw,420px)}.loading-ui{position:absolute;z-index:8;left:50%;top:50%;transform:translate(-50%,-50%);display:flex;flex-direction:column;align-items:center;gap:24px}.loading-ui>span{font:400 32px/1 "elevon",sans-serif;text-shadow:0 0 8px #000}.loading-ui>i{display:block;width:min(240px,50vw);height:3px;border-radius:99px;overflow:hidden;background:rgba(255,255,255,.4)}.loading-ui b{display:block;width:100%;height:100%;transform-origin:left;background:var(--accent);transition:transform .025s linear}.sound-gate{text-align:center}.sound-gate h2{font:800 25px/1.15 "elevon",sans-serif;letter-spacing:.02em;margin-bottom:44px}.sound-gate>div{display:flex;gap:40px}.sound-gate button{width:180px;height:180px;border-radius:50%;border:1px solid var(--accent);background:transparent;color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:22px;cursor:pointer;transition:background .3s,color .3s,transform .3s}.sound-gate button:first-child,.sound-gate button:hover{background:var(--accent);color:#171819;transform:scale(1.04)}.sound-gate b{font-size:30px}.sound-gate span{font:800 13px/1 "elevon",sans-serif;letter-spacing:.2em}
        @keyframes marquee{to{transform:translateX(-25%)}}
        @keyframes title-row{to{transform:translateX(-35%)}}
        @keyframes manga-idle{to{background-position:100% 0}}
        @keyframes main-lightning-jitter{from{transform:translate(-2px,1px) scaleY(.99)}to{transform:translate(2px,-1px) scaleY(1.01)}}
        @keyframes opening-scroll{to{transform:translateX(-18%)}}
        @keyframes lightning-burst{0%,72%{opacity:0}76%{opacity:.18}82%{opacity:1}92%{opacity:.65}100%{opacity:0}}
        @keyframes logo-detail-in{to{opacity:1;transform:translateY(0)}}
        @keyframes route-flash{0%{opacity:0}15%,72%{opacity:1}100%{opacity:0}}
        @keyframes route-bolt{0%{stroke-dashoffset:1200}70%,100%{stroke-dashoffset:0}}
        @media(max-width:800px){.stage{transform-origin:left top}.menu-grid{grid-template-columns:repeat(4,335px)}.opening-logo,.loading-logo{width:58vmin;height:58vmin}.sound-gate h2{font-size:17px;margin-bottom:34px}.sound-gate>div{gap:22px}.sound-gate button{width:136px;height:136px;gap:16px}.sound-gate b{font-size:24px}}
      `}</style>
    </main>
  );
}
