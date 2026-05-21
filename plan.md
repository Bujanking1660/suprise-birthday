# 🎀 Surprise Birthday App - Feature Roadmap Plan

We have successfully migrated the application to a gorgeous, cohesive **cute pastel purple / lavender** design that matches premium mobile UI aesthetics. Based on your fantastic ideas and preferences, we have tailored a special feature roadmap for Rasya's application that is **100% offline, free, and does not require any database servers** (powered fully by local memory via `AsyncStorage`).

---

## 🌟 Core App Flow & Features

### 1. 🎂 Before Dashboard: Virtual Birthday Candles (Intro Screen)
* **The Concept:** Before accessing the main dashboard, Rasya is greeted by a dark, aesthetic, atmospheric screen featuring a glowing birthday cake.
* **Interactive UX:**
  * Beautiful lit candles flickering on the screen with a text prompt: *"Tiup lilinnya dong sayang... 🎂"*
  * Tapping the candles triggers a cute puff/smoke animation, turns the flame off, and plays a magical chime/applause sound effect.
  * **The Reward:** Once all candles are successfully blown out, a confetti explosion triggers, rewarding her with **+50 Love Coins** 🪙, followed by a smooth fade-in transition into the main Dashboard!

### 2. 💊 "Time Capsule" Resolution Jar
* **The Concept:** A beautiful, glowing lavender capsule or jar asset placed on the dashboard where Rasya can save her deep thoughts and personal goals for this new year of her life.
* **Interactive UX:**
  * Tapping the capsule opens a custom aesthetic pop-up modal with an elegant input field: *"Apa harapan dan resolusimu di umur yang ke-205 ini, sayang? 💭"*
  * She can type her heart out. Clicking **"Kunci Kapsul 🔒"** securely saves her message locally using `AsyncStorage`.
  * Once locked, the capsule changes its visual state to "Sealed" and cannot be modified, keeping it safe as a digital time capsule.
  * **The Reward:** Completing her annual resolution instantly awards her **+50 Love Coins** 🪙.

### 3. 🎟️ The "Love Coin" & Custom Wallpaper Shop
* **The Concept:** A highly engaging gamified rewards store where Rasya can spend the hard-earned Love Coins she gathered from completing activities inside the application.
* **Interactive UX:**
  * **Earning System:** Coins are gathered fully offline via app interactions:
    * Blowing out the intro candles $ightarrow$ **+50 Coins**
    * Typing her Time Capsule resolution $ightarrow$ **+50 Coins**
    * Scoring 100% on the Birthday Quiz $ightarrow$ **+100 Coins**
  * **The Shopfront:** A beautiful pastel tab displaying exclusive mobile wallpapers custom-made by you (using the 1:1 cute vector illustration we generated or other memories).
  * **Lock/Unlock Visuals:** Wallpapers are initially blurred or locked with a padlock icon 🔒 showing a price tag (e.g., *100 Coins*).
  * **Redemption:** Tapping a wallpaper deduces her coin balance, permanently unlocks the image, and reveals a **"Simpan ke Galeri"** button to download the high-quality wallpaper directly into her Android photo gallery.

### 4. ❤️ Extra Interactive Touches (100% Offline)
* **"Love Meter" Gauge:** A fun widget where tapping *"Seberapa kangen aku hari ini?"* triggers a fast-rolling percentage loader that always stops at a random super-high number (99% to 1000%), showing playful overflow error text: *"Error: Rasa kangennya kebanyakan, HP-mu hampir meledak! 🤯❤️"*.
* **Comfort Letter Box:** A button labeled *"Buka kalau kamu lagi sedih"* that instantly rotates through 10-20 beautiful, pre-coded love letters or sweet motivational quotes written by you.

---

## 🛠️ Step-by-Step Implementation Strategy

To build this cleanly without breaking your current layout, we will implement these features in phases:

### 🚀 Phase 1: Local State & Coin Engine (`AsyncStorage`)
* Set up the local storage schema to keep track of:
  1. `currentCoins` (integer)
  2. `isCandleBlown` (boolean)
  3. `birthdayResolution` (string)
  4. `unlockedWallpapers` (array of strings/IDs)

### 🚀 Phase 2: Building the Components
1. **`CandleScreen.js`**: Create the full-screen interactive intro with stateful toggle for candle images/SVGs and audio triggers.
2. **`TimeCapsuleModal.js`**: Create the text-input overlay with local memory persistence.
3. **`LoveShop.js`**: Build the grid layout for the custom wallpapers with conditional styling (grayscale/blur when locked, full color when unlocked).

### 🚀 Phase 3: Asset Optimization & Build
* Inject your brand new **1:1 cute vector illustration** as the primary app icon.
* Optimize image sizes and assets so the final APK build remains lightweight and downloads quickly.
