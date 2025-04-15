import { FC } from 'react';
import ThreeColumnLayout from '@/components/overlay/sections/layout/three-column-layout';
import SettingLeft from '@/components/overlay/sections/seciton-pages/setting/setting-left';
import SettingMiddle from '@/components/overlay/sections/seciton-pages/setting/setting-middle';
import SettingRight from '@/components/overlay/sections/seciton-pages/setting/setting-right';

interface OverlaySectionsProps {
  width: number;
  height: number;
}

const OverlaySections: FC<OverlaySectionsProps> = ({ width, height }) => {
  return (
    <ThreeColumnLayout
      width={width}
      height={height}
      leftContent={<SettingLeft />}
      centerContent={<SettingMiddle />}
      rightContent={<SettingRight />}
    />
  );
};

export default OverlaySections;