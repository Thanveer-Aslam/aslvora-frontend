import StatCard from "./StatCard";
import { ArrowUpRight } from "lucide-react";

const StatsGrid = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <StatCard
          key={stat.title}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          color={stat.color}
          bgColor={stat.bgColor}
        >
          {stat.linkText && (
            <button
              onClick={stat.onClick}
              className="flex items-center gap-1 text-sm font-medium text-blue-600 transition hover:text-blue-700"
            >
              {stat.linkText}
              <ArrowUpRight size={16} />
            </button>
          )}
        </StatCard>
      ))}
    </div>
  );
};

export default StatsGrid;
