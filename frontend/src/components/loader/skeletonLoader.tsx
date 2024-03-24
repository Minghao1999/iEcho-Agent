import React from "react";
import Skeleton from "@mui/material/Skeleton";

interface PropTypes {
  variantType: "text" | "rectangular" | "rounded" | "circular";
  width: number;
  height: number;
  numofLoaders: number;
}

const SkeletonLoader: React.FC<PropTypes> = ({
  variantType,
  width,
  height,
  numofLoaders,
}) => {
  const skeletonLoaders = [];

  for (let i = 0; i < numofLoaders; i++) {
    skeletonLoaders.push(
      <Skeleton key={i} variant={variantType} width={width} height={height} />
    );
  }

  return <div className="skeleton-loading">{skeletonLoaders}</div>;
};

export default SkeletonLoader;
