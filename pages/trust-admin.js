import React from "react";
import Error from "next/error";
import Layout from "../src/components/Layout";
import propsWithContainer from "../src/middleware/propsWithContainer";
import verifyTrustAdminToken from "../src/usecases/verifyTrustAdminToken";
import WardsTable from "../src/components/WardsTable";
import { GridRow, GridColumn } from "../src/components/Grid";
import Heading from "../src/components/Heading";
import ActionLink from "../src/components/ActionLink";
import Text from "../src/components/Text";

const TrustAdmin = ({ wardError, trustError, wards, trust }) => {
  if (wardError || trustError) {
    return <Error />;
  }

  return (
    <Layout title={`Ward administration for ${trust.name}`} renderLogout={true}>
      <GridRow>
        <GridColumn width="full">
          <Heading>
            <span className="nhsuk-caption-l">
              {trust.name}
              <span className="nhsuk-u-visually-hidden">-</span>
            </span>
            Ward administration
          </Heading>
          <ActionLink href={`/trust-admin/add-a-ward`}>Add a ward</ActionLink>
          <ActionLink href={`/trust-admin/add-a-hospital`}>
            Add a hospital
          </ActionLink>

          {wards.length > 0 ? (
            <WardsTable wards={wards} />
          ) : (
            <Text>There are no wards.</Text>
          )}
        </GridColumn>
      </GridRow>
    </Layout>
  );
};

export const getServerSideProps = propsWithContainer(
  verifyTrustAdminToken(async ({ container, authenticationToken }) => {
    const wardsResponse = await container.getRetrieveWards()(
      authenticationToken.trustId
    );
    const trustResponse = await container.getRetrieveTrustById()(
      authenticationToken.trustId
    );

    // const trustName = trustResponse.trust ? trustResponse.trust.name : null;

    return {
      props: {
        wards: wardsResponse.wards,
        trust: { name: trustResponse.trust?.name },
        wardError: wardsResponse.error,
        trustError: trustResponse.error,
      },
    };
  })
);

export default TrustAdmin;