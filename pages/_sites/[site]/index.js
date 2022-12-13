import React from "react";
import First from "../../../components/first";
import Second from "../../../components/second";

export async function getStaticPaths() {
  const paths = [{ params: { site: "test" } }, { params: { site: "test2" } }];

  return {
    paths: paths,
    fallback: "blocking",
  };
}

export const getStaticProps = async (context) => {
  const data = [
    { domain: "test", data: "My first test project" },
    { domain: "test2", data: "My second test project" },
  ];

  const project = data.find((p) => p.domain === context.params.site);

  if (!project) {
    return {
      notFound: true,
    };
  }

  return {
    props: { project },
  };
};

export default function Index({ project }) {
  return <>{project.domain === "test" ? <First /> : <Second />}</>;
}
