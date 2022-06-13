import React from "react";
import "./Sidebar.css";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import { Avatar, IconButton } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { SearchOutlined } from "@mui/icons-material";
import SidebarChat from "./SidebarChat";

function Sidebar() {
  return (
      //BEM naming convention
    <div className="sidebar">
      <div className="sidebar__header">
          <Avatar src="https://i.pinimg.com/564x/ab/26/56/ab2656475b0fb97258859488278e24db.jpg"/>
        <div className="sidebar__headerRight">
        <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
              <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      <div className="sidebar__search">
       <div className="sidebar__searchContainer">
           <SearchOutlined />
           <input placeholder="Search or start new chat" type="text" />
       </div>
      </div>

      <div className="sidebar__chats">
          <SidebarChat />
          <SidebarChat />
          <SidebarChat />
      </div>
    </div>
  );
}

export default Sidebar;
