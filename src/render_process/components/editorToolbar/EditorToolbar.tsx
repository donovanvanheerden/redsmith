import { IconButton, MenuItem, SelectChangeEvent, Tooltip } from '@mui/material';
import * as React from 'react';

import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import CachedOutlinedIcon from '@mui/icons-material/CachedOutlined';
import ScheduleOutlinedIcon from '@mui/icons-material/ScheduleOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

import { ButtonToolbar, LanguageSelector } from './EditorToolbar.styles';

interface Props {
  id?: string;
  language?: string;
  disabled?: boolean;
  onExpire?: () => void;
  onDelete?: () => void;
  onLanguageChange?: (event: SelectChangeEvent<string>) => void;
  onRefresh?: () => void;
  onRename?: () => void;
  onSave?: () => void;
}

const EditorToolbar = ({
  id,
  disabled,
  language,
  onDelete,
  onExpire,
  onLanguageChange,
  onSave,
  onRefresh,
  onRename,
}: Props) => {
  return (
    <ButtonToolbar id={id}>
      <Tooltip title="Save">
        <span>
          <IconButton onClick={onSave} disabled={disabled} size="large">
            <SaveOutlinedIcon />
          </IconButton>
        </span>
      </Tooltip>
      <Tooltip title="Refresh">
        <span>
          <IconButton onClick={onRefresh} disabled={disabled} size="large">
            <CachedOutlinedIcon />
          </IconButton>
        </span>
      </Tooltip>
      <Tooltip title="Set Expiration">
        <span>
          <IconButton onClick={onExpire} disabled={disabled} size="large">
            <ScheduleOutlinedIcon />
          </IconButton>
        </span>
      </Tooltip>
      <Tooltip title="Rename Key">
        <span>
          <IconButton onClick={onRename} disabled={disabled} size="large">
            <EditOutlinedIcon />
          </IconButton>
        </span>
      </Tooltip>
      <Tooltip title="Delete">
        <span>
          <IconButton onClick={onDelete} disabled={disabled} size="large">
            <DeleteOutlineOutlinedIcon />
          </IconButton>
        </span>
      </Tooltip>
      <LanguageSelector value={language} onChange={onLanguageChange}>
        <MenuItem value="text">Text</MenuItem>
        <MenuItem value="json">JSON</MenuItem>
        <MenuItem value="xml">XML</MenuItem>
      </LanguageSelector>
    </ButtonToolbar>
  );
};

export default EditorToolbar;
