import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { AdoptionEvent } from './pages/AdoptionEvent';
import { AdoptionEventList } from './pages/AdoptionEventList';

const queryClient = new QueryClient();

export const App = () => (
  <QueryClientProvider client={queryClient}>
    <Router>
      <Switch>
        <Route path="/adoption-events/:adoptionEventID">
          <AdoptionEvent />
        </Route>
        <Route path="/">
          <AdoptionEventList />
        </Route>
      </Switch>
    </Router>
  </QueryClientProvider>
);
