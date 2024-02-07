import { Control, Controller, ControllerRenderProps, FieldValues, Path } from 'react-hook-form';
import classNames from 'classnames/bind';

import Styles from './FormInput.module.scss';

import { Input, InputProps } from 'src/components/Input/Input';
import { Label } from 'src/components/label/Label';

const cx = classNames.bind(Styles);

interface FormInputProps<TFieldValues extends FieldValues> extends Omit<InputProps, 'handleChange' | 'value'> {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  error?: string;
  label: string;
}

const FormInput = <TFieldValues extends FieldValues>({
  name,
  control,
  id,
  label,
  placeholder,
  type,
  style,
  error,
}: FormInputProps<TFieldValues>) => {
  const handleChange = (field: ControllerRenderProps<TFieldValues, Path<TFieldValues>>, value: string) => {
    if (value === '') {
      field.onChange(null);
    }
    field.onChange(value);
  };

  return (
    <div className={cx('form-input-container')} style={style}>
      <div className={cx('label')}>
        <Label labelFor={`input-${id}`} id={id}>
          {label}
        </Label>
      </div>
      <div className={cx('input-and-error')}>
        <div className={cx('input')}>
          <Controller
            name={name}
            control={control}
            render={({ field }) => (
              <Input
                placeholder={placeholder}
                id={`input-${id}`}
                type={type}
                value={field.value}
                handleChange={(value) => handleChange(field, value)}
                style={style}
                onBlur={field.onBlur}
              />
            )}
          />
        </div>
        <div className={cx('error')}>{error && <p className={cx('input-error')}>{error}</p>}</div>
      </div>
    </div>
  );
};

export default FormInput;
