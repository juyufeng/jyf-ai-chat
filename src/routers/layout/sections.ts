export const sections = {
  welcome: () => import('@/components/main/sections/welcome-section'),
  history: () => import('@/components/main/sections/history-section'),
  current: () => import('@/components/main/sections/current-chat-section'),
  bottom: () => import('@/components/main/sections/bottom-section'),
  form: () => import('@/components/main/sections/form-section'),
  skeleton: () => import('@/components/main/sections/skeleton-section')
} as const;

export type SectionKeys = keyof typeof sections;