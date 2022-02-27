import React from 'react';
import { format, parseISO } from 'date-fns';
import { FaCalendar } from 'react-icons/fa';
import { useParams } from 'react-router';
import { CrateStacks } from '../../components/adoption-event/crate-stacks/CrateStacks';
import { useAdoptionEvent } from '../../hooks/api/useAdoptionEvent';
import { useCrateReservations } from '../../hooks/api/useCrateReservations';
import styles from './AdoptionEventPage.module.css';
import sharedStyles from '../../components/common/sharedStyles.module.css';
import { Link } from 'react-router-dom';
import { TabList } from '../../components/common/tab-list/TabList';
import { CrateReservationsPane } from '../../components/adoption-event/crate-reservations-pane/CrateReservationsPane';
import { MeetAndGreetsPane } from '../../components/adoption-event/meet-and-greets-pane/MeetAndGreetsPane';

export enum AdoptionEventPageTab {
  Crates = 'crates',
  MeetAndGreets = 'meet-and-greets',
}

export type AdoptionEventPageProps = {
  tab: AdoptionEventPageTab;
};

export type AdoptionEventPageParams = {
  adoptionEventID: string;
};

export const AdoptionEventPage = ({ tab }: AdoptionEventPageProps) => {
  const params = useParams<AdoptionEventPageParams>();
  const adoptionEventID = Number.parseInt(params.adoptionEventID);

  const adoptionEvent = useAdoptionEvent(adoptionEventID).data?.adoptionEvent;
  const { data: crateData } = useCrateReservations(
    adoptionEventID,
    adoptionEvent?.nextOccurrenceDate,
  );

  const nextOccurrenceDate = adoptionEvent
    ? format(parseISO(adoptionEvent.nextOccurrenceDate), 'EEEE, MMM d')
    : '';

  return (
    <>
      <div className={styles.header}>
        <div>
          <h2>{adoptionEvent?.name}</h2>
          <span>
            <FaCalendar className={sharedStyles.icon} /> {nextOccurrenceDate}
          </span>
        </div>
        {tab === AdoptionEventPageTab.Crates && (
          <Link
            to={`/adoption-events/${adoptionEventID}/reserve-crate`}
            className={styles.actionButton}
          >
            {'Reserve a crate'}
          </Link>
        )}
        {tab === AdoptionEventPageTab.MeetAndGreets && (
          <Link
            to={`/adoption-events/${adoptionEventID}/schedule-meet-and-greet`}
            className={styles.actionButton}
          >
            {'Schedule a meet & greet'}
          </Link>
        )}
      </div>
      {crateData && <CrateStacks crateStacks={crateData.crateStacks} />}
      <TabList
        tabs={[
          {
            id: AdoptionEventPageTab.Crates,
            title: 'Crates',
            href: `/adoption-events/${adoptionEventID}`,
          },
          {
            id: AdoptionEventPageTab.MeetAndGreets,
            title: 'Meet & greets',
            href: `/adoption-events/${adoptionEventID}/meet-and-greets`,
          },
        ]}
        activeTabID={tab}
      />
      {adoptionEvent !== undefined && tab === AdoptionEventPageTab.Crates && (
        <CrateReservationsPane
          adoptionEventID={adoptionEventID}
          date={adoptionEvent.nextOccurrenceDate}
        />
      )}
      {adoptionEvent !== undefined &&
        tab === AdoptionEventPageTab.MeetAndGreets && (
          <MeetAndGreetsPane
            adoptionEventID={adoptionEventID}
            date={adoptionEvent.nextOccurrenceDate}
          />
        )}
    </>
  );
};
