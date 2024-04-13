import React, { useEffect, useMemo, useState } from "react";
import logo from "../../assets/img/logo.svg";
import Card from "../../containers/Card/Card";
import ReadList from "../../containers/ReadList";
import CompletedList from "../../containers/CompletedList";
import PeriodStats from "../../containers/Card/Stats";
import useReadingList from "../../hooks/useReads";

const Newtab = () => {
  const { readingList, loading } = useReadingList();

  const earliest = useMemo(
    () =>
      readingList
        .filter((item) => !item.hasBeenRead)
        .sort((a, b) => b.creationTime - a.creationTime)
        .slice(0, 4),
    [readingList]
  );
  const oldest = useMemo(
    () =>
      readingList
        .filter((item) => !item.hasBeenRead)
        .sort((a, b) => a.creationTime - b.creationTime)
        .slice(0, 4),
    [readingList]
  );

  const readToday = useMemo(
    () =>
      readingList.filter(
        (item) => item.hasBeenRead && new Date(item.lastUpdateTime).toDateString() === new Date().toDateString()
      ),
    [readingList]
  );

  return (
    <div
      className="bg-[#282c34] min-h-screen flex flex-col align-middle
    justify-center text-white font-sans"
    >
      <section className="mx-auto max-w-screen-lg flex flex-col gap-2 sm:px-6 lg:px-8">
        <Card>
          <PeriodStats />
        </Card>

        <Card title={`Pending - Recent Entries`}>
          <ReadList items={earliest} />
        </Card>

        <Card title={`Pending - Oldest Entries`}>
          <ReadList items={oldest} />
        </Card>

        <Card title={`Completed today`}>
          <CompletedList items={readToday} />
        </Card>
      </section>
    </div>
  );
};

export default Newtab;
