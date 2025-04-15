import { vi } from 'vitest';

// 模拟 ChatStore
export const mockChatStore = {
  activeChatSessionId: 'test-session-id',
  showWelcome: true,
  showSkeleton: false,
  isCreating: false,
  localMessages: [],
  newMessages: [],
  senderContent: '',
  
  setShowWelcome: vi.fn(),
  setIsShowSkeleton: vi.fn(),
  setIsCreating: vi.fn(),
  setSenderContent: vi.fn(),
  clearLoaclAndNewMessages: vi.fn(),
  toStopHandler: vi.fn(),
};

// 模拟 ReqStore
export const mockReqStore = {
  chatting: false,
  abortController: null,
  
  setChatting: vi.fn(),
  setOnRequestError: vi.fn(),
  abortCurrentRequest: vi.fn(),
  createAbortController: vi.fn(),
  get currentAbortController() { return null; },
};

// 模拟 ViewStore
export const mockSectionStore = {
  messagesEndRef: { current: null },
  messageRefscrollToBottom: vi.fn(),
  setShowForm: vi.fn(),
};