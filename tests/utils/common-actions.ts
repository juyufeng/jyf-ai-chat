import { Page } from '@playwright/test';

export async function clickButton(page: Page, selector: string) {
  await page.locator(selector).click();
}

export async function fillInput(page: Page, selector: string, text: string) {
  await page.locator(selector).fill(text);
}

export async function waitForElement(page: Page, selector: string, state: 'visible' | 'hidden' = 'visible', timeout: number = 10000) {
  await page.locator(selector).waitFor({ state, timeout });
}

export async function verifyTextExists(page: Page, selector: string, text: string) {
  const locator = page.locator(selector);
  const content = await locator.textContent();
  if (!content?.includes(text)) {
    throw new Error(`Expected text "${text}" not found in element with selector "${selector}"`);
  }
}