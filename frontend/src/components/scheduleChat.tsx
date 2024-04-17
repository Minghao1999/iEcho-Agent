import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useDispatch } from 'react-redux';
import { closeModal } from '../redux/reducer/scheduleReducer';
import toast from 'react-hot-toast';
import { useSendScheduleMutation } from '../redux/api/messageAPI';
import { MessageResponse, SendSheduleRequest } from '../types/api';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';



const ScheduleForm: React.FC = () => {
  const [formValues, setFormValues] = useState<SendSheduleRequest>({
    scheduletimestamp: '',
    text: '',
  });
  const dispatch = useDispatch();
  const [sendSchedule] = useSendScheduleMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted!', formValues);
    dispatch(closeModal())
    const res=await sendSchedule(formValues)
    if ("data" in res) {
      const message = (res.data as MessageResponse).message || "";
      toast.success(message, {
        duration: 3000,
      });
    }else{
      const error = res.error as FetchBaseQueryError;
      const message = (error.data as MessageResponse).message || "";
      toast.error(message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            type="scheduletimestamp"
            label="Time"
            name="scheduletimestamp"
            value={formValues.scheduletimestamp}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Schedule Message"
            name="text"
            value={formValues.text}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default ScheduleForm;
