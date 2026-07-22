import React from 'react';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { AlertCircle, CheckCircle2, Search, Upload, Plus, Minus } from 'lucide-react';

// ---------------------------------------------------------------------------
// 1. FormField - Wrapper component
// ---------------------------------------------------------------------------
interface FormFieldProps {
  label: string;
  required?: boolean;
  error?: string;
  helpText?: string;
  children: React.ReactNode;
  className?: string;
  htmlFor?: string;
}

export function FormField({
  label,
  required,
  error,
  helpText,
  children,
  className,
  htmlFor,
}: FormFieldProps) {
  const helpTextId = htmlFor ? `${htmlFor}-help` : undefined;
  const errorId = htmlFor ? `${htmlFor}-error` : undefined;
  const describedBy =
    [helpText ? helpTextId : null, error ? errorId : null]
      .filter(Boolean)
      .join(' ') || undefined;

  return (
    <div className={cn('space-y-1.5', className)}>
      <Label htmlFor={htmlFor}>
        {label}
        {required && <span className="text-cube-red"> *</span>}
      </Label>
      {React.isValidElement(children) && describedBy
        ? React.cloneElement(children as React.ReactElement<any>, {
            'aria-describedby': describedBy,
          })
        : children}
      {helpText && (
        <p id={helpTextId} className="text-xs text-muted-foreground">
          {helpText}
        </p>
      )}
      {error && (
        <p
          id={errorId}
          className="flex items-center gap-1.5 text-sm text-cube-red"
        >
          <AlertCircle className="h-4 w-4" />
          {error}
        </p>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Shared input props
// ---------------------------------------------------------------------------
interface BaseInputProps {
  label: string;
  required?: boolean;
  error?: string;
  helpText?: string;
}

// ---------------------------------------------------------------------------
// 2. TextInput
// ---------------------------------------------------------------------------
interface TextInputProps
  extends BaseInputProps,
    React.InputHTMLAttributes<HTMLInputElement> {}

export function TextInput({
  label,
  required,
  error,
  helpText,
  className,
  id,
  ...props
}: TextInputProps) {
  const helpTextId = id ? `${id}-help` : undefined;
  const errorId = id ? `${id}-error` : undefined;
  const describedBy =
    [helpText ? helpTextId : null, error ? errorId : null]
      .filter(Boolean)
      .join(' ') || undefined;

  return (
    <FormField
      label={label}
      required={required}
      error={error}
      helpText={helpText}
      htmlFor={id}
      className={className}
    >
      <Input
        id={id}
        aria-invalid={!!error}
        aria-describedby={describedBy}
        {...props}
      />
    </FormField>
  );
}

// ---------------------------------------------------------------------------
// 3. EmailInput
// ---------------------------------------------------------------------------
interface EmailInputProps
  extends BaseInputProps,
    React.InputHTMLAttributes<HTMLInputElement> {}

export function EmailInput({
  label,
  required,
  error,
  helpText,
  className,
  id,
  ...props
}: EmailInputProps) {
  const helpTextId = id ? `${id}-help` : undefined;
  const errorId = id ? `${id}-error` : undefined;
  const describedBy =
    [helpText ? helpTextId : null, error ? errorId : null]
      .filter(Boolean)
      .join(' ') || undefined;

  return (
    <FormField
      label={label}
      required={required}
      error={error}
      helpText={helpText}
      htmlFor={id}
      className={className}
    >
      <Input
        type="email"
        id={id}
        aria-invalid={!!error}
        aria-describedby={describedBy}
        {...props}
      />
    </FormField>
  );
}

// ---------------------------------------------------------------------------
// 4. PhoneInput
// ---------------------------------------------------------------------------
interface PhoneInputProps
  extends BaseInputProps,
    React.InputHTMLAttributes<HTMLInputElement> {}

export function PhoneInput({
  label,
  required,
  error,
  helpText,
  className,
  id,
  ...props
}: PhoneInputProps) {
  const helpTextId = id ? `${id}-help` : undefined;
  const errorId = id ? `${id}-error` : undefined;
  const describedBy =
    [helpText ? helpTextId : null, error ? errorId : null]
      .filter(Boolean)
      .join(' ') || undefined;

  return (
    <FormField
      label={label}
      required={required}
      error={error}
      helpText={helpText}
      htmlFor={id}
      className={className}
    >
      <Input
        type="tel"
        id={id}
        aria-invalid={!!error}
        aria-describedby={describedBy}
        {...props}
      />
    </FormField>
  );
}

// ---------------------------------------------------------------------------
// 5. NumberInput
// ---------------------------------------------------------------------------
interface NumberInputProps
  extends BaseInputProps,
    React.InputHTMLAttributes<HTMLInputElement> {}

export function NumberInput({
  label,
  required,
  error,
  helpText,
  className,
  id,
  ...props
}: NumberInputProps) {
  const helpTextId = id ? `${id}-help` : undefined;
  const errorId = id ? `${id}-error` : undefined;
  const describedBy =
    [helpText ? helpTextId : null, error ? errorId : null]
      .filter(Boolean)
      .join(' ') || undefined;

  return (
    <FormField
      label={label}
      required={required}
      error={error}
      helpText={helpText}
      htmlFor={id}
      className={className}
    >
      <Input
        type="number"
        id={id}
        aria-invalid={!!error}
        aria-describedby={describedBy}
        {...props}
      />
    </FormField>
  );
}

// ---------------------------------------------------------------------------
// 6. TextAreaField
// ---------------------------------------------------------------------------
interface TextAreaFieldProps {
  label: string;
  required?: boolean;
  error?: string;
  helpText?: string;
  rows?: number;
  placeholder?: string;
  id?: string;
  name?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
}

export function TextAreaField({
  label,
  required,
  error,
  helpText,
  rows = 4,
  placeholder,
  id,
  name,
  value,
  onChange,
}: TextAreaFieldProps) {
  const helpTextId = id ? `${id}-help` : undefined;
  const errorId = id ? `${id}-error` : undefined;
  const describedBy =
    [helpText ? helpTextId : null, error ? errorId : null]
      .filter(Boolean)
      .join(' ') || undefined;

  return (
    <FormField
      label={label}
      required={required}
      error={error}
      helpText={helpText}
      htmlFor={id}
    >
      <Textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
        placeholder={placeholder}
        aria-invalid={!!error}
        aria-describedby={describedBy}
      />
    </FormField>
  );
}

// ---------------------------------------------------------------------------
// 7. SelectField
// ---------------------------------------------------------------------------
interface SelectOption {
  value: string;
  label: string;
}

interface SelectFieldProps {
  label: string;
  required?: boolean;
  error?: string;
  helpText?: string;
  placeholder?: string;
  options: SelectOption[];
  id?: string;
  name?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export function SelectField({
  label,
  required,
  error,
  helpText,
  placeholder,
  options,
  id,
  name,
  value,
  onChange,
}: SelectFieldProps) {
  const helpTextId = id ? `${id}-help` : undefined;
  const errorId = id ? `${id}-error` : undefined;
  const describedBy =
    [helpText ? helpTextId : null, error ? errorId : null]
      .filter(Boolean)
      .join(' ') || undefined;

  return (
    <FormField
      label={label}
      required={required}
      error={error}
      helpText={helpText}
      htmlFor={id}
    >
      <Select
        value={value}
        onValueChange={onChange}
        name={name}
      >
        <SelectTrigger
          id={id}
          className="h-11"
          aria-invalid={!!error}
          aria-describedby={describedBy}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </FormField>
  );
}

// ---------------------------------------------------------------------------
// 8. RadioGroupField
// ---------------------------------------------------------------------------
interface RadioGroupFieldProps {
  label: string;
  required?: boolean;
  error?: string;
  helpText?: string;
  options: SelectOption[];
  name?: string;
  value?: string;
  onValueChange?: (value: string) => void;
}

export function RadioGroupField({
  label,
  required,
  error,
  helpText,
  options,
  name,
  value,
  onValueChange,
}: RadioGroupFieldProps) {
  return (
    <FormField
      label={label}
      required={required}
      error={error}
      helpText={helpText}
    >
      <RadioGroup
        value={value}
        onValueChange={onValueChange}
        name={name}
        className="space-y-2"
      >
        {options.map((option) => {
          const optionId = `${name ?? label}-${option.value}`;
          return (
            <div key={option.value} className="flex items-center gap-2">
              <RadioGroupItem id={optionId} value={option.value} />
              <Label htmlFor={optionId}>{option.label}</Label>
            </div>
          );
        })}
      </RadioGroup>
    </FormField>
  );
}

// ---------------------------------------------------------------------------
// 9. CheckboxField
// ---------------------------------------------------------------------------
interface CheckboxFieldProps {
  label: string;
  required?: boolean;
  error?: string;
  helpText?: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  id?: string;
}

export function CheckboxField({
  label,
  required,
  error,
  helpText,
  checked,
  onCheckedChange,
  id,
}: CheckboxFieldProps) {
  return (
    <FormField
      label=""
      required={required}
      error={error}
      helpText={helpText}
      htmlFor={id}
    >
      <div className="flex items-center gap-2">
        <Checkbox
          id={id}
          checked={checked}
          onCheckedChange={onCheckedChange}
        />
        <Label htmlFor={id} className="text-sm font-normal">
          {label}
          {required && <span className="text-cube-red"> *</span>}
        </Label>
      </div>
    </FormField>
  );
}

// ---------------------------------------------------------------------------
// 10. ConsentCheckbox
// ---------------------------------------------------------------------------
interface ConsentCheckboxProps {
  consentText: string;
  required?: boolean;
  error?: string;
  helpText?: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  id?: string;
}

export function ConsentCheckbox({
  consentText,
  required,
  error,
  helpText,
  checked,
  onCheckedChange,
  id,
}: ConsentCheckboxProps) {
  return (
    <FormField
      label=""
      required={required}
      error={error}
      helpText={helpText}
      htmlFor={id}
    >
      <div className="flex items-center gap-2">
        <Checkbox
          id={id}
          checked={checked}
          onCheckedChange={onCheckedChange}
        />
        <Label htmlFor={id} className="text-sm font-normal text-muted-foreground">
          {consentText}
          {required && <span className="text-cube-red"> *</span>}
        </Label>
      </div>
    </FormField>
  );
}

// ---------------------------------------------------------------------------
// 11. FileUploadField
// ---------------------------------------------------------------------------
interface FileUploadFieldProps {
  label: string;
  required?: boolean;
  error?: string;
  helpText?: string;
  accept?: string;
  id?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export function FileUploadField({
  label,
  required,
  error,
  helpText,
  accept,
  id,
  onChange,
}: FileUploadFieldProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length && onChange) {
      // Synthesize an event so the existing onChange handler can read it
      onChange({ target: { files } } as unknown as React.ChangeEvent<HTMLInputElement>);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <FormField
      label={label}
      required={required}
      error={error}
      helpText={helpText}
      htmlFor={id}
    >
      <div
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-cube-soft bg-cube-soft p-8 text-center cursor-pointer hover:bg-cube-soft/80 transition-colors"
      >
        <Upload className="h-8 w-8 text-cube-blue" />
        <p className="mt-2 text-sm text-muted-foreground">
          Click to upload or drag and drop
        </p>
        <input
          ref={inputRef}
          type="file"
          id={id}
          accept={accept}
          onChange={onChange}
          className="hidden"
        />
      </div>
    </FormField>
  );
}

// ---------------------------------------------------------------------------
// 12. SearchField
// ---------------------------------------------------------------------------
interface SearchFieldProps {
  placeholder?: string;
  className?: string;
  onSearch?: (value: string) => void;
}

export function SearchField({
  placeholder = 'Search...',
  className,
  onSearch,
}: SearchFieldProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch?.(e.target.value);
  };

  return (
    <div className={cn('relative', className)}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder={placeholder}
        onChange={handleChange}
        className="pl-10"
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// 13. QuantitySelector
// ---------------------------------------------------------------------------
interface QuantitySelectorProps {
  value?: number;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
}

export function QuantitySelector({
  value = 1,
  min = 1,
  max = 99,
  onChange,
}: QuantitySelectorProps) {
  const [internalValue, setInternalValue] = React.useState<number>(value);

  // Keep internal state in sync if controlled value changes
  React.useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value);
    }
  }, [value]);

  const currentValue = value !== undefined ? value : internalValue;

  const clamp = (next: number) => Math.min(Math.max(next, min), max);

  const update = (next: number) => {
    const clamped = clamp(next);
    if (value === undefined) {
      setInternalValue(clamped);
    }
    onChange?.(clamped);
  };

  const decrement = () => update(currentValue - 1);
  const increment = () => update(currentValue + 1);

  return (
    <div className="flex items-center gap-2">
      <Button
        type="button"
        variant="outlineBlue"
        size="sm"
        onClick={decrement}
        disabled={currentValue <= min}
        className="h-9 w-9 rounded-md border border-cube-soft"
        aria-label="Decrease quantity"
      >
        <Minus className="h-4 w-4" />
      </Button>
      <span className="w-12 text-center text-sm font-medium">
        {currentValue}
      </span>
      <Button
        type="button"
        variant="outlineBlue"
        size="sm"
        onClick={increment}
        disabled={currentValue >= max}
        className="h-9 w-9 rounded-md border border-cube-soft"
        aria-label="Increase quantity"
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 14. FormSectionHeading
// ---------------------------------------------------------------------------
interface FormSectionHeadingProps {
  children: React.ReactNode;
  className?: string;
}

export function FormSectionHeading({
  children,
  className,
}: FormSectionHeadingProps) {
  return (
    <h3 className={cn('text-base font-semibold text-cube-navy pb-2 border-b border-cube-soft', className)}>
      {children}
    </h3>
  );
}

// ---------------------------------------------------------------------------
// 15. FieldHelpText
// ---------------------------------------------------------------------------
interface FieldHelpTextProps {
  children: React.ReactNode;
  className?: string;
}

export function FieldHelpText({ children, className }: FieldHelpTextProps) {
  return (
    <p className={cn('text-xs text-muted-foreground', className)}>
      {children}
    </p>
  );
}

// ---------------------------------------------------------------------------
// 16. ValidationMessage
// ---------------------------------------------------------------------------
interface ValidationMessageProps {
  children: React.ReactNode;
  className?: string;
}

export function ValidationMessage({
  children,
  className,
}: ValidationMessageProps) {
  return (
    <p className={cn('flex items-center gap-1.5 text-sm text-cube-red', className)}>
      <AlertCircle className="h-4 w-4" />
      {children}
    </p>
  );
}

// ---------------------------------------------------------------------------
// 17. FormError
// ---------------------------------------------------------------------------
interface FormErrorProps {
  children: React.ReactNode;
  className?: string;
}

export function FormError({ children, className }: FormErrorProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-2 rounded-md bg-cube-red/10 p-4 text-sm text-cube-red',
        className,
      )}
    >
      <AlertCircle className="h-4 w-4 flex-shrink-0" />
      <span>{children}</span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 18. FormSuccess
// ---------------------------------------------------------------------------
interface FormSuccessProps {
  children: React.ReactNode;
  className?: string;
}

export function FormSuccess({ children, className }: FormSuccessProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-2 rounded-md bg-cube-success/10 p-4 text-sm text-cube-success',
        className,
      )}
    >
      <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
      <span>{children}</span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 19. SubmitButton
// ---------------------------------------------------------------------------
interface SubmitButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function SubmitButton({
  loading = false,
  children,
  className,
  disabled,
  ...props
}: SubmitButtonProps) {
  return (
    <Button
      type="submit"
      variant="green"
      size="lg"
      loading={loading}
      disabled={disabled || loading}
      className={cn('w-full', className)}
      {...props}
    >
      {children}
    </Button>
  );
}
