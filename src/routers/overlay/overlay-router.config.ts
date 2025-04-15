import { lazy } from 'react';
import i18next from 'i18next';
import { OverlayPageBase } from '@/types/overlay.definitions';

const Setting = lazy(() => import('@/components/overlay/sections/seciton-pages/setting'));
const Profile = lazy(() => import('@/components/overlay/sections/seciton-pages/setting/pages/profile'));
const Voice = lazy(() => import('@/components/overlay/sections/seciton-pages/setting/pages/voice'));
const Help = lazy(() => import('@/components/overlay/sections/seciton-pages/setting/pages/help'));
const Task = lazy(() => import('@/components/overlay/sections/seciton-pages/setting/pages/task'));
const Share = lazy(() => import('@/components/overlay/sections/seciton-pages/setting/pages/share'));
const Blacklist = lazy(() => import('@/components/overlay/sections/seciton-pages/setting/pages/blacklist'));
const About = lazy(() => import('@/components/overlay/sections/seciton-pages/setting/pages/about'));
const Model = lazy(() => import('@/components/overlay/sections/seciton-pages/setting/pages/model'));
const Account = lazy(() => import('@/components/overlay/sections/seciton-pages/setting/pages/account'));

const HowToUse = lazy(() => import('@/components/overlay/sections/seciton-pages/setting/sub-pages/help/how-to-use'));
const FAQ = lazy(() => import('@/components/overlay/sections/seciton-pages/setting/sub-pages/help/faq'));
const Terms = lazy(() => import('@/components/overlay/sections/seciton-pages/setting/sub-pages/help/terms'));
const Privacy = lazy(() => import('@/components/overlay/sections/seciton-pages/setting/sub-pages/help/privacy'));
const Trends = lazy(() => import('@/components/overlay/sections/seciton-pages/trends'));
const Future = lazy(() => import('@/components/overlay/sections/seciton-pages/trends/pages/future'));
const Current = lazy(() => import('@/components/overlay/sections/seciton-pages/trends/pages/current'));

export const overlayPages: OverlayPageBase[] = [
  {
    key: 'settings',
    title: i18next.t('overlay.settings.title'),
    component: Setting,
    children: [
      {
        key: 'profile',
        title: i18next.t('overlay.settings.profile'),
        component: Profile,
        icon: 'avatar',
        description: '豆包号:juyufeng'
      },
      {
        key: 'voice',
        title: i18next.t('overlay.settings.voice'),
        component: Voice,
        icon: '声',
        iconBg: '#8a56e2',
        extra: '温柔桃子'
      },
      {
        key: 'help',
        title: i18next.t('overlay.settings.help'),
        component: Help,
        icon: '帮',
        iconBg: '#4e7bef',
        children: [
          {
            key: 'how-to-use',
            title: '如何使用豆包AI？',
            component: HowToUse
          },
          {
            key: 'faq',
            title: '常见问题解答',
            component: FAQ
          },
          {
            key: 'terms',
            title: '使用条款',
            component: Terms
          },
          {
            key: 'privacy',
            title: '隐私政策',
            component: Privacy
          }
        ]
      },
      {
        key: 'task',
        title: i18next.t('overlay.settings.task'),
        component: Task,
        icon: '新',
        iconBg: '#3b7aff',
        hasSwitch: true
      },
      {
        key: 'share',
        title: i18next.t('overlay.settings.share'),
        component: Share,
        icon: '分',
        iconBg: '#ff5a5a'
      },
      {
        key: 'blacklist',
        title: i18next.t('overlay.settings.blacklist'),
        component: Blacklist,
        icon: '黑',
        iconBg: '#999'
      },
      {
        key: 'about',
        title: i18next.t('overlay.settings.about'),
        component: About,
        icon: '关',
        iconBg: '#3b7aff'
      },
      {
        key: 'model',
        title: i18next.t('overlay.settings.model'),
        component: Model,
        icon: '模',
        iconBg: '#3b7aff'
      },
      {
        key: 'account',
        title: i18next.t('overlay.settings.account'),
        component: Account,
        icon: '账',
        iconBg: '#8a56e2'
      },
      {
        key: 'logout',
        title: i18next.t('overlay.settings.logout'),
        icon: '退',
        iconBg: '#ff9500',
        onClick: () => {
          // 处理退出登录逻辑
          console.log('退出登录');
        }
      }
    ]
  },
  {
    key: 'trends',
    title: '产品动态',
    component: Trends,
    children: [
      {
        key: 'future',
        title: '未来趋势',
        component: Future,
        icon: '趋',
        iconBg: '#4e7bef',
        description: '了解豆包AI的发展方向'
      },
      {
        key: 'current',
        title: '当前更新',
        component: Current,
        icon: '新',
        iconBg: '#4e7bef',
        description: '查看最新功能更新'
      }
    ]
  }
];