import {lazy} from 'react';
import {Route, Routes, Navigate} from 'react-router-dom';

const HomePage = lazy(() => import('./home'));

export const Routing = () => {
  return (
    <Routes>
      <Route index={true} path="/" element={<HomePage/>}/>

      <Route path="*" element={<Navigate to="/"/>}/>
    </Routes>
  );
};