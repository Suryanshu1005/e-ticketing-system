const FormValidation = ({error, setError, formData, isEventForm = false}) => {
  const validate = () => {
    let validationError = "";

    //Validation when the a new account is created
    if (!isEventForm) {
      if (formData.username === "") {
        validationError = "Username must be provided";
      } else if (
        formData.email === "" ||
        !/\S+@\S+\.\S+/.test(formData.email)
      ) {
        validationError = "A valid email address must be provided";
      } else if (formData.password === "" || formData.password.length < 6) {
        validationError = "Password must be at least 6 characters long";
      }
    }
    // validate when the the new event is created
    else {
      if (formData.name === "") {
        validationError = "Event name must be provided";
      } else if (formData.date === "") {
        validationError = "Event date must be provided";
      } else if (formData.time === "") {
        validationError = "Event time must be provided";
      } else if (formData.venue === "") {
        validationError = "Event venue must be provided";
      } else if (
        formData.availableSeats === "" ||
        isNaN(formData.availableSeats) ||
        parseInt(formData.availableSeats, 10) <= 0
      ) {
        validationError = "Available seats must be a positive number";
      }
    }

    setError(validationError);
    return validationError === "";
  };

  return {validate};
};

export default FormValidation;
