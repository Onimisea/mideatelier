import React, { ReactNode, useState } from "react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Calendar } from "@/components/ui/calendar";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";

import { useSafeMutation } from "@/lib/axios/query-client";
import { routes } from "@/app/routes";
import { format } from "date-fns";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon } from "lucide-react";

export const consultationFormSchema = z.object({
  first_name: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name cannot exceed 50 characters"),

  last_name: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name cannot exceed 50 characters"),

  email: z.email("Please enter a valid email address"),

  phone: z.string().regex(/^\d{10,11}$/, "Phone number must be 10–11 digits"),

  service_type: z.enum(
    [
      "bridal",
      "bespoke",
      "ready_to_wear",
      "corporate",
      "styling",
      "alterations",
      "cultural",
    ],
    {
      // use `message` here (z.enum does not accept `required_error`)
      message: "Please select a service type",
    }
  ),

  preferred_datetime: z.date({
    message: "Please select a valid date and time",
  }),

  notes: z.string().max(1000, "Notes cannot exceed 1000 characters").optional(),

  confirm_interest: z.boolean().refine((val) => val === true, {
    message: "You must confirm your interest in booking a consultation",
  }),

  understand_availability: z.boolean().refine((val) => val === true, {
    message:
      "You must acknowledge that consultations are by appointment and subject to availability",
  }),
});

export type ConsultationFormValues = z.infer<typeof consultationFormSchema>;

interface BookNowProps {
  triggerButtonClassName?: string;
  firstText: ReactNode;
  firstTextClassName?: string;
  secondText?: ReactNode;
  secondTextClassName?: string;
  thirdText: ReactNode;
  thirdTextClassName?: string;
}

