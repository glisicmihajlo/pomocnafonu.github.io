# Pomoć na fonu — uputstvo za rad na projektu

Statični sajt (HTML + CSS + vanilla JS, bez build koraka), hostovan na GitHub Pages (`CNAME`).
Firebase (Auth, Firestore, Functions u `functions/`) služi za naloge, kupljene kurseve i video mapu.

## Pravilo za dizajn (obavezno)

Za **sav budući rad na dizajnu** u ovom projektu (nove stranice, sekcije, komponente, redizajn,
boje, fontovi, raspored, responzivnost, pristupačnost):

1. Koristi skill **ui-ux-pro-max** (`ui-ux-pro-max:ui-ux-pro-max`) za pravila i proveru:
   kontrast, veličine za dodir, tipografiju, pokret i checklist pre isporuke.
   Njegov `--design-system` za „education” daje svetlu tirkiznu paletu i dečije fontove. To **ne**
   primenjuj, jer brend ostaje kao ispod.
2. Koristi **21st Magic MCP** (`mcp__magic__get_inspiration`, `mcp__magic__search`) da nađeš uzor za
   svaku novu ili zamenjenu sekciju (navbar, hero, kartice, cene, FAQ, forme, footer).
   21st daje React/Tailwind komponente. Ovde se **prevode u čist HTML/CSS** na našim tokenima;
   ne uvodi React, Tailwind ni build alat.
3. Zadrži sav postojeći sadržaj (tekstove, slike, linkove), ID-jeve i klase koje koristi JS, i Firebase logiku.
   Ne briši fajlove bez pitanja.

## Dizajn sistem (dogovoreno)

Jedini izvor istine: **`index_files/tokens.css`**. Učitava se pre svih ostalih CSS fajlova na svakoj stranici.
Nikad ne dodaji novi `:root` blok sa bojama u druge fajlove i ne piši sirove hex vrednosti tamo gde postoji token.

**Stil:** tamna, topla, minimalna tema; ćilibar akcenat; diskretan sjaj i mreža iza hero-a; bez
claymorphism-a i glassmorphism-a. Pokret je suptilan (oko 150–200ms, `--ease`) i uvek poštuje `prefers-reduced-motion`.

**Boje**
| Token | Vrednost | Upotreba |
|---|---|---|
| `--bg` / `--bg-2` | `#0b0a09` / `#12100e` | pozadina stranice / sekcija |
| `--surface` / `--surface-2` | `#1a1714` / `#221e1a` | kartice / hover |
| `--line` / `--line-strong` | bež 9% / 16% | ivice |
| `--text` / `--text-2` / `--text-3` | `#f6f1ea` / `#b9b0a5` / `#9a9087` | tekst; sva tri ≥ 4.5:1 na `--surface-2` |
| `--amber` | `#ffb020` | akcenat, linkovi, fokus |
| `--grad` | `#ffcf23 → #ff8d3a` | primarna dugmad i istaknuto (tekst na njemu: `--on-accent`) |
| `--green` / `--danger` | `#5ee0a0` / `#f07a6a` | besplatno, uspeh / greška |
| `--brand-accent` | `#ffc93c` | reč „fonu” u logotipu |

Plejeri koriste aliase (`--bg-main`, `--primary`, `--text-muted`…) definisane u `tokens.css`.
Stranice materijala imaju boju po predmetu (`--c`) i ona je deo sadržaja.

**Fontovi:** naslovi su **Outfit** (`--font-display`, 600–800), tekst je **Plus Jakarta Sans** (`--font`, 400–700).
Oba se učitavaju iz Google Fonts u `<head>` svake stranice.

**Tipografska skala:** 12 / 14 / 16 / 18 / 20 / 24 / 32 / 44 / 64px (`--fs-xs` … `--fs-4xl`).
Osnovni tekst je 16px. **Nijedan tekst nije manji od 12px** (izuzetak su ikonice i dekorativni mock sa `aria-hidden`).

**Razmaci:** osnova 4px, `--sp-1` … `--sp-9` = 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96.
Sekcije: `--section` (96px desktop, 64px telefon). Za izuzetke koristi klase `.pt-0`, `.pb-0`, `.pt-7`, `.mt-4`,
`.mt-section`; **bez inline `style="padding…"`**.

**Zaobljenja:** `--r-sm` 8 (oznake) · `--r-md` 12 (dugmad, inputi) · `--r-lg` 16 (kartice) · `--r-xl` 24 (veliki blokovi).

**Dugmad:** `.btn-primary` (gradijent, tamni tekst, `--shadow-cta`), `.btn-ghost` (ivica), tekstualni link (`--amber`).
Visina 48px (44px u navigaciji). Hover je pomeraj nagore -2px, pritisak `scale(0.98)`, fokus je ćilibar prsten 2px.

**Pristupačnost i dodir**
- Sve klikabilno je najmanje 44×44px (`--tap`).
- `:focus-visible` uvek vidljiv; meniji se zatvaraju na Escape i kad fokus izađe iz njih (`site.js`).
- `.reveal` animacije važe samo uz klasu `.js` na `<html>` (inline skript u `<head>`), pa je bez JS-a sadržaj vidljiv.
- Ikonice bez teksta imaju `aria-label`; dekorativne imaju `aria-hidden="true"`.

**Responzivnost:** prelomne tačke 1040px (tablet) i 720px (telefon); za plejere 992px i 600px.
Proveri na 375, 768 i 1440px: bez horizontalnog skrola.

## Struktura CSS-a
- `index_files/tokens.css`: tokeni i zajednička pomoćna pravila
- `index_files/home.css`: navigacija, footer, početna, kursevi, kupljeni kursevi
- `index_files/course.css`: stranice predmeta (oikt, mat1, mat2, pp, p1, aros, dms, prijemni)
- `index_files/materijali.css`: stranice materijala
- `index_files/auth.css`: login i register
- `index_files/player.css`: svih 21 `*-player` stranica
- `admin/index.html` i `404.html`: sopstveni `<style>`, ali na istim tokenima

## Lokalna provera
Nema build koraka. Pokreni `py -3 -m http.server 8765` u korenu projekta i otvori `http://127.0.0.1:8765/`
(putanje počinju sa `/`, pa sajt mora da se servira iz korena).
