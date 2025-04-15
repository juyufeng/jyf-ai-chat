import { describe, it, expect } from 'vitest';
import { formatDateTime, getQueryParams } from '../../../src/utils/common';

describe('通用工具函数测试', () => {
  describe('formatDateTime', () => {
    it('应正确格式化日期时间', () => {
      const date = new Date(2023, 0, 1, 12, 30, 45);
      const formatted = formatDateTime(date);
      expect(formatted).toBe('2023-01-01 12:30:45');
    });
  });

  describe('getQueryParams', () => {
    it('应正确获取查询参数', () => {
      // 模拟 window.location.search
      Object.defineProperty(window, 'location', {
        value: {
          search: '?token=abc123&lang=zh',
        },
        writable: true,
      });

      const token = getQueryParams('token');
      expect(token).toBe('abc123');

      const lang = getQueryParams('lang');
      expect(lang).toBe('zh');

      const allParams = getQueryParams();
      expect(allParams).toEqual({
        token: 'abc123',
        lang: 'zh',
      });
    });
  });
});