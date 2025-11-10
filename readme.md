# React19.2Practice

React 19.2에서 새로 추가된 기능을 학습하기 위해 만든 레포지토리. 특히 `Activity` 컴포넌트와 `useEffectEvent` 훅을 알아보려고 한다.

## React 19.2에 새로 추가된 내용

- 중점적으로 볼 사항

  - `Activity` 컴포넌트

    - 렌더링되는 컴포넌트의 특정 부분을 조건부로 렌더링하는 부분 컴포넌트의 상태를 파괴하지 않고 해당 렌더링을 숨길/보여줄 수 있는 컴포넌트.
    - 사용하는 이유
      - 보여지는 부분에 대한 성능 저하 없이 숨겨진 부분을 미리 렌더링해둘 수 있다.
      - 백그라운드에서 데이터, 이미지, CSS 등을 로딩하여 내비게이션의 속도를 향상시킨다.
      - 뒤로가기 등등의 탐색 시 입력했던 필드의 상태를 보존한다.
    - 모드 설명
      - `visible`: 자식 컴포넌트를 표시하고, 이펙트를 마운트시키며, 업데이트가 정상적으로 처리되도록 허용시킴.
      - `hidden`: 자식 컴포넌트를 숨기고, 이펙트를 마운트 해제하며, 모든 업데이트를 지연시킴.
    - 예시

      - 기존 코드
        ```typescript
        const [isKoishi, setIsKoishi] = useState<boolean>(false);
        return isKoishi ? <Components...> : null;
        // 렌더링되는 컴포넌트는 숨겨질 때 컴포넌트가 언마운트되어 상태가 파괴된다.
        ```
        - .
      - `Activity`로 감싸진 코드

        ```typescript
        const [isKoishi, setIsKoishi] = useState<boolean>(false);
        return (
          <Activity mode={isKoishi ? 'visible' : 'hidden'}>
            <Components...>
          </Activity>
        );
        // 렌더링되는 컴포넌트는 숨겨질 때에도 상태가 유지된다.

        ```

  - `useEffectEvent` 훅

    - `useEffect`로부터 이벤트를 분리시켜주는 훅.
    - 사용하는 이유
      - 이벤트 핸들러의 불필요한 재실행을 방지해준다.
    - 주의사항
      - 사용자 이벤트가 아닌, `useEffect`로 인해 발생하는 이벤트인 함수에 사용해야 한다.
      - lint 회피 목적으로 사용 금지.
      - `useEffect`의 이벤트를 의존성 배열에 삽입해선 안 된다. 이를 지원하려면, `eslint-plugin-react-hooks@6.1.1` 패키지가 필요하다.
    - 예시

      - 기존 코드

      ```typescript
      function ChatRoom({ roomId, theme }: Props) {
        useEffect(() => {
          const connection = createConnection(SERVER_URL, roomId);
          connection.on('connect', () => {
            toast('Chat connected!', { theme });
          });
          connection.connect();
          return () => {
            connection.disconnect();
          };
        }, [roomId, theme]);
      }
      // 위같은 코드는 ChatRoom의 theme만 바뀌었을 때에도 불필요하게 채팅방의 연결을 끊고 재연결을 시도하는 문제가 있다.
      ```

      - `useEffectEvent` 적용 코드

      ```typescript
      function ChatRoom({ roomId, theme }: Props) {
        const handleOnConnect = useEffectEvent(() => {
          toast('Chat connected!', { theme });
        });

        useEffect(() => {
          const connection = createConnection(SERVER_URL, roomId);
          connection.on('connect', () => {
            handleOnConnect();
          });
          connection.connect();
          return () => {
            connection.disconnect();
          };
        }, [roomId]);
      }
      // 위의 useEffectEvent는 항상 최신 theme 상태를 보기 때문에, useEffect의 의존성 배열에 theme을 넣을 필요가 없게 된다.
      // 이에 따라, theme이 바뀌어도 불필요한 재연결을 시도하지 않으면서도, theme 최신 상태에 맞는 toast를 띄울 수가 있게 된다.
      ```

- 그 외
  - `cacheSignal` (서버 컴포넌트용)
  - 커스텀 성능 트랙
    - Chrome DevTools의 성능 프로필에 새로운 커스텀 트랙 세트를 추가하여, React 앱의 성능에 관한 정보를 추가적으로 제공받을 수 있게 된다.
  - 부분 사전 렌더링 (Partial Prerendering)
  - 서버 사이드 렌더링을 위한 Suspense Boudary 배치
  - Node.js에서 스트리밍 서버 사이드 렌더링을 위한 웹 스트림 지원
  - `eslint-plugin-react-hooks` v6
  - 기본 `useId` 접두사 업데이트
- 자세한 내용 보기
  - https://ko.react.dev/blog/2025/10/01/react-19-2
