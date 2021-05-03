import { useEffect, useState } from "react";
import { FaRedoAlt } from "react-icons/fa";

import { Accordion } from "@chakra-ui/accordion";
import { Button } from "@chakra-ui/button";
import { Box } from "@chakra-ui/layout";

import Layout from "../../../components/Container/Layout";
import AlertServerError from "../../../components/AlertServerError";

import AccordionItemHome from "./accordionItems/AccordionItemHome";
import AccordionItemCategories from "./accordionItems/AccordionItemCategories";
import AccordionItemMultimedia from "./accordionItems/AccordionItemMultimedia";
import AccordionItemConstructionSystem from "./accordionItems/AccordionItemConstructionSystem";
import AccordionItemAboutUs from "./accordionItems/AccordionItemAboutUs";
import AccordionItemContact from "./accordionItems/AccordionItemContact";
import { useTitle } from "../../../utils/title";

import SettingsSkeleton from "./skeletons/SettingsSkeleton";

import * as DAOSettings from "../dao";
import * as DAOProperties from "../../properties/dao";

function Settings(props) {
  const [loading, setLoading] = useState(true);

  const [settings, setSettings] = useState();
  const [properties, setProperties] = useState([]);
  const [actions, setActions] = useState();

  const [apiError, setApiError] = useState(true);

  useEffect(() => {
    let exe = false;
    const getSettings = async () => {
      setLoading(true);

      const res = await DAOSettings.getSettings();
      exe = true;
      const resProperties = await DAOProperties.getProperties();

      if (!res || !resProperties) return;

      if (res.message === "success" && resProperties.message === "success") {
        setSettings(res.settings);
        setProperties(resProperties.properties);
        setApiError(false);
      } else {
        setSettings(undefined);
        setProperties([]);
        setApiError(true);
      }

      setLoading(false);
    };

    getSettings();

    return () => {
      DAOSettings.cancel();

      if (exe) DAOProperties.cancel();

      exe = false;
    };
  }, [actions]);

  useTitle("Configuraciones");

  const update = () => {
    setActions(`update ${Date.now()}`);
  };

  return (
    <Layout {...props}>
      <Box px={{ base: 1, md: 0 }}>
        <Box>
          <Box pb={2}>
            <Button colorScheme="blue" leftIcon={<FaRedoAlt />} onClick={update} isLoading={loading}>
              Actualizar
            </Button>
          </Box>
        </Box>

        <Box>
          {loading ? (
            <SettingsSkeleton />
          ) : apiError ? (
            <AlertServerError />
          ) : (
            <Accordion allowToggle>
              <AccordionItemHome
                {...props}
                properties={properties}
                property={settings.home.property}
                discount={settings.home.discount}
                setActions={setActions}
              />

              <AccordionItemCategories {...props} perPage={settings.categories.perPage} setActions={setActions} />

              <AccordionItemMultimedia {...props} perPage={settings.multimedia.perPage} setActions={setActions} />

              <AccordionItemConstructionSystem
                {...props}
                content={settings.constructionSystem.content}
                setActions={setActions}
              />

              <AccordionItemAboutUs {...props} content={settings.aboutUs.content} setActions={setActions} />

              <AccordionItemContact
                {...props}
                address={settings.contact.address}
                emails={settings.contact.emails}
                phones={settings.contact.phones}
                socialMedia={settings.contact.socialMedia}
                setActions={setActions}
              />
            </Accordion>
          )}
        </Box>
      </Box>
    </Layout>
  );
}

export default Settings;
