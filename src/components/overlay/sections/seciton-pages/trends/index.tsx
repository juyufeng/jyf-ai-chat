import { FC } from 'react';
import ThreeColumnLayout from '@/components/overlay/sections/layout/three-column-layout';
import TrendsLeft from '@/components/overlay/sections/seciton-pages/trends/trends-left';
import TrendsMiddle from '@/components/overlay/sections/seciton-pages/trends/trends-middle';
import TrendsRight from '@/components/overlay/sections/seciton-pages/trends/trends-right';

interface OverlaySectionsProps {
  width: number;
  height: number;
}

const OverlaySections: FC<OverlaySectionsProps> = ({ width, height }) => {
  return (
    <ThreeColumnLayout
      width={width}
      height={height}
      leftContent={<TrendsLeft />}
      centerContent={<TrendsMiddle />}
      rightContent={<TrendsRight />}
    />
  );
};

export default OverlaySections;