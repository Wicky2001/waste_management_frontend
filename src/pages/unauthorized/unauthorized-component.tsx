import { ShieldAlert } from "lucide-react";

const Unauthorized = () => {
  return (
    <div className="h-full w-full bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-xl bg-white border border-slate-200 rounded-2xl p-8 shadow-sm text-center">
        <div className="mx-auto w-14 h-14 rounded-full bg-red-50 border border-red-100 flex items-center justify-center">
          <ShieldAlert className="text-red-500" />
        </div>
        <h1 className="mt-4 text-2xl font-bold text-slate-900">Unauthorized</h1>
        <p className="mt-2 text-sm text-slate-500 font-medium">
          You do not have permission to access this page.
        </p>
      </div>
    </div>
  );
};

export default Unauthorized;
