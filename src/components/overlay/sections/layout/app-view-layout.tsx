import { FC, ReactNode } from 'react';
import { useAppStyle } from "@/styles/app.styles";
import ViewStore from "@/stores/view-store";

interface AppViewLayoutProps {
  children: ReactNode;
}

const AppViewLayout: FC<AppViewLayoutProps> = ({ children }) => {
  const { overlayStyle, getMinAppWidth, getAppNavHeight } = useAppStyle();
  const overlay = overlayStyle({ isShowMenu: ViewStore.isMenuVisible() });
  const minAppWidth = getMinAppWidth();
  const appContentHeight = Number(overlay.height) - getAppNavHeight();

  return (
    <div style={{ width: '100%', height: appContentHeight, display: 'flex', alignItems:'center', justifyContent:'center' }}>
      <div style={{width: `${minAppWidth}px`, height: appContentHeight, background: 'rgb(245,245,245)', overflow: 'auto', padding: '12px 16px'}}>
        {children}
      </div>
    </div>
  );
};

export default AppViewLayout;