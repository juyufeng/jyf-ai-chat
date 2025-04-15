import { test, expect, Page } from '@playwright/test';
import { selectors } from '../fixtures/selectors';
import { clickButton, fillInput, waitForElement, verifyTextExists } from '../utils/common-actions';

test.describe('聊天流程端到端测试', () => {
  test('完整聊天流程测试', async ({ page }) => {
    await page.goto('/');
    
    // 创建新对话
    await clickButton(page, selectors.menu.newChatButton);
    
    // 发送消息
    const testMessage = '你好，AI助手';
    await fillInput(page, selectors.chat.chatInput, testMessage);
    await page.keyboard.press('Enter');
    
    // 验证消息发送成功
    await verifyTextExists(page, selectors.chat.messageList, testMessage);
    
    // 等待AI响应
    await waitForElement(page, selectors.chat.aiResponse);
    
    // 结束对话
    await clickButton(page, selectors.chat.endChatButton);
    
    // 验证返回欢迎页
    await waitForElement(page, selectors.chat.welcomeSection);
  });
});