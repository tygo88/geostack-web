import React, { useState } from 'react';
import './RightSidebar.css';

function RightSidebar() {
  const [isHovered, setIsHovered] = useState(false);

  const menuItems = [
    { icon: 'icons/home.svg', label: 'Home' },
    { icon: 'icons/dashboard.svg', label: 'Dashboard' },
    { icon: 'icons/photos.svg', label: 'Gallery' },
    { icon: 'icons/chat.svg', label: 'Chat' },
    { icon: 'icons/setting.svg', label: 'Setting' },
  ];

  return (
    <div
      className={`right-sidebar ${isHovered ? 'expanded' : 'collapsed'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="sidebar-logo">
        <img src="icons/main-logo.svg" alt="Geostack Logo" className="icon logo" />
        {isHovered && <span className="brand-name">GeoStack</span>}
      </div>

      <div className="sidebar-buttons">
        {menuItems.map((item, index) => (
          <div className="sidebar-item" key={index}>
            <img src={item.icon} alt={item.label} className="icon" />
            {isHovered && <span className="label">{item.label}</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default RightSidebar;

