import { IInterview } from "~~/typings";
import * as qs from "qs";

export const useInterviews = () => {
  return useState<IInterview[]>("interviews", () => []);
};

export const useInterviewsOffset = () => {
  return useState<number>("interviewsOffset", () => 0);
};

export const useInterviewsQuery = () => {
  return useState<string>("interviewsQuery", () => {
    return qs.stringify({
      _limit: 20,
      _start: 0,
      _sort: "date:DESC",
    });
  });
};

export const useInterviewsQueryString = () =>
  useState<string>("interviewsQueryString", () => "");
