import '@/i18n/index';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import GenAi from '@/gen-ai'
import { WebInitTitle } from '@/configs/index'
import { initLoadingHandler } from '@/utils/loading'

// 设置网页标题
document.title = WebInitTitle();

// 创建根元素
const root = createRoot(document.getElementById('root')!)

// 渲染应用
root.render(
  <StrictMode>
    <GenAi />
  </StrictMode>
)

initLoadingHandler();
