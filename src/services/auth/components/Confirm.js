import { Box } from "@chakra-ui/layout";
import { useEffect, useState } from "react";

import * as DAOAuth from "../dao";

import AlertInfoConfirm from "./alerts/AlertInfoConfirm";
import AlertErrorConfirm from "./alerts/AlertErrorConfirm";
import AlertSuccessConfirm from "./alerts/AlertSuccessConfirm";

import Layout from "./Layout";

function Confirm(props) {
  const token = props.location.pathname.split("/confirm/")[1];

  const [loading, setLoading] = useState(true);
  const [confirmed, setConfirmed] = useState();

  useEffect(() => {
    const confirm = async () => {
      const res = await DAOAuth.confirm(token);

      if (res.message === "success") {
        setConfirmed(true);
      } else {
        setConfirmed(false);
      }

      setLoading(false);
    };

    confirm();
  }, [token]);

  return (
    <Layout {...props}>
      <Box mt={4}>{loading ? <AlertInfoConfirm /> : !confirmed ? <AlertErrorConfirm /> : <AlertSuccessConfirm />}</Box>
    </Layout>
  );
}

export default Confirm;
