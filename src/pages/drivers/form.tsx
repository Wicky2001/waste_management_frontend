import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CheckCircle2, Loader2, AlertCircle, ChevronDown } from "lucide-react";
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/react";
import { Mode, Statuses } from "../../common-shared/helpers";
import type { TableRow } from "../../common-shared/types";

const driverSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  status: z.string().min(1, "Status is required"),
});

type DriverFormValues = z.infer<typeof driverSchema>;

interface DriverFormProps {
  mode: Mode;
  patchData: TableRow | null;
  onSubmitSuccess: (data: DriverFormValues) => void;
}

const DriverForm = ({ mode, patchData, onSubmitSuccess }: DriverFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(Statuses[0]);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<DriverFormValues>({
    resolver: zodResolver(driverSchema),
    defaultValues: {
      name: "",
      phone: "",
      status: "active",
    },
  });

  useEffect(() => {
    if (mode === Mode.EDIT && patchData) {
      reset({
        name: (patchData.name as string) || "",
        phone: (patchData.phone as string) || "",
        status: (patchData.status as string) || "active",
      });
    } else if (mode === Mode.ADD) {
      reset({ name: "", phone: "", status: "active" });
    }
  }, [patchData, mode, reset]);

  const handleProcessSubmit = async (data: DriverFormValues) => {
    setIsSubmitting(true);
    setSuccess(false);

    try {
      if (mode === Mode.EDIT && patchData) {
        console.log(`Patching ID ${patchData.id}:`, data);
      } else {
        console.log("Creating New Driver:", data);
      }

      await new Promise((resolve) => setTimeout(resolve, 1200));

      setSuccess(true);
      onSubmitSuccess(data);
      if (mode === Mode.ADD) reset();
    } catch (error) {
      console.error("Submission failed", error);
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSuccess(false), 3000);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleProcessSubmit)}
      className="space-y-6 py-4"
    >
      <div className="space-y-2">
        <label className="text-sm font-bold text-emerald-800">
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          {...register("name")}
          placeholder="e.g. John Doe"
          className={`w-full px-4 py-2.5 bg-emerald-50/30 border rounded-xl outline-none transition-all focus:ring-4 text-black ${
            errors.name
              ? "border-red-200 focus:ring-red-50"
              : "border-emerald-100 focus:ring-emerald-100 focus:border-emerald-500"
          }`}
        />
        {errors.name && (
          <p className="text-xs font-bold text-red-500 flex items-center gap-1">
            <AlertCircle size={12} /> {errors.name.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-bold text-emerald-800">
          Phone Number <span className="text-red-500">*</span>
        </label>
        <input
          {...register("phone")}
          placeholder="+1 (555) 000-0000"
          className={`w-full px-4 py-2.5 bg-emerald-50/30 border rounded-xl outline-none transition-all focus:ring-4 text-black ${
            errors.phone
              ? "border-red-200 focus:ring-red-50"
              : "border-emerald-100 focus:ring-emerald-100 focus:border-emerald-500"
          }`}
        />
        {errors.phone && (
          <p className="text-xs font-bold text-red-500 flex items-center gap-1">
            <AlertCircle size={12} /> {errors.phone.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-bold text-emerald-800">
          Driver Status <span className="text-red-500">*</span>
        </label>
        <Listbox
          value={selectedStatus}
          onChange={(status) => {
            setSelectedStatus(status);
            setValue("status", status.key);
          }}
        >
          <div className="relative">
            <ListboxButton
              className={`w-full px-4 py-2.5 bg-emerald-50/30 border rounded-xl outline-none transition-all focus:ring-4 cursor-pointer text-left flex items-center justify-between ${
                errors.status
                  ? "border-red-200 focus:ring-red-50"
                  : "border-emerald-100 focus:ring-emerald-100 focus:border-emerald-500 hover:bg-emerald-50"
              }`}
            >
              <span className="text-gray-900">{selectedStatus.key}</span>
              <ChevronDown
                size={18}
                className="text-emerald-600 data-open:rotate-180 transition-transform duration-200"
              />
            </ListboxButton>
            <ListboxOptions className="absolute top-full left-0 w-full mt-1 rounded-xl border border-emerald-200 bg-white p-1 shadow-lg focus:outline-none">
              {Statuses.map((status) => (
                <ListboxOption
                  key={status.value}
                  value={status}
                  className="py-3 px-4 cursor-pointer select-none transition-colors rounded-lg text-gray-800 data-focus:bg-emerald-100 data-focus:text-emerald-800 data-selected:bg-emerald-200 data-selected:text-emerald-900 data-selected:font-medium"
                >
                  {status.key}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </div>
        </Listbox>
        {errors.status && (
          <p className="text-xs font-bold text-red-500 flex items-center gap-1">
            <AlertCircle size={12} /> {errors.status.message}
          </p>
        )}
      </div>

      {success && (
        <div className="flex items-center gap-3 p-4 bg-emerald-500 text-white rounded-2xl shadow-lg animate-in fade-in zoom-in-95">
          <CheckCircle2 size={20} />
          <p className="text-sm font-bold">Changes saved successfully!</p>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-3 disabled:opacity-70 shadow-lg shadow-emerald-100 active:scale-[0.98]"
      >
        {isSubmitting ? (
          <Loader2 className="animate-spin" size={20} />
        ) : (
          <span>Save</span>
        )}
      </button>
    </form>
  );
};

export default DriverForm;
