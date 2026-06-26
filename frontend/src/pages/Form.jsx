import { useState } from "react";
import { useForm } from "react-hook-form";

const API_URL = "https://pricesmart20240080.onrender.com/api/registerCustomers/";

const CustomerForm = ({ onSuccess }) => {
  const [apiError, setApiError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      lastName: "",
      birthdate: "",
      email: "",
      password: "",
      isVerified: false,
      loginAttempts: 0,
      timeout: "",
    },
  });

  const handleFormSubmit = async (data) => {
    setApiError(null);
    setSuccessMsg(null);

    const body = {
      ...data,
      isVerified: Boolean(data.isVerified),
      loginAttempts: Number(data.loginAttempts),
      birthdate: data.birthdate ? new Date(data.birthdate).toISOString() : undefined,
      timeout: data.timeout ? new Date(data.timeout).toISOString() : undefined,
    };

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.message || `Error ${response.status}`);
      }

      const result = await response.json();
      setSuccessMsg("Cliente guardado correctamente.");
      reset();
      onSuccess?.(result);
    } catch (err) {
      setApiError(err.message || "Error al conectar con la API.");
    }
  };

  return (
    <div className="mx-auto w-full max-w-lg rounded-2xl border border-white/40 bg-white/65 p-6 shadow-md backdrop-blur-sm">
      <h2 className="mb-6 text-2xl font-semibold text-gray-900">
        Registro de cliente
      </h2>

      {apiError && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {apiError}
        </div>
      )}
      {successMsg && (
        <div className="mb-4 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          {successMsg}
        </div>
      )}

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        {/* Name + Last Name */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Nombre
            </label>
            <input
              {...register("name", {
                required: "El nombre es requerido",
                minLength: { value: 2, message: "Mínimo 2 caracteres" },
              })}
              type="text"
              placeholder="John"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-800 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Apellido
            </label>
            <input
              {...register("lastName", {
                required: "El apellido es requerido",
                minLength: { value: 2, message: "Mínimo 2 caracteres" },
              })}
              type="text"
              placeholder="Doe"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-800 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
            />
            {errors.lastName && (
              <p className="mt-1 text-xs text-red-500">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        {/* Birthdate */}
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Fecha de nacimiento
          </label>
          <input
            {...register("birthdate", { required: "La fecha de nacimiento es requerida" })}
            type="date"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-800 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
          />
          {errors.birthdate && (
            <p className="mt-1 text-xs text-red-500">{errors.birthdate.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Email
          </label>
          <input
            {...register("email", {
              required: "El email es requerido",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Formato de email inválido",
              },
            })}
            type="email"
            placeholder="john@empresa.com"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-800 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Contraseña
          </label>
          <input
            {...register("password", {
              required: "La contraseña es requerida",
              minLength: { value: 8, message: "Mínimo 8 caracteres" },
            })}
            type="password"
            placeholder="••••••••"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-800 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
          />
          {errors.password && (
            <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>
          )}
        </div>

        {/* Login Attempts + Timeout */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Intentos de login
            </label>
            <input
              {...register("loginAttempts", {
                min: { value: 0, message: "No puede ser negativo" },
                max: { value: 10, message: "Máximo 10 intentos" },
                valueAsNumber: true,
              })}
              type="number"
              min={0}
              max={10}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-800 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
            />
            {errors.loginAttempts && (
              <p className="mt-1 text-xs text-red-500">{errors.loginAttempts.message}</p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Timeout
            </label>
            <input
              {...register("timeout")}
              type="datetime-local"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-800 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
            />
          </div>
        </div>

        {/* isVerified */}
        <div className="flex items-center gap-3 rounded-xl bg-slate-100/75 px-4 py-3">
          <input
            {...register("isVerified")}
            id="isVerified"
            type="checkbox"
            className="h-4 w-4 rounded border-slate-300 accent-amber-500"
          />
          <label htmlFor="isVerified" className="text-sm font-medium text-slate-700">
            Cliente verificado
          </label>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={() => { reset(); setApiError(null); setSuccessMsg(null); }}
            className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
          >
            Limpiar
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 rounded-xl bg-amber-400 px-4 py-2 text-sm font-semibold text-amber-900 transition hover:bg-amber-500 disabled:opacity-50"
          >
            {isSubmitting ? "Guardando..." : "Guardar cliente"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CustomerForm;
