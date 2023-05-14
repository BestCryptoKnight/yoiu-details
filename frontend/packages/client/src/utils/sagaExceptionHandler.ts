import { serializeError, getMessageFromCode } from 'eth-rpc-errors';
import { toast } from 'react-toastify';

type ErrorWithMessage = {
  message: string
};

function instanceOfErrorWithMessage(object: unknown): object is ErrorWithMessage {
  return 'message' in (object as ErrorWithMessage);
}

export const sagaExceptionHandler = (exception: unknown) => {
  Reactotron.log('CATCHED EXCEPTION: ', exception);
  let message = '';
  if (exception instanceof Error) {
    message = exception.message;
  } else if (typeof exception === 'string') {
    message = exception;
  } else if (instanceOfErrorWithMessage(exception)) {
    message = exception.message;
  } else {
    const { code } = serializeError(exception);
    if (code) {
      message = getMessageFromCode(code);
    }
  }
  toast.error(message);
  Reactotron.log(message);
};
