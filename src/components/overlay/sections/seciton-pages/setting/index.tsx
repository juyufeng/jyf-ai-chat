import { FC } from 'react';
import ThreeColumnLayout from '@/components/overlay/sections/layout/three-column-layout';
import SettingLeft from '@/components/overlay/sections/seciton-pages/setting/setting-left';
import SettingMiddle from '@/components/overlay/sections/seciton-pages/setting/setting-middle';
import SettingRight from '@/components/overlay/sections/seciton-pages/setting/setting-right';
import ViewStore from '@/stores/view-store';
import { useAppStyle } from "@/styles/app.styles";

const OverlaySections: FC = () => {
  const { overlayStyle } = useAppStyle();
  const overlay = overlayStyle({ isShowMenu: ViewStore.isMenuVisible() });

  return (
    <ThreeColumnLayout
      width={Number(overlay.width)}
      height={Number(overlay.height)}
      leftContent={<SettingLeft />}
      centerContent={<SettingMiddle />}
      rightContent={<SettingRight />}
    />
  );
};

export default OverlaySections;