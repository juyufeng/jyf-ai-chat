// 测试选择器
export const selectors = {
  // 聊天相关选择器
  chat: {
    container: '[data-testid="chat-container"]',
    welcomeSection: '[data-testid="welcome-section"]',
    historySection: '[data-testid="history-section"]',
    currentSection: '[data-testid="current-section"]',
    bottomSection: '[data-testid="bottom-section"]',
    formSection: '[data-testid="form-section"]',
    skeletonSection: '[data-testid="skeleton-section"]',
    messageList: '[data-testid="message-list"]',
    messageItem: '[data-testid="message-item"]',
    userMessage: '[data-testid="user-message"]',
    aiResponse: '[data-testid="ai-response"]',
    endChatButton: '[data-testid="end-chat-button"]',
    chatInput: '[data-testid="chat-input"]',
    sendButton: '[data-testid="send-button"]',
  },
  
  // 菜单相关选择器
  menu: {
    container: '[data-testid="menu-container"]',
    newChatButton: '[data-testid="new-chat-button"]',
    chatList: '[data-testid="chat-list"]',
    chatItem: '[data-testid="chat-item"]',
    editTitleButton: '[data-testid="edit-title-button"]',
    deleteChatButton: '[data-testid="delete-chat-button"]',
  },
  
  // 提示按钮相关选择器
  prompt: {
    container: '[data-testid="prompt-container"]',
    memberNeedsButton: '[data-testid="member-needs-button"]',
    memberForm: '[data-testid="member-form"]',
  },
  
  // 模态框相关选择器
  modal: {
    editTitleModal: '[data-testid="edit-title-modal"]',
    titleInput: '[data-testid="title-input"]',
    saveButton: '[data-testid="save-button"]',
    cancelButton: '[data-testid="cancel-button"]',
  },
};