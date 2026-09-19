# STRIKE Discount API

Small backend for the hackathon discount-demo flow. It contains only original, local challenge samples; no STRIKE challenge content, external judge, or evaluator is used.

## Run locally

1. Copy `.env.example` to `.env` and set `MONGODB_URI`. `REDIS_URL` is optional.
2. Install packages with `npm.cmd install` on PowerShell systems that block `npm.ps1`.
3. Seed the active 15–25% demo offer: `npm.cmd run seed:offer`.
4. Run: `npm.cmd run dev`.

All discount routes require authenticated identity. This standalone scaffold uses `x-user-id` as a temporary adapter; replace `src/middleware/auth.js` with the host application's existing authentication middleware during integration. A body `userId` is never accepted.

## Routes

`GET /discount/challenges/:type/random` returns a random local challenge (`solve-ptod`, `write-prompt`, `debug-backend`, or `find-vulnerability`).

`POST /discount/solve-ptod`, `/write-prompt`, `/debug-backend`, and `/find-vulnerability` accept `{ "challengeId": "...", "offerId": "optional Mongo id" }`. Each records a completed demo attempt, returns an `under_construction` evaluation, and calls the shared reward service.

`POST /discount/skip` accepts an optional `offerId` and issues the offer's `minDiscount` as `DISCOUNT{minDiscount}`.

`GET /discount/status?offerId=...`, `POST /discount/validate`, and `POST /discount/claim` provide reward lookup, server-side coupon validation, and claim-state foundation. Validation accepts only `couponCode` and optional `offerId`; the stored `unlockedDiscount` is authoritative.

Example:

```powershell
$headers = @{ 'x-user-id' = 'demo-user-1'; 'Content-Type' = 'application/json' }
Invoke-RestMethod http://localhost:3000/discount/challenges/solve-ptod/random -Headers $headers
Invoke-RestMethod http://localhost:3000/discount/solve-ptod -Method POST -Headers $headers -Body '{"challengeId":"1"}'
```

Successful submission response includes:

```json
{
  "success": true,
  "evaluation": { "status": "under_construction", "message": "This feature is under construction; the demo challenge is marked completed." },
  "reward": { "discountPercent": 22, "couponCode": "REDIS22", "offerId": "...", "expiresAt": "..." }
}
```

## Data and safety

MongoDB is the source of truth. `UserOffer` has a unique `{ userId, offerId }` index, so simultaneous requests converge on one persisted reward. Redis uses `discount:reward:{userId}:{offerId}` and a TTL equal to the remaining time until `Offer.expiresAt`; cache eviction never deletes MongoDB data or creates a new random reward.

The seeded offer is configuration only: its `minDiscount` and `maxDiscount` can be changed without touching reward logic. Actual evaluation, checkout redemption, and marking coupons `used` are intentionally future work.
