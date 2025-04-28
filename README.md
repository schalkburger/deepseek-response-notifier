# DeepSeek Response Complete Notifier

A UserScript that plays an audible notification when DeepSeek finishes generating a response

## Installation

1. Install a UserScript manager:

   - [Violentmonkey](https://violentmonkey.github.io/) (recommended)
   - [Greasemonkey](https://www.greasespot.net/) (Firefox)
   - [Tampermonkey](https://www.tampermonkey.net/)

2. **[Click to install the script](https://github.com/schalkburger/deepseek-response-notifier/raw/refs/heads/main/deepseekalert.user.js)**
   _(or copy/paste the script manually)_

   ```
   https://github.com/schalkburger/deepseek-response-notifier/raw/refs/heads/main/deepseekalert.user.js
   ```

## Customization

Change the notification sound by editing the `AUDIO_SOURCES` array:

```js
const AUDIO_SOURCES = [
  "https://files.catbox.moe/ir4nn5.ogg", // Default sound
  "https://example.com/your-custom-sound.mp3" // Add your own
];
```

_Supports OGG/MP3/WAV URLs. First working source will be used._
