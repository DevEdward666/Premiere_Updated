import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Snackbar } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { global_request_callback } from '../../Services/Actions/DefaultActions';

const CustomSnackbar = ({message,isvisible}) => {
  const [visible, setVisible] = React.useState(isvisible);
const dispatch=useDispatch()
  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => {
    dispatch(global_request_callback("",false))
      setVisible(false)
    };
    React.useEffect(() => {
    let mounted = true;
    const activateCalendar = () => {
      if (mounted) {
        if (isvisible) {
            setVisible(isvisible)
        }
      }
    };
    mounted && activateCalendar();
    return () => {
      mounted = false;
    };
  }, [isvisible]);
  return (
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
     >
       {message}
      </Snackbar>
  );
};
export default CustomSnackbar;