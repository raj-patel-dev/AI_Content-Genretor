import React from "react";

// --- Once UI Flex Component ---
export const Flex = ({
  direction = "row",
  align = "stretch",
  justify = "start",
  gap = "4",
  wrap = "nowrap",
  padding,
  bg = "transparent",
  border = false,
  radius,
  className = "",
  children,
  ...props
}) => {
  const directionClasses = {
    row: "flex-row",
    column: "flex-col",
    "row-reverse": "flex-row-reverse",
    "column-reverse": "flex-col-reverse",
  };

  const alignClasses = {
    start: "items-start",
    center: "items-center",
    end: "items-end",
    baseline: "items-baseline",
    stretch: "items-stretch",
  };

  const justifyClasses = {
    start: "justify-start",
    center: "justify-center",
    end: "justify-end",
    between: "justify-between",
    around: "justify-around",
    evenly: "justify-evenly",
  };

  const gapClasses = {
    "0": "gap-0",
    "1": "gap-1",
    "2": "gap-2",
    "3": "gap-3",
    "4": "gap-4",
    "6": "gap-6",
    "8": "gap-8",
    "10": "gap-10",
    "12": "gap-12",
  };

  const bgClasses = {
    transparent: "",
    surface: "bg-slate-900/60 backdrop-blur-xl",
    card: "bg-slate-900/80 backdrop-blur-md",
    elevated: "bg-slate-800/90",
  };

  const borderClass = border ? "border border-white/10" : "";
  const radiusClass = radius === "xl" ? "rounded-2xl" : radius === "lg" ? "rounded-xl" : radius === "md" ? "rounded-lg" : radius === "full" ? "rounded-full" : "";
  const paddingClass = padding === "sm" ? "p-3" : padding === "md" ? "p-6" : padding === "lg" ? "p-8" : "";

  return (
    <div
      className={`flex ${directionClasses[direction] || ""} ${alignClasses[align] || ""} ${justifyClasses[justify] || ""} ${gapClasses[gap] || ""} ${wrap === "wrap" ? "flex-wrap" : "flex-nowrap"} ${bgClasses[bg] || ""} ${borderClass} ${radiusClass} ${paddingClass} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

// --- Once UI Grid Component ---
export const Grid = ({ cols = 1, gap = "6", className = "", children, ...props }) => {
  const colClasses = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  };

  const gapClasses = {
    "2": "gap-2",
    "4": "gap-4",
    "6": "gap-6",
    "8": "gap-8",
  };

  return (
    <div className={`grid ${colClasses[cols] || "grid-cols-1"} ${gapClasses[gap] || "gap-6"} ${className}`} {...props}>
      {children}
    </div>
  );
};

// --- Once UI Heading Component ---
export const Heading = ({ level = 2, size = "l", className = "", children, ...props }) => {
  const TagName = `h${level}`;
  const sizeClasses = {
    xl: "text-4xl sm:text-5xl font-extrabold tracking-tight text-white",
    l: "text-2xl sm:text-3xl font-bold tracking-tight text-white",
    m: "text-xl font-semibold text-white",
    s: "text-lg font-medium text-white",
  };

  return (
    <TagName className={`${sizeClasses[size] || sizeClasses.l} ${className}`} {...props}>
      {children}
    </TagName>
  );
};

// --- Once UI Text Component ---
export const Text = ({ size = "m", variant = "secondary", weight = "regular", className = "", children, ...props }) => {
  const sizeClasses = {
    xs: "text-xs",
    sm: "text-sm",
    m: "text-base",
    l: "text-lg",
  };

  const variantClasses = {
    primary: "text-white",
    secondary: "text-slate-300",
    tertiary: "text-slate-400",
    brand: "text-indigo-400",
    success: "text-emerald-400",
    danger: "text-rose-400",
    warning: "text-amber-400",
  };

  const weightClasses = {
    regular: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
  };

  return (
    <p className={`${sizeClasses[size]} ${variantClasses[variant]} ${weightClasses[weight]} ${className}`} {...props}>
      {children}
    </p>
  );
};

// --- Once UI Button Component ---
export const Button = ({
  variant = "primary",
  size = "m",
  prefixIcon,
  suffixIcon,
  loading = false,
  disabled = false,
  onClick,
  type = "button",
  className = "",
  children,
  ...props
}) => {
  const baseClasses = "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer";

  const sizeClasses = {
    s: "px-3 py-1.5 text-xs rounded-lg gap-1.5",
    m: "px-4 py-2 text-sm rounded-xl gap-2",
    l: "px-6 py-3 text-base rounded-xl gap-2.5",
  };

  const variantClasses = {
    primary: "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/25 border border-indigo-500/30 focus:ring-indigo-500",
    gradient: "bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white shadow-lg shadow-indigo-500/20 border border-indigo-400/30 focus:ring-indigo-500",
    secondary: "bg-slate-800 hover:bg-slate-700 text-white border border-white/10 focus:ring-slate-500",
    outline: "bg-transparent hover:bg-white/5 text-slate-200 border border-white/20 focus:ring-indigo-500",
    danger: "bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-600/25 focus:ring-rose-500",
    ghost: "bg-transparent hover:bg-white/10 text-slate-300 hover:text-white focus:ring-slate-500",
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {loading ? (
        <svg className="animate-spin h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : (
        prefixIcon
      )}
      <span>{children}</span>
      {!loading && suffixIcon}
    </button>
  );
};

// --- Once UI Card Component ---
export const Card = ({ variant = "glass", padding = "md", className = "", children, onClick, ...props }) => {
  const variantClasses = {
    glass: "bg-slate-900/70 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/40",
    solid: "bg-slate-900 border border-slate-800 shadow-xl",
    glow: "bg-gradient-to-b from-slate-900/90 to-indigo-950/40 backdrop-blur-xl border border-indigo-500/20 shadow-xl shadow-indigo-950/30",
  };

  const paddingClasses = {
    none: "p-0",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  return (
    <div
      onClick={onClick}
      className={`rounded-2xl transition-all duration-300 ${variantClasses[variant]} ${paddingClasses[padding]} ${onClick ? "cursor-pointer hover:border-white/20 hover:scale-[1.01]" : ""} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

// --- Once UI Tag / Badge Component ---
export const Tag = ({ variant = "neutral", size = "m", className = "", children, ...props }) => {
  const variantClasses = {
    neutral: "bg-slate-800 text-slate-300 border-slate-700/50",
    brand: "bg-indigo-500/10 text-indigo-300 border-indigo-500/30",
    success: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
    warning: "bg-amber-500/10 text-amber-300 border-amber-500/30",
    danger: "bg-rose-500/10 text-rose-300 border-rose-500/30",
    purple: "bg-purple-500/10 text-purple-300 border-purple-500/30",
  };

  const sizeClasses = {
    s: "px-2 py-0.5 text-xs font-medium rounded-md border",
    m: "px-3 py-1 text-xs font-semibold rounded-full border",
  };

  return (
    <span className={`inline-flex items-center gap-1.5 ${variantClasses[variant]} ${sizeClasses[size]} ${className}`} {...props}>
      {children}
    </span>
  );
};

// --- Once UI Input Component ---
export const Input = ({ label, error, helperText, className = "", id, ...props }) => {
  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label htmlFor={id} className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
          {label}
        </label>
      )}
      <input
        id={id}
        className={`w-full px-4 py-2.5 bg-slate-950/70 border border-white/10 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/80 focus:border-transparent transition-all duration-200 ${error ? "border-rose-500/80 focus:ring-rose-500" : ""} ${className}`}
        {...props}
      />
      {error && <p className="text-xs text-rose-400 mt-1">{error}</p>}
      {helperText && !error && <p className="text-xs text-slate-400 mt-1">{helperText}</p>}
    </div>
  );
};

