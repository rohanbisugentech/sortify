import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const LANDING_CSS = `
:root {
  --dark: #0a1f14;
  --dark-card: #122b1c;
  --dark-card2: #0f2318;
  --light: #f2f0eb;
  --light2: #e8e5de;
  --white: #ffffff;
  --accent: #2d6a45;
  --accent2: #3d8a5c;
  --text-dark: #0a1f14;
  --text-light: #ffffff;
  --text-muted: rgba(255,255,255,0.55);
  --text-muted-dark: rgba(10,31,20,0.5);
  --serif: 'Playfair Display', Georgia, serif;
  --sans: 'DM Sans', system-ui, sans-serif;
  --mono: 'DM Mono', monospace;
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: auto; }
body {
  font-family: var(--sans);
  background: var(--dark);
  color: var(--text-light);
  overflow-x: hidden;
  cursor: default;
}

#particles-canvas {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  pointer-events: none;
  z-index: 0;
}

nav {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 1000;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 48px;
  transition: all 320ms cubic-bezier(0.25,0.1,0.25,1);
}
nav.scrolled {
  top: 10px;
  left: 50%;
  right: auto;
  transform: translateX(-50%);
  width: auto;
  min-width: 720px;
  padding: 0 24px;
  background: var(--white);
  border-radius: 40px;
  box-shadow: 0 2px 24px rgba(0,0,0,0.10);
  height: 52px;
}
.nav-logo {
  font-family: var(--serif);
  font-size: 20px;
  font-weight: 500;
  color: var(--white);
  display: flex; align-items: center; gap: 8px;
  text-decoration: none;
  transition: color 320ms ease;
}
nav.scrolled .nav-logo { color: var(--text-dark); }
.nav-logo-icon {
  width: 28px; height: 28px;
  background: var(--accent);
  border-radius: 6px;
  display: flex; align-items: center; justify-content: center;
  font-size: 14px;
}
nav.scrolled .nav-logo-icon { background: var(--accent); }
.nav-links { display: flex; gap: 28px; list-style: none; }
.nav-links a {
  font-size: 14px; font-weight: 400;
  color: rgba(255,255,255,0.85);
  text-decoration: none;
  transition: color 320ms ease;
}
nav.scrolled .nav-links a { color: rgba(10,31,20,0.75); }
nav.scrolled .nav-links a:hover { color: var(--text-dark); }
.nav-actions { display: flex; align-items: center; gap: 12px; }
.nav-login {
  font-size: 14px; color: rgba(255,255,255,0.8);
  background: none; border: none; cursor: pointer;
  transition: color 320ms ease;
}
nav.scrolled .nav-login { color: rgba(10,31,20,0.7); }
.nav-cta {
  background: var(--accent); color: #fff;
  border: none; border-radius: 999px;
  padding: 9px 20px; font-size: 14px; font-weight: 500;
  font-family: var(--sans); cursor: pointer;
  transition: background 200ms ease;
}
.nav-cta:hover { background: var(--accent2); }

#hero {
  position: relative; min-height: 100vh;
  background: var(--dark); display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  text-align: center; padding: 120px 24px 0;
  overflow: hidden; z-index: 1;
}
.hero-eyebrow {
  font-family: var(--sans); font-size: 11px; font-weight: 600;
  letter-spacing: 0.14em; text-transform: uppercase;
  color: rgba(255,255,255,0.55); margin-bottom: 24px;
  display: flex; align-items: center; gap: 8px;
  opacity: 0; transform: translateY(10px);
}
.hero-eyebrow span { color: rgba(255,255,255,0.9); }
.hero-heading {
  font-family: var(--serif); font-size: clamp(52px, 7vw, 88px);
  font-weight: 500; line-height: 1.08; color: var(--white);
  max-width: 900px; margin: 0 auto 28px; opacity: 0;
}
.hero-heading .char { display: inline-block; opacity: 0; }
.hero-sub {
  font-size: 18px; font-weight: 300; color: rgba(255,255,255,0.7);
  max-width: 560px; margin: 0 auto 40px; line-height: 1.65;
  opacity: 0; transform: translateY(16px);
}
.hero-sub strong { color: #fff; font-weight: 600; }
.hero-actions { display: flex; align-items: center; gap: 16px; opacity: 0; transform: translateY(16px); margin-bottom: 0; }
.btn-primary {
  background: var(--white); color: var(--dark); border: none; border-radius: 999px;
  padding: 14px 32px; font-size: 15px; font-weight: 600; font-family: var(--sans);
  cursor: pointer; transition: all 200ms ease; text-decoration: none;
}
.btn-primary:hover { background: var(--light); transform: translateY(-1px); }
.btn-ghost {
  background: transparent; color: rgba(255,255,255,0.7);
  border: 1.5px solid rgba(255,255,255,0.25); border-radius: 999px;
  padding: 13px 28px; font-size: 15px; font-weight: 400; font-family: var(--sans);
  cursor: pointer; transition: all 200ms ease; text-decoration: none;
}
.btn-ghost:hover { border-color: rgba(255,255,255,0.6); color: #fff; }

.hero-cards-row {
  position: absolute; bottom: 0; left: -5%; right: -5%;
  height: 220px; display: flex; gap: 16px; align-items: flex-end;
  opacity: 0; transform: translateY(100px); padding: 0 32px; overflow: hidden;
}
.hero-card { flex-shrink: 0; border-radius: 12px 12px 0 0; overflow: hidden; box-shadow: 0 -4px 24px rgba(0,0,0,0.3); background: var(--white); padding: 16px; }
.hero-card-1 { width: 200px; height: 160px; background: #f7f5f0; }
.hero-card-2 { width: 160px; height: 140px; background: #1a3a26; border: 1px solid rgba(255,255,255,0.1); }
.hero-card-3 { width: 260px; height: 180px; background: #f7f5f0; }
.hero-card-4 { width: 180px; height: 130px; background: #1a3a26; border: 1px solid rgba(255,255,255,0.1); }
.hero-card-5 { width: 300px; height: 190px; background: #f7f5f0; }
.hero-card-6 { width: 160px; height: 120px; background: #1a3a26; border: 1px solid rgba(255,255,255,0.1); }
.hero-card-7 { width: 220px; height: 155px; background: #f7f5f0; }

.hcard-dark { padding: 12px; }
.hcard-dark .hc-label { font-size: 9px; text-transform: uppercase; letter-spacing: 0.1em; color: var(--text-muted); font-weight: 600; margin-bottom: 8px; }
.hcard-dark .hc-file { display: flex; align-items: center; gap: 8px; padding: 6px 8px; background: rgba(255,255,255,0.06); border-radius: 6px; margin-bottom: 4px; }
.hcard-dark .hc-file-icon { font-size: 12px; }
.hcard-dark .hc-file-name { font-size: 10px; color: rgba(255,255,255,0.7); font-family: var(--mono); }
.hcard-dark .hc-tag { display: inline-block; font-size: 9px; background: rgba(45,106,69,0.4); color: rgba(255,255,255,0.8); border-radius: 4px; padding: 2px 6px; margin: 2px 2px 0 0; }

.hcard-light { padding: 14px; }
.hcard-light .hc-title { font-size: 11px; font-weight: 600; color: var(--dark); margin-bottom: 8px; font-family: var(--sans); }
.hcard-light .hc-row { display: flex; align-items: center; gap: 6px; margin-bottom: 5px; }
.hcard-light .hc-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }
.hcard-light .hc-txt { font-size: 10px; color: rgba(10,31,20,0.65); }
.hcard-light .hc-badge { font-size: 9px; background: #e8f5ee; color: var(--accent); border-radius: 4px; padding: 2px 7px; font-weight: 500; }

#product-window-wrapper { position: relative; height: 240vh; z-index: 2; }
#product-window {
  position: sticky; top: 80px; width: 880px; max-width: calc(100vw - 80px);
  margin: 0 auto; height: 540px; border-radius: 16px; background: #ffffff;
  box-shadow: 0 32px 80px rgba(0,0,0,0.3); overflow: hidden; display: flex;
  flex-direction: column; transform: translateY(80vh); opacity: 0;
}
.pw-titlebar { height: 36px; background: #f5f4f0; display: flex; align-items: center; padding: 0 16px; gap: 12px; border-bottom: 1px solid rgba(0,0,0,0.06); flex-shrink: 0; }
.pw-dots { display: flex; gap: 6px; }
.pw-dot { width: 10px; height: 10px; border-radius: 50%; }
.pw-dot-r { background: #ff5f57; } .pw-dot-y { background: #febc2e; } .pw-dot-g { background: #28c840; }
.pw-breadcrumb { font-size: 12px; color: rgba(10,31,20,0.45); font-family: var(--sans); margin-left: 8px; }
.pw-body { display: flex; flex: 1; overflow: hidden; }
.pw-sidebar { width: 220px; flex-shrink: 0; background: #f9f8f5; border-right: 1px solid rgba(0,0,0,0.06); padding: 12px 0; overflow-y: auto; }
.pw-sb-logo { display: flex; align-items: center; gap: 8px; padding: 4px 16px 12px; border-bottom: 1px solid rgba(0,0,0,0.05); margin-bottom: 8px; }
.pw-sb-logo-icon { width: 20px; height: 20px; background: var(--accent); border-radius: 4px; font-size: 10px; display:flex;align-items:center;justify-content:center; color:#fff; }
.pw-sb-logo-name { font-size: 13px; font-weight: 600; color: var(--dark); font-family: var(--sans); }
.pw-sb-section { padding: 2px 16px 8px; }
.pw-sb-label { font-size: 9px; text-transform: uppercase; letter-spacing: 0.1em; color: rgba(10,31,20,0.35); font-weight: 600; margin-bottom: 4px; }
.pw-sb-item { display: flex; align-items: center; gap: 8px; padding: 5px 8px; border-radius: 6px; cursor: pointer; margin-bottom: 1px; }
.pw-sb-item:hover, .pw-sb-item.active { background: rgba(45,106,69,0.08); }
.pw-sb-item-icon { font-size: 12px; }
.pw-sb-item-text { font-size: 12px; color: rgba(10,31,20,0.7); font-family: var(--sans); }
.pw-sb-item.active .pw-sb-item-text { color: var(--accent); font-weight: 500; }
.pw-main { flex: 1; overflow-y: auto; }
.pw-banner { height: 100px; background: linear-gradient(135deg, #2d6a45 0%, #1a3a26 100%); position: relative; overflow: hidden; }
.pw-banner-pattern { position: absolute; inset: 0; opacity: 0.1; background-image: repeating-linear-gradient(45deg, #fff 0px, #fff 1px, transparent 1px, transparent 20px); }
.pw-banner-text { position: absolute; bottom: 16px; left: 20px; color: #fff; font-size: 13px; font-weight: 500; font-family: var(--sans); }
.pw-content { padding: 16px 20px; }
.pw-search { display: flex; align-items: center; gap: 10px; background: #f5f4f1; border-radius: 8px; padding: 8px 14px; margin-bottom: 14px; }
.pw-search input { border: none; background: none; font-size: 12px; color: rgba(10,31,20,0.6); font-family: var(--sans); width: 100%; outline: none; }
.pw-tabs { display: flex; gap: 8px; margin-bottom: 16px; flex-wrap: wrap; }
.pw-tab { font-size: 11px; padding: 4px 12px; border-radius: 999px; cursor: pointer; font-family: var(--sans); font-weight: 500; }
.pw-tab.active { background: var(--dark); color: #fff; }
.pw-tab:not(.active) { color: rgba(10,31,20,0.5); background: #f0ede8; }
.pw-section-title { font-size: 13px; font-weight: 600; color: var(--dark); margin-bottom: 12px; font-family: var(--sans); }
.pw-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 10px; }
.pw-file-card { background: #f7f5f1; border-radius: 10px; padding: 10px; cursor: pointer; transition: all 150ms ease; }
.pw-file-card:hover { background: #f0ede8; transform: translateY(-1px); }
.pw-file-thumb { height: 52px; border-radius: 6px; margin-bottom: 8px; display: flex; align-items: center; justify-content: center; font-size: 20px; }
.pw-file-name { font-size: 10px; font-weight: 500; color: var(--dark); font-family: var(--sans); margin-bottom: 3px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.pw-file-meta { font-size: 9px; color: rgba(10,31,20,0.4); font-family: var(--mono); }

#narrative { position: relative; background: var(--dark); padding: 160px 48px 200px; z-index: 1; }
.narrative-inner { max-width: 640px; margin: 0 auto; }
.narrative-p { font-family: var(--serif); font-size: 36px; font-weight: 400; line-height: 1.3; color: var(--white); margin-bottom: 48px; opacity: 0; transform: translateY(32px); }
.narrative-p:last-child { margin-bottom: 0; }
.narrative-p em { font-style: italic; color: rgba(255,255,255,0.7); }

#solution { position: relative; background: var(--dark); padding: 0 32px 80px; z-index: 1; }
.solution-card { background: var(--dark-card); border-radius: 24px; padding: 80px 64px; border: 1px solid rgba(255,255,255,0.06); opacity: 0; transform: translateY(60px) scale(0.97); }
.section-eyebrow { font-size: 11px; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(255,255,255,0.45); margin-bottom: 28px; display: flex; align-items: center; gap: 8px; }
.solution-heading { font-family: var(--serif); font-size: clamp(42px, 5vw, 64px); font-weight: 500; color: var(--white); text-align: center; max-width: 780px; margin: 0 auto 20px; line-height: 1.1; }
.solution-sub { font-size: 17px; font-weight: 300; color: rgba(255,255,255,0.65); text-align: center; max-width: 520px; margin: 0 auto 16px; line-height: 1.6; }
.solution-checks { display: flex; flex-wrap: wrap; justify-content: center; gap: 10px 20px; margin: 0 auto 60px; max-width: 600px; }
.solution-check { font-size: 13px; color: rgba(255,255,255,0.7); display: flex; align-items: center; gap: 6px; }
.solution-check::before { content: '✓'; color: var(--accent2); font-weight: 700; }
.terminal { background: #0a1a10; border: 1px solid rgba(255,255,255,0.08); border-radius: 14px; padding: 24px; max-width: 560px; margin: 0 auto 60px; font-family: var(--mono); font-size: 12.5px; line-height: 1.8; }
.terminal-line { color: rgba(255,255,255,0.55); }
.terminal-line.arrow { color: rgba(255,255,255,0.35); }
.terminal-line.arrow::before { content: '▸ '; }
.terminal-line.check { color: #5fce8a; }
.terminal-line.check::before { content: '✓ '; }
.terminal-line.clock { color: #f5a623; }
.terminal-line.clock::before { content: '⏰ '; }
.terminal-line.search { color: rgba(255,255,255,0.5); padding-left: 16px; }
.solution-cta-area { text-align: center; }
.btn-outline-white { background: transparent; color: #fff; border: 1.5px solid rgba(255,255,255,0.35); border-radius: 999px; padding: 13px 32px; font-size: 15px; font-weight: 500; font-family: var(--sans); cursor: pointer; transition: all 200ms ease; text-decoration: none; display: inline-block; }
.btn-outline-white:hover { border-color: rgba(255,255,255,0.7); background: rgba(255,255,255,0.06); }

.feature-grid-mini { display: grid; grid-template-columns: repeat(3,1fr); gap: 32px 48px; margin-top: 64px; padding-top: 64px; border-top: 1px solid rgba(255,255,255,0.07); }
.fgm-item { opacity: 0; transform: translateY(24px); }
.fgm-icon { font-size: 20px; margin-bottom: 12px; }
.fgm-title { font-size: 15px; font-weight: 600; color: #fff; margin-bottom: 6px; font-family: var(--sans); }
.fgm-body { font-size: 13px; color: rgba(255,255,255,0.55); line-height: 1.6; font-weight: 300; }

.marquee-section { margin-top: 64px; padding-top: 48px; border-top: 1px solid rgba(255,255,255,0.07); }
.marquee-label { font-size: 16px; font-weight: 500; color: #fff; margin-bottom: 24px; font-family: var(--sans); }
.marquee-track { overflow: hidden; position: relative; }
.marquee-inner { display: flex; gap: 16px; width: max-content; animation: marquee-left 24s linear infinite; }
.marquee-icon { width: 44px; height: 44px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 20px; background: rgba(255,255,255,0.07); flex-shrink: 0; }
@keyframes marquee-left { from { transform: translateX(0); } to { transform: translateX(-50%); } }

/* WIRE SECTION */
#wire-wrap { position: relative; height: 1200vh; background: #f2f0eb; }
#wire-stage { position: sticky; top: 0; width: 100%; height: 100vh; overflow: hidden; background: #f2f0eb; }
#wire-svg { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; z-index: 5; overflow: visible; }
#wire-heading { position: absolute; top: 0; left: 0; right: 0; padding: 24px 0 20px; text-align: center; z-index: 20; pointer-events: none; background: linear-gradient(to bottom,#f2f0eb 78%,rgba(242,240,235,0)); }
.wh-eyebrow { font-family: var(--sans); font-size: 11px; font-weight: 600; letter-spacing: .14em; text-transform: uppercase; color: rgba(13,25,16,.35); margin-bottom: 10px; display: flex; align-items: center; justify-content: center; gap: 8px; }
.wh-h1 { font-family: var(--serif); font-size: clamp(24px,3.5vw,44px); font-weight: 500; color: #0d1910; line-height: 1.1; }
.wh-sub { font-size: 15px; font-weight: 300; color: rgba(13,25,16,.45); margin-top: 8px; }
.wcard { position: absolute; background: #fff; border-radius: 14px; padding: 15px 17px; border: 1px solid rgba(0,0,0,.06); box-shadow: 0 4px 20px rgba(0,0,0,.07), 0 1px 3px rgba(0,0,0,.04); z-index: 6; will-change: transform,opacity; }
.wcdot { position: absolute; bottom: -6px; left: 50%; transform: translateX(-50%); width: 10px; height: 10px; border-radius: 50%; background: #2d6a45; border: 2.5px solid #f2f0eb; box-shadow: 0 0 0 2.5px rgba(45,106,69,.28); opacity: 0; transition: opacity .35s; z-index: 9; }
.wcard.wired .wcdot { opacity: 1; }
.wfname { font-family: var(--mono); font-size: 11px; font-weight: 500; color: #0d1910; margin-bottom: 9px; display: flex; align-items: center; gap: 7px; white-space: nowrap; overflow: hidden; }
.wficon { width: 20px; height: 20px; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 11px; flex-shrink: 0; }
.wlines { display: flex; flex-direction: column; gap: 5px; margin-bottom: 9px; }
.wln { height: 5px; border-radius: 3px; background: rgba(13,25,16,.08); }
.wln.f { width: 100%; } .wln.m { width: 72%; } .wln.s { width: 48%; }
.wtags { display: flex; flex-wrap: wrap; gap: 4px; }
.wtag { font-size: 10px; font-weight: 500; padding: 3px 9px; border-radius: 999px; font-family: var(--sans); }
.wtg { background: #e4f5ec; color: #2d6a45; } .wtb { background: #e4eef8; color: #2d50a0; } .wto { background: #fef3e2; color: #b45309; } .wtp { background: #f3e8ff; color: #7c3aed; } .wtn { background: #f3f4f6; color: #374151; }
#wsbox { position: absolute; background: #fff; border-radius: 18px; padding: 20px 22px; border: 1.5px solid rgba(45,106,69,.22); box-shadow: 0 10px 60px rgba(0,0,0,.12),0 2px 8px rgba(0,0,0,.05); z-index: 8; opacity: 0; will-change: transform,opacity; }
.wdot-t, .wdot-b { position: absolute; left: 50%; transform: translateX(-50%); width: 10px; height: 10px; border-radius: 50%; background: #2d6a45; border: 2.5px solid #f2f0eb; box-shadow: 0 0 0 2.5px rgba(45,106,69,.28); opacity: 0; transition: opacity .4s; z-index: 10; }
.wdot-t { top: -6px; } .wdot-b { bottom: -6px; }
.wsb-head { display: flex; align-items: center; gap: 11px; margin-bottom: 13px; }
.wsb-logo { width: 29px; height: 29px; background: #2d6a45; border-radius: 7px; display: flex; align-items: center; justify-content: center; font-size: 15px; flex-shrink: 0; }
.wsb-t { font-size: 13px; font-weight: 600; color: #0d1910; font-family: var(--sans); }
.wsb-s { font-size: 11px; color: rgba(13,25,16,.38); font-family: var(--sans); }
.wsb-chips { display: flex; gap: 6px; margin-bottom: 13px; flex-wrap: wrap; }
.wchip { font-size: 11px; padding: 3px 10px; border-radius: 999px; font-family: var(--sans); font-weight: 500; display: flex; align-items: center; gap: 5px; border: 1px solid rgba(0,0,0,.07); background: #f7f5f0; color: rgba(13,25,16,.6); }
.wchipdot { width: 6px; height: 6px; border-radius: 50%; display: inline-block; }
.wsb-input { background: #f7f6f1; border-radius: 10px; padding: 13px 15px; min-height: 50px; font-family: var(--mono); font-size: 13.5px; color: #0d1910; line-height: 1.6; }
#wtyped { display: inline; }
#wcur { display: inline-block; width: 2px; height: 1em; background: #2d6a45; vertical-align: middle; margin-left: 1px; animation: wblink .55s step-end infinite; visibility: hidden; }
#wcur.on { visibility: visible; }
@keyframes wblink { 0%,100% {opacity:1} 50% {opacity:0} }
.wsb-foot { display: flex; align-items: center; justify-content: space-between; margin-top: 13px; padding-top: 13px; border-top: 1px solid rgba(0,0,0,.055); }
.wsb-icons { display: flex; gap: 7px; }
.wibtn { width: 29px; height: 29px; border-radius: 7px; background: #f0ede8; display: flex; align-items: center; justify-content: center; font-size: 13px; color: rgba(13,25,16,.42); }
.wsbtn { background: #2d6a45; color: #fff; border: none; border-radius: 999px; padding: 8px 20px; font-size: 12px; font-weight: 600; font-family: var(--sans); cursor: pointer; display: flex; align-items: center; gap: 6px; }
.wspulse { width: 7px; height: 7px; border-radius: 50%; background: #5fce8a; display: inline-block; }
#wtoast { position: absolute; left: 50%; transform: translateX(-50%); white-space: nowrap; background: #2d6a45; color: #fff; font-size: 12px; font-weight: 500; font-family: var(--sans); padding: 8px 20px; border-radius: 999px; display: flex; align-items: center; gap: 8px; opacity: 0; z-index: 20; box-shadow: 0 4px 20px rgba(45,106,69,.35); pointer-events: none; }
.wtpulse { width: 7px; height: 7px; background: #5fce8a; border-radius: 50%; }
#wcA { overflow: hidden; transition: border-color 0.3s; }
#wcA-expanded { font-family: var(--sans); }

#capture { position: relative; background: var(--dark); padding: 120px 80px; z-index: 1; }
.capture-inner { display: flex; align-items: flex-start; gap: 80px; max-width: 1100px; margin: 0 auto; }
.capture-left { flex: 1; opacity: 0; transform: translateX(-40px); }
.capture-left .section-eyebrow { justify-content: flex-start; }
.capture-heading { font-family: var(--serif); font-size: clamp(42px,5vw,60px); font-weight: 500; color: #fff; line-height: 1.1; margin-top: 16px; }
.capture-right { flex: 1; display: flex; flex-direction: column; gap: 40px; opacity: 0; transform: translateX(40px); padding-top: 8px; }
.cf-icon { font-size: 18px; margin-bottom: 10px; }
.cf-title { font-size: 16px; font-weight: 600; color: #fff; margin-bottom: 6px; font-family: var(--sans); }
.cf-body { font-size: 14px; color: rgba(255,255,255,0.55); line-height: 1.65; font-weight: 300; }

#features { background: var(--light); padding: 120px 48px; position: relative; z-index: 2; }
.features-inner { max-width: 1100px; margin: 0 auto; }
.features-quote { font-family: var(--serif); font-size: clamp(28px,3.5vw,38px); font-style: italic; color: var(--text-dark); text-align: center; max-width: 680px; margin: 0 auto 20px; line-height: 1.35; opacity: 0; transform: translateY(30px); }
.features-quote em { font-style: normal; font-weight: 700; }
.features-cta-area { text-align: center; margin-bottom: 64px; opacity: 0; transform: translateY(20px); }
.btn-dark-solid { background: var(--dark); color: #fff; border: none; border-radius: 999px; padding: 14px 32px; font-size: 15px; font-weight: 500; font-family: var(--sans); cursor: pointer; transition: all 200ms ease; text-decoration: none; display: inline-block; }
.btn-dark-solid:hover { background: var(--accent); }
.feature-cards-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.feature-cards-row3 { display: grid; grid-template-columns: repeat(3,1fr); gap: 16px; margin-top: 16px; }
.feat-card { background: #fff; border-radius: 16px; padding: 28px; box-shadow: 0 1px 4px rgba(0,0,0,0.06); opacity: 0; transform: translateY(28px); }
.feat-card-large { padding: 28px; }
.feat-card-icon { font-size: 22px; margin-bottom: 14px; }
.feat-card-title { font-size: 17px; font-weight: 600; color: var(--dark); font-family: var(--sans); margin-bottom: 8px; }
.feat-card-body { font-size: 13px; color: rgba(10,31,20,0.55); line-height: 1.65; font-weight: 300; }
.feat-card-screen { margin-top: 20px; background: #f5f4f0; border-radius: 10px; padding: 16px; min-height: 100px; }
.model-selector { max-width: 280px; }
.ms-search { display: flex; align-items: center; gap: 8px; background: #fff; border: 1px solid rgba(0,0,0,0.1); border-radius: 8px; padding: 7px 12px; margin-bottom: 8px; }
.ms-search span { font-size: 11px; color: rgba(10,31,20,0.4); font-family: var(--sans); }
.ms-group-label { font-size: 9px; text-transform: uppercase; letter-spacing: 0.1em; color: rgba(10,31,20,0.35); font-weight: 700; margin: 8px 0 4px; font-family: var(--sans); }
.ms-item { display: flex; align-items: center; gap: 8px; padding: 6px 8px; border-radius: 6px; cursor: pointer; }
.ms-item:hover { background: rgba(0,0,0,0.04); }
.ms-item.active { background: rgba(45,106,69,0.1); }
.ms-item-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
.ms-item-name { font-size: 11px; color: var(--dark); font-family: var(--sans); }
.ms-item.active .ms-item-name { color: var(--accent); font-weight: 600; }
.search-grid-mini { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
.sgm-item { background: rgba(10,31,20,0.04); border-radius: 8px; padding: 10px; }
.sgm-icon { font-size: 14px; margin-bottom: 4px; }
.sgm-name { font-size: 10px; font-weight: 600; color: var(--dark); font-family: var(--sans); }
.sgm-desc { font-size: 9px; color: rgba(10,31,20,0.45); }

#who { background: var(--dark); padding: 120px 48px 0; position: relative; z-index: 1; overflow: hidden; }
.who-heading { font-family: var(--serif); font-size: clamp(48px,6vw,72px); color: #fff; text-align: center; max-width: 780px; margin: 24px auto 64px; line-height: 1.08; opacity: 0; transform: translateY(30px); }
#carousel-wrapper { height: 220vh; position: relative; }
#carousel-pinned { position: sticky; top: 0; height: 100vh; display: flex; flex-direction: column; justify-content: center; overflow: hidden; padding: 0 0 40px; }
.carousel-track-outer { overflow: hidden; padding: 20px 0; }
.carousel-track { display: flex; gap: 20px; padding: 0 48px; will-change: transform; }
.audience-card { flex-shrink: 0; width: 320px; height: 460px; border-radius: 20px; padding: 32px 28px 0; overflow: hidden; display: flex; flex-direction: column; }
.ac-label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 700; margin-bottom: 8px; font-family: var(--sans); opacity: 0.6; }
.ac-title { font-family: var(--serif); font-size: 44px; font-weight: 500; line-height: 1; margin-bottom: 10px; }
.ac-body { font-size: 14px; line-height: 1.5; opacity: 0.7; font-weight: 300; margin-bottom: 20px; font-family: var(--sans); }
.ac-tags { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 20px; }
.ac-tag { font-size: 11px; padding: 4px 12px; border-radius: 999px; font-family: var(--sans); font-weight: 500; }
.ac-screen { flex: 1; border-radius: 12px 12px 0 0; overflow: hidden; position: relative; margin: 0 -28px; }
.ac-screen-inner { padding: 12px 14px; height: 100%; }
.ac-freelancer { background: #c8b99a; color: #3d2a0e; } .ac-freelancer .ac-tag { background: rgba(61,42,14,0.12); color: rgba(61,42,14,0.8); } .ac-freelancer .ac-screen { background: #f7f3ec; }
.ac-business { background: #8aaa8a; color: #1a2e1a; } .ac-business .ac-tag { background: rgba(26,46,26,0.12); color: rgba(26,46,26,0.8); } .ac-business .ac-screen { background: #edf4ed; }
.ac-legal { background: #7f8fbd; color: #fff; } .ac-legal .ac-tag { background: rgba(255,255,255,0.18); color: #fff; } .ac-legal .ac-screen { background: #e8ecf5; }
.ac-healthcare { background: #b08faf; color: #fff; } .ac-healthcare .ac-tag { background: rgba(255,255,255,0.18); color: #fff; } .ac-healthcare .ac-screen { background: #f0eaf0; }
.ac-students { background: #c4617a; color: #fff; } .ac-students .ac-tag { background: rgba(255,255,255,0.18); color: #fff; } .ac-students .ac-screen { background: #f9ebed; }

#security { background: var(--dark); padding: 120px 48px; position: relative; z-index: 1; }
.security-inner { max-width: 1100px; margin: 0 auto; }
.security-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 16px; margin-top: 48px; }
.sec-card { background: var(--dark-card); border: 1px solid rgba(255,255,255,0.06); border-radius: 16px; padding: 28px; opacity: 0; transform: translateY(24px); }
.sec-card-icon { font-size: 28px; margin-bottom: 16px; }
.sec-card-title { font-size: 15px; font-weight: 600; color: #fff; margin-bottom: 8px; font-family: var(--sans); }
.sec-card-body { font-size: 13px; color: rgba(255,255,255,0.5); line-height: 1.65; font-weight: 300; }

#testimonials { background: var(--dark); padding: 0 0 120px; overflow: hidden; position: relative; z-index: 1; }
.testi-rows { display: flex; flex-direction: column; gap: 20px; }
.testi-row { display: flex; gap: 20px; width: max-content; }
.testi-row-1 { animation: marquee-left 30s linear infinite; }
.testi-row-2 { animation: marquee-left 36s linear infinite reverse; }
.testi-card { flex-shrink: 0; background: var(--dark-card); border: 1px solid rgba(255,255,255,0.06); border-radius: 16px; padding: 24px 28px; width: 320px; }
.testi-stars { font-size: 12px; margin-bottom: 10px; color: #f5a623; }
.testi-quote { font-size: 13px; color: rgba(255,255,255,0.75); line-height: 1.7; font-weight: 300; font-style: italic; margin-bottom: 14px; }
.testi-author { display: flex; align-items: center; gap: 10px; }
.testi-avatar { width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; color: #fff; flex-shrink: 0; font-family: var(--sans); }
.testi-name { font-size: 12px; font-weight: 600; color: rgba(255,255,255,0.85); font-family: var(--sans); }
.testi-role { font-size: 11px; color: rgba(255,255,255,0.4); font-family: var(--sans); }

#pricing { background: var(--light); padding: 120px 48px; position: relative; z-index: 2; }
.pricing-inner { max-width: 1000px; margin: 0 auto; }
.pricing-toggle { display: flex; align-items: center; justify-content: center; gap: 12px; margin-bottom: 48px; }
.pt-label { font-size: 14px; color: rgba(10,31,20,0.6); font-family: var(--sans); }
.pt-badge { font-size: 11px; background: var(--accent); color: #fff; border-radius: 999px; padding: 2px 10px; font-weight: 600; }
.pricing-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 20px; }
.price-card { background: #fff; border-radius: 20px; padding: 32px; border: 1.5px solid transparent; opacity: 0; transform: translateY(28px); transition: border-color 200ms ease; }
.price-card:hover { border-color: rgba(45,106,69,0.3); }
.price-card.featured { background: var(--dark); border-color: var(--accent); }
.pc-plan { font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: rgba(10,31,20,0.4); margin-bottom: 12px; font-family: var(--sans); }
.price-card.featured .pc-plan { color: rgba(255,255,255,0.45); }
.pc-price { font-family: var(--serif); font-size: 52px; font-weight: 500; color: var(--dark); line-height: 1; }
.price-card.featured .pc-price { color: #fff; }
.pc-price sup { font-size: 22px; font-family: var(--sans); vertical-align: super; }
.pc-price-sub { font-size: 13px; color: rgba(10,31,20,0.4); margin-top: 4px; margin-bottom: 6px; font-family: var(--sans); }
.price-card.featured .pc-price-sub { color: rgba(255,255,255,0.4); }
.pc-desc { font-size: 13px; color: rgba(10,31,20,0.55); margin-bottom: 24px; font-family: var(--sans); line-height: 1.5; }
.price-card.featured .pc-desc { color: rgba(255,255,255,0.5); }
.pc-cta { display: block; text-align: center; border-radius: 999px; padding: 12px; font-size: 14px; font-weight: 600; font-family: var(--sans); text-decoration: none; cursor: pointer; border: none; width: 100%; transition: all 200ms ease; margin-bottom: 24px; }
.pc-cta-dark { background: var(--dark); color: #fff; }
.pc-cta-dark:hover { background: var(--accent); }
.pc-cta-green { background: var(--accent); color: #fff; }
.pc-cta-green:hover { background: var(--accent2); }
.pc-cta-outline { background: transparent; color: var(--dark); border: 1.5px solid rgba(10,31,20,0.2); }
.pc-cta-outline:hover { border-color: var(--accent); color: var(--accent); }
.pc-divider { height: 1px; background: rgba(10,31,20,0.07); margin-bottom: 20px; }
.price-card.featured .pc-divider { background: rgba(255,255,255,0.1); }
.pc-features { list-style: none; display: flex; flex-direction: column; gap: 10px; }
.pc-features li { font-size: 13px; color: rgba(10,31,20,0.65); display: flex; align-items: flex-start; gap: 8px; font-family: var(--sans); }
.price-card.featured .pc-features li { color: rgba(255,255,255,0.65); }
.pc-features li::before { content: '✓'; color: var(--accent); font-weight: 700; flex-shrink: 0; margin-top: 1px; }

#roadmap { background: var(--dark); padding: 120px 48px; position: relative; z-index: 1; }
.roadmap-inner { max-width: 900px; margin: 0 auto; }
.roadmap-track { display: flex; flex-direction: column; gap: 0; margin-top: 48px; }
.roadmap-item { display: flex; gap: 40px; padding-bottom: 40px; position: relative; opacity: 0; transform: translateX(-30px); }
.roadmap-item::before { content: ''; position: absolute; left: 59px; top: 32px; bottom: 0; width: 1px; background: rgba(255,255,255,0.08); }
.roadmap-item:last-child::before { display: none; }
.rm-dot-col { display: flex; flex-direction: column; align-items: center; flex-shrink: 0; }
.rm-dot { width: 16px; height: 16px; border-radius: 50%; border: 2px solid rgba(255,255,255,0.2); background: var(--dark); flex-shrink: 0; margin-top: 4px; position: relative; z-index: 1; }
.rm-dot.active { background: var(--accent); border-color: var(--accent); box-shadow: 0 0 12px rgba(45,106,69,0.5); }
.rm-quarter { font-size: 12px; font-weight: 600; color: rgba(255,255,255,0.4); font-family: var(--mono); width: 40px; text-align: center; margin-top: 6px; }
.rm-content { flex: 1; padding-top: 0; }
.rm-version { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: var(--accent); margin-bottom: 6px; font-family: var(--sans); }
.rm-title { font-family: var(--serif); font-size: 24px; color: #fff; margin-bottom: 8px; }
.rm-body { font-size: 13px; color: rgba(255,255,255,0.5); line-height: 1.65; font-weight: 300; margin-bottom: 12px; }
.rm-badge { display: inline-block; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; padding: 3px 10px; border-radius: 999px; font-family: var(--sans); }
.rm-badge-live { background: rgba(95,206,138,0.15); color: #5fce8a; border: 1px solid rgba(95,206,138,0.3); }
.rm-badge-dev { background: rgba(245,166,35,0.12); color: #f5a623; border: 1px solid rgba(245,166,35,0.3); }
.rm-badge-planned { background: rgba(255,255,255,0.06); color: rgba(255,255,255,0.4); border: 1px solid rgba(255,255,255,0.1); }

#footer-gallery { background: var(--dark); padding: 80px 0 0; overflow: hidden; position: relative; z-index: 1; }
.fg-rows { display: flex; flex-direction: column; gap: 16px; }
.fg-row { display: flex; gap: 16px; width: max-content; }
.fg-row-1 { animation: marquee-left 28s linear infinite; }
.fg-row-2 { animation: marquee-left 22s linear infinite reverse; }
.fg-row-3 { animation: marquee-left 32s linear infinite; }
.fg-item { flex-shrink: 0; height: 80px; border-radius: 10px; background: rgba(255,255,255,0.05); display: flex; align-items: center; justify-content: center; padding: 0 20px; gap: 10px; opacity: 0.3; }
.fgi-icon { font-size: 22px; }
.fgi-text { font-size: 12px; color: rgba(255,255,255,0.7); font-family: var(--sans); white-space: nowrap; }

footer { background: var(--dark); padding: 60px 80px 40px; position: relative; z-index: 1; border-top: 1px solid rgba(255,255,255,0.06); }
.footer-top { display: flex; justify-content: space-between; margin-bottom: 48px; }
.footer-brand { }
.footer-logo { font-family: var(--serif); font-size: 20px; color: #fff; display: flex; align-items: center; gap: 10px; margin-bottom: 12px; }
.footer-logo-icon { width: 28px; height: 28px; background: var(--accent); border-radius: 6px; display: flex; align-items: center; justify-content: center; font-size: 14px; }
.footer-tagline { font-size: 13px; color: rgba(255,255,255,0.4); max-width: 200px; line-height: 1.6; font-weight: 300; }
.footer-socials { display: flex; gap: 12px; margin-top: 16px; }
.footer-social { width: 34px; height: 34px; border-radius: 50%; border: 1px solid rgba(255,255,255,0.15); display: flex; align-items: center; justify-content: center; font-size: 14px; color: rgba(255,255,255,0.5); cursor: pointer; transition: all 150ms ease; text-decoration: none; }
.footer-social:hover { border-color: rgba(255,255,255,0.5); color: #fff; }
.footer-links { display: flex; gap: 60px; }
.footer-col-title { font-size: 13px; font-weight: 600; color: #fff; margin-bottom: 16px; font-family: var(--sans); }
.footer-col-links { list-style: none; display: flex; flex-direction: column; gap: 10px; }
.footer-col-links a { font-size: 13px; color: rgba(255,255,255,0.45); text-decoration: none; transition: color 150ms ease; font-weight: 300; cursor: pointer; }
.footer-col-links a:hover { color: rgba(255,255,255,0.85); }
.footer-bottom { display: flex; justify-content: space-between; align-items: center; padding-top: 24px; border-top: 1px solid rgba(255,255,255,0.06); }
.footer-copy { font-size: 12px; color: rgba(255,255,255,0.25); font-family: var(--sans); }
.footer-loc { font-size: 12px; color: rgba(255,255,255,0.25); font-family: var(--sans); }

#final-cta { background: var(--dark-card); margin: 0 32px 32px; border-radius: 24px; padding: 80px 48px; text-align: center; border: 1px solid rgba(255,255,255,0.06); position: relative; z-index: 1; opacity: 0; transform: translateY(40px); }
.fc-badge { display: inline-block; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.12em; background: rgba(95,206,138,0.12); color: #5fce8a; border: 1px solid rgba(95,206,138,0.25); border-radius: 999px; padding: 4px 16px; margin-bottom: 24px; font-family: var(--sans); }
.fc-heading { font-family: var(--serif); font-size: clamp(36px,5vw,58px); color: #fff; max-width: 640px; margin: 0 auto 16px; line-height: 1.1; }
.fc-sub { font-size: 16px; color: rgba(255,255,255,0.55); max-width: 440px; margin: 0 auto 36px; line-height: 1.6; font-weight: 300; }
.fc-actions { display: flex; align-items: center; justify-content: center; gap: 16px; }
.fc-fine { font-size: 12px; color: rgba(255,255,255,0.3); margin-top: 16px; font-family: var(--sans); }

.cursor-blink { display: inline-block; width: 3px; height: 0.85em; background: #fff; vertical-align: middle; margin-left: 2px; animation: blink 0.5s step-end infinite; }
@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }

::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: var(--dark); }
::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.15); border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.25); }
`;

