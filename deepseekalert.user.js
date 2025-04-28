// ==UserScript==
// @name         DeepSeek Response Complete Notifier
// @namespace    https://github.com/schalkburger/website-enhancements
// @version      1.3.3
// @description  Plays an audible notification when DeepSeek finishes generating a response
// @author       Schalk Burger
// @match        https://chat.deepseek.com/*
// @grant        GM_info
// @grant        GM_notification
// ==/UserScript==

(function () {
  "use strict";

  const VERSION = GM_info.script.version;
  console.log(`[DeepSeek Alert ${VERSION}] Initializing stop button observer...`);

  // Audio configuration
  const AUDIO_SOURCES = ["https://files.catbox.moe/ir4nn5.ogg"];
  const audio = new Audio();
  audio.volume = 0.7;
  let audioReady = false;
  let currentAudioSource = 0;

  // Initialize audio system
  const initAudio = () => {
    if (currentAudioSource >= AUDIO_SOURCES.length) {
      console.error("[Audio] All sources failed");
      return;
    }

    audio.src = AUDIO_SOURCES[currentAudioSource];
    console.log(`[Audio] Trying source ${currentAudioSource}: ${AUDIO_SOURCES[currentAudioSource]}`);

    audio
      .play()
      .then(() => {
        audio.pause();
        audio.currentTime = 0;
        audioReady = true;
        console.log(`[Audio] Ready with source ${currentAudioSource}`);
        GM_notification({
          title: "Sound Ready",
          silent: true,
          text: `Using audio source ${currentAudioSource + 1}/${AUDIO_SOURCES.length}`,
          timeout: 1000,
        });
      })
      .catch((e) => {
        console.error(`[Audio] Source ${currentAudioSource} failed:`, e);
        currentAudioSource++;
        initAudio();
      });
  };

  // Enable on first click
  document.addEventListener(
    "click",
    () => {
      if (!audioReady) initAudio();
    },
    { once: true }
  );

  // Watch for stop button presence
  let wasGenerating = false;
  const observer = new MutationObserver(() => {
    const stopButton = document.querySelector("._480132b");
    const isGenerating = !!stopButton;

    console.log(`[Debug] Stop button: ${isGenerating ? "visible" : "hidden"}`);

    if (wasGenerating && !isGenerating && audioReady) {
      console.log("[Status] Response completed - playing sound");
      audio.currentTime = 0;
      audio.play().catch((e) => {
        console.error("[Audio] Playback failed:", e);
        currentAudioSource++;
        initAudio();
      });
      GM_notification({
        title: "Response completed.",
        text: `DeepSeek has finished responding`,
        silent: true,
        timeout: 3000,
      });
    }

    wasGenerating = isGenerating;
  });

  // Start observing
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["class"],
  });

  console.log("[Debug] Now watching for ._480132b element changes");
  console.log(`[DeepSeek Alert ${VERSION}] Ready - click page to enable sound`);
})();
