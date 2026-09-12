/* =====================================================================
   Parts Bin website, shared behaviour
   Header and footer are injected here so every page shares one copy.
   Each feature below only runs if its markup exists on the page.
   ===================================================================== */
(function(){
"use strict";
const $=(s,r)=>(r||document).querySelector(s);
const $$=(s,r)=>Array.from((r||document).querySelectorAll(s));

/* ---------- links (edit here, applies everywhere) ---------- */
const LINKS={
  github:"https://github.com/PrintLab3D-Official/Part-bin",
  githubOrg:"https://github.com/PrintLab3D-Official",
  issues:"https://github.com/PrintLab3D-Official/Part-bin/issues",
  newIssue:"https://github.com/PrintLab3D-Official/Part-bin/issues/new",
  discord:"https://discord.gg/n8M3V4SaHJ",
  youtube:"https://www.youtube.com/@PrintLab3D000",
  tiktok:"https://www.tiktok.com/@printlab3d64",
  mail:"mailto:PrintLab3D@outlook.com.au"
};
/* Release moment for the countdown: 20 Sep 2026, 00:00 Australian Eastern Standard Time (UTC+10). */
const RELEASE=Date.UTC(2026,8,19,14,0,0);

const I={
  chev:'<svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>',
  grid:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>',
  palette:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="8.5" cy="10" r="1.2" fill="currentColor"/><circle cx="12" cy="7.5" r="1.2" fill="currentColor"/><circle cx="15.5" cy="10" r="1.2" fill="currentColor"/><path d="M12 21c-1.5-2-1-4 1-4h2a3 3 0 0 0 0-6"/></svg>',
  drawer:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M3 15h18M9 3v18M15 3v18"/></svg>',
  download:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12M6 11l6 6 6-6"/><path d="M4 21h16"/></svg>',
  discord:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.369a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.249a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.036A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.009c.12.099.246.198.373.292a.077.077 0 0 1-.006.127 12.3 12.3 0 0 1-1.873.891.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.331c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>',
  youtube:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.6 15.6V8.4l6.2 3.6z"/></svg>',
  tiktok:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 1 1-2.6-2.6c.27 0 .53.04.78.12V9.66a5.7 5.7 0 1 0 4.91 5.64V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3a4.35 4.35 0 0 1-3.24-1.48z"/></svg>',
  github:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.7C6.7 19.7 6.1 18 6.1 18c-.4-1.1-1-1.4-1-1.4-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.6.3-1.1.6-1.3-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7 0-.3-.4-1.3.1-2.7 0 0 .8-.3 2.7 1a9.4 9.4 0 0 1 5 0c1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.4 4.7-4.6 5 .4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5A10 10 0 0 0 12 2z"/></svg>',
  mail:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="4.5" width="19" height="15" rx="2"/><path d="M3 6l9 6 9-6"/></svg>',
  help:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M9.1 9.5a3 3 0 0 1 5.8 1c0 2-3 2.5-3 4"/><path d="M12 17.5h.01"/></svg>',
  search:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
  bug:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2l1.9 1.9M16 2l-1.9 1.9M9 7h6a3 3 0 0 1 3 3v4a6 6 0 0 1-12 0v-4a3 3 0 0 1 3-3z"/><path d="M3 13h3M18 13h3M4 20l3-2M20 20l-3-2M4 6l3 2M20 6l-3 2"/></svg>',
  x:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>',
  book:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>'
};
window.PB_ICONS=I; window.PB_LINKS=LINKS;

/* ---------- header / footer ---------- */
const page=document.body.dataset.page||"";
function header(){
  const isSupport=page==="support", isContent=page==="printlab3d";
  const brand=isContent
    ? `<a class="brand" href="printlab3d.html"><img class="pl" src="assets/img/printlab3d.png" alt="" width="34" height="34">PrintLab3D</a>`
    : `<a class="brand" href="index.html"><img src="assets/img/logo.svg" alt="" width="34" height="34">Parts Bin${isSupport?' Support':''}</a>`;
  const nav=isContent
    ? `<li><a href="index.html">Parts Bin</a></li>
      <li><a href="printlab3d.html#watch">Videos</a></li>
      <li><a href="printlab3d.html#contact">Contact</a></li>`
    : `<li><button type="button" aria-haspopup="true">Product ${I.chev}</button>
        <div class="menu">
          <a href="features.html"><span class="mi">${I.grid}</span><div><b>Features</b><span>Inventory, orders, projects, compartments. Everything on the bench.</span></div></a>
          <a href="features.html#ai"><span class="mi">${I.help}</span><div><b>Assistant</b><span>An AI that sees your inventory and can add, edit and plan for you.</span></div></a>
          <a href="index.html#themes"><span class="mi">${I.palette}</span><div><b>Style presets</b><span>9 presets that rebuild the app. Hover one to preview its colours.</span></div></a>
          <a href="download.html"><span class="mi">${I.download}</span><div><b>Download V4</b><span>Windows. Free. Counting down to release.</span></div></a>
        </div></li>
      <li><a href="support.html">Support</a></li>
      <li><a href="printlab3d.html">Content</a></li>`;
  const right=isContent
    ? `<a class="btn btn-ghost btn-sm cta hide-m" href="${LINKS.youtube}" target="_blank" rel="noopener">${I.youtube}YouTube</a>
    <a class="btn btn-blue btn-sm cta" href="printlab3d.html#contact">${I.mail}Contact</a>`
    : `<a class="btn btn-ghost btn-sm cta hide-m" href="${LINKS.github}" target="_blank" rel="noopener">${I.github}GitHub</a>
    <a class="btn btn-green btn-sm cta" href="download.html">${I.download}Get V4</a>`;
  return `<header class="hdr${isSupport?' hdr-support':''}${isContent?' hdr-content':''}" id="hdr"><div class="wrap">
    ${brand}
    <button class="burger" id="burger" aria-label="Menu" aria-expanded="false">${I.grid}</button>
    <ul class="nav" id="nav">${nav}</ul>
    <div class="sp"></div>
    <button class="srch" id="srchBtn" type="button" aria-label="Search the site">${I.search}<span>${isSupport?"Search help":"Search"}</span><kbd>/</kbd></button>
    ${right}
  </div></header>`;
}
function footer(){
  return `<footer><div class="wrap">
    <div class="fcols">
      <div class="about"><a class="brand" href="index.html"><img src="assets/img/logo.svg" alt="" width="34" height="34">Parts Bin</a>
        <p>A free, open-source inventory app for makers. Components, filament, PCBs and screws, tracked across the real drawers on your bench. Everything stays on your PC.</p>
        <a class="madeby" href="printlab3d.html"><img src="assets/img/printlab3d.png" alt="" width="28" height="28"><span>Made by <b>PrintLab3D</b></span></a></div>
      <div><h5>Product</h5><a href="features.html">Features</a><a href="features.html#ai">Assistant</a><a href="index.html#themes">Style presets</a><a href="index.html#versions">Versions</a><a href="download.html">Download V4</a></div>
      <div><h5>Support</h5><a href="support.html#bugs">Report a bug</a><a href="support.html#install">Install tutorial</a><a href="support.html#faq">FAQ</a><a href="${LINKS.discord}" target="_blank" rel="noopener">Discord</a><a href="${LINKS.mail}">Email</a></div>
      <div><h5>Content</h5><a href="printlab3d.html">Videos</a><a href="${LINKS.youtube}" target="_blank" rel="noopener">YouTube</a><a href="${LINKS.tiktok}" target="_blank" rel="noopener">TikTok</a><a href="${LINKS.githubOrg}" target="_blank" rel="noopener">GitHub</a></div>
      <div><h5>Open source</h5><a href="${LINKS.github}" target="_blank" rel="noopener">Source code</a><a href="${LINKS.issues}" target="_blank" rel="noopener">Issues</a><a href="${LINKS.github}#readme" target="_blank" rel="noopener">Readme</a></div>
    </div>
    <div class="fbot"><span>© ${new Date().getFullYear()} PrintLab3D. Parts Bin is free and open source.</span><span class="sp"></span>
      <div class="ico"><a href="${LINKS.youtube}" target="_blank" rel="noopener" aria-label="YouTube">${I.youtube}</a><a href="${LINKS.tiktok}" target="_blank" rel="noopener" aria-label="TikTok">${I.tiktok}</a><a href="${LINKS.discord}" target="_blank" rel="noopener" aria-label="Discord">${I.discord}</a><a href="${LINKS.githubOrg}" target="_blank" rel="noopener" aria-label="GitHub">${I.github}</a></div>
    </div>
  </div></footer>
  <div class="ov" id="notifyOv" role="dialog" aria-modal="true" aria-labelledby="notifyT"><div class="mod">
    <button class="x" data-close aria-label="Close">${I.x}</button>
    <h3 id="notifyT">Get told when V4 ships</h3>
    <p>There's no mailing list. Pick whichever of these you already use and you'll see the release the moment it's out.</p>
    <div class="opts">
      <a href="${LINKS.discord}" target="_blank" rel="noopener"><span class="si" style="background:#5865F2">${I.discord}</span><div><b>Join the Discord</b><span>Release announcements, betas and help.</span></div></a>
      <a href="${LINKS.youtube}" target="_blank" rel="noopener"><span class="si" style="background:#FF0000">${I.youtube}</span><div><b>Subscribe on YouTube</b><span>The V4 launch video will land on @PrintLab3D000.</span></div></a>
      <a href="${LINKS.github}" target="_blank" rel="noopener"><span class="si" style="background:#24292f">${I.github}</span><div><b>Watch the GitHub repo</b><span>Watch, then Custom, then Releases, and GitHub emails you.</span></div></a>
    </div>
  </div></div>
  <div class="ov" id="palOv"><div class="pal" role="dialog" aria-label="Search"><input id="palIn" placeholder="Search pages and features" autocomplete="off"><ul id="palList"></ul></div></div>
  <div class="gtoast" id="gtoast"></div>`;
}
document.body.insertAdjacentHTML("afterbegin",header());
document.body.insertAdjacentHTML("beforeend",footer());

/* dropdowns */
const nav=$("#nav");
$$("#nav > li > button").forEach(b=>{
  const li=b.parentElement;
  b.setAttribute("aria-expanded","false");
  const sync=()=>$$("#nav > li > button").forEach(x=>x.setAttribute("aria-expanded",x.parentElement.classList.contains("open")));
  b.addEventListener("click",e=>{e.stopPropagation();const open=li.classList.contains("open");$$("#nav > li.open").forEach(x=>x.classList.remove("open"));if(!open)li.classList.add("open");sync();});
  if(matchMedia("(hover:hover)").matches){li.addEventListener("mouseenter",()=>{$$("#nav > li.open").forEach(x=>x.classList.remove("open"));li.classList.add("open");sync();});li.addEventListener("mouseleave",()=>{li.classList.remove("open");sync();});}
});
document.addEventListener("click",()=>$$("#nav > li.open").forEach(x=>x.classList.remove("open")));
document.addEventListener("keydown",e=>{if(e.key==="Escape"){$$("#nav > li.open").forEach(x=>x.classList.remove("open"));closeOv();}});
function closeNav(){nav.classList.remove("show");$("#burger").setAttribute("aria-expanded","false");if(!$$(".ov.show").length)document.body.style.overflow="";}
$("#burger").addEventListener("click",()=>{const s=nav.classList.toggle("show");$("#burger").setAttribute("aria-expanded",s);document.body.style.overflow=s?"hidden":"";});
nav.addEventListener("click",e=>{if(e.target.closest("a"))closeNav();});
addEventListener("resize",()=>{if(innerWidth>960&&nav.classList.contains("show"))closeNav();});
const onScroll=()=>$("#hdr").classList.toggle("solid",scrollY>40);
addEventListener("scroll",onScroll,{passive:true});onScroll();

/* ---------- overlays ---------- */
function openOv(id){$(id).classList.add("show");document.body.style.overflow="hidden";}
function closeOv(){$$(".ov.show").forEach(o=>o.classList.remove("show"));document.body.style.overflow="";}
$$(".ov").forEach(o=>o.addEventListener("click",e=>{if(e.target===o||e.target.closest("[data-close]"))closeOv();}));
document.addEventListener("click",e=>{const t=e.target.closest("[data-notify]");if(t){e.preventDefault();openOv("#notifyOv");}});
function toast(msg){const t=$("#gtoast");t.textContent=msg;t.classList.add("show");clearTimeout(t._t);t._t=setTimeout(()=>t.classList.remove("show"),1800);}

/* ---------- command palette ("/" to open) ---------- */
const INDEX=[
  {k:"Page",t:"Home",s:"Overview, countdown, themes, versions",h:"index.html"},
  {k:"Page",t:"Features",s:"Every feature in Parts Bin V4",h:"features.html"},
  {k:"Page",t:"Download",s:"V4 for Windows, counting down",h:"download.html"},
  {k:"Page",t:"Support",s:"Report a bug, install tutorial, FAQ",h:"support.html"},
  {k:"Page",t:"Content",s:"PrintLab3D videos, YouTube and TikTok",h:"printlab3d.html"},
  {k:"Feature",t:"Assistant (AI)",s:"Sees your inventory, suggests projects, creates and edits items for you",h:"features.html#ai"},
  {k:"Feature",t:"Inventory",s:"Part IDs, photos, drawer location, stock steppers",h:"features.html#inventory"},
  {k:"Feature",t:"Compartments",s:"Map shelves and drawer cabinets, link parts to drawers",h:"features.html#compartments"},
  {k:"Feature",t:"Orders",s:"Track incoming orders, auto-receive into stock",h:"features.html#orders"},
  {k:"Feature",t:"Projects",s:"Photos, checklists, allocated parts, total cost",h:"features.html#projects"},
  {k:"Feature",t:"BOM import and export",s:"Bring a parts list in, get an order-ready file out",h:"features.html#bom"},
  {k:"Feature",t:"Labels and scanning",s:"Print barcode labels, scan with your camera",h:"features.html#labels"},
  {k:"Feature",t:"Style presets",s:"9 presets that rebuild the whole app, plus 16 themes",h:"index.html#themes"},
  {k:"Feature",t:"Privacy and backups",s:"Local-only storage, recovery snapshot, backup to file",h:"features.html#privacy"},
  {k:"Feature",t:"Custom tabs",s:"Add your own categories with their own ID prefix",h:"features.html#custom"},
  {k:"Help",t:"Report a bug",s:"Post it on Discord with the template",h:"support.html#bugs"},
  {k:"Help",t:"Install tutorial",s:"Step by step, including the Windows warning",h:"support.html#install"},
  {k:"Help",t:"Windows protected your PC?",s:"Why the SmartScreen box appears and what to click",h:"support.html#smartscreen"},
  {k:"Help",t:"Is my data uploaded anywhere?",s:"No. Everything stays on your PC",h:"support.html#faq"},
  {k:"Help",t:"Mac or Linux?",s:"Windows first. More support brings the others sooner",h:"support.html#faq"},
  {k:"Help",t:"I forgot my PIN",s:"Reset it with your Windows password. Nothing is lost",h:"support.html#pin"},
  {k:"Link",t:"Discord",s:"discord.gg/n8M3V4SaHJ",h:LINKS.discord,x:1},
  {k:"Link",t:"GitHub repo",s:"PrintLab3D-Official/Part-bin",h:LINKS.github,x:1},
  {k:"Link",t:"YouTube",s:"@PrintLab3D000",h:LINKS.youtube,x:1},
  {k:"Link",t:"TikTok",s:"@printlab3d64",h:LINKS.tiktok,x:1}
];
const palIn=$("#palIn"),palList=$("#palList");let palSel=0;
function palRender(){
  const q=palIn.value.trim().toLowerCase();
  const rows=INDEX.filter(r=>!q||(r.t+" "+r.s+" "+r.k).toLowerCase().includes(q)).slice(0,12);
  palSel=Math.min(palSel,Math.max(0,rows.length-1));
  palList.innerHTML=rows.length?rows.map((r,i)=>`<li class="${i===palSel?"on":""}"><a href="${r.h}" ${r.x?'target="_blank" rel="noopener"':''}><span class="k">${r.k}</span><div><b>${r.t}</b><span>${r.s}</span></div></a></li>`).join(""):'<div class="none">Nothing matches. Try "BOM", "themes" or "Discord".</div>';
}
function palOpen(){openOv("#palOv");palIn.value="";palSel=0;palRender();setTimeout(()=>palIn.focus(),30);}
$("#srchBtn").addEventListener("click",palOpen);
palIn.addEventListener("input",()=>{palSel=0;palRender();});
palIn.addEventListener("keydown",e=>{
  const n=palList.querySelectorAll("li").length;
  if(e.key==="ArrowDown"){e.preventDefault();palSel=(palSel+1)%Math.max(1,n);palRender();}
  else if(e.key==="ArrowUp"){e.preventDefault();palSel=(palSel-1+n)%Math.max(1,n);palRender();}
  else if(e.key==="Enter"){const a=palList.querySelector("li.on a");if(a){a.click();closeOv();}}
});
document.addEventListener("keydown",e=>{
  if(e.key==="/"&&!e.ctrlKey&&!e.metaKey&&!/input|textarea|select/i.test(document.activeElement.tagName)){e.preventDefault();palOpen();}
});

/* ---------- copy buttons ---------- */
document.addEventListener("click",e=>{const b=e.target.closest("[data-copy]");if(!b)return;const src=b.dataset.copy==="prev"?b.parentElement.textContent.replace(b.textContent,"").trim():b.dataset.copy;navigator.clipboard?.writeText(src).then(()=>toast("Copied to clipboard"));});

/* ---------- debug helpers for headless captures (harmless in production) ---------- */
const DBG=new URLSearchParams(location.search);
if(DBG.has("nofx")){$$(".rv").forEach(el=>el.classList.add("in"));document.head.insertAdjacentHTML("beforeend","<style>*{transition:none!important;animation:none!important}</style>");}
if(DBG.has("top")){document.body.style.marginTop=(-DBG.get("top"))+"px";}

/* ---------- scroll reveal ---------- */
$$(".rv").forEach(el=>el.classList.add("in"));

/* ---------- release day: swap the disabled Download button for the real link ---------- */
function releaseDay(){
  const b=$("#dlBtn");if(!b||b.dataset.live)return;b.dataset.live="1";
  const a=document.createElement("a");a.className="btn btn-green big";a.href=LINKS.github+"/releases/latest";a.target="_blank";a.rel="noopener";a.innerHTML=b.innerHTML;
  b.replaceWith(a);const soon=$(".dlcard .soon");if(soon)soon.remove();
}
if(RELEASE-Date.now()<=0)releaseDay();

/* ---------- countdown (only the digit that changes rolls) ---------- */
$$("[data-countdown]").forEach(cd=>{
  const cells={d:$("[data-d]",cd),h:$("[data-h]",cd),m:$("[data-m]",cd),s:$("[data-s]",cd)},lbl=$(".lbl",cd);
  const pad=n=>String(n).padStart(2,"0");
  const reduce=matchMedia("(prefers-reduced-motion:reduce)").matches;
  const set=(c,v)=>{
    const digits=c.querySelectorAll("span.d");
    if(digits.length!==v.length){c.innerHTML=v.split("").map(ch=>`<span class="d"><i>${ch}</i></span>`).join("");return;}
    v.split("").forEach((ch,i)=>{
      const d=digits[i],cur=d.querySelector("i:not(.out)");
      if(cur&&cur.textContent===ch)return;
      if(reduce||!cur){d.innerHTML=`<i>${ch}</i>`;return;}
      cur.classList.add("out");
      const n=document.createElement("i");n.className="in";n.textContent=ch;d.appendChild(n);
      setTimeout(()=>{cur.remove();n.classList.remove("in");},420);
    });
  };
  const tick=()=>{
    let diff=RELEASE-Date.now();
    if(diff<=0){cd.classList.add("done");lbl.innerHTML='Parts Bin V4 is out. <a href="download.html">Download it</a>.';releaseDay();return;}
    const dd=Math.floor(diff/864e5);diff-=dd*864e5;const hh=Math.floor(diff/36e5);diff-=hh*36e5;const mm=Math.floor(diff/6e4);diff-=mm*6e4;const ss=Math.floor(diff/1e3);
    set(cells.d,String(dd));set(cells.h,pad(hh));set(cells.m,pad(mm));set(cells.s,pad(ss));
    setTimeout(tick,1000-(Date.now()%1000));
  };
  tick();
});

/* ---------- style presets: hover previews, click keeps ----------
   Values are the app's own 9 presets (web/css/styles-presets.css). */
const PRESETS=[
  {k:"main",n:"Main",d:"The original Parts Bin look",bg:"#0d1117",bg0:"#0a0e14",bg2:"#161b22",bg3:"#1c2230",line:"#2a3140",line2:"#3a4256",txt:"#e6edf3",txt2:"#c3cbd6",mut:"#8b97a7",mut2:"#6b7686",accent:"#3b82f6",accent2:"#60a5fa",violet:"#8b5cf6",green:"#22c55e",hero:"#1b2848",rad:"14px",rads:"9px",font:"",body:"",light:0},
  {k:"claude",n:"Warm Paper",d:"Editorial cream, serif headings",bg:"#f4efe6",bg0:"#ede6d8",bg2:"#fffdf9",bg3:"#efe8da",line:"#e6ddcb",line2:"#d2c6ac",txt:"#2b2620",txt2:"#4d4538",mut:"#7a7160",mut2:"#98907f",accent:"#c96442",accent2:"#d97b58",violet:"#a5503a",green:"#5f8a4f",hero:"#f0e4cc",rad:"16px",rads:"10px",font:"Georgia,'Times New Roman',serif",body:"#f4efe6",light:1,head:1},
  {k:"shopify",n:"Commerce",d:"Crisp admin dashboard, green tiles",bg:"#f1f2f4",bg0:"#e6e8eb",bg2:"#ffffff",bg3:"#f6f6f7",line:"#dfe3e8",line2:"#c4cbd3",txt:"#202223",txt2:"#3f4346",mut:"#6d7175",mut2:"#8c9196",accent:"#008060",accent2:"#00a47c",violet:"#006e52",green:"#008060",hero:"#dfeee8",rad:"8px",rads:"6px",font:"",body:"#f1f2f4",light:1},
  {k:"terminal",n:"Terminal",d:"CRT console, scanlines, monospace",bg:"#050805",bg0:"#030503",bg2:"#0b110b",bg3:"#0f170f",line:"#1e2b1e",line2:"#2c402c",txt:"#b9f5b9",txt2:"#8fd48f",mut:"#5f8a5f",mut2:"#4a6d4a",accent:"#39ff14",accent2:"#7dff5e",violet:"#39ff14",green:"#39ff14",hero:"#0a1f0a",rad:"2px",rads:"2px",font:"'JetBrains Mono','Cascadia Code',Consolas,'Courier New',monospace",body:"repeating-linear-gradient(0deg,rgba(57,255,20,.05) 0 1px,transparent 1px 3px),#050805",light:0},
  {k:"blueprint",n:"Blueprint",d:"Engineering drawing on grid paper",bg:"#0a2144",bg0:"#071a37",bg2:"#0e2c58",bg3:"#12386e",line:"#2f66a8",line2:"#3f7fc4",txt:"#e6f0fb",txt2:"#c2d6ee",mut:"#9dc0e8",mut2:"#7aa3d0",accent:"#4cc9f0",accent2:"#8ad8f6",violet:"#4cc9f0",green:"#4ade80",hero:"#123a70",rad:"4px",rads:"3px",font:"",body:"repeating-linear-gradient(0deg,rgba(120,190,240,.10) 0 1px,transparent 1px 28px),repeating-linear-gradient(90deg,rgba(120,190,240,.10) 0 1px,transparent 1px 28px),repeating-linear-gradient(0deg,rgba(120,190,240,.045) 0 1px,transparent 1px 7px),repeating-linear-gradient(90deg,rgba(120,190,240,.045) 0 1px,transparent 1px 7px),#0a2144",light:0},
  {k:"aurora",n:"Aurora",d:"Living gradient, frosted-glass cards",bg:"#1a1030",bg0:"rgba(0,0,0,.25)",bg2:"rgba(255,255,255,.09)",bg3:"rgba(255,255,255,.14)",line:"rgba(255,255,255,.20)",line2:"rgba(255,255,255,.32)",txt:"#f6f2ff",txt2:"#e6dcff",mut:"#cdbdf0",mut2:"#b3a3d8",accent:"#f472b6",accent2:"#f9a8d4",violet:"#a5b4fc",green:"#5eead4",hero:"transparent",rad:"18px",rads:"12px",font:"",body:"linear-gradient(125deg,#6d28d9,#9d174d,#1e3a8a,#0f766e,#6d28d9) 0 0/300% 300% fixed",light:0,anim:1},
  {k:"neo",n:"Neo Brutal",d:"Black borders, hard shadows, loud yellow",bg:"#ffdd00",bg0:"#f2d000",bg2:"#ffffff",bg3:"#fff6cc",line:"#111111",line2:"#111111",txt:"#111111",txt2:"#222222",mut:"#4b4b4b",mut2:"#666666",accent:"#ff5c00",accent2:"#ff7a2e",violet:"#111111",green:"#00c853",hero:"#ffe84d",rad:"0px",rads:"0px",font:"'Arial Black',Inter,'Segoe UI',sans-serif",body:"#ffdd00",light:1,hard:1},
  {k:"midnight",n:"Midnight",d:"Deep indigo, electric violet",bg:"#0b0f1e",bg0:"#080b17",bg2:"#12193a",bg3:"#1b2350",line:"#2a356e",line2:"#3a4a90",txt:"#e9edff",txt2:"#c5cdf5",mut:"#93a0d6",mut2:"#7381b8",accent:"#8b5cf6",accent2:"#a78bfa",violet:"#c084fc",green:"#34d399",hero:"#2a1d5c",rad:"14px",rads:"9px",font:"",body:"#0b0f1e",light:0},
  {k:"sunset",n:"Sunset",d:"Warm charcoal, orange-pink, serif",bg:"#160f12",bg0:"#100a0d",bg2:"#231619",bg3:"#321f24",line:"#472a31",line2:"#5e3a43",txt:"#fceae7",txt2:"#e6c9c3",mut:"#cb9a93",mut2:"#a97c76",accent:"#fb7185",accent2:"#fdba74",violet:"#fb7185",green:"#4ade80",hero:"#3a1a22",rad:"14px",rads:"9px",font:"Georgia,'Times New Roman',serif",body:"#160f12",light:0}
];
window.PB_PRESETS=PRESETS;
const root=document.documentElement;
function applyPreset(t){
  const vars={"--bg":t.bg,"--bg0":t.bg0,"--bg2":t.bg2,"--bg3":t.bg3,"--line":t.line,"--line2":t.line2,"--txt":t.txt,"--txt2":t.txt2,"--mut":t.mut,"--mut2":t.mut2,"--accent":t.accent,"--accent2":t.accent2,"--violet":t.violet,"--green":t.green,"--hero":t.hero,"--rad":t.rad,"--rad-sm":t.rads};
  Object.keys(vars).forEach(k=>root.style.setProperty(k,vars[k]));
  root.style.setProperty("--shadow",t.hard?"6px 6px 0 #111":(t.light?"0 8px 30px rgba(20,30,50,.12)":"0 8px 30px rgba(0,0,0,.35)"));
  root.style.setProperty("--shadow-lg",t.hard?"8px 8px 0 #111":(t.light?"0 30px 80px rgba(20,30,50,.18)":"0 30px 80px rgba(0,0,0,.55)"));
  document.body.style.background=t.body||"";
  document.body.style.animation=t.anim?"pbAurora 22s ease infinite":"";
  root.classList.toggle("light",!!t.light);
  root.classList.toggle("hard",!!t.hard);
  root.dataset.preset=t.k;
  const meta=document.querySelector('meta[name="theme-color"]');if(meta)meta.content=t.bg;
}
const pgrid=$("#pgrid");
if(pgrid){
  const MAIN=PRESETS[0];
  pgrid.innerHTML=PRESETS.map(t=>`<button type="button" data-p="${t.k}" title="${t.d}"><span class="sw" style="background:linear-gradient(135deg,${t.body&&!t.anim&&t.body.indexOf("gradient")<0?t.body:t.bg} 50%,${t.accent} 50%)"></span>${t.n}</button>`).join("");
  root.classList.add("theming");
  $$("button",pgrid).forEach(b=>{
    const t=PRESETS.find(x=>x.k===b.dataset.p);
    b.addEventListener("mouseenter",()=>applyPreset(t));
    b.addEventListener("focus",()=>applyPreset(t));
  });
  pgrid.addEventListener("mouseleave",()=>applyPreset(MAIN));
  pgrid.addEventListener("focusout",e=>{if(!pgrid.contains(e.relatedTarget))applyPreset(MAIN);});
}

/* ---------- YouTube click-to-play ---------- */
$$("[data-yt]").forEach(el=>el.addEventListener("click",e=>{
  e.preventDefault();const id=el.dataset.yt;
  const p=$("#player");if(!p)return;p.innerHTML=`<iframe src="https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0" title="YouTube video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
  p.scrollIntoView({behavior:"smooth",block:"center"});
}));

/* ---------- docs sidebar highlight (support page) ---------- */
const docLinks=$$(".docs .side a[href^='#']");
if(docLinks.length){
  const secs=docLinks.map(a=>document.getElementById(a.getAttribute("href").slice(1))).filter(Boolean);
  const so=new IntersectionObserver(es=>{es.forEach(en=>{if(en.isIntersecting){docLinks.forEach(a=>a.classList.toggle("on",a.getAttribute("href")==="#"+en.target.id));}});},{rootMargin:"-20% 0px -70% 0px"});
  secs.forEach(s=>so.observe(s));
}
})();