export default function LandingPage() {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const navbarRef = useRef(null);

  useEffect(() => {
    let ctx;
    let resizeListener;
    let scrollListener;
    let isCleanup = false;

    // Load GSAP dynamically to ensure this is a copy-pasteable component
    // without requiring npm installs locally.
    const loadScript = (src) => new Promise((resolve, reject) => {
      if (document.querySelector(`script[src="${src}"]`)) {
        resolve();
        return;
      }
      const script = document.createElement('script');
      script.src = src;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });

    const initLogic = () => {
      const gsap = window.gsap;
      const ScrollTrigger = window.ScrollTrigger;
      if (!gsap || !ScrollTrigger || isCleanup) return;

      gsap.registerPlugin(ScrollTrigger);

      // --- Particle System ---
      const initParticles = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx2d = canvas.getContext('2d');
        let W, H, dots = [];

        const resize = () => {
          if (!canvas) return;
          W = canvas.width = window.innerWidth;
          H = canvas.height = document.body.scrollHeight;
          dots = [];
          for (let i = 0; i < 180; i++) {
            dots.push({ x: Math.random() * W, y: Math.random() * H, r: Math.random() * 1.5 + 0.5, o: Math.random() * 0.15 + 0.05 });
          }
          drawDots();
        };

        const drawDots = () => {
          if (!ctx2d) return;
          ctx2d.clearRect(0, 0, W, H);
          dots.forEach(d => {
            ctx2d.beginPath();
            ctx2d.arc(d.x, d.y, d.r, 0, Math.PI * 2);
            ctx2d.fillStyle = `rgba(255,255,255,${d.o})`;
            ctx2d.fill();
          });
        };

        resizeListener = () => setTimeout(resize, 100);
        window.addEventListener('resize', resizeListener);
        setTimeout(resize, 100);
      };
      initParticles();

      // --- Navbar Scroll ---
      scrollListener = () => {
        if (!navbarRef.current) return;
        if (window.scrollY > 60) navbarRef.current.classList.add('scrolled');
        else navbarRef.current.classList.remove('scrolled');
      };
      window.addEventListener('scroll', scrollListener, { passive: true });

      // --- GSAP Animations (Scoped to containerRef) ---
      ctx = gsap.context(() => {

        // Hero Typewriter
        const heading = document.getElementById('hero-heading');
        if (heading) {
          const text = heading.textContent;
          heading.innerHTML = '';
          heading.style.opacity = '1';
          let i = 0;
          const cursor = document.createElement('span');
          cursor.className = 'cursor-blink';
          heading.appendChild(cursor);

          setTimeout(() => {
            const interval = setInterval(() => {
              if (i < text.length) {
                cursor.insertAdjacentText('beforebegin', text[i]);
                i++;
              } else {
                clearInterval(interval);
                setTimeout(() => { cursor.style.display = 'none'; }, 800);
              }
            }, 22);
          }, 400);
        }

        gsap.to('.hero-eyebrow', { opacity: 1, y: 0, duration: 0.5, delay: 0.2, ease: 'power2.out' });
        gsap.to('.hero-sub', { opacity: 1, y: 0, duration: 0.5, delay: 0.7, ease: 'power2.out' });
        gsap.to('.hero-actions', { opacity: 1, y: 0, duration: 0.5, delay: 0.95, ease: 'power2.out' });
        gsap.to('#hero-cards', { opacity: 1, y: 0, duration: 0.9, delay: 1.2, ease: 'power2.out' });

        gsap.to('.hero-content-inner', { scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 1 }, yPercent: -15, opacity: 0 });
        gsap.to('#hero-cards', { scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 1 }, y: -40, scale: 1.04 });

        gsap.to('#product-window', { scrollTrigger: { trigger: '#product-window-wrapper', start: 'top top', end: '+=60%', scrub: 1.5 }, y: 0, opacity: 1, ease: 'power2.out' });
        gsap.to('#product-window', { scrollTrigger: { trigger: '#product-window-wrapper', start: '85% top', end: 'bottom top', scrub: 1 }, y: -120, opacity: 0, scale: 0.97 });

        gsap.utils.toArray('.narrative-p').forEach(el => {
          gsap.to(el, { scrollTrigger: { trigger: el, start: 'top 85%', end: 'top 50%', scrub: false }, opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' });
        });

        gsap.to('#solution-card', { scrollTrigger: { trigger: '#solution-card', start: 'top 90%' }, opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power2.out' });

        gsap.utils.toArray('.fgm-item').forEach((el, i) => {
          gsap.to(el, { scrollTrigger: { trigger: '#fgm', start: 'top 80%' }, opacity: 1, y: 0, duration: 0.5, delay: i * 0.08, ease: 'power2.out' });
        });

        // --- WIRE ANIMATION SCRIPT ---
        const WCARDS = [
          { id: 'wcA', sc: { l: 4, t: 20 }, gc: { l: 2, t: 15 }, sr: -4, gr: -2 },
          { id: 'wcB', sc: { l: 67, t: 10 }, gc: { l: 56, t: 14 }, sr: 5, gr: 3 },
          { id: 'wcC', sc: { l: 7, t: 55 }, gc: { l: 24, t: 16 }, sr: 3, gr: 1 },
          { id: 'wcD', sc: { l: 63, t: 52 }, gc: { l: 64, t: 13 }, sr: -4, gr: -2 },
          { id: 'wcE', sc: { l: 36, t: 68 }, gc: { l: 40, t: 15 }, sr: 2, gr: 0 },
        ];
        const QUERY = 'Find my insurance renewal document';

        const wstage = document.getElementById('wire-stage');
        const wsbox = document.getElementById('wsbox');
        const wcA = document.getElementById('wcA');
        const compact = document.getElementById('wcA-compact');
        const expanded = document.getElementById('wcA-expanded');
        const wtoast = document.getElementById('wtoast');
        const wcur = document.getElementById('wcur');

        if (wstage && wsbox && wcA) {
          const WP = {
            A: [document.getElementById('wpA'), document.getElementById('wpAg')],
            B: [document.getElementById('wpB'), document.getElementById('wpBg')],
            C: [document.getElementById('wpC'), document.getElementById('wpCg')],
            D: [document.getElementById('wpD'), document.getElementById('wpDg')],
            E: [document.getElementById('wpE'), document.getElementById('wpEg')],
            V: [document.getElementById('wpV'), document.getElementById('wpVg')],
          };

          const vw = p => p / 100 * window.innerWidth;
          const vh = p => p / 100 * window.innerHeight;
          const cl = (v, a, b) => Math.min(b, Math.max(a, v));
          const pr = (p, a, b) => cl((p - a) / (b - a), 0, 1);
          const eo = t => 1 - Math.pow(1 - t, 3);
          const ei = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
          const lp = (a, b, t) => a + (b - a) * t;

          function rel(el) {
            const sr = wstage.getBoundingClientRect();
            const er = el.getBoundingClientRect();
            return {
              t: er.top - sr.top, b: er.bottom - sr.top,
              l: er.left - sr.left, r: er.right - sr.left,
              w: er.width, h: er.height,
              cx: er.left - sr.left + er.width / 2, cy: er.top - sr.top + er.height / 2,
              bcx: er.left - sr.left + er.width / 2, bcy: er.bottom - sr.top,
              tcx: er.left - sr.left + er.width / 2, tcy: er.top - sr.top,
            };
          }

          function sv(x, y) { return { x: x / window.innerWidth * 1440, y: y / window.innerHeight * 900 }; }
          function cubic(x1, y1, x2, y2) { const dy = y2 - y1, dx = x2 - x1; return `M${x1},${y1} C${x1 + dx * .05},${y1 + dy * .58} ${x2 - dx * .05},${y2 - dy * .58} ${x2},${y2}`; }
          function setPath(el, d) { el.setAttribute('d', d); const L = el.getTotalLength ? el.getTotalLength() : 600; el.setAttribute('stroke-dasharray', L); return L; }
          function drawPath(el, frac, L) { el.setAttribute('stroke-dashoffset', L * (1 - cl(frac, 0, 1))); }

          let cA_gatheredTop = 0, cA_gatheredLeft = 0;

          function placeAll() {
            WCARDS.forEach(c => {
              gsap.set(document.getElementById(c.id), { left: vw(c.sc.l), top: vh(c.sc.t), rotation: c.sr, opacity: 1, x: 0, y: 0, width: '', height: '' });
            });
            const sbW = Math.min(500, window.innerWidth * 0.84);
            gsap.set(wsbox, { left: (window.innerWidth - sbW) / 2, top: window.innerHeight * 0.60, width: sbW, opacity: 0, scale: 0.92 });
            expanded.style.display = 'none'; expanded.style.opacity = '0';
            compact.style.display = 'block'; compact.style.opacity = '1';

            Object.values(WP).forEach(([g, gg]) => {
              if (!g || !gg) return;
              g.style.opacity = '0'; gg.style.opacity = '0';
              const Lg = parseFloat(g.getAttribute('stroke-dasharray')) || 999;
              const Lgg = parseFloat(gg.getAttribute('stroke-dasharray')) || 999;
              g.setAttribute('stroke-dashoffset', Lg); gg.setAttribute('stroke-dashoffset', Lgg);
            });
            gsap.set(wtoast, { opacity: 0 });
          }

          const floats = [];
          function startFloat() {
            WCARDS.forEach((c, i) => {
              const t = gsap.to(document.getElementById(c.id), { y: '-=9', duration: 2.0 + i * .38, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: i * .3 });
              floats.push(t);
            });
          }

          const locked = { A: false, B: false, C: false, D: false, E: false };

          function updateWires(slideP) {
            const sbR = rel(wsbox);
            const sbTopSV = sv(sbR.tcx, sbR.tcy);

            ['B', 'C', 'D', 'E'].forEach(k => {
              if (!WP[k][0]) return;
              const idx = { B: 1, C: 2, D: 3, E: 4 }[k];
              const er = rel(document.getElementById(WCARDS[idx].id));
              const s = sv(er.bcx, er.bcy);
              const d = cubic(s.x, s.y, sbTopSV.x, sbTopSV.y);
              const L = setPath(WP[k][0], d);
              setPath(WP[k][1], d);
              if (!locked[k]) {
                drawPath(WP[k][0], 0, L);
              } else {
                WP[k][0].setAttribute('stroke-dashoffset', '0'); WP[k][1].setAttribute('stroke-dashoffset', '0');
              }
            });

            const erA = rel(wcA);
            const sA = sv(erA.bcx, erA.bcy);
            const dA = cubic(sA.x, sA.y, sbTopSV.x, sbTopSV.y);
            const LA = setPath(WP.A[0], dA);
            setPath(WP.A[1], dA);
            if (locked.A && WP.A[0]) {
              WP.A[0].setAttribute('stroke-dashoffset', '0'); WP.A[1].setAttribute('stroke-dashoffset', '0');
              WP.A[0].style.opacity = '1'; WP.A[1].style.opacity = '1';
            }

            if (slideP > 0 && WP.V[0]) {
              const sbBotSV = sv(sbR.bcx, sbR.bcy);
              const rcTopSV = sv(erA.tcx, erA.tcy);
              const dV = `M${sbBotSV.x},${sbBotSV.y} L${rcTopSV.x},${rcTopSV.y}`;
              setPath(WP.V[0], dV); setPath(WP.V[1], dV);
              WP.V[0].setAttribute('stroke-dashoffset', '0'); WP.V[1].setAttribute('stroke-dashoffset', '0');
              WP.V[0].style.opacity = '1'; WP.V[1].style.opacity = String(eo(pr(slideP, 0.1, 0.4)));
            } else if (WP.V[0]) {
              WP.V[0].style.opacity = '0'; WP.V[1].style.opacity = '0';
            }
          }

          function drive(p) {
            WCARDS.forEach((c, i) => {
              const el = document.getElementById(c.id);
              const ms = 0.08 + i * 0.022; const me = 0.32 + i * 0.008;
              const mp = ei(pr(p, ms, me));
              const curL = lp(vw(c.sc.l), vw(c.gc.l), mp); const curT = lp(vh(c.sc.t), vh(c.gc.t), mp); const curR = lp(c.sr, c.gr, mp);
              if (i === 0 && pr(p, 0.78, 0.98) > 0) return;
              gsap.set(el, { left: curL, top: curT, rotation: curR });
              if (i === 0 && mp > 0.98) { const r = rel(el); cA_gatheredTop = r.t; cA_gatheredLeft = r.l; }
            });

            const slideP = eo(pr(p, 0.78, 0.98));
            updateWires(slideP);

            ['B', 'C', 'D', 'E', 'A'].forEach((k, i) => {
              if (!WP[k][0]) return;
              const ws = 0.30 + i * 0.032; const we = ws + 0.14; const wp = pr(p, ws, we);
              if (!locked[k]) {
                const L = parseFloat(WP[k][0].getAttribute('stroke-dasharray')) || 600;
                drawPath(WP[k][0], wp, L);
                WP[k][0].style.opacity = wp > 0 ? '1' : '0';
                const gp = eo(pr(p, we - 0.01, we + 0.05));
                WP[k][1].style.opacity = String(gp);
                if (gp > 0) WP[k][1].setAttribute('stroke-dashoffset', '0');
                if (wp >= 1 && gp >= 1) locked[k] = true;
              }
              const idx = { A: 0, B: 1, C: 2, D: 3, E: 4 }[k];
              const cardEl = document.getElementById(WCARDS[idx].id);
              if (pr(p, ws, we) > 0.85) cardEl.classList.add('wired'); else cardEl.classList.remove('wired');
            });

            const sbP = eo(pr(p, 0.50, 0.62));
            gsap.set(wsbox, { opacity: sbP, scale: 0.92 + sbP * 0.08 });
            wsbox.querySelector('.wdot-t').style.opacity = sbP > 0.65 ? '1' : '0';

            const typP = pr(p, 0.62, 0.78);
            if (typP > 0 && typP < 1) {
              document.getElementById('wtyped').textContent = QUERY.slice(0, Math.floor(typP * QUERY.length)); wcur.classList.add('on');
            } else if (typP <= 0) {
              document.getElementById('wtyped').textContent = ''; wcur.classList.remove('on');
            } else {
              document.getElementById('wtyped').textContent = QUERY; wcur.classList.remove('on');
            }
            wsbox.querySelector('.wdot-b').style.opacity = typP >= 1 ? '1' : '0';

            if (slideP > 0) {
              const sbRect = wsbox.getBoundingClientRect(); const srRect = wstage.getBoundingClientRect();
              const endTop = (sbRect.bottom - srRect.top) + 28;
              const endLeft = (window.innerWidth - Math.min(460, window.innerWidth * 0.84)) / 2;
              const endW = Math.min(460, window.innerWidth * 0.84);
              const cANow = rel(wcA);
              const curTop = lp(cA_gatheredTop || cANow.t, endTop, slideP);
              const curLeft = lp(cA_gatheredLeft || cANow.l, endLeft, slideP);
              const curW = lp(202, endW, slideP);

              gsap.set(wcA, { top: curTop, left: curLeft, width: curW, rotation: lp(-2, 0, slideP) });
              const crossP = eo(pr(slideP, 0.25, 0.75));
              compact.style.opacity = String(1 - crossP);
              expanded.style.display = 'block'; expanded.style.opacity = String(crossP);
              floats.forEach(t => t.pause()); gsap.set(wcA, { y: 0 });
            } else {
              compact.style.opacity = '1'; expanded.style.display = 'none';
            }

            const toastP = eo(pr(p, 0.88, 0.95));
            if (toastP > 0) {
              const sbB = wsbox.getBoundingClientRect().bottom - wstage.getBoundingClientRect().top;
              const cAT = rel(wcA).t;
              const midY = (sbB + cAT) / 2 - 16;
              gsap.set(wtoast, { opacity: toastP, top: midY, bottom: 'auto', left: '50%', x: '-50%', y: 8 * (1 - toastP) });
            } else { gsap.set(wtoast, { opacity: 0 }); }
          }

          placeAll();
          startFloat();

          ScrollTrigger.create({
            trigger: '#wire-wrap',
            start: 'top top',
            end: 'bottom bottom',
            pin: '#wire-stage',
            pinSpacing: false,
            scrub: 1.4,
            onUpdate(self) { drive(self.progress); },
          });

          const wireResizeHandler = () => { placeAll(); ScrollTrigger.refresh(); };
          window.addEventListener('resize', wireResizeHandler);
          // Append specific cleanup for inner functions to the context
          ctx.add(() => window.removeEventListener('resize', wireResizeHandler));
        }

        // --- Other Sections ---
        gsap.to('#capture-left', { scrollTrigger: { trigger: '#capture', start: 'top 75%' }, opacity: 1, x: 0, duration: 0.7, ease: 'power2.out' });
        gsap.to('#capture-right', { scrollTrigger: { trigger: '#capture', start: 'top 75%' }, opacity: 1, x: 0, duration: 0.7, delay: 0.15, ease: 'power2.out' });
        gsap.to('#features-quote', { scrollTrigger: { trigger: '#features-quote', start: 'top 80%' }, opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' });
        gsap.to('#features-cta', { scrollTrigger: { trigger: '#features-cta', start: 'top 85%' }, opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' });

        gsap.utils.toArray('#feat-grid .feat-card, #feat-grid-3 .feat-card').forEach((el, i) => {
          gsap.to(el, { scrollTrigger: { trigger: '#feat-grid', start: 'top 80%' }, opacity: 1, y: 0, duration: 0.5, delay: el.dataset.delay ? el.dataset.delay / 1000 : i * 0.08, ease: 'power2.out' });
        });

        gsap.utils.toArray('#feat-grid-3 .feat-card').forEach((el, i) => {
          gsap.to(el, { scrollTrigger: { trigger: '#feat-grid-3', start: 'top 85%' }, opacity: 1, y: 0, duration: 0.5, delay: i * 0.08, ease: 'power2.out' });
        });

        gsap.to('#who-heading', { scrollTrigger: { trigger: '#who-heading', start: 'top 80%' }, opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' });

        ScrollTrigger.create({ trigger: '#carousel-wrapper', start: 'top top', end: '+=220vh', pin: '#carousel-pinned', pinSpacing: false });
        const track = document.getElementById('carousel-track');
        if (track) {
          const totalScroll = track.scrollWidth - window.innerWidth + 96;
          gsap.to(track, { scrollTrigger: { trigger: '#carousel-wrapper', start: 'top top', end: '+=220vh', scrub: 1.2 }, x: -totalScroll, ease: 'none' });
        }

        gsap.utils.toArray('#security-grid .sec-card').forEach((el, i) => {
          gsap.to(el, { scrollTrigger: { trigger: '#security-grid', start: 'top 80%' }, opacity: 1, y: 0, duration: 0.5, delay: i * 0.08, ease: 'power2.out' });
        });

        gsap.utils.toArray('#roadmap-track .roadmap-item').forEach(el => {
          gsap.to(el, { scrollTrigger: { trigger: el, start: 'top 80%' }, opacity: 1, x: 0, duration: 0.6, ease: 'power2.out' });
        });

        gsap.utils.toArray('#pricing-grid .price-card').forEach((el) => {
          gsap.to(el, { scrollTrigger: { trigger: '#pricing-grid', start: 'top 80%' }, opacity: 1, y: 0, duration: 0.5, delay: el.dataset.delay ? el.dataset.delay / 1000 : 0, ease: 'power2.out' });
        });

        gsap.to('#final-cta', { scrollTrigger: { trigger: '#final-cta', start: 'top 80%' }, opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' });

        ScrollTrigger.refresh();

      }, containerRef);
    };

    Promise.all([
      window.gsap ? Promise.resolve() : loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js')
    ]).then(() => {
      return window.ScrollTrigger ? Promise.resolve() : loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js');
    }).then(() => {
      initLogic();
    }).catch(err => console.error("Failed to load GSAP", err));

    return () => {
      isCleanup = true;
      if (resizeListener) window.removeEventListener('resize', resizeListener);
      if (scrollListener) window.removeEventListener('scroll', scrollListener);
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <>
      <style>{LANDING_CSS}</style>
      <div ref={containerRef} className="landing-root">
        {/* ── PARTICLES ── */}
        <canvas id="particles-canvas" ref={canvasRef}></canvas>

        {/* ── NAV ── */}
        <nav id="navbar" ref={navbarRef}>
          <a href="#" className="nav-logo" onClick={(e) => { e.preventDefault(); navigate('/'); }}>
            <div className="nav-logo-icon">📁</div>
            Sortifi
          </a>
          <ul className="nav-links">
            <li><a href="#features">Features</a></li>
            <li><a href="#wire-wrap">How It Works</a></li>
            <li><a href="#security">Security</a></li>
            <li><a href="#pricing">Pricing</a></li>
            <li><a href="#roadmap">Roadmap</a></li>
          </ul>
          <div className="nav-actions">
            <button className="nav-login" onClick={() => navigate('/login')}>Log In</button>
            <button className="nav-cta" onClick={() => navigate('/login')}>Get Started Free</button>
          </div>
        </nav>

        {/* ── HERO ── */}
        <section id="hero">
          <p className="hero-eyebrow">✦ <span>Now Live — Intelligent File Management</span></p>
          <h1 className="hero-heading" id="hero-heading">The intelligent system that makes losing documents a thing of the past.</h1>
          <p className="hero-sub">Sortifi <strong>securely organises every document you own</strong> — automatically. Search by meaning, find what you need instantly, never lose a file again.</p>
          <div className="hero-actions">
            <button onClick={() => navigate('/login')} className="btn-primary">Get Started Free →</button>
            <a href="#features" className="btn-ghost">Explore Features ↓</a>
          </div>

          <div className="hero-cards-row" id="hero-cards">
            <div className="hero-card hero-card-2 hcard-dark">
              <div className="hc-label">Recent Files</div>
              <div className="hc-file"><span className="hc-file-icon">📄</span><span className="hc-file-name">insurance_policy.pdf</span></div>
              <div className="hc-file"><span className="hc-file-icon">📊</span><span className="hc-file-name">gst_march_2025.xlsx</span></div>
              <div className="hc-file"><span className="hc-file-icon">📝</span><span className="hc-file-name">employment_contract.pdf</span></div>
              <div style={{ marginTop: '8px' }}>
                <span className="hc-tag">Insurance</span><span className="hc-tag">GST</span><span className="hc-tag">Legal</span>
              </div>
            </div>
            <div className="hero-card hero-card-1 hcard-light">
              <div className="hc-title">Smart Summary</div>
              <div className="hc-row"><span className="hc-dot" style={{ background: '#2d6a45' }}></span><span className="hc-txt">Renewal: 14 March 2026</span></div>
              <div className="hc-row"><span className="hc-dot" style={{ background: '#f5a623' }}></span><span className="hc-txt">Amount: ₹40,00,000</span></div>
              <div className="hc-row"><span className="hc-dot" style={{ background: '#2d5ca0' }}></span><span className="hc-txt">Provider: Star Health</span></div>
              <div style={{ marginTop: '10px' }}><span className="hc-badge">⏰ Reminder Set</span></div>
            </div>
            <div className="hero-card hero-card-3 hcard-light">
              <div className="hc-title">Ask Your Documents</div>
              <div style={{ background: '#f0ede8', borderRadius: '8px', padding: '8px 10px', fontSize: '11px', color: 'rgba(10,31,20,0.7)', marginBottom: '8px', fontFamily: 'var(--mono)' }}>"What's the renewal date on my insurance?"</div>
              <div style={{ background: '#e8f5ee', borderRadius: '8px', padding: '8px 10px', fontSize: '10px', color: 'var(--accent)', fontFamily: 'var(--sans)' }}>📄 insurance_policy.pdf — Renewal: 14 March 2026</div>
            </div>
            <div className="hero-card hero-card-4 hcard-dark">
              <div className="hc-label">Search Modes</div>
              <div className="hc-file"><span className="hc-file-icon">🔍</span><span className="hc-file-name">Semantic</span></div>
              <div className="hc-file"><span className="hc-file-icon">💬</span><span className="hc-file-name">Natural Language</span></div>
              <div className="hc-file"><span className="hc-file-icon">🏷️</span><span className="hc-file-name">Tag-Based</span></div>
            </div>
            <div className="hero-card hero-card-5 hcard-light">
              <div className="hc-title">Auto-Categorised</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', marginTop: '6px' }}>
                <div style={{ background: '#f0f7f3', borderRadius: '8px', padding: '8px', textAlign: 'center', fontSize: '10px', color: 'var(--accent)', fontWeight: 600 }}>📋 Legal<br /><span style={{ fontSize: '18px', display: 'block', margin: '4px 0' }}>12</span></div>
                <div style={{ background: '#fff7ed', borderRadius: '8px', padding: '8px', textAlign: 'center', fontSize: '10px', color: '#92400e', fontWeight: 600 }}>🏥 Medical<br /><span style={{ fontSize: '18px', display: 'block', margin: '4px 0' }}>8</span></div>
                <div style={{ background: '#eff6ff', borderRadius: '8px', padding: '8px', textAlign: 'center', fontSize: '10px', color: '#1d4ed8', fontWeight: 600 }}>💰 Finance<br /><span style={{ fontSize: '18px', display: 'block', margin: '4px 0' }}>34</span></div>
                <div style={{ background: '#fdf4ff', borderRadius: '8px', padding: '8px', textAlign: 'center', fontSize: '10px', color: '#7e22ce', fontWeight: 600 }}>📁 Personal<br /><span style={{ fontSize: '18px', display: 'block', margin: '4px 0' }}>21</span></div>
              </div>
            </div>
            <div className="hero-card hero-card-6 hcard-dark">
              <div className="hc-label">Expiry Alert</div>
              <div style={{ fontSize: '20px', margin: '6px 0' }}>⏰</div>
              <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.7)' }}>Policy expires in <b style={{ color: '#f5a623' }}>30 days</b></div>
            </div>
            <div className="hero-card hero-card-7 hcard-light">
              <div className="hc-title">Secure Sharing</div>
              <div style={{ fontSize: '11px', color: 'rgba(10,31,20,0.6)', marginBottom: '8px' }}>Link expires in 24 hours · View only</div>
              <div style={{ background: '#f0ede8', borderRadius: '6px', padding: '6px 10px', fontSize: '10px', color: 'var(--dark)', fontFamily: 'var(--mono)' }}>sortifi.in/s/xK9p...</div>
              <div style={{ marginTop: '8px' }}><span className="hc-badge">🔒 AES-256</span></div>
            </div>
          </div>
        </section>

        {/* ── PRODUCT WINDOW ── */}
        <div id="product-window-wrapper">
          <div id="product-window">
            <div className="pw-titlebar">
              <div className="pw-dots">
                <div className="pw-dot pw-dot-r"></div>
                <div className="pw-dot pw-dot-y"></div>
                <div className="pw-dot pw-dot-g"></div>
              </div>
              <span className="pw-breadcrumb">🏠 My Workspace</span>
            </div>
            <div className="pw-body">
              <div className="pw-sidebar">
                <div className="pw-sb-logo">
                  <div className="pw-sb-logo-icon">📁</div>
                  <span className="pw-sb-logo-name">Sortifi</span>
                </div>
                <div className="pw-sb-section">
                  <div className="pw-sb-item active"><span className="pw-sb-item-icon">🏠</span><span className="pw-sb-item-text">Home</span></div>
                  <div className="pw-sb-item"><span className="pw-sb-item-icon">⭐</span><span className="pw-sb-item-text">Starred</span></div>
                  <div className="pw-sb-item"><span className="pw-sb-item-icon">🕐</span><span className="pw-sb-item-text">Recent</span></div>
                </div>
                <div className="pw-sb-section">
                  <div className="pw-sb-label">Smart Folders</div>
                  <div className="pw-sb-item"><span className="pw-sb-item-icon">📋</span><span className="pw-sb-item-text">Legal</span></div>
                  <div className="pw-sb-item"><span className="pw-sb-item-icon">💰</span><span className="pw-sb-item-text">Finance</span></div>
                  <div className="pw-sb-item"><span className="pw-sb-item-icon">🏥</span><span className="pw-sb-item-text">Medical</span></div>
                  <div className="pw-sb-item"><span className="pw-sb-item-icon">📁</span><span className="pw-sb-item-text">Personal</span></div>
                  <div className="pw-sb-item"><span className="pw-sb-item-icon">🏢</span><span className="pw-sb-item-text">Business</span></div>
                </div>
                <div className="pw-sb-section">
                  <div className="pw-sb-label">Shared</div>
                  <div className="pw-sb-item"><span className="pw-sb-item-icon">👥</span><span className="pw-sb-item-text">Team Folder</span></div>
                  <div className="pw-sb-item"><span className="pw-sb-item-icon">🔗</span><span className="pw-sb-item-text">Shared Links</span></div>
                </div>
              </div>
              <div className="pw-main">
                <div className="pw-banner">
                  <div className="pw-banner-pattern"></div>
                  <div className="pw-banner-text">📁 My Workspace — 4,502 files organised</div>
                </div>
                <div className="pw-content">
                  <div className="pw-search">
                    <span>🔍</span>
                    <input type="text" placeholder="Search anything... 'GST invoices from March'" readOnly />
                    <span style={{ fontSize: '11px', color: 'rgba(10,31,20,0.3)', fontFamily: 'var(--sans)' }}>9 modes</span>
                  </div>
                  <div className="pw-tabs">
                    <span className="pw-tab active">All Files</span>
                    <span className="pw-tab">PDFs</span>
                    <span className="pw-tab">📋 Legal</span>
                    <span className="pw-tab">💰 Finance</span>
                    <span className="pw-tab">⏰ Expiring</span>
                    <span className="pw-tab">👥 Shared</span>
                  </div>
                  <div className="pw-section-title">Recent Files</div>
                  <div className="pw-grid">
                    <div className="pw-file-card">
                      <div className="pw-file-thumb" style={{ background: '#fdecea' }}>📋</div>
                      <div className="pw-file-name">insurance_policy.pdf</div>
                      <div className="pw-file-meta">⏰ 30 days</div>
                    </div>
                    <div className="pw-file-card">
                      <div className="pw-file-thumb" style={{ background: '#e8f0f8' }}>📊</div>
                      <div className="pw-file-name">gst_q4_2025.xlsx</div>
                      <div className="pw-file-meta">Finance · GST</div>
                    </div>
                    <div className="pw-file-card">
                      <div className="pw-file-thumb" style={{ background: '#f0f7f3' }}>📝</div>
                      <div className="pw-file-name">vendor_agreement.pdf</div>
                      <div className="pw-file-meta">Legal · Contract</div>
                    </div>
                    <div className="pw-file-card">
                      <div className="pw-file-thumb" style={{ background: '#fdf4ff' }}>🏥</div>
                      <div className="pw-file-name">health_report.pdf</div>
                      <div className="pw-file-meta">Medical · 2025</div>
                    </div>
                    <div className="pw-file-card">
                      <div className="pw-file-thumb" style={{ background: '#fff7ed' }}>📄</div>
                      <div className="pw-file-name">pan_card_scan.jpg</div>
                      <div className="pw-file-meta">Identity · KYC</div>
                    </div>
                    <div className="pw-file-card">
                      <div className="pw-file-thumb" style={{ background: '#e8f5ee' }}>💼</div>
                      <div className="pw-file-name">client_contract_v3.pdf</div>
                      <div className="pw-file-meta">Legal · Active</div>
                    </div>
                    <div className="pw-file-card">
                      <div className="pw-file-thumb" style={{ background: '#eff6ff' }}>🧾</div>
                      <div className="pw-file-name">invoice_march.pdf</div>
                      <div className="pw-file-meta">Finance · Invoice</div>
                    </div>
                    <div className="pw-file-card">
                      <div className="pw-file-thumb" style={{ background: '#f5f5f5' }}>🏦</div>
                      <div className="pw-file-name">bank_statement_q1.pdf</div>
                      <div className="pw-file-meta">Finance · Bank</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── NARRATIVE ── */}
        <section id="narrative">
          <div className="narrative-inner">
            <p className="narrative-p">We all lose files.</p>
            <p className="narrative-p">The insurance policy. The vendor agreement. The tax document from last March.</p>
            <p className="narrative-p">We hunt through folders, email threads, WhatsApp — and still come up empty.</p>
            <p className="narrative-p">Our files get lost in a sea of <em>untitled folders and vague filenames.</em></p>
            <p className="narrative-p">And when a missed renewal costs you lakhs, or a lost contract delays a deal:</p>
            <p className="narrative-p">Having the right file management system is invaluable.</p>
          </div>
        </section>

        {/* ── SOLUTION CARD ── */}
        <section id="solution">
          <div className="solution-card" id="solution-card">
            <div className="section-eyebrow" style={{ justifyContent: 'center' }}>⊞ THE SOLUTION</div>
            <h2 className="solution-heading">Sortifi securely organises your files.</h2>
            <p className="solution-sub">The moment you upload a document, Sortifi securely categorises it — letting you find what you need by meaning, not just filename.</p>
            <div className="solution-checks">
              <span className="solution-check">Auto-tagging</span>
              <span className="solution-check">Smart summaries</span>
              <span className="solution-check">Expiry reminders</span>
              <span className="solution-check">Semantic search</span>
              <span className="solution-check">Doc Chat</span>
              <span className="solution-check">Secure sharing</span>
            </div>

            <div className="terminal">
              <div className="terminal-line arrow">File uploaded: insurance_policy.pdf</div>
              <div className="terminal-line arrow">Organising document securely...</div>
              <div className="terminal-line check">Categorised as: Insurance Policy</div>
              <div className="terminal-line check">Smart Tags: Insurance · Health · Renewal · 2025</div>
              <div className="terminal-line check">Important date found: 14 March 2026</div>
              <div className="terminal-line clock">Reminder set: 30 days before expiry</div>
              <div className="terminal-line arrow">File is now searchable as:</div>
              <div className="terminal-line search">"health insurance", "renewal", "March 2026"</div>
            </div>

            <div className="solution-cta-area">
              <button onClick={() => navigate('/login')} className="btn-outline-white">Create Your Free Account</button>
            </div>

            {/* 6-feature mini grid */}
            <div className="feature-grid-mini" id="fgm">
              <div className="fgm-item">
                <div className="fgm-icon">💬</div>
                <div className="fgm-title">Ask Your Documents</div>
                <div className="fgm-body">Ask questions naturally. "What's the renewal date on my insurance?" — instant answer, exact document.</div>
              </div>
              <div className="fgm-item">
                <div className="fgm-icon">⏰</div>
                <div className="fgm-title">Smart Expiry Reminders</div>
                <div className="fgm-body">Sortifi detects expiry dates and sets reminders automatically. Never miss a renewal or deadline.</div>
              </div>
              <div className="fgm-item">
                <div className="fgm-icon">🔗</div>
                <div className="fgm-title">Secure File Sharing</div>
                <div className="fgm-body">Time-limited links that auto-expire. Set view-once mode for sensitive documents. You control everything.</div>
              </div>
              <div className="fgm-item">
                <div className="fgm-icon">📁</div>
                <div className="fgm-title">Smart Auto-Folders</div>
                <div className="fgm-body">Invoices, legal, medical, personal — Sortifi organises automatically. Custom tags keep everything in place.</div>
              </div>
              <div className="fgm-item">
                <div className="fgm-icon">👥</div>
                <div className="fgm-title">Team Collaboration</div>
                <div className="fgm-body">Create teams, shared folders, role-based access. Every member sees only what they should.</div>
              </div>
              <div className="fgm-item">
                <div className="fgm-icon">☁️</div>
                <div className="fgm-title">Google Drive Import</div>
                <div className="fgm-body">Connect Google Drive to import and export seamlessly. Your existing documents, now with Sortifi intelligence.</div>
              </div>
            </div>

            {/* integrations marquee */}
            <div className="marquee-section">
              <div className="marquee-label">Works with your existing tools:</div>
              <div className="marquee-track">
                <div className="marquee-inner" id="marquee-inner">
                  <div className="marquee-icon">📧</div>
                  <div className="marquee-icon">☁️</div>
                  <div className="marquee-icon">📊</div>
                  <div className="marquee-icon">💬</div>
                  <div className="marquee-icon">🗂️</div>
                  <div className="marquee-icon">📱</div>
                  <div className="marquee-icon">🔐</div>
                  <div className="marquee-icon">📋</div>
                  <div className="marquee-icon">🧾</div>
                  <div className="marquee-icon">🏦</div>
                  <div className="marquee-icon">📧</div>
                  <div className="marquee-icon">☁️</div>
                  <div className="marquee-icon">📊</div>
                  <div className="marquee-icon">💬</div>
                  <div className="marquee-icon">🗂️</div>
                  <div className="marquee-icon">📱</div>
                  <div className="marquee-icon">🔐</div>
                  <div className="marquee-icon">📋</div>
                  <div className="marquee-icon">🧾</div>
                  <div className="marquee-icon">🏦</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ HOW IT WORKS — WIRE ANIMATION SECTION ══ */}
        <div id="wire-wrap">
          <div id="wire-stage">
            <svg id="wire-svg" viewBox="0 0 1440 900" preserveAspectRatio="none">
              <defs>
                <filter id="wglow"><feGaussianBlur stdDeviation="2.5" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
                <filter id="wglow2"><feGaussianBlur stdDeviation="4" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
              </defs>
              {/* card → sbox wires (B–E stay; A is redrawn live as card slides) */}
              <path id="wpA" fill="none" stroke="rgba(155,151,143,0.55)" strokeWidth="1.5" strokeLinecap="round" />
              <path id="wpB" fill="none" stroke="rgba(155,151,143,0.55)" strokeWidth="1.5" strokeLinecap="round" />
              <path id="wpC" fill="none" stroke="rgba(155,151,143,0.55)" strokeWidth="1.5" strokeLinecap="round" />
              <path id="wpD" fill="none" stroke="rgba(155,151,143,0.55)" strokeWidth="1.5" strokeLinecap="round" />
              <path id="wpE" fill="none" stroke="rgba(155,151,143,0.55)" strokeWidth="1.5" strokeLinecap="round" />
              <path id="wpAg" fill="none" stroke="#3d8a5c" strokeWidth="1.8" strokeLinecap="round" filter="url(#wglow)" />
              <path id="wpBg" fill="none" stroke="#3d8a5c" strokeWidth="1.8" strokeLinecap="round" filter="url(#wglow)" />
              <path id="wpCg" fill="none" stroke="#3d8a5c" strokeWidth="1.8" strokeLinecap="round" filter="url(#wglow)" />
              <path id="wpDg" fill="none" stroke="#3d8a5c" strokeWidth="1.8" strokeLinecap="round" filter="url(#wglow)" />
              <path id="wpEg" fill="none" stroke="#3d8a5c" strokeWidth="1.8" strokeLinecap="round" filter="url(#wglow)" />
              {/* vertical wire: sbox bottom → card A top (live, drawn when card slides) */}
              <path id="wpV" fill="none" stroke="rgba(155,151,143,0.55)" strokeWidth="1.5" strokeLinecap="round" />
              <path id="wpVg" fill="none" stroke="#3d8a5c" strokeWidth="2" strokeLinecap="round" filter="url(#wglow2)" />
            </svg>

            {/* Heading — fixed at top, never overlaps cards */}
            <div id="wire-heading">
              <div className="wh-eyebrow">⊞ HOW IT WORKS</div>
              <h2 className="wh-h1">Your mess of files,<br />sorted in seconds.</h2>
              <p className="wh-sub">Drop anything — Sortifi connects the dots automatically.</p>
            </div>

            {/* THE 5 SCATTERED CARDS */}
            {/* Card A: insurance — THIS CARD ITSELF slides down and expands. No duplicate. */}
            <div className="wcard" id="wcA" style={{ width: '202px' }}>
              <div className="wcdot"></div>
              {/* COMPACT view (shown while in pile) */}
              <div id="wcA-compact">
                <div className="wfname"><div className="wficon" style={{ background: '#fee2e2' }}>📋</div>insurance_policy.pdf</div>
                <div className="wlines"><div className="wln f"></div><div className="wln m"></div><div className="wln s"></div></div>
                <div className="wtags"><span className="wtag wtb">Insurance</span><span className="wtag wtg">Health</span><span className="wtag wto">⏰ 30d</span></div>
              </div>
              {/* EXPANDED view (revealed as card slides down) */}
              <div id="wcA-expanded" style={{ display: 'none', opacity: 0 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '9px', background: '#fee2e2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>📋</div>
                    <div>
                      <div style={{ fontFamily: 'var(--mono)', fontSize: '12.5px', fontWeight: 500, color: '#0d1910' }}>insurance_policy.pdf</div>
                      <div style={{ fontSize: '11px', color: 'rgba(13,25,16,.38)', marginTop: '2px' }}>Uploaded 3 Jan 2025 · 2.4 MB · PDF</div>
                    </div>
                  </div>
                  <span style={{ fontSize: '10px', fontWeight: 700, background: '#e4f5ec', color: '#2d6a45', padding: '4px 11px', borderRadius: '999px', fontFamily: 'var(--sans)', whiteSpace: 'nowrap' }}>✓ Matched</span>
                </div>
                <div style={{ background: '#f7f6f1', borderRadius: '10px', padding: '13px 15px', marginBottom: '12px' }}>
                  <div style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '.12em', fontWeight: 700, color: 'rgba(13,25,16,.33)', marginBottom: '7px', fontFamily: 'var(--sans)' }}>AI Summary</div>
                  <div style={{ fontSize: '12.5px', color: 'rgba(13,25,16,.7)', lineHeight: 1.65, fontFamily: 'var(--sans)', fontWeight: 300 }}>This is a <strong style={{ color: '#0d1910', fontWeight: 600, background: 'rgba(45,106,69,.1)', padding: '0 3px', borderRadius: '3px' }}>health insurance policy</strong> with Star Health. Sum insured: <strong style={{ color: '#0d1910', fontWeight: 600, background: 'rgba(45,106,69,.1)', padding: '0 3px', borderRadius: '3px' }}>₹40,00,000</strong>. Valid until <strong style={{ color: '#0d1910', fontWeight: 600, background: 'rgba(45,106,69,.1)', padding: '0 3px', borderRadius: '3px' }}>14 March 2026</strong> — renewal due in 30 days.</div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '7px', marginBottom: '12px' }}>
                  <div style={{ background: '#f7f6f1', borderRadius: '8px', padding: '9px 11px' }}><div style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '.1em', fontWeight: 700, color: 'rgba(13,25,16,.33)', marginBottom: '3px', fontFamily: 'var(--sans)' }}>Renewal Date</div><div style={{ fontSize: '12px', fontWeight: 600, color: '#b91c1c', fontFamily: 'var(--sans)' }}>14 Mar 2026</div></div>
                  <div style={{ background: '#f7f6f1', borderRadius: '8px', padding: '9px 11px' }}><div style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '.1em', fontWeight: 700, color: 'rgba(13,25,16,.33)', marginBottom: '3px', fontFamily: 'var(--sans)' }}>Sum Insured</div><div style={{ fontSize: '12px', fontWeight: 600, color: '#0d1910', fontFamily: 'var(--sans)' }}>₹40,00,000</div></div>
                  <div style={{ background: '#f7f6f1', borderRadius: '8px', padding: '9px 11px' }}><div style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '.1em', fontWeight: 700, color: 'rgba(13,25,16,.33)', marginBottom: '3px', fontFamily: 'var(--sans)' }}>Days Left</div><div style={{ fontSize: '12px', fontWeight: 600, color: '#b91c1c', fontFamily: 'var(--sans)' }}>30 days</div></div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}><span className="wtag wtb">Insurance</span><span className="wtag wtg">Health</span><span className="wtag wto">⏰ Renew Soon</span></div>
                  <button style={{ fontSize: '12px', fontWeight: 600, color: '#2d6a45', background: 'none', border: '1.5px solid rgba(45,106,69,.24)', borderRadius: '999px', padding: '6px 16px', cursor: 'pointer', fontFamily: 'var(--sans)' }}>Open File →</button>
                </div>
              </div>
            </div>

            <div className="wcard" id="wcB" style={{ width: '196px' }}><div className="wcdot"></div><div className="wfname"><div className="wficon" style={{ background: '#e4eef8' }}>📝</div>vendor_agreement.pdf</div><div className="wlines"><div className="wln m"></div><div className="wln f"></div><div className="wln s"></div></div><div className="wtags"><span className="wtag wtb">Legal</span><span className="wtag wtg">Active</span></div></div>
            <div className="wcard" id="wcC" style={{ width: '190px' }}><div className="wcdot"></div><div className="wfname"><div className="wficon" style={{ background: '#e4f5ec' }}>📊</div>gst_march_2025.xlsx</div><div className="wlines"><div className="wln f"></div><div className="wln s"></div></div><div className="wtags"><span className="wtag wtg">GST</span><span className="wtag wtb">Finance</span><span className="wtag wtn">Q1 2025</span></div></div>
            <div className="wcard" id="wcD" style={{ width: '205px' }}><div className="wcdot"></div><div className="wfname"><div className="wficon" style={{ background: '#f3e8ff' }}>📄</div>employment_contract.pdf</div><div className="wlines"><div className="wln f"></div><div className="wln m"></div><div className="wln f"></div></div><div className="wtags"><span className="wtag wtp">HR</span><span className="wtag wtb">Legal</span></div></div>
            <div className="wcard" id="wcE" style={{ width: '184px' }}><div className="wcdot"></div><div className="wfname"><div className="wficon" style={{ background: '#fef3e2' }}>🏥</div>health_report.pdf</div><div className="wlines"><div className="wln m"></div><div className="wln s"></div></div><div className="wtags"><span className="wtag wto">Medical</span><span className="wtag wtb">2025</span></div></div>

            {/* SEARCH BOX */}
            <div id="wsbox">
              <div className="wdot-t"></div><div className="wdot-b"></div>
              <div className="wsb-head"><div className="wsb-logo">📁</div><div><div className="wsb-t">Sortifi Intelligence</div><div className="wsb-s">5 files connected · searching...</div></div></div>
              <div className="wsb-chips">
                <span className="wchip"><span className="wchipdot" style={{ background: '#e05c5c' }}></span>insurance_policy.pdf</span>
                <span className="wchip"><span className="wchipdot" style={{ background: '#4a90d9' }}></span>vendor_agreement.pdf</span>
                <span className="wchip"><span className="wchipdot" style={{ background: '#2d9954' }}></span>gst_march_2025.xlsx</span>
                <span className="wchip" style={{ opacity: .45 }}>+2 more</span>
              </div>
              <div className="wsb-input"><span id="wtyped"></span><span id="wcur"></span></div>
              <div className="wsb-foot"><div className="wsb-icons"><div className="wibtn">📎</div><div className="wibtn">+</div><div className="wibtn">≡</div></div><button className="wsbtn"><span className="wspulse"></span> Search</button></div>
            </div>

            {/* TOAST */}
            <div id="wtoast"><span className="wtpulse"></span>✦ 1 match found — insurance_policy.pdf</div>
          </div>
        </div>

        {/* ── CAPTURE / PRIVACY ── */}
        <section id="capture">
          <div className="capture-inner">
            <div className="capture-left" id="capture-left">
              <div className="section-eyebrow">⊞ CAPTURE</div>
              <h2 className="capture-heading">Upload Anything.<br />Remember Everything.</h2>
            </div>
            <div className="capture-right" id="capture-right">
              <div className="capture-feature">
                <div className="cf-icon">📤</div>
                <div className="cf-title">Drop From Any Device</div>
                <div className="cf-body">Upload from your phone, desktop, or tablet. PDF, photo, scan, DOCX — Sortifi handles every format instantly.</div>
              </div>
              <div className="capture-feature">
                <div className="cf-icon">🔤</div>
                <div className="cf-title">Automatic Transcription</div>
                <div className="cf-body">Every file you add is automatically transcribed and made searchable. Scanned documents, images, PDFs — all indexed.</div>
              </div>
              <div className="capture-feature">
                <div className="cf-icon">☁️</div>
                <div className="cf-title">Google Drive Import</div>
                <div className="cf-body">Connect Google Drive to import existing documents seamlessly. Your old files, now with Sortifi intelligence.</div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FEATURES SECTION (light) ── */}
        <section id="features">
          <div className="features-inner">
            <div className="section-eyebrow" style={{ justifyContent: 'center', color: 'rgba(10,31,20,0.35)', marginBottom: '20px' }}>⊞ CORE FEATURES</div>
            <p className="features-quote" id="features-quote">"If AI could handle your filing, how much time would you have for the <em>work that actually matters?</em>"</p>
            <div className="features-cta-area" id="features-cta">
              <button onClick={() => navigate('/login')} className="btn-dark-solid">Create In Sortifi — Free</button>
            </div>

            <div className="feature-cards-grid" id="feat-grid">
              {/* Large card 1 */}
              <div className="feat-card feat-card-large" data-delay="0">
                <div className="feat-card-icon">🔍</div>
                <div className="feat-card-title">9 Search Modes</div>
                <div className="feat-card-body">Most tools give you one way to search. Sortifi gives you nine — keyword, semantic, natural language, tag, date, entity, type, summary, AI chat.</div>
                <div className="feat-card-screen">
                  <div className="search-grid-mini">
                    <div className="sgm-item"><div className="sgm-icon">🔑</div><div className="sgm-name">Keyword</div><div className="sgm-desc">Inside file content</div></div>
                    <div className="sgm-item"><div className="sgm-icon">💬</div><div className="sgm-name">Natural Language</div><div className="sgm-desc">Type normally</div></div>
                    <div className="sgm-item"><div className="sgm-icon">🧠</div><div className="sgm-name">Semantic</div><div className="sgm-desc">Finds meaning</div></div>
                    <div className="sgm-item"><div className="sgm-icon">🤖</div><div className="sgm-name">AI Chat</div><div className="sgm-desc">Conversational</div></div>
                  </div>
                </div>
              </div>

              {/* Large card 2 */}
              <div className="feat-card feat-card-large" data-delay="80">
                <div className="feat-card-icon">🔐</div>
                <div className="feat-card-title">Privacy-First Security</div>
                <div className="feat-card-body">AES-256 encryption at rest, TLS 1.3 in transit. Zero-knowledge architecture — our team cannot access your files. Your data never trains any AI model.</div>
                <div className="feat-card-screen">
                  <div className="ms-group-label">Security Status</div>
                  <div className="ms-item active"><div className="ms-item-dot" style={{ background: '#5fce8a' }}></div><span className="ms-item-name">AES-256 Encryption Active</span></div>
                  <div className="ms-item"><div className="ms-item-dot" style={{ background: '#5fce8a' }}></div><span className="ms-item-name">TLS 1.3 In Transit</span></div>
                  <div className="ms-item"><div className="ms-item-dot" style={{ background: '#5fce8a' }}></div><span className="ms-item-name">Zero-Knowledge Architecture</span></div>
                  <div className="ms-item"><div className="ms-item-dot" style={{ background: '#5fce8a' }}></div><span className="ms-item-name">DPDP 2023 Compliant</span></div>
                </div>
              </div>
            </div>

            <div className="feature-cards-row3" id="feat-grid-3">
              <div className="feat-card" data-delay="0">
                <div className="feat-card-icon">📊</div>
                <div className="feat-card-title">Document Comparison</div>
                <div className="feat-card-body">Compare two documents side-by-side to spot changes in contracts, policies, and agreements instantly.</div>
              </div>
              <div className="feat-card" data-delay="80">
                <div className="feat-card-icon">📤</div>
                <div className="feat-card-title">Write Content, Share Securely</div>
                <div className="feat-card-body">Share files with time-limited links that auto-expire. Set view-once mode for sensitive documents.</div>
              </div>
              <div className="feat-card" data-delay="160">
                <div className="feat-card-icon">👥</div>
                <div className="feat-card-title">Team Collaboration</div>
                <div className="feat-card-body">Create teams, shared folders, and collaborate with role-based access. Every member sees only what they should.</div>
              </div>
            </div>
          </div>
        </section>

        {/* ── WHO IS IT FOR ── */}
        <section id="who">
          <div className="section-eyebrow" style={{ justifyContent: 'center' }}>⊞ WHO'S SORTIFI FOR</div>
          <h2 className="who-heading" id="who-heading">For anyone who works with documents and can't afford to lose them.</h2>

          <div id="carousel-wrapper">
            <div id="carousel-pinned">
              <div className="carousel-track-outer">
                <div className="carousel-track" id="carousel-track">
                  <div className="audience-card ac-freelancer">
                    <div className="ac-label">Use Case</div>
                    <div className="ac-title">Free&shy;lancers</div>
                    <div className="ac-body">Client contracts, invoices, project files — auto-organised.</div>
                    <div className="ac-tags">
                      <span className="ac-tag">Invoices</span>
                      <span className="ac-tag">Contracts</span>
                      <span className="ac-tag">Projects</span>
                    </div>
                    <div className="ac-screen">
                      <div className="ac-screen-inner">
                        <div style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(10,31,20,0.8)', marginBottom: '8px', fontFamily: 'var(--sans)' }}>Smart Folders</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          <div style={{ background: 'rgba(10,31,20,0.06)', borderRadius: '6px', padding: '6px 10px', fontSize: '10px', fontFamily: 'var(--sans)', color: 'rgba(10,31,20,0.7)' }}>📋 client_acme_contract.pdf</div>
                          <div style={{ background: 'rgba(10,31,20,0.06)', borderRadius: '6px', padding: '6px 10px', fontSize: '10px', fontFamily: 'var(--sans)', color: 'rgba(10,31,20,0.7)' }}>🧾 invoice_march_2025.pdf</div>
                          <div style={{ background: 'rgba(200,100,50,0.1)', borderRadius: '6px', padding: '6px 10px', fontSize: '10px', fontFamily: 'var(--sans)', color: 'rgba(10,31,20,0.7)' }}>⏰ contract_renewal_due.pdf</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="audience-card ac-business">
                    <div className="ac-label">Use Case</div>
                    <div className="ac-title">Small Biz</div>
                    <div className="ac-body">GST documents, vendor agreements, employee files — always compliant.</div>
                    <div className="ac-tags">
                      <span className="ac-tag">GST</span>
                      <span className="ac-tag">Agreements</span>
                      <span className="ac-tag">Compliance</span>
                    </div>
                    <div className="ac-screen">
                      <div className="ac-screen-inner">
                        <div style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(10,31,20,0.8)', marginBottom: '8px', fontFamily: 'var(--sans)' }}>Compliance Dashboard</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          <div style={{ background: 'rgba(10,31,20,0.06)', borderRadius: '6px', padding: '6px 10px', fontSize: '10px', fontFamily: 'var(--sans)', color: 'rgba(10,31,20,0.7)' }}>📊 gst_q4_2025.xlsx <span style={{ float: 'right', color: 'green' }}>✓</span></div>
                          <div style={{ background: 'rgba(10,31,20,0.06)', borderRadius: '6px', padding: '6px 10px', fontSize: '10px', fontFamily: 'var(--sans)', color: 'rgba(10,31,20,0.7)' }}>📋 vendor_agmt_ravi.pdf <span style={{ float: 'right', color: 'green' }}>✓</span></div>
                          <div style={{ background: 'rgba(245,166,35,0.15)', borderRadius: '6px', padding: '6px 10px', fontSize: '10px', fontFamily: 'var(--sans)', color: 'rgba(10,31,20,0.7)' }}>⚠️ tds_filing_due.pdf</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="audience-card ac-legal">
                    <div className="ac-label">Use Case</div>
                    <div className="ac-title">CA & Legal</div>
                    <div className="ac-body">Case files, compliance docs, renewal deadlines — automated.</div>
                    <div className="ac-tags">
                      <span className="ac-tag">Legal</span>
                      <span className="ac-tag">Tax</span>
                      <span className="ac-tag">Deadlines</span>
                    </div>
                    <div className="ac-screen">
                      <div className="ac-screen-inner" style={{ background: 'rgba(255,255,255,0.8)' }}>
                        <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--dark)', marginBottom: '8px', fontFamily: 'var(--sans)' }}>Deadline Tracker</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          <div style={{ background: 'rgba(255,255,255,0.7)', borderRadius: '6px', padding: '6px 10px', fontSize: '10px', fontFamily: 'var(--sans)', color: 'rgba(10,31,20,0.8)' }}>⏰ ITR Filing — 7 days</div>
                          <div style={{ background: 'rgba(255,255,255,0.7)', borderRadius: '6px', padding: '6px 10px', fontSize: '10px', fontFamily: 'var(--sans)', color: 'rgba(10,31,20,0.8)' }}>📋 Audit Report — 14 days</div>
                          <div style={{ background: 'rgba(255,255,255,0.7)', borderRadius: '6px', padding: '6px 10px', fontSize: '10px', fontFamily: 'var(--sans)', color: 'rgba(10,31,20,0.8)' }}>🔐 License Renewal — 30 days</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="audience-card ac-healthcare">
                    <div className="ac-label">Use Case</div>
                    <div className="ac-title">Health&shy;care</div>
                    <div className="ac-body">Patient records, insurance docs, license renewals — organised and secure.</div>
                    <div className="ac-tags">
                      <span className="ac-tag">Records</span>
                      <span className="ac-tag">Insurance</span>
                      <span className="ac-tag">Licenses</span>
                    </div>
                    <div className="ac-screen">
                      <div className="ac-screen-inner" style={{ background: 'rgba(255,255,255,0.6)' }}>
                        <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--dark)', marginBottom: '8px', fontFamily: 'var(--sans)' }}>Clinic Documents</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          <div style={{ background: 'rgba(255,255,255,0.8)', borderRadius: '6px', padding: '6px 10px', fontSize: '10px', fontFamily: 'var(--sans)', color: 'rgba(10,31,20,0.8)' }}>🏥 consent_form_pk.pdf</div>
                          <div style={{ background: 'rgba(255,255,255,0.8)', borderRadius: '6px', padding: '6px 10px', fontSize: '10px', fontFamily: 'var(--sans)', color: 'rgba(10,31,20,0.8)' }}>🔐 medical_license.pdf</div>
                          <div style={{ background: 'rgba(255,255,255,0.8)', borderRadius: '6px', padding: '6px 10px', fontSize: '10px', fontFamily: 'var(--sans)', color: 'rgba(10,31,20,0.8)' }}>💊 insurance_claim.pdf</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="audience-card ac-students">
                    <div className="ac-label">Use Case</div>
                    <div className="ac-title">Students</div>
                    <div className="ac-body">Papers, notes, references, thesis drafts — intelligently organised.</div>
                    <div className="ac-tags">
                      <span className="ac-tag">Research</span>
                      <span className="ac-tag">Notes</span>
                      <span className="ac-tag">References</span>
                    </div>
                    <div className="ac-screen">
                      <div className="ac-screen-inner" style={{ background: 'rgba(255,255,255,0.6)' }}>
                        <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--dark)', marginBottom: '8px', fontFamily: 'var(--sans)' }}>Thesis Research</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          <div style={{ background: 'rgba(255,255,255,0.8)', borderRadius: '6px', padding: '6px 10px', fontSize: '10px', fontFamily: 'var(--sans)', color: 'rgba(10,31,20,0.8)' }}>📚 paper_ml_2024.pdf</div>
                          <div style={{ background: 'rgba(255,255,255,0.8)', borderRadius: '6px', padding: '6px 10px', fontSize: '10px', fontFamily: 'var(--sans)', color: 'rgba(10,31,20,0.8)' }}>📝 thesis_draft_v4.docx</div>
                          <div style={{ background: 'rgba(255,255,255,0.8)', borderRadius: '6px', padding: '6px 10px', fontSize: '10px', fontFamily: 'var(--sans)', color: 'rgba(10,31,20,0.8)' }}>🔗 iit_reference_list.pdf</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECURITY ── */}
        <section id="security">
          <div className="security-inner">
            <div className="section-eyebrow">⊞ SECURITY & PRIVACY</div>
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(40px,5vw,58px)', color: '#fff', marginTop: '12px', maxWidth: '600px', lineHeight: 1.1 }}>Your data is sacred.<br />We treat it that way.</h2>
            <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.5)', maxWidth: '540px', marginTop: '16px', lineHeight: 1.65, fontWeight: 300 }}>Sortifi is built privacy-first from the ground up. We don't sell your data, never share it with advertisers, and never use your files to train AI models.</p>
            <div className="security-grid" id="security-grid">
              <div className="sec-card"><div className="sec-card-icon">🔒</div><div className="sec-card-title">AES-256 + TLS 1.3</div><div className="sec-card-body">Military-grade encryption at rest and in transit. Your files are always protected.</div></div>
              <div className="sec-card"><div className="sec-card-icon">🛡️</div><div className="sec-card-title">Zero Knowledge</div><div className="sec-card-body">Our team physically cannot access your file contents. Only you hold the keys — by design.</div></div>
              <div className="sec-card"><div className="sec-card-icon">🚫</div><div className="sec-card-title">No Data Trading</div><div className="sec-card-body">Your data is never sold, shared with third parties, or used for advertising. Ever.</div></div>
              <div className="sec-card"><div className="sec-card-icon">🤖</div><div className="sec-card-title">AI Privacy</div><div className="sec-card-body">Sortifi processes your files in real-time securely. Your content never trains any AI model.</div></div>
              <div className="sec-card"><div className="sec-card-icon">🇮🇳</div><div className="sec-card-title">DPDP 2023 Ready</div><div className="sec-card-body">Built for India's Digital Personal Data Protection Act 2023 from day one.</div></div>
              <div className="sec-card"><div className="sec-card-icon">🗑️</div><div className="sec-card-title">Right to Delete</div><div className="sec-card-body">Delete your account and all data is permanently wiped within 30 days. No hidden copies.</div></div>
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section id="testimonials">
          <div style={{ textAlign: 'center', padding: '80px 0 48px' }}>
            <div className="section-eyebrow" style={{ justifyContent: 'center', marginBottom: '16px' }}>⊞ WHAT PEOPLE SAY</div>
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(36px,4vw,52px)', color: '#fff' }}>Trusted by early testers across India.</h2>
          </div>
          <div className="testi-rows">
            <div className="testi-row testi-row-1">
              <div className="testi-card"><div className="testi-stars">★★★★★</div><p className="testi-quote">"I used to spend 30 minutes every morning hunting for client contracts. Sortifi found everything in under 2 seconds."</p><div className="testi-author"><div className="testi-avatar" style={{ background: '#2d6a45' }}>RK</div><div><div className="testi-name">Rahul Khedekar</div><div className="testi-role">Freelance Consultant · Pune</div></div></div></div>
              <div className="testi-card"><div className="testi-stars">★★★★★</div><p className="testi-quote">"The auto-reminder for our insurance renewals alone is worth it. We almost missed a ₹40L policy renewal."</p><div className="testi-author"><div className="testi-avatar" style={{ background: '#7f8fbd' }}>PR</div><div><div className="testi-name">Priya Rawat</div><div className="testi-role">CA · Mumbai</div></div></div></div>
              <div className="testi-card"><div className="testi-stars">★★★★★</div><p className="testi-quote">"Our clinic now manages all patient consent forms through Sortifi. What used to take an hour takes 5 minutes."</p><div className="testi-author"><div className="testi-avatar" style={{ background: '#b08faf' }}>DP</div><div><div className="testi-name">Dr. Deepa Pillai</div><div className="testi-role">Healthcare Clinic · Bangalore</div></div></div></div>
              <div className="testi-card"><div className="testi-stars">★★★★★</div><p className="testi-quote">"The natural language search understood 'GST invoices from March' perfectly. It just works."</p><div className="testi-author"><div className="testi-avatar" style={{ background: '#c4617a' }}>AS</div><div><div className="testi-name">Arjun Shah</div><div className="testi-role">SMB Owner · Ahmedabad</div></div></div></div>
              <div className="testi-card"><div className="testi-stars">★★★★☆</div><p className="testi-quote">"Sortifi's semantic search found papers relevant to my thesis that I'd completely forgotten I had."</p><div className="testi-author"><div className="testi-avatar" style={{ background: '#8aaa8a' }}>NJ</div><div><div className="testi-name">Neha Joshi</div><div className="testi-role">PhD Researcher · IIT Delhi</div></div></div></div>
              <div className="testi-card"><div className="testi-stars">★★★★★</div><p className="testi-quote">"Sortifi's expiry detection smartly flags renewals weeks before. It's like having a personal filing assistant."</p><div className="testi-author"><div className="testi-avatar" style={{ background: '#c8b99a' }}>VM</div><div><div className="testi-name">Vikram Mehta</div><div className="testi-role">Legal Firm Partner · Delhi</div></div></div></div>
              <div className="testi-card"><div className="testi-stars">★★★★★</div><p className="testi-quote">"I used to spend 30 minutes every morning hunting for client contracts. Sortifi found everything in under 2 seconds."</p><div className="testi-author"><div className="testi-avatar" style={{ background: '#2d6a45' }}>RK</div><div><div className="testi-name">Rahul Khedekar</div><div className="testi-role">Freelance Consultant · Pune</div></div></div></div>
              <div className="testi-card"><div className="testi-stars">★★★★★</div><p className="testi-quote">"The auto-reminder for our insurance renewals alone is worth it. We almost missed a ₹40L policy renewal."</p><div className="testi-author"><div className="testi-avatar" style={{ background: '#7f8fbd' }}>PR</div><div><div className="testi-name">Priya Rawat</div><div className="testi-role">CA · Mumbai</div></div></div></div>
              <div className="testi-card"><div className="testi-stars">★★★★★</div><p className="testi-quote">"Our clinic now manages all patient consent forms through Sortifi. What used to take an hour takes 5 minutes."</p><div className="testi-author"><div className="testi-avatar" style={{ background: '#b08faf' }}>DP</div><div><div className="testi-name">Dr. Deepa Pillai</div><div className="testi-role">Healthcare Clinic · Bangalore</div></div></div></div>
            </div>
            <div className="testi-row testi-row-2">
              <div className="testi-card"><div className="testi-stars">★★★★★</div><p className="testi-quote">"The natural language search understood 'GST invoices from March' perfectly."</p><div className="testi-author"><div className="testi-avatar" style={{ background: '#c4617a' }}>AS</div><div><div className="testi-name">Arjun Shah</div><div className="testi-role">SMB Owner · Ahmedabad</div></div></div></div>
              <div className="testi-card"><div className="testi-stars">★★★★☆</div><p className="testi-quote">"Sortifi's semantic search found papers relevant to my thesis that I'd completely forgotten I had."</p><div className="testi-author"><div className="testi-avatar" style={{ background: '#8aaa8a' }}>NJ</div><div><div className="testi-name">Neha Joshi</div><div className="testi-role">PhD Researcher · IIT Delhi</div></div></div></div>
              <div className="testi-card"><div className="testi-stars">★★★★★</div><p className="testi-quote">"We almost missed a ₹40L policy renewal. Sortifi's reminders saved us. Incredible product."</p><div className="testi-author"><div className="testi-avatar" style={{ background: '#7f8fbd' }}>PR</div><div><div className="testi-name">Priya Rawat</div><div className="testi-role">CA · Mumbai</div></div></div></div>
              <div className="testi-card"><div className="testi-stars">★★★★★</div><p className="testi-quote">"Sortifi's expiry detection smartly flags renewals weeks before. Like a personal filing assistant."</p><div className="testi-author"><div className="testi-avatar" style={{ background: '#c8b99a' }}>VM</div><div><div className="testi-name">Vikram Mehta</div><div className="testi-role">Legal Firm Partner · Delhi</div></div></div></div>
              <div className="testi-card"><div className="testi-stars">★★★★★</div><p className="testi-quote">"What used to take an hour takes 5 minutes. Sortifi is essential for our clinic operations."</p><div className="testi-author"><div className="testi-avatar" style={{ background: '#b08faf' }}>DP</div><div><div className="testi-name">Dr. Deepa Pillai</div><div className="testi-role">Healthcare Clinic · Bangalore</div></div></div></div>
              <div className="testi-card"><div className="testi-stars">★★★★★</div><p className="testi-quote">"Found everything in under 2 seconds. The auto-tagging is frighteningly accurate."</p><div className="testi-author"><div className="testi-avatar" style={{ background: '#2d6a45' }}>RK</div><div><div className="testi-name">Rahul Khedekar</div><div className="testi-role">Freelance Consultant · Pune</div></div></div></div>
              <div className="testi-card"><div className="testi-stars">★★★★★</div><p className="testi-quote">"The natural language search understood 'GST invoices from March' perfectly."</p><div className="testi-author"><div className="testi-avatar" style={{ background: '#c4617a' }}>AS</div><div><div className="testi-name">Arjun Shah</div><div className="testi-role">SMB Owner · Ahmedabad</div></div></div></div>
              <div className="testi-card"><div className="testi-stars">★★★★☆</div><p className="testi-quote">"Sortifi's semantic search found papers relevant to my thesis that I'd completely forgotten I had."</p><div className="testi-author"><div className="testi-avatar" style={{ background: '#8aaa8a' }}>NJ</div><div><div className="testi-name">Neha Joshi</div><div className="testi-role">PhD Researcher · IIT Delhi</div></div></div></div>
            </div>
          </div>
        </section>

        {/* ── PRICING ── */}
        <section id="pricing">
          <div className="pricing-inner">
            <div className="section-eyebrow" style={{ justifyContent: 'center', color: 'rgba(10,31,20,0.35)', marginBottom: '20px' }}>⊞ PRICING</div>
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(40px,5vw,56px)', color: 'var(--dark)', textAlign: 'center', marginBottom: '8px' }}>Simple, transparent pricing.</h2>
            <p style={{ textAlign: 'center', fontSize: '16px', color: 'rgba(10,31,20,0.5)', marginBottom: '32px', fontWeight: 300 }}>No surprises. Cancel or change your plan at any time.</p>
            <div className="pricing-toggle">
              <span className="pt-label">Monthly</span>
              <span className="pt-label">Yearly <span className="pt-badge">Save 30%</span></span>
            </div>
            <div className="pricing-grid" id="pricing-grid">
              <div className="price-card" data-delay="0">
                <div className="pc-plan">Free</div>
                <div className="pc-price">₹<span>0</span></div>
                <div className="pc-price-sub">forever free</div>
                <div className="pc-desc">Perfect for individuals getting started.</div>
                <button className="pc-cta pc-cta-dark" onClick={() => navigate('/login')}>Get Started Free</button>
                <div className="pc-divider"></div>
                <ul className="pc-features">
                  <li>Up to 50 files</li>
                  <li>Smart document summaries</li>
                  <li>Smart auto-tagging</li>
                  <li>Keyword & tag search</li>
                  <li>7-day expiry reminders</li>
                  <li>Natural language search</li>
                </ul>
              </div>
              <div className="price-card featured" data-delay="80">
                <div className="pc-plan">Pro</div>
                <div className="pc-price">₹<span>799</span></div>
                <div className="pc-price-sub">per month</div>
                <div className="pc-desc">For professionals who live inside documents.</div>
                <button className="pc-cta pc-cta-green" onClick={() => navigate('/login')}>Start Pro Free →</button>
                <div className="pc-divider"></div>
                <ul className="pc-features">
                  <li>Unlimited files</li>
                  <li>All 9 search modes</li>
                  <li>Auto-reminders (90/30/7 days)</li>
                  <li>Semantic search (V2.0)</li>
                  <li>Team collaboration</li>
                  <li>Google Drive import</li>
                  <li>Secure sharing</li>
                </ul>
              </div>
              <div className="price-card" data-delay="160">
                <div className="pc-plan">Business</div>
                <div className="pc-price">₹<span>2499</span></div>
                <div className="pc-price-sub">per month · up to 10 users</div>
                <div className="pc-desc">For small businesses and clinic teams.</div>
                <button className="pc-cta pc-cta-outline" onClick={() => navigate('/login')}>Start Business Trial</button>
                <div className="pc-divider"></div>
                <ul className="pc-features">
                  <li>Everything in Pro</li>
                  <li>Up to 10 team members</li>
                  <li>Role-based access control</li>
                  <li>PII detection alerts</li>
                  <li>Audit logs & activity feed</li>
                  <li>Tally & Zoho integration</li>
                  <li>DPDP compliance tools</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── ROADMAP ── */}
        <section id="roadmap">
          <div className="roadmap-inner">
            <div className="section-eyebrow">⊞ ROADMAP</div>
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(40px,5vw,56px)', color: '#fff', marginTop: '12px', lineHeight: 1.1 }}>Where we're going.</h2>
            <div className="roadmap-track" id="roadmap-track">
              <div className="roadmap-item">
                <div className="rm-dot-col">
                  <div className="rm-dot active"></div>
                  <div className="rm-quarter">Q2<br />2026</div>
                </div>
                <div className="rm-content">
                  <div className="rm-version">V1.0 — Launch</div>
                  <div className="rm-title">Web App · AI Engine · 9 Search Modes</div>
                  <div className="rm-body">Auto-reminders · Doc chat · Teams · Google Drive · Secure sharing · Smart folders · Full DPDP compliance</div>
                  <span className="rm-badge rm-badge-live">✓ Now Live</span>
                </div>
              </div>
              <div className="roadmap-item">
                <div className="rm-dot-col">
                  <div className="rm-dot"></div>
                  <div className="rm-quarter">Q3–Q4<br />2026</div>
                </div>
                <div className="rm-content">
                  <div className="rm-version">V2.0 — Intelligence</div>
                  <div className="rm-title">Voice Search · Contract Risk Detection</div>
                  <div className="rm-body">Document timeline view · Android & iOS apps · Desktop agent · Semantic search upgrade</div>
                  <span className="rm-badge rm-badge-dev">In Development</span>
                </div>
              </div>
              <div className="roadmap-item">
                <div className="rm-dot-col">
                  <div className="rm-dot"></div>
                  <div className="rm-quarter">2027</div>
                </div>
                <div className="rm-content">
                  <div className="rm-version">V3.0 — Enterprise</div>
                  <div className="rm-title">White-label · On-premise · SOC 2</div>
                  <div className="rm-body">Compliance packs · On-premise deployment · SOC 2 certification · Custom AI models</div>
                  <span className="rm-badge rm-badge-planned">Planned</span>
                </div>
              </div>
              <div className="roadmap-item">
                <div className="rm-dot-col">
                  <div className="rm-dot"></div>
                  <div className="rm-quarter">2027–28</div>
                </div>
                <div className="rm-content">
                  <div className="rm-version">V4.0 — Platform</div>
                  <div className="rm-title">Workflow Automation · 22 Indian Languages</div>
                  <div className="rm-body">API marketplace · Third-party integrations (Tally, Zoho, WhatsApp) · Vernacular AI for all Indian languages</div>
                  <span className="rm-badge rm-badge-planned">Future</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FOOTER GALLERY ── */}
        <div id="footer-gallery">
          <div className="fg-rows">
            <div className="fg-row fg-row-1">
              <div className="fg-item"><span className="fgi-icon">📋</span><span className="fgi-text">insurance_policy.pdf · Categorised</span></div>
              <div className="fg-item"><span className="fgi-icon">📊</span><span className="fgi-text">gst_march_2025.xlsx · Tagged</span></div>
              <div className="fg-item"><span className="fgi-icon">⏰</span><span className="fgi-text">Renewal reminder set · 30 days</span></div>
              <div className="fg-item"><span className="fgi-icon">🔍</span><span className="fgi-text">Search: "health insurance"</span></div>
              <div className="fg-item"><span className="fgi-icon">📝</span><span className="fgi-text">employment_contract.pdf · Legal</span></div>
              <div className="fg-item"><span className="fgi-icon">🔐</span><span className="fgi-text">AES-256 encryption · Active</span></div>
              <div className="fg-item"><span className="fgi-icon">👥</span><span className="fgi-text">Team folder shared · 3 members</span></div>
              <div className="fg-item"><span className="fgi-icon">📋</span><span className="fgi-text">insurance_policy.pdf · Categorised</span></div>
              <div className="fg-item"><span className="fgi-icon">📊</span><span className="fgi-text">gst_march_2025.xlsx · Tagged</span></div>
              <div className="fg-item"><span className="fgi-icon">⏰</span><span className="fgi-text">Renewal reminder set · 30 days</span></div>
              <div className="fg-item"><span className="fgi-icon">🔍</span><span className="fgi-text">Search: "health insurance"</span></div>
              <div className="fg-item"><span className="fgi-icon">📝</span><span className="fgi-text">employment_contract.pdf · Legal</span></div>
              <div className="fg-item"><span className="fgi-icon">🔐</span><span className="fgi-text">AES-256 encryption · Active</span></div>
              <div className="fg-item"><span className="fgi-icon">👥</span><span className="fgi-text">Team folder shared · 3 members</span></div>
            </div>
            <div className="fg-row fg-row-2">
              <div className="fg-item"><span className="fgi-icon">🧾</span><span className="fgi-text">invoice_q1.pdf · Finance</span></div>
              <div className="fg-item"><span className="fgi-icon">💬</span><span className="fgi-text">"What's my renewal date?" · Answered</span></div>
              <div className="fg-item"><span className="fgi-icon">📁</span><span className="fgi-text">Smart folder created · Medical</span></div>
              <div className="fg-item"><span className="fgi-icon">🇮🇳</span><span className="fgi-text">DPDP 2023 · Compliant</span></div>
              <div className="fg-item"><span className="fgi-icon">☁️</span><span className="fgi-text">Google Drive synced · 842 files</span></div>
              <div className="fg-item"><span className="fgi-icon">📊</span><span className="fgi-text">vendor_agreement.pdf · Compared</span></div>
              <div className="fg-item"><span className="fgi-icon">🔗</span><span className="fgi-text">Secure link · Expires 24hr</span></div>
              <div className="fg-item"><span className="fgi-icon">🧾</span><span className="fgi-text">invoice_q1.pdf · Finance</span></div>
              <div className="fg-item"><span className="fgi-icon">💬</span><span className="fgi-text">"What's my renewal date?" · Answered</span></div>
              <div className="fg-item"><span className="fgi-icon">📁</span><span className="fgi-text">Smart folder created · Medical</span></div>
              <div className="fg-item"><span className="fgi-icon">🇮🇳</span><span className="fgi-text">DPDP 2023 · Compliant</span></div>
              <div className="fg-item"><span className="fgi-icon">☁️</span><span className="fgi-text">Google Drive synced · 842 files</span></div>
              <div className="fg-item"><span className="fgi-icon">📊</span><span className="fgi-text">vendor_agreement.pdf · Compared</span></div>
              <div className="fg-item"><span className="fgi-icon">🔗</span><span className="fgi-text">Secure link · Expires 24hr</span></div>
            </div>
            <div className="fg-row fg-row-3">
              <div className="fg-item"><span className="fgi-icon">🏥</span><span className="fgi-text">health_report.pdf · Medical</span></div>
              <div className="fg-item"><span className="fgi-icon">✓</span><span className="fgi-text">Tagged: GST · Compliance · 2025</span></div>
              <div className="fg-item"><span className="fgi-icon">📋</span><span className="fgi-text">4,502 files organised intelligently</span></div>
              <div className="fg-item"><span className="fgi-icon">⚡</span><span className="fgi-text">Search time: 0.3 seconds</span></div>
              <div className="fg-item"><span className="fgi-icon">🛡️</span><span className="fgi-text">Zero-knowledge architecture</span></div>
              <div className="fg-item"><span className="fgi-icon">🤖</span><span className="fgi-text">AI Chat · V4.0 · Coming 2027</span></div>
              <div className="fg-item"><span className="fgi-icon">🏥</span><span className="fgi-text">health_report.pdf · Medical</span></div>
              <div className="fg-item"><span className="fgi-icon">✓</span><span className="fgi-text">Tagged: GST · Compliance · 2025</span></div>
              <div className="fg-item"><span className="fgi-icon">📋</span><span className="fgi-text">4,502 files organised intelligently</span></div>
              <div className="fg-item"><span className="fgi-icon">⚡</span><span className="fgi-text">Search time: 0.3 seconds</span></div>
              <div className="fg-item"><span className="fgi-icon">🛡️</span><span className="fgi-text">Zero-knowledge architecture</span></div>
              <div className="fg-item"><span className="fgi-icon">🤖</span><span className="fgi-text">AI Chat · V4.0 · Coming 2027</span></div>
            </div>
          </div>
        </div>

        {/* ── FINAL CTA ── */}
        <section style={{ background: 'var(--dark)', padding: 0, position: 'relative', zIndex: 1 }}>
          <div id="final-cta">
            <div className="fc-badge">✓ NOW LIVE</div>
            <h2 className="fc-heading">Start managing your documents intelligently — for free.</h2>
            <p className="fc-sub">Join thousands of Indian professionals using Sortifi. Your data stays private — always.</p>
            <div className="fc-actions">
              <button onClick={() => navigate('/login')} className="btn-primary" style={{ fontSize: '16px', padding: '15px 36px' }}>Create Free Account →</button>
              <a href="mailto:founders@sortifi.in" className="btn-ghost">founders@sortifi.in</a>
            </div>
            <p className="fc-fine">No credit card required · Free plan available · Cancel anytime · Privacy Policy</p>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer>
          <div className="footer-top">
            <div className="footer-brand">
              <div className="footer-logo"><div className="footer-logo-icon">📁</div>Sortifi</div>
              <p className="footer-tagline">Intelligent File Management, Reimagined</p>
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.25)', marginTop: '6px', fontFamily: 'var(--sans)' }}>📍 Pune, India</p>
              <div className="footer-socials">
                <a href="#twitter" className="footer-social">𝕏</a>
                <a href="mailto:founders@sortifi.in" className="footer-social">✉</a>
              </div>
            </div>
            <div className="footer-links">
              <div>
                <div className="footer-col-title">Product</div>
                <ul className="footer-col-links">
                  <li><a onClick={() => navigate('/features')}>Features</a></li>
                  <li><a onClick={() => navigate('/how-it-works')}>How It Works</a></li>
                  <li><a onClick={() => navigate('/security')}>Security</a></li>
                  <li><a onClick={() => navigate('/roadmap')}>Roadmap</a></li>
                  <li><a onClick={() => navigate('/pricing')}>Pricing</a></li>
                  <li><a onClick={() => navigate('/faq')}>FAQ</a></li>
                </ul>
              </div>
              <div>
                <div className="footer-col-title">Legal & Support</div>
                <ul className="footer-col-links">
                  <li><a onClick={() => navigate('/privacy')}>Privacy Policy</a></li>
                  <li><a onClick={() => navigate('/terms')}>Terms of Service</a></li>
                  <li><a onClick={() => navigate('/faq')}>FAQ</a></li>
                  <li><a onClick={() => navigate('/support')}>Help & Support</a></li>
                  <li><a href="mailto:founders@sortifi.in">founders@sortifi.in</a></li>
                  <li><a href="#twitter">Twitter / X</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <span className="footer-copy">© 2026 Sortifi. All rights reserved.</span>
            <span className="footer-loc">Built in Pune 🇮🇳</span>
          </div>
        </footer>

      </div>
    </>
  );
}