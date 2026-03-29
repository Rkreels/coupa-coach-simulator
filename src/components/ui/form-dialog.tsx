
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'number' | 'select' | 'textarea' | 'date';
  required?: boolean;
  options?: { value: string; label: string }[];
  placeholder?: string;
}

interface FormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  fields: FormField[];
  values: Record<string, any>;
  onValuesChange: (values: Record<string, any>) => void;
  onSubmit: () => void;
  loading?: boolean;
  submitText?: string;
}

export function FormDialog({
  open,
  onOpenChange,
  title,
  fields,
  values,
  onValuesChange,
  onSubmit,
  loading = false,
  submitText = 'Save'
}: FormDialogProps) {
  const handleInputChange = (name: string, value: any) => {
    onValuesChange({ ...values, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>Review the fields below and save your changes.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fields.map((field) => (
              <div key={field.name} className={`space-y-2 ${field.type === 'textarea' ? 'md:col-span-2' : ''}`}>
                <Label htmlFor={field.name}>
                  {field.label}
                  {field.required && <span className="text-destructive">*</span>}
                </Label>
                
                {field.type === 'select' ? (
                  <select
                    id={field.name}
                    value={values[field.name] || ''}
                    onChange={(e) => handleInputChange(field.name, e.target.value)}
                    required={field.required}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <option value="">Select {field.label}</option>
                    {field.options?.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : field.type === 'textarea' ? (
                  <Textarea
                    id={field.name}
                    value={values[field.name] || ''}
                    onChange={(e) => handleInputChange(field.name, e.target.value)}
                    required={field.required}
                    placeholder={field.placeholder}
                    rows={3}
                  />
                ) : (
                  <Input
                    id={field.name}
                    type={field.type}
                    value={values[field.name] || ''}
                    onChange={(e) => handleInputChange(field.name, e.target.value)}
                    required={field.required}
                    placeholder={field.placeholder}
                  />
                )}
              </div>
            ))}
          </div>
          
          <div className="flex flex-col-reverse justify-end gap-2 pt-4 sm:flex-row">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : submitText}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
