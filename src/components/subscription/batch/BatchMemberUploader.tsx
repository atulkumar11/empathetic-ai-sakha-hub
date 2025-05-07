
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Upload, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface BatchMemberUploaderProps {
  onUploadComplete: (emails: string[]) => void;
  maxMembers: number;
}

const BatchMemberUploader: React.FC<BatchMemberUploaderProps> = ({
  onUploadComplete,
  maxMembers
}) => {
  const [emails, setEmails] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState<string | null>(null);

  const validateEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    setError(null);
  };

  const handleAddEmails = () => {
    if (!inputValue.trim()) return;
    
    const newEmails = inputValue
      .split(/[,;\n]/)
      .map(e => e.trim())
      .filter(e => e);
    
    if (emails.length + newEmails.length > maxMembers) {
      setError(`You can only add up to ${maxMembers} members.`);
      return;
    }
    
    const invalidEmails = newEmails.filter(email => !validateEmail(email));
    if (invalidEmails.length > 0) {
      setError(`Invalid email${invalidEmails.length > 1 ? 's' : ''}: ${invalidEmails.join(', ')}`);
      return;
    }
    
    // Filter out duplicates
    const uniqueEmails = [...new Set([...emails, ...newEmails])];
    setEmails(uniqueEmails);
    setInputValue('');
  };

  const handleRemoveEmail = (emailToRemove: string) => {
    setEmails(emails.filter(email => email !== emailToRemove));
  };

  const handleSubmit = () => {
    if (emails.length === 0) {
      setError('Please add at least one email.');
      return;
    }
    
    onUploadComplete(emails);
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="members-input">Add Member Emails</Label>
        <Textarea
          id="members-input"
          placeholder="Enter email addresses (one per line, or separated by commas)"
          value={inputValue}
          onChange={handleInputChange}
          className={error ? 'border-red-500' : ''}
          rows={4}
        />
        {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
        <p className="text-xs text-muted-foreground mt-1">
          {emails.length}/{maxMembers} members
        </p>
      </div>
      
      <Button 
        type="button"
        variant="outline"
        onClick={handleAddEmails}
      >
        <Upload size={16} className="mr-2" />
        Add Emails
      </Button>
      
      {emails.length > 0 && (
        <div className="mt-4">
          <Label>Added Members ({emails.length})</Label>
          <div className="border rounded-md p-2 mt-1 min-h-[100px] max-h-[200px] overflow-y-auto">
            <div className="flex flex-wrap gap-2">
              {emails.map((email, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1 py-1.5">
                  {email}
                  <button
                    type="button"
                    onClick={() => handleRemoveEmail(email)}
                    className="ml-1 hover:text-red-500"
                  >
                    <X size={14} />
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        </div>
      )}
      
      <div className="flex justify-end pt-4">
        <Button 
          type="button" 
          onClick={handleSubmit}
          disabled={emails.length === 0}
        >
          Continue to Checkout
        </Button>
      </div>
    </div>
  );
};

export default BatchMemberUploader;
