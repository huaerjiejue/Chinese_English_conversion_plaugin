/*
����ҳ�������¼�
���÷���API�ӿ�
���շ�����,���������ҳ��
 */
// background.js

// ���뷭�뺯��
import {translateText} from './translate.js';

// ����chrome����
const chrome = window.chrome || window.browser;

// �������ݽű���Ϣ
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

  // ����Ƿ�������
  if(request.type === 'translate'){

    // ��ȡ�û���������
    const input = request.text;

    // ����Ƿ��з��봥����"/e"
    const hasTrigger = input.endsWith('/e');

    // ����д�����
    if(hasTrigger){

      // �е������ʻ�ȡ��Ҫ������ı�
      const textToTranslate = input.slice(0, -2);

      // ���÷��뺯����÷�����
      const translated = translateText(textToTranslate);

      // ���ط����������ݽű�
      sendResponse({translated});
    }
  }
});

// �����洢ֵ����
chrome.storage.onChanged.addListener((changes) => {

  // ������Զ��������ø���
  if(changes.autoTranslate){

    // ��ȡ��ǰ�tab
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {

      // �����Զ��������õ����ݽű�
      chrome.tabs.sendMessage(tabs[0].id, {
        autoTranslate: changes.autoTranslate.newValue
      });
    });
  }
})