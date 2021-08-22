import React from 'react';

import SideNav from './sideNav';

import useStyles from './index.styles';

interface LayoutProps {
  children?: React.ReactChild;
}

const Layout = ({ children }: LayoutProps): JSX.Element => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <SideNav />
      <main className={classes.content}>{children}</main>
    </div>
  );
};

export default Layout;
