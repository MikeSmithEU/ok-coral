// ==UserScript==
// @name         OK Coral
// @namespace    https://mikesmith.eu
// @version      0.7
// @description  Make Coral comments OK again!
// @author       MikeSmithEU
// @match        https://*.coral.coralproject.net/*
// @match        https://*.sbnation.com/embed/*
// @icon         https://www.google.com/s2/favicons?domain=sbnation.com
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    function insertStyle(css) {
        var el = document.createElement("style");
        el.type = "text/css";
        el.innerText = css;
        document.head.appendChild(el);
    }

    function clickAll(qs) {
        document.querySelectorAll(qs).forEach(function(el) {
            el.click();
        });
    }

    // load all comments
    function loadAll() {
        clickAll('.coral-loadAllButton');
        clickAll('.coral-loadMoreButton');
        clickAll('.coral-replyList-showAllButton');
        clickAll('.coral-replyList-showMoreButton');
    }


    function markRead() {
        document.querySelectorAll('.coral-comment-notSeen').forEach(function(comment) {
            comment.classList.remove('coral-comment-notSeen');
            comment.style.backgroundColor = 'inherit';
        });
    }

    function goToNextComment() {
        const nextComment = document.querySelector('.coral-comment-notSeen');

        if (!nextComment) {
            return false;
        }

        nextComment.classList.remove('coral-comment-notSeen');
        nextComment.scrollIntoView();
        nextComment.style.transition = 'background-color 8s';
        nextComment.style.backgroundColor = 'inherit';
        return true;
    }

    function onKeyPress(evt) {
        const targetTag = evt.target.tagName.toLowerCase();

        // Ignore if in textarea or input
        if (targetTag === 'textarea' || targetTag === 'input' || evt.target.hasAttribute('contenteditable')) {
            return;
        }

        // Enable z-key functionality
        if (evt.key.toLowerCase() == 'z') {
            if (!goToNextComment()) {
                loadAll();
            }
        }

        // Enable A-key functionality
        if (evt.shiftKey && evt.key.toLowerCase() == 'a') {
            markRead();
        }
    }

    // When clicking a "in reply to [username]" username, go to the replied to comment
    function onClick(ev) {
        if (!ev.target.classList.contains("coral-comment-inReplyToUsername")) {
            return false;
        }

        var parent = event.target.parentNode;
        while (!parent.id.startsWith('coral-comments-replyList-log--')) {
            parent = parent.parentNode;
            if (parent.tagName.toLowerCase() != 'div') {
                return false;
            }
        }

        const id = 'comment-' + parent.id.slice(30);
        document.getElementById(id).scrollIntoView();
    }

    const userAgent = navigator.userAgent.toLowerCase();
    const isMobile = userAgent.includes('mobi') || userAgent.includes('tablet');

    if (isMobile) {
        var pageY = 0;
        var btnNext = document.createElement('div');
        btnNext.id = 'okCoralNextButton';
        btnNext.innerText = 'Next Unread';
        btnNext.style.cssText = 'position: fixed; z-index: 9999; margin: 2px; padding: 3px; font-size: 0.7em; background-color: white; border: 1px solid black; top: 0; right: 0; cursor: pointer; line-heigth: 1em; font-weight: bold; transition: top 100ms;';
        btnNext.onclick = function () {
            goToNextComment();
        };
        document.body.appendChild(btnNext);
        btnNext = document.getElementById('okCoralNextButton');

        document.addEventListener('mousemove', function(e) { pageY = e.pageY });
        setInterval(function() { btnNext.style.top = (pageY - 10) + 'px'; }, 200);
    }

    setInterval(function() { loadAll(); }, 20000);
    setTimeout(function() { loadAll(); }, 1000);
    document.addEventListener('keypress', onKeyPress, true);
    document.addEventListener('click', onClick, true);
    insertStyle('.coral-comment-inReplyToUsername { cursor: pointer; }');
})();
