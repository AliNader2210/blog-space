import React from "react";

function HomeSkeleton() {
  const skeletons = [1, 2, 3];
  return (
    <div>
      <div className="fixed bottom-8 right-8 bg-gray-300 rounded-full w-14 h-14 animate-pulse z-10"></div>
      <div className="flex flex-col gap-6 py-10">
        {skeletons.map((skeleton) => (
          <div key={skeleton} className="bg-white p-4 rounded-lg">
            <div className="flex md:flex-row flex-col">
              <div className="w-full md:w-5/12 h-48 bg-gray-300 animate-pulse rounded-lg"></div>
              <div className="flex flex-col grow p-4">
                <div className="h-6 bg-gray-300 animate-pulse rounded mb-2"></div>
                <div className="h-4 bg-gray-300 animate-pulse rounded mb-4"></div>
                <div className="flex items-center gap-1.5">
                  <div className="w-4 h-4 bg-gray-300 animate-pulse rounded-full"></div>
                  <div className="h-4 bg-gray-300 animate-pulse rounded w-24"></div>
                </div>
                <div className="flex mt-4">
                  <button className="bg-gray-300 animate-pulse rounded-lg h-10 w-24 mr-2"></button>
                  <button className="bg-gray-300 animate-pulse rounded-lg h-10 w-24"></button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomeSkeleton;
