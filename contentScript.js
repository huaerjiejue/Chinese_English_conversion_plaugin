// 引入Google Translate API
const {Translate} = require('@google-cloud/translate').v2;

// 初始化Translate客户端
const translate = new Translate();

// 输入框元素
const input = document.querySelector('#searchInput');

// 翻译触发模式
const TRIGGER = '/en';

// 监听输入变化
input.addEventListener('input', translate);

// 翻译函数
async function translate() {

  // 检测触发条件
  if(!input.value.endsWith(TRIGGER)) {
    return
  }

  // 获取输入内容
  const text = input.value.slice(0, -TRIGGER.length);

  try {
    // 调用Translate API翻译
    const [translation] = await translate.translate(text, 'en');
    const translatedText = translation;

    // 填入翻译结果
    input.value = translatedText + TRIGGER;

  } catch(error) {
    console.error(error);
    input.value = '翻译出错' + TRIGGER;
  }

}