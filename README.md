# Baseball Online Remake

獨立的 HTML5 棒球遊戲專案，與原本的 Global-Baseball-GM 分開。

## 執行
本專案使用原生 JavaScript ES Modules 與 JSON 資料，不需要安裝套件。請在專案根目錄執行：

```bash
python -m http.server 8000
```

瀏覽器開啟 `http://localhost:8000`。由於球員資料使用 fetch 載入，請勿直接雙擊 index.html。

## 目前實作範圍（依照已勾選項目）
- P1：九局制、好壞球/三振/四壞/出局、壘包與得分、守備與跑壘能力判定、球員能力影響結果。
- P2：CPBL 初始球員 JSON 資料、Yellow/Red/Purple/Black 卡片、至少三名同隊同年度球員啟動 Set Color 加成、先發陣容編輯。
- P3：球團名稱與陣容管理、生涯賽季快速模擬、比賽紀錄與勝率統計、本機存檔/JSON 匯出與讀取。
- P4：本機玩家經理帳號。

## 重要限制
- P4 帳號目前是瀏覽器本機個人檔案，不是雲端認證服務；不要輸入或儲存真實密碼。
- CPBL 球員資料目前是初始示範資料集，能力值為遊戲平衡用，不代表官方球員卡或正式歷史數據。後續可依合法授權資料擴充。
- 本版未實作未勾選的線上對戰、好友排行、球員交換、交易市場、球員養成、天氣、音效等項目。
- 比賽流程為可操作的九局原型，AI 對手半局使用快速模擬；後續仍可擴充完整逐球投打動畫、投手輪值與更細緻的戰術選擇。

## GitHub Pages
Repository Settings → Pages → Build and deployment → Source 選 GitHub Actions。推送到 main 後由 workflow 自動部署。
