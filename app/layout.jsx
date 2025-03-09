import "@styles/globals.css";
import Nav from "./components/Nav";
import Provider from "./components/Provider";

export const metadata = {
  title: "Promptopia",
  description: "Discover and share AI Prompt",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body className="overflow-x-hidden">
        <Provider>
          <div className="main">
            <div className="gradient" />
            <Nav />
            <main className="app">{children}</main>
          </div>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
