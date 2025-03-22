import React from "react";
import GlassCard2 from "../glasses/GlassCard2";
import { useFetchAllGlassesQuery } from "../../redux/features/glasses/glassApi";

const Recommend = () => {
  const { data: glasses = [] } = useFetchAllGlassesQuery();

  return (
    <div className="py-16">
      <h2 className="text-3xl font-semibold mb-6">Recommended for you</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {glasses.length > 0 &&
          glasses
            .slice(8, 18)
            .map((glass, index) => <GlassCard2 key={index} glass={glass} />)}
      </div>
    </div>
  );
};

export default Recommend;
