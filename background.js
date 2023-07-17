/*
监听页面输入事件
调用翻译API接口
接收翻译结果,将结果插入页面
 */
// background.js

// 导入翻译函数
import {translateText} from './translate.js';

// 定义chrome变量
const chrome = window.chrome || window.browser;

// 监听内容脚本消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

  // 如果是翻译请求
  if(request.type === 'translate'){

    // 获取用户输入内容
    const input = request.text;

    // 检查是否有翻译触发词"/e"
    const hasTrigger = input.endsWith('/e');

    // 如果有触发词
    if(hasTrigger){

      // 切掉触发词获取需要翻译的文本
      const textToTranslate = input.slice(0, -2);

      // 调用翻译函数获得翻译结果
      const translated = translateText(textToTranslate);

      // 返回翻译结果给内容脚本
      sendResponse({translated});
    }
  }
});

// 监听存储值更改
chrome.storage.onChanged.addListener((changes) => {

  // 如果是自动翻译设置更改
  if(changes.autoTranslate){

    // 获取当前活动tab
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {

      // 发送自动翻译设置到内容脚本
      chrome.tabs.sendMessage(tabs[0].id, {
        autoTranslate: changes.autoTranslate.newValue
      });
    });
  }
})