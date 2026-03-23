// ==UserScript==
// @name         AI Studio & Qianwen Post to Memos
// @namespace    http://tampermonkey.net/
// @version      1.6
// @description  支持内容自动添加浏览器标签标题作为 Markdown H1，支持 Google AI Studio 和通义千问
// @author       You
// @match        https://aistudio.google.com/*
// @match        https://www.qianwen.com/*
// @grant        GM_xmlhttpRequest
// @grant        GM_notification
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

(function() {
    'use strict';

    // Configuration
    const serverUrl = ''; //填写你的 memos 服务器地址
    const token = ''; //填写你的 memos api token

    // 存储当前拦截的模式：null | 'PUBLIC' | 'PRIVATE'
    let interceptMode = null;

    // 获取并清理浏览器标题
    function getCleanTitle() {
        let title = document.title;
        // 移除常见的网站后缀，只保留对话或项目名称
        title = title.replace(" - Google AI Studio", "");
        title = title.replace(" - 通义千问", "");
        title = title.replace(" - Qianwen", "");
        return title.trim() || "Untitled Note";
    }

    // 根据当前 URL 生成标签
    function getTagsByUrl() {
        const currentUrl = window.location.href;
        let tags = ['AI'];
        if (currentUrl.includes('aistudio.google.com')) {
            tags.push('Google', 'Gemini');
        } else if (currentUrl.includes('qianwen.com')) {
            tags.push('千问');
        }
        return '\n\n' + tags.map(tag => '#' + tag).join(' ');
    }

    // 统一发送函数，增加 visibility 参数
    function postToMemos(text, visibility) {
        // 组合内容：标题 (H1) + 正文 + 标签
        const title = getCleanTitle();
        const finalContent = `# ${title}\n\n${text}${getTagsByUrl()}`;

        GM_xmlhttpRequest({
            method: 'POST',
            url: `${serverUrl}/api/v1/memos`,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({
                content: finalContent,
                visibility: visibility
            }),
            onload: function(response) {
                if (response.status === 200) {
                    try {
                        const result = JSON.parse(response.responseText);
                        const memoId = result.name.split('/').pop();
                        const shareUrl = `${serverUrl}/memos/${memoId}`;

                        navigator.clipboard.writeText(shareUrl);

                        GM_notification({
                            title: `Memos (${visibility}): ${title}`,
                            text: 'Success! Share link copied.',
                            image: 'https://cdn-icons-png.flaticon.com/512/4436/4436481.png',
                            timeout: 3000
                        });
                    } catch (e) {
                        console.error('Error parsing Memos API response:', e);
                    }
                } else {
                    GM_notification({
                        title: 'Post to Memos',
                        text: 'Failed to post to Memos.',
                        image: 'https://cdn-icons-png.flaticon.com/512/4436/4436559.png',
                        timeout: 3000
                    });
                }
            }
        });
    }

    // 劫持剪贴板
    const originalWriteText = navigator.clipboard.writeText;
    navigator.clipboard.writeText = async function(text) {
        if (interceptMode) {
            const mode = interceptMode;
            interceptMode = null;
            postToMemos(text, mode);
            return Promise.resolve();
        } else {
            return originalWriteText.call(navigator.clipboard, text);
        }
    };

    document.addEventListener('copy', function(e) {
        if (interceptMode) {
            const text = window.getSelection().toString();
            if (text) {
                e.preventDefault();
                const mode = interceptMode;
                interceptMode = null;
                postToMemos(text, mode);
            }
        }
    });

    // 核心注入函数
    function injectPostToMemosButton() {
        const potentialMenus = document.querySelectorAll('[role="menu"], .ant-dropdown-menu, .ant-popover-inner-content');

        potentialMenus.forEach(menuContainer => {
            if (menuContainer.querySelector('[data-post-to-memos]')) return;

            const allItems = Array.from(menuContainer.querySelectorAll('button, li, [role="menuitem"], div.ant-dropdown-menu-item'));
            const copyButton = allItems.find(button => {
                const text = (button.innerText || '').replace(/\s/g, '');
                return text.includes('复制为Markdown') || text.includes('Copyasmarkdown');
            });

            if (copyButton) {
                const modes = [
                    { id: 'public', label: '🚀 发布到 Memos (公开)', visibility: 'PUBLIC' },
                    { id: 'private', label: '🔒 保存到 Memos (私密)', visibility: 'PRIVATE' }
                ];

                modes.reverse().forEach(mode => {
                    const postButton = copyButton.cloneNode(true);
                    postButton.setAttribute('data-post-to-memos', mode.id);

                    // 1. 删除图标及其包装容器
                    const icon = postButton.querySelector('mat-icon, svg, i, .anticon, [class*="icon"]');
                    if (icon) {
                        const wrapper = icon.closest('span');
                        if (wrapper && wrapper !== postButton && wrapper.innerText.trim() === "") {
                            wrapper.remove();
                        } else {
                            icon.remove();
                        }
                    }

                    // 2. 移除空节点
                    Array.from(postButton.childNodes).forEach(node => {
                        if (node.nodeType === 1 && node.innerText.trim() === "" && !node.querySelector('span')) {
                            node.remove();
                        }
                    });

                    // 3. 更新文本内容
                    const updateText = (node) => {
                        if (node.nodeType === 3 && node.nodeValue.trim().length > 0) {
                            if (node.nodeValue.includes('复制') || node.nodeValue.includes('Copy')) {
                                node.nodeValue = mode.label;
                            }
                        } else {
                            node.childNodes.forEach(updateText);
                        }
                    };
                    updateText(postButton);

                    // 4. 强制对齐
                    const textSpan = postButton.querySelector('span:not(:empty)');
                    if (textSpan) {
                        textSpan.style.marginLeft = '0';
                        textSpan.style.paddingLeft = '0';
                    }
                    postButton.style.paddingLeft = '12px';

                    // 5. 点击事件逻辑
                    postButton.addEventListener('click', function(e) {
                        e.stopPropagation();
                        e.preventDefault();
                        interceptMode = mode.visibility;

                        if (window.location.href.includes('aistudio.google.com')) {
                            let current = copyButton;
                            while (current && current.parentElement) {
                                current = current.parentElement;
                                if (current.classList.contains('response-container') || current.querySelector('.response-content')) {
                                    break;
                                }
                            }
                        }

                        setTimeout(() => {
                            copyButton.click();
                        }, 50);
                    });

                    copyButton.parentNode.insertBefore(postButton, copyButton.nextSibling);
                });
            }
        });
    }

    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes.length > 0) {
                injectPostToMemosButton();
            }
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });
    injectPostToMemosButton();
})();