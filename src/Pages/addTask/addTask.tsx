import React, { useState } from 'react';

import { Bookmark, BookmarkBorder } from '@mui/icons-material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Typography from '@mui/material/Typography';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import * as TaskActionsTypes from '../../Shared/Store/Actions/TaskActionsTypes';
import { TASK } from '../../Shared/Types';
import { generateNewId } from '../../Shared/utils';

const AddTask = (props: any) => {
  const navigate = useNavigate();
  const [id] = useState(generateNewId());
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('todo');
  const [className, setClassName] = useState('bg-gray');
  const [deadLine, setDeadLine] = useState(new Date().toISOString() as string);
  const [favourite, setFavourite] = useState(false);
  const [tags, setTags] = useState<string[]>([]);

  const setDeadLineDate = (e: Date) => {
    setDeadLine(e.toISOString());
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

  const handleChange = (event: SelectChangeEvent<typeof tags>) => {
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
      tags,
    };

    props.addNewTask(task);
    navigate('/');
  };

  return (
    <>
      <Box>
        <Grid className="board" container spacing={2} sx={{ flexGrow: 1 }}>
          <Card className="w-100 h-100">
            <CardContent>
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
                      value={name}
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
                        <Box
                          sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}
                        >
                          {selected.map((value: any) => (
                            <Chip key={value} label={value} />
                          ))}
                        </Box>
                      )}
                      value={tags}
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
                      value={description}
                      aria-label="description"
                      spellCheck
                    />
                  </FormControl>
                </div>
                <div className="form-control">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={favourite}
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
            </CardContent>
          </Card>
        </Grid>
      </Box>
    </>
  );
};

function mapStateToProps(state: any) {
  return state;
}

const mapDispatchToProps = (dispatch: any) => ({
  addNewTask: (task: TASK) =>
    dispatch({
      type: TaskActionsTypes.TASK_ADD,
      payload: task,
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddTask);
