import { FC } from 'react';
import { Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import { useAppStyle } from "@/styles/app.styles";
import { AILogo, AIName, userURL } from "@/configs/index";
import { useTranslation } from 'react-i18next';
import RouterStore from "@/stores/router-store";
import { observer } from 'mobx-react-lite';
import NavBar from '@/components/common/nav-bar/nav-bar';

const HeaderContent: FC = () => {
  const { t } = useTranslation();
  const { navStyle, navIconStyle, avatarStyle } = useAppStyle();

  const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
    RouterStore.handleHeaderMenuClick(key);
  };

  const items: MenuProps['items'] = [
    {
      key: 'trends',
      label: t('header.menu.trends'),
    },
    {
      key: 'settings',
      label: t('header.menu.settings'),
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      label: t('header.menu.logout'),
      danger: true,
    },
  ];

  // 如果是移动设备且弹层显示，则渲染NavBar
  if (RouterStore.isMobileWithOverlay()) {
    return (<NavBar />);
  }

  return (
    <header 
      role="banner"
      aria-label={t('header.ariaLabel')}
      style={navStyle}
    >
      <div style={navIconStyle}>
        <img
          style={{ marginRight: 10, marginLeft: 10 }}
          width={30}
          height={44}
          draggable={false}
          src={AILogo}
          alt={t('header.logoAlt')}
        />
        <div><h1 style={{ margin: 0, fontSize: 'inherit' }}>{AIName()}</h1></div>
      </div>
      <div style={{ display: 'flex', alignItems:'center' }}>
        <Dropdown menu={{ items, onClick: handleMenuClick }} placement="bottomRight" trigger={['click']}>
          <img
            src={userURL}
            width={36}
            height={36}
            draggable={false}
            style={avatarStyle}
          />
        </Dropdown>
      </div>
    </header>
  );
};

export default observer(HeaderContent);