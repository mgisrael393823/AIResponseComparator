import { useState } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface FileUploadProps {
  onUpload: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
}

export function FileUpload({ 
  onUpload, 
  accept = ".pdf,.doc,.docx,.txt", 
  multiple = true 
}: FileUploadProps) {
  const { toast } = useToast();
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const validateFiles = (files: File[]): File[] => {
    const acceptedTypes = accept.split(',').map(type => 
      type.trim().toLowerCase()
    );

    const validFiles = files.filter(file => {
      const fileType = '.' + file.name.split('.').pop()?.toLowerCase();
      const isValid = acceptedTypes.includes(fileType);

      if (!isValid) {
        toast({
          title: "Invalid file type",
          description: `${file.name} is not a supported file type. Supported types: ${accept}`,
          variant: "destructive",
        });
      }

      return isValid;
    });

    return validFiles;
  };

  const handleFiles = (fileList: FileList) => {
    const files = Array.from(fileList);
    if (files.length === 0) return;

    const validFiles = validateFiles(files);
    if (validFiles.length === 0) return;

    if (!multiple && validFiles.length > 1) {
      toast({
        title: "Too many files",
        description: "Please select only one file",
        variant: "destructive",
      });
      return;
    }

    onUpload(multiple ? validFiles : [validFiles[0]]);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    handleFiles(e.dataTransfer.files);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
      // Reset the input value to allow uploading the same file again
      e.target.value = '';
    }
  };

  return (
    <div
      className={`relative border-2 border-dashed rounded-lg p-6 transition-colors
        ${isDragging ? 'border-primary bg-primary/5' : 'border-border hover:border-primary hover:bg-primary/5'}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        onChange={handleFileInput}
        accept={accept}
        multiple={multiple}
        aria-label="File upload"
      />
      <div className="flex flex-col items-center justify-center gap-2 text-center">
        <Upload className="w-8 h-8 text-muted-foreground" />
        <div>
          <p className="text-sm font-medium">
            Drag & drop files here or click to select
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Supported formats: {accept.split(',').join(', ')}
          </p>
          {!multiple && (
            <p className="text-xs text-muted-foreground mt-1">
              Single file upload only
            </p>
          )}
        </div>
      </div>
    </div>
  );
}