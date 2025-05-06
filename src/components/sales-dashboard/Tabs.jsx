import React from 'react';
import { TabView, TabPanel } from 'primereact/tabview';

export default function Tabs({ children }) {
  // children should be exactly two React nodes: [<TablePanel />, <AnalyticsPanel />]
  return (
    <TabView>
      <TabPanel header="Data Table">
        {children[0]}
      </TabPanel>
      <TabPanel header="Analytics">
        {children[1]}
      </TabPanel>
    </TabView>
  );
}
