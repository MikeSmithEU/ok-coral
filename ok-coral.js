// ==UserScript==
// @name         OK Coral
// @namespace    https://mikesmith.eu
// @version      0.1
// @description  Make Coral comments for sbnation OK again!
// @author       MikeSmithEU
// @match        https://*.coral.coralproject.net/*
// @icon         https://www.google.com/s2/favicons?domain=sbnation.com
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    var currentComments = [];

    function onKeyPress(evt) {
        var targetTag = evt.target.tagName.toLowerCase();

        // Ignore if in textarea or input
        if (targetTag === 'textarea' || targetTag === 'input' || evt.target.hasAttribute('contenteditable')) {
            console.log('ignore');
            return;
        }

        // Enable z-key functionality
        if (evt.key.toLowerCase() == 'z') {
            if (currentComments.length === 0) {
                currentComments = Array.prototype.slice.call( document.getElementsByClassName('coral-comment-notSeen') );
            }
            var nextComment = currentComments.shift();
            console.log(nextComment);
            if (nextComment !== undefined) {
                nextComment.classList.remove('coral-comment-notSeen');
                nextComment.scrollIntoView();
                nextComment.style.transition = 'background-color 5s linear inherit';
            }
        }
    }
    document.addEventListener('keypress', onKeyPress, true);
})();
