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

const AdoptionEventPage = lazy(() =>
  import('./pages/adoption-event/AdoptionEventPage')
    .then((module) => ({ default: module.AdoptionEventPage })));

const AdoptionEventsPage = lazy(() =>
  import('./pages/adoption-events/AdoptionEventsPage')
    .then((module) => ({ default: module.AdoptionEventsPage })));

const ReserveCratePage = lazy(() =>
  import('./pages/reserve-crate/ReserveCratePage')
    .then((module) => ({ default: module.ReserveCratePage })));

const AnimalPage = lazy(() =>
  import('./pages/animal/AnimalPage')
    .then((module) => ({ default: module.AnimalPage })));

const AnimalsPage = lazy(() =>
  import('./pages/animals/AnimalsPage')
    .then((module) => ({ default: module.AnimalsPage })));

export const App = () => (
  <QueryClientProvider client={queryClient}>
    <Router>
      <Header />
      <main className={styles.main}>
        <Switch>
          <Route path="/adoption-events/:adoptionEventID/reserve-crate">
            <Suspense fallback={<Spinner />}>
              <ReserveCratePage />
            </Suspense>
          </Route>
          <Route path="/adoption-events/:adoptionEventID">
            <Suspense fallback={<Spinner />}>
              <AdoptionEventPage />
            </Suspense>
          </Route>
          <Route path="/animals/:animalID">
            <Suspense fallback={<Spinner />}>
              <AnimalPage />
            </Suspense>
          </Route>
          <Route path="/animals">
            <Suspense fallback={<Spinner />}>
              <AnimalsPage />
            </Suspense>
          </Route>
          <Route path="/">
            <Suspense fallback={<Spinner />}>
              <AdoptionEventsPage />
            </Suspense>
          </Route>
        </Switch>
      </main>
    </Router>
  </QueryClientProvider>
);
