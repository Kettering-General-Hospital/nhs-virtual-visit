import React, { useState } from "react";
import Error from "next/error";
import { GridRow, GridColumn } from "../../../../src/components/Grid";
import Layout from "../../../../src/components/Layout";
import verifyTrustAdminToken from "../../../../src/usecases/verifyTrustAdminToken";
import propsWithContainer from "../../../../src/middleware/propsWithContainer";
import EditWardForm from "../../../../src/components/EditWardForm";
import { TRUST_ADMIN } from "../../../../src/helpers/userTypes";

const EditAWard = ({ error, id, name, hospitalId, hospitals }) => {
  if (error) {
    return <Error />;
  }

  const [errors, setErrors] = useState([]);

  return (
    <Layout
      title="Edit a ward"
      hasErrors={errors.length != 0}
      showNavigationBar={true}
      showNavigationBarForType={TRUST_ADMIN}
    >
      <GridRow>
        <GridColumn width="two-thirds">
          <EditWardForm
            errors={errors}
            setErrors={setErrors}
            id={id}
            initialName={name}
            initialHospitalId={hospitalId}
            hospitals={hospitals}
          />
        </GridColumn>
      </GridRow>
    </Layout>
  );
};

export const getServerSideProps = propsWithContainer(
  verifyTrustAdminToken(async ({ container, query, authenticationToken }) => {
    const getRetrieveWardById = container.getRetrieveWardById();

    let error = null;
    const getRetrieveWardByIdResponse = await getRetrieveWardById(
      query.id,
      authenticationToken.trustId
    );
    error = error || getRetrieveWardByIdResponse.error;

    const retrieveHospitalsByTrustId = container.getRetrieveHospitalsByTrustId();
    const retrieveHospitalsResponse = await retrieveHospitalsByTrustId(
      authenticationToken.trustId
    );

    error = error || retrieveHospitalsResponse.error;
    if (error) {
      return { props: { error: error } };
    } else {
      return {
        props: {
          error: error,
          id: getRetrieveWardByIdResponse.ward.id,
          name: getRetrieveWardByIdResponse.ward.name,
          hospitalId: getRetrieveWardByIdResponse.ward.hospitalId,
          hospitals: retrieveHospitalsResponse.hospitals,
        },
      };
    }
  })
);

export default EditAWard;
