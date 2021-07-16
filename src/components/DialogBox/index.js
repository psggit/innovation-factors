import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import makeStyles from "@material-ui/core/styles/makeStyles";
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import useDialogState from "./useDialogState";
import Typography from "@material-ui/core/Typography";

const styles = (theme) => ({
  root: {
    padding: 0,
  },
  title: {
    fontSize: 16,
    fontWeight: 600,
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      {/* {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null} */}
      {children ? (
        <Typography className={classes.title} variant="h6">
          {children}
        </Typography>
      ) : (
        ""
      )}
    </MuiDialogTitle>
  );
});

const ConfirmationDialogBox = React.memo((props) => {
  const { title, children, actions, style, handleCloseDialog } = props;
  const [dialogRendered, dialogOpen, closeDialog] = useDialogState({
    defaultOpen: true,
  });
  const classes = useStyles();

  const dialogStyle = {
    ...style,
    width: 415,
    //minHeight: 206,
    padding: "32px 24px 24px 24px",
    maxHeight: 497,
    overflow: "hidden",
  };

  const handleClose = () => {
    closeDialog();
    if (handleCloseDialog) {
      handleCloseDialog();
    }
  };

  return (
    <Dialog onClose={handleClose} open={dialogOpen}>
      <div style={dialogStyle}>
        <DialogTitle onClose={handleClose}>{title}</DialogTitle>
        <div className={classes.dialogContentWrapper}>
          <DialogContent
            className={classes.dialogContent}
            classes={{ root: classes.root }}
          >
            {children}
          </DialogContent>
          <DialogActions className={classes.dialogFooter}>
            {actions ? actions.map((item) => item) : ""}
          </DialogActions>
        </div>
      </div>
    </Dialog>
  );
});

ConfirmationDialogBox.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  actions: PropTypes.array,
  style: PropTypes.object,
  handleCloseDialog: PropTypes.func,
};

const useStyles = makeStyles((theme) => ({
  root: {
    "&:first-child": {
      padding: 0,
    },
  },
  dialogContentWrapper: {
    padding: 0,
  },
  dialogContent: {
    padding: 0,
    "& .subtitle": {
      paddingTop: 8,
      fontSize: 14,
    },
    "& .note": {
      fontSize: 12,
      fontStyle: "italic",
      color: "#8b8a96",
      paddingTop: 4,
    },
  },
  dialogFooter: {
    position: "relative",
    zIndex: "2",
    paddingTop: 32,
    paddingBottom: 0,
  },
}));

export default ConfirmationDialogBox;
