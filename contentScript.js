/*
��ȡ���������
�����������������
ʵ����Ӣ���л�
*/

// �������
const inputElement = document.querySelector('input');
let translatedText = '';
const chrome = window.chrome || window.browser;

// ��������ҳ��Ϣ
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // ������յ�������
  if(request.translated){
    // ������
    translatedText = request.translated;
    // ���������
    inputElement.value = translatedText;
  }

  // ������Զ���������
  if(request.autoTranslate){
    // ��������
    isAutoTranslate = request.autoTranslate;
  }
});

// �������������
inputElement.addEventListener('input', () => {
  // ����Զ������
  if(isAutoTranslate){
     // ���ͷ������󵽱���ҳ
     chrome.runtime.sendMessage({
       type: 'translate',
       text: inputElement.value
     });
  }
});

// ��Ӣ���л�
document.addEventListener('keydown', (e) => {
  if(e.code === 'Space' && e.ctrlKey){
     // �л���Ӣ��
     inputElement.value = inputElement.value === translatedText
       ? translatedText : translatedText;
  }
});