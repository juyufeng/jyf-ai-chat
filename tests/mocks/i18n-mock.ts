import { vi } from 'vitest';

// 模拟翻译数据
const translations: { [key: string]: string } = {
  'app.title': 'jyf-ai-chat',
  'app.name': 'AI助手',
  'app.greeting': '你好，我是AI助手',
  'app.tip': '有什么可以帮助你的？',
  'app.inputPlaceholder': '请输入问题...',
  'chat.endDialog': '结束对话',
  'prompts.items.memberNeeds': '会员需求',
};

// 创建模拟的i18n对象
export const mockI18n = {
  t: vi.fn((key: string) => translations[key] || key),
  changeLanguage: vi.fn(),
  language: 'zh',
  languages: ['zh', 'en'],
};