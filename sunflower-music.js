(function () {
    const SUNFLOWER_URL = "https://www.google.com/goto?url=CAESYwHrOzAV7AReOpK1WmOjShKeFMJcOg_wGRfJ2ifeAv952DKbOEih6l4aKLLOuqn7t-IDpfDuNZ_JG00xbhotGFvvi-bNpjaWGJn8--D2WmoD44s94WTdxY7zAuTODIiVwqCTvQ";
    const FALLBACK_URL = "media/menutrack.ogg";
    const SUNFLOWER_TITLE = "Sunflower";

    function createAudioPlayer(src) {
        const audio = new Audio(src);
        audio.loop = true;
        audio.volume = 0.45;
        audio.preload = "auto";
        return audio;
    }

    const fallbackAudio = createAudioPlayer(FALLBACK_URL);
    const remoteAudio = createAudioPlayer(SUNFLOWER_URL);

    window.sunflowerMusic = fallbackAudio;

    remoteAudio.addEventListener("canplaythrough", function () {
        window.sunflowerMusic = remoteAudio;
        remoteAudio.play().catch(function () {
            console.log(SUNFLOWER_TITLE + " audio is waiting for user interaction.");
        });
    }, { once: true });

    remoteAudio.addEventListener("error", function () {
        window.sunflowerMusic = fallbackAudio;
        fallbackAudio.play().catch(function () {
            console.log(SUNFLOWER_TITLE + " audio is waiting for user interaction.");
        });
    }, { once: true });

    fallbackAudio.addEventListener("error", function () {
        console.warn("Fallback music track could not be loaded.");
    }, { once: true });

    function startSunflowerMusic() {
        const player = window.sunflowerMusic || fallbackAudio;

        if (!player || !player.src) {
            return;
        }

        try {
            if (player.paused) {
                player.play().catch(function () {
                    console.log(SUNFLOWER_TITLE + " audio is waiting for user interaction.");
                });
            }
        } catch (error) {
            console.warn("Unable to start " + SUNFLOWER_TITLE + " audio:", error);
        }
    }

    function setupSunflowerMusic() {
        remoteAudio.load();
        startSunflowerMusic();
    }

    window.addEventListener("pointerdown", startSunflowerMusic, { once: true });
    window.addEventListener("keydown", startSunflowerMusic, { once: true });
    window.addEventListener("focus", startSunflowerMusic);
    window.addEventListener("load", setupSunflowerMusic);

    console.log(SUNFLOWER_TITLE + " music hook ready. Replace the source URL with your hosted Sunflower file if needed.");
})();
