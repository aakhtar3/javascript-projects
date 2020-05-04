import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/**
 * Toast that will display a message based on the type
 * @param {String} type
 * @param {String} message
 */
const Alert = (type, message) => toast[type](message);

Alert.propTypes = {
  type: PropTypes.string,
  message: PropTypes.string,
};

export default Alert;
