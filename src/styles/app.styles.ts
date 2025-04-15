import { useWindowSize } from '@/hooks/use-window-size';
import { useContainerStyles } from '@/styles/modules/container.styles';
import { useNavStyles } from '@/styles/modules/nav.styles';
import { useContentStyles } from '@/styles/modules/content.styles';
import { useBottomStyles } from '@/styles/modules/bottom.styles';
import { useChatStyles } from '@/styles/modules/chat.styles';
import { useOverlayStyles } from '@/styles/modules/overlay.styles';
import type { StylesReturn, StyleProps } from '@/types/style.definitions';

export const useAppStyle = () => {
  const dimensions = useWindowSize();
  
  return {
    ...useContainerStyles(dimensions),
    ...useNavStyles(dimensions),
    ...useContentStyles(dimensions),
    ...useBottomStyles(dimensions),
    ...useChatStyles(),
    ...useOverlayStyles(dimensions),
  } as StylesReturn;
};

export type { StyleProps, StylesReturn };