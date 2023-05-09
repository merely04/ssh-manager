import {Navigate, Route, Routes} from 'react-router-dom';

import HomePage from '~/pages/home';

export const Routing = () => {
  return (
    <Routes>
      <Route index={true} path="/" element={<HomePage />} />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
