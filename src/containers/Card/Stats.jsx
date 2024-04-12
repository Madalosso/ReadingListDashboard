import React, { useEffect, useMemo } from "react";
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/20/solid";
import useReadingList from "../../hooks/useReads";
import { classNames } from "../../utils";

export default function PeriodStats(props) {
  const { readingList, loading } = useReadingList();

  const notRead = useMemo(() => readingList.filter((item) => !item.hasBeenRead), [readingList]);
  const alreadyRead = useMemo(() => readingList.filter((item) => item.hasBeenRead), [readingList]);

  const addedToday = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const addedTodayCount = readingList.filter((item) => {
      const addedAt = new Date(item.creationTime);
      addedAt.setHours(0, 0, 0, 0);
      return addedAt.getTime() === today.getTime();
    }).length;
    return addedTodayCount;
  }, [notRead]);

  const completedToday = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const readTodayCount = readingList.filter((item) => {
      if (item.hasBeenRead) {
        const readAt = new Date(item.lastUpdateTime);
        readAt.setHours(0, 0, 0, 0);
        return readAt.getTime() === today.getTime() && item.hasBeenRead;
      }
      return false;
    }).length;
    return readTodayCount;
  }, [alreadyRead]);

  const stats = [
    {
      name: "Items read",
      stat: readingList.filter((item) => item.hasBeenRead).length,
      previousStat: readingList.length,
      // change: "12",
      changeType: "increase",
    },
    {
      name: "Pending",
      stat: notRead.length,
      // previousStat: "70,946",
      // change: "12",
      changeType: "increase",
    },
    {
      name: "Today's Progress",
      stat: completedToday,
      previousStat: addedToday,
      //change: "2",
    },
    {
      name: "Daily Balance",
      // stat: addedToday - completedToday,
      // previousStat: "28.62%",
      change: addedToday - completedToday,
    },
  ];

  return (
    <div>
      <h3 className="text-base font-semibold leading-6 text-gray-900">Reading List Summary</h3>
      <dl className="mt-5 grid grid-cols-1 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow md:grid-cols-4 md:divide-x md:divide-y-0">
        {stats.map((item) => (
          <div key={item.name} className="px-4 py-5 sm:p-6">
            <dt className="text-base font-normal text-gray-900">{item.name}</dt>
            <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
              {typeof item.stat == "number" && (
                <div className="flex items-baseline text-2xl font-semibold text-indigo-600">
                  {item.stat}
                  {typeof item.previousStat == "number" && (
                    <span className="ml-2 text-sm font-medium text-gray-500">/ {item.previousStat}</span>
                  )}
                </div>
              )}

              {typeof item.change == "number" && (
                <div
                  className={classNames(
                    item.change > 0 ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800",
                    "inline-flex items-baseline rounded-full px-2.5 py-0.5 text-sm font-medium md:mt-2 lg:mt-1"
                  )}
                >
                  {item.change > 0 ? (
                    <ArrowUpIcon
                      className="-ml-1 mr-0.5 h-5 w-5 flex-shrink-0 self-center text-red-500"
                      aria-hidden="true"
                    />
                  ) : (
                    <ArrowDownIcon
                      className="-ml-1 mr-0.5 h-5 w-5 flex-shrink-0 self-center text-green-500"
                      aria-hidden="true"
                    />
                  )}

                  <span className="sr-only"> {item.changeType === "increase" ? "Increased" : "Decreased"} by </span>
                  {item.change}
                </div>
              )}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
