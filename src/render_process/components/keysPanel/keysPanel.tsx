import * as React from 'react';
import { Virtuoso } from 'react-virtuoso';

import { GridWrapper } from './keyList.styles';

import { Header } from '../header';
import { useAppSelector } from '../../hooks';
import { KeysSearch } from '../keysSearch';
import { KeyItem } from '../keyItem';

import { array } from '../../utils';

interface Props {
  className?: string;
  children?: React.ReactNode;
}

interface SelectorState {
  keys: string[];
  hasConnection: boolean;
  namespace: string;
  namespaceSearch: string;
}

const KeysPanel = ({ className }: Props): JSX.Element => {
  const { keys, hasConnection, namespace, namespaceSearch } = useAppSelector<SelectorState>((state) => ({
    keys: state.redis.keys,
    hasConnection: Boolean(state.redis.name),
    namespace: state.connection[state.redis.name]?.namespace ?? '',
    namespaceSearch: state.redis.namespaceSelection || '',
  }));

  const [usingNamespace, setUsingNamespace] = React.useState(false);
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

  const handleNamespaceClick = () => {
    setUsingNamespace((ns) => !ns);
  };

  const xs = hasConnection ? 6 : 12;

  let filteredKeys = keys;

  console.log('using namespace: ', usingNamespace);
  console.log('using namespace search: ', namespaceSearch);

  if (namespace && usingNamespace) {
    if (namespaceSearch.length > 0) {
      const filtered = keys.filter((key) => key.includes(namespaceSearch));

      console.log('filtered using namespace search: ', filtered);

      const afiltered = filtered.map((key) => key.replace(`${namespaceSearch}:`, '').split(namespace).shift());

      console.log('remapping of keys', afiltered);

      filteredKeys = ['...', ...afiltered];
    } else {
      filteredKeys = keys.map((key) => key.split(namespace).shift()).filter(array.distinct);
    }
  }

  console.log('filtered: ', filteredKeys);

  return (
    <GridWrapper id="key-container" xs={xs} className={className} item>
      <Header title="Keys" />
      <KeysSearch onNamespaceToggle={handleNamespaceClick} />
      <span id="key-list">
        <Virtuoso
          height={height}
          style={{ padding: '0 8px' }}
          data={filteredKeys}
          totalCount={filteredKeys.length}
          itemContent={(index, data) => (
            <KeyItem key={data} usingNamespace={usingNamespace} namespace={namespace} data={data} index={index} />
          )}
        />
      </span>
    </GridWrapper>
  );
};

export default KeysPanel;
