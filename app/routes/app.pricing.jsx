export default function PricingPage() {
  const plans = [
    {
      name: "Free",
      price: "$0/month",
      description: "Ideal for testing recommendations on a small catalog.",
      features: [
        "Up to 100 recommendations",
        "Basic analytics",
        "1 storefront placement",
      ],
      isCurrent: true,
    },
    {
      name: "Standard",
      price: "$29/month",
      description:
        "For merchants who want better insights and more active placements.",
      features: [
        "Up to 1,000 recommendations",
        "Advanced analytics",
        "PDP + checkout placements",
      ],
      isCurrent: false,
    },
    {
      name: "Enterprise",
      price: "$59/month",
      description:
        "For scaling stores that need deeper automation and support.",
      features: [
        "Unlimited recommendations",
        "Priority support",
        "Full checkout and theme control",
      ],
      isCurrent: false,
    },
  ];

  return (
    <s-page heading="Pricing">
      <s-section heading="Choose the right plan for your store">
        <s-paragraph>
          Upgrade when you need more placements, deeper insights, or more
          automated recommendations.
        </s-paragraph>

        <s-stack direction="inline" gap="base">
          {plans.map((plan) => (
            <s-box
              key={plan.name}
              padding="base"
              borderWidth="base"
              borderRadius="base"
              background="subdued"
            >
              <s-heading>{plan.name}</s-heading>
              <s-paragraph>{plan.price}</s-paragraph>
              <s-paragraph>{plan.description}</s-paragraph>
              <s-unordered-list>
                {plan.features.map((feature) => (
                  <s-list-item key={feature}>{feature}</s-list-item>
                ))}
              </s-unordered-list>
              <s-paragraph>
                {plan.isCurrent ? "Current plan" : "Upgrade available"}
              </s-paragraph>
              <s-button variant={plan.isCurrent ? "secondary" : "primary"}>
                {plan.isCurrent ? "Current plan" : `Choose ${plan.name}`}
              </s-button>
            </s-box>
          ))}
        </s-stack>
      </s-section>
    </s-page>
  );
}
