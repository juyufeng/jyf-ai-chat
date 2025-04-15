import { FC, Suspense, lazy, useState, useEffect, useRef } from 'react';
import { observer } from "mobx-react-lite";
import { useAppStyle } from "@/styles/app.styles";
import ChatStore from "@/stores/chat-store";
import { sections } from '@/routers/layout/sections';
import LoadingComponent from '@/components/common/loading/loading';
import ViewStore from "@/stores/view-store";
import { styles } from './main-container.styles';

const WelcomeSection = lazy(sections.welcome);
const HistorySection = lazy(sections.history);
const CurrentChatSection = lazy(sections.current);
const BottomSection = lazy(sections.bottom);
const FormSection = lazy(sections.form);
const SkeletonSection = lazy(sections.skeleton);

interface MainContainerProps {
  onRequest: (message: string) => void;
}

const MainContainer: FC<MainContainerProps> = ({ onRequest }) => {
  const { getContentStyle } = useAppStyle();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkScroll = () => {
      if (containerRef.current) {
        const shouldShow = containerRef.current.scrollHeight > window.innerHeight + 50;
        setShowScrollTop(shouldShow);
      }
    };

    checkScroll();
    const container = containerRef.current;
    container?.addEventListener('scroll', checkScroll);
    window.addEventListener('resize', checkScroll);

    return () => {
      container?.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, []);

  if (ChatStore.showSkeleton) {
    return (
      <div style={getContentStyle({ isShowMenu: ViewStore.isMenuVisible() })}>
        <Suspense fallback={<LoadingComponent />}>
          <SkeletonSection />
        </Suspense>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      style={getContentStyle({ isShowMenu: ViewStore.isMenuVisible() })}
    >
      <Suspense fallback={<LoadingComponent />}>
        <WelcomeSection />
        <HistorySection />
        <CurrentChatSection />
        {showScrollTop && (
          <div 
            style={styles.scrollTopButton}
            onClick={() => containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            top
          </div>
        )}
        <BottomSection onRequest={onRequest} />
        <FormSection onRequest={onRequest} />
      </Suspense>
    </div>
  );
};

export default observer(MainContainer);