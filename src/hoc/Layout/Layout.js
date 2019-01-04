import React from 'react';
import './Layout.scss';

const Layout = (props) => (
  <div className={"Layout"}>
    {props.children}
  </div>
)

export default Layout;