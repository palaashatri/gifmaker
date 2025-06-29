# GifMaker 3.1

A retro-inspired, Windows 3.1-themed web app for converting video clips to GIFs—right in your browser! Powered by React, Vite, and ffmpeg.wasm.

![GifMaker 3.1 Screenshot](./public/screenshot.png)

## Features
- 🎬 Convert your favorite video moments into GIFs
- 🗔 Windows 3.1 look and feel (fonts, colors, borders, mascots)
- 🖼️ Fun mascot and random speech bubble for every session
- 🔊 Plays the Windows 3.1 startup sound when your GIF is ready
- ⚡️ All processing happens in your browser (no uploads)

## Usage
1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Start the dev server:**
   ```bash
   npm run dev
   ```
3. **Open your browser:**
   Go to the address shown in the terminal (usually http://localhost:5173)

4. **Convert a video:**
   - Click the file input and select a video file (MP4 recommended)
   - Click "Convert"
   - Wait for the Windows 3.1 startup sound and your GIF to appear!

## Build for Production
```bash
npm run build
```
The output will be in the `dist/` folder. Deploy to Netlify, Vercel, or any static host.

## Netlify/Static Hosting
To support ffmpeg.wasm, your host must send these headers:
```
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Embedder-Policy: require-corp
```
Netlify users: these are set in `netlify.toml`.

## Credits
- [ffmpeg.wasm](https://github.com/ffmpegwasm/ffmpeg.wasm)
- Windows 3.1 startup sound: public domain
- UI inspired by Windows 3.1

---
Enjoy your GIFs, and long live the 90s!
