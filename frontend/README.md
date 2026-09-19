# Strike — Discount Challenge SPA (Vite + React + Tailwind)

Frontend-only prototype of the Discount Challenge feature, built as a standalone
single-page app. All discount logic is mocked — see `src/api/discountApi.js`.

## Run it locally

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`.

```bash
npm run build && npm run preview
```
builds and serves the production bundle.

## Project structure

```
src/
  api/
    discountApi.js        ← ONLY file to touch when wiring the real backend
  components/
    Navbar.jsx
    DiscountBanner.jsx     ← compact 3D discovery banner (opens the modal)
    Hero.jsx
    FeatureCards.jsx
    FAQ.jsx
    Footer.jsx
    DiscountChallengeModal.jsx  ← state machine: select → loading → run → reveal
    ChallengeCard.jsx
    ChallengeTimer.jsx
    DiscountReveal.jsx
    CouponCard.jsx
  hooks/
    useCountdown.js        ← countdown-from-seconds + countdown-to-timestamp
  App.jsx                  ← wires everything together
  index.css                ← Tailwind directives + the few things Tailwind
                              can't express (3D cube perspective, reduced-motion)
tailwind.config.js          ← all design tokens (colors, fonts, keyframes) live here
```

## Wiring up the real backend

Every discount-related network call goes through `src/api/discountApi.js`.
Replace each function body with a real `fetch()` (or your existing API client)
call to the Express/Redis backend — keep the same argument and return shapes
and no component needs to change:

- `getStatus()` → `GET /api/discount/status`
- `skip()` → `POST /api/discount/coupon` with `{ skip: true }`
- `startChallenge(challengeId)` → `POST /api/discount/task`
- `completeChallenge(taskId, correct)` → `POST /api/discount/verify` then
  `POST /api/discount/coupon` with the returned proof token

The frontend never computes a discount value — every component only ever
displays whatever `discountApi.js` returns.

## Matching your existing Strike theme

All colors/fonts are design tokens in `tailwind.config.js` under `theme.extend`.
If your real Strike site's Tailwind config already has these tokens under
different names, either rename the classes used across `src/components/`, or
simpler: just update the values in this config to match your actual tokens —
no component code needs to change.

## Known limitations (frontend-only prototype)

- Task bank has a single hardcoded example (`discountApi.js`) — real version
  needs multiple tasks from a backend task bank.
- No persistence across a page refresh yet (no `localStorage`/`/status` sync) —
  add this when wiring the real backend's `GET /discount/status`.
- MCQ-style answers only, to avoid typing/case-sensitivity friction on mobile.
