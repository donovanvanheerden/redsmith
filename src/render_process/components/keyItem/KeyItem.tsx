import { useThemeProps, unstable_composeClasses as composeClasses, ListItemText } from '@mui/material';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useIpc } from '../../hooks/useFromDi';
import { redisActions } from '../../store/reducers/redis-slice';
import { KeyRoot } from './KeyItem.styles';
import { getRedKeyItemUtilityClass, RedKeyItemClasses } from './KeyItemClasses';

const useUtilityClasses = ({ classes, selected }: Pick<Props, 'classes' | 'selected'>) => {
  const slots = {
    root: ['root', selected && 'selected'],
  };

  return composeClasses(slots, getRedKeyItemUtilityClass, classes);
};

interface Props {
  index: number;
  data: string;
  selected?: boolean;
  classes?: Partial<RedKeyItemClasses>;
}

const KeyItem = (compProps: Props) => {
  const ipc = useIpc();

  const isSelected = useAppSelector<boolean>((state) => (state.redis.selectedKeys || []).includes(compProps.data));

  const dispatch = useAppDispatch();
  const props = useThemeProps({ props: compProps, name: 'RedKeyItem' });

  const handleKeySelection = async (event: React.MouseEvent) => {
    if (event.ctrlKey) {
      dispatch(redisActions.addRedisKeySelection({ key: props.data }));
    } else {
      const { value } = await ipc.getValue(props.data);

      dispatch(redisActions.setRedisKeySelection({ key: props.data, value }));
    }
  };

  const classes = useUtilityClasses({ ...props, selected: isSelected });

  return (
    <KeyRoot className={classes.root} onClick={handleKeySelection}>
      <ListItemText primary={props.data} />
    </KeyRoot>
  );
};
export default KeyItem;
