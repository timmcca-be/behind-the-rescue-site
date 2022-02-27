import React, { lazy, Suspense } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Header } from './components/common/header/Header';
import styles from './App.module.css';
import { Spinner } from './components/common/spinner/Spinner';
import { Species } from './models/Species';
import { AdoptionEventPageTab } from './pages/adoption-event/AdoptionEventPage';

const queryClient = new QueryClient();

const AdoptionEventPage = lazy(() =>
  import('./pages/adoption-event/AdoptionEventPage').then((module) => ({
    default: module.AdoptionEventPage,
  })),
);

const AdoptionEventsPage = lazy(() =>
  import('./pages/adoption-events/AdoptionEventsPage').then((module) => ({
    default: module.AdoptionEventsPage,
  })),
);

const ReserveCratePage = lazy(() =>
  import('./pages/reserve-crate/ReserveCratePage').then((module) => ({
    default: module.ReserveCratePage,
  })),
);

const ScheduleMeetAndGreetPage = lazy(() =>
  import('./pages/schedule-meet-and-greet/ScheduleMeetAndGreetPage').then(
    (module) => ({ default: module.ScheduleMeetAndGreetPage }),
  ),
);

const AnimalPage = lazy(() =>
  import('./pages/animal/AnimalPage').then((module) => ({
    default: module.AnimalPage,
  })),
);

const AnimalsPage = lazy(() =>
  import('./pages/animals/AnimalsPage').then((module) => ({
    default: module.AnimalsPage,
  })),
);

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
          <Route path="/adoption-events/:adoptionEventID/schedule-meet-and-greet">
            <Suspense fallback={<Spinner />}>
              <ScheduleMeetAndGreetPage />
            </Suspense>
          </Route>
          <Route path="/adoption-events/:adoptionEventID/meet-and-greets">
            <Suspense fallback={<Spinner />}>
              <AdoptionEventPage tab={AdoptionEventPageTab.MeetAndGreets} />
            </Suspense>
          </Route>
          <Route path="/adoption-events/:adoptionEventID">
            <Suspense fallback={<Spinner />}>
              <AdoptionEventPage tab={AdoptionEventPageTab.Crates} />
            </Suspense>
          </Route>
          <Route path="/animals/cats">
            <Suspense fallback={<Spinner />}>
              <AnimalsPage species={Species.Cat} />
            </Suspense>
          </Route>
          <Route path="/animals/dogs">
            <Suspense fallback={<Spinner />}>
              <AnimalsPage species={Species.Dog} />
            </Suspense>
          </Route>
          <Route path="/animals/:animalID">
            <Suspense fallback={<Spinner />}>
              <AnimalPage />
            </Suspense>
          </Route>
          <Route path="/animals" exact={true}>
            <Suspense fallback={<Spinner />}>
              <AnimalsPage species={Species.Dog} />
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
