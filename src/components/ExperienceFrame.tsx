"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import SlideScene from "@/components/SlideScenes";
import { slides, type SlideSlug, type Theme } from "@/data/slides";

type IntroState = "loading" | "sound" | "opening" | "entered";

function NoiseBorder() {
  return <><i className="shell-edge shell-edge-t" /><i className="shell-edge shell-edge-r" /><i className="shell-edge shell-edge-b" /><i className="shell-edge shell-edge-l" /></>;
}

export default function ExperienceFrame({ initialSlug = "home" }: { initialSlug?: SlideSlug }) {
  const initialIndex = Math.max(0, slides.findIndex((slide) => slide.slug === initialSlug));
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [intro, setIntro] = useState<IntroState>("loading");
  const [progress, setProgress] = useState(0);
  const [openingFrame, setOpeningFrame] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>("fun");
  const [transitionDirection, setTransitionDirection] = useState<"prev" | "next" | null>(null);
  const wheelState = useRef({ accumulatedDeltaY: 0, direction: null as "prev" | "next" | null, lastNavigationAt: null as number | null, lastWheelAt: null as number | null });
  const railRef = useRef<HTMLDivElement>(null);
  const bgmRef = useRef<HTMLAudioElement>(null);
  const lightningAudioRef = useRef<HTMLAudioElement>(null);
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const current = slides[currentIndex];
  const previous = slides[currentIndex - 1];
  const next = slides[currentIndex + 1];

  const routePath = (slug: SlideSlug) => slug === "home" ? `${basePath}/` : `${basePath}/${slug}/`;

  useEffect(() => {
    if (window.sessionStorage.getItem("funtech-opening-seen") !== "1") return;
    const timer = window.setTimeout(() => setIntro("entered"), 0);
    return () => window.clearTimeout(timer);
  }, []);

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
      const integral = elapsed <= ramp
        ? 1.25 * elapsed + (36 - 1.25) * ramp * ((elapsed / ramp) ** 4 / 4)
        : 1.25 * ramp + (36 - 1.25) * ramp * 0.25 + 36 * (elapsed - ramp);
      setOpeningFrame(Math.floor(integral) % 8);
      if (elapsed < 3.4) animationFrame = window.requestAnimationFrame(tick);
      else {
        window.sessionStorage.setItem("funtech-opening-seen", "1");
        setIntro("entered");
      }
    };
    animationFrame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(animationFrame);
  }, [intro]);

  useEffect(() => {
    if (intro !== "entered") return;
    const frame = window.requestAnimationFrame(() => railRef.current?.querySelector(".current")?.scrollIntoView({ block: "center", behavior: "smooth" }));
    return () => window.cancelAnimationFrame(frame);
  }, [currentIndex, intro]);

  useEffect(() => {
    const onPopState = () => {
      const relative = window.location.pathname.replace(basePath, "").replace(/^\/+|\/+$/g, "");
      const slug = (relative || "home") as SlideSlug;
      const index = slides.findIndex((slide) => slide.slug === slug);
      if (index >= 0) setCurrentIndex(index);
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [basePath]);

  function navigateTo(index: number, direction?: "prev" | "next") {
    if (index < 0 || index >= slides.length || index === currentIndex || transitionDirection) return;
    const resolvedDirection = direction ?? (index > currentIndex ? "next" : "prev");
    setTransitionDirection(resolvedDirection);
    window.setTimeout(() => {
      setCurrentIndex(index);
      setMenuOpen(false);
      window.history.pushState({ slide: slides[index].slug }, "", routePath(slides[index].slug));
    }, 280);
    window.setTimeout(() => setTransitionDirection(null), 800);
  }

  function handleWheel(event: React.WheelEvent) {
    if (intro !== "entered" || menuOpen || transitionDirection) return;
    const now = performance.now();
    const normalized = event.deltaMode === 1 ? event.deltaY * 40 : event.deltaMode === 2 ? event.deltaY * Math.max(1, window.innerHeight) : event.deltaY;
    if (Math.abs(normalized) < 4) return;
    const state = wheelState.current;
    if (state.lastNavigationAt !== null && (now - state.lastNavigationAt < 800 || (state.lastWheelAt !== null && now - state.lastWheelAt <= 220))) {
      wheelState.current = { ...state, accumulatedDeltaY: 0, direction: null, lastWheelAt: now };
      return;
    }
    const direction = normalized > 0 ? "next" : "prev";
    const accumulated = state.lastWheelAt === null || now - state.lastWheelAt > 220 || (state.direction !== null && state.direction !== direction) ? normalized : state.accumulatedDeltaY + normalized;
    if (Math.abs(accumulated) >= 180) {
      wheelState.current = { accumulatedDeltaY: 0, direction: null, lastNavigationAt: now, lastWheelAt: now };
      navigateTo(currentIndex + (direction === "next" ? 1 : -1), direction);
    } else wheelState.current = { ...state, accumulatedDeltaY: accumulated, direction, lastNavigationAt: null, lastWheelAt: now };
  }

  function enterWithSound(enabled: boolean) {
    if (enabled) {
      if (bgmRef.current) { bgmRef.current.currentTime = 16.5; bgmRef.current.volume = 0.2; void bgmRef.current.play().catch(() => {}); }
      if (lightningAudioRef.current) { lightningAudioRef.current.currentTime = 0; lightningAudioRef.current.volume = 0.55; void lightningAudioRef.current.play().catch(() => {}); }
    }
    setIntro("opening");
  }

  return <main className="viewport" data-theme={theme} onWheel={handleWheel}>
    <audio ref={bgmRef} src={`${basePath}/assets/opening/sound/bgm.mp3`} preload="auto" loop />
    <audio ref={lightningAudioRef} src={`${basePath}/assets/opening/sound/lightning.aac`} preload="auto" />
    <div className={`stage ${intro === "entered" ? "is-entered" : ""}`}>
      <aside className="rail"><NoiseBorder /><div className="rail-scroll" ref={railRef}>{slides.map((slide, index) => <a className={index === currentIndex ? "current" : ""} href={routePath(slide.slug)} key={slide.slug} onClick={(event) => { event.preventDefault(); navigateTo(index); }}><Image src={`${basePath}/assets/thumbnails/${slide.slug}.webp`} alt="" width={1024} height={576} unoptimized /><span><b>{slide.number}</b> {slide.label}</span></a>)}</div></aside>

      <section className="workspace"><NoiseBorder /><div className="workspace-grain" /><div className="slide-canvas" key={current.slug}>
        {current.slug !== "home" && <span className="section-label">{current.number}. {current.label} ▣</span>}
        <SlideScene basePath={basePath} slug={current.slug} theme={theme} />
        {!(["we-are-funtech", "fin"] as SlideSlug[]).includes(current.slug) && <svg className="global-lightning" viewBox="0 0 1209 680" preserveAspectRatio="none" aria-hidden="true"><g><path className="lightning-shadow" d="M-30 185C62 155 105 270 185 280S287 180 385 232 470 302 545 254" /><path className="lightning-core" d="M-30 185C62 155 105 270 185 280S287 180 385 232 470 302 545 254" /></g><g><path className="lightning-shadow" d="M842 294C920 340 977 342 1032 374S1134 350 1240 294" /><path className="lightning-core" d="M842 294C920 340 977 342 1032 374S1134 350 1240 294" /></g></svg>}
      </div></section>

      <div className={`route-transition ${transitionDirection ?? ""}`}><span>{transitionDirection === "next" ? next?.label : previous?.label}</span><svg viewBox="0 0 900 500"><path d="M10 245L170 90l110 245 145-210 145 280 120-230 200 105" /></svg></div>
      <div className="themes"><button className={theme === "volt" ? "active" : ""} onClick={() => setTheme("volt")}>⚡</button><button className={theme === "breaker" ? "active" : ""} onClick={() => setTheme("breaker")}>🏆</button><button className={theme === "fun" ? "active" : ""} onClick={() => setTheme("fun")}>🎉</button></div>

      <footer className="bottom-bar"><NoiseBorder />{previous ? <a href={routePath(previous.slug)} className="previous" onClick={(event) => { event.preventDefault(); navigateTo(currentIndex - 1, "prev"); }}><b>←</b><span><em>{previous.number}.</em> {previous.label}</span></a> : <span className="nav-spacer" />}<div className="bar-actions"><a href="https://jdwwpp2ikybqtgsb.public.blob.vercel-storage.com/pdf/20260526_FunTech_CI_EN_r3-8JWkzsYYvfu3fye9ml6PLkbw7nq6vD.pdf">PDF ⇩</a><button className="menu-button" onClick={() => setMenuOpen(true)}>MENU <i>⌘</i></button><button aria-label="Sound">▥</button><button>JP</button><button className="selected">EN</button></div>{next ? <a href={routePath(next.slug)} className="next" onClick={(event) => { event.preventDefault(); navigateTo(currentIndex + 1, "next"); }}><span><em>{next.number}.</em> {next.label}</span><b>→</b></a> : <span className="nav-spacer" />}</footer>

      <section className={`menu ${menuOpen ? "open" : ""}`} aria-hidden={!menuOpen}><NoiseBorder /><div className="menu-grid">{slides.map((slide, index) => <a href={routePath(slide.slug)} className={index === currentIndex ? "current" : ""} key={slide.slug} onClick={(event) => { event.preventDefault(); navigateTo(index); }}><Image src={`${basePath}/assets/thumbnails/${slide.slug}.webp`} alt="" width={1024} height={576} unoptimized /><span><b>{slide.number}.</b> {slide.label}</span></a>)}</div><div className="menu-foot"><a href="https://funtech.inc/">CORPORATE SITE ↗</a><a href="https://www.wantedly.com/companies/fun-tech">WANTEDLY ↗</a><button onClick={() => setMenuOpen(false)}>MENU ×</button><span>▥　 JP　 <b>EN</b></span></div></section>

      {intro !== "entered" && <section className={`intro intro-${intro}`}>{intro === "loading" ? <><div className="opening-scroll-text loading-text">{Array.from({ length: 6 }, (_, index) => <span key={index}>FUNTECHBRANDIDENTITYFUNTECHBRANDIDENTITY</span>)}</div><div className="opening-logo loading-logo" style={{ backgroundPosition: `${(Math.floor(progress / 20) % 4) * 100 / 3}% ${Math.floor((Math.floor(progress / 20) % 8) / 4) * 100}%` }} /><div className="lightning-field sparse">{Array.from({ length: 8 }, (_, index) => <Image key={index} src={`${basePath}/assets/opening/lightning.png`} alt="" width={512} height={256} unoptimized style={{ "--i": index } as React.CSSProperties} />)}</div><div className="loading-ui"><span>{progress}%</span><i><b style={{ transform: `scaleX(${progress / 100})` }} /></i></div></> : intro === "sound" ? <div className="sound-gate"><h2>FOR THE BEST EXPERIENCE.<br />PLEASE TURN ON SOUND.</h2><div><button onClick={() => enterWithSound(true)}><b>▥</b><span>ON</span></button><button onClick={() => enterWithSound(false)}><b>▧</b><span>OFF</span></button></div></div> : <div className="opening-sequence"><div className="opening-scroll-text">{Array.from({ length: 6 }, (_, index) => <span key={index}>FUNTECHBRANDIDENTITYFUNTECHBRANDIDENTITY</span>)}</div><div className="opening-logo" style={{ backgroundPosition: `${(openingFrame % 4) * 100 / 3}% ${Math.floor(openingFrame / 4) * 100}%` }} /><div className="lightning-field">{Array.from({ length: 36 }, (_, index) => <Image key={index} src={`${basePath}/assets/opening/lightning.png`} alt="" width={512} height={256} unoptimized style={{ "--i": index } as React.CSSProperties} />)}</div></div>}</section>}
    </div>

    <style jsx global>{`
      .viewport{--accent:#ff481b;--foreground:#f2eeeb;--edge-h:url("${basePath}/assets/full-site/noise-border/fun-h.png");--edge-v:url("${basePath}/assets/full-site/noise-border/fun-v.png");width:100%;height:100%;min-width:1440px;min-height:1000px;overflow:hidden;background:#1c1d1e;color:var(--foreground);font-family:"proxima-nova",Arial,sans-serif}.viewport[data-theme="volt"]{--accent:#dffe38;--foreground:#fff;--edge-h:url("${basePath}/assets/full-site/noise-border/volt-h.png");--edge-v:url("${basePath}/assets/full-site/noise-border/volt-v.png")}.viewport[data-theme="breaker"]{--accent:#ff2929;--foreground:#f2ebeb;--edge-h:url("${basePath}/assets/full-site/noise-border/breaker-h.png");--edge-v:url("${basePath}/assets/full-site/noise-border/breaker-v.png")}
      .stage{position:relative;width:1440px;height:1000px;padding:8px;overflow:hidden;background:#1c1d1e}.rail,.workspace,.themes,.bottom-bar{opacity:0;transform:scale(1.015);transition:opacity .8s,transform 1.1s cubic-bezier(.25,1,.5,1)}.stage.is-entered .rail,.stage.is-entered .workspace,.stage.is-entered .themes,.stage.is-entered .bottom-bar{opacity:1;transform:none}.shell-edge{position:absolute;z-index:40;pointer-events:none}.shell-edge-t,.shell-edge-b{left:0;width:100%;height:10px;background:var(--edge-h) repeat-x 0 -5px/128px 320px;animation:shell-edge-h 2s steps(16) infinite}.shell-edge-t{top:0;transform:translateY(-50%)}.shell-edge-b{bottom:0;transform:translateY(50%)}.shell-edge-l,.shell-edge-r{top:0;height:100%;width:10px;background:var(--edge-v) repeat-y -5px 0/320px 128px;animation:shell-edge-v 2s steps(16) infinite}.shell-edge-l{left:0;transform:translateX(-50%)}.shell-edge-r{right:0;transform:translateX(50%)}
      .rail{position:absolute;left:8px;top:8px;width:200px;height:928px;background:#191a1b;overflow:hidden}.rail-scroll{height:100%;overflow-y:auto;scroll-snap-type:y mandatory;padding:8px 9px 20px 16px;scrollbar-width:none}.rail-scroll::-webkit-scrollbar{display:none}.rail a{display:block;scroll-snap-align:center;height:134px;padding:7px 0;color:#7c7770;text-decoration:none;opacity:.58;transition:opacity .3s,color .3s,transform .3s}.rail a:hover,.rail a.current{opacity:1;color:var(--foreground);transform:translateX(2px)}.rail img{display:block;width:172px;height:96px;object-fit:cover;border:1px solid #3b3834}.rail a.current img{border-color:var(--accent)}.rail span{display:block;margin-top:6px;font-size:11px;font-weight:700}.rail b{color:var(--accent)}
      .workspace{position:absolute;left:208px;top:8px;width:1209px;height:928px;overflow:hidden;background:#1c1d1e}.workspace-grain{position:absolute;inset:0;background:repeating-linear-gradient(-135deg,#ffffff05 0 1px,transparent 1px 5px)}.slide-canvas{position:absolute;left:0;top:124px;width:1209px;height:680px;container-type:size;overflow:hidden;background:#1c1d1e}.section-label{position:absolute;z-index:30;left:1cqw;top:1.45cqw;width:17cqw;padding:6px 14px;border:1px solid var(--accent);border-radius:20px;background:#1c1d1e;color:var(--foreground);font:800 1.05cqw/1 "elevon",sans-serif;letter-spacing:.06em}.global-lightning{position:absolute;z-index:35;inset:0;width:100%;height:100%;overflow:visible;pointer-events:none}.global-lightning g{animation:global-jitter .18s steps(2,end) infinite alternate}.global-lightning g+g{animation-delay:-.09s}.lightning-shadow,.lightning-core{fill:none;stroke-linecap:round;stroke-linejoin:round}.lightning-shadow{stroke:#020303;stroke-width:25}.lightning-core{stroke:var(--accent);stroke-width:8;filter:drop-shadow(0 0 2px #020303)}
      .themes{position:absolute;z-index:50;right:20px;top:16px;display:flex;background:var(--accent)}.themes button{width:38px;height:40px;border:0;background:transparent;filter:grayscale(1);cursor:pointer}.themes button.active{filter:none;box-shadow:inset 0 0 0 2px #1c1d1e}.bottom-bar{position:absolute;z-index:45;left:8px;bottom:8px;width:1409px;height:56px;background:#171819;display:flex;align-items:center;justify-content:space-between}.bottom-bar a{color:#bbb5ae;text-decoration:none}.previous,.next{display:flex;align-items:center;height:100%;gap:14px;padding:0 12px;font-size:16px;letter-spacing:.06em}.previous b,.next b{display:grid;place-items:center;width:40px;height:40px;background:var(--accent);color:#1c1d1e;font-size:22px}.previous em,.next em{color:var(--accent);font-style:normal}.nav-spacer{width:270px}.bar-actions{position:absolute;left:50%;transform:translateX(-50%);display:flex;align-items:center;gap:10px;height:100%}.bar-actions>a,.bar-actions>button{height:42px;min-width:42px;padding:0 14px;border:0;background:#303132;color:#aaa;display:grid;place-items:center;cursor:pointer}.bar-actions .menu-button{width:160px;background:var(--accent);color:#1c1d1e;font-weight:800;display:flex;justify-content:center;gap:18px}.bar-actions .selected{box-shadow:inset 0 0 0 2px #3c3d3e;color:#fff}
      .menu{position:absolute;z-index:80;inset:8px;width:1409px;height:928px;background:#1c1d1e;padding:30px 18px 70px;opacity:0;visibility:hidden;transform:translateY(24px);transition:opacity .35s,transform .55s cubic-bezier(.25,1,.5,1),visibility 0s .55s}.menu.open{opacity:1;visibility:visible;transform:none;transition-delay:0s}.menu-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:10px 12px}.menu-grid a{height:195px;background:#303132;padding:8px;color:#eee;text-decoration:none;transition:transform .25s,background .25s}.menu-grid a:hover{transform:translateY(-4px);background:#3a3b3c}.menu-grid a.current{opacity:.35}.menu-grid img{width:100%;height:145px;object-fit:cover}.menu-grid span{display:block;padding:9px 0 0;font-size:14px}.menu-grid b{color:var(--accent)}.menu-foot{position:absolute;left:12px;right:12px;bottom:8px;height:46px;display:flex;align-items:center;gap:7px}.menu-foot a,.menu-foot button{height:42px;padding:0 14px;background:#3a3b3c;color:#fff;border:0;text-decoration:none;display:grid;place-items:center}.menu-foot button{margin-left:auto;width:160px;background:var(--accent);color:#1c1d1e}.menu-foot span{margin-left:auto}
      .route-transition{position:absolute;z-index:90;inset:8px;background:#080909;display:grid;place-items:center;opacity:0;pointer-events:none;transition:opacity .18s}.route-transition.next,.route-transition.prev{opacity:1;animation:route-flash .8s ease both}.route-transition span{font:800 22px/1 "elevon",sans-serif;letter-spacing:.08em}.route-transition svg{position:absolute;width:80%;overflow:visible}.route-transition path{fill:none;stroke:var(--accent);stroke-width:16;filter:drop-shadow(0 0 9px var(--accent));stroke-dasharray:1200;stroke-dashoffset:1200;animation:route-bolt .75s ease-out forwards}
      .intro{position:fixed;z-index:100;inset:0;width:100vw;height:100dvh;background:#020303;display:grid;place-items:center;color:#f5f3ee;overflow:hidden}.opening-sequence{position:absolute;inset:0;isolation:isolate;overflow:hidden}.opening-scroll-text{position:absolute;inset:-25%;display:flex;flex-direction:column;justify-content:center;transform:rotate(-15deg);font:900 clamp(96px,22vw,340px)/.82 "elevon",sans-serif;color:#fff;opacity:.1;white-space:nowrap}.opening-scroll-text span{animation:opening-scroll .9s linear infinite}.opening-scroll-text span:nth-child(even){transform:translateX(-45%);animation-direction:reverse}.loading-text span{animation-duration:5.5s}.opening-logo{position:absolute;z-index:2;left:50%;top:50%;width:40vmin;height:40vmin;transform:translate(-50%,-50%);background-image:url("${basePath}/assets/opening/old-logos-atlas.webp");background-repeat:no-repeat;background-size:400% 200%;opacity:.8;filter:drop-shadow(0 0 18px #ff481b2e)}.lightning-field{position:absolute;z-index:3;inset:0;mix-blend-mode:hard-light;pointer-events:none}.lightning-field img{position:absolute;left:50%;top:50%;width:clamp(190px,34vw,620px);height:auto;opacity:0;transform-origin:0 50%;filter:drop-shadow(0 0 6px #fff) drop-shadow(0 0 16px #ff481b);animation:lightning-burst .72s steps(4,end) infinite;animation-delay:calc(var(--i) * -.037s);transform:rotate(calc(var(--i) * 47deg)) translateX(calc(4vmin + var(--i) * .45vmin)) scale(calc(.32 + var(--i) * .012))}.lightning-field.sparse img{animation-duration:2.1s;animation-delay:calc(var(--i) * -.21s);width:clamp(150px,25vw,420px)}.loading-ui{position:absolute;z-index:8;left:50%;top:50%;transform:translate(-50%,-50%);display:flex;flex-direction:column;align-items:center;gap:24px}.loading-ui>span{font:400 32px/1 "elevon",sans-serif}.loading-ui>i{display:block;width:min(240px,50vw);height:3px;overflow:hidden;background:#ffffff66}.loading-ui b{display:block;width:100%;height:100%;transform-origin:left;background:#ff481b}.sound-gate{text-align:center}.sound-gate h2{font:800 25px/1.15 "elevon",sans-serif;margin-bottom:44px}.sound-gate>div{display:flex;gap:40px}.sound-gate button{width:180px;height:180px;border-radius:50%;border:1px solid #ff481b;background:transparent;color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:22px;cursor:pointer}.sound-gate button:first-child,.sound-gate button:hover{background:#ff481b;color:#171819;transform:scale(1.04)}.sound-gate b{font-size:30px}.sound-gate span{font:800 13px/1 "elevon",sans-serif;letter-spacing:.2em}
      @keyframes shell-edge-h{to{background-position:0 -325px}}@keyframes shell-edge-v{to{background-position:-325px 0}}@keyframes global-jitter{from{transform:translate(-2px,1px) scaleY(.99)}to{transform:translate(2px,-1px) scaleY(1.01)}}@keyframes route-flash{0%{opacity:0}15%,72%{opacity:1}100%{opacity:0}}@keyframes route-bolt{70%,100%{stroke-dashoffset:0}}@keyframes opening-scroll{to{transform:translateX(-18%)}}@keyframes lightning-burst{0%,72%{opacity:0}76%{opacity:.18}82%{opacity:1}92%{opacity:.65}100%{opacity:0}}
      @media(max-width:800px){.opening-logo{width:58vmin;height:58vmin}.sound-gate h2{font-size:17px;margin-bottom:34px}.sound-gate>div{gap:22px}.sound-gate button{width:136px;height:136px;gap:16px}.sound-gate b{font-size:24px}}
    `}</style>
  </main>;
}
