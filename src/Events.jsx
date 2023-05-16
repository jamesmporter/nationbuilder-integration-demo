import React from "react";
import {
  Autocomplete,
  Box,
  Button,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { MobileDateTimePicker } from "@mui/x-date-pickers";

const statusOptions = {
  unlisted: "Unlisted",
  hidden: "Hidden",
  published: "Published",
};

const Events = () => {
  const [eventData, setEventData] = React.useState({
    status: null,
    slug: "",
    name: "",
    title: "",
    intro: "",
    startDatetime: null,
    endDatetime: null,
  });
  const [errors, setErrors] = React.useState({});

  const validateFields = () => {
    const newErrors = {};

    if (!eventData.status) newErrors.status = "Required*";
    if (!eventData.slug) newErrors.slug = "Required*";
    if (!eventData.name) newErrors.name = "Required*";
    if (!eventData.title) newErrors.title = "Required*";
    if (!eventData.intro) newErrors.intro = "Required*";
    if (!eventData.intro) newErrors.intro = "Required*";
    if (!eventData.startDatetime) newErrors.startDatetime = "Required*";
    if (!eventData.endDatetime) newErrors.endDatetime = "Required*";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateFields()) {
      console.log("SUBMIT: ", eventData);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Stack spacing={2} direction="column" maxWidth={800}>
        <Typography variant="h1">Events</Typography>
        <Box>
          <Autocomplete
            disablePortal
            options={Object.keys(statusOptions)}
            value={eventData.status}
            getOptionLabel={(option) => statusOptions[option]}
            onChange={(_, newValue) =>
              setEventData({ ...eventData, status: newValue })
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Status"
                error={!!errors.status}
                helperText={errors.status}
              />
            )}
          />
        </Box>
        <TextField
          label="Slug"
          variant="outlined"
          value={eventData.slug}
          onChange={(e) => setEventData({ ...eventData, slug: e.target.value })}
          error={!!errors.slug}
          helperText={errors.slug}
        />
        <TextField
          label="Name"
          variant="outlined"
          value={eventData.name}
          onChange={(e) => setEventData({ ...eventData, name: e.target.value })}
          error={!!errors.name}
          helperText={errors.name}
        />
        <TextField
          label="Intro"
          variant="outlined"
          multiline
          minRows={5}
          value={eventData.intro}
          onChange={(e) =>
            setEventData({ ...eventData, intro: e.target.value })
          }
          error={!!errors.intro}
          helperText={errors.intro}
        />
        <MobileDateTimePicker
          label="Start Date & Time"
          value={eventData.startDatetime}
          onChange={(newValue) =>
            setEventData({ ...eventData, startDatetime: newValue })
          }
          slotProps={{
            textField: {
              error: !!errors.startDatetime,
              helperText: errors.startDatetime,
            },
          }}
        />
        <MobileDateTimePicker
          label="End Date & Time"
          value={eventData.endDatetime}
          onChange={(newValue) =>
            setEventData({ ...eventData, endDatetime: newValue })
          }
          slotProps={{
            textField: {
              error: !!errors.endDatetime,
              helperText: errors.endDatetime,
            },
          }}
        />
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{ maxWidth: 150 }}
        >
          Submit
        </Button>
      </Stack>
    </Box>
  );
};

export default Events;
