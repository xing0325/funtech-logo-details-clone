"use client";

import Image from "next/image";
import { useState } from "react";

type Theme = "default" | "electric" | "trophy";

const menuItems = [
  "HOME",
  "BRAND MESSAGE",
  "CI UPDATE",
  "VISION VISUAL",
  "FUNTECH WAY",
  "A MILLION-VOLT CREATIVE",
  "BREAKERS OF VICTORY",
  "ALL FOR FUN",
  "LOGO DETAILS",
  "LOGO VARIATION",
  "10th SPECIAL ITEM",
  "ENDING MESSAGE",
  "WE ARE FUNTECH",
  "FIN",
];

const sidebarItems = [
  { label: "A Million-Volt Creative", top: 8, href: "#million-volt-creative" },
  { label: "Breakers of Victory", top: 132, href: "#breakers-of-victory" },
  { label: "All for Fun", top: 270, href: "#all-for-fun" },
  { label: "Logo Details", top: 408, href: "#logo-details" },
  { label: "Logo Variation", top: 546, href: "#logo-variation" },
  { label: "10th Special Item", top: 684, href: "#special-item" },
  { label: "Ending Message", top: 822, href: "#ending-message" },
];

export default function ExperienceFrame() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>("default");
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

  return (
    <main className="experience-viewport" data-theme={theme}>
      <div className="experience-stage">
        <Image
          className="experience-composite"
          src={`${basePath}/reference/logo-details-desktop.png`}
          alt="FunTech corporate identity Logo Details page"
          width={1440}
          height={1000}
          priority
          unoptimized
        />

        <nav aria-label="Chapter navigation">
          {sidebarItems.map((item) => (
            <a
              className="hotspot sidebar-hotspot"
              href={item.href}
              aria-label={`Go to ${item.label}`}
              style={{ top: item.top }}
              key={item.label}
            />
          ))}
          <a className="hotspot prev-hotspot" href="#all-for-fun" aria-label="Previous: All for Fun" />
          <a className="hotspot next-hotspot" href="#logo-variation" aria-label="Next: Logo Variation" />
          <a className="hotspot pdf-hotspot" href={`${basePath}/reference/logo-details-desktop.png`} aria-label="Open Logo Details PDF reference" />
          <a className="hotspot jp-hotspot" href="#jp" aria-label="View Japanese version">JP</a>
          <a className="hotspot en-hotspot" href="#en" aria-label="View English version">EN</a>
        </nav>

        <div className="theme-controls" role="group" aria-label="Visual theme">
          <button className="hotspot theme-electric" aria-label="Use electric theme" aria-pressed={theme === "electric"} onClick={() => setTheme("electric")} />
          <button className="hotspot theme-trophy" aria-label="Use trophy theme" aria-pressed={theme === "trophy"} onClick={() => setTheme("trophy")} />
          <button className="hotspot theme-default" aria-label="Use default theme" aria-pressed={theme === "default"} onClick={() => setTheme("default")} />
        </div>

        <button className="hotspot menu-hotspot" aria-label="Open menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(true)} />

        <section className={`menu-overlay ${menuOpen ? "is-open" : ""}`} aria-hidden={!menuOpen} aria-label="Site menu">
          <Image className="menu-composite" src={`${basePath}/reference/logo-details-menu.png`} alt="" width={1440} height={1000} unoptimized />
          <nav className="menu-grid" aria-label="All chapters">
            {menuItems.map((item, index) => (
              <a href={`#${item.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`} key={item} aria-label={`Go to ${String(index + 1).padStart(2, "0")}. ${item}`} onClick={() => setMenuOpen(false)} />
            ))}
          </nav>
          <button className="menu-close" type="button" onClick={() => setMenuOpen(false)} aria-label="Close menu" />
        </section>
      </div>

      <style jsx>{`
        .experience-viewport {
          position: relative;
          width: 100%;
          height: 100%;
          min-width: 1440px;
          min-height: 1000px;
          padding: 0;
          overflow: hidden;
          background: rgb(28, 29, 30);
        }
        .experience-stage { position: relative; width: 1440px; height: 1000px; overflow: hidden; }
        .experience-composite { position: absolute; inset: 0; width: 1440px; height: 1000px; transition: filter .3s cubic-bezier(.25,1,.5,1); }
        [data-theme="electric"] .experience-composite { filter: saturate(1.16) hue-rotate(-8deg) brightness(1.03); }
        [data-theme="trophy"] .experience-composite { filter: sepia(.1) saturate(.9) hue-rotate(8deg) brightness(1.04); }
        .hotspot {
          position: absolute;
          z-index: 3;
          display: block;
          border: 1px solid transparent;
          border-radius: 3px;
          color: transparent;
          background: transparent;
          cursor: pointer;
          transition: background-color .3s cubic-bezier(.25,1,.5,1), border-color .3s cubic-bezier(.25,1,.5,1), box-shadow .3s cubic-bezier(.25,1,.5,1);
        }
        .hotspot:hover { border-color: rgba(255,72,27,.45); background: rgba(255,72,27,.055); }
        .hotspot:focus-visible { outline: 2px solid rgb(245,243,238); outline-offset: -3px; background: rgba(255,72,27,.14); }
        .sidebar-hotspot { left: 8px; width: 199px; height: 132px; }
        .prev-hotspot { left: 8px; top: 936px; width: 615px; height: 56px; }
        .next-hotspot { left: 944px; top: 936px; width: 488px; height: 56px; }
        .pdf-hotspot { left: 532px; top: 943px; width: 91px; height: 43px; }
        .jp-hotspot, .en-hotspot { top: 943px; width: 42px; height: 43px; font-size: 0; }
        .jp-hotspot { left: 855px; }
        .en-hotspot { left: 900px; }
        .menu-hotspot { left: 633px; top: 942px; width: 160px; height: 44px; }
        .theme-electric { left: 1293px; top: 16px; width: 42px; height: 42px; }
        .theme-trophy { left: 1335px; top: 16px; width: 38px; height: 42px; }
        .theme-default { left: 1373px; top: 16px; width: 35px; height: 42px; }
        .theme-controls .hotspot[aria-pressed="true"] { border-color: rgb(245,243,238); box-shadow: inset 0 0 0 1px rgb(255,72,27); }
        .menu-overlay {
          position: absolute;
          z-index: 10;
          inset: 0;
          width: 1440px;
          height: 1000px;
          overflow: hidden;
          visibility: hidden;
          color: rgb(245,243,238);
          opacity: 0;
          transform: translateY(36px);
          transition: opacity .3s cubic-bezier(.25,1,.5,1), transform .3s cubic-bezier(.25,1,.5,1), visibility 0s linear .3s;
        }
        .menu-overlay.is-open { visibility: visible; opacity: 1; transform: translateY(0); transition-delay: 0s; }
        .menu-composite { position: absolute; inset: 0; width: 1440px; height: 1000px; }
        .menu-grid { position: absolute; inset: 39px 25px 222px 26px; display: grid; grid-template-columns: repeat(4, 1fr); grid-template-rows: repeat(4, 1fr); gap: 10px; }
        .menu-grid a { display: block; border: 1px solid transparent; transition: border-color .3s cubic-bezier(.25,1,.5,1), background .3s cubic-bezier(.25,1,.5,1); }
        .menu-grid a:hover, .menu-grid a:focus-visible { border-color: rgba(255,72,27,.75); background: rgba(255,72,27,.07); outline: none; }
        .menu-close { position: absolute; left: 633px; top: 942px; width: 160px; height: 44px; cursor: pointer; border: 1px solid transparent; background: transparent; }
        .menu-close:hover, .menu-close:focus-visible { border-color: rgb(245,243,238); outline: none; }
      `}</style>
    </main>
  );
}
