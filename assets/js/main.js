function toggleNavbar() {
    const navbar = document.querySelector('nav ul');
    navbar.classList.toggle('active');
}

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

window.addEventListener('scroll', function () {
    const navbar = document.querySelector('nav');
    if (window.scrollY > 50) {
        navbar.classList.add('transparent');
    } else {
        navbar.classList.remove('transparent');
    }
});
// The Android download button: on an Android phone, the phone's own store chooser (a store intent naming no store,
// so every store app installed can answer), and Google Play's page when nothing answers. Anywhere else the button
// keeps its plain Google Play link.
document.addEventListener('DOMContentLoaded', function () {
    const button = document.getElementById('android-download');
    if (!button || !/android/i.test(navigator.userAgent || ''))
        return;
    const playUrl = button.href;
    button.href = 'intent://details?id=' + button.dataset.package + '#Intent;scheme=market;S.browser_fallback_url=' +
        encodeURIComponent(playUrl) + ';end';
    // An intent opens the chooser over this page; a new tab would be left behind empty.
    button.removeAttribute('target');
    // An app's own browser (Instagram, Telegram…) ignores intent://: when the page kept the focus a moment after the
    // tap, nothing answered, so go to Google Play.
    button.addEventListener('click', function () {
        let left = false;
        function leave() { left = true; }
        window.addEventListener('blur', leave, { once: true });
        window.addEventListener('pagehide', leave, { once: true });
        document.addEventListener('visibilitychange', function () {
            if (document.visibilityState !== 'visible')
                leave();
        }, { once: true });
        setTimeout(function () {
            window.removeEventListener('blur', leave);
            window.removeEventListener('pagehide', leave);
            if (!left && document.visibilityState === 'visible')
                window.location.href = playUrl;
        }, 2000);
    });
});
