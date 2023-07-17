// ����Google Translate API
const {Translate} = require('@google-cloud/translate').v2;

// ��ʼ��Translate�ͻ���
const translate = new Translate();

// �����Ԫ��
const input = document.querySelector('#searchInput');

// ���봥��ģʽ
const TRIGGER = '/en';

// ��������仯
input.addEventListener('input', translate);

// ���뺯��
async function translate() {

  // ��ⴥ������
  if(!input.value.endsWith(TRIGGER)) {
    return
  }

  // ��ȡ��������
  const text = input.value.slice(0, -TRIGGER.length);

  try {
    // ����Translate API����
    const [translation] = await translate.translate(text, 'en');
    const translatedText = translation;

    // ���뷭����
    input.value = translatedText + TRIGGER;

  } catch(error) {
    console.error(error);
    input.value = '�������' + TRIGGER;
  }

}