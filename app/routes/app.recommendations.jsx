export default function RecommendationsPage() {
  const recommendations = [
    {
      title: "Bundle high-margin items",
      status: "Active",
      description:
        "Create a bundle with your best-performing accessories to increase average order value.",
    },
    {
      title: "Promote seasonal SKUs",
      status: "Draft",
      description:
        "Highlight seasonal products in the PDP and checkout to capture timely demand.",
    },
    {
      title: "Cross-sell related products",
      status: "Active",
      description:
        "Show complementary items next to the primary product to improve conversion rate.",
    },
  ];

  return (
    <s-page heading="Recommendations">
      <s-section heading="Custom recommendations">
        <s-paragraph>
          Manage your merchandising suggestions and decide which ones should be
          shown on the storefront or checkout experience.
        </s-paragraph>
        <s-stack direction="inline" gap="base">
          <s-button variant="primary">Create recommendation</s-button>
          <s-button variant="secondary">Import from catalog</s-button>
        </s-stack>

        <s-stack direction="block" gap="base">
          {recommendations.map((item) => (
            <s-box
              key={item.title}
              padding="base"
              borderWidth="base"
              borderRadius="base"
              background="subdued"
            >
              <s-heading>{item.title}</s-heading>
              <s-paragraph>{item.description}</s-paragraph>
              <s-paragraph>Status: {item.status}</s-paragraph>
              <s-stack direction="inline" gap="base">
                <s-button variant="secondary">Edit</s-button>
                <s-button variant="secondary">Enable</s-button>
              </s-stack>
            </s-box>
          ))}
        </s-stack>
      </s-section>
    </s-page>
  );
}
