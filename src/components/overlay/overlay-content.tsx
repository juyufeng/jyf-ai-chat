import { FC, Suspense } from 'react';
import { observer } from 'mobx-react-lite';
import { useAppStyle } from "@/styles/app.styles";
import LoadingComponent from '@/components/common/loading/loading';
import ViewStore from '@/stores/view-store';
import RouterStore from '@/stores/router-store';

const OverlayContent: FC = observer(() => {
  const { overlayStyle } = useAppStyle();
  const overlay = overlayStyle({ isShowMenu: ViewStore.isMenuVisible() });
  const { overlayState } = RouterStore;

  if (!overlayState.visible) return null;

  const CurrentComponent = RouterStore.getCurrentComponent();

  if (!CurrentComponent) return null;

  return (
    <div>
      <div style={overlay}>
        <Suspense fallback={<LoadingComponent />}>
          <CurrentComponent />
        </Suspense>
      </div>
    </div>
  );
});

export default OverlayContent;