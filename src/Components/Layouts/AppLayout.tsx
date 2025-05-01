import PrivateLayout from './Private/PrivateLayout';
import PublicLayout from './Public/PublicLayout';
import { AppLayoutProps } from './AppLayout.d';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

function AppLayout({ isAuthenticated, children }: AppLayoutProps) {
  const location =useLocation();
  useEffect(()=>{
    toast.dismiss();
  },[location.pathname])
  return isAuthenticated ? (
    <PrivateLayout>{children}</PrivateLayout>
  ) : (
    <PublicLayout>{children}</PublicLayout>
  );
}

export default AppLayout;
