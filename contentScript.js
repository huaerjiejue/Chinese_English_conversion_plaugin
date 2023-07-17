/*
获取输入框内容
将翻译结果插入输入框
实现中英文切换
*/

// 定义变量
const inputElement = document.querySelector('input');
let translatedText = '';
const chrome = window.chrome || window.browser;

// 监听背景页消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // 如果接收到翻译结果
  if(request.translated){
    // 保存结果
    translatedText = request.translated;
    // 插入输入框
    inputElement.value = translatedText;
  }

  // 如果是自动翻译设置
  if(request.autoTranslate){
    // 更新设置
    isAutoTranslate = request.autoTranslate;
  }
});

// 监听输入框输入
inputElement.addEventListener('input', () => {
  // 如果自动翻译打开
  if(isAutoTranslate){
     // 发送翻译请求到背景页
     chrome.runtime.sendMessage({
       type: 'translate',
       text: inputElement.value
     });
  }
});

// 中英文切换
document.addEventListener('keydown', (e) => {
  if(e.code === 'Space' && e.ctrlKey){
     // 切换中英文
     inputElement.value = inputElement.value === translatedText
       ? translatedText : translatedText;
  }
});