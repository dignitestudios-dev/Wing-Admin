// All the helper functions should must be there.
// The functions that you're using multiple times must be there.
// e.g. formatDateToMMDDYYYY, formatEpochToMMDDYYYY, etc.

import moment from "moment";

// Helper function to format date
export const formatDate = (date) => {
  return moment(date).format("YYYY-MM-DD");
};
