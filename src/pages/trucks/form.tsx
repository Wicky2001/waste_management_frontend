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

const truckSchema = z.object({
  number_plate: z.string().min(1, "Number plate is required"),
  status: z.number().min(1, "Status is required"),
  capacity_liters: z.string().optional(),
});

type TruckFormValues = z.infer<typeof truckSchema>;

interface TruckFormProps {
  mode: Mode;
  patchData: TableRow | null;
  onSubmitSuccess: (data: TruckFormValues) => void;
}

const TruckForm = ({ mode, patchData, onSubmitSuccess }: TruckFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(Statuses[0]);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<TruckFormValues>({
    resolver: zodResolver(truckSchema),
    defaultValues: {
      number_plate: "",
      status: 1,
      capacity_liters: "",
    },
  });

  useEffect(() => {
    if (mode === Mode.EDIT && patchData) {
      const statusValue = (patchData.status as number) || 1;
      const statusObj =
        Statuses.find((s) => s.value === statusValue) || Statuses[0];
      setSelectedStatus(statusObj);

      reset({
        number_plate: (patchData.number_plate as string) || "",
        status: statusValue,
        capacity_liters: (patchData.capacity_liters as string) || "",
      });
    } else if (mode === Mode.ADD) {
      setSelectedStatus(Statuses[0]);
      reset({ number_plate: "", status: 1, capacity_liters: "" });
    }
  }, [patchData, mode, reset]);

  const handleProcessSubmit = async (data: TruckFormValues) => {
    setIsSubmitting(true);
    setSuccess(false);

    try {
      if (mode === Mode.EDIT && patchData) {
        console.log(`Patching ID ${patchData.id}:`, data);
      } else {
        console.log("Creating New Truck:", data);
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
          Number Plate <span className="text-red-500">*</span>
        </label>
        <input
          {...register("number_plate")}
          placeholder="e.g. ABC-1234"
          className={`w-full px-4 py-2.5 bg-emerald-50/30 border rounded-xl outline-none transition-all focus:ring-4 text-black ${
            errors.number_plate
              ? "border-red-200 focus:ring-red-50"
              : "border-emerald-100 focus:ring-emerald-100 focus:border-emerald-500"
          }`}
        />
        {errors.number_plate && (
          <p className="text-xs font-bold text-red-500 flex items-center gap-1">
            <AlertCircle size={12} /> {errors.number_plate.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-bold text-emerald-800">
          Capacity (Liters){" "}
          <span className="text-slate-400 text-xs font-normal">(optional)</span>
        </label>
        <input
          {...register("capacity_liters")}
          placeholder="e.g. 5000"
          type="number"
          className={`w-full px-4 py-2.5 bg-emerald-50/30 border rounded-xl outline-none transition-all focus:ring-4 text-black ${
            errors.capacity_liters
              ? "border-red-200 focus:ring-red-50"
              : "border-emerald-100 focus:ring-emerald-100 focus:border-emerald-500"
          }`}
        />
        {errors.capacity_liters && (
          <p className="text-xs font-bold text-red-500 flex items-center gap-1">
            <AlertCircle size={12} /> {errors.capacity_liters.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-bold text-emerald-800">
          Truck Status <span className="text-red-500">*</span>
        </label>
        <Listbox
          value={selectedStatus}
          onChange={(status) => {
            setSelectedStatus(status);
            setValue("status", status.value);
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

export default TruckForm;