const BookNow: React.FC<BookNowProps> = ({
  triggerButtonClassName,
  firstText,
  firstTextClassName,
  secondText,
  secondTextClassName,
  thirdText,
  thirdTextClassName,
}) => {
  const form = useForm<ConsultationFormValues>({
    resolver: zodResolver(consultationFormSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      service_type: "bridal", // or leave blank if you want user selection required
      preferred_datetime: undefined, // no date selected yet
      notes: "",
      confirm_interest: false,
      understand_availability: false,
    },
  });

  const { mutate, isPending } = useSafeMutation<
    { job: string | undefined; job_day: string; note?: string },
    any
  >({
    method: "post",
    path: routes.jobs.application.create,
  });

  const today = new Date();
  const [date, setDate] = useState<Date>(today);
  const [time, setTime] = useState<string | null>(null);

  // Mock time slots data
  const timeSlots = [
    { time: "08:30", available: false },
    { time: "09:00", available: true },
    { time: "09:30", available: true },
    { time: "10:00", available: true },
    { time: "10:30", available: true },
    { time: "11:00", available: true },
    { time: "11:30", available: true },
    { time: "12:00", available: true },
    { time: "12:30", available: false },
  ];

  async function onSubmit(values: ConsultationFormValues) {
    const formattedDate = values.preferred_datetime
      ? new Date(values.preferred_datetime).toISOString() // "2025-10-06T13:45:00.000Z"
      : null;

    console.log(formattedDate, values);
  }

  return (
    <Dialog>
      <DialogTrigger asChild className="">
        <Button className={triggerButtonClassName}>
          <span className={firstTextClassName}>{firstText}</span>
          {secondText && (
            <span className={secondTextClassName}>{secondText}</span>
          )}
          {thirdText && <span className={thirdTextClassName}>{thirdText}</span>}
        </Button>
      </DialogTrigger>

      <DialogContent
        className="md:max-w-md max-h-[80vh] overflow-y-auto [&>button]:pointer-events-auto"
        onPointerDownOutside={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <DialogHeader>
              <DialogTitle className="font-playfair text-2xl flex flex-wrap gap-2 items-center">
                <span className="text-burnt-orange font-black">Free</span>
                <span className="text-deep-navy font-semibold">
                  Consultation
                </span>
              </DialogTitle>
            </DialogHeader>

            <div className="w-full space-y-5">
              <div className="w-full flex flex-col gap-5 sm2:flex-row ">
                {/* First Name */}
                <FormField
                  control={form.control}
                  name="first_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-deep-navy">
                        First Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className={`${
                            field.value
                              ? "border-burnt-orange"
                              : "border-deep-navy"
                          } text-deep-navy px-3 py-2 text-sm rounded-md border focus:border-none focus-visible:ring-amber-400 focus-visible:ring-[1px] bg-white`}
                          placeholder="Okafor"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Last Name */}
                <FormField
                  control={form.control}
                  name="last_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-deep-navy">
                        Last Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className={`${
                            field.value
                              ? "border-burnt-orange"
                              : "border-deep-navy"
                          } text-deep-navy px-3 py-2 text-sm rounded-md border focus:border-none focus-visible:ring-amber-400 focus-visible:ring-[1px] bg-white`}
                          placeholder="Adesuwa"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="w-full flex flex-col gap-5 sm2:flex-row ">
                {" "}
                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-deep-navy">Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          className={`${
                            field.value
                              ? "border-burnt-orange"
                              : "border-deep-navy"
                          } text-deep-navy px-3 py-2 text-sm rounded-md border focus:border-none focus-visible:ring-amber-400 focus-visible:ring-[1px] bg-white`}
                          placeholder="adesuwa@example.com"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Phone */}
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-deep-navy">Phone</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="tel"
                          className={`${
                            field.value
                              ? "border-burnt-orange"
                              : "border-deep-navy"
                          } text-deep-navy px-3 py-2 text-sm rounded-md border focus:border-none focus-visible:ring-amber-400 focus-visible:ring-[1px] bg-white`}
                          placeholder="e.g. 08123456789"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="w-full flex flex-col gap-5 sm2:flex-row ">
                {/* Service Type */}
                <FormField
                  control={form.control}
                  name="service_type"
                  render={({ field }) => (
                    <FormItem className="w-[48%]">
                      <FormLabel className="text-deep-navy">
                        Service Type
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger
                            className={`${
                              field.value
                                ? "border-burnt-orange"
                                : "border-deep-navy"
                            } text-deep-navy px-3 py-2 text-sm rounded-md border focus-visible:ring-amber-400 focus-visible:ring-[1px] bg-white w-full`}
                          >
                            <SelectValue placeholder="Select a service" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="w-full border-burnt-orange">
                          <SelectItem
                            className="focus:bg-deep-navy focus:text-white"
                            value="bridal"
                          >
                            Bridal
                          </SelectItem>
                          <SelectItem
                            className="focus:bg-deep-navy focus:text-white"
                            value="bespoke"
                          >
                            Bespoke
                          </SelectItem>
                          <SelectItem
                            className="focus:bg-deep-navy focus:text-white"
                            value="ready_to_wear"
                          >
                            Ready to Wear
                          </SelectItem>
                          <SelectItem
                            className="focus:bg-deep-navy focus:text-white"
                            value="corporate"
                          >
                            Corporate
                          </SelectItem>
                          <SelectItem
                            className="focus:bg-deep-navy focus:text-white"
                            value="styling"
                          >
                            Styling
                          </SelectItem>
                          <SelectItem
                            className="focus:bg-deep-navy focus:text-white"
                            value="alterations"
                          >
                            Alterations
                          </SelectItem>
                          <SelectItem
                            className="focus:bg-deep-navy focus:text-white"
                            value="cultural"
                          >
                            Cultural
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Preferred Date & Time */}
                <FormField
                  control={form.control}
                  name="preferred_datetime"
                  render={({ field }) => (
                    <FormItem className="flex flex-col w-full">
                      <FormLabel className="text-deep-navy">
                        Preferred Date & Time
                      </FormLabel>

                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={`${
                                field.value
                                  ? "border-burnt-orange"
                                  : "border-deep-navy"
                              } text-deep-navy px-3 py-2 text-sm rounded-md border focus-visible:ring-amber-400 focus-visible:ring-[1px] bg-white w-full`}
                            >
                              {field.value ? (
                                <span>
                                  {format(field.value, "PPP")}{" "}
                                  <span className="text-muted-foreground">
                                    • {format(field.value, "p")}
                                  </span>
                                </span>
                              ) : (
                                <span>Pick a date & time</span>
                              )}
                              <CalendarIcon className="ml-2 h-4 w-4 text-burnt-orange opacity-80 group-hover:opacity-100 transition-opacity" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>

                        <PopoverContent
                          className="w-auto p-0 pointer-events-auto max-h-[80vh] overflow-hidden bg-white border border-burnt-orange shadow-md rounded-md"
                          align="start"
                          side="bottom"
                          sideOffset={6}
                        >
                          <div className="flex max-sm:flex-col">
                            {/* Calendar Section */}
                            <div className="p-4 border-r border-muted">
                              <Calendar
                                mode="single"
                                selected={date}
                                onSelect={(newDate) => {
                                  if (newDate) {
                                    setDate(newDate);
                                    setTime(null);
                                    field.onChange(newDate);
                                  }
                                }}
                                className="[&_button]:rounded-md [&_button]:text-deep-navy [&_button:hover]:bg-burnt-orange [&_button:hover]:text-white [&_button:focus-visible]:ring-2 [&_button:focus-visible]:ring-amber-400 [&_button:focus-visible]:outline-none"
                                disabled={[{ before: today }]}
                              />
                            </div>

                            {/* Time Slots Section */}
                            <div className="relative w-full sm:w-44 bg-white">
                              <div className="absolute inset-0 py-4">
                                <ScrollArea className="h-full sm:border-l border-muted">
                                  <div className="space-y-3">
                                    <div className="flex h-5 shrink-0 items-center px-4">
                                      <p className="text-sm font-semibold text-deep-navy">
                                        {format(date, "EEEE, MMM d")}
                                      </p>
                                    </div>

                                    <div className="grid gap-2 px-4 max-sm:grid-cols-2">
                                      {timeSlots.map(
                                        ({ time: timeSlot, available }) => (
                                          <Button
                                            key={timeSlot}
                                            variant={
                                              time === timeSlot
                                                ? "default"
                                                : "outline"
                                            }
                                            size="sm"
                                            className={cn(
                                              "w-full py-2 text-sm rounded-md transition-all duration-200 font-medium",
                                              time === timeSlot
                                                ? "bg-burnt-orange text-white hover:bg-burnt-orange/90"
                                                : "border border-deep-navy text-deep-navy hover:border-burnt-orange hover:text-burnt-orange bg-white",
                                              !available &&
                                                "opacity-40 cursor-not-allowed hover:border-deep-navy hover:text-deep-navy"
                                            )}
                                            onClick={() => {
                                              setTime(timeSlot);
                                              const [hours, minutes] =
                                                timeSlot.split(":");
                                              const merged = new Date(date);
                                              merged.setHours(
                                                Number(hours),
                                                Number(minutes),
                                                0,
                                                0
                                              );
                                              field.onChange(merged);
                                            }}
                                            disabled={!available}
                                          >
                                            {timeSlot}
                                          </Button>
                                        )
                                      )}
                                    </div>
                                  </div>
                                </ScrollArea>
                              </div>
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Notes */}
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-deep-navy">
                      Additional Notes
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        className={`${
                          field.value
                            ? "border-burnt-orange"
                            : "border-deep-navy"
                        } text-deep-navy px-3 py-2 text-sm rounded-md border focus:border-none focus-visible:ring-amber-400 focus-visible:ring-[1px] bg-white resize-none h-24`}
                        placeholder="Enter any special requests or notes..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Confirmations */}
              <div className="space-y-3">
                <FormField
                  control={form.control}
                  name="confirm_interest"
                  render={({ field }) => (
                    <FormItem className="flex items-start space-x-2">
                      <FormControl>
                        <Checkbox
                          id="confirm_interest"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className={`data-[state=checked]:border-burnt-orange data-[state=checked]:bg-burnt-orange data-[state=checked]:text-white dark:data-[state=checked]:border-burnt-orange dark:data-[state=checked]:bg-burnt-orange border-deep-navy mt-1 h-5 w-5`}
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal text-deep-navy">
                        I confirm my interest in booking a consultation with
                        Mide’s Atelier.
                      </FormLabel>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="understand_availability"
                  render={({ field }) => (
                    <FormItem className="flex items-start space-x-2">
                      <FormControl>
                        <Checkbox
                          id="confirm_interest"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className={`data-[state=checked]:border-burnt-orange data-[state=checked]:bg-burnt-orange data-[state=checked]:text-white dark:data-[state=checked]:border-burnt-orange dark:data-[state=checked]:bg-burnt-orange border-deep-navy mt-1 h-5 w-5`}
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal text-deep-navy">
                        I understand that consultations are by appointment and
                        subject to availability.
                      </FormLabel>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <DialogFooter className="sm:justify-start">
              <Button
                disabled={isPending}
                type="submit"
                className="w-full sm:w-[48%] bg-deep-navy hover:bg-burnt-orange text-white p-5 rounded-md transition-all duration-300"
              >
                {isPending ? "Booking..." : "Book Now"}
              </Button>

              <DialogClose asChild>
                <Button
                  type="submit"
                  variant="secondary"
                  className="w-full sm:w-[48%] p-5 bg-gray-300 hover:bg-red-500 hover:text-white"
                >
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default BookNow;
