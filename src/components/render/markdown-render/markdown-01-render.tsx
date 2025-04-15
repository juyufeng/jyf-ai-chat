import React from 'react';
import markdownit from "markdown-it";
import ThinkBlock from '@/components/common/think/think-block';

const md = markdownit({ html: true, breaks: true });

interface ContentType {
  isBack: boolean;
  thoughts_status: number;
  thoughts_result: string;
  result: string;
}

interface MarkdownRenderProps {
  content: ContentType;
  tipStr?: string;
  isLocal?: boolean;
}

const containerStyle = {
  overflowX: 'auto',
} as const;

const tipLoadingStyle = {
  height: "100%"
} as const;

const thinkBlockStyle = {
  margin: '10px 0',
  color: 'gray',
  backgroundColor: 'rgb(246,252,254)',
  fontSize: '13px',
  padding: '8px',
  borderRadius: '5px'
} as const;

const resultStyle = {
  marginTop: 0,
  fontSize: 16,
  color: "#333",
} as const;

const MarkdownRender: React.FC<MarkdownRenderProps> = ({ content, tipStr, isLocal=false }) => {
  return (
    <div style={containerStyle}>
      {!content.isBack && (
        <div style={tipLoadingStyle} className="tip-loading">
          {tipStr}
        </div>
      )}
      {!!content.thoughts_status && (
        <ThinkBlock
          style={thinkBlockStyle}
          text={content.thoughts_result}
          status={ isLocal ? 2 : content.thoughts_status}
        />
      )}
      {content.result?.length > 0 && (
        <div
          style={resultStyle}
          dangerouslySetInnerHTML={{
            __html: md.render(content.result || ""),
          }}
        />
      )}
    </div>
  );
};

export default MarkdownRender;