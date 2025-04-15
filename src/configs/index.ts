import i18next from 'i18next';

export const baseURL = "api/v1/chat-messages";

// 使用i18next获取翻译文本
export const WebInitTitle = () => i18next.t('app.title');
export const AIName = () => i18next.t('app.name');
export const AITitle = () => i18next.t('app.greeting');
export const AITip = () => i18next.t('app.tip');
export const AISenderPlaceholder = () => i18next.t('app.inputPlaceholder');

export const getAvatar = "https://woda-app-public.oss-cn-shanghai.aliyuncs.com/wodedagong/resource/20250319/763ba18b-fee5-4c78-ae2a-522c14dc5de3.png";
export const userURL =
  "https://woda-app-public.oss-cn-shanghai.aliyuncs.com/wodedagong/resource/20250319/543fe318-71a7-4f35-a138-8e5522bdd240.png";
export const AILogo = "https://woda-app-public.oss-cn-shanghai.aliyuncs.com/wodedagong/resource/20250318/e4125df7-9bf0-47fd-b556-4c2c2a1f380f.png";

// 控制使用哪种Welcome组件：'custom' 使用自定义组件，'antd' 使用 ant-design/x 组件
export const welcomeComponentType: 'custom' | 'antd' = 'antd';
