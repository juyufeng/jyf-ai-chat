import { CSSProperties } from 'react';

export const styles: Record<string, CSSProperties> = {
  container: {
    padding: '10px',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f7f7f8'
  },
  searchInput: {
    marginBottom: '10px',
    borderRadius: '6px',
  },
  newChatButton: {
    marginBottom: '20px',
    backgroundColor: '#10a37f',
    borderColor: '#10a37f'
  },
  chatList: {
    flex: 1,
    overflow: 'auto'
  },
  chatItem: {
    padding: '4px',
    cursor: 'pointer',
    borderRadius: '6px',
    marginBottom: '4px',
    transition: 'all 0.3s'
  },
  moreButton: {
    width: '24px',
    textAlign: 'center'
  },
  chatItemMeta: {
    flex: 1,
    margin: '0 8px'
  },
  chatTitle: {
    fontSize: '14px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    width: '150px'
  },
  chatTime: {
    fontSize: '12px',
    width: '150px'
  }
};

// 动态样式
export const getDynamicStyles = {
  chatItem: (isSelected: number): CSSProperties => ({
    ...styles.chatItem,
    backgroundColor: isSelected === 1 ? 'rgb(138,138,138)' : 'transparent',
    color: isSelected === 1 ? '#fff' : '#000',
  }),
  moreIcon: (isSelected: number): CSSProperties => ({
    color: isSelected === 1 ? '#fff' : '#666',
    fontSize: '16px',
    visibility: isSelected === 1 ? 'visible' : 'hidden'
  }),
  chatTitle: (isSelected: number): CSSProperties => ({
    ...styles.chatTitle,
    color: isSelected === 1 ? '#fff' : '#000',
  }),
  chatTime: (isSelected: number): CSSProperties => ({
    ...styles.chatTime,
    color: isSelected === 1 ? 'rgb(200,200,200)' : '#666',
  })
};