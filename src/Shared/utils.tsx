import React from 'react';

import { Bookmark } from '@mui/icons-material';
import Chip from '@mui/material/Chip';

import { TASK } from './Types';

export const generateNewId = () =>
  Date.now().toString(36) + Math.random().toString(36).substring(2);

export const renderTags = (task: TASK) => {
  return (
    <div>
      {task.tags.includes('low') ? (
        <Chip color="success" size="small" className="status-chip" />
      ) : (
        <></>
      )}
      {task.tags.includes('normal') ? (
        <Chip color="warning" size="small" className="status-chip" />
      ) : (
        <></>
      )}
      {task.tags.includes('urgent') ? (
        <Chip color="secondary" size="small" className="status-chip" />
      ) : (
        <></>
      )}
      {task.tags.includes('very urgent') ? (
        <Chip color="error" size="small" className="status-chip" />
      ) : (
        <></>
      )}
      {task.favourite ? (
        <Bookmark className="float-right" color="warning" />
      ) : (
        <></>
      )}
    </div>
  );
};
