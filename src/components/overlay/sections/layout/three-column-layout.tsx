import { FC, ReactNode } from 'react';
import { useAppStyle } from "@/styles/app.styles";
import NavBar from '@/components/common/nav-bar/nav-bar';
import { observer } from 'mobx-react-lite';
import RouterStore from "@/stores/router-store";

interface ThreeColumnLayoutProps {
  width: number;
  height: number;
  leftContent?: ReactNode;
  centerContent?: ReactNode;
  rightContent?: ReactNode;
}

const ThreeColumnLayout: FC<ThreeColumnLayoutProps> = ({
  width,
  height,
  leftContent,
  centerContent,
  rightContent,
}) => {
  const showSideSections = width > 600;
  const leftRightMinWidth = 200;
  const { getMinAppWidth } = useAppStyle();
  const minAppWidth = getMinAppWidth();

  return (
    <div style={{ width, height, background: 'white', display: 'flex', alignItems:'center', justifyContent:'center', overflow: 'hidden' }}>
      <div style={{ 
        width: leftRightMinWidth, 
        height, 
        background: 'white',
        display: showSideSections ? 'block' : 'none' 
      }}>
        {leftContent}
      </div>
      <div style={{ 
        width: showSideSections ? Number(width) - leftRightMinWidth * 2 : width, 
        height, 
        minWidth: minAppWidth 
      }}>
        {!RouterStore.isMobileWithOverlay() && (
          <NavBar />
        )}
        {centerContent}
      </div>
      <div style={{ 
        width: leftRightMinWidth, 
        height, 
        background: 'white',
        display: showSideSections ? 'block' : 'none' 
      }}>
        {rightContent}
      </div>
    </div>
  );
};

export default observer(ThreeColumnLayout);