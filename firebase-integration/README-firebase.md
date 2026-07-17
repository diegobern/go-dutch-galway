# Enabling Firebase (production)

1. Create a Firebase project and enable **Authentication** (Email/Password),
   **Cloud Firestore** and **Storage**.
2. `npm install firebase`.
3. Copy `firebase-integration/firebase.ts` to `src/lib/firebase.ts`.
4. Fill the `NEXT_PUBLIC_FIREBASE_*` values in `.env.local`.
5. Deploy the rules: `firebase deploy --only firestore:rules,storage:rules`
   (files: `firestore.rules`, `storage.rules`).
6. Give a user the admin role (Cloud Function or Admin SDK):
   `admin.auth().setCustomUserClaims(uid, { admin: true })`.
7. Set `NEXT_PUBLIC_DEMO_MODE=false` and `NEXT_PUBLIC_DATA_SOURCE=firebase`.
8. Point the data layer at `repositories.firebase.ts` (same function names).

Recommended Firestore indexes: `products (available ASC, slug ASC)`,
`orders (status ASC, createdAt DESC)`.

Sensitive writes (order creation, price/total validation, status changes,
setting admin claims) should run in **Cloud Functions**, and **App Check**
should be enabled so only your app can call Firebase.
