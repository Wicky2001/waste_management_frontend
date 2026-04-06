import { useEffect, useState, type FocusEvent } from 'react';
import * as Joi from 'joi';
import { Mail, Lock, Trash2, ArrowRight, Loader2, Eye, EyeOff } from 'lucide-react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { validateWithJoi, type ValidationErrors } from '../../common-shared/validation/joi';
import { useLogin } from './use-login';

type LoginFormValues = {
  email: string;
  password: string;
};

const loginSchema = Joi.object<LoginFormValues>({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.empty': 'Email address is required',
      'string.email': 'Enter a valid email address',
      'any.required': 'Email address is required',
    }),
  password: Joi.string()
    .min(6)
    .required()
    .messages({
      'string.empty': 'Password is required',
      'string.min': 'Password must be at least 6 characters',
      'any.required': 'Password is required',
    }),
}).required();

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors<LoginFormValues>>({});
  const [isFormValid, setIsFormValid] = useState(false);
  const { isSubmitting, submitLogin } = useLogin();


   useEffect(() => {
    validateForm({ email, password });
  }, [email, password]);

  const validateForm = (values: LoginFormValues) => {
    const result = validateWithJoi(loginSchema, values);

    setErrors(result.errors);
    setIsFormValid(result.isValid);
    return result;
  };

 

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isFormValid) {
      setTouched({ email: true, password: true });
      return;
    }

    submitLogin({ email, password });
  };

  const handleFieldBlur = (field: keyof LoginFormValues) => (_event: FocusEvent<HTMLInputElement>) => {
    setTouched((current) => ({
      ...current,
      [field]: true,
    }));
  };

  const showEmailError = touched.email && Boolean(errors.email);
  const showPasswordError = touched.password && Boolean(errors.password);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans text-slate-800">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Logo / Branding */}
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-[#3a6845] rounded-2xl flex items-center justify-center shadow-lg transform rotate-3">
            <Trash2 className="text-white w-8 h-8 -rotate-3" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900 tracking-tight">
          Welcome back
        </h2>
        <p className="mt-2 text-center text-sm text-slate-500 font-medium">
          Waste Management System
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl shadow-slate-200/50 sm:rounded-2xl sm:px-10 border border-slate-100">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                Email address
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  disabled={isSubmitting}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={handleFieldBlur('email')}
                  className={`focus:ring-2 focus:ring-[#3a6845]/20 focus:border-[#3a6845] block w-full pl-10 sm:text-sm rounded-lg py-2.5 border outline-none transition-all duration-200 ${
                    showEmailError ? 'border-red-400' : 'border-slate-300'
                  }`}
                  placeholder="admin@example.com"
                />
              </div>
              {showEmailError && errors.email && (
                <p className="mt-1 text-xs font-medium text-red-500">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">
                Password
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  disabled={isSubmitting}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={handleFieldBlur('password')}
                  className={`focus:ring-2 focus:ring-[#3a6845]/20 focus:border-[#3a6845] block w-full pl-10 sm:text-sm rounded-lg py-2.5 border outline-none transition-all duration-200 ${
                    showPasswordError ? 'border-red-400' : 'border-slate-300'
                  }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  disabled={isSubmitting}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-slate-700 disabled:cursor-not-allowed"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {showPasswordError && errors.password && (
                <p className="mt-1 text-xs font-medium text-red-500">{errors.password}</p>
              )}
            </div>

            {/* Options */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-[#3a6845] focus:ring-[#3a6845] border-slate-300 rounded cursor-pointer"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-700 cursor-pointer">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-[#3a6845] hover:text-[#2c5035] transition-colors">
                  Forgot your password?
                </a>
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={!isFormValid || isSubmitting}
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-[#3a6845] hover:bg-[#2c5035] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3a6845] transition-all duration-200 items-center group disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    Signing in...
                    <Loader2 className="ml-2 w-4 h-4 animate-spin" />
                  </>
                ) : (
                  <>
                    Sign in
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
        
        {/* Footer Link */}
        <p className="mt-6 text-center text-sm text-slate-500">
          Need access? <a href="#" className="font-medium text-[#3a6845] hover:text-[#2c5035]">Contact your administrator</a>
        </p>
      </div>

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </div>
  );
}

export default Login;