# Lean System Typography & Font Licensing

## Repository Source Architecture
The Lean System production website (`https://www.leansystem.co/`) does not store proprietary font binaries locally in `src/` or `public/`. Instead, it loads three open-source variable font families from Google Fonts CDN (`index.html` and `src/index.css`):

1. **Syne** — Display & Hero Accent (`600`, `700`, `800`)
2. **Plus Jakarta Sans** — Primary Body, Headings, Navigation & UI (`400`, `500`, `600`, `700`)
3. **JetBrains Mono** — Metrics, Badges, Step Counters & Tabular Numbers (`400`, `500`)

## Included Redistributable Font Files (SIL Open Font License 1.1)
All three typefaces are open-source and licensed for free commercial use and redistribution under the **SIL Open Font License, Version 1.1 (OFL-1.1)**, provided each font is distributed alongside its original copyright notice and `OFL.txt` license text.

For offline desktop design (Figma, Adobe Creative Cloud, Sketch, Keynote) and self-hosted web deployments, the official upstream variable TrueType (`.ttf`) font files and their corresponding `OFL.txt` license files are included in their respective folders:

- `Syne/Syne[wght].ttf` + `Syne/OFL.txt`
- `Plus-Jakarta-Sans/PlusJakartaSans[wght].ttf`, `PlusJakartaSans-Italic[wght].ttf` + `Plus-Jakarta-Sans/OFL.txt`
- `JetBrains-Mono/JetBrainsMono[wght].ttf`, `JetBrainsMono-Italic[wght].ttf` + `JetBrains-Mono/OFL.txt`
- `google-fonts-import.css` — Ready-to-use CSS `@import` and utility classes matching `src/index.css`.
