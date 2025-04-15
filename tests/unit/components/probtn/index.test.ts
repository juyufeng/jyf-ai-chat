import { describe, it, expect, beforeEach } from 'vitest';
import { getPromptItems, promptStyles } from '../../../../src/components/common/probtn';
import { mockI18n } from '../../../mocks/i18n-mock';

describe('提示按钮组件单元测试', () => {
  describe('提示项测试', () => {
    it('应返回正确的提示项列表', () => {
      const items = getPromptItems();
      expect(items).toHaveLength(1);
      expect(items[0]).toBe(mockI18n.t('prompts.items.memberNeeds'));
    });
  });

  describe('样式测试', () => {
    it('应具有正确的按钮样式', () => {
      expect(promptStyles.item).toMatchObject({
        width: '97px',
        height: '34px',
        border: '1px solid rgb(24, 177, 111)',
        backgroundColor: 'white',
        fontSize: '14px',
      });
    });

    it('应具有正确的标签样式', () => {
      expect(promptStyles.itemLabel).toMatchObject({
        fontSize: '14px',
        color: 'rgb(24, 177, 111)',
      });
    });
  });
});