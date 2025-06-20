'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Calendar as CalendarIcon, Send } from 'lucide-react';

export default function BookingCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const { toast } = useToast();

  const handleBooking = () => {
    if (date) {
      toast({
        title: 'Booking Request Sent!',
        description: `Your request to visit on ${date.toLocaleDateString()} has been sent to the landlord.`,
        variant: 'default',
      });
    } else {
      toast({
        title: 'No Date Selected',
        description: 'Please select a date for your visit.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CalendarIcon className="h-5 w-5" />
          <span>Request a Visit</span>
        </CardTitle>
        <CardDescription>Select a date to schedule a viewing.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
          disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() - 1))}
        />
        <Button onClick={handleBooking} className="w-full">
          <Send className="mr-2 h-4 w-4" />
          Send Request
        </Button>
      </CardContent>
    </Card>
  );
}
