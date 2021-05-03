import { useEffect, useState } from "react";

import { Button } from "@chakra-ui/button";
import { Box } from "@chakra-ui/layout";
import { FaRedoAlt } from "react-icons/fa";
import { Table } from "@chakra-ui/table";
import { Thead } from "@chakra-ui/table";
import { Tr } from "@chakra-ui/table";
import { Th } from "@chakra-ui/table";
import { Tbody } from "@chakra-ui/table";

import Layout from "../../../components/Container/Layout";
import Pagination from "../../../components/Pagination/Pagination";
import PaginationSkeleton from "../../../components/Pagination/PaginationSkeleton";
import AlertServerError from "../../../components/AlertServerError";
import AlertNoElement from "../../../components/AlertNoElement";

import UserSkeleton from "./skeletons/UserSkeleton";
import User from "./User";
import { useTitle } from "../../../utils/title";

import * as DAOUsers from "../dao";
import { useBreakpointValue } from "@chakra-ui/media-query";

function Users(props) {
  const size = useBreakpointValue({ base: "sm", md: "lg" });

  const perPage = 5;

  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState([]);
  const [usersCount, setUsersCount] = useState();
  const [actions, setActions] = useState();

  const [apiError, setApiError] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);

      const res = await DAOUsers.getUsers(perPage, currentPage);
      if (!res) return;

      setLoading(false);

      if (res.message === "success") {
        setApiError(false);
        setUsersCount(res.count);
        setUsers(res.users);
      } else {
        setApiError(true);
        setUsersCount(0);
        setUsers([]);
      }
    };

    getUsers();

    return () => {
      DAOUsers.cancel();
    };
  }, [currentPage, actions]);

  useTitle("Usuarios");

  const update = () => {
    setActions(`update ${Date.now()}`);
  };

  return (
    <Layout {...props}>
      <Box pb={2} pl={{ base: 1, md: 0 }}>
        <Button colorScheme="blue" leftIcon={<FaRedoAlt />} onClick={update} isLoading={loading}>
          Actualizar
        </Button>
      </Box>

      <Box>
        {loading ? (
          <UserSkeleton size={size} perPage={perPage} />
        ) : !apiError && usersCount !== 0 ? (
          <Table size={size}>
            <Thead>
              <Tr>
                <Th px={2}>Usuario</Th>
                <Th px={2}>Correo electrónico</Th>
                <Th px={2}>Rol</Th>
                <Th px={2}></Th>
              </Tr>
            </Thead>
            <Tbody>
              <User
                {...props}
                users={users}
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
            ) : usersCount === 0 ? (
              <AlertNoElement
                title="Esto es malo!"
                description="Como es posible que no existan usuarios y veas esto?."
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
          ) : !apiError && usersCount !== 0 ? (
            <Pagination
              count={usersCount}
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

export default Users;
