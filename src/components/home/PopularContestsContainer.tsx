
import { ReactNode } from 'react';

interface PopularContestsContainerProps {
  children: ReactNode;
}

const PopularContestsContainer = ({ children }: PopularContestsContainerProps) => {
  return (
    <div className="w-full flex flex-col md:flex-row items-center justify-center gap-6">
      {children}
    </div>
  );
};

export default PopularContestsContainer;
