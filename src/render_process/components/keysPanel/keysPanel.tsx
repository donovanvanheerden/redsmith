import * as React from 'react';

import { GridWrapper, List } from './keyList.styles';

import { Header } from '../header';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useIpc } from '../../hooks/useFromDi';
import { KeysSearch } from '../keysSearch';
import { redisActions } from '../../store/reducers/redis-slice';
import { KeyItem } from '../keyItem';

interface Props {
  className?: string;
  children?: React.ReactNode;
}

interface SelectorState {
  keys: string[];
  hasConnection: boolean;
  selectedKey?: string;
}

const KeysPanel = ({ className }: Props): JSX.Element => {
  const { keys, hasConnection, selectedKey } = useAppSelector<SelectorState>((state) => ({
    keys: state.redis.keys,
    hasConnection: Boolean(state.redis.name),
    selectedKey: state.redis.selectedKey,
  }));

  const dispatch = useAppDispatch();

  const ipc = useIpc();

  const [height, setHeight] = React.useState(0);

  const calculateHeight = React.useCallback(() => {
    const height =
      document.querySelector('#key-container').clientHeight -
      (document.querySelector('#key-list') as HTMLElement).offsetTop;

    setHeight(height);
  }, []);

  React.useEffect(() => {
    calculateHeight();

    window.addEventListener('resize', calculateHeight);

    return () => {
      window.removeEventListener('resize', calculateHeight);
    };
  }, []);

  const handleKeySelection = (key: string) => async () => {
    const { value } = await ipc.getValue(key);

    dispatch(redisActions.setRedisKeySelection({ key, value }));
  };

  const xs = hasConnection ? 6 : 12;

  return (
    <GridWrapper id="key-container" xs={xs} className={className} item>
      <Header title="Keys" />
      <KeysSearch />
      <List id="key-list" style={{ height }}>
        {keys.slice(0, 20).map((key) => (
          <KeyItem key={key} keyName={key} selected={key === selectedKey} onClick={handleKeySelection(key)} />
        ))}
      </List>
    </GridWrapper>
  );
};

export default KeysPanel;
