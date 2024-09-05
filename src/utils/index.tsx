import { Suspense, ReactNode } from "react";
import "./Loader.scss";

type SuspenseComponentProps = {
  children?: ReactNode; 
};

const Loading = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="loader"></div>
    </div>
  );
};

const SuspenseComponent = ({ children }: SuspenseComponentProps) => {
  return (
    <Suspense fallback={<Loading />}>
      {children || <Loading />} 
    </Suspense>
  );
};

export { Loading };
export default SuspenseComponent;
