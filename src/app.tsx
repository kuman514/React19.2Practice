import { Activity, useState } from 'react';
import TextInput from './components/text-input';

export default function App() {
  const [isFirstShow, setIsFirstShow] = useState<boolean>(false);
  const [isSecondShow, setIsSecondShow] = useState<boolean>(false);

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
          <label htmlFor="first">Activity 렌더링 띄우기</label>
        </p>
        {renderSecondTextInput}
      </div>
    </main>
  );
}
