import React from 'react';
import { Typography, Grid, FormGroup, ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useFormik } from 'formik';
import { TextField, Button } from 'components';
import { getIPInfo } from 'apis';

const useStyles = makeStyles(() =>
  createStyles({
    title: {
      marginTop: '1rem',
      marginBottom: '3rem',
    },
    buttonMargin: {
      margin: '2.5rem'
    },
    panelWidth: {
      marginLeft: '8rem',
      marginRight: '8rem'
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
  // styles
  const { title, buttonMargin, panelWidth } = useStyles();

  // hooks
  const [IPData, setIPData] = React.useState();

  const getAddress = async (data: string) => {
    let res = await getIPInfo(data);
    setIPData(res.data);
  }

  const formik = useFormik({
    initialValues: {
      address: ''
    },
    validate,
    onSubmit: (value: any) => {
      getAddress(value);
      formik.setSubmitting(false);
    }
  });

  return (
    <React.Fragment>
      {/* Form */}
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
      </form>

      {/* Detail Panel */}
      <Grid item xs={10} className={panelWidth}>
        <ExpansionPanel defaultExpanded>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} id='detail-panel'>
            <Typography variant='h6'>Retrieved Information</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography variant='body1'>{IPData !== undefined ? JSON.stringify(IPData, null, 5).replace(/"([^"]+)":/g, "'$1:'") : 'Awaiting Input...'}</Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </Grid>
    </React.Fragment >
  );
}

export { IPAddress };