import React from 'react';
import { useField } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import MuiSelect from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';

import AddItem from './AddItem';

const useStyles = makeStyles(theme => ({
  divider: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1.5),
    marginBottom: theme.spacing(0.5),
    marginLeft: theme.spacing(1.5)
  },
  emptyPrompt: {
    paddingTop: theme.spacing(0.75),
    paddingBottom: theme.spacing(0.75),
    paddingLeft: theme.spacing(2)
  }
}));

const Select = ({
  addItemCallback,
  children,
  dataSource,
  emptyPrompt,
  formatValue,
  includeAddItem,
  label,
  name,
  ...props
}) => {
  const [field, meta] = useField(name);

  const { error, touched } = meta;
  const hasError = error && touched ? true : false;

  const classes = useStyles();

  const handleRenderValue = value => {
    const valueIsEmpty = value === '' || value === undefined;

    if (valueIsEmpty)
      return (
        <Typography color="textSecondary">
          <em>Select an option</em>
        </Typography>
      );

    if (formatValue) return formatValue(value);

    return value;
  };

  const footer = [
    <Divider className={classes.divider} key="divider" />,
    <AddItem
      callback={addItemCallback}
      dataSource={dataSource}
      key="addItem"
      padSides
    />
  ];

  const menuItemsFromDataSource =
    dataSource && dataSource.length > 0 ? (
      dataSource.map(item => (
        <MenuItem key={item} value={item}>
          {item}
        </MenuItem>
      ))
    ) : (
      <Typography
        className={classes.emptyPrompt}
        color="textSecondary"
        variant="body2"
      >
        <em>{emptyPrompt}</em>
      </Typography>
    );

  return (
    <FormControl error={hasError}>
      <InputLabel shrink>{label}</InputLabel>
      <MuiSelect
        displayEmpty
        name={name}
        onBlur={field.onBlur}
        onChange={field.onChange}
        renderValue={handleRenderValue}
        value={field.value}
        {...props}
      >
        {children}
        {dataSource && menuItemsFromDataSource}
        {includeAddItem && footer.map(item => item)}
      </MuiSelect>
      {hasError && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};

export default Select;
