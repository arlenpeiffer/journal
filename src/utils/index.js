export const formatSleepAmount = value => {
  const numberOfHours = Math.floor(value);
  const numberOfMinutes = (value - numberOfHours) * 60;
  const s = numberOfHours > 1 ? 's' : '';
  const hours = numberOfHours ? `${numberOfHours} hr${s}` : '';
  const minutes = `${numberOfMinutes} mins`;
  return `${hours} ${minutes}`;
};

export const getErrorMessage = error => {
  switch (error.code) {
    case 'auth/email-already-in-use':
      return `Uh oh, looks like there's already an account registered with that email address.`;
    case 'auth/invalid-email':
      return `Hmm, that doesn't seem to be a valid email address. Please try again.`;
    case 'auth/operation-not-allowed':
      return `Uh oh, looks like that's not allowed.`;
    case 'auth/user-disabled':
      return `Uh oh, looks like that account is currently disabled for some reason.`;
    case 'auth/user-not-found':
      return `Hmm, there doesn't appear to be an account associated with that email address.`;
    case 'auth/weak-password':
      return `Uh oh, the password you entered has been deemed too weak. Please try entering a new one.`;
    case 'auth/wrong-password':
      return `Hmm, that doesn't seem to be the correct password. Please try again.`;
    default:
      return `Uh oh, looks like we've got an error of some sort.`;
  }
};
