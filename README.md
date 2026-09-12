# Parts Bin website

The GitHub Pages site for [Parts Bin](https://github.com/PrintLab3D-Official/Part-bin), live at **https://printlab3d-official.github.io/**.

Plain HTML, CSS and JavaScript. No build step, nothing to install. Edit a file, upload it, and the site updates in about a minute.

## Pages

| File | What it is |
|---|---|
| `index.html` | Home: hero with the release countdown, stat row, features, style-preset picker, version timeline, socials |
| `features.html` | Every feature, written out, with example cards |
| `download.html` | V4 for Windows with countdown, what's in V4, requirements, short install steps |
| `support.html` | Help centre: report a bug (on Discord, with a copyable template), request a feature, install tutorial, the Windows warning, forgot-your-PIN, FAQ, contact |
| `printlab3d.html` | Content: the PrintLab3D channel with its own header (logo, Videos, Contact), videos, the story, contact |
| `legal.html` | Disclaimer, privacy (what the app does and doesn't send, where data and the API key live), website terms. Linked from the footer only |

Shared bits live in `assets/`:

- `assets/css/site.css`: all styling. Every colour, font and corner radius is a CSS variable so the preset picker can restyle the whole site.
- `assets/js/site.js`: header and footer (injected on every page), menus, the `/` search palette, countdown, preset picker, notify modal.
- `assets/img/`: the Parts Bin logo and the PrintLab3D logo (`printlab3d.png`). Add part photos here.
- The header changes per page: `body data-page="support"` shows "Parts Bin | Support", `data-page="printlab3d"` shows the PrintLab3D header. Both are built in `header()` in `site.js`.

## Common edits

- **Change a link (Discord, YouTube, email, GitHub):** edit the `LINKS` object at the top of `assets/js/site.js`. It's used by the header, footer, notify modal and search palette.
- **Change the release date:** edit the `RELEASE` line near the top of `assets/js/site.js`. It's `Date.UTC(year, month-1, day, hour, minute)`. The current value is 20 Sep 2026 at 00:00 Australian Eastern time (which is 19 Sep 14:00 UTC). When the date passes, every countdown switches itself to "Parts Bin V4 is out" with a link to Download.
- **When V4 ships:** nothing to edit. At the release moment every countdown flips to "Parts Bin V4 is out" and the Download button turns itself into a link to `github.com/PrintLab3D-Official/Part-bin/releases/latest`. All you do is publish a GitHub Release on the Part-bin repo with the installer attached (see HOW TO PUBLISH.md). Optional tidy-up afterwards: the "V4 20 September" label in the timeline on `index.html`.
- **Put real photos on the part cards:** save the photo as `assets/img/capacitor.jpg` (or whatever) and, in the card, replace the whole `<div class="ex">...</div>` block with `<img src="assets/img/capacitor.jpg" alt="100nF capacitor">`. The cards are in `features.html` (capacitor) and `printlab3d.html` (resistor).
- **Add a YouTube video:** copy one of the `.ytc` cards in `printlab3d.html`; thumbnails come from `https://i.ytimg.com/vi/VIDEO_ID/maxresdefault.jpg`.
- **Add a search-palette entry:** add a row to the `INDEX` array in `site.js`.
- **Change the legal or privacy wording:** edit `legal.html`. Every claim on it was checked against the app's code, so if the app starts sending something new (or stops), update the "The only times the app goes online" list. It is linked from the header nav (Legal), the footer, and the "By downloading" line under the Download button on `download.html`.
- **Add or reorder presets:** the `PRESETS` array in `site.js`. Values are copied from the app's `web/css/styles-presets.css`.

`.nojekyll` tells GitHub Pages to serve the files exactly as they are. Keep it.
