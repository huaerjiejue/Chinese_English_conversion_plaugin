// 获取页面元素
const langSelect = document.getElementById('targetLang');
const autoTranslateCheckbox = document.getElementById('autoTranslate');
const saveBtn = document.getElementById('save');
const saveSuccess = document.getElementById('saveSuccess');
const saveError = document.getElementById('saveError');

// 加载 previously saved options
async function loadOptions() {
  const options = await chrome.storage.sync.get('options');
  langSelect.value = options.lang;
  autoTranslateCheckbox.checked = options.autoTranslate;
}

loadOptions();

// 保存选项
async function saveOptions() {
  const lang = langSelect.value;
  const autoTranslate = autoTranslateCheckbox.checked;
  
  const options = {
    lang,
    autoTranslate
  };
  
  try {
    await chrome.storage.sync.set({options});
    saveSuccess.style.display = 'block';
  } catch(error) {
    console.error(error);
    saveError.style.display = 'block';
  }
}

// 添加保存按钮点击监听
saveBtn.addEventListener('click', saveOptions);