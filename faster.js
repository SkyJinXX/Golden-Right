// ==UserScript==
// @name         黄金右键
// @description  按住右键→倍速播放, 松开右键→恢复原样, 灵活追剧看视频~ 支持b站、YouTube、优酷...
// @namespace    http://tampermonkey.net/
// @version      0.2.0
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
    const faster_rate = 3
    let normal_rate = 1
    const add_time = 7
    let page_video

    const tryPageVideo = () => Array.prototype.find.call(document.getElementsByTagName('video'), e => e.offsetWidth > 9)
    const getPageVideo = () => {
        return new Promise(resolve => {
            const timer = setInterval(() => {
                const page_video = tryPageVideo()
                if (page_video) {
                    clearInterval(timer)
                    resolve(page_video)
                }
            }, 500);
        })
    };
    const checkPageVideo = async () => {
        if (page_video.offsetWidth <= 9) {
            page_video = await getPageVideo()
            if (page_video.offsetWidth <= 9) {
                console.error('播放器检查失败，请检查当前页面是否存在html5播放器')
                return false
            }
        }
        return true
    }
    const downEvent = async e => {
        if (e.keyCode !== 39) return
        e.stopPropagation()
        
        if (++down_count === 2 && await checkPageVideo()) {
            normal_rate = page_video.playbackRate
            page_video.playbackRate = faster_rate
            console.log('加速播放中')
        }
    }
    const upEvent = async e => {
        if (e.keyCode !== 39) return
        e.stopPropagation()
        
        if (down_count === 1 && await checkPageVideo()) {
            page_video.currentTime += add_time
            console.log('前进' + add_time + '秒')
        }
        
        down_count = 0
        page_video.playbackRate = normal_rate
    }
    
    page_video = await getPageVideo()
    document.body.addEventListener('keydown', downEvent, true)
    document.body.parentElement.addEventListener('keyup', upEvent, true)

})();