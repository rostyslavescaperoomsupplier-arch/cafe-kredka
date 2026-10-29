(() => {
  const { categories, items } = window.KREDKA_MENU;
  const ORDER_URL = "https://www.cafekredka.pl/restauracja/cafe-kredka";
  const MIN_ORDER = 40;
  const byId = Object.fromEntries(items.map((i) => [i.id, i]));
  // Pierogi/naleśniki names omit the dish type inside their category; add it back in the cart.
  const PREFIX = { pierogi: "Pierogi", nalesniki: "Naleśniki" };
  const fullName = (id) => (PREFIX[byId[id].cat] ? `${PREFIX[byId[id].cat]} ${byId[id].name.charAt(0).toLowerCase()}${byId[id].name.slice(1)}` : byId[id].name);
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const zl = (n) => n.toFixed(2).replace(".", ",") + " zł";
  const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  const icon = {
    plus: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>',
    minus: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14"/></svg>',
    bag: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 8h14l-1.2 11.1a2 2 0 0 1-2 1.9H8.2a2 2 0 0 1-2-1.9L5 8Z"/><path d="M9 8V6.5a3 3 0 0 1 6 0V8"/></svg>'
  };
  const addBtn = (it) => `<button class="add" type="button" data-add="${it.id}" aria-label="Dodaj do koszyka: ${esc(it.name)}">${icon.plus}</button>`;
  const img = (it, w, h, sq = false) => `<img loading="lazy" decoding="async" src="assets/food/${it.img}${sq ? "-sq" : ""}.webp" alt="${esc(it.name)}" width="${w}" height="${h}">`;

  // Popular
  $("[data-popular]").innerHTML = items.filter((i) => i.popular && i.img).map((it, n) => `
    <article class="pop reveal" style="--i:${n}">
      <div class="pop__img">${img(it, 1000, 1250)}</div>
      <div class="pop__body">
        <h3>${esc(it.name)}</h3>
        <div class="pop__row"><span class="price">${zl(it.price)}</span>${addBtn(it)}</div>
      </div>
    </article>`).join("");

  // Menu
  $("[data-tabs]").innerHTML = categories.map((c, n) =>
    `<button class="tab" role="tab" type="button" data-tab="${c.id}" aria-selected="${n === 0}">${c.name}</button>`).join("");
  $("[data-menu]").innerHTML = categories.map((c) => `
    <div class="menu__cat" id="kat-${c.id}">
      <h3>${c.name}</h3>
      <div class="menu__items">
        ${items.filter((i) => i.cat === c.id).map((it, n) => `
          <article class="dish ${it.img ? "dish--img" : ""} reveal" style="--i:${n % 4}">
            ${it.img ? `<div class="dish__img">${img(it, 480, 480, true)}</div>` : ""}
            <div class="dish__txt">
              <h4>${esc(it.name)}</h4>
              <p>${esc(it.desc)}</p>
              <div class="dish__foot"><span class="price">${zl(it.price)}</span>${addBtn(it)}</div>
            </div>
          </article>`).join("")}
      </div>
    </div>`).join("");

  // Tabs scroll to category; active tab follows scroll.
  // Only the tab strip scrolls horizontally here; scrollIntoView would also nudge the page.
  const tabsEl = $("[data-tabs]");
  const tabs = $$("[data-tab]");
  let activeTab = categories[0].id;
  const setTab = (id) => {
    if (id === activeTab) return;
    activeTab = id;
    tabs.forEach((t) => {
      const on = t.dataset.tab === id;
      t.setAttribute("aria-selected", on);
      if (on) tabsEl.scrollTo({ left: t.offsetLeft - (tabsEl.clientWidth - t.offsetWidth) / 2, behavior: "smooth" });
    });
  };
  tabs.forEach((t) => t.addEventListener("click", () => {
    const el = document.getElementById("kat-" + t.dataset.tab);
    const offset = $(".nav").offsetHeight + tabsEl.offsetHeight + 8;
    window.scrollTo({ top: el.getBoundingClientRect().top + scrollY - offset, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  }));
  const catObs = new IntersectionObserver((es) => es.forEach((e) => {
    if (e.isIntersecting) setTab(e.target.id.slice(4));
  }), { rootMargin: "-40% 0px -55% 0px" });
  $$(".menu__cat").forEach((c) => catObs.observe(c));

  // Reveal
  const revObs = new IntersectionObserver((es) => es.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add("in"); revObs.unobserve(e.target); }
  }), { rootMargin: "0px 0px -8% 0px" });
  $$(".reveal, .promo__card, .steps__row li, .gallery figure, .reviews__row > *").forEach((el, i) => {
    el.classList.add("reveal");
    revObs.observe(el);
  });

  // Nav border once the page scrolls (sentinel, no scroll listener).
  const sentinel = document.createElement("div");
  sentinel.style.cssText = "position:absolute;top:0;height:8px;width:1px";
  document.body.prepend(sentinel);
  new IntersectionObserver(([e]) => $(".nav").classList.toggle("is-scrolled", !e.isIntersecting)).observe(sentinel);

  // Opening hours, Europe/Warsaw
  const DAYS = ["Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota", "Niedziela"];
  const now = new Date(new Date().toLocaleString("en-US", { timeZone: "Europe/Warsaw" }));
  const dow = (now.getDay() + 6) % 7;
  const mins = now.getHours() * 60 + now.getMinutes();
  $("[data-hours]").innerHTML = DAYS.map((d, i) =>
    `<tr class="${i === dow ? "today" : ""}"><td>${d}</td><td>${i < 5 ? "8:00-16:00" : "zamknięte"}</td></tr>`).join("");
  const status = $("[data-status]");
  if (dow < 5 && mins >= 480 && mins < 960) {
    status.textContent = "Otwarte, zamówienia do 16:00";
    status.classList.add("is-open");
  } else {
    const tomorrowOpen = dow < 4 || dow === 6 ? "jutro" : "w poniedziałek";
    status.textContent = dow < 5 && mins < 480 ? "Otwieramy dziś o 8:00" : `Zamknięte, zapraszamy ${tomorrowOpen} od 8:00`;
  }

  // Cart
  let cart = {};
  try { cart = JSON.parse(localStorage.getItem("kredka-cart")) || {}; } catch {}
  for (const id in cart) if (!byId[id]) delete cart[id];
  const save = () => { try { localStorage.setItem("kredka-cart", JSON.stringify(cart)); } catch {} };
  const total = () => Object.entries(cart).reduce((s, [id, q]) => s + byId[id].price * q, 0);
  const count = () => Object.values(cart).reduce((a, b) => a + b, 0);

  const drawer = $("[data-drawer]");
  const cartbar = $("[data-cartbar]");
  const render = () => {
    $("[data-cart-count]").textContent = count();
    cartbar.hidden = !count();
    document.body.classList.toggle("has-cart", count() > 0);
    $("[data-cartbar-count]").textContent = count() === 1 ? "1 pozycja" : count() < 5 ? `${count()} pozycje` : `${count()} pozycji`;
    $("[data-cartbar-total]").textContent = zl(total());
    const lines = Object.entries(cart);
    if (!lines.length) {
      $("[data-cart-body]").innerHTML = `<div class="empty">${icon.bag}<strong>Koszyk jest pusty</strong><span>Dodaj coś z menu. Minimalne zamówienie na dowóz to ${MIN_ORDER} zł.</span><a class="btn btn--ghost" href="#menu" data-close-cart>Przejdź do menu</a></div>`;
      $("[data-cart-foot]").innerHTML = "";
      return;
    }
    $("[data-cart-body]").innerHTML = lines.map(([id, q]) => `
      <div class="line">
        <span class="line__name">${esc(fullName(id))}</span>
        <span class="price">${zl(byId[id].price * q)}</span>
        <span class="qty">
          <button type="button" data-dec="${id}" aria-label="Mniej: ${esc(byId[id].name)}">${icon.minus}</button>
          <span aria-live="polite">${q}</span>
          <button type="button" data-inc="${id}" aria-label="Więcej: ${esc(byId[id].name)}">${icon.plus}</button>
        </span>
      </div>`).join("");
    const t = total();
    const missing = MIN_ORDER - t;
    $("[data-cart-foot]").innerHTML = `
      <div class="total"><span>Razem</span><span>${zl(t)}</span></div>
      <p class="minimum ${missing <= 0 ? "ok" : ""}">${missing > 0 ? `Do minimum na dowóz brakuje ${zl(missing)}` : "Minimum na dowóz osiągnięte"}</p>
      <a class="btn btn--primary" href="${ORDER_URL}" target="_blank" rel="noopener">Zamów online</a>
      <button class="btn btn--ghost" type="button" data-copy>Kopiuj listę i zadzwoń</button>
      <p class="drawer__note">Zamówienie składasz w systemie lokalu albo telefonicznie pod 506 776 342.</p>`;
  };

  let lastFocus;
  const openCart = () => {
    lastFocus = document.activeElement;
    drawer.hidden = false;
    requestAnimationFrame(() => drawer.classList.add("is-open"));
    document.body.style.overflow = "hidden";
    $(".icon-btn", drawer).focus();
  };
  const closeCart = () => {
    drawer.classList.remove("is-open");
    document.body.style.overflow = "";
    setTimeout(() => { drawer.hidden = true; }, 420);
    lastFocus?.focus();
  };

  let toastT;
  const toast = (msg) => {
    const el = $("[data-toast]");
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(toastT);
    toastT = setTimeout(() => el.classList.remove("show"), 2200);
  };

  document.addEventListener("click", async (e) => {
    const t = e.target.closest("button, a");
    if (!t) return;
    if (t.dataset.add) {
      cart[t.dataset.add] = (cart[t.dataset.add] || 0) + 1;
      save(); render();
      t.classList.remove("done"); void t.offsetWidth; t.classList.add("done");
      for (const b of $$(".cart-btn, .cartbar")) { b.classList.remove("bump"); void b.offsetWidth; b.classList.add("bump"); }
      toast(`Dodano: ${fullName(t.dataset.add)}`);
    } else if (t.dataset.inc) {
      cart[t.dataset.inc]++; save(); render();
    } else if (t.dataset.dec) {
      if (--cart[t.dataset.dec] <= 0) delete cart[t.dataset.dec];
      save(); render();
    } else if (t.hasAttribute("data-open-cart")) {
      openCart();
    } else if (t.hasAttribute("data-close-cart")) {
      closeCart();
    } else if (t.hasAttribute("data-copy")) {
      const text = Object.entries(cart).map(([id, q]) => `${q} x ${fullName(id)}`).join("\n") + `\nRazem: ${zl(total())}`;
      try { await navigator.clipboard.writeText(text); toast("Lista skopiowana"); } catch { toast("Nie udało się skopiować"); }
      setTimeout(() => { location.href = "tel:+48506776342"; }, 600);
    }
  });
  $(".drawer__scrim").addEventListener("click", closeCart);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !drawer.hidden) closeCart(); });

  render();
})();
