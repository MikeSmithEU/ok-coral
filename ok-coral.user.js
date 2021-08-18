// ==UserScript==
// @name         OK Coral
// @namespace    https://mikesmith.eu
// @version      0.2
// @description  Make Coral comments for sbnation OK again!
// @author       MikeSmithEU
// @match        https://*.coral.coralproject.net/*
// @icon         https://www.google.com/s2/favicons?domain=sbnation.com
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    function onKeyPress(evt) {
        var targetTag = evt.target.tagName.toLowerCase();

        // Ignore if in textarea or input
        if (targetTag === 'textarea' || targetTag === 'input' || evt.target.hasAttribute('contenteditable')) {
            return;
        }

        // Enable z-key functionality
        if (evt.key.toLowerCase() == 'z') {
            // load all
            var loadMores = document.getElementsByClassName('coral-loadMoreButton');
            for (var loadMore of loadMores) {
                loadMore.click();
            }

            var nextComment = document.getElementsByClassName('coral-comment-notSeen');
            if (nextComment.length !== 0) {
                nextComment = nextComment[0];
            } else {
                nextComment = undefined;
            }

            if (nextComment !== undefined) {
                nextComment.classList.remove('coral-comment-notSeen');
                nextComment.scrollIntoView();
                nextComment.style.transition = 'background-color 8s';
                nextComment.style.backgroundColor = 'inherit';
            }

        }
    }
    document.addEventListener('keypress', onKeyPress, true);
})();
