import { Button } from "@chakra-ui/button";
import { Box } from "@chakra-ui/layout";
import { useEffect, useState } from "react";
import { FaRedoAlt } from "react-icons/fa";
import { ButtonGroup } from "@chakra-ui/button";

import Layout from "../../../components/Container/Layout";

import ModalUploadPhoto from "./modals/ModalUploadPhoto";
import { useTitle } from "../../../utils/title";

import * as DAOPhotos from "../dao";
import PhotoSkeleton from "./skeletons/PhotoSkeleton";
import Photo from "./Photo";
import AlertServerError from "../../../components/AlertServerError";
import AlertNoElement from "../../../components/AlertNoElement";
import PaginationSkeleton from "../../../components/Pagination/PaginationSkeleton";
import Pagination from "../../../components/Pagination/Pagination";

function Photos(props) {
  const perPage = 12;

  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [photos, setPhotos] = useState([]);
  const [photosCount, setPhotosCount] = useState();
  const [actions, setActions] = useState();

  const [apiError, setApiError] = useState(false);

  useEffect(() => {
    const getPhotos = async () => {
      setLoading(true);

      const res = await DAOPhotos.getPhotos(perPage, currentPage);
      if (!res) return;

      setLoading(false);

      if (res.message === "success") {
        setApiError(false);
        setPhotosCount(res.count);
        setPhotos(res.photos);
      } else {
        setApiError(true);
        setPhotosCount(0);
        setPhotos([]);
      }
    };

    getPhotos();

    return () => {
      DAOPhotos.cancel();
    };
  }, [currentPage, actions]);

  useTitle("Fotos");

  const update = () => {
    setActions(`update ${Date.now()}`);
  };

  return (
    <Layout {...props}>
      <Box pb={2} pl={{ base: 1, md: 0 }}>
        <ButtonGroup spacing="2">
          <ModalUploadPhoto {...props} setActions={setActions} />

          <Button colorScheme="blue" leftIcon={<FaRedoAlt />} onClick={() => update()} isLoading={loading}>
            Actualizar
          </Button>
        </ButtonGroup>
      </Box>

      <Box mx={{ base: 1, md: 0 }}>
        {loading ? (
          <PhotoSkeleton perPage={perPage} />
        ) : !apiError && photosCount !== 0 ? (
          <Photo
            {...props}
            photos={photos}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            setActions={setActions}
          />
        ) : null}
      </Box>

      <Box mx={{ base: 1, md: 0 }}>
        {!loading ? (
          apiError ? (
            <AlertServerError />
          ) : photosCount === 0 ? (
            <AlertNoElement
              title="Comparte tus fotografías!"
              description="Deberías subir fotografías para compartirlas con tus clientes."
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
        ) : !apiError && photosCount !== 0 ? (
          <Pagination count={photosCount} perPage={perPage} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        ) : (
          ""
        )}
      </Box>
    </Layout>
  );
}

export default Photos;
