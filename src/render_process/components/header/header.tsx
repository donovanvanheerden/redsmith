import * as React from 'react';
import { HeadingTitle } from './header.styles';

interface Props {
  className?: string;
  title: string;
}

const Header = ({ className, title }: Props): JSX.Element => (
  <HeadingTitle className={className} variant="h4">
    {title}
  </HeadingTitle>
);

export default Header;
