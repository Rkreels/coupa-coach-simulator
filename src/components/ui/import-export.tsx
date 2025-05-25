
import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ImportExportProps<T> {
  data: T[];
  onImport: (data: T[]) => void;
  filename: string;
  headers: Record<keyof T, string>;
}

export function ImportExport<T>({ data, onImport, filename, headers }: ImportExportProps<T>) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const exportToCSV = () => {
    try {
      const headerRow = Object.values(headers).join(',');
      const dataRows = data.map(item => 
        Object.keys(headers).map(key => {
          const value = item[key as keyof T];
          return typeof value === 'string' && value.includes(',') 
            ? `"${value}"` 
            : String(value);
        }).join(',')
      );
      
      const csvContent = [headerRow, ...dataRows].join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${filename}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast({
        title: "Export Successful",
        description: `${data.length} records exported to ${filename}.csv`,
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "There was an error exporting the data.",
        variant: "destructive",
      });
    }
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const csv = e.target?.result as string;
        const lines = csv.split('\n').filter(line => line.trim());
        const headerKeys = Object.keys(headers);
        
        const importedData = lines.slice(1).map((line, index) => {
          const values = line.split(',').map(val => val.replace(/"/g, '').trim());
          const item: any = { id: `imported-${Date.now()}-${index}` };
          
          headerKeys.forEach((key, idx) => {
            item[key] = values[idx] || '';
          });
          
          return item as T;
        });

        onImport(importedData);
        toast({
          title: "Import Successful",
          description: `${importedData.length} records imported successfully.`,
        });
      } catch (error) {
        toast({
          title: "Import Failed",
          description: "There was an error importing the data. Please check the file format.",
          variant: "destructive",
        });
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="flex gap-2">
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv"
        onChange={handleImport}
        className="hidden"
      />
      <Button
        variant="outline"
        size="sm"
        onClick={() => fileInputRef.current?.click()}
      >
        <Upload className="h-4 w-4 mr-2" />
        Import CSV
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={exportToCSV}
        disabled={data.length === 0}
      >
        <Download className="h-4 w-4 mr-2" />
        Export CSV
      </Button>
    </div>
  );
}
