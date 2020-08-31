
import LoginLayout from './login'
import PlatformLayout from './platform';
function globalLayout(props) {
  const { location, children } = props;
  const { pathname } = location;
  if (pathname === '/' ||
    pathname === '/login' ||
    pathname === '/register' ||
    /^\/initialize/.test(pathname) ||
    /^\/exception/.test(pathname)
  ) {
    return (
      <LoginLayout>{children}</LoginLayout>
    );
  }
  console.log("PlatformLayout");
  return (<PlatformLayout {...props}>{children}</PlatformLayout>);

}

export default globalLayout;
