// ==UserScript==
// @name         黄金右键-灵活控制视频倍速-Golden Right-Flexibly control the playback rate of videos
// @description  按住"→"键倍速播放, 松开"→"键恢复原速, 灵活追剧看视频~ 支持所有H5视频的网站(YouTube、腾讯视频、优酷、番剧等); Press and hold the right arrow key (→) to set the video playback rate faster. Release the key to restore the original rate
// @namespace    http://tampermonkey.net/
// @version      1.1.0
// @author       SkyJin
// @include     http://*
// @include     https://*
// @grant        none
// ==/UserScript==

(function () {
    "use strict";

    let down_count = 0;
    const faster_rate = 3;
    let normal_rate = 1;
    const add_time = 7;
    let page_video;

    function makeArray(arr) {
        if (arr.item) {
            var len = arr.length;
            var array = [];
            while (len--) {
                array[len] = arr[len];
            }
            return array;
        }
        return Array.prototype.slice.call(arr);
    }
    const init = () => {
        if (location.origin.indexOf("youtube.com") > -1) {
            document.body.addEventListener("keydown", downEvent_YT, true);
            document.body.parentElement.addEventListener("keyup", upEvent_YT, true);
        } else {
            document.body.addEventListener("keydown", downEvent, true);
            document.body.parentElement.addEventListener("keyup", upEvent, true);
        }
    };
/*
.............########..#######..########......#######..########.##.....##.########.########...######.
.............##.......##.....##.##.....##....##.....##....##....##.....##.##.......##.....##.##....##
.............##.......##.....##.##.....##....##.....##....##....##.....##.##.......##.....##.##......
.............######...##.....##.########.....##.....##....##....#########.######...########...######.
.............##.......##.....##.##...##......##.....##....##....##.....##.##.......##...##.........##
.............##.......##.....##.##....##.....##.....##....##....##.....##.##.......##....##..##....##
.............##........#######..##.....##.....#######.....##....##.....##.########.##.....##..######.
*/
    const getPageVideo = () => {
        console.log("Finding available Video Element...");
        const allVideoElementArray = makeArray(
            document.getElementsByTagName("video")
        ).concat(makeArray(document.getElementsByTagName("bwp-video")));
        console.log(allVideoElementArray);
        const page_video = Array.prototype.find.call(
            allVideoElementArray,
            (e) => {
                if (checkPageVideo(e)) return e;
            }
        );

        if (page_video) {
            console.log("Found the Video Element!");
            return page_video;
        } else {
            console.log("找不到正在播放的Video Element");
        }
    };
    const checkPageVideo = (v) => {
        if (v) {
            return v.offsetWidth > 9 && !v.paused;
        } else {
            return false;
        }
    };
    const relativeEvent = {
        _stopper: (e) => e.stopPropagation(),
        // 目前针对腾讯视频
        shouldPrevent:
            location.origin.indexOf("qq.com") > -1 ||
            location.origin.indexOf("wetv.vip") > -1,
        prevent() {
            document.body.addEventListener("ratechange", this._stopper, true);
            document.body.addEventListener("timeupdate", this._stopper, true);
        },
        allow() {
            document.body.removeEventListener(
                "ratechange",
                this._stopper,
                true
            );
            document.body.removeEventListener(
                "timeupdate",
                this._stopper,
                true
            );
        },
    };
    const downEvent = (e) => {
        if (e.keyCode !== 39) return;
        e.stopPropagation();

        // 计数+1
        down_count++;

        // 长按右键-开始
        if (down_count === 2) {
            if (checkPageVideo(page_video) || (page_video = getPageVideo())) {
                relativeEvent.shouldPrevent && relativeEvent.prevent();
                normal_rate = page_video.playbackRate;
                page_video.playbackRate = faster_rate;
                console.log("加速播放中...");
            }
        }
    };
    const upEvent = (e) => {
        if (e.keyCode !== 39) return;
        e.stopPropagation();

        // 单击右键时
        if (down_count === 1) {
            if (checkPageVideo(page_video) || (page_video = getPageVideo())) {
                page_video.currentTime += add_time;
                console.log("前进" + add_time + "秒");
            }
        }

        // 长按右键-结束
        if (page_video && page_video.playbackRate !== normal_rate) {
            page_video.playbackRate = normal_rate;
            relativeEvent.shouldPrevent && relativeEvent.allow();
        }

        // 计数-重置
        down_count = 0;
    };
/*
    .########..#######..########.....##....##..#######..##.....##.########.##.....##.########..########
    .##.......##.....##.##.....##.....##..##..##.....##.##.....##....##....##.....##.##.....##.##......
    .##.......##.....##.##.....##......####...##.....##.##.....##....##....##.....##.##.....##.##......
    .######...##.....##.########........##....##.....##.##.....##....##....##.....##.########..######..
    .##.......##.....##.##...##.........##....##.....##.##.....##....##....##.....##.##.....##.##......
    .##.......##.....##.##....##........##....##.....##.##.....##....##....##.....##.##.....##.##......
    .##........#######..##.....##.......##.....#######...#######.....##.....#######..########..########
*/
    const getPageVideo_YT = () => {
        console.log("Finding available Video Element...");
        let pv;

        if (document.getElementById("ytd-player") && checkPageVideo_YT(document.getElementById("ytd-player").player_))
            pv = document.getElementById("ytd-player").player_

        if (pv) {
            console.log("Found the Video Element!");
            return pv;
        } else {
            console.log("找不到正在播放的Video Element");
        }
    };
    const checkPageVideo_YT = (v) => {
        if (v) {
            return v.getPlayerState() == 1;
        } else {
            return false;
        }
    };
    const downEvent_YT = (e) => {
        if (e.keyCode !== 39) return;
        e.stopPropagation();

        // 计数+1
        down_count++;

        // 长按右键-开始
        if (down_count === 2) {
            if (checkPageVideo_YT(page_video) || (page_video = getPageVideo_YT())) {
                normal_rate = page_video.getPlaybackRate();
                page_video.setPlaybackRate(faster_rate);
                console.log("加速播放中...");
            }
        }
    };
    const upEvent_YT = (e) => {
        if (e.keyCode !== 39) return;
        e.stopPropagation();

        // 单击右键时
        if (down_count === 1) {
            if (checkPageVideo_YT(page_video) || (page_video = getPageVideo_YT())) {
                page_video.seekToStreamTime(page_video.getCurrentTime() + add_time);
                console.log("前进" + add_time + "秒");
            }
        }

        // 长按右键-结束
        if (page_video && page_video.playbackRate !== normal_rate) {
            page_video.setPlaybackRate(normal_rate);
        }

        // 计数-重置
        down_count = 0;
    };
/*
.............####.##....##.####.########.####....###....########.########
..............##..###...##..##.....##.....##....##.##......##....##......
..............##..####..##..##.....##.....##...##...##.....##....##......
..............##..##.##.##..##.....##.....##..##.....##....##....######..
..............##..##..####..##.....##.....##..#########....##....##......
..............##..##...###..##.....##.....##..##.....##....##....##......
.............####.##....##.####....##....####.##.....##....##....########
*/
    init();
})();
