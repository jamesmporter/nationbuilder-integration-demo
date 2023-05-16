import React from "react";
import { Box, Tab, Tabs } from "@mui/material";
import Events from "./Events";

function App() {
  const [activeTab, setActiveTab] = React.useState(0);

  return (
    <Box sx={{ width: "100%" }}>
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
      {activeTab === 0 && <Events />}
    </Box>
  );
}

export default App;