// --- Once UI Select Component ---
export const Select = ({ label, error, options = [], className = "", id, children, ...props }) => {
  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label htmlFor={id} className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
          {label}
        </label>
      )}
      <select
        id={id}
        className={`w-full px-4 py-2.5 bg-slate-950/70 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/80 focus:border-transparent transition-all duration-200 ${error ? "border-rose-500/80 focus:ring-rose-500" : ""} ${className}`}
        {...props}
      >
        {children ||
          options.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-slate-900 text-white">
              {opt.label}
            </option>
          ))}
      </select>
      {error && <p className="text-xs text-rose-400 mt-1">{error}</p>}
    </div>
  );
};

// --- Once UI Banner / Alert Component ---
export const Banner = ({ type = "info", message, className = "", children }) => {
  const typeStyles = {
    info: "bg-indigo-950/40 border-indigo-500/30 text-indigo-200",
    success: "bg-emerald-950/40 border-emerald-500/30 text-emerald-200",
    warning: "bg-amber-950/40 border-amber-500/30 text-amber-200",
    error: "bg-rose-950/40 border-rose-500/30 text-rose-200",
    loading: "bg-slate-900/60 border-slate-700/50 text-slate-200",
  };

  return (
    <div className={`p-4 rounded-xl border backdrop-blur-md flex items-center gap-3 ${typeStyles[type] || typeStyles.info} ${className}`}>
      {type === "loading" && (
        <svg className="animate-spin h-5 w-5 text-indigo-400 shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      <div className="text-sm font-medium leading-relaxed">{message || children}</div>
    </div>
  );
};
