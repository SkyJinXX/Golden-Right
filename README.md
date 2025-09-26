# Golden Right - Flexibly Control Video Playback Rate

**Language**: [English](README.md) | [中文](README_CN.md)

<p align="center">
  <img src="https://img.shields.io/badge/Tampermonkey-Script-blue" alt="Tampermonkey Script">
  <img src="https://img.shields.io/badge/Version-1.1.1-green" alt="Version">
  <img src="https://img.shields.io/badge/License-MIT-yellow" alt="License">
</p>

A powerful userscript that allows you to control HTML5 video playback speed with simple keyboard shortcuts. Press and hold the right arrow key (→) for fast playback, or single-click for quick skip forward.

## ✨ Features

- **🚀 Fast Playback**: Hold the right arrow key (→) to speed up video playback
- **⏭️ Quick Skip**: Single-click the right arrow key to skip forward by specified seconds  
- **⚙️ Configurable Settings**: Easily adjust playback speed and skip duration via Tampermonkey menu
- **🌍 Universal Support**: Works on all websites with HTML5 video players
- **🎯 Smart Detection**: Automatically finds and controls the active video element
- **🔧 No Page Pollution**: Settings interface doesn't interfere with website content

## 🎮 How to Use

### Basic Controls
- **Single-click right arrow (→)**: Skip forward by configured seconds (default: 7s)
- **Hold right arrow (→)**: Fast playback at configured rate (default: 3x speed)
- **Release right arrow**: Return to normal playback speed

### Settings Configuration
1. Click the Tampermonkey extension icon
2. Select "⚙️ Golden Right Settings" from the script menu
3. Adjust your preferences:
   - **Playback Speed Rate**: Set your preferred fast playback speed (1-10x)
   - **Skip Forward Seconds**: Set skip duration for single-click (1-60 seconds)
4. Click "Save Settings" and refresh the page

## 🌐 Supported Websites

This script works on **ALL** websites that use HTML5 video players, including but not limited to:

- **🎬 Video Platforms**: YouTube, Vimeo, Dailymotion
- **📺 Streaming Services**: Netflix, Hulu, Amazon Prime Video
- **🎓 Educational**: Khan Academy, Coursera, edX
- **🇨🇳 Chinese Platforms**: Bilibili, Youku, Tencent Video, iQiyi
- **📱 Social Media**: TikTok, Instagram, Twitter
- And many more!

## 📦 Installation

### Method 1: Greasyfork (Recommended)
1. Install [Tampermonkey](https://tampermonkey.net/) browser extension
2. Visit the [Greasyfork page](https://greasyfork.org/zh-CN/scripts/396467-%E9%BB%84%E9%87%91%E5%8F%B3%E9%94%AE)
3. Click "Install this script"

### Method 2: Manual Installation
1. Install [Tampermonkey](https://tampermonkey.net/)
2. Copy the script content from `faster.js`
3. Create a new userscript in Tampermonkey
4. Paste the content and save

## ⚙️ Configuration Options

| Setting | Default | Range | Description |
|---------|---------|-------|-------------|
| Playback Speed Rate | 3x | 1-10x | Speed multiplier when holding right arrow |
| Skip Forward Seconds | 7s | 1-60s | Seconds to skip when single-clicking right arrow |

## 🛠️ Troubleshooting

### Script Not Working?
- Ensure the video is playing and visible on the page
- Check if the website has custom keyboard shortcuts that conflict
- Try refreshing the page after changing settings

### Conflicts with Website Shortcuts?
- You can exclude specific websites in Tampermonkey settings
- Go to Tampermonkey Dashboard → Scripts → Golden Right → Settings → User excludes

### Special Note for Bilibili Users
Bilibili officially supports long-press speed control. If you experience delays:
1. Go to player settings (bottom-right corner)
2. Select "More Playback Settings"  
3. Change playback strategy to "AVC"
4. Refresh the page

## 🤝 Contributing

We welcome contributions! Feel free to:
- Report bugs and issues
- Suggest new features
- Submit pull requests
- Create optimized versions
- Integrate this script into existing video tool scripts

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

This script was inspired by the "HTML5 Video Player Mini Tools" available at: https://bbs.kafan.cn/thread-2093014-1-1.html

## 📞 Support

If you find this script useful, please consider:
- ⭐ Starring this repository
- 🐛 Reporting any bugs you encounter
- 💡 Suggesting improvements
- 📢 Sharing with others who might find it useful

---

**Made with ❤️ for the video-watching community**