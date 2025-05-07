
import React from "react";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export function SectionHeader({ title, subtitle, actions }: SectionHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
      <div>
        <h2 className="text-2xl font-bold">{title}</h2>
        {subtitle && (
          <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
        )}
      </div>
      {actions && <div className="mt-3 sm:mt-0 flex items-center">{actions}</div>}
    </div>
  );
}
