import {
    SimpleGrid,
    Box,
    Link,
    Text,
    Flex,
    keyframes,
    usePrefersReducedMotion,
    useBoolean,
} from "@chakra-ui/react";
import { GetStaticProps, NextPage } from "next";
import NextLink from "next/link";
import Layout from "../../components/Layout";
import { FC } from "react";
import { ChakraImage } from "../../components/ChakraImage";
import { StaticImageData } from "next/image";

import beastmensImg from "../../assets/factions/wh_dlc03_bst_beastmen.png";
import bretonniaImg from "../../assets/factions/wh_main_brt_bretonnia.png";
import chaosImg from "../../assets/factions/wh_main_chs_chaos.png";
import darkElvesImg from "../../assets/factions/wh2_main_def_dark_elves.png";
import dwarfsImg from "../../assets/factions/wh_main_dwf_dwarfs.png";
import empireImage from "../../assets/factions/wh_main_emp_empire.png";
import greenskinsImg from "../../assets/factions/wh_main_grn_greenskins.png";
import highElvesImg from "../../assets/factions/wh2_main_hef_high_elves.png";
import lizardmensImg from "../../assets/factions/wh2_main_lzd_lizardmen.png";
import norscaImg from "../../assets/factions/wh_dlc08_nor_norsca.png";
import skavenImg from "../../assets/factions/wh2_main_skv_skaven.png";
import tombKingsImg from "../../assets/factions/wh2_dlc09_tmb_tomb_kings.png";
import vampireCoastImg from "../../assets/factions/wh2_dlc11_cst_vampire_coast.png";
import vampireCountsImg from "../../assets/factions/wh_main_vmp_vampire_counts.png";
import woodElvesImg from "../../assets/factions/wh_dlc05_wef_wood_elves.png";
import cathayImg from "../../assets/factions/wh3_main_cth_cathay.png";
import khornImg from "../../assets/factions/wh3_main_kho_khorne.png";
import kislevImg from "../../assets/factions/wh3_main_ksl_kislev.png";
import nurgleImg from "../../assets/factions/wh3_main_nur_nurgle.png";
import ogreImg from "../../assets/factions/wh3_main_ogr_ogre_kingdoms.png";
import slaaneshImg from "../../assets/factions/wh3_main_sla_slaanesh.png";
import tzeenchImg from "../../assets/factions/wh3_main_tze_tzeentch.png";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

export const getStaticProps: GetStaticProps = async (context) => {
    const { locale } = context;
    const loc = locale === "ru" ? "ru" : "en";

    return {
        props: {
            ...(await serverSideTranslations(loc, [
                "faction",
                "common",
                "nav",
            ])),
        },
    };
};

const animation = keyframes`
    from { transform: translate(0, 0) scale(1); }
    to { transform: translate(-20px, -5px) scale(0.9); }
`;

const shine = keyframes`
    from {
        mask-position: 150%;
    }

    to {
        mask-position: -50%;
    }
`;

interface FactionLink {
    link: string;
    name: string;
    imgSrc: StaticImageData;
    newImage?: boolean;
}

const FactionLink: FC<FactionLink> = ({ link, name, imgSrc, newImage }) => {
    const prefersReducedMotion = usePrefersReducedMotion();
    const [hover, setHover] = useBoolean(false);
    const anim = prefersReducedMotion
        ? `${animation} infinite 10s linear`
        : undefined;
    const shineAnim = prefersReducedMotion
        ? `${shine} infinite 2s linear`
        : undefined;
    return (
        <NextLink href={`factions/${link}`} as={`factions/${link}`}>
            <Link
                overflow="hidden"
                pos="relative"
                display="flex"
                pl="1"
                zIndex="docked"
                _hover={{ textDecor: "none" }}
                onMouseEnter={setHover.on}
                onMouseLeave={setHover.off}
            >
                <Flex
                    position="absolute"
                    left="0"
                    top="0"
                    w={newImage ? "747px" : "600px"}
                    h={newImage ? "163px" : "100px"}
                    animation={hover ? anim : undefined}
                    _before={{
                        content: '""',
                        position: "absolute",
                        top: "0",
                        left: "0",
                        right: "0",
                        bottom: "0",
                        zIndex: "1",
                        boxShadow: newImage
                            ? "160px 0px 120px -10px rgba(0, 0, 0, 1) inset"
                            : "",
                    }}
                >
                    <ChakraImage
                        src={imgSrc}
                        width={newImage ? 747 : 600}
                        height={newImage ? 163 : 100}
                    />
                </Flex>
                <Text
                    display="inline-flex"
                    mt="auto"
                    fontSize="2xl"
                    zIndex="docked"
                    sx={{
                        maskImage: hover
                            ? "linear-gradient(-75deg, rgba(0,0,0,.6) 30%, #000 50%, rgba(0,0,0,.6) 70%)"
                            : "",
                        maskSize: "200%",
                    }}
                    animation={hover ? shineAnim : undefined}
                >
                    {name}
                </Text>
            </Link>
        </NextLink>
    );
};

