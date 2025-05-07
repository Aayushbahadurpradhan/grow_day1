import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
export default function WeatherForm({ onSubmit }) {
  const form = useForm({
    defaultValues: { city: "" },
  });

  const handleFormSubmit = (data) => {
    onSubmit(data.city);
  };

  return (
    <Form methods={form} onSubmit={form.handleSubmit(handleFormSubmit)} className="w-full max-w-md space-y-4 bg-white dark:bg-blue-800 text-white p-6 rounded-xl shadow-lg">
      <FormField
        name="city"
        control={form.control}
        rules={{ required: "City name is required" }}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-semibold">City Name</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Enter city" className="rounded-md" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button type="submit" className="w-full bg-blue-400">
        <i className="fas fa-magnifying-glass mr-2"></i> Get Weather
      </Button>
    </Form>
  );
}
