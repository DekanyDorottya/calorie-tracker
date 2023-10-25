import React from "react";
import Snackbar from "@mui/material/Snackbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Notification = ({
  snackbarOpen,
  onClose,
  successMassage,
  snackbarError,
}) => {
  console.log(successMassage);
  console.log(snackbarError);
  const action = (
    <>
      <Button color="secondary" size="small" onClick={onClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={onClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <>
      {successMassage && (
        <Snackbar id="1"
          open={snackbarOpen}
          autoHideDuration={4000}
          onClose={onClose}
          message={successMassage}
          action={action}
        />
      )}
      {snackbarError && (
        <Snackbar id="2" open={snackbarOpen} autoHideDuration={4000} onClose={onClose}>
          <Alert onClose={onClose} severity="error" sx={{ width: "100%" }}>
            {snackbarError}
          </Alert>
        </Snackbar>
      )}
    </>
  );
};

export default Notification;
