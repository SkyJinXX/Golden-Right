// ==UserScript==
// @name         黄金右键
// @description  按住右键→倍速播放, 松开右键→恢复原样, 灵活追剧看视频~ 支持b站、YouTube、优酷...
// @namespace    http://tampermonkey.net/
// @version      0.10
// @author       SkyJin
// @include    https://www.bilibili.com/*
// @include    https://www.youtube.com/*
// @include    https://v.youku.com/v_show/id_*
// @include    https://www.iqiyi.com/*
// @grant        none
// ==/UserScript==

(async function() {
    'use strict';

    let down_count = 0
    const tryPageVideo = () => Array.prototype.find.call(document.getElementsByTagName('video'), e => e.offsetWidth > 9)
    const getPageVideo = () => {
        return new Promise(resolve => {
            const timer = setInterval(() => {
                const page_video = tryPageVideo()
                if (page_video) {
                    clearInterval(timer)
                    resolve(page_video)
                }
            }, 300);
        })
    };
    const page_video = await getPageVideo()
    const faster_rate = 3
    let normal_rate = 1
    const add_time = 7
    const downEvent = e => {
        if (e.keyCode !== 39) return
        e.stopPropagation()

        if (++down_count === 2) {
            normal_rate = page_video.playbackRate
            page_video.playbackRate = faster_rate
            console.log('加速播放中')
        }
    }
    const upEvent = e => {
        if (e.keyCode !== 39) return
        e.stopPropagation()

        if (down_count === 1) {
            page_video.currentTime += add_time
            console.log('前进' + add_time + '秒')
        }

        down_count = 0
        page_video.playbackRate = normal_rate
    }

    document.body.addEventListener('keydown', downEvent, true)
    document.body.parentElement.addEventListener('keyup', upEvent, true)

})();