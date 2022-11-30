import React from 'react';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';

const renderWithRouter = (component) => ({
  ...render(
    <Router>
      {component}
    </Router>,
  ),
});

export default renderWithRouter;
