import Redirect from 'umi/redirect';

export default function() {
  return (
   <Redirect to={{
     pathname:'/login',
     state:{}
   }}></Redirect>
  );
}