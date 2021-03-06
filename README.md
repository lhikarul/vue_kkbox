## development
```
npm install, npm run serve
```
## production
```
npm run build

```
## 介紹

### [作品DEMO](https://lhikarul.github.io/vue_kkbox/#/rank)

![](https://i.imgur.com/4t2Uycw.png)

#### 使用技術: Vue、Vuex、Vue-router

#### 整合第三方API：

1. [KKBOX API](https://docs-en.kkbox.codes/v1.1/reference)

2. [Youtube Data API](https://developers.google.com/youtube/v3/docs/search/list)
3. [YouTube Player API](https://developers.google.com/youtube/iframe_api_reference)

#### 第三方套件：

1. [youtube-iframe](https://www.npmjs.com/package/youtube-iframe): 客製化播放器，如播放、暫停、下一首歌曲。

2. css樣式: 單獨抽離 Bootstrap 4 格線系統，並客製化其模組。

#### 心得

此作品主要為練習 API 的串接及整合，透過 KKBOX API 拿到排行榜的相關歌手及歌曲資訊，再藉由 Youtube Search API 取得對應的 video ID，通過 youtube-iframe 嵌入 video 至網頁。

閱讀 youtube-iframe 的官方文檔，使用提供的 API 方法實作一個迷你播放器，實作過程中遇到 API 配額限制的問題，Youtube Data API 的 Queries per day 的上限是 10,000，配額少的可憐。

其實 KKBOX 有提供 [Widget](https://help.kkbox.com/tw/zh-tw/function/general-others/1605) 使用，但每首歌曲只能夠聽 30 秒，所以就沒有使用 KKBOX 的播放器了。

API 統一使用 axois.create 方法管理，確保 API 的來源都是同一個進入點，避免隨著專案規模的擴大，使 API 變得難以管理。

我現在都傾向於使用 Bootstrap 4 的格線系統實作 RWD，之前有稍微研究一下源碼，並不是很難，間距、比例都能夠透過變數直接更改，也能夠直接添加自己需要的斷點，這使得開發的速度能夠變得更快。

最後使用 https://cors-anywhere.herokuapp.com/ 直接解決跨域的問題，簡單好用~