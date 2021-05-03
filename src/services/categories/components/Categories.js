import { Button } from "@chakra-ui/button";
import { ButtonGroup } from "@chakra-ui/button";
import { Box } from "@chakra-ui/layout";
import { useEffect, useState } from "react";
import { FaRedoAlt } from "react-icons/fa";
import { Table } from "@chakra-ui/table";
import { Thead } from "@chakra-ui/table";
import { Tr } from "@chakra-ui/table";
import { Th } from "@chakra-ui/table";
import { Tbody } from "@chakra-ui/table";

import Category from "./Category";
import ModalCreateCategory from "./modals/ModalCreateCategory";
import CategorySkeleton from "./skeletons/CategorySkeleton";
import { useTitle } from "../../../utils/title";

import Layout from "../../../components/Container/Layout";
import AlertServerError from "../../../components/AlertServerError";
import AlertNoElement from "../../../components/AlertNoElement";
import PaginationSkeleton from "../../../components/Pagination/PaginationSkeleton";
import Pagination from "../../../components/Pagination/Pagination";

import * as DAOCategories from "../dao";
import { useBreakpointValue } from "@chakra-ui/media-query";

function Categories(props) {
  const size = useBreakpointValue({ base: "sm", md: "lg" });

  const perPage = 5;

  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [categories, setCategories] = useState([]);
  const [categoriesCount, setCategoriesCount] = useState(0);
  const [actions, setActions] = useState();

  const [apiError, setApiError] = useState(false);

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true);

      const res = await DAOCategories.getCategories(perPage, currentPage);
      if (!res) return;

      setLoading(false);

      if (res.message === "success") {
        setApiError(false);
        setCategoriesCount(res.count);
        setCategories(res.categories);
      } else {
        setApiError(true);
        setCategoriesCount(0);
        setCategories([]);
      }
    };

    getCategories();

    return () => {
      DAOCategories.cancel();
    };
  }, [currentPage, actions]);

  useTitle("Categorias");

  const update = () => {
    setActions(`update ${Date.now()}`);
  };

  return (
    <Layout {...props}>
      <Box pb={2} pl={{ base: 1, md: 0 }}>
        <ButtonGroup spacing="2">
          <ModalCreateCategory {...props} setActions={setActions} />

          <Button colorScheme="blue" leftIcon={<FaRedoAlt />} onClick={update} isLoading={loading}>
            Actualizar
          </Button>
        </ButtonGroup>
      </Box>

      <Box>
        {loading ? (
          <CategorySkeleton size={size} perPage={perPage} />
        ) : !apiError && categoriesCount !== 0 ? (
          <Table size={size}>
            <Thead>
              <Tr>
                <Th px={2}>Nombre</Th>
                <Th px={2}>URL</Th>
                <Th px={2}></Th>
              </Tr>
            </Thead>
            <Tbody>
              <Category
                {...props}
                categories={categories}
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
            ) : categoriesCount === 0 ? (
              <AlertNoElement
                title="Crea nuevas categorias!"
                description="Deberías crear categorias para asignarle a tus casas."
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
          ) : !apiError && categoriesCount !== 0 ? (
            <Pagination
              count={categoriesCount}
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

export default Categories;
