import React from 'react';
import { useField } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import MuiSelect from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
  divider: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1.5),
    marginBottom: theme.spacing(0.5),
    marginLeft: theme.spacing(1.5)
  }
}));

const Select = ({
  children,
  dataSource,
  defaultOption,
  label,
  name,
  ...props
}) => {
  const [field, meta] = useField(name);

  const { error, touched } = meta;
  const hasError = error && touched ? true : false;

  const classes = useStyles();

  return (
    <FormControl error={hasError}>
      <InputLabel>{label}</InputLabel>
      <MuiSelect
        name={name}
        onBlur={field.onBlur}
        onChange={field.onChange}
        value={field.value}
        {...props}
      >
        {defaultOption && (
          <MenuItem value={defaultOption}>
            <em>{defaultOption}</em>
          </MenuItem>
        )}
        {dataSource.map(item => (
          <MenuItem key={item} value={item}>
            {item}
          </MenuItem>
        ))}
        {children && (
          <>
            <Divider className={classes.divider} />
            {children}
          </>
        )}
      </MuiSelect>
      {hasError && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};

export default Select;
