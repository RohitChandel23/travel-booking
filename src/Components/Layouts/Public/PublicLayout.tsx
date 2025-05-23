import { AppLayoutProps } from '../AppLayout.d';
import Footer from '../../../Shared/Footer';
import Header from '../../../Shared/Header/index';

function PublicLayout({ children }: Readonly<AppLayoutProps>): JSX.Element {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

export default PublicLayout;