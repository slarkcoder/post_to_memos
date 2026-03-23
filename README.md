# AI Chat to Memos Sync Script

Google AI Studio：[https://aistudio.google.com](https://aistudio.google.com)
通义千问 (Qianwen)：[https://www.qianwen.com](https://www.qianwen.com)

<img width="1807" height="791" alt="image" src="https://github.com/user-attachments/assets/2e14ca03-9a4a-42ed-8852-1afff740aa0d" />

<img width="1485" height="546" alt="image" src="https://github.com/user-attachments/assets/3ebb302d-bae7-4d62-96d5-e455dee45ba7" />

### 🚀 Introduction
A powerful Tampermonkey script designed to sync AI responses from **Google AI Studio** and **通义千问 (Qianwen)** directly to your self-hosted **Memos**. 

It streamlines the workflow of "Chat -> Save -> Share" into a single click, ensuring your AI-generated insights are never lost.

### ✨ Key Features
- **Dual Mode Sync**:
    - `🚀 Post to Memos (Public)`: Syncs and automatically copies a **public sharing link** to your clipboard.
    - `🔒 Save to Memos (Private)`: Syncs as a private note for your personal library.
- **Smart Formatting**:
    - **Auto-Title**: Extracts the browser tab title as a Markdown `H1` header.
    - **Source Tracking**: Automatically appends the source URL at the bottom.
    - **Auto-Tagging**: Intelligent tags like `#AI #Gemini #Qwen` based on the platform.
- **Extreme Stability**:
    - **Hybrid Capture**: Uses clipboard hijacking with a DOM-scraping fallback for maximum reliability.
    - **Long Text Support**: Optimized for large payloads with a 60s request timeout.
- **Bilingual UI**: Interface automatically adapts to English or Chinese based on browser settings.

### 🛠️ Installation & Setup
1.  **Install Tampermonkey**: Get the extension for [Chrome](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo) or [Firefox](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/).
2.  **Add Script**: Create a new script in Tampermonkey and paste the code from `script.user.js`.
3.  **Configure**: Update the `CONFIG` section at the top:
    ```javascript
    const serverUrl = 'https://your-memos.com'; // Your Memos URL
    const token = 'your_access_token';           // Memos -> Settings -> Access Tokens
    ```

### ⚠️ Server-Side Optimization (For Long Text)
Memos has a default limit of **8192** characters. To sync long AI responses:
1.  **Memos Settings**: Go to `Settings -> Memo` and set `Maximum content length` to `100000`.
2.  **Nginx**: If using a reverse proxy, add `client_max_body_size 10M;` to your config to avoid `413` errors.

---

### 🚀 简介
这是一个强大的油猴（Tampermonkey）脚本，旨在将 **Google AI Studio** 和 **通义千问** 的 AI 回复内容一键同步到你的自部署 **Memos** 笔记系统中。

它将“聊天 -> 保存 -> 分享”的繁琐步骤简化为点击菜单中的一个按钮，是构建个人 AI 知识库的利器。

### ✨ 核心功能
- **双模式同步**：
    - `🚀 发布到 Memos (公开)`：同步后自动将 **公开分享链接** 复制到剪贴板。
    - `🔒 保存到 Memos (私密)`：作为私密笔记存入，仅个人可见。
- **智能格式化**：
    - **自动标题**：抓取浏览器标签页标题作为 Markdown 的 `H1` 一级标题。
    - **来源追溯**：笔记末尾自动附带当前对话的原始 URL。
    - **自动标签**：根据平台自动补全 `#AI #Gemini #千问` 等标签。
- **极致稳定性**：
    - **混合抓取**：优先劫持原生复制逻辑，辅以强力 DOM 抓取兜底，确保 100% 成功率。
    - **长文本优化**：支持超长内容上传，具备 60s 请求超时容错。
- **原生视觉**：深度适配两站 UI，移除冗余图标与间距，按钮外观与原生菜单完美融合。

### 🛠️ 安装与配置
1.  **安装插件**：在浏览器安装 [Tampermonkey](https://www.tampermonkey.net/) 插件。
2.  **新建脚本**：在插件面板新建脚本，将 `script.user.js` 的代码粘贴进去。
3.  **填入配置**：修改脚本顶部的 `CONFIG` 区域：
    ```javascript
    const serverUrl = 'https://你的Memos域名'; 
    const token = '你的访问令牌'; // 在 Memos 设置 -> 设置 -> 访问令牌 中生成
    ```

### ⚠️ 服务器优化建议 (针对长文本)
Memos 默认限制单条长度为 **8192** 字符。若需保存 AI 长回复，请务必：
1.  **修改 Memos 设置**：进入 `设置 -> 备忘录`，将 `内容长度限制（字节）` 修改为 `100000` 或更高。
2.  **修改 Nginx**：若使用 Nginx 反向代理，请在配置中添加 `client_max_body_size 10M;` 以防上传 413 错误。

---

## 📢 Disclaimer / 免责声明
This script is for personal productivity only. Please respect the privacy policies of the AI platforms.
本脚本仅用于个人生产力提升。请确保在使用过程中遵守相关 AI 平台的隐私政策及个人数据安全要求。
