import { nanoid } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import Blank from "../components/Blank";
import CardUserInfo from "../components/CardUserInfo";
import Pagination from "../components/Pagination";
import { getUsersThunk } from "../features/user/userApi";

const Users = () => {
  const [currentQueryParameters, setSearchParams] = useSearchParams();

  const [limit, setLimit] = useState<number>(20);
  const [skip, setSkip] = useState<number>(0);
  const [fakeLoading, setFakeLoading] = useState(true);
  const { loading, total, users } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUsersThunk({ limit, skip }));
    console.log(users);
  }, [limit, skip]);

  useEffect(() => {
    if (currentQueryParameters.get("skip")) {
      setSkip(parseInt(currentQueryParameters.get("skip")!, 10));
    }
  }, [currentQueryParameters]);

  if (loading) return <Blank />;
  return (
    <section>
      <div className="p-5 ">
        <h1 className="text-2xl font-semibold mb-2 text-slate-700">Users</h1>
      </div>
      <div className="grid xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 m-5">
        {users.map((user) => (
          <CardUserInfo key={nanoid()} user={user} image="w-12 h-12" />
        ))}
      </div>
      <Pagination limit={limit} items={total} skip={skip} />
    </section>
  );
};

export default Users;
