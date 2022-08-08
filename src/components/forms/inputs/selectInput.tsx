import { useState } from 'react';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import React from 'react';
import classNames from 'classnames';

import getThemeColor from '../../../lib/helpers/theme';

import type { HTMLAttributes } from 'react';

import type { StylesConfig } from 'react-select';
import type { ThemeConfig } from 'react-select/dist/declarations/src/theme';
import type StateManagedSelect from 'react-select';

interface OptionType {
  label: string;
  value: string;
}

// interface SingleSelectProps {
//   multiple: false;
// }

interface SelectInputProps
  extends Pick<HTMLAttributes<HTMLDivElement>, 'className'> {
  id?: string;
  current: OptionType | null;
  name?: string;
  error?: string;
  options: OptionType[];
  creatable?: boolean;
  onChange?: (value: OptionType | null) => void;
  placeholder?: string;
}

const grey = getThemeColor('grey');
const lightGrey = getThemeColor('grey-light');
const red = getThemeColor('red');

const SelectInput = React.forwardRef<StateManagedSelect, SelectInputProps>(
  (
    {
      error,
      current,
      className,
      options,
      onChange,
      creatable = false,
      ...props
    },
    ref
  ) => {
    const [allOptions, setAllOptions] = useState(options);

    const height = '44px';

    const theme: ThemeConfig = (theme) => ({
      ...theme,
      borderRadius: 0,
      colors: {
        ...theme.colors,
        primary: grey,
        primary25: lightGrey,
        secondary: lightGrey,
      },
    });

    const styles: Partial<
      StylesConfig<{ label: string; value: string }, false>
    > = {
      placeholder: (provided) => ({
        ...provided,
        color: '#a1a1aa',
      }),
      singleValue: (provided) => ({
        ...provided,
      }),
      dropdownIndicator: (provided) => ({
        ...provided,
        backgroundColor: grey,
        height,
        verticalAlign: 'middle',
        marginTop: 'auto',
        marginBottom: 'auto',
      }),
      control: (provided) => ({
        ...provided,
        minHeight: height,
        height,
        border: error ? undefined : 0,
        borderColor: error && red,
        fontSize: '1.25rem',
      }),
      valueContainer: (provided) => ({
        ...provided,
        height,
        padding: '0 6px',
      }),
      input: (provided) => ({
        ...provided,
        margin: '0px',
      }),
      indicatorSeparator: () => ({
        display: 'none',
      }),
      indicatorsContainer: (provided) => ({
        ...provided,
        height,
      }),
    };

    const classes = classNames(className, 'text-left');

    const SelectComponent = () =>
      creatable ? (
        <CreatableSelect
          {...props}
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
          ref={ref as any}
          onCreateOption={(value) => {
            const newOption = { label: value, value };
            setAllOptions((options) => [...options, newOption]);

            onChange?.(newOption);
          }}
          onChange={(value) => {
            onChange?.(value || null);
          }}
          value={current}
          id={props.id || props.name}
          instanceId={props.id || props.name}
          placeholder={props.placeholder}
          theme={theme}
          styles={styles}
          options={allOptions}
          className={classes}
        />
      ) : (
        <Select
          {...props}
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
          ref={ref as any}
          id={props.id || props.name}
          value={current}
          instanceId={props.id || props.name}
          placeholder={props.placeholder}
          onChange={(value) => {
            onChange?.(value || null);
          }}
          theme={theme}
          styles={styles}
          options={allOptions}
          className={classes}
        />
      );

    return <SelectComponent />;
  }
);

export default SelectInput;
