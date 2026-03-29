import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface DetailField {
  label: string;
  value: any;
  type?: 'text' | 'badge' | 'currency' | 'date' | 'list';
  badgeColor?: string;
  span?: number;
}

interface DetailSection {
  title: string;
  fields: DetailField[];
}

interface DetailViewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  subtitle?: string;
  sections: DetailSection[];
  children?: React.ReactNode;
}

export function DetailViewDialog({
  open,
  onOpenChange,
  title,
  subtitle,
  sections,
  children
}: DetailViewDialogProps) {
  const renderField = (field: DetailField) => {
    if (field.value === undefined || field.value === null || field.value === '') {
      return <span className="italic text-muted-foreground">N/A</span>;
    }

    switch (field.type) {
      case 'badge':
        return (
          <Badge className={field.badgeColor || 'bg-muted text-muted-foreground'}>
            {String(field.value).charAt(0).toUpperCase() + String(field.value).slice(1)}
          </Badge>
        );
      case 'currency':
        return <span className="font-semibold">{typeof field.value === 'number' ? `$${field.value.toLocaleString()}` : field.value}</span>;
      case 'list':
        return Array.isArray(field.value) ? (
          <div className="flex flex-wrap gap-1">
            {field.value.map((item, i) => (
              <Badge key={i} variant="outline" className="text-xs">{item}</Badge>
            ))}
          </div>
        ) : String(field.value);
      default:
        return <span>{String(field.value)}</span>;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle className="text-xl">{title}</DialogTitle>
          <DialogDescription>
            {subtitle ? `Details for ${subtitle}` : `Detailed information for ${title}`}
          </DialogDescription>
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        </DialogHeader>

        <div className="space-y-6 pt-2">
          {sections.map((section, sIdx) => (
            <div key={sIdx}>
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                {section.title}
              </h3>
              <div className="grid grid-cols-1 gap-x-6 gap-y-3 md:grid-cols-2">
                {section.fields.map((field, fIdx) => (
                  <div key={fIdx} className={field.span === 2 ? 'md:col-span-2' : ''}>
                    <p className="text-xs font-medium text-muted-foreground mb-1">{field.label}</p>
                    <div className="text-sm">{renderField(field)}</div>
                  </div>
                ))}
              </div>
              {sIdx < sections.length - 1 && <Separator className="mt-4" />}
            </div>
          ))}
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
}