// ==UserScript==
// @name         OK Coral
// @namespace    https://mikesmith.eu
// @version      0.3
// @description  Make Coral comments OK again!
// @author       MikeSmithEU
// @match        https://*.coral.coralproject.net/*
// @icon         https://www.google.com/s2/favicons?domain=sbnation.com
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    // load all comments
    function loadAll() {
        document.querySelectorAll('.coral-loadMoreButton').forEach(function(el) {
            el.click();
        });

        document.querySelectorAll('.coral-replyList-showAllButton').forEach(function(el) {
            el.click();
        });
    }

    function markRead() {
        document.querySelectorAll('.coral-comment-notSeen').forEach(function(comment) {
            comment.classList.remove('coral-comment-notSeen');
            comment.style.backgroundColor = 'inherit';
        });
    }

    function onKeyPress(evt) {
        const targetTag = evt.target.tagName.toLowerCase();

        // Ignore if in textarea or input
        if (targetTag === 'textarea' || targetTag === 'input' || evt.target.hasAttribute('contenteditable')) {
            return;
        }

        // Enable z-key functionality
        if (evt.key.toLowerCase() == 'z') {
            loadAll();

            const nextComment = document.querySelector('.coral-comment-notSeen');

            if (nextComment) {
                nextComment.classList.remove('coral-comment-notSeen');
                nextComment.scrollIntoView();
                nextComment.style.transition = 'background-color 8s';
                nextComment.style.backgroundColor = 'inherit';
            }
        }

        // Enable A-key functionality
        if (evt.shiftKey && evt.key.toLowerCase() == 'a') {
            loadAll();
            markRead();
            setTimeout(function() { markRead(); }, 2000);
        }
    }
    document.addEventListener('keypress', onKeyPress, true);
})();
