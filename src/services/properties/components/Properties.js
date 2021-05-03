import { Button } from "@chakra-ui/button";
import { ButtonGroup } from "@chakra-ui/button";
import { Box } from "@chakra-ui/layout";
import { useEffect, useState } from "react";
import { FaRedoAlt } from "react-icons/fa";

import Layout from "../../../components/Container/Layout";

import * as DAOProperties from "../dao";
import { useTitle } from "../../../utils/title";

import ModalCreateProperty from "./modals/ModalCreateProperty";
import AlertServerError from "../../../components/AlertServerError";
import AlertNoElement from "../../../components/AlertNoElement";
import PaginationSkeleton from "../../../components/Pagination/PaginationSkeleton";
import Pagination from "../../../components/Pagination/Pagination";
import { Table } from "@chakra-ui/table";
import { Thead } from "@chakra-ui/table";
import { Tr } from "@chakra-ui/table";
import { Th } from "@chakra-ui/table";
import { Tbody } from "@chakra-ui/table";
import PropertySkeleton from "./skeletons/PropertySkeleton";
import Property from "./Property";
import { useBreakpointValue } from "@chakra-ui/media-query";

function Properties(props) {
  const size = useBreakpointValue({ base: "sm", md: "lg" });

  const perPage = 5;

  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [properties, setProperties] = useState([]);
  const [propertiesCount, setPropertiesCount] = useState();
  const [actions, setActions] = useState();

  const [apiError, setApiError] = useState(false);

  useEffect(() => {
    const getProperties = async () => {
      setLoading(true);

      const res = await DAOProperties.getProperties(perPage, currentPage);
      if (!res) return;

      setLoading(false);

      if (res.message === "success") {
        setApiError(false);
        setPropertiesCount(res.count);
        setProperties(res.properties);
      } else {
        setApiError(true);
        setPropertiesCount(0);
        setProperties([]);
      }
    };

    getProperties();

    return () => {
      DAOProperties.cancel();
    };
  }, [currentPage, actions]);

  useTitle("Casas");

  const update = () => {
    setActions(`update ${Date.now()}`);
  };

  return (
    <Layout {...props}>
      <Box pb={2} ml={{ base: 1, md: 0 }}>
        <ButtonGroup spacing="2">
          <ModalCreateProperty {...props} setActions={setActions} />

          <Button colorScheme="blue" leftIcon={<FaRedoAlt />} onClick={update} isLoading={loading}>
            Actualizar
          </Button>
        </ButtonGroup>
      </Box>

      <Box>
        {loading ? (
          <PropertySkeleton size={size} perPage={perPage} />
        ) : !apiError && propertiesCount !== 0 ? (
          <Table size={size}>
            <Thead>
              <Tr>
                <Th px={2}>Titulo</Th>
                <Th px={2}>Categoria</Th>
                <Th px={2}>Precio</Th>
                <Th px={2}></Th>
              </Tr>
            </Thead>
            <Tbody>
              <Property
                {...props}
                properties={properties}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                setActions={setActions}
              />
            </Tbody>
          </Table>
        ) : null}

        <Box mx={{ base: 1, md: 0 }}>
          {!loading ? (
            apiError ? (
              <AlertServerError />
            ) : propertiesCount === 0 ? (
              <AlertNoElement
                title="Crea nuevas casas!"
                description="Deberías crear casas para compartir con tus clientes."
              />
            ) : (
              ""
            )
          ) : (
            ""
          )}
        </Box>

        <Box pt={6} textAlign="right" mx={{ base: 1, md: 0 }}>
          {loading ? (
            <PaginationSkeleton />
          ) : !apiError && propertiesCount !== 0 ? (
            <Pagination
              count={propertiesCount}
              perPage={perPage}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          ) : (
            ""
          )}
        </Box>
      </Box>
    </Layout>
  );
}

export default Properties;
