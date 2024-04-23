import { ReactNode } from "react";

interface BackgroundProps {
  children: ReactNode;
}

const Background: React.FC<BackgroundProps> = ({ children }) => {
  return (
    <div className="bg-netflixBackground w-screen h-screen ">
      <div className="flex flex-col justify-center items-center gap-8 bg-gradient-to-b from-black via-transparent to-black h-full w-screen ">
        {children}
      </div>
    </div>
  );
};

export default Background;
