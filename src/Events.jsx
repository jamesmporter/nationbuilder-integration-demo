import React from "react";
import {
  Autocomplete,
  Box,
  Button,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { MobileDateTimePicker } from "@mui/x-date-pickers";

const statusOptions = {
  unlisted: "Unlisted",
  hidden: "Hidden",
  published: "Published",
};

const Events = ({ apiKey }) => {
  const [activeTab, setActiveTab] = React.useState(0);
  const [allEvents, setAllEvents] = React.useState([]);
  const [eventData, setEventData] = React.useState({
    siteSlug: "",
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

    if (!eventData.siteSlug) newErrors.status = "Required*";
    if (!eventData.status) newErrors.status = "Required*";
    if (!eventData.slug) newErrors.slug = "Required*";
    if (!eventData.name) newErrors.name = "Required*";
    if (!eventData.title) newErrors.title = "Required*";
    if (!eventData.intro) newErrors.intro = "Required*";
    if (!eventData.intro) newErrors.intro = "Required*";
    if (!eventData.startDatetime) newErrors.startDatetime = "Required*";
    if (!eventData.endDatetime) newErrors.endDatetime = "Required*";

    setErrors(newErrors);
    console.log(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getAllEvents = async () => {
    if (eventData.siteSlug) {
      try {
        const response = await fetch(
          `/api/v1/sites/${eventData.siteSlug}/pages/events?access_token=${apiKey}`
        );
        if (response.ok) {
          console.log("Success", response);
          const json = await response.json();
          setAllEvents(json.results);
        } else {
          throw new Error(response.error);
        }
      } catch (e) {
        console.log("Error", e);
      }
    }
  };

  const handleCreate = async () => {
    if (validateFields()) {
      try {
        const response = await fetch(
          `/api/v1/sites/${eventData.siteSlug}/pages/events?access_token=${apiKey}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify({
              event: {
                status: eventData.status,
                name: eventData.name,
                intro: eventData.intro,
                start_time: eventData.startDatetime.toString(),
                end_time: eventData.endDatetime.toString(),
                timezone: eventData.endDatetime.zoneName,
              },
            }),
          }
        );
        if (response.ok) {
          console.log("Success", response);
        } else {
          throw new Error(response.error);
        }
      } catch (e) {
        console.log("Error", e);
      }
    }
  };

  const handleUpdate = async () => {
    if (validateFields()) {
      try {
        const response = await fetch(
          `/api/v1/sites/${eventData.siteSlug}/pages/events/${eventData.eventId}?access_token=${apiKey}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify({
              event: {
                status: eventData.status,
                name: eventData.name,
                intro: eventData.intro,
                start_time: eventData.startDatetime.toString(),
                end_time: eventData.endDatetime.toString(),
                timezone: eventData.endDatetime.zoneName,
              },
            }),
          }
        );
        if (response.ok) {
          console.log("Success", response);
        } else {
          throw new Error(response.error);
        }
      } catch (e) {
        console.log("Error", e);
      }
    }
  };

  return (
    <Box sx={{ py: 2 }}>
      <Stack spacing={2} direction="column" maxWidth={800}>
        <Typography variant="h1">Events</Typography>
        <TextField
          label="Site Slug"
          variant="outlined"
          value={eventData.siteSlug}
          onChange={(e) =>
            setEventData({ ...eventData, siteSlug: e.target.value })
          }
          error={!!errors.siteSlug}
          helperText={errors.siteSlug}
          size="small"
        />

        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={activeTab}
            onChange={(_, newValue) => setActiveTab(newValue)}
          >
            <Tab label="Create" value={0} />
            <Tab label="Update" value={1} />
            <Tab label="Get All" value={2} />
          </Tabs>
        </Box>
        {activeTab === 1 && (
          <TextField
            label="Event ID"
            variant="outlined"
            value={eventData.eventId}
            onChange={(e) =>
              setEventData({ ...eventData, eventId: e.target.value })
            }
            error={!!errors.eventId}
            helperText={errors.eventId}
            size="small"
          />
        )}
        {(activeTab === 0 || activeTab === 1) && (
          <>
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
                    size="small"
                  />
                )}
              />
            </Box>
            <TextField
              label="Slug"
              variant="outlined"
              value={eventData.slug}
              onChange={(e) =>
                setEventData({ ...eventData, slug: e.target.value })
              }
              error={!!errors.slug}
              helperText={errors.slug}
              size="small"
            />
            <TextField
              label="Name"
              variant="outlined"
              value={eventData.name}
              onChange={(e) =>
                setEventData({ ...eventData, name: e.target.value })
              }
              error={!!errors.name}
              helperText={errors.name}
              size="small"
            />
            <TextField
              label="Title"
              variant="outlined"
              value={eventData.title}
              onChange={(e) =>
                setEventData({ ...eventData, title: e.target.value })
              }
              error={!!errors.title}
              helperText={errors.title}
              size="small"
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
              size="small"
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
                  size: "small",
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
                  size: "small",
                },
              }}
            />
            <Button
              variant="contained"
              onClick={activeTab === 0 ? handleCreate : handleUpdate}
              sx={{ maxWidth: 150 }}
              size="small"
            >
              {activeTab === 0 ? "Create" : "Update"}
            </Button>
          </>
        )}
        {activeTab === 2 && (
          <>
            <Button
              variant="contained"
              onClick={getAllEvents}
              sx={{ maxWidth: 150 }}
              size="small"
            >
              Load Events
            </Button>
            {allEvents.map((event) => (
              <p>
                {event.name} - {event.id}
              </p>
            ))}
          </>
        )}
      </Stack>
    </Box>
  );
};

export default Events;
