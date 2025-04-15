import { FC, Suspense, lazy, useRef } from 'react';
import { observer } from "mobx-react-lite";
import { useAppStyle } from "@/styles/app.styles";
import ChatStore from "@/stores/chat-store";
import { sections } from '@/routers/layout/sections';
import LoadingComponent from '@/components/common/loading/loading';
import ViewStore from "@/stores/view-store";

const WelcomeSection = lazy(sections.welcome);
const HistorySection = lazy(sections.history);
const CurrentChatSection = lazy(sections.current);
const BottomSection = lazy(sections.bottom);
const FormSection = lazy(sections.form);
const SkeletonSection = lazy(sections.skeleton);

interface MainContainerProps {
  onRequest: (message: string) => void;
}

import ScrollTopSection from './sections/scroll-top-section';

const MainContainer: FC<MainContainerProps> = ({ onRequest }) => {
  const { getContentStyle } = useAppStyle();
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div 
      ref={containerRef}
      style={getContentStyle({ isShowMenu: ViewStore.isMenuVisible() })}
    >
      <Suspense fallback={<LoadingComponent />}>
        <WelcomeSection />
        <HistorySection />
        <CurrentChatSection />
        <ScrollTopSection containerRef={containerRef} />
        <BottomSection onRequest={onRequest} />
        <FormSection onRequest={onRequest} />
      </Suspense>
    </div>
  );
};

export default observer(MainContainer);