import { FC, useEffect, useState } from 'react';

interface ScrollTopSectionProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
}

const needShowScrollHeight = 30;

const ScrollTopSection: FC<ScrollTopSectionProps> = ({ containerRef }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      if (containerRef.current) {
        const { scrollHeight, scrollTop } = containerRef.current;
        const shouldShow = scrollHeight > window.innerHeight + needShowScrollHeight && scrollTop > 0;
        setShow(shouldShow);
      }
    };

    const container = containerRef.current;
    container?.addEventListener('scroll', checkScroll);
    window.addEventListener('resize', checkScroll);
    checkScroll();

    return () => {
      container?.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [containerRef]);

  const handleScrollTop = () => {
    containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!show) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        bottom: '160px',
        right: '70px',
        background: 'rgb(24,177,110)',
        cursor: 'pointer',
        userSelect: 'none',
        borderRadius: '50%',
        width: '50px',
        height: '50px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: '0.3',
        color: 'white',
      }}
      onClick={handleScrollTop}
    >
      top
    </div>
  );
};

export default ScrollTopSection;