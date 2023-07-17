// Ĭ��ѡ��
const defaultOptions = {
  targetLang: 'en',
  autoTranslate: true
};

// �洢�û�ѡ��
let userOptions = {};

// ��ʼ��,���ر����ѡ��
function loadOptions() {
  return new Promise((resolve) => {
    chrome.storage.sync.get(['userOptions'], (result) => {
      userOptions = result.userOptions || defaultOptions;
      resolve();
    });
  });
}

// �����û�ѡ��
function saveOptions(options, callback) {
  userOptions = options;
  chrome.storage.sync.set({ userOptions }, callback);
}

// ������Ϣ
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  switch (msg.type) {
    // ����ѡ��
    case 'saveOptions':
      saveOptions(msg.options, () => {
        sendResponse();
      });
      break;

    // ����ѡ��
    case 'getOptions':
      sendResponse({ options: userOptions });
      break;
  }

  // ���뷵��true���Ա��첽������Ӧ
  return true;
});

// ���߼�
async function main() {
  await loadOptions();

  // ����tab�仯,�������µ��û�ѡ��
  chrome.tabs.onUpdated.addListener(sendUserOptions);

  // ������ʱ�����¼�������
}

main();

// �����û�ѡ�content script
function sendUserOptions() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, {
      type: 'updateOptions',
      options: userOptions
    });
  });
}
