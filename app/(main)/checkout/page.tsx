import CheckOutClient from "@/app/(main)/checkout/CheckOutClient/CheckOutClient";
import {getMe} from "@/components/Header/Header";


export default async function Page() {
  const res = await getMe();

  return (
      <CheckOutClient initialUser={res.statusCode === 200 ? res.data : null} />
  );
}