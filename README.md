# 🦁 Rich Spirit

**Rich Spirit** is a fun, interactive, and insightful quiz app that helps users discover their **financial animal spirit**. By answering a set of relatable lifestyle and money-behavior questions, users are matched with an animal archetype (Lion, Owl, Fox, etc.) that represents their financial personality — complete with a stylish **postcard reveal** and a shareable spirit card for social media.

---

## ✨ Features

* 🎨 **Onboarding Flow**: Simple, friendly splash + one-tap start.
* ❓ **Dynamic Quiz**: 50 curated questions across multiple money & personality dimensions. Each user answers a random 10 to keep the experience fresh.
* 🧮 **Smart Matching**: Uses weighted scoring + cosine similarity to match users to the closest **animal archetype profile**.
* 🦊 **Animal Archetypes**: Lion, Owl, Squirrel, Fox, Elephant, Eagle, Peacock, Bear, Deer/Antelope, Dolphin — each representing a unique money spirit.
* 💌 **Postcard Reveal**: Users see their assigned spirit on a golden postcard, with a personal message on the back.
* 📤 **Shareability**: Every result is turned into a social card that users can share on X/Twitter, Instagram, TikTok, and Snapchat.
* ⚡ **RevenueCat Integration**: (Planned) In-app monetization for premium features such as deeper personality reports, collectible postcards, and custom archetype blends.
* 🤖 **AI Expansion**: (Future roadmap) Personalized insights and nudges powered by LLMs — tailored recommendations for saving, spending, and wealth growth.

---

## 🧩 How It Works

1. **Onboarding** → Users land on a golden splash screen, tap “Start.”
2. **Handle Input** → (Optional) Users can connect their X handle for a personalized card.
3. **Quiz Flow** → 10 questions presented in Typeform-style swipe interactions.
4. **Scoring** → Each answer contributes to one or more **dimensions**:

   * `risk`
   * `saving`
   * `futureFocus`
   * `planning`
   * `status`
   * `impulsivity`
   * `generosity`
5. **Normalization** → Scores are normalized across dimensions to ensure fairness.
6. **Matching** → Scores are compared against archetype profiles using **cosine similarity**.
7. **Reveal** → Animal postcard (front = animal & name, back = message).
8. **Share** → User can export their postcard as an image and share.

---

## 🐾 Example Archetypes

* **Lion** – Bold, ambitious, thrives on risk and status.
* **Owl** – Wise, cautious, and future-focused planner.
* **Fox** – Clever, adaptive, impulsive but strategic.
* **Elephant** – Patient, saving-oriented, community-minded.
* **Eagle** – Visionary, risk-taker with a sharp eye on the future.
* **Dolphin** – Fun-loving, generous, balances between play and planning.
* **Deer/Antelope** – Graceful, cautious, agile with money choices.
* **Bear** – Protective, steady, and values security.
* **Peacock** – Status-oriented, expressive, enjoys the finer things.
* **Squirrel** – Saver, planner, always storing for the future.

---

## 📐 Formula & Logic

1. Each question → maps to weighted dimensions.
2. User scores → normalized across 0–1.
3. Archetypes → predefined vectors in same 7 dimensions.
4. Match → closest archetype = highest cosine similarity.

See [logic.md](./logic.md) (planned) for full details.

---

## 🚀 Viral Campaign Hook

* 🔮 **“What’s Your Rich Spirit?”** → Simple, sticky messaging.
* 🖼️ Golden Postcards → Designed for TikTok/IG Reels sharing.
* 🐾 User Journey: Onboarding → Quiz → Postcard → Share.
* 📈 Campaign Strategy: #RichSpiritChallenge encouraging users to share and compare with friends.

---

## 🛠️ Tech Stack

* **Frontend**: Next.js / React Native (for mobile), TailwindCSS for design.
* **Backend**: Node.js / Python API for quiz logic + archetype matching.
* **Database**: Supabase / Firebase for storing sessions & responses.
* **Monetization**: RevenueCat for subscriptions and premium unlocks.
* **Design**: Golden gradients, animal illustrations, postcard animations (Lottie/Framer Motion).

---

## 📅 Roadmap

* ✅ Build MVP quiz + postcard sharing.
* ⏳ Add personalization (via X handle, names, etc.).
* ⏳ Integrate RevenueCat for monetization.
* ⏳ Add AI-powered financial insights.
* ⏳ Launch **#RichSpiritChallenge** campaign.

---

## 🤝 Contributing

We welcome feedback and contributions!

* Fork the repo
* Add questions, archetypes, or new postcard templates
* Submit PRs for improvements

---

## 📜 License

MIT License. Free to use, remix, and extend.