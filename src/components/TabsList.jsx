import React from "react";
import Tabs, { Tab, TabPanel } from "@ingka/tabs";

 export default class Application extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const tabs = [
      <Tab key="tab-1" text={"Name or Title 1"} tabPanelId="tab_1" />,
      <Tab key="tab-2" text={"Name or Title 2"} active tabPanelId="tab_2" />,
      <Tab key="tab-3" text={"Name or Title 3"} tabPanelId="tab_3" />,
    ];

    const tabPanels = [
      <TabPanel
        key="tab-1"
        tabPanelId="tab_1"
        title="Tab 1 some possible title"
        text="Ullamco aute aliqua irure nulla ea tempor ut adipisicing tempor excepteur enim sit."
      />,
      <TabPanel
        key="tab-2"
        tabPanelId="tab_2"
        title="Tab 2 some possible title"
        text="Ullamco aute aliqua irure nulla ea tempor ut adipisicing tempor excepteur enim sit."
      />,
      <TabPanel
        key="tab-3"
        tabPanelId="tab_3"
        title="Tab 3 some possible title"
      >
        <img src="http://placehold.it/500x500" alt="placholder image" />
        <p>
          Dolore sunt amet proident fugiat. Mollit voluptate ad et excepteur sit
          adipisicing amet esse elit fugiat consequat veniam ea quis.
        </p>
      </TabPanel>,
    ];

    return <Tabs tabs={tabs} tabPanels={tabPanels} defaultActiveTab="tab_2" />;
  }
}
