
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Key } from 'lucide-react';

interface InviteCodeFormProps {
  onSubmit: (code: string) => Promise<boolean>;
}

const InviteCodeForm: React.FC<InviteCodeFormProps> = ({ onSubmit }) => {
  const [inviteCode, setInviteCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteCode.trim()) {
      setError('Please enter an invite code');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const success = await onSubmit(inviteCode.trim());
      if (!success) {
        setError('Invalid invite code. Please check and try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
      console.error('Error submitting invite code:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h3 className="text-lg font-medium mb-3 flex items-center">
        <Key size={18} className="text-blue-600 mr-1.5" />
        Join a Study Batch
      </h3>
      <p className="text-sm text-muted-foreground mb-3">
        Enter the invite code provided by your batch leader to join their study group.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <Input
            id="invite-code-input"
            placeholder="Enter invite code (e.g., SAKHA-ABC123)"
            value={inviteCode}
            onChange={(e) => setInviteCode(e.target.value)}
            className={error ? 'border-red-500' : ''}
          />
          {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
        </div>
        
        <Button 
          type="submit" 
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Processing...' : 'Join Batch'}
        </Button>
      </form>
    </div>
  );
};

export default InviteCodeForm;
