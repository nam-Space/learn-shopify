export const loader = async () => {
  return new Response("OK", { status: 200 });
};

export default function Healthcheck() {
  return null;
}
