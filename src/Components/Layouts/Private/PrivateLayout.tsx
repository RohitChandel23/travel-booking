import { AppLayoutProps } from '../AppLayout.d';
import Header from '../../../Shared/Header';
import Footer from '../../../Shared/Footer';


function PrivateLayout({ children }: Readonly <AppLayoutProps>): JSX.Element {
  return (
    <>
      <Header />
      {children}
      { <Footer />}
    </>
  );
}

export default PrivateLayout;
