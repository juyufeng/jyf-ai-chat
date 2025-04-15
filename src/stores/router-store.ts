import { observable } from "mobx";
import { overlayPages } from '@/routers/overlay/overlay-router.config';
import { OverlayPageBase, OverlayState } from '@/types/overlay.definitions';

let windowWidth = window.innerWidth;
window.addEventListener('resize', () => {
  windowWidth = window.innerWidth;
});

const $store = observable({
  overlayState: {
    visible: false,
    path: [],
    currentPage: null
  } as OverlayState,

  // 递归查找页面
  findPageByPath(path: string[]): OverlayPageBase | null {
    const findPage = (pages: OverlayPageBase[], depth: number): OverlayPageBase | null => {
      if (depth >= path.length) return null;
      const page = pages.find(p => p.key === path[depth]);
      if (!page) return null;
      if (depth === path.length - 1) return page;
      return page.children ? findPage(page.children, depth + 1) : null;
    };
    return findPage(overlayPages, 0);
  },

  // 打开页面
  openOverlayPage(path: string[]) {
    const page = this.findPageByPath(path);
    if (!page) return;

    this.overlayState.visible = true;
    this.overlayState.path = path;
    this.overlayState.currentPage = page;
  },

  // 返回上一级
  goBack() {
    if (this.overlayState.path.length > 1) {
      this.openOverlayPage(this.overlayState.path.slice(0, -1));
    } else {
      this.closeOverlay();
    }
  },

  // 关闭弹层
  closeOverlay() {
    this.overlayState.visible = false;
    this.overlayState.path = [];
    this.overlayState.currentPage = null;
  },

  // 获取当前标题
  getTitle(): string {
    return this.overlayState.currentPage?.title || '';
  },

  // 获取当前组件
  getCurrentComponent() {
    return this.overlayState.currentPage?.component;
  },

  // 设备相关方法
  isMobile() {
    return windowWidth <= 576;
  },

  isMobileWithOverlay() {
    return this.isMobile() && this.overlayState.visible;
  },

  // 处理菜单点击
  handleHeaderMenuClick(key: string) {
    switch (key) {
      case 'settings':
      case 'trends':
        this.openOverlayPage([key]);
        break;
      case 'logout':
        // 处理退出登录
        break;
    }
  }
});

export default $store;