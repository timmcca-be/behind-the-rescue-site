import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { Header } from './components/common/header/Header';
import { AdoptionEvent } from './pages/adoption-event/AdoptionEvent';
import { AdoptionEventList } from './pages/adoption-event-list/AdoptionEventList';
import styles from './App.module.css'
import { ReserveCrateForm } from './pages/reserve-crate-form/ReserveCrateForm';

const queryClient = new QueryClient();

export const App = () => (
  <QueryClientProvider client={queryClient}>
    <Router>
      <Header />
      <main className={styles.main}>
        <Switch>
          <Route path="/adoption-events/:adoptionEventID/reserve-crate">
            <ReserveCrateForm />
          </Route>
          <Route path="/adoption-events/:adoptionEventID">
            <AdoptionEvent />
          </Route>
          <Route path="/">
            <AdoptionEventList />
          </Route>
        </Switch>
      </main>
    </Router>
  </QueryClientProvider>
);
