import { Navbar } from "../Navbar";

type MainLayoutProps = React.PropsWithChildren<{}>;

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}
