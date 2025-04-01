import { AppLayoutProps } from '../AppLayout.d';
import Header from '../../Header';
import Footer from '../../Footer';
function PrivateLayout({ children }: AppLayoutProps): JSX.Element {
  return (
    <>
      <Header />
      {children}
      { <Footer />}
    </>
  );
}

export default PrivateLayout;
