import React from "react";

export default function PlaylistCard({ data, onClick }) {
  const image = data.images[0].url;

  return (
    <div className="w-40">
      {image && (
        <img
          src={image}
          alt={data.name}
          className="w-40 h-40 rounded-md object-cover cursor-pointer"
          onClick={onClick}
        />
      )}
      <h2 className="text-[13px] text-white font-bold mt-2 text-center truncate">
        {data.name}
      </h2>
    </div>
  );
}
