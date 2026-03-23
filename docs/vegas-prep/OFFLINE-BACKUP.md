# Offline Backup — Vegas Convention Prep

**Purpose:** Ensure demo can proceed even with no internet at the convention venue.

---

## Pre-Event Checklist

### Screenshots to Capture (Full-Page)

Take full-page screenshots of every key page on both **mobile (375px)** and **desktop (1440px)** views:

| Page | URL | Priority |
|------|-----|----------|
| Homepage | `/` | Critical |
| The Osprey | `/services/osprey` | Critical |
| White Nights | `/services/white-nights` | High |
| Relentless | `/services/relentless` | High |
| At-Home Memorial | `/services/at-home` | High |
| About | `/about` | Medium |
| Give-Back | `/give-back` | Medium |
| Contact | `/contact` | Medium |
| Funeral Homes Landing | `/funeral-homes` | Critical |
| Privacy Policy | `/privacy` | Low |

### How to Capture

**Option A: Browser DevTools (Recommended)**
1. Open Chrome → DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Set viewport to 375×812 (mobile) or 1440×900 (desktop)
4. Right-click → "Capture full size screenshot"
5. Save to `docs/vegas-prep/offline-backup/` folder

**Option B: CLI Tool**
```bash
# Using Playwright (if installed)
npx playwright screenshot --full-page --viewport-size=375,812 http://localhost:3000 docs/vegas-prep/offline-backup/homepage-mobile.png
npx playwright screenshot --full-page --viewport-size=1440,900 http://localhost:3000 docs/vegas-prep/offline-backup/homepage-desktop.png
```

**Option C: macOS Screenshots**
```bash
# Quick capture script — run from project root with dev server running
PAGES=("/" "/services/osprey" "/services/white-nights" "/services/relentless" "/services/at-home" "/about" "/give-back" "/contact")
BASE_URL="http://localhost:3000"
OUT_DIR="docs/vegas-prep/offline-backup"

mkdir -p "$OUT_DIR"
for page in "${PAGES[@]}"; do
  slug=$(echo "$page" | tr '/' '-' | sed 's/^-//')
  [ -z "$slug" ] && slug="homepage"
  echo "Capturing $page → $slug.png"
  # Use your preferred screenshot tool here
done
```

### File Naming Convention

```
offline-backup/
├── desktop/
│   ├── homepage.png
│   ├── services-osprey.png
│   ├── services-white-nights.png
│   ├── services-relentless.png
│   ├── services-at-home.png
│   ├── about.png
│   ├── give-back.png
│   ├── contact.png
│   └── funeral-homes.png
└── mobile/
    ├── homepage.png
    ├── services-osprey.png
    ├── services-white-nights.png
    ├── services-relentless.png
    ├── services-at-home.png
    ├── about.png
    ├── give-back.png
    ├── contact.png
    └── funeral-homes.png
```

---

## Offline Demo Strategy

### If Wi-Fi Works
1. Use live site — best experience, interactive
2. Pre-load all tabs before walking the floor
3. Keep phone hotspot as backup

### If Wi-Fi Fails
1. Open screenshots in phone photo gallery
2. Swipe through in the order listed in the 3-min or 10-min demo scripts
3. Say: *"Our site is live at waterandashburials.org — let me walk you through the key pages."*
4. The co-marketing flyer and partnership agreement are printed and don't need internet

### Phone Hotspot Setup
1. Enable hotspot on personal phone before arriving
2. Connect demo device (laptop/tablet) to hotspot
3. Test loading the site over hotspot to verify speeds
4. Hotspot is the **first fallback** before going to screenshots

---

## Additional Backup Materials

### Printed Materials to Bring

| Item | Quantity | Status |
|------|----------|--------|
| Co-marketing flyers | 25 copies | [ ] Printed |
| Partnership agreement summaries | 15 copies | [ ] Printed |
| Business cards | 50+ | [ ] Ordered |
| QR code cards (waterandashburials.org) | 30 | [ ] Printed |

### Digital Backup (on phone)

- [ ] Screenshots saved to phone camera roll
- [ ] Co-marketing flyer PDF saved to Files app
- [ ] Partnership agreement PDF saved to Files app
- [ ] Site URL bookmarked in browser
- [ ] All key pages cached in browser (visit each once while online)

---

## Day-Of Timeline

| Time | Action |
|------|--------|
| Morning | Charge all devices to 100% |
| Morning | Test Wi-Fi at venue |
| Morning | Load all pages in browser tabs |
| Morning | Verify hotspot works as fallback |
| Morning | Stack printed materials at booth/table |
| Before first demo | Do one full 3-min run-through privately |
| Between demos | Check device battery levels |
| End of day | Collect contact info from all interested parties |
| End of day | Send follow-up emails same evening |
