import React from "react";
import {
  Alert,
  Autocomplete,
  Box,
  Link,
  Snackbar,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { MobileDateTimePicker } from "@mui/x-date-pickers";
import { DateTime } from "luxon";

const statusOptions = {
  unlisted: "Unlisted",
  hidden: "Hidden",
  published: "Published",
};

const BLANK_EVENT = {
  siteSlug: "",
  status: null,
  slug: "",
  name: "",
  title: "",
  intro: "",
  startDatetime: null,
  endDatetime: null,
};

const Events = ({ apiKey }) => {
  const [activeTab, setActiveTab] = React.useState(0);
  const [allEvents, setAllEvents] = React.useState([]);
  const [eventData, setEventData] = React.useState(BLANK_EVENT);
  const [errors, setErrors] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);
  const [snackbarStatus, setSnackbarStatus] = React.useState(null);
  const handleSnackbarClose = () => setSnackbarStatus(null);

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
    if (Object.keys(newErrors).length > 0) console.log(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getAllEvents = async () => {
    if (eventData.siteSlug) {
      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/v1/sites/${eventData.siteSlug}/pages/events?access_token=${apiKey}`
        );
        if (response.ok) {
          console.log("Success", response);
          const json = await response.json();
          setAllEvents(json.results);
          setSnackbarStatus("success");
        } else {
          throw new Error(response.error);
        }
      } catch (e) {
        setSnackbarStatus("error");
        console.log("Error", e);
      }
      setIsLoading(false);
    }
  };

  const handleCreate = async () => {
    if (validateFields()) {
      setIsLoading(true);
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
          setSnackbarStatus("success");
        } else {
          throw new Error(response.error);
        }
      } catch (e) {
        setSnackbarStatus("error");
        console.log("Error", e);
      }
      setIsLoading(false);
    }
  };

  const handleUpdate = async () => {
    if (validateFields()) {
      setIsLoading(true);
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
          setSnackbarStatus("success");
        } else {
          throw new Error(response.error);
        }
      } catch (e) {
        setSnackbarStatus("error");
        console.log("Error", e);
      }
      setIsLoading(false);
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
            onChange={(_, newValue) => {
              if (newValue === 1)
                setEventData({ ...BLANK_EVENT, siteSlug: eventData.siteSlug });
              setActiveTab(newValue);
            }}
          >
            <Tab label="Get All" value={0} />
            <Tab label="Create" value={1} />
            <Tab label="Update" value={2} />
          </Tabs>
        </Box>
        {activeTab === 2 && (
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
        {(activeTab === 1 || activeTab === 2) && (
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
            <LoadingButton
              variant="contained"
              onClick={activeTab === 1 ? handleCreate : handleUpdate}
              sx={{ maxWidth: 150 }}
              size="small"
              loading={isLoading}
            >
              {activeTab === 1 ? "Create" : "Update"}
            </LoadingButton>
          </>
        )}
        {activeTab === 0 && (
          <>
            <LoadingButton
              variant="contained"
              onClick={getAllEvents}
              sx={{ maxWidth: 150 }}
              size="small"
              loading={isLoading}
            >
              Load Events
            </LoadingButton>
            {allEvents.map((event) => (
              <Link
                key={event.id}
                sx={{ cursor: "pointer" }}
                onClick={() => {
                  setActiveTab(2);
                  setEventData({
                    eventId: event.id,
                    siteSlug: event.site_slug,
                    status: event.status,
                    slug: event.slug,
                    name: event.name,
                    title: event.title,
                    intro: event.intro,
                    startDatetime: DateTime.fromISO(event.start_time),
                    endDatetime: DateTime.fromISO(event.end_time),
                  });
                }}
              >
                {event.name} - {event.slug}
              </Link>
            ))}
          </>
        )}
      </Stack>
      <Snackbar
        open={!!snackbarStatus}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        {snackbarStatus && (
          <Alert
            onClose={handleSnackbarClose}
            severity={snackbarStatus}
            sx={{ width: "100%" }}
          >
            {snackbarStatus === "success" ? "Success" : "Error"}
          </Alert>
        )}
      </Snackbar>
    </Box>
  );
};

export default Events;
