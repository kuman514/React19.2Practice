import { useEffect } from 'react';

interface Props {
  theme: string;
  roomId: string;
}

export default function LegacyVirtualChat({ theme, roomId }: Props) {
  useEffect(() => {
    const pseudoConnectionTimeout = setTimeout(() => {
      alert(`Legacy connected! Current theme: ${theme}`);
    }, 500);

    return () => {
      clearTimeout(pseudoConnectionTimeout);
    };
  }, [theme, roomId]);

  return null;
}
