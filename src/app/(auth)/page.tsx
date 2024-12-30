import PageLayout from "../components/blocks/page-layout";

export default async () => {
  return (
    <PageLayout
      name="Home Page"
      description="Home page that displays links of the pages."
      breadcrumbs={[
        {
          name: "Home",
          link: "/",
        },
        {
          name: "Dashboard",
        },
      ]}
    ></PageLayout>
  );
};
