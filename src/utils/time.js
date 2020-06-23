import moment from "moment";

const convertTimestampToMilliseconds = (timestamp) => {
  return timestamp > 1e16
    ? Number(timestamp) / 1e4
    : timestamp > 1e13
    ? Number(timestamp) / 1e3
    : Number(timestamp);
};

export const formatTimetoken = (timetoken) =>
  moment(convertTimestampToMilliseconds(timetoken)).format("MM/DD h:mm:ss a");
