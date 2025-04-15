import React from 'react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, fireEvent, waitFor } from '../utils/test-utils';
import BottomSection from '../../src/components/main/sections/bottom-section';
import { mockChatStore } from '../mocks/store-mocks';

// 模拟存储
vi.mock('../../src/stores/chat-store', () => ({
  default: mockChatStore,
}));

vi.mock('../../src/stores/req-store', () => ({
  default: {
    setChatting: vi.fn(),
  },
}));

vi.mock('../../src/stores/section-store', () => ({
  default: {
    messagesEndRef: { current: null },
    setShowForm: vi.fn(),
    messageRefscrollToBottom: vi.fn(),
  },
}));

class ChatTestHelper {
  private rendered: any;
  private mockOnRequest: any;

  constructor() {
    this.mockOnRequest = vi.fn();
  }

  async render() {
    this.rendered = render(
      <BottomSection onRequest={this.mockOnRequest} />
    );
    return this.rendered;
  }

  async clickPromptButton(buttonText: string) {
    const button = this.rendered.getByText(buttonText);
    fireEvent.click(button);
    return button;
  }

  async waitForWelcomeHidden() {
    await waitFor(() => {
      expect(mockChatStore.setShowWelcome).toHaveBeenCalledWith(false);
    });
  }

  getMockOnRequest() {
    return this.mockOnRequest;
  }
}

describe('聊天流程集成测试', () => {
  let chatHelper: ChatTestHelper;

  beforeEach(() => {
    vi.clearAllMocks();
    chatHelper = new ChatTestHelper();
  });

  it('点击会员需求按钮应正确处理', async () => {
    await chatHelper.render();
    await chatHelper.clickPromptButton('会员需求');
    
    // 验证表单显示
    expect(vi.mocked(mockChatStore.setShowWelcome)).toHaveBeenCalledWith(false);
  });
});