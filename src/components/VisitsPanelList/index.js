import React from "react";
import "./styles.scss";
import Router from "next/router";
import formatDateAndTime from "../../helpers/formatDateAndTime";
import VisitSummaryList from "../VisitSummaryList";

const Visits = ({ visits }) => (
  <div className="nhsuk-list-panel nhsuk-u-margin-0">
    <h3
      className="nhsuk-list-panel__label"
      style={{ fontSize: "1.5rem" }}
      id="A"
    >
      Upcoming visits
    </h3>
    <ul className="nhsuk-list-panel__list nhsuk-list-panel__list--with-label">
      {visits.map((visit) => (
        <li className="nhsuk-list-panel__item" key={visit.callId}>
          <div className="app-visit-card">
            <div className="app-visit-card-body">
              <details
                className="nhsuk-details nhsuk-u-margin-0"
                nhsuk-polyfilled="true"
                id="nhsuk-details0"
              >
                <summary
                  className="nhsuk-details__summary"
                  role="button"
                  aria-controls="nhsuk-details__text0"
                  tabIndex="0"
                  aria-expanded="false"
                >
                  <span className="nhsuk-details__summary-text">
                    {formatDateAndTime(visit.callTime, "HH:mm")} -{" "}
                    {visit.patientName}
                  </span>
                </summary>
                <div
                  className="nhsuk-details__text"
                  id="nhsuk-details__text0"
                  aria-hidden="true"
                >
                  <VisitSummaryList
                    patientName={visit.patientName}
                    visitorName={visit.recipientName}
                    visitorMobileNumber={visit.recipientNumber}
                    visitDateAndTime={visit.callTime}
                    withActions={false}
                  ></VisitSummaryList>

                  <button
                    className="nhsuk-button nhsuk-u-margin-right-5 nhsuk-u-margin-bottom-4"
                    type="submit"
                    onClick={() => {
                      const callId = visit.callId;
                      Router.push({
                        pathname: `/wards/visit-start`,
                        query: { callId },
                      });
                    }}
                  >
                    Start
                  </button>

                  <button
                    className="nhsuk-button nhsuk-button--secondary"
                    onClick={() => {
                      const callId = visit.callId;
                      Router.push({
                        pathname: `/wards/cancel-visit-confirmation`,
                        query: { callId },
                      });
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </details>
            </div>
          </div>
        </li>
      ))}
    </ul>
  </div>
);
export default Visits;