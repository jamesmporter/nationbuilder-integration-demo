import React from "react";
import {
  Alert,
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

const BLANK_PERSON = {
  id: "",
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
};

const People = ({ apiKey }) => {
  const [activeTab, setActiveTab] = React.useState(0);
  const [allPeople, setAllPeople] = React.useState([]);
  const [personData, setPersonData] = React.useState(BLANK_PERSON);
  const [errors, setErrors] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);
  const [snackbarStatus, setSnackbarStatus] = React.useState(null);
  const handleSnackbarClose = () => setSnackbarStatus(null);

  const validateFields = () => {
    const newErrors = {};

    if (!personData.first_name) newErrors.first_name = "Required*";
    if (!personData.last_name) newErrors.last_name = "Required*";
    if (!personData.email) newErrors.email = "Required*";
    if (!personData.phone) newErrors.phone = "Required*";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) console.log(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getAllPeople = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/v1/people?access_token=${apiKey}`);
      if (response.ok) {
        console.log("Success", response);
        const json = await response.json();
        setAllPeople(json.results);
        setSnackbarStatus("success");
      } else {
        throw new Error(response.error);
      }
    } catch (e) {
      setSnackbarStatus("error");
      console.log("Error", e);
    }
    setIsLoading(false);
  };

  const handleCreate = async () => {
    if (validateFields()) {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/v1/people?access_token=${apiKey}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify({
            person: {
              ...personData,
              signup_type: 0,
            },
          }),
        });
        if (response.ok) {
          console.log("Success", response);
          setAllPeople([]);
          setActiveTab(0);
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
          `/api/v1/people/${personData.id}?access_token=${apiKey}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify({
              person: personData,
            }),
          }
        );
        if (response.ok) {
          console.log("Success", response);
          setSnackbarStatus("success");
          setAllPeople([]);
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

  const handleDelete = async () => {
    if (validateFields()) {
      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/v1/people/${personData.id}?access_token=${apiKey}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json;charset=utf-8",
            },
          }
        );
        if (response.ok) {
          console.log("Success", response);
          setAllPeople([]);
          setActiveTab(0);
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

        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={activeTab}
            onChange={(_, newValue) => {
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
            label="Person ID"
            variant="outlined"
            value={personData.id}
            onChange={(e) =>
              setPersonData({ ...personData, id: e.target.value })
            }
            error={!!errors.id}
            helperText={errors.id}
            size="small"
          />
        )}
        {(activeTab === 1 || activeTab === 2) && (
          <>
            <TextField
              label="First Name"
              variant="outlined"
              value={personData.first_name}
              onChange={(e) =>
                setPersonData({ ...personData, first_name: e.target.value })
              }
              error={!!errors.first_name}
              helperText={errors.first_name}
              size="small"
            />
            <TextField
              label="Last Name"
              variant="outlined"
              value={personData.last_name}
              onChange={(e) =>
                setPersonData({ ...personData, last_name: e.target.value })
              }
              error={!!errors.last_name}
              helperText={errors.last_name}
              size="small"
            />
            <TextField
              label="Email"
              variant="outlined"
              value={personData.email}
              onChange={(e) =>
                setPersonData({ ...personData, email: e.target.value })
              }
              error={!!errors.email}
              helperText={errors.email}
              size="small"
            />
            <TextField
              label="Phone"
              variant="outlined"
              value={personData.phone}
              onChange={(e) =>
                setPersonData({ ...personData, phone: e.target.value })
              }
              error={!!errors.phone}
              helperText={errors.phone}
              size="small"
            />
            <Stack spacing={2} direction="row">
              {activeTab === 1 && (
                <LoadingButton
                  variant="contained"
                  onClick={handleCreate}
                  sx={{ minWidth: 100 }}
                  size="small"
                  loading={isLoading}
                >
                  Create
                </LoadingButton>
              )}
              {activeTab === 2 && (
                <LoadingButton
                  variant="contained"
                  onClick={handleUpdate}
                  sx={{ minWidth: 100 }}
                  size="small"
                  loading={isLoading}
                >
                  Update
                </LoadingButton>
              )}
              {activeTab === 2 && (
                <LoadingButton
                  variant="contained"
                  onClick={handleDelete}
                  sx={{ minWidth: 100 }}
                  size="small"
                  loading={isLoading}
                >
                  Delete
                </LoadingButton>
              )}
            </Stack>
          </>
        )}
        {activeTab === 0 && (
          <>
            <LoadingButton
              variant="contained"
              onClick={getAllPeople}
              sx={{ maxWidth: 150 }}
              size="small"
              loading={isLoading}
            >
              Load People
            </LoadingButton>
            {allPeople.map((person) => (
              <Link
                key={person.id}
                sx={{ cursor: "pointer" }}
                onClick={() => {
                  setActiveTab(2);
                  setPersonData({
                    id: person.id,
                    first_name: person.first_name,
                    last_name: person.last_name,
                    email: person.email,
                    phone: person.phone,
                  });
                }}
              >
                {person.first_name} {person.last_name}
                {!!person.email ? " - " + person.email : ""}
                {!!person.phone ? " - " + person.phone : ""}
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

export default People;
