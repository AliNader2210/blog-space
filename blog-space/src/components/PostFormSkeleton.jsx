import React from "react";

function PostFormSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 w-fit animate-pulse">
        <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
        <div className="w-32 h-4 bg-gray-300 rounded"></div>
      </div>
      <form className="p-5 bg-gray-200 rounded-2xl border border-gray-300 my-2 animate-pulse">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1">
            <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
            <div className="w-24 h-4 bg-gray-300 rounded"></div>
          </div>
          <div className="w-48 h-3 bg-gray-300 rounded"></div>
        </div>
        <div className="flex flex-col gap-3 mt-5">
          <div className="flex flex-col gap-1">
            <label className="font-semibold text-sm w-full bg-gray-300 h-4 rounded"></label>
            <div className="w-full h-10 bg-gray-300 rounded-lg"></div>
            <div className="w-32 h-3 bg-gray-300 rounded"></div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-semibold text-sm w-full bg-gray-300 h-4 rounded"></label>
            <div className="w-full h-20 bg-gray-300 rounded-lg"></div>
            <div className="w-32 h-3 bg-gray-300 rounded"></div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-semibold text-sm w-full bg-gray-300 h-4 rounded"></label>
            <div className="flex items-center gap-3">
              <div className="w-full h-10 bg-gray-300 rounded-lg"></div>
              <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
            </div>
            <div className="w-32 h-3 bg-gray-300 rounded"></div>
          </div>
          <div className="flex gap-4 flex-wrap">
            <button
              type="button"
              className="w-full h-10 bg-gray-300 rounded-lg animate-pulse"
            ></button>
            <div className="w-full h-10 bg-gray-300 rounded-lg animate-pulse"></div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default PostFormSkeleton;
