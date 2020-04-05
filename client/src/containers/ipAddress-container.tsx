import React from 'react';
import { Typography, Grid, FormGroup } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/styles';
import { useFormik } from 'formik';
import { TextField, Button } from 'components';

const useStyles = makeStyles(() =>
  createStyles({
    title: {
      marginTop: '1rem',
      marginBottom: '3rem',
    },
    buttonMargin: {
      margin: '2.5rem'
    }
  })
);

export const validate = (values: any) => {
  const errors = {} as any;
  if (!values.address || !/[0-9][0-9.]*[0-9].{4,}/g.test(values.address)) {
    errors.address = 'Invalid IP (Ex. 8.8.8.8)';
  }
  return errors;
};

const IPAddress = () => {
  const { title, buttonMargin } = useStyles();

  const formik = useFormik({
    initialValues: {
      address: ''
    },
    validate,
    onSubmit: (value: any) => {
      console.log(value);
      formik.setSubmitting(false);
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={8}>
        <Grid item xs={4} />
        <Grid item xs={4}>
          <Typography variant='h3' align='center' className={title}>IP Information</Typography>
          <FormGroup>
            <TextField id='address' label='IP Address'
              onChange={formik.handleChange}
              value={formik.values.address}
              helperText={formik.errors.address && formik.touched.address ? formik.errors.address : 'Ex. 8.8.8.8'}
              error={formik.touched.address && formik.errors.address ? true : false}
              onBlur={formik.handleBlur}
            />
            <Button className={buttonMargin} variant="contained" color="primary" onClick={formik.submitForm}>Search</Button>
          </FormGroup>
        </Grid>
      </Grid>
    </form >
  );
}

export { IPAddress };
