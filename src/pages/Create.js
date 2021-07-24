import React, { useState } from "react";
import {
  Typography,
  Button,
  Container,
  TextField,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { KeyboardArrowRight } from "@material-ui/icons";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  title: {
    marginBottom: 20,
  },
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: "block",
  },
  form: {
    marginTop: "2rem",
    marginBottom: "1.25rem",
    display: "block",
  },
  radioGroup: {
    marginTop: ".5rem",
  },
  btn: {
    padding: ".5rem 1rem",
  },
});

const Create = () => {
  const [values, setValues] = useState({
    title: "",
    details: "",
  });
  const [titleError, setTitleError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);
  const [category, setCategory] = useState("personal");
  const classes = useStyles();
  const history = useHistory();
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTitleError(false);
    setDetailsError(false);

    values.title === "" && setTitleError(true);
    values.details === "" && setDetailsError(true);

    if (values.title && values.details) {
      fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: values.title,
          details: values.details,
          category,
        }),
      }).then(() => history.push("/"));
    }
  };

  return (
    <Container>
      <Typography
        variant="h6"
        component="h2"
        className={classes.title}
        color="primary"
      >
        Create A Note
      </Typography>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          label="Note Title"
          color="primary"
          className={classes.field}
          fullWidth
          required
          name="title"
          onChange={handleChange}
          error={titleError}
        />
        <TextField
          variant="outlined"
          label="Note Details"
          color="primary"
          className={classes.field}
          fullWidth
          multiline
          rows={6}
          required
          name="details"
          onChange={handleChange}
          error={detailsError}
        />
        <FormControl color="secondary" className={classes.form}>
          <FormLabel>Note Category</FormLabel>
          <RadioGroup
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={classes.radioGroup}
          >
            <FormControlLabel
              control={<Radio color="primary" />}
              value="personal"
              label="Personal"
            />
            <FormControlLabel
              control={<Radio color="primary" />}
              value="work"
              label="Work"
            />
            <FormControlLabel
              control={<Radio color="primary" />}
              value="reminder"
              label="Reminder"
            />
            <FormControlLabel
              control={<Radio color="primary" />}
              value="crypto"
              label="Crypto"
            />
          </RadioGroup>
        </FormControl>

        <Button
          variant="contained"
          type="submit"
          color="primary"
          endIcon={<KeyboardArrowRight />}
          className={classes.btn}
        >
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default Create;
