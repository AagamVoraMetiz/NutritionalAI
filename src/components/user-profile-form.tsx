'use client';

import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {RadioGroup, RadioGroupItem} from '@/components/ui/radio-group';
import {UserProfile} from '@/services/bmr';

const formSchema = z.object({
  age: z.number().min(1, {message: 'Age must be greater than 0'}),
  gender: z.enum(['Male', 'Female']),
  height: z.number().min(1, {message: 'Height must be greater than 0'}),
  weight: z.number().min(1, {message: 'Weight must be greater than 0'}),
  bmr: z.number().optional(),
});

type UserProfileFormValues = z.infer<typeof formSchema>;

interface UserProfileFormProps {
  onProfileSubmit: (profile: UserProfile) => void;
}

export function UserProfileForm({onProfileSubmit}: UserProfileFormProps) {
  const [bmr, setBMR] = useState<number | null>(null);

  const form = useForm<UserProfileFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      age: 25,
      gender: 'Male',
      height: 175,
      weight: 70,
    },
  });

  function onSubmit(values: UserProfileFormValues) {
    console.log(values);
    onProfileSubmit({
      age: values.age,
      gender: values.gender,
      height: values.height,
      weight: values.weight,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="age"
          render={({field}) => (
            <FormItem>
              <FormLabel>Age</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Enter your age" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gender"
          render={({field}) => (
            <FormItem>
              <FormLabel>Gender</FormLabel>
              <RadioGroup
                defaultValue={field.value}
                onValueChange={field.onChange}
                className="flex flex-row space-x-2">
                <FormItem className="space-y-0">
                  <FormControl>
                    <RadioGroupItem value="Male" id="male" />
                  </FormControl>
                  <FormLabel htmlFor="male">Male</FormLabel>
                </FormItem>
                <FormItem className="space-y-0">
                  <FormControl>
                    <RadioGroupItem value="Female" id="female" />
                  </FormControl>
                  <FormLabel htmlFor="female">Female</FormLabel>
                </FormItem>
              </RadioGroup>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="height"
          render={({field}) => (
            <FormItem>
              <FormLabel>Height (cm)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter your height in cm"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="weight"
          render={({field}) => (
            <FormItem>
              <FormLabel>Weight (kg)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter your weight in kg"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

