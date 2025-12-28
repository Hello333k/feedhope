import { type ReactNode } from "react";

interface StatCardProps {
  icon: ReactNode;
  value: ReactNode;
  label: string;
}

const StatCard = ({ icon, value, label }: StatCardProps) => {
  return (
    <div className="bg-card rounded-2xl p-8 card-elevated text-center">
      <div className="w-16 h-16 rounded-full gradient-primary mx-auto mb-4 flex items-center justify-center">
        {icon}
      </div>
      <div className="font-display text-4xl font-bold text-foreground mb-2">
        {value}
      </div>
      <p className="text-muted-foreground">{label}</p>
    </div>
  );
};

export default StatCard;
