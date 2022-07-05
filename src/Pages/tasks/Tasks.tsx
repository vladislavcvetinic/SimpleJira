import React, { useEffect, useState } from 'react';

import { faAdd } from '@fortawesome/free-solid-svg-icons/faAdd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Bookmark, BookmarkBorder } from '@mui/icons-material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Typography from '@mui/material/Typography';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as TaskActionsTypes from '../../Shared/Store/Actions/TaskActionsTypes';
import { TASK } from '../../Shared/Types';
import { modalOptions } from '../../Shared/constants';
import Dummies from '../../Shared/dummies';
import { generateNewId, renderTags } from '../../Shared/utils';

const Tasks = (props: any) => {
  const [tasks, setTasks] = useState([] as TASK[]);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(generateNewId());
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('todo');
  const [className, setClassName] = useState('bg-gray');
  const [deadLine, setDeadLine] = useState(new Date().toISOString() as string);
  const [favourite, setFavourite] = useState(false);
  const [tag, setTags] = useState<string[]>([]);

  useEffect(() => {
    setTasks(props.tasks ? props.tasks : []);
  }, [props.tasks]);

  const resetTask = () => {
    setId(generateNewId());
    setName('');
    setCategory('todo');
    setClassName('bg-gray');
    setDeadLine(new Date().toISOString());
    setDescription('');
    setFavourite(false);
    setTags([]);
  };

  const setCategoryForTask = (category: string) => {
    setCategory(category);

    if (category === 'complete') {
      setClassName('bg-black');
    } else if (category === 'todo') {
      setClassName('bg-gray');
    } else {
      setClassName('bg-blue');
    }
  };

  const onDrop = (e: any, cat: string) => {
    const tid = e.dataTransfer.getData('id');

    setTasks(
      tasks.map((task: TASK) => {
        if (task.id === tid) {
          task.category = cat;
          if (cat === 'complete') {
            task.className = 'bg-black';
          } else if (cat === 'todo') {
            task.className = 'bg-gray';
          } else {
            task.className = 'bg-blue';
          }
        }

        props.updateTask(task);
        return task;
      })
    );
  };

  const onDragOver = (e: any) => {
    e.preventDefault();
  };

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const onDragStart = (e: any, id: any) => {
    e.dataTransfer.setData('id', id);
  };

  const handleChange = (event: SelectChangeEvent<typeof tag>) => {
    const {
      target: { value },
    } = event;

    setTags(typeof value === 'string' ? value.split(',') : value);
  };

  const addTask = () => {
    const task = {
      id,
      name,
      category,
      description,
      className,
      deadLine,
      favourite,
      tags: tag,
    } as TASK;

    props.addTask(task);
    resetTask();
    setTasks(props.tasks);
    setOpen(false);
  };

  const changeCategory = (task: TASK, category: string) => {
    task.category = category;

    if (category === 'complete') {
      task.className = 'bg-black';
    } else if (category === 'todo') {
      task.className = 'bg-gray';
    } else {
      task.className = 'bg-blue';
    }

    props.updateTask(task);
  };

  const setDeadLineDate = (e: Date) => {
    setDeadLine(e.toISOString());
  };

  const addDummyDate = () => {
    Dummies.forEach((dummy: TASK) => {
      if (props.tasks.filter((t: TASK) => t.id === dummy.id).length > 0) {
        props.updateTask(dummy);
      } else {
        props.addTask(dummy);
      }
    });
  };

  const removeDummyDate = () => {
    Dummies.forEach((dummy: TASK) => {
      props.removeTask(dummy);
    });
  };

  const renderTask = (t: TASK) => {
    return (
      <Card
        key={t.id}
        onDragStart={(e) => onDragStart(e, t.id)}
        draggable
        className={'draggable task ' + t.className}
      >
        <CardContent>
          {renderTags(t)}
          <Typography variant="h6">{t.name}</Typography>
        </CardContent>
        <CardActions className="action-util">
          <Link to={'/edit/' + (t.id as string)}>
            <Button size="small">Details</Button>
          </Link>
          <FormControl className="state-select">
            <Select
              value={t.category}
              onChange={(e: SelectChangeEvent) =>
                changeCategory(t, e.target.value)
              }
            >
              <MenuItem value="todo">To do</MenuItem>
              <MenuItem value="progress">Progress</MenuItem>
              <MenuItem value="complete">Complete</MenuItem>
            </Select>
          </FormControl>
        </CardActions>
      </Card>
    );
  };

  const renderAddModal = () => {
    return (
      <Box sx={modalOptions} className="modal">
        <Typography variant="h5" component="h5">
          Add new Task
        </Typography>
        <Card className="task-form">
          <div className="form-control">
            <FormControl fullWidth>
              <TextField
                onChange={(e: any) => setName(e.target.value)}
                label="Task Name"
                variant="outlined"
                fullWidth
              />
            </FormControl>
          </div>
          <div className="form-control">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <MobileDatePicker
                minDate={new Date()}
                label="Date mobile"
                inputFormat="MM/dd/yyyy"
                value={deadLine}
                onChange={(e: any) => setDeadLineDate(e as Date)}
                renderInput={(params: any) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>
          <div className="form-control">
            <FormControl fullWidth className="form-control">
              <InputLabel>State</InputLabel>
              <Select
                onChange={(e: SelectChangeEvent) =>
                  setCategoryForTask(e.target.value as string)
                }
                value={category}
                label="State"
              >
                <MenuItem value="todo">To do</MenuItem>
                <MenuItem value="progress">Progress</MenuItem>
                <MenuItem value="complete">Complete</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="form-control">
            <FormControl fullWidth className="form-control">
              <InputLabel>Tags</InputLabel>
              <Select
                multiple
                renderValue={(selected: any) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value: any) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
                value={tag}
                onChange={handleChange}
                label="State"
              >
                <MenuItem value="" disabled>
                  None
                </MenuItem>
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="normal">Normal</MenuItem>
                <MenuItem value="urgent">Urgent</MenuItem>
                <MenuItem value="very urgent">Very urgent</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="form-control">
            <InputLabel>Description</InputLabel>
          </div>
          <div className="form-control">
            <FormControl fullWidth className="form-control">
              <TextareaAutosize
                onChange={(e: any) => setDescription(e.target.value)}
                minRows={6}
                aria-label="description"
                spellCheck
              />
            </FormControl>
          </div>
          <div className="form-control">
            <FormControlLabel
              control={
                <Checkbox
                  onClick={() => setFavourite(!favourite)}
                  icon={<BookmarkBorder />}
                  checkedIcon={<Bookmark />}
                />
              }
              label={<InputLabel>Favourite</InputLabel>}
            />
          </div>
          <div className="form-control">
            <Button variant="contained" onClick={addTask}>
              Confirm
            </Button>
          </div>
        </Card>
      </Box>
    );
  };

  const renderBoard = (category: string) => {
    return (
      <>
        {tasks
          .filter((task: TASK) => {
            return task.category === category;
          })
          .sort((task1: TASK, task2: TASK) => {
            if (task1.favourite && !task2.favourite) {
              return -1;
            } else if (task1.name.localeCompare(task2.name)) {
              return 1;
            } else {
              return 1;
            }
          })
          .map((t: TASK) => renderTask(t))}
      </>
    );
  };
  return (
    <Box>
      <Modal open={open} onClose={handleClose}>
        {renderAddModal()}
      </Modal>
      <Grid className="board" container spacing={2} sx={{ flexGrow: 1 }}>
        <Box className="task-board-header">
          <div className="board-header-appbar">
            <Grid xs={12} className="board-header-panel">
              <Typography variant="h4">
                Tasks board
                <Button
                  className="btn-add"
                  variant="outlined"
                  onClick={handleOpen}
                >
                  <FontAwesomeIcon icon={faAdd} />
                </Button>
              </Typography>
              <Button color="warning" variant="outlined" onClick={addDummyDate}>
                add dummy data
              </Button>
              <Button
                color="success"
                variant="outlined"
                onClick={removeDummyDate}
              >
                remove dummy data
              </Button>
            </Grid>
          </div>
        </Box>
        <Grid item xs={4}>
          <Paper className="h-100" elevation={2}>
            <div
              className="todo task-board-item"
              onDragOver={(e) => onDragOver(e)}
              onDrop={(e) => onDrop(e, 'todo')}
            >
              <AppBar position="static" className="task-board-item-header">
                To do
              </AppBar>
              {renderBoard('todo')}
            </div>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper elevation={2}>
            <div
              className="droppable task-board-item"
              onDragOver={(e) => onDragOver(e)}
              onDrop={(e) => onDrop(e, 'progress')}
            >
              <AppBar position="static" className="task-board-item-header">
                In progress
              </AppBar>
              {renderBoard('progress')}
            </div>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper elevation={2}>
            <div
              className="droppable task-board-item"
              onDragOver={(e) => onDragOver(e)}
              onDrop={(e) => onDrop(e, 'complete')}
            >
              <span className="task-header"></span>

              <AppBar position="static" className="task-board-item-header">
                Completed
              </AppBar>
              {renderBoard('complete')}
            </div>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

function mapStateToProps(state: any) {
  return state;
}

const mapDispatchToProps = (dispatch: any) => ({
  addTask: (task: TASK) =>
    dispatch({
      type: TaskActionsTypes.TASK_ADD,
      payload: task,
    }),
  removeTask: (task: TASK) =>
    dispatch({
      type: TaskActionsTypes.TASK_REMOVE,
      payload: task,
    }),
  updateTask: (task: TASK) =>
    dispatch({
      type: TaskActionsTypes.TASK_EDIT,
      payload: task,
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);
