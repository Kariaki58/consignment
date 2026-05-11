import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeader({ title, subtitle, description, centered = false, className }: SectionHeaderProps) {
  return (
    <div className={cn("mb-12", centered && "text-center", className)}>
      {subtitle && (
        <span className="text-primary font-bold text-sm uppercase tracking-widest mb-3 block">
          {subtitle}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4">
        {title}
      </h2>
      {description && (
        <p className={cn("text-muted-foreground max-w-2xl text-lg", centered && "mx-auto")}>
          {description}
        </p>
      )}
    </div>
  );
}
