# post_to_memos
AI Studio &amp; Qianwen Markdown Post to Memos

<img width="1807" height="791" alt="image" src="https://github.com/user-attachments/assets/2e14ca03-9a4a-42ed-8852-1afff740aa0d" />

<img width="1485" height="546" alt="image" src="https://github.com/user-attachments/assets/3ebb302d-bae7-4d62-96d5-e455dee45ba7" />

# AI Chat to Memos Sync Script

这是一个轻量级的浏览器油猴脚本（UserScript），旨在将 **Google AI Studio** 和 **通义千问 (Qianwen)** 的 AI 回复内容一键同步到你的自部署 **Memos** 笔记系统中。

[English](#features-en) | [中文](#功能特性-zh)

---

<h2 id="features-en">Features</h2>

- **One-Click Sync**: Supports Markdown format, preserving code blocks and formatting.
- **Dual Mode**: 
    - `🚀 Post to Memos (Public)`: Automatically generates and copies a public sharing link.
    - `🔒 Save to Memos (Private)`: Securely archives to your private notes.
- **Smart Title**: Auto-extracts the chat title from the browser tab as an `H1` header.
- **Auto Tagging**: Automatically appends tags like `#AI #Gemini #Qwen` based on the platform.
- **Bilingual Support**: Interface automatically switches between English and Chinese based on browser settings.

<h2 id="features-zh">功能特性</h2>

- **一键同步**：支持标准 Markdown 格式，完美保留代码块与排版。
- **双模式支持**：
    - `🚀 发布到 Memos (公开)`：自动发布并复制公开分享链接。
    - `🔒 保存到 Memos (私密)`：安全加密存入个人私密笔记。
- **智能标题**：自动抓取浏览器标签页标题作为笔记的 `H1` 标题。
- **自动标签**：根据平台自动追加 `#AI #Gemini #千问` 等标签。
- **双语界面**：根据浏览器语言自动切换中/英文界面。

---

## 🛠️ Setup / 安装与配置

1.  **Install Extension**: Install the [Tampermonkey](https://www.tampermonkey.net/) extension for your browser.
2.  **Create Script**: Click "Create a new script" in the Tampermonkey dashboard.
3.  **Paste Code**: Copy the code from `script.user.js` and paste it into the editor.
4.  **Configure**: Edit the `CONFIG` section at the top of the script:
    ```javascript
    // ================= Configuration =================
    const serverUrl = 'https://your-memos-domain.com'; // Your Memos URL
    const token = 'your_access_token_here';           // Your Memos Access Token
    // =================================================
    ```
    *   *Note: Get your Token in Memos: Settings -> Settings -> Access Tokens.*

---

## 🚀 How to Use / 使用方法

1.  **Open AI Chat**: Navigate to [Google AI Studio](https://aistudio.google.com/) or [Qianwen](https://www.qianwen.com/).
2.  **Open Menu**: 
    - In **AI Studio**: Click the "three dots" icon in the top right of a response.
    - In **Qianwen**: Click the "Copy" icon below a response.
3.  **Click Sync**: You will see two new buttons in the dropdown menu:
    - Click **🚀 Post to Memos (Public)**.
    - Click **🔒 Save to Memos (Private)**.
4.  **Get Link**: Wait for the system notification. If you chose "Public", the sharing link is already in your clipboard!

1.  **打开 AI 网站**：访问 [Google AI Studio](https://aistudio.google.com/) 或 [通义千问](https://www.qianwen.com/)。
2.  **展开菜单**：
    - **AI Studio**: 点击回复内容右上角的“三个点”图标。
    - **通义千问**: 点击回复内容下方的“复制”图标。
3.  **点击同步**：在弹出的菜单中选择：
    - **🚀 发布到 Memos (公开)**
    - **🔒 保存到 Memos (私密)**
4.  **获取结果**：等待浏览器右上角弹出成功通知。如果选择“公开”，分享链接已自动存入你的剪贴板。

---

## 📢 Disclaimer

This script is for personal productivity only. Please ensure you comply with the privacy policies of the respective AI platforms and your own data security requirements.

本脚本仅用于个人生产力提升。请确保在使用过程中遵守相关 AI 平台的隐私政策及个人数据安全要求。
