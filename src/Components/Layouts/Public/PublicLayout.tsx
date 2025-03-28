import { AppLayoutProps } from '../AppLayout.d';
// import Navbar from './Navbar';
import Footer from '../../Footer/index';
import Header from '../../Header/index';

function PublicLayout({ children }: AppLayoutProps): JSX.Element {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

export default PublicLayout;
