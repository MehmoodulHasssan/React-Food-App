'use client';
import React from 'react';
import HomeUi from '@/components/HomeUi';
import NavigationBar from '@/components/NavigationBar';
import { useSelector } from 'react-redux';

const HomePage = () => {
  const state = useSelector((state) => state.stateFn.currentState);

  console.log(state);
  return (
    <>
      <NavigationBar route={'home'} state={state} />
      <HomeUi state={state} />
    </>
  );
  // return <NavigationBar />;
};

export default HomePage;
