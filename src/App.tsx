import React, { lazy, Suspense } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { Header } from './components/common/header/Header';
import styles from './App.module.css'
import { Spinner } from './components/common/spinner/Spinner';

const queryClient = new QueryClient();

const AdoptionEvent = lazy(() =>
  import('./pages/adoption-event/AdoptionEvent')
    .then((module) => ({ default: module.AdoptionEvent })));

const AdoptionEventList = lazy(() =>
  import('./pages/adoption-event-list/AdoptionEventList')
    .then((module) => ({ default: module.AdoptionEventList })));

const ReserveCrateForm = lazy(() =>
  import('./pages/reserve-crate-form/ReserveCrateForm')
    .then((module) => ({ default: module.ReserveCrateForm })));

const Animal = lazy(() =>
  import('./pages/animal/Animal')
    .then((module) => ({ default: module.Animal })));

const AnimalList = lazy(() =>
  import('./pages/animal-list/AnimalList')
    .then((module) => ({ default: module.AnimalList })));

export const App = () => (
  <QueryClientProvider client={queryClient}>
    <Router>
      <Header />
      <main className={styles.main}>
        <Switch>
          <Route path="/adoption-events/:adoptionEventID/reserve-crate">
            <Suspense fallback={<Spinner />}>
              <ReserveCrateForm />
            </Suspense>
          </Route>
          <Route path="/adoption-events/:adoptionEventID">
            <Suspense fallback={<Spinner />}>
              <AdoptionEvent />
            </Suspense>
          </Route>
          <Route path="/animals/:animalID">
            <Suspense fallback={<Spinner />}>
              <Animal />
            </Suspense>
          </Route>
          <Route path="/animals">
            <Suspense fallback={<Spinner />}>
              <AnimalList />
            </Suspense>
          </Route>
          <Route path="/">
            <Suspense fallback={<Spinner />}>
              <AdoptionEventList />
            </Suspense>
          </Route>
        </Switch>
      </main>
    </Router>
  </QueryClientProvider>
);
