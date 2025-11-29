import { useEffect, useEffectEvent } from 'react';

interface Props {
  theme: string;
  roomId: string;
}

export default function VirtualChat({ theme, roomId }: Props) {
  const handleOnConnect = useEffectEvent(() => {
    alert(`EffectEvent connected! Current theme: ${theme}`);
  });

  useEffect(() => {
    const pseudoConnectionTimeout = setTimeout(() => {
      handleOnConnect();
    }, 1000);

    return () => {
      clearTimeout(pseudoConnectionTimeout);
    };
  }, [roomId]);

  return null;
}