const Units: NextPage = () => {
    const { t } = useTranslation("faction");
    return (
        <Layout heading={t("factionPage")}>
            <SimpleGrid
                gridTemplateColumns={"550px 550px"}
                gridAutoRows={"90px"}
                gridGap="6"
                px="2"
                pt="4"
                pb="10"
                mx="auto"
                w="fit-content"
            >
                <FactionLink
                    imgSrc={cathayImg}
                    link={"cathay"}
                    name={t("cathay")}
                    newImage
                />
                <FactionLink
                    imgSrc={khornImg}
                    link={"khorn"}
                    name={t("khorn")}
                    newImage
                />
                <FactionLink
                    imgSrc={kislevImg}
                    link={"kislev"}
                    name={t("kislev")}
                    newImage
                />
                <FactionLink
                    imgSrc={nurgleImg}
                    link={"nurgle"}
                    name={t("nurgle")}
                    newImage
                />
                <FactionLink
                    imgSrc={ogreImg}
                    link={"ogres"}
                    name={t("ogres")}
                    newImage
                />
                <FactionLink
                    imgSrc={slaaneshImg}
                    link={"slaanesh"}
                    name={t("slaanesh")}
                    newImage
                />
                <FactionLink
                    imgSrc={tzeenchImg}
                    link={"tzeentch"}
                    name={t("tzeentch")}
                    newImage
                />
                <FactionLink
                    imgSrc={beastmensImg}
                    link={"beastmens"}
                    name={t("beastmens")}
                />
                <FactionLink
                    imgSrc={bretonniaImg}
                    link={"bretonnia"}
                    name={t("bretonnia")}
                />
                <FactionLink
                    imgSrc={chaosImg}
                    link={"chaos"}
                    name={t("chaos")}
                />
                <FactionLink
                    imgSrc={darkElvesImg}
                    link={"dark-elves"}
                    name={t("dark-elves")}
                />
                <FactionLink
                    imgSrc={dwarfsImg}
                    link={"dwarfs"}
                    name={t("dwarfs")}
                />
                <FactionLink
                    imgSrc={empireImage}
                    link={"empire"}
                    name={t("empire")}
                />
                <FactionLink
                    imgSrc={greenskinsImg}
                    link={"greenskins"}
                    name={t("greenskins")}
                />
                <FactionLink
                    imgSrc={highElvesImg}
                    link={"high-elves"}
                    name={t("high-elves")}
                />
                <FactionLink
                    imgSrc={lizardmensImg}
                    link={"lizardmens"}
                    name={t("lizardmens")}
                />
                <FactionLink
                    imgSrc={norscaImg}
                    link={"norsca"}
                    name={t("norsca")}
                />
                <FactionLink
                    imgSrc={skavenImg}
                    link={"skavens"}
                    name={t("skavens")}
                />
                <FactionLink
                    imgSrc={tombKingsImg}
                    link={"tomb-kings"}
                    name={t("tomb-kings")}
                />
                <FactionLink
                    imgSrc={vampireCoastImg}
                    link={"vampire-coast"}
                    name={t("vampire-coast")}
                />
                <FactionLink
                    imgSrc={vampireCountsImg}
                    link={"vampire-counts"}
                    name={t("vampire-counts")}
                />
                <FactionLink
                    imgSrc={woodElvesImg}
                    link={"wood-elves"}
                    name={t("wood-elves")}
                />
            </SimpleGrid>
        </Layout>
    );
};

export default Units;
