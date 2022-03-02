import { Language, NotificationsNone, Settings } from "@material-ui/icons";
import React from "react";
import { Link } from "react-router-dom";
import "./topbar.css";

const Topbar = () => {
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <Link to="/" className="link">
            <span className="logo">Admin Panel</span>
          </Link>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Settings />
          </div>
          <img
            src="https://sm.ign.com/t/ign_latam/feature/w/why-gendo-/why-gendo-ikari-is-what-neon-genesis-evangelion-is-really-al_jyqj.1280.jpg"
            alt=""
            className="topAvatar"
          />
        </div>
      </div>
    </div>
  );
};

export default Topbar;
