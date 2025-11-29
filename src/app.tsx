import { Activity, useState, type MouseEvent } from 'react';

import LegacyVirtualChat from './components/legacy-virtual-chat';
import TextInput from './components/text-input';
import VirtualChat from './components/virtual-chat';

export default function App() {
  const [isFirstShow, setIsFirstShow] = useState<boolean>(false);
  const [isSecondShow, setIsSecondShow] = useState<boolean>(false);
  const [theme, setTheme] = useState<string>('koishi');
  const [roomId, setRoomId] = useState<string>('');

  function handleOnClickThemeRadio(event: MouseEvent<HTMLInputElement>) {
    setTheme(event.currentTarget.value);
  }

  const renderFirstTextInput = isFirstShow ? <TextInput /> : null;
  const renderSecondTextInput = (
    <Activity mode={isSecondShow ? 'visible' : 'hidden'}>
      <TextInput />
    </Activity>
  );

  return (
    <main>
      <div>
        <p>
          <input
            id="first"
            name="first"
            type="checkbox"
            onChange={(event) => {
              setIsFirstShow(event.currentTarget.checked);
            }}
          />
          <label htmlFor="first">전통적인 렌더링 띄우기</label>
        </p>
        {renderFirstTextInput}
      </div>
      <div>
        <p>
          <input
            id="second"
            name="second"
            type="checkbox"
            onChange={(event) => {
              setIsSecondShow(event.currentTarget.checked);
            }}
          />
          <label htmlFor="second">Activity 렌더링 띄우기</label>
        </p>
        {renderSecondTextInput}
      </div>
      <div>
        <p>
          <span>테마 선택</span>
          <span>
            <input
              id="theme-koishi"
              name="theme"
              type="radio"
              value="koishi"
              checked={theme === 'koishi'}
              onClick={handleOnClickThemeRadio}
            />
            <label htmlFor="theme-koishi">코이시 테마</label>
          </span>
          <span>
            <input
              id="theme-hoshino"
              name="theme"
              type="radio"
              value="hoshino"
              checked={theme === 'hoshino'}
              onClick={handleOnClickThemeRadio}
            />
            <label htmlFor="theme-hoshino">호시노 테마</label>
          </span>
        </p>
        <p>
          <label htmlFor="roomId" />
          <input
            id="roomId"
            name="roomId"
            type="text"
            value={roomId}
            onChange={(event) => {
              setRoomId(event.currentTarget.value);
            }}
          />
        </p>
        <LegacyVirtualChat theme={theme} roomId={roomId} />
        <VirtualChat theme={theme} roomId={roomId} />
      </div>
    </main>
  );
}
