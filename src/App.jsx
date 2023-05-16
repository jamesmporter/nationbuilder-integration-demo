import React from "react";
import {
  Box,
  Link,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import Events from "./Events";
import People from "./People";

function App() {
  const [activeTab, setActiveTab] = React.useState(0);
  const [apiKey, setApiKey] = React.useState("");

  return (
    <Box sx={{ width: "100%", p: 2 }}>
      <Stack spacing={2} direction="column" maxWidth={800}>
        <Typography variant="h1">Nationbuilder Integration Demo</Typography>
        <Box>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            Nation Slug:
          </Typography>
          <Typography variant="body1" sx={{ fontStyle: "italic" }}>
            <Link
              href="https://jamesportersandbox.nationbuilder.com/admin"
              target="_blank"
            >
              jamesportersandbox
            </Link>
          </Typography>
        </Box>
        <Typography variant="body1">
          The nation slug has been set within the proxy in package.json for
          development purposes. (This avoids CORS issues.)
        </Typography>
        <Box>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            Key Links:
          </Typography>
          <Typography variant="body1">
            <Link
              href="https://nationbuilder.com/api_documentation"
              target="_blank"
            >
              API Documentation
            </Link>
            {" - "}
            <Link
              href="https://apiexplorer.nationbuilder.com/nationbuilder"
              target="_blank"
            >
              API Explorer
            </Link>
            {" - "}
            <Link
              href="https://nationbuilder.com/api_quickstart"
              target="_blank"
            >
              Generate API Key (including test tokens)
            </Link>
            {" - "}
            <Link
              href="https://github.com/jamesmporter/nationbuilder-integration-demo"
              target="_blank"
            >
              Github Repository
            </Link>
          </Typography>
        </Box>
        <TextField
          label="API Key"
          variant="outlined"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          error={!apiKey}
          helperText={!!apiKey && "Required*"}
          size="small"
        />
      </Stack>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={activeTab}
          onChange={(_, newValue) => setActiveTab(newValue)}
        >
          <Tab label="Events" value={0} />
          <Tab label="People" value={1} />
          <Tab label="Sites" value={2} />
          <Tab label="Surveys" value={3} />
        </Tabs>
      </Box>
      {activeTab === 0 && <Events apiKey={apiKey} />}
      {activeTab === 1 && <People apiKey={apiKey} />}
    </Box>
  );
}

export default App;
