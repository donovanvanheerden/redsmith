import React from 'react';

import { DbList, StyledDrawer, Title } from './dbSelector.styles';

import { useIpc } from '../../hooks/useFromDi';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { DbInfo } from '../../../core/interfaces';
import { redisActions } from '../../store/reducers/redis-slice';
import { unstable_composeClasses as composeClasses } from '@mui/material';
import { getRedDbSelectorUtilityClass, RedDbSelectorClasses } from './dbSelectorClasses';

import { DbItem } from '../dbItem';
import clsx from 'clsx';

const useUtilityClasses = ({ classes }: Pick<Props, 'classes'>) => {
  const slots = {
    root: ['root'],
    title: ['title'],
    list: ['list'],
  };

  return composeClasses(slots, getRedDbSelectorUtilityClass, classes);
};

interface Props {
  classes?: Partial<RedDbSelectorClasses>;
}

interface SelectorState {
  dbs: DbInfo[];
  selectedDb: number;
}

const DbSelector = (props: Props): JSX.Element => {
  const dispatch = useAppDispatch();
  const ipc = useIpc();

  const { dbs, selectedDb } = useAppSelector<SelectorState>((state) => ({
    dbs: state.redis.dbs,
    selectedDb: state.redis.selectedDb,
  }));

  const handleSwitchDb = (db: DbInfo) => async () => {
    const keys = await ipc.switchDb(db);

    dispatch(redisActions.switchDb({ keys, selectedDb: db.index }));
  };

  const classes = useUtilityClasses(props);

  return (
    <StyledDrawer className={clsx(classes.root)} variant="permanent">
      <Title className={clsx(classes.title)}>Databases</Title>
      <DbList className={clsx(classes.list)}>
        {dbs.map((db) => (
          <DbItem key={db.name} {...db} onClick={handleSwitchDb(db)} selected={selectedDb === db.index} />
        ))}
      </DbList>
    </StyledDrawer>
  );
};

export default DbSelector;
