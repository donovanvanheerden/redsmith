import * as React from 'react';
import { Virtuoso } from 'react-virtuoso';

import { GridWrapper } from './keyList.styles';

import { Header } from '../header';
import { useAppSelector } from '../../hooks';
import { KeysSearch } from '../keysSearch';
import { KeyItem } from '../keyItem';

interface Props {
  className?: string;
  children?: React.ReactNode;
}

interface SelectorState {
  keys: string[];
  keyCount: number;
  hasConnection: boolean;
}

const KeysPanel = ({ className }: Props): JSX.Element => {
  const { keys, hasConnection } = useAppSelector<SelectorState>((state) => ({
    keys: state.redis.keys,
    keyCount: state.redis.keys.length,
    hasConnection: Boolean(state.redis.name),
  }));

  const [height, setHeight] = React.useState(0);
  // const [width, setWidth] = React.useState(0);

  const calculateHeight = React.useCallback(() => {
    const height =
      document.querySelector('#key-container').clientHeight -
      (document.querySelector('#key-list') as HTMLElement).offsetTop;

    // const width = document.querySelector('#key-container').clientWidth;

    setHeight(height);
    // setWidth(width);
  }, []);

  React.useEffect(() => {
    calculateHeight();

    window.addEventListener('resize', calculateHeight);

    return () => {
      window.removeEventListener('resize', calculateHeight);
    };
  }, []);

  const xs = hasConnection ? 6 : 12;

  return (
    <GridWrapper id="key-container" xs={xs} className={className} item>
      <Header title="Keys" />
      <KeysSearch />
      <span id="key-list">
        <Virtuoso
          height={height}
          style={{ padding: '0 8px' }}
          data={keys}
          totalCount={keys.length}
          itemContent={(index, data) => <KeyItem key={data} data={data} index={index} />}
        />
      </span>
    </GridWrapper>
  );
};

export default KeysPanel;
