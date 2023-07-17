// 默认选项
const defaultOptions = {
  targetLang: 'en',
  autoTranslate: true
};

// 存储用户选项
let userOptions = {};

// 初始化,加载保存的选项
function loadOptions() {
  return new Promise((resolve) => {
    chrome.storage.sync.get(['userOptions'], (result) => {
      userOptions = result.userOptions || defaultOptions;
      resolve();
    });
  });
}

// 保存用户选项
function saveOptions(options, callback) {
  userOptions = options;
  chrome.storage.sync.set({ userOptions }, callback);
}

// 接收消息
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  switch (msg.type) {
    // 保存选项
    case 'saveOptions':
      saveOptions(msg.options, () => {
        sendResponse();
      });
      break;

    // 返回选项
    case 'getOptions':
      sendResponse({ options: userOptions });
      break;
  }

  // 必须返回true，以便异步发送响应
  return true;
});

// 主逻辑
async function main() {
  await loadOptions();

  // 监听tab变化,发送最新的用户选项
  chrome.tabs.onUpdated.addListener(sendUserOptions);

  // 其他定时任务、事件监听等
}

main();

// 发送用户选项到content script
function sendUserOptions() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, {
      type: 'updateOptions',
      options: userOptions
    });
  });
}
