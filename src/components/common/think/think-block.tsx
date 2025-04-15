import { useEffect, useRef, useState, memo, useMemo } from 'react'

const useThinkTimer = (thinking: boolean) => {
  const [startTime] = useState(Date.now())
  const [elapsedTime, setElapsedTime] = useState(0)
  const timerRef = useRef<any>(0)

  useEffect(() => {
    timerRef.current = setInterval(() => {
      if (thinking)
        setElapsedTime(Math.floor((Date.now() - startTime) / 100) / 10)
    }, 100)

    return () => {
      if (timerRef.current)
        clearInterval(timerRef.current)
    }
  }, [startTime, thinking])

  return elapsedTime
}

export const ThinkBlock = memo(({ text, status, ...children }: any) => {
  const elapsedTime = useThinkTimer(status == 1)
  const textRef = useRef<HTMLDivElement>(null)

  const summaryText = useMemo(() => {
    return status == 1 
      ? `深度思考中...(${elapsedTime.toFixed(1)}s)` 
      : `已深度思考(${elapsedTime.toFixed(1)}s)`;
  }, [status, elapsedTime]);

  return (
    <div style={{position:'relative', cursor: 'pointer', userSelect: 'none' }}>
      <details {...children} {...(status == 1 && { open: true })}>
        <summary>{summaryText}</summary>
        <div>
          <div ref={textRef}>
            {text}
          </div>
        </div>
      </details>
    </div>
  );
});

ThinkBlock.displayName = 'ThinkBlock';

export default ThinkBlock;
