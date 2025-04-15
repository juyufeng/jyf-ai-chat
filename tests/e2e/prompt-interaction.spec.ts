import { test, expect, Page } from '@playwright/test';
import { selectors } from '../fixtures/selectors';

class PromptPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/');
  }

  async waitForPromptButton() {
    return this.page.locator(selectors.prompt.memberNeedsButton);
  }

  async getButtonStyles(button: any) {
    return button.evaluate((el: HTMLElement) => {
      const styles = window.getComputedStyle(el);
      return {
        width: styles.width,
        height: styles.height,
        border: styles.border,
        backgroundColor: styles.backgroundColor,
        color: styles.color
      };
    });
  }

  async verifyFormVisibility() {
    const form = this.page.locator(selectors.prompt.memberForm);
    await expect(form).toBeVisible();
    return form;
  }
}

test.describe('提示按钮交互测试', () => {
  let promptPage: PromptPage;

  test.beforeEach(async ({ page }) => {
    promptPage = new PromptPage(page);
    await promptPage.goto();
  });

  test('会员需求按钮交互测试', async () => {
    // 等待并获取按钮
    const promptButton = await promptPage.waitForPromptButton();
    await expect(promptButton).toBeVisible();

    // 验证按钮样式
    const styles = await promptPage.getButtonStyles(promptButton);
    expect(styles).toMatchObject({
      width: '97px',
      height: '34px',
      border: '1px solid rgb(24, 177, 111)',
      backgroundColor: 'rgb(255, 255, 255)',
      color: 'rgb(24, 177, 111)'
    });

    // 点击按钮并验证表单
    await promptButton.click();
    await promptPage.verifyFormVisibility();
  });
});